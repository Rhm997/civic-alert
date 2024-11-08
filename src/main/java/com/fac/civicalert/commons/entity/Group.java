package com.fac.civicalert.commons.entity;

import com.fac.civicalert.commons.entity.base.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "group", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class Group extends Auditable {

    @Column(nullable = false)
    private String name;
    @Column
    private String obs;

    @Column(name = "id_group_type", insertable = false, updatable = false)
    private Long idGroupType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_group_type", referencedColumnName = "id", nullable = false)
    private GroupType groupType;

    @ManyToMany(mappedBy = "groups", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();
}
