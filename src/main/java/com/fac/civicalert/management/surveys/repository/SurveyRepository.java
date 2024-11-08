package com.fac.civicalert.management.surveys.repository;

import com.fac.civicalert.management.surveys.entity.Survey;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SurveyRepository extends JpaRepository<Survey, Long>, JpaSpecificationExecutor<Survey> {

	 //@Query(value = "select   layere.*, teme.id_tema, teme.nume_tema, teme.ord as ord_tema from "+
	 //		    "app.teme as teme "+
	 //		    "inner join app.asoc_tema_layer as asoc on asoc.id_tema=teme.id_tema "+
	 //		    "inner join app.layere as layere on layere.status IS NULL and layere.id_layer=asoc.id_layer "+  
	 //		    "inner join app.asoc_grup_tema as asocGr on asocGr.id_tema=teme.id_tema "+
	 //		    "inner join app.grupuri as grup on  grup.status IS NULL and  grup.id_grup=asocGr.id_grup "+
	 //		    "where grup.id_grup in :inClause  and teme.status IS NULL "+
	 //		    "order by teme.ord, layere.ord", nativeQuery = true)
	 //  List<Map> getLayersTeme(  @Param("inClause") List<Integer> inClause );
	
	@Query(value = "select sr.id_user ,sr.id_session, sr.id_survey ,sr.id_zone ,sr.latitude ,sr.longitude , s.description_en ,s.description_ro , "
			+ "s.survey_title_en ,s.survey_title_ro, st.name as surv_type "+ 
	"from  app.survey_responses sr "+ 
	"left outer join app.surveys s "+
	"on sr.id_survey = s.id "+
	"left outer join app.survey_types st "+
	"on s.id_survey_type = st.id "+ 
	"where sr.id_user =:idUser", nativeQuery = true)
	List<Map<String, Object>> getSavedSurveys( @Param("idUser") Long idUser );


	@Query(value = "select s.id, s.survey_title_ro from app.surveys s where s.is_permanent = :isPermanent", nativeQuery = true)
	 List<Map<String, Object>> getPermanentSurveyForAsoc(Short isPermanent);

	@Query(value = "select distinct auzs.id_survey , auzs.id_user, s.survey_title_ro , s.survey_title_en , s.id from app.asoc_user_zone_survey auzs "
			+ "	left outer join app.surveys s "
			+ "	on auzs.id_survey =  s.id where auzs.id_user=:idUser", nativeQuery = true)
	List<Map<String, Object>> getMySurveys( @Param("idUser") Long idUser );

	
	@Query(value = "select distinct "
			+ " sa.id_survey as survey_from_answer , sa.id_answer_year as an, "
			+ " sess.session_id, sess.session_name, sr.id_session as session , sr.id_survey as id_survey_from_responses, uzs.id_zone,uzs.id_survey, z.country,z.region,z.county,z.city, "
			+ " s.survey_title_ro, s.survey_title_en "
			+ " from app.asoc_user_zone_survey uzs "
			+ " left outer join app.zones z on uzs.id_zone=z.id "
			+ " left outer join app.surveys s on s.id= uzs.id_survey "
			+ " left outer join app.survey_responses sr on sr.id_survey =s.id and sr.id_session in (select id from app.generated_session gs "
			+ " where current_date between start_date and end_date "
			+ " ) "
			+ " left outer join app.saved_answers sa on sa.id_survey = sr.id_survey and sa.id_zone = uzs.id_zone and sa.id_answer_year = :agricYear and sa.id_user = :idUser "
			+ " left outer join "
			+ " (select id as session_id, session_name, start_date, end_date, valid, id_survey as ids_session from app.generated_session gs  "
			+ "  where current_date between start_date and end_date "
			+ " ) sess "
			+ " on sess.session_id=sr.id_session "
			+ " where uzs.id_user= :idUser "
			+ " and s.is_active = 1 "
			+ " and current_date between s.start_campaign and s.end_campaign", nativeQuery = true)
	List<Map<String, Object>> getZonesWithSurveys( @Param("idUser") Long idUser, @Param("agricYear") Integer agricYear );


	
	
	@Query(value = "select * from app.generated_session gs "
			+ "where current_date + INTERVAL '1 months' between start_date and end_date", nativeQuery = true)
	List<Map<String, Object>> getSurveyAndCrtSession( @Param("idUser") Long idUser );


	List<Survey> findAllByIsActiveEquals(Short active);

	@Modifying
	@Query(value = "UPDATE Survey s SET s.startCampaign = :startDate, s.endCampaign = :endDate where s.id = :id")
	void updateSurveyCampaign(LocalDate startDate, LocalDate endDate, Long id);

	@Query(value="select count(*) as nr_completari, id_survey, s.survey_title_ro from app.survey_responses sr  "
			+ "left join app.surveys s on s.id = sr.id_survey  "
			+ "where id_session in (select id from app.generated_session gs where current_date between start_date and end_date) "
			+ "group by id_survey, s.survey_title_ro", nativeQuery = true )
	public List<Map<String, Object>> getSurveyCompletionsForCurrentSession();

	@Modifying
	@Query(value = "update app.surveys set  is_active = -1 where id = :id", nativeQuery = true)
	void softDeletSurvey(Long id);

	List<Survey> findAllByIsActiveNot(short i);
}