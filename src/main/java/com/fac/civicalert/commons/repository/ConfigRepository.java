package com.fac.civicalert.commons.repository;

import com.fac.civicalert.commons.entity.Config;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends JpaRepository<Config, Long> {

  Config findConfigByKey(String key);
}
