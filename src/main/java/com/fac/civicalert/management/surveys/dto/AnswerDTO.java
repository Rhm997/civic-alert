package com.fac.civicalert.management.surveys.dto;

import lombok.Data;

@Data
public class AnswerDTO {

  private Long id;

  private String descriptionRo;

  private String descriptionEn;

  private Integer ord;
  
  private String response;
}
