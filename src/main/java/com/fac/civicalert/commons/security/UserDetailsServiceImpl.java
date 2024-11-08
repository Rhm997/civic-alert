package com.fac.civicalert.commons.security;

import com.fac.civicalert.commons.entity.User;
import com.fac.civicalert.commons.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsernameOrEmailIgnoreCase(username, username)
        .orElseThrow(
            () -> new UsernameNotFoundException("User NOT found by username/email: " + username));

    return UserDetailsImpl.build(user);
  }
}
