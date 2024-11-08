package com.fac.civicalert.management.surveys.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class GeneratedSessionDTO {
	  private Long id;
	  private String sesssionName;
	  private LocalDate startDate;
	  private LocalDate endDate;
	  private Long surveyId;
	  private String anAgricol;
	  private Integer valid;
	  private Integer who;
}
