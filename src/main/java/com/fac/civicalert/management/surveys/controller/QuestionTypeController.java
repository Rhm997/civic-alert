package com.fac.civicalert.management.surveys.controller;


import com.fac.civicalert.management.surveys.dto.QuestionTypeDTO;
import com.fac.civicalert.management.surveys.service.QuestionTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@ConditionalOnProperty("management.endpoints.enabled")
@RequestMapping("/api/questionTypes")
public class QuestionTypeController {

    private final QuestionTypeService questionTypeService;

    @GetMapping
    @PreAuthorize("hasAuthority('MANAGER')")
    public ResponseEntity<List<QuestionTypeDTO>> getAll() {
      return ResponseEntity.ok(questionTypeService.getAllQuestionTypes());
    }
}