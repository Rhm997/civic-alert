package com.fac.civicalert.commons.service;

import com.fac.civicalert.commons.security.UserDetailsServiceImpl;
import com.fac.civicalert.commons.security.utils.JwtUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilsService {

  private final JwtUtils jwtUtils;
  private final UserDetailsServiceImpl userDetailsService;




  //@pt controllerele in care intru de pe redirect; de vazut de- mi mai tre chestii , nu doar id!!!
  public long getLoggedUserIdFromJwtToken(String jwtToken) {
    String jwt = jwtToken.substring(1, jwtToken.length() - 1);
    Long userId = null;

    if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
      userId = jwtUtils.getUserIdFromJwtToken(jwt);

    }
    return userId;
  }

}
