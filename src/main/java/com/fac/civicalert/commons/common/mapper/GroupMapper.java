package com.fac.civicalert.commons.common.mapper;

import com.fac.civicalert.commons.entity.Group;
import com.fac.civicalert.commons.dto.GroupDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface GroupMapper {

  GroupMapper groupMapper = Mappers.getMapper(GroupMapper.class);

  GroupDTO toGroupDto(final Group group);

  @Mapping(source = "groupType.id", target = "idGroupType")
  Group toGroup(final GroupDTO groupDTO);

}
