package com.fac.civicalert.management.surveys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fac.civicalert.commons.entity.base.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import lombok.Data;

@Data
@Entity
@Table(name = "saved_answers", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class SavedAnswer extends Auditable {
	
		@Column(name = "id_user", nullable = false)
		private Long userId;

		@Column(name = "id_survey", nullable = false)
		private Long surveyId;

		@Column(name = "id_question", nullable = false)
		private Long questionId;

		@Column(name = "id_answer", nullable = false)
		private Long answerId;

		@Column(name = "final_question_answer")
		private String finalQuestionAnswer;
		
		@Column(name = "given_answer")
		private String givenAnswer;
		
		@Column(name = "id_answer_session")
		private Long answerSessionId;
		  
		@Column(name = "id_answer_year")
		private Long answerYearId;
		
		@Column(name = "id_zone")
		private Long zoneId;
		
		@Column(name = "id_survey_response", nullable = false, insertable = false, updatable = false)
		private Long idSurveyResponse;
		 
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "id_survey_response", referencedColumnName = "id", nullable = false)
		private SurveyResponse surveyResponse;
	
}
