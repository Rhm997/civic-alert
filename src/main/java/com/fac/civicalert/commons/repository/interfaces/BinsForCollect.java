package com.fac.civicalert.commons.repository.interfaces;

import java.sql.Timestamp;

public interface BinsForCollect {

  Long getNoRow();

  Long getTotalCount();

  Long getId();

  String getBarCode();

  String getRfid();

  Integer getCapacity();

  String getFraction();

  String getUm();

  Integer getActive();

  String getAllProblems();

  Timestamp getLastCollectedAt();

  Timestamp getLastProblemAt();

  String getContractOwner();

  String getFullAddress();
}
