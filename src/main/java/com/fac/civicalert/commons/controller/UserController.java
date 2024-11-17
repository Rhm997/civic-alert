package com.fac.civicalert.commons.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fac.civicalert.commons.common.exception.MessageResponse;
import com.fac.civicalert.commons.dto.FiltersDTO;
import com.fac.civicalert.commons.dto.UserDTO;
import com.fac.civicalert.commons.security.dto.UserPasswordDTO;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final ObjectMapper objectMapper;
  private final UserService userService;
  private final AuthUtils authUtils;

  @GetMapping("/{id}")
  public UserDTO getUser(@PathVariable Long id) {
    id = id == 0 ? authUtils.getUserId() : id;
    return userService.getUser(id);
  }

//    @GetMapping("/locations")
//    public ResponseEntity<List<LocationDTO>> getUserLocationTable(ModelMap mModel) {
//        return ResponseEntity.ok(locationService.getUserLocations(authUtils.getUserId()));
//    }

  @PostMapping("/{id}/password")
  public ResponseEntity<MessageResponse> changePassword(@PathVariable final Long id,
      @RequestBody final UserPasswordDTO dto) {
    userService.changePassword(id, dto);

    return ResponseEntity.ok(new MessageResponse("Success"));
  }

//  @PostMapping("/{id}/roles")
//  public ResponseEntity<MessageResponse> updateUserRoles(@PathVariable final Long id,
//      @RequestBody final List<Long> idsRoles) {
//    userService.updateUserRoles(id, idsRoles);
//
//    return ResponseEntity.ok(new MessageResponse("Success"));
//  }

  @PostMapping("/{id}/groups")
  public ResponseEntity<MessageResponse> updateUserGroups(@PathVariable final Long id,
      @RequestBody final List<Long> idsGroups) {
    userService.updateUserGroups(id, idsGroups);

    return ResponseEntity.ok(new MessageResponse("Success"));
  }

  @PostMapping("/{id}/toggle")
  public ResponseEntity<MessageResponse> toggleActiveInactiveUser(@PathVariable final String id,
      @RequestParam final Integer currentActive) {
    userService.toggleActiveStatusUser(id, currentActive);

    return ResponseEntity.ok(new MessageResponse("Success"));
  }
}
