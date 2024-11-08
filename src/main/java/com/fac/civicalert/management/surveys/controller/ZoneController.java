package com.fac.civicalert.management.surveys.controller;

import com.fac.civicalert.management.surveys.dto.ZoneDTO;
import com.fac.civicalert.management.surveys.service.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/zones")
public class ZoneController {

    private final ZoneService zoneService;

    @GetMapping
    public ResponseEntity<List<ZoneDTO>> findAll() {
        List<ZoneDTO> zonesDTO = zoneService.findAll();
        return ResponseEntity.ok(zonesDTO);
    }
}
