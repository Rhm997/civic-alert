package com.fac.civicalert.commons.common.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageException {

  private String message;
  private String error;

  public MessageException(String message) {
    this.message = message;
  }
}