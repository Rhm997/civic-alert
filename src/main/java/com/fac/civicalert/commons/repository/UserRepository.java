package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.User;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

  @Query("select u from User u where (upper(u.username) = upper(:username) or upper(u.email) = upper(:email) or upper(u.username) = upper(:email) or upper(u.email) = upper(:username))")
  Optional<User> findByUsernameOrEmailIgnoreCase(final String username, final String email);

//  @Query("select * " +
//      "from User u " +
//      "where " +
//      "u.groups in  (select id_group from app.asoc_group_uat agu where agu.id_uat in (:idUats) ) ")
//  List<User> getAll(final List<Long> idUats);

  Optional<User> findByEmailIgnoreCase(final String email);

  User findByRegisterToken(final String email);

  boolean existsByUsername(final String username);

  boolean existsByEmail(final String email);

  boolean existsByUsernameAndIdNot(final String username, final Long id);

  boolean existsByEmailAndIdNot(final String username, final Long id);

  @Modifying
  @Query("update User u set u.active = case when (:currentActive = 0) then 1 else 0 end where u.id = :id")
  void toggleActiveStatusById(Long id, Integer currentActive);
}
