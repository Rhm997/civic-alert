package com.fac.civicalert.commons.entity;

import com.fac.civicalert.commons.entity.base.Auditable;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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
@Table(name = "users", schema = "app")
@EntityListeners(AuditingEntityListener.class)
public class User extends Auditable {

  @Column(name = "first_name")
  private String firstName;
  @Column(name = "last_name")
  private String lastName;
  @Column(nullable = false)
  private String username;
  @Column(nullable = false)
  private String email;
  @Column(name = "user_type", nullable = false)
  private String userType;
  @Column()
  private String phone;
  @Column()
  private String cnp;
  @Column()
  private String region;
  @Column()
  private String city;
  @Column()
  private String address;
  @Column(name = "url_ci")
  private String urlCI;
  @Column()
  private Integer active;
  @Column()
  private String password;
  @Column(name = "external_id")
  private String externalId;
  @Column(name = "register_token")
  private String registerToken;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(schema = "app", name = "asoc_user_group", joinColumns = @JoinColumn(name = "id_user"), inverseJoinColumns = @JoinColumn(name = "id_group"))
  private Set<Group> groups;

}
