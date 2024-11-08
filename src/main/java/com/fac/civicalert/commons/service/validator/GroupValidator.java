package com.fac.civicalert.commons.service.validator;

import static org.apache.commons.lang3.ObjectUtils.anyNull;

import com.fac.civicalert.commons.common.exception.UserMessageException;
import com.fac.civicalert.commons.dto.GroupDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GroupValidator {

  public static void validateGroup(final GroupDTO dto) {
    validateRequiredFields(dto);
    validateLengthOfFields(dto);
  }

  private static void validateRequiredFields(final GroupDTO dto) {
    if (anyNull(dto.getName())) {
      throw new UserMessageException("required");
    }
  }


  private static void validateLengthOfFields(final GroupDTO dto) {
    if (dto.getName().length() < 3) {
      throw new UserMessageException("name.length");
    }
  }

}