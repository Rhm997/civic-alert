package com.fac.civicalert.commons.entity;

import com.fac.civicalert.commons.entity.base.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "role", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Role extends Auditable {

    @Column(updatable = false, nullable = false)
    private String role;

    @Column(updatable = false, nullable = false)
    private String description;

    @Column(updatable = false)
    private String obs;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private List<GroupType> groupTypes = new ArrayList<>();

}
