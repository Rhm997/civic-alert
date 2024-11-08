package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.GroupType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupTypeRepository extends JpaRepository<GroupType, Long> {

}