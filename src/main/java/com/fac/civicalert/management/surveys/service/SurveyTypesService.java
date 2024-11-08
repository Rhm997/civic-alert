package com.fac.civicalert.management.surveys.service;

import com.fac.civicalert.management.surveys.repository.SurveyTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyTypesService {

  @Autowired
  private SurveyTypeRepository surveyTypeRepository;


}
