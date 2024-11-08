package com.fac.civicalert.commons.common.exception;

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
public class FieldErrorException extends RuntimeException {

  private String field;
  private String message;
  private String value;

}
