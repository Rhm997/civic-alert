package com.fac.civicalert.commons.repository.interfaces;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.sql.Timestamp;

public interface Collects {

  Long getId();

  @Value("#{target.id_bin}")
  Long getIdBin();

  @Value("#{target.bar_code}")
  String getBarCode();

  @Value("#{target.rfid}")
  String getRfId();

  BigDecimal getQty();

  @Value("#{target.id_um}")
  String getIdUm();

  @Value("#{target.id_waste_type}")
  Long getIdWasteType();

  @Value("#{target.inserted_at}")
  Timestamp getInsertedAt();

  String getX();

  String getY();

  String getLat();

  String getLong();

  @Value("#{target.id_inv}")
  Long getIdInv();

  @Value("#{target.created_at}")
  Timestamp getCreatedAt();

  @Value("#{target.created_by}")
  Long getCreatedby();

  @Value("#{target.modified_by}")
  Long getModifiedBy();

  @Value("#{target.modified_at}")
  Timestamp getModifiedAt();

  String getSimbolgis();

  @Value("#{target.id_contract}")
  Long getIdContract();

  @Value("#{target.nr_doc}")
  String getNrDoc();

  @Value("#{target.client_name}")
  String getClientName();

  String getLocation();

  String getUm();

  String getFraction();

  String getOperator();

  @Value("#{target.contract_type}")
  String getContractType();
}
