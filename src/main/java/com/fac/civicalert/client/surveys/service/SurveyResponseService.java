package com.fac.civicalert.client.surveys.service;


import static com.fac.civicalert.commons.common.utils.EntityUtils.findByIdNullSafe;

import com.fac.civicalert.client.surveys.dto.SavedAnswerDTO;
import com.fac.civicalert.client.surveys.dto.SurveyResponseDTO;
import com.fac.civicalert.commons.common.utils.EntityUtils;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.management.surveys.entity.GeneratedSession;
import com.fac.civicalert.management.surveys.entity.SavedAnswer;
import com.fac.civicalert.management.surveys.entity.Survey;
import com.fac.civicalert.management.surveys.entity.SurveyResponse;
import com.fac.civicalert.management.surveys.entity.Zone;
import com.fac.civicalert.management.surveys.repository.GeneratedSessionRepository;
import com.fac.civicalert.management.surveys.repository.SavedAnswerRepository;
import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import com.fac.civicalert.management.surveys.repository.SurveyResponseRepository;
import com.fac.civicalert.management.surveys.repository.ZoneRepository;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;

@RequiredArgsConstructor
@Service
public class SurveyResponseService {

  private final SavedAnswerRepository savedAnswerRepository;
  private final SurveyResponseRepository surveyResponseRepository;
  private final GeneratedSessionRepository generatedSessionRepository;
  private final SurveyRepository surveyRepository;
  private final ZoneRepository zoneRepository;
  private final AuthUtils authUtils;
  private final EntityManager entityManager;

  //@toto de adaugat cinstit zona!!!!
  @Transactional(rollbackFor = Exception.class)
  public void createSurveyResponse(SurveyResponseDTO dto, Long idSurveyResponse) {
    System.out.println("ID SURVEY RESPONSE: " + idSurveyResponse);
    System.out.println("DTO: " + dto);
    SurveyResponse surveyResponse = mapToSurveyResponse(dto);
    //survey
    Survey survey = EntityUtils.findByIdNullSafe(surveyRepository, dto.getSurveyId());
    surveyResponse.setSurvey(survey);
    //generated session
    GeneratedSession generatedSession = EntityUtils.findByIdNullSafe(generatedSessionRepository, dto.getSessionId());
    surveyResponse.setGeneratedSession(generatedSession);
    //zone
    Zone zone = EntityUtils.findByIdNullSafe(zoneRepository, dto.getZoneId());
    surveyResponse.setZone(zone);
    if(idSurveyResponse != 0) {
      surveyResponseRepository.deleteById(idSurveyResponse);
    }
    surveyResponseRepository.save(surveyResponse);
    if(idSurveyResponse != 0) {
      savedAnswerRepository.deleteAllByIdSurveyResponse(idSurveyResponse);
    }
    saveAnswers(dto.getAnswers(), surveyResponse);
  }

  private void saveAnswers(final List<SavedAnswerDTO> dtos, final SurveyResponse surveyResponse) {
    for (SavedAnswerDTO dto : dtos) {
      SavedAnswer savedAnswer = mapToSavedAnswer(dto);
      savedAnswer.setSurveyResponse(surveyResponse);
      savedAnswerRepository.save(savedAnswer);
    }
  }


  private SurveyResponse mapToSurveyResponse(final SurveyResponseDTO dto) {
    SurveyResponse surveyResponse = new SurveyResponse();
    surveyResponse.setLanguageId(dto.getLanguageId());
    surveyResponse.setSurveyId(dto.getSurveyId());
    surveyResponse.setUserId(dto.getUserId());
    surveyResponse.setSessionId(dto.getSessionId());
    surveyResponse.setZoneId(dto.getZoneId());
    surveyResponse.setLatitude(dto.getLatitude());
    surveyResponse.setLongitude(dto.getLongitude());
    surveyResponse.setAnswerYearId(dto.getAnswerYearId());
    return surveyResponse;
  }

  //@todo check!!!
  private SavedAnswer mapToSavedAnswer(final SavedAnswerDTO dto) {
    SavedAnswer savedAnswer = new SavedAnswer();
    savedAnswer.setUserId(dto.getUserId());
    savedAnswer.setSurveyId(dto.getSurveyId());
    savedAnswer.setQuestionId(dto.getQuestionId());
    savedAnswer.setAnswerId(dto.getAnswerId());
    savedAnswer.setFinalQuestionAnswer(dto.getFinalQuestionAnswer());
    savedAnswer.setGivenAnswer(dto.getGivenAnswer());
    savedAnswer.setAnswerSessionId(dto.getAnswerSessionId());
    savedAnswer.setAnswerYearId(dto.getAnswerYearId());
    savedAnswer.setZoneId(dto.getZoneId());
    return savedAnswer;
  }
  
  public List<Map<String, Object>>getSavedSurveys(Long idUser){
	  return surveyRepository.getSavedSurveys(idUser);
	  
  }
  
  public List<Map<String, Object>>getMySurveys(Long idUser){
	  return surveyRepository.getMySurveys(idUser);
  }
  
  
  public Map<String, String> getCrtSelectionResponses(Long idSurvey, Long idUser, Date startDate, Date endDate){

    Map<String, String> getCrtSelectionResponses = entityManager.createQuery("select sa.answerId as answerId, sa.givenAnswer as givenAnswer from SavedAnswer sa " +
                     "left outer join Question q on sa.questionId = q.id left outer join Answer a on sa.answerId = a.id where sa.surveyId= :idSurvey and sa.createdAt >= :startDate and sa.createdAt<= :endDate and sa.userId=:idUser ", Tuple.class)
            .setParameter("idSurvey", idSurvey).setParameter("startDate", startDate).setParameter("endDate", endDate).setParameter("idUser", idUser)
            .getResultStream()
            .collect(
                    Collectors.toMap(
                            x -> String.valueOf(x.get("answerId")),
                            x -> String.valueOf(x.get("givenAnswer"))
                    )
            );

    return getCrtSelectionResponses;

  }
  
  
  public Map<Integer, List<Map<String, Object>>> getZonesWithSurveys(Long idUser, Integer agricYear){
	  List<Map<String, Object>> vZones = surveyRepository.getZonesWithSurveys(idUser, agricYear);
	  Map<Integer, List<Map<String, Object>>> groupZone = vZones
			    .stream()
			    .collect(Collectors.groupingBy(el -> (int)el.get("id_zone")));
	  
	  return groupZone;
  
  }
}
