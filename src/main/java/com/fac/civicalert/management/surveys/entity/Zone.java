package com.fac.civicalert.management.surveys.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;

import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fac.civicalert.commons.entity.base.Auditable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@Entity
@Table(name = "zones", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Zone extends Auditable {

	  @Column(name = "country", nullable = false)
	  private String country;

	  @Column(name = "region", nullable = false)
	  private String region;
	  
	  @Column(name = "county", nullable = false)
	  private String county;
	
	  @Column(name = "city", nullable = false)
	  private String city;
	 
	  @OneToMany(mappedBy = "zone", fetch = FetchType.LAZY)
	  private List<SurveyResponse> surveyResponses = new ArrayList<>();

}
