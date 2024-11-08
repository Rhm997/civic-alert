package com.fac.civicalert.management.surveys.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class SurveyFormDTO {

  private Long id;
  private String titleRo;
  private String titleEn;
  private String notesRo;
  private String notesEn;
  private String descriptionRo;
  private String descriptionEn;
  private LocalDate startCampaign;
  private LocalDate endCampaign;
  private Integer surveyFrequencyInDays; // e.g. every 7 days in given interval
  private Long idSurveyType;
  private Short isActive; //0 not active ; 1 is active 
  private Short isPermanent; // 0 start + stop available; 1- permanent  
  private List<QuestionDTO> questions;
}
