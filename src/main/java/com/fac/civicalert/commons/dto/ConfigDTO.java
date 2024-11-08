package com.fac.civicalert.commons.dto;

import java.math.BigDecimal;
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
public class ConfigDTO {

  private String key;
  private Integer intValue;
  private BigDecimal numericValue;
  private String stringValue;
}