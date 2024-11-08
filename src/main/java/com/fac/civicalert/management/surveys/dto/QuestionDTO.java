package com.fac.civicalert.management.surveys.dto;


import java.util.List;
import lombok.Data;

@Data
public class QuestionDTO {

  private Long id;

  private String questionType;

  private String textRo;

  private String textEn;

  private String questNotesRo;

  private String questNotesEn;

  private Integer ord;
  
  private Short stat_map;
  
  private Short stat_graph;
  
  private Short stat_fixed;

  private List<AnswerDTO> answers;
}
