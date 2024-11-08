package com.fac.civicalert.commons.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "asoc_group_chart", schema = "dash")
@EntityListeners(AuditingEntityListener.class)
public class AsocGroupChart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "id_group")
  private Long idGroup;
  @Column(name = "id_chart")
  private Long idChart;
  @Column(name = "html_id")
  private String htmlId;
  @Column(name = "filters")
  private String filters;
  @Column(name = "obs")
  private String obs;
  @Column(name = "sequence")
  private Integer sequence;
}

