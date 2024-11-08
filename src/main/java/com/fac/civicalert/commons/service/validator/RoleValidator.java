package com.fac.civicalert.commons.service.validator;

import static org.apache.commons.lang3.ObjectUtils.anyNull;

import com.fac.civicalert.commons.common.exception.UserMessageException;
import com.fac.civicalert.commons.dto.RoleDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RoleValidator {

  public static void validateRole(final RoleDTO dto) {
    validateRequiredFields(dto);
    validateLengthOfFields(dto);
  }

  private static void validateRequiredFields(RoleDTO dto) {
    if (anyNull(dto.getRole(), dto.getDescription())) {
      throw new UserMessageException("required");
    }
  }


  private static void validateLengthOfFields(RoleDTO dto) {
    if (dto.getRole().length() < 4) {
      throw new UserMessageException("role.length");
    }
  }

}
