package com.fac.civicalert.management.surveys.repository;

import com.fac.civicalert.management.surveys.entity.SurveyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SurveyTypeRepository extends JpaRepository<SurveyType, Long>, JpaSpecificationExecutor<SurveyType> {

}