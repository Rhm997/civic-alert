package com.fac.civicalert.management.surveys.entity;

import java.time.LocalDate;
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
@Table(name = "generated_session", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class GeneratedSession extends Auditable {
	  @Column(name = "session_name", nullable = false)
	  private String sessionName;

	  @Column(name = "start_date", nullable = false)
	  private LocalDate startDate;

	  @Column(name = "end_date", nullable = false)
	  private LocalDate endDate;

	  @Column(name = "valid")
	  private Integer valid;

	  @Column(name = "id_survey", nullable = false, insertable = false, updatable = false)
	  private Long idSurvey;
	  
	  @Column(name = "status")
	  private String status;
	  
	  @Column(name = "who")
	  private Integer who;

	  @Column(name = "current_agr_year")
	  private Integer agricYear;
	  	  
	  //mai multe generated_sessions legate de un survey, id_survey- foreign key
	  @ManyToOne(fetch = FetchType.LAZY)
	  @JoinColumn(name = "id_survey", referencedColumnName = "id", nullable = false)
	  private Survey survey;
	  
	  //mai multe saved surveys la o 'generate session'
	  @OneToMany(mappedBy = "generatedSession", fetch = FetchType.LAZY)
	  private List<SurveyResponse> surveyResponses = new ArrayList<>();



}
