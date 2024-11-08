package com.fac.civicalert.commons.common.exception;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class UserMessageException extends RuntimeException {
  private final transient List<Object> params = new ArrayList<>();


  public UserMessageException(final String message) {
    super(message);
  }

  public UserMessageException(final String message, final Object... params) {
    super(message);
    this.params.addAll(Arrays.stream(params)
        .collect(toList()));
  }

  public UserMessageException(final String message, final List<Object> params) {
    super(message);
    this.params.addAll(params);
  }

}
