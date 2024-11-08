package com.fac.civicalert.management.surveys.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

import com.fac.civicalert.commons.common.exception.MessageResponse;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.management.surveys.repository.GeneratedSessionRepository;
import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import com.fac.civicalert.management.surveys.dto.SurveyFormDTO;
import com.fac.civicalert.management.surveys.service.SurveyService;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ConditionalOnProperty("management.endpoints.enabled")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

  private final SurveyService surveyService;
  private final GeneratedSessionRepository generatedSessionRepository;
  private final AuthUtils authUtils;
  private final SurveyRepository surveyRepository;


  @PostMapping
  public ResponseEntity<MessageResponse> createSurvey(@RequestBody SurveyFormDTO dto) {
    System.out.println("survey test: " + dto);
    surveyService.createSurvey(dto);
    //@todo vreau try catch cu alt body!!!
    return ResponseEntity.status(CREATED).body(new MessageResponse("Survey created"));
  }

  @PutMapping
  public ResponseEntity<MessageResponse> updateSurvey(@RequestBody SurveyFormDTO dto) {
    surveyService.updateSurvey(dto);
   //@todo vreau try catch cu alt body!!!
    return ResponseEntity.ok(new MessageResponse("survey updated"));
  }

  @GetMapping
  public ResponseEntity<List<SurveyFormDTO>> getAll() {
    List<SurveyFormDTO> sdto = surveyService.findAll();
    return ResponseEntity.ok(sdto);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SurveyFormDTO> getById(@PathVariable("id") Long id) {
    SurveyFormDTO sdto = surveyService.getById(id);
    return ResponseEntity.ok(sdto);
  }

  @GetMapping("/checkSession/{agricYear}/{idSurvey}")
  public ResponseEntity<Boolean> checkCurrentSession(@PathVariable("agricYear") Integer agricYear, @PathVariable("idSurvey") Integer idSurvey) {
    System.out.println("TEST: " + authUtils.getUserId().intValue());
    Boolean checkCurrentSession = generatedSessionRepository.checkCurrentSession(agricYear, idSurvey, authUtils.getUserId().intValue());
    System.out.println("CHECK " + checkCurrentSession);
    return ResponseEntity.ok(checkCurrentSession);
  }


  @GetMapping("/{id}/{denumire}")
  public ResponseEntity<Void> createFromExisting(@PathVariable("id") Long id,
      @PathVariable("denumire") String denumire) {
    //incarc 'template-ul' initial
    SurveyFormDTO sdto = surveyService.getById(id);
    //modific ce trebuie sa modific in ala initial
    sdto.setTitleRo(denumire + "_copy");

    System.out.println("creare din existent:" + sdto);

    surveyService.createSurvey(sdto);
    return ResponseEntity.status(CREATED).build();
  }

  @PutMapping("/softDelete/{id}")
  public ResponseEntity<MessageResponse> deleteSurvey(@PathVariable("id")  Long id) {
    surveyService.softDeleteSurvey(id);
    return ResponseEntity.status(OK).body(new MessageResponse("Survey deleted"));
  }
}
