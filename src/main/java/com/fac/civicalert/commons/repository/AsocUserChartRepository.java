package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.AsocUserChart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AsocUserChartRepository extends JpaRepository<AsocUserChart, Long> {
//  @Query(value ="Select new com.fida.wastemanagement.dto.AsocUserChartDTO "
//      + " (auc.id, auc.idUser, auc.idChart, auc.htmlId, auc.filters, auc.obs, auc.sequence, "
//      + " auc.chart.chartName, auc.chart.html, auc.chart.htmlClass, auc.chart.obs, auc.chart.status, auc.chart.urlImg, auc.chart.description, auc.chart.width, auc.chart.height)"
//      + " From AsocUserChart auc "
//      + " WHERE auc.idUser = :idUser "
//      + " order by auc.sequence")
//  List<AsocUserChartDTO> findAllByIdUser(Long idUser);
  @Modifying(flushAutomatically = true)
  @Query(value ="update AsocUserChart auc "
      + "set auc.sequence = :ord where auc.id = :id_cadran")
  void updateChartsOrderByUser(Long id_cadran, Integer ord);


}
