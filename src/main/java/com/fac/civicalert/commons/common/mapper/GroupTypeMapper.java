package com.fac.civicalert.commons.common.mapper;

import com.fac.civicalert.commons.entity.GroupType;
import com.fac.civicalert.commons.dto.GroupTypeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface GroupTypeMapper {

  GroupTypeMapper groupTypeMapper = Mappers.getMapper(GroupTypeMapper.class);

  GroupTypeDTO toGroupTypeDto(final GroupType group);

  GroupType toGroupType(final GroupTypeDTO groupDTO);

}
