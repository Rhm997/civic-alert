package com.fac.civicalert.client.surveys.controller;

import static org.springframework.http.HttpStatus.CREATED;

import com.fac.civicalert.commons.common.exception.MessageResponse;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.client.surveys.dto.SurveyResponseDTO;
import com.fac.civicalert.client.surveys.service.SurveyResponseService;
import com.fac.civicalert.client.surveys.service.SurveyZonesService;
import com.fac.civicalert.management.surveys.service.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/surveyResponse")

public class SurveyResponseController {

  private final SurveyResponseService surveyResponseService;
  private final SurveyZonesService surveyZonesService;
  private final ZoneService zoneService;
  private final AuthUtils authUtils;

  @PostMapping
  public ResponseEntity<MessageResponse> createSurveyResponse(@RequestBody final SurveyResponseDTO dto, @RequestParam(name = "idSurveyResponse") Long idSurveyResponse) {
    surveyResponseService.createSurveyResponse(dto, idSurveyResponse);

    return ResponseEntity.status(CREATED).body(new MessageResponse("survey send"));
  }

  @GetMapping("/getAsocSurveyZones/{id}")
  public ResponseEntity<Map<String, String>> getAsocSurveyZones(@PathVariable("id") final Long idSurvey) {
	  	
    return ResponseEntity.ok(surveyZonesService.findAllByIdUser(authUtils.getUserId(), idSurvey));
  }

  @PostMapping("/asocSurveyZones")
  public ResponseEntity<MessageResponse> asocSurveyZones(@RequestBody final Map<String, List<Integer>> asoc) {
    zoneService.updateSurveyZones(authUtils.getUserId(), asoc);

    return ResponseEntity.ok(new MessageResponse("Success"));
  }



}