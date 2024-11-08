package com.fac.civicalert.commons.service.validator;

import com.fac.civicalert.commons.dto.UserDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserValidator {

  public static void validateUser(final UserDTO dto) {
    validateRequiredFields(dto);
    validateLengthOfFields(dto);
  }

  private static void validateRequiredFields(UserDTO dto) {

  }

  private static void validateLengthOfFields(UserDTO dto) {

  }

}
