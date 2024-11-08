package com.fac.civicalert.commons.controller;

import com.fac.civicalert.commons.common.exception.MessageResponse;
import com.fac.civicalert.commons.dto.RoleDTO;
import com.fac.civicalert.commons.service.RoleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class RoleController {

  private final RoleService roleService;

  @GetMapping
  @PreAuthorize("hasRole('MASTER')")
  public ResponseEntity<List<RoleDTO>> findAll() {
    return ResponseEntity.ok(roleService.findAll());
  }

  @PostMapping
  public ResponseEntity<MessageResponse> createRole(@RequestBody final RoleDTO dto) {
    roleService.createRole(dto);

    return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Success"));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MessageResponse> deleteRole(@PathVariable final Long id) {
    roleService.deleteRole(id);

    return ResponseEntity.ok(new MessageResponse("Success"));
  }
}
