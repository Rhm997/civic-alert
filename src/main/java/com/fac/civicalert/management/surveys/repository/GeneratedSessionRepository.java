package com.fac.civicalert.management.surveys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fac.civicalert.management.surveys.entity.GeneratedSession;
import org.springframework.data.jpa.repository.Query;

public interface  GeneratedSessionRepository extends JpaRepository<GeneratedSession, Long>, JpaSpecificationExecutor<GeneratedSession>{

    @Query(value="select exists(select " +
            " gs2.id_survey " +
            "from " +
            " app.generated_session gs2 " +
            " left outer join app.asoc_user_zone_survey auzs on auzs.id_survey = gs2.id_survey " +
            " where " +
            " current_date between gs2.start_date and gs2.end_date " +
            " and gs2.current_agr_year = :agricYear " +
            " and gs2.id_survey = :idSurvey " +
            " and auzs.id_user = :idUser " +
            ")", nativeQuery = true)
    boolean checkCurrentSession(Integer agricYear, Integer idSurvey, Integer idUser);

}
