package com.fac.civicalert.commons.controller;

import com.fac.civicalert.commons.common.exception.MessageResponse;
import com.fac.civicalert.commons.dto.GroupDTO;
import com.fac.civicalert.commons.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

  private final GroupService groupService;

  @PostMapping
  public ResponseEntity<Long> createGroup(@RequestBody final GroupDTO dto) {
    return ResponseEntity.status(CREATED).body(groupService.createGroup(dto));
  }

  @PostMapping("/{id}/roles")
  public ResponseEntity<MessageResponse> updateGroupRoles(@PathVariable final Long id,
                                                          @RequestBody final List<Long> idsRoles) {
    groupService.updateGroupRoles(id, idsRoles);

    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MessageResponse> deleteGroup(@PathVariable final Long id) {
    groupService.deleteGroup(id);

    return ResponseEntity.ok(new MessageResponse("Success"));
  }
}
