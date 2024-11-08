package com.fac.civicalert.commons.common.mapper;

import com.fac.civicalert.commons.entity.Role;
import com.fac.civicalert.commons.dto.RoleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RoleMapper {

  RoleMapper roleMapper = Mappers.getMapper(RoleMapper.class);

  Role toRole(final RoleDTO roleDTO);

  RoleDTO toRoleDTO(final Role role);

}
