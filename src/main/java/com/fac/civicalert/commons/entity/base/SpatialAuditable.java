package com.fac.civicalert.commons.entity.base;

import java.io.Serializable;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public abstract class SpatialAuditable implements Serializable {

  @CreationTimestamp
  @Column(name = "created_at")
  private Timestamp createdAt;

  @CreatedBy
  @Column(name = "created_by")
  private Long createdBy;

  @UpdateTimestamp
  @Column(name = "modified_at")
  private Timestamp modifiedAt;

  @LastModifiedBy
  @Column(name = "modified_by")
  private Long modifiedBy;

}