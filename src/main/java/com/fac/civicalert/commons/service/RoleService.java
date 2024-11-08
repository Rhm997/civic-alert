package com.fac.civicalert.commons.service;

import com.fac.civicalert.commons.service.validator.RoleValidator;
import com.fac.civicalert.commons.common.mapper.RoleMapper;
import com.fac.civicalert.commons.common.utils.EntityUtils;
import com.fac.civicalert.commons.repository.GroupTypeRepository;
import com.fac.civicalert.commons.repository.RoleRepository;
import com.fac.civicalert.commons.repository.UserRepository;
import com.fac.civicalert.commons.entity.Role;
import com.fac.civicalert.commons.dto.RoleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.fac.civicalert.commons.common.utils.EntityUtils.findByIdNullSafe;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final UserRepository userRepository;
    private final GroupTypeRepository groupTypeRepository;
    private final RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public List<RoleDTO> findAll() {
        return roleRepository.findAll().stream()
                .map(RoleMapper.roleMapper::toRoleDTO)
                .collect(toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public void createRole(final RoleDTO dto) {
        RoleValidator.validateRole(dto);

        final Role role = RoleMapper.roleMapper.toRole(dto);

        roleRepository.save(role);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteRole(final Long id) {
        final Role role = EntityUtils.findByIdNullSafe(roleRepository, id);

        role.getGroupTypes().forEach(groupType -> {
            groupType.getRoles().removeIf(r -> r.getId().equals(id));
            groupTypeRepository.save(groupType);
        });

        roleRepository.deleteById(id);
    }
}
