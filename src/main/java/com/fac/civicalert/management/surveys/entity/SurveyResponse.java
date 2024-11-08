package com.fac.civicalert.management.surveys.entity;

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

import com.fac.civicalert.commons.entity.base.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@Entity
@Table(name = "survey_responses", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class SurveyResponse extends Auditable {

	  @Column(name = "id_survey", nullable = false, insertable = false, updatable = false)
	  private Long surveyId;

		@Column(name = "id_user", nullable = false)
	  private Long  userId;

	  @Column(name = "id_session", nullable = false, insertable = false, updatable = false)
	  private Long sessionId;

	  @Column(name = "id_zone", nullable = false, insertable = false, updatable = false)
	  private Long zoneId;

	  @Column(name = "id_language", nullable = false)
	  private Integer languageId;

	 
	  @Column(name = "latitude")
	  private String latitude;
	  
	  @Column(name = "longitude")
	  private String longitude;

	  
	  @Column(name = "id_answer_year")
	  private Long answerYearId;
	  
	  @ManyToOne(fetch = FetchType.LAZY)
	  @JoinColumn(name = "id_survey", referencedColumnName = "id", nullable = false)
	  private Survey survey;

	  @ManyToOne(fetch = FetchType.LAZY)
	  @JoinColumn(name = "id_zone", referencedColumnName = "id", nullable = false)
	  private Zone zone;

	  
	  @ManyToOne(fetch = FetchType.LAZY)
	  @JoinColumn(name = "id_session", referencedColumnName = "id", nullable = false)
	  private GeneratedSession generatedSession;
	  
	  @OneToMany(mappedBy = "surveyResponse", fetch = FetchType.LAZY)
	  private List<SavedAnswer> savedAnswers = new ArrayList<>();
}
