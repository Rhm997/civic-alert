package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.RequestLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestLogsRepository extends JpaRepository<RequestLogs, Long> {

}
