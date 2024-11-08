package com.fac.civicalert.commons.security;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException {
    log.error("Unauthorized error: {}", authException.getMessage());

    response.sendError(SC_UNAUTHORIZED, "Error: Unauthorized");
//        response.setS
//        response.getWriter().write("Unauthorized1");
    //   throw new AuthException("Unathorized");
  }

}
