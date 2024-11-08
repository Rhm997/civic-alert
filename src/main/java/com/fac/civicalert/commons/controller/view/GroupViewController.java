package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/groups")
public class GroupViewController {

//  private final RoleService roleService;
//  private final GroupService groupService;
//  private final UatService uatService;
//
//  @GetMapping("/all")
//  public String getAllGroups(ModelMap mModel) {
//    mModel.put("groups", groupService.findAll());
//    mModel.put("groupTypes", groupService.findAllGroupTypes());
//
//    return "pages/group/groups";
//  }
//
//  @GetMapping("/{id}")
//  public String getGroup(ModelMap mModel, @PathVariable Long id) {
//    if (id > 0) {
//      mModel.put("group", groupService.findById(id));
//    }
//    mModel.put("groupTypes", groupService.findAllGroupTypes());
//    mModel.put("roles", roleService.findAll());
//    mModel.put("uats", uatService.findAllActiveUats());
//    mModel.put("groupUats", uatService.getAllForGroup(id));
//
//    return "pages/group/group";
//  }
}
