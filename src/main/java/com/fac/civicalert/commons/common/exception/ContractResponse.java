package com.fac.civicalert.commons.common.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ContractResponse {

  private String message = "";
  private Object success;

  public ContractResponse(String message, Object success) {
    this.success = success;
  }


}