package com.fac.civicalert.management.surveys.entity;

import com.fac.civicalert.commons.entity.base.Auditable;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Entity
@Table(name = "survey_types", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class SurveyType extends Auditable {

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @OneToMany(mappedBy = "surveyType", fetch = FetchType.LAZY)
  private List<Survey> surveys = new ArrayList<>();
}
