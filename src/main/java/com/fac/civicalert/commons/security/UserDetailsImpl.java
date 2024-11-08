package com.fac.civicalert.commons.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fac.civicalert.commons.entity.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@EqualsAndHashCode
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Service
public class UserDetailsImpl implements UserDetails {

  private Long id;
  private String email;
  private String username;
  private String fullName;
  private String userType;
  @JsonIgnore
  private String password;
  @JsonIgnore
  private boolean active;
  private Collection<? extends GrantedAuthority> authorities;


  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = new ArrayList<>();

//    user.getGroups().stream()
//        .map(Group::getGroupType)
//        .map(GroupType::getRoles)
//        .flatMap(Collection::stream)
//        .forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRole())));

//    user.getGroups().stream()
//        .map(Group::getRoles)
//        .forEach(roles -> roles.forEach(
//            role -> authorities.add(new SimpleGrantedAuthority(role.getRole()))));

    authorities.add(new SimpleGrantedAuthority(user.getUserType()));

    return new UserDetailsImpl(
        user.getId(),
        user.getEmail(),
        user.getUsername(),
        user.getFirstName() + ' ' + user.getLastName(),
        user.getUserType(),
        user.getPassword(),
        user.getActive() == 1,
        authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }
  
  public Long getId() {
      return id;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return active;
  }

}
