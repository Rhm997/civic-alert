package com.fac.civicalert.commons.entity;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
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
@Table(name = "config", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Config {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Integer id;
  @Column(name = "key")
  private String key;
  @Column(name = "int_value")
  private Integer intValue;
  @Column(name = "numeric_value")
  private BigDecimal numericValue;
  @Column(name = "string_value")
  private String stringValue;


}
