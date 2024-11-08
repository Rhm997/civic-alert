package com.fac.civicalert.commons.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class GroupDTO {

  private Long id;
  private String name;
  private Long idGroupType;
  private GroupTypeDTO groupType;
  private String obs;
  private List<Long> idsRoles;

}
