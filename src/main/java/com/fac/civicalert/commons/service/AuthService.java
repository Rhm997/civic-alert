package com.fac.civicalert.commons.service;

import static java.util.Objects.isNull;

import com.fac.civicalert.commons.security.UserDetailsImpl;
import com.fac.civicalert.commons.security.dto.CompleteRegisterRequest;
import com.fac.civicalert.commons.security.dto.JwtResponse;
import com.fac.civicalert.commons.security.dto.LoginRequest;
import com.fac.civicalert.commons.security.dto.RegisterUserRequest;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.security.utils.JwtUtils;
import com.fac.civicalert.commons.common.email.EmailService;
import com.fac.civicalert.commons.common.exception.UserMessageException;
import com.fac.civicalert.commons.entity.User;
import com.fac.civicalert.commons.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final AuthUtils authUtils;
  private final PasswordEncoder passwordEncoder;
  private final UserService userService;
  private final EmailService emailService;
  private final UserRepository userRepository;

  @Transactional
  public JwtResponse authenticateUser(final LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
            loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//    List<String> roles = userDetails.getAuthorities().stream()
//        .map(GrantedAuthority::getAuthority)
//        .distinct()
//        .collect(toList());
//    List<String> groups = userService.getGroupsForUser(userDetails.getId()).stream()
//        .map(Group::getName)
//        .collect(toList());

    return JwtResponse.builder()
        .token(jwt)
        .id(userDetails.getId())
        .fullName(userDetails.getFullName())
        .email(userDetails.getEmail())
        .userType(userDetails.getUserType())
//        .roles(roles)
//        .groups(groups)
        .build();
  }

  @Transactional(rollbackFor = Exception.class)
  public void registerExternalUser(RegisterUserRequest registerUserRequest, HttpServletRequest request) {

    validateCredentialsForRegister(registerUserRequest);

    User user = new User();

    user.setFirstName(registerUserRequest.getFirstName());
    user.setLastName(registerUserRequest.getLastName());
    user.setEmail(registerUserRequest.getEmail().toLowerCase());
    user.setUsername(registerUserRequest.getEmail());

    user.setUserType("CLIENT");
    user.setActive(0);

    final String registerToken = RandomStringUtils.random(20, true, true);
    user.setRegisterToken(registerToken);

    user = userRepository.save(user);

    sendEmailAfterRegister(user.getEmail(), registerToken, request);
  }

  private void sendEmailAfterRegister(final String to, final String registerToken, HttpServletRequest request) {
    //ToDo check if the link is well formed on production server
    final String emailLink = generateConfirmationLink(request, registerToken);
    emailService.sendPlainTextEmail(to, "Confirm your email and finish registration", emailLink);
  }

  private String generateConfirmationLink(HttpServletRequest request, String registerToken) {
    // Extract scheme, server name, and port from the request
    final String scheme = request.getScheme();           // http or https
    final String serverName = request.getServerName();   // example.com or localhost
    final int serverPort = request.getServerPort();      // 8080, 443, etc.
    final String contextPath = request.getContextPath(); // Application context path, e.g., /app

    StringBuilder baseUrl = new StringBuilder();

    baseUrl.append(scheme)
        .append("://")
        .append(serverName);

    if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)) {
      baseUrl.append(":").append(serverPort);
    }

    baseUrl.append(contextPath)
        .append("/client/complete-register?token=")
        .append(registerToken);

    final String emailLink = baseUrl.toString();

    return emailLink;
  }

  @Transactional(rollbackFor = Exception.class)
  public JwtResponse finishRegistrationAndAuthenticateUser(CompleteRegisterRequest completeRegisterRequest) {
    User user = userRepository.findByRegisterToken(completeRegisterRequest.getToken());

    if (isNull(user)) {
      throw new UserMessageException("Couldn't find user by confirmation token");
    }

    user.setPassword(passwordEncoder.encode(completeRegisterRequest.getPassword()));
    user.setRegisterToken(null);
    user.setActive(1);
    user = userRepository.save(user);

    JwtResponse jwtResponse = authenticateUser(new LoginRequest(user.getEmail(), completeRegisterRequest.getPassword()));

    return jwtResponse;
  }

  @Transactional(rollbackFor = Exception.class)
  public User sendEmailWithNewlyGeneratedPassword(final String email) {
    final User user = userRepository.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new UserMessageException("Nu s-a găsit niciun cont asociat cu adresa de e-mail introdusă"));

    final String newPassword = RandomStringUtils.random(8, true, true);

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    emailService.sendPlainTextEmail(user.getEmail(), "Parolă resetată cu succes!",
        "Noua parolă a contului asociat cu adresa de email: " + user.getEmail() + " este: " + newPassword + '\r');

    return user;
  }

  public void validateCredentialsForRegister(final RegisterUserRequest registerUserRequest) {
    if (userRepository.existsByEmail(registerUserRequest.getEmail())) {
      throw new UserMessageException("Există deja un utilizator cu acest email");
    }
  }
}
