package com.fac.civicalert.management.surveys.controller;

import com.fac.civicalert.management.surveys.service.QuestionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@ConditionalOnProperty("management.endpoints.enabled")
@RequestMapping("/api/questions")
public class QuestionsController {

  @Autowired
  private QuestionsService questionsService;


}
