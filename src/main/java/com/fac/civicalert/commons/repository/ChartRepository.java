package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.Chart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Long> {

}
