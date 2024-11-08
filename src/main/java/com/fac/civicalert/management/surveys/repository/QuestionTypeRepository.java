package com.fac.civicalert.management.surveys.repository;

import com.fac.civicalert.management.surveys.entity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long>, JpaSpecificationExecutor<QuestionType> {

    QuestionType findAllByName(final String name);
}
