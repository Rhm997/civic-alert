package com.fac.civicalert.commons.service;

import static com.fac.civicalert.commons.common.utils.EntityUtils.findByIdNullSafe;
import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;

import com.fac.civicalert.commons.service.validator.GroupValidator;
import com.fac.civicalert.commons.common.mapper.GroupMapper;
import com.fac.civicalert.commons.common.mapper.GroupTypeMapper;
import com.fac.civicalert.commons.common.utils.EntityUtils;
import com.fac.civicalert.commons.entity.Group;
import com.fac.civicalert.commons.repository.GroupRepository;
import com.fac.civicalert.commons.repository.GroupTypeRepository;
import com.fac.civicalert.commons.repository.UserRepository;
import com.fac.civicalert.commons.dto.GroupDTO;
import com.fac.civicalert.commons.dto.GroupTypeDTO;
import com.fac.civicalert.commons.repository.RoleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final GroupRepository groupRepository;
  private final GroupTypeRepository groupTypeRepository;

  @Transactional(readOnly = true)
  public List<GroupDTO> findAll() {
    return groupRepository.findAll().stream()
        .map(GroupMapper.groupMapper::toGroupDto)
        .collect(toList());
  }

  @Transactional(readOnly = true)
  public List<GroupTypeDTO> findAllGroupTypes() {
    return groupTypeRepository.findAll().stream()
        .map(GroupTypeMapper.groupTypeMapper::toGroupTypeDto)
        .collect(toList());
  }

  @Transactional(readOnly = true)
  public GroupDTO findById(Long id) {
    return GroupMapper.groupMapper.toGroupDto(EntityUtils.findByIdNullSafe(groupRepository, id));
  }

  @Transactional(rollbackFor = Exception.class)
  public Long createGroup(final GroupDTO dto) {
    GroupValidator.validateGroup(dto);

    final Group group = mapToGroup(dto);

    return groupRepository.save(group).getId();
  }

  @Transactional(rollbackFor = Exception.class)
  public void updateGroupRoles(final Long id, final List<Long> idsRoles) {
    final Group group = EntityUtils.findByIdNullSafe(groupRepository, id);

    group.getGroupType().getRoles().clear();
    group.getGroupType().getRoles().addAll(EntityUtils.findByIdsNullSafe(roleRepository, idsRoles));

    groupRepository.save(group);
  }

  @Transactional(rollbackFor = Exception.class)
  public void deleteGroup(final Long id) {
    final Group group = EntityUtils.findByIdNullSafe(groupRepository, id);
    group.getUsers().forEach(user -> {
      user.getGroups().removeIf(r -> r.getId().equals(id));
      userRepository.save(user);
    });
    group.getGroupType().getRoles().forEach(role -> {
      role.getGroupTypes().removeIf(r -> r.getId().equals(id));
      roleRepository.save(role);
    });

    groupRepository.deleteById(id);
  }

  private Group mapToGroup(GroupDTO dto) {
    Group group =
        isNull(dto.getId()) ? new Group() : findByIdNullSafe(groupRepository, dto.getId());
    group.setName(dto.getName());
    group.setObs(dto.getObs());
    group.setGroupType(findByIdNullSafe(groupTypeRepository, dto.getIdGroupType()));

    return group;
  }
}
