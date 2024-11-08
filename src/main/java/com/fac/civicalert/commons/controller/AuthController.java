package com.fac.civicalert.commons.controller;

import com.fac.civicalert.commons.security.dto.CompleteRegisterRequest;
import com.fac.civicalert.commons.security.dto.JwtResponse;
import com.fac.civicalert.commons.security.dto.LoginRequest;
import com.fac.civicalert.commons.security.dto.RegisterUserRequest;
import com.fac.civicalert.commons.service.AuthService;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
@ApiIgnore
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<JwtResponse> authenticateUser(
      @RequestBody final LoginRequest loginRequest) {
    return ResponseEntity.ok(authService.authenticateUser(loginRequest));
  }

  @PostMapping("/register")
  public ResponseEntity<Void> registerUser(@RequestBody final RegisterUserRequest registerUserRequest,
      HttpServletRequest request) {
    authService.registerExternalUser(registerUserRequest, request);

    return ResponseEntity.ok().build();
  }

  @PostMapping("/register/confirm")
  public ResponseEntity<JwtResponse> finishRegisterAndAuthenticateUser(
      @RequestBody final CompleteRegisterRequest completeRegisterRequest) {

    return ResponseEntity.ok(authService.finishRegistrationAndAuthenticateUser(completeRegisterRequest));
  }

  @PostMapping("/forgotten-password/{email}")
  public ResponseEntity<Void> sendEmailWithNewlyGeneratedPassword(@PathVariable final String email) {
    authService.sendEmailWithNewlyGeneratedPassword(email);

    return ResponseEntity.ok().build();
  }

  @GetMapping("/redirect-client-manager/{userType}")
  public ResponseEntity<Map<String, Object>> redirectClientManager(@PathVariable final String userType) {

    Map vResult = new HashMap();
    String path = "";
    if (userType.equals("MANAGER")) {
      path = "main";
    } else if (userType.equals("CLIENT")) {
      path = "client";
    } else if (userType.equals("MAPS")) {
      path = "maps";

    } else {
      throw new RuntimeException("User type inexistent!!!!");
    }

    vResult.put("crtPath", path);

    return ResponseEntity.ok(vResult);
  }


}
