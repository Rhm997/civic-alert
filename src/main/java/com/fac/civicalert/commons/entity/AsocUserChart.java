package com.fac.civicalert.commons.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "asoc_user_chart", schema = "dash")
@Builder
@EntityListeners(AuditingEntityListener.class)
public class AsocUserChart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "id_user", insertable = false, updatable = false)
  private Long idUser;
  @Column(name = "id_chart", insertable = false, updatable = false)
  private Long idChart;
  @Column(name = "html_id")
  private String htmlId;
  @Column(name = "filters")
  private String filters;
  @Column(name = "obs")
  private String obs;
  @Column(name = "sequence")
  private Integer sequence;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_user", referencedColumnName = "id", nullable = false)
  private User user;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_chart", referencedColumnName = "id", nullable = false)
  private Chart chart;
}
