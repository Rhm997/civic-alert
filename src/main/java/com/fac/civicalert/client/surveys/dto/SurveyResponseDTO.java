package com.fac.civicalert.client.surveys.dto;
import java.util.List;

import lombok.Data;

@Data
public class SurveyResponseDTO {
	  private Long id;
	  private Integer languageId;
	  private Long   surveyId;
	  private Long userId;
	  private Long sessionId;
	  private Long zoneId;
	  private String latitude;
	  private String longitude;
	  private Long answerYearId;
	  private List<SavedAnswerDTO> answers;
}
