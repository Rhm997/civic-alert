package com.fac.civicalert.management.surveys.entity;

import com.fac.civicalert.commons.entity.base.Auditable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Entity
@Table(name = "answers", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Answer extends Auditable {

  @Column(name = "id_question", nullable = false, insertable = false, updatable = false)
  private Long idQuestion;

  @Column(name = "description_ro")
  private String descriptionRo;

  @Column(name = "description_en")
  private String descriptionEn;

  @Column(name = "response", nullable = false)
  private String response;

  @Column(name = "ord")
  private Integer ord;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_question", referencedColumnName = "id", nullable = false)
  private Question question;
}
