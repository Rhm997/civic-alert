package com.fac.civicalert.commons.controller;

import com.fac.civicalert.commons.common.exception.MessageResponse;
import com.fac.civicalert.commons.entity.AgricYear;
import com.fac.civicalert.commons.service.AgricYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/agricYear")
@RequiredArgsConstructor
public class AgricYearController {

    private final AgricYearService agricYearService;

    @PostMapping()
    public ResponseEntity<MessageResponse> createAgricYear(@RequestBody final AgricYear agricYear) {
        agricYearService.createAgricYear(agricYear);
        return ResponseEntity.status(CREATED).body(new MessageResponse("okay"));
    }

    @GetMapping()
    public ResponseEntity<Integer> getAgricYear() {
        return ResponseEntity.ok(agricYearService.getAgricYear().get(0).getId().intValue());
    }
}
