package com.fac.civicalert.management.surveys.repository;

import com.fac.civicalert.management.surveys.entity.SurveyResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long>, JpaSpecificationExecutor<SurveyResponse> {

}
