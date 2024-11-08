package com.fac.civicalert.commons.security.dto;


import static java.util.Collections.emptyList;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {

  private Long id;
  private String username;
  private String fullName;
  private String email;
  private String token;
  private String userType; // CLIENT/MANAGER
  private List<String> roles = emptyList();
  private List<String> groups = emptyList();
  private Integer firstLogin = 0;
}
