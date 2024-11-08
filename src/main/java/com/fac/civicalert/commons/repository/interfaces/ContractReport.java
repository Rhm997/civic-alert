package com.fac.civicalert.commons.repository.interfaces;

import org.springframework.beans.factory.annotation.Value;

public interface ContractReport {

  Long getId();

  @Value("#{target.nr_doc}")
  String getNrDoc();

  @Value("#{target.client_name}")
  String getClientName();

  @Value("#{target.location_address}")
  String getLocationAddress();

  String getActive();

  @Value("#{target.nr_pers}")
  Integer getNrPers();

  Integer getBins();
}
