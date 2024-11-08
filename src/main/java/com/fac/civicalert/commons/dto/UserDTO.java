package com.fac.civicalert.commons.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

  private Long id;
  private String firstName;
  private String lastName;
  private String username;
  private String password;
  private String email;
  private String phone;
  private String cnp;
  private String region;
  private String city;
  private String address;
  private String urlCI;
  private String externalId;
  private String userType;
  private Integer active;
  private List<Long> idsGroups;
  private List<Long> idsRoles;
  private List<RoleListDTO> roles;
}
