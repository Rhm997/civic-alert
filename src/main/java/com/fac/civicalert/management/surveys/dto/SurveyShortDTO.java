package com.fac.civicalert.management.surveys.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;
@Data
public class SurveyShortDTO {
	  private Long id;

	  private String descriptionRo;

	  private String descriptionEn;

	  private LocalDate startCampaign;

	  private LocalDate endCampaign;

	  private Integer surveyFrequencyInDays; // e.g. every 7 days in given interval

	  private Long idSurveyType;
}
