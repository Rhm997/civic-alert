package com.fac.civicalert.commons.security.utils;

import com.fac.civicalert.commons.security.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtils {

  public UserDetailsImpl getAuth() {
    return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  public Long getUserId() {
    return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal()).getId();
  }

  public Boolean isUserMaster() {
    return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal()).getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("MASTER"));
  }

}
