package com.fac.civicalert.commons.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class IdsDto {

  private Long oldId;
  private Long newId;

}
