package com.fac.civicalert.commons.entity;

import com.fac.civicalert.commons.entity.base.Auditable;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "request_logs", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class RequestLogs extends Auditable {

  @Column
  private LocalDateTime timestamp;
  @Column
  private String http_method;
  @Column
  private String path;
  @Column
  private String parameters;
  @Column
  private String payload;
  @Column
  private String response_code;
  @Column
  private String request_token;
}
