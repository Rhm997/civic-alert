package com.fac.civicalert.commons.entity.base;

import com.fac.civicalert.commons.security.UserDetailsImpl;

import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditorAwareImpl implements AuditorAware<Long> {

  @Override
  public Optional<Long> getCurrentAuditor() {
    return Optional.ofNullable(SecurityContextHolder.getContext())
        .map(SecurityContext::getAuthentication)
        .filter(Authentication::isAuthenticated)
        .map(Authentication::getPrincipal)
        .map(principal -> {
          if ("anonymousUser".equals(principal)) {
            return null;
          }
          return principal;
        })
        .map(UserDetailsImpl.class::cast)
        .map(UserDetailsImpl::getId);
  }

}
