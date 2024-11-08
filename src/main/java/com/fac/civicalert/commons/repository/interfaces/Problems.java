package com.fac.civicalert.commons.repository.interfaces;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Timestamp;

public interface Problems {
  Long getId();

  String getTitle();

  String getDescription();

  @Value("#{target.id_problem}")
  Long getIdProblem();

  @Value("#{target.id_bin}")
  Long getIdBin();

  @Value("#{target.bar_code}")
  String getBarCode();

  @Value("#{target.rfid}")
  String getRfId();

  Integer getScore();

  @Value("#{target.id_status}")
  Long getIdStatus();

  @Value("#{target.image_url}")
  String getImageUrl();

  String getX();

  String getY();

  String getLat();

  String getLong();

  @Value("#{target.inserted_at}")
  Timestamp getInsertedAt();

  @Value("#{target.created_at}")
  Timestamp getCreatedAt();

  @Value("#{target.created_by}")
  Long getCreatedby();

  @Value("#{target.modified_at}")
  Timestamp getModifiedAt();

  @Value("#{target.modified_by}")
  Long getModifiedBy();

  String getSimbolgis();

  @Value("#{target.id_contract}")
  Long getIdContract();

  @Value("#{target.nr_doc}")
  String getNrDoc();

  @Value("#{target.client_name}")
  String getClientName();

  String getLocation();

  String getStatus();

  String getOperator();

  @Value("#{target.contract_type}")
  String getContractType();


}
