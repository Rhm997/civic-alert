package com.fac.civicalert.management.surveys.entity;

import com.fac.civicalert.commons.entity.base.Auditable;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Entity
@Table(name = "questions", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Question extends Auditable {

  @Column(name = "id_survey", nullable = false, insertable = false, updatable = false)
  private Long idSurvey;


  @Column(name = "question_type", nullable = false, insertable = false, updatable = false)
  private String questionType;


  @Column(name = "text_ro")
  private String textRo;

  @Column(name = "text_en")
  private String textEn;

  @Column(name = "quest_notes_ro")
  private String questNotesRo;

  @Column(name = "quest_notes_en")
  private String questNotesEn;
  
  @Column(name = "stat_map")
  private Short statMap;
  
  @Column(name = "stat_graph")
  private Short statGraph;
  
  @Column(name = "stat_fixed")
  private Short statFixed;

  @Column(name = "ord")
  private Integer ord;
  //mai multe questions legate de un survey, id_survey- foreign key
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_survey", referencedColumnName = "id", nullable = false)
  private Survey survey;
  
  //mai multe answers la o intrebare
  @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
  private List<Answer> answers = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_type", referencedColumnName = "name", nullable = false)
  private QuestionType questionTypes;
}
