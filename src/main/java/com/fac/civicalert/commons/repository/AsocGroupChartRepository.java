package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.AsocGroupChart;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsocGroupChartRepository extends JpaRepository<AsocGroupChart, Long> {

  List<AsocGroupChart> findAllByIdGroupIn(final List<Long> idsGroups);
}
