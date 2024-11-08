package com.fac.civicalert.commons.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chart", schema = "dash")
@EntityListeners(AuditingEntityListener.class)
public class Chart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name = "chart_name")
  private String chartName;
  @Column(name = "html")
  private String html;
  @Column(name = "html_Class")
  private String htmlClass;
  @Column(name = "obs")
  private String obs;
  @Column(name = "status")
  private String status;
  @Column(name = "url_img")
  private String urlImg;
  @Column(name = "description")
  private String description;
  @Column(name = "height")
  private String height;
  @Column(name = "width")
  private String width;
  @OneToMany(mappedBy = "chart", fetch = FetchType.LAZY)
  private Set<AsocUserChart> asocUserCharts;
}
