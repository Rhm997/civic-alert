package com.fac.civicalert.commons.security.utils;

import com.fac.civicalert.commons.security.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtils {

  @Value("shhh")
  private String jwtSecret;

  public String generateJwtToken(Authentication authentication) {
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject((userPrincipal.getEmail()))
        .setId(userPrincipal.getId().toString())
        .setIssuedAt(new Date())
        .setExpiration(Date.from(LocalDate.now()
            .plusMonths(6)
            .atStartOfDay()
            .atZone(ZoneId.systemDefault())
            .toInstant()))
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .claim("userType", userPrincipal.getUserType())
        .compact();
  }

  public String getEmailFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public Long getUserIdFromJwtToken(String token) {
    return Long.valueOf(Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getId());
  }

  public Integer getUserTypeFromJwtToken(String token) {
    return (Integer) Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("userType");
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (MalformedJwtException e) {
      log.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      log.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      log.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

}
