package com.fac.civicalert.management.surveys.entity;

import com.fac.civicalert.commons.entity.User;
import com.fac.civicalert.commons.entity.base.Auditable;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@Entity
@Table(name = "asoc_user_zone_survey", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class AsocUserZoneSurvey extends Auditable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_zone", referencedColumnName = "id", nullable = false)
    private Zone zone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_survey", referencedColumnName = "id", nullable = false)
    private Survey survey;

}
