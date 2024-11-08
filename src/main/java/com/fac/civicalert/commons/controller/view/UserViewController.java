package com.fac.civicalert.commons.controller.view;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.service.GroupService;
import com.fac.civicalert.commons.service.UserService;
import com.fac.civicalert.commons.dto.FiltersDTO;
import com.fac.civicalert.commons.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/users")
public class UserViewController {

  private final AuthUtils authUtils;
  private final UserService userService;
  private final RoleService roleService;
  private final GroupService groupService;
  private final ObjectMapper objectMapper;

  @GetMapping("/all")
  public String getAllUsers(HttpServletRequest request, ModelMap mModel, @RequestHeader("filters") final String filters) throws JsonProcessingException {
    mModel.put("users", userService.findWithFilters(objectMapper.readValue(filters, FiltersDTO.class)));
    mModel.put("groups", userService.getGroupsForUser(authUtils.getUserId()));
    return "pages/user/users";
  }


  @GetMapping("/{id}")
  public String getUser(ModelMap mModel, @PathVariable Long id) {
    id = id == 0 ? authUtils.getUserId() : id;

    System.out.println("intrare in user/ getUser");

    mModel.put("loggedUser", authUtils.getUserId());
    mModel.put("user", userService.getUser(id));
    mModel.put("roles", roleService.findAll());
    mModel.put("groups", groupService.findAll());

    return "pages/user/user";
  }

  @GetMapping("/resetPassword")
  public String resetPassword(ModelMap mModel) {
    return "pages/user/resetPassword";
  }

  @GetMapping("/locations")
  public String getUserLocationVIew() {

    return "pages/user/location";
  }


}
