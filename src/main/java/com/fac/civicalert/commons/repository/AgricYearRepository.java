package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.AgricYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AgricYearRepository  extends JpaRepository<AgricYear, Long>, JpaSpecificationExecutor<AgricYear> {

    List<AgricYear> findFirstByOrderByIdDesc();

}
