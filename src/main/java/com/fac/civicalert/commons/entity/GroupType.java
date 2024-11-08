package com.fac.civicalert.commons.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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
@Table(name = "group_type", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class GroupType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @OneToMany(mappedBy = "groupType", fetch = FetchType.LAZY)
  private List<Group> groups = new ArrayList<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(schema = "app", name = "asoc_group_type_role", joinColumns = @JoinColumn(name = "id_group_type"), inverseJoinColumns = @JoinColumn(name = "id_role"))
  private List<Role> roles;
}
