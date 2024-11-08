package com.fac.civicalert.commons.service;

import static com.fac.civicalert.commons.common.mapper.UserMapper.userMapper;
import static com.fac.civicalert.commons.common.utils.EntityUtils.findByIdNullSafe;
import static com.fac.civicalert.commons.common.utils.EntityUtils.findByIdsNullSafe;
import static com.fac.civicalert.commons.common.utils.StringUtils.isNullOrEmpty;
import static java.lang.Boolean.FALSE;
import static java.lang.String.format;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;

import com.fac.civicalert.commons.security.dto.UserPasswordDTO;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.common.email.EmailService;
import com.fac.civicalert.commons.common.exception.UserMessageException;
import com.fac.civicalert.commons.dto.FiltersDTO;
import com.fac.civicalert.commons.dto.RoleListDTO;
import com.fac.civicalert.commons.dto.UserDTO;
import com.fac.civicalert.commons.entity.Group;
import com.fac.civicalert.commons.entity.GroupType;
import com.fac.civicalert.commons.entity.User;
import com.fac.civicalert.commons.repository.GroupRepository;
import com.fac.civicalert.commons.repository.RoleRepository;
import com.fac.civicalert.commons.repository.UserRepository;
import com.fac.civicalert.commons.repository.filter.CustomUserRepository;
import com.fac.civicalert.commons.repository.filter.Filter;
import com.fac.civicalert.commons.repository.filter.QueryOperator;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final CustomUserRepository customUserRepository;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;

  private final GroupRepository groupRepository;
  private final PasswordEncoder passwordEncoder;

  private final EmailService emailService;
  private final AuthUtils authUtils;

  @Transactional(readOnly = true)
  public UserDTO getUser(final Long id) {
    final User user = findByIdNullSafe(userRepository, id);
    final UserDTO userDTO = userMapper.toUserDTO(user);
    userDTO.setIdsGroups(user.getGroups().stream().map(Group::getId).collect(toList()));

    List<RoleListDTO> roles = new ArrayList<>();

    user.getGroups().stream()
        .map(Group::getGroupType)
        .map(GroupType::getRoles)
        .flatMap(Collection::stream)
        .forEach(role -> roles.add(new RoleListDTO(role.getId(), true)));

    userDTO.setRoles(roles);

    return userDTO;
  }

  @Transactional(readOnly = true)
  public Set<Group> getGroupsForUser(final Long idUser) {
    return findByIdNullSafe(userRepository, idUser).getGroups();
  }

  @Transactional(readOnly = true)
  public List<Long> getUserIdsGroups(final Long id) {
    final User user = findByIdNullSafe(userRepository, id);

    return user.getGroups().stream().map(Group::getId).collect(toList());
  }

  @Transactional(readOnly = true)
  public List<UserDTO> findWithFilters(final FiltersDTO filters) {
    if (FALSE.equals(containsName(filters.getFilters(), "groups"))) {
      Filter filter = new Filter();
      filter.setField("groups");
      filter.setOperator(QueryOperator.IN);
      filter.setValues(getGroupsForUser(authUtils.getUserId())
          .stream()
          .map(group -> group.getId().toString())
          .collect(Collectors.toList()));
      filters.getFilters().add(filter);
    }

    final List<User> users = customUserRepository.getQueryResultNotPaged(filters.getFilters());

//		return buildPageDTO(contractsPage.getNumber(),
//				contractsPage.getTotalPages(),
//				contractMapper.toContractDTOs(contractsPage.getContent()));

    return userMapper.toUserDTOs(users);
  }

//    @Transactional(rollbackFor = Exception.class)
//    public Long updateUserRoles(final Long id, final List<Long> idsRoles) {
//        final User user = findByIdNullSafe(userRepository, id);
//
//        user.getRoles().clear();
//        user.getRoles().addAll(findByIdsNullSafe(roleRepository, idsRoles));
//
//        return userRepository.save(user).getId();
//    }

  @Transactional(rollbackFor = Exception.class)
  public void updateUserGroups(final Long id, final List<Long> idsGroups) {
    final User user = findByIdNullSafe(userRepository, id);

    user.getGroups().clear();
    user.getGroups().addAll(findByIdsNullSafe(groupRepository, idsGroups));

    userRepository.save(user);
  }

  @Transactional(rollbackFor = Exception.class)
  public void changePassword(final Long id, final UserPasswordDTO dto) {
    final User user = findByIdNullSafe(userRepository, id);

    if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
      throw new UserMessageException("Parola curentă este greșită!");
    }
    String newPassword = dto.getNewPassword();

    if (isNullOrEmpty(dto.getNewPassword())) {
      newPassword = randomAlphanumeric(8);
      try {
        emailService.sendPlainTextEmail(user.getEmail(),
            "[ANM] Parolă schimbată cu succes",
            format("Noua dumneavoastră parolă este: %s", newPassword));
      } catch (MailException e) {
        throw new UserMessageException("Resetarea parolei nu a reușit!");
      }
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }

  @Transactional(rollbackFor = Exception.class)
  public void toggleActiveStatusUser(String id, Integer currentActive) {
    userRepository.toggleActiveStatusById(Long.valueOf(id), currentActive);

  }

  public boolean containsName(final List<Filter> list, final String name) {
    return list.stream().filter(o -> o.getField().equals(name)).findFirst().isPresent();
  }
}
