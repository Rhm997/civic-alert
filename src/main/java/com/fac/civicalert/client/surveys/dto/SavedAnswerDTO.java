package com.fac.civicalert.client.surveys.dto;
import javax.persistence.Column;

import lombok.Builder;
import lombok.Data;

@Data
public class SavedAnswerDTO {
	  private Long id;
	  private Long userId;
	  private Long surveyId;
	  private Long questionId;
	  private Long answerId;
	  private String finalQuestionAnswer;
	  private String givenAnswer;
	  private Long answerSessionId;
	  private Long answerYearId;
	  private Long zoneId;
}
