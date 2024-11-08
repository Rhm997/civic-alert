package com.fac.civicalert.management.surveys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.fac.civicalert.management.surveys.entity.SavedAnswer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface SavedAnswerRepository extends JpaRepository<SavedAnswer, Void>, JpaSpecificationExecutor<SavedAnswer>{

/*    @Query(value = "select sa.id_answer, sa.given_answer from app.saved_answers sa where sa.id_survey = :id", nativeQuery = true)
    Map<String, Object> getAnswersClient(Long id);*/
@Query(value = "select sa.id_survey_response from app.saved_answers sa where sa.id_survey = :id  and id_answer_session =:crtSession and id_answer_year =:crtYear and id_zone =:idZona LIMIT 1", nativeQuery = true)
    Long getIdSurveyResponseByIdSurvey(@Param("id")Long id, @Param("crtSession")Long crtSession , @Param("crtYear")Long crtYear, @Param("idZona")Long idZona);
   //@Param("id_tip_incident")Integer id_tip_incident,  @Param("id_fisa")Long id_fisa

    void deleteAllByIdSurveyResponse(Long idSurveyResponse);

    @Query(value = "select id as session_id from app.generated_session gs where current_date between start_date and end_date and id_survey = :id", nativeQuery = true)
    Long getCurrentSessionForCurrentSurvey(Long id);
    
    
    
    
    @Query(value = "SELECT MAX(id_answer_session) AS max_session "
    		+ "        FROM app.saved_answers where id_survey=:idSurvey and id_zone=:idZone and id_answer_year=:answerYear and id_user=:idUser", nativeQuery = true)
    Long getMaxSessionForCurrentSurvey(Long idSurvey,Long idZone, Long answerYear, Long idUser);
    
  
    @Query(value = "WITH max_session_query AS ( "
    		+ "    		    SELECT MAX(id_answer_session) AS max_session "
    		+ "    		    FROM app.saved_answers where id_survey=:id and id_zone=:idZona and id_answer_year=:crtYear "
    		+ "    		) "
    		+ "    	select sa.id_answer as answerId, sa.given_answer as givenAnswer "
    		+ " from app.saved_answers "
    		+ "    		        sa where sa.id_survey=:id  and sa.id_zone=:idZona "
    		+ "    		        and sa.id_answer_year=:crtYear "
    		+ "    		        and sa.id_answer_session = (select max_session from max_session_query)", nativeQuery = true)
	List<Map<String, Object>> getAnswerClientV2(@Param("id") Long id, @Param("idZona") Long idZona, @Param("crtYear") Long crtYear,@Param("id") Long id1,@Param("idZona") Long idZona1,@Param("crtYear") Long crtYear1);


    void deleteAllBySurveyId(Long id);
}
