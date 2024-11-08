package com.fac.civicalert.management.surveys.entity;

import com.fac.civicalert.commons.entity.base.Auditable;

import java.time.LocalDate;
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
@Table(name = "surveys", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Survey extends Auditable {

  @Column(name = "frequency", nullable = false)
  private Integer frequency;

  @Column(name = "unit")
  private String unit;

  @Column(name = "survey_title_ro")
  private String titleRo;

  @Column(name = "survey_title_en")
  private String titleEn;

  @Column(name = "survey_notes_ro")
  private String notesRo;

  @Column(name = "survey_notes_en")
  private String notesEn;

  @Column(name = "description_ro")
  private String descriptionRo;

  @Column(name = "description_en")
  private String descriptionEn;

  @Column(name = "start_campaign", nullable = false)
  private LocalDate startCampaign;

  @Column(name = "end_campaign", nullable = false)
  private LocalDate endCampaign;

  @Column(name = "survey_lang")
  private String surveyLang;

  @Column(name = "is_permanent")
  private Short isPermanent;

  @Column(name = "is_active")
  private Short isActive;  
 
  @Column(name = "id_survey_type", insertable = false, updatable = false)
  private Long idSurveyType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_survey_type", referencedColumnName = "id", nullable = false)
  private SurveyType surveyType;

  @OneToMany(mappedBy = "survey", fetch = FetchType.LAZY)
  private List<Question> questions;
}
