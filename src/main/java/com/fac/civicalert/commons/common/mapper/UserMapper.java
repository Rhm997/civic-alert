package com.fac.civicalert.commons.common.mapper;

import com.fac.civicalert.commons.entity.User;
import com.fac.civicalert.commons.dto.UserDTO;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserMapper userMapper = Mappers.getMapper(UserMapper.class);

  User toUser(final UserDTO userDTO);

  UserDTO toUserDTO(final User user);

  List<UserDTO> toUserDTOs(final List<User> users);
}
