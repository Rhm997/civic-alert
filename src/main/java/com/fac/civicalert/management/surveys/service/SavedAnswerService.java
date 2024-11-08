package com.fac.civicalert.management.surveys.service;

import com.fac.civicalert.management.surveys.repository.SavedAnswerRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.readers.parameter.ParameterMultiplesReader;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;

import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SavedAnswerService {

    private final SavedAnswerRepository savedAnswerRepository;
    private final EntityManager entityManager;
    private final ParameterMultiplesReader parameterMultiplesReader;

/*    @Transactional(readOnly = true)
    public List<SavedAnswerDTO> getSavedAnswers(Long id) {
        return savedAnswerRepository.findAllBySurveyId(id).stream()
                .map(this::mapToSavedAnswerDTO)
                .collect(toList());
    }

    private SavedAnswerDTO mapToSavedAnswerDTO(final SavedAnswer savedAnswer) {
        return SavedAnswerDTO.builder()
                .id(savedAnswer.getId())
                .userId(savedAnswer.getUserId())
                .surveyId(savedAnswer.getSurveyId())
                .questionId(savedAnswer.getQuestionId())
                .answerId(savedAnswer.getAnswerId())
                .finalQuestionAnswer(savedAnswer.getFinalQuestionAnswer())
                .givenAnswer(savedAnswer.getGivenAnswer())
                .build();
    }*/

    //id, crtSession, crtYear,idZona; crt session vreau sa fie ultima pt care am raspunsuri
    public Map<String, String> getAnswersClient(Long id, Long crtsession, Long crtYear, Long idZona, Long idUser) {
    	
        Map<String, String> getAnswersClient = entityManager.createQuery("select sa.answerId as answerId, sa.givenAnswer as givenAnswer, "+
        "sa.idSurveyResponse as idSurveyResponse from SavedAnswer "+
        "sa where sa.surveyId = :id and sa.answerSessionId =:crtsession and id_answer_year=:crtYear and id_zone =:idZona and id_user =:idUser", Tuple.class)
               .setParameter("id", id).setParameter("crtsession", crtsession).setParameter("crtYear", crtYear).setParameter("idZona", idZona).setParameter("idUser", idUser)
               .getResultStream()
                .collect(
                        Collectors.toMap(
                                x -> String.valueOf(x.get("answerId")),
                                x -> String.valueOf(x.get("givenAnswer"))
                       )
                );
       return getAnswersClient;
        
       // List<Map<String, Object>> vresult = savedAnswerRepository.getAnswerClientV2(id, crtYear, idZona, id, crtYear, idZona);
        
       // Map<String, String> getAnswersClientv2= null;
       // for (Map<String, Object> tmpMap : vresult) {
       // 	getAnswersClientv2.put((String)tmpMap.get("answerId"), (String)tmpMap.get("givenAnswer"));
       // }
        
       //System.out.println("getAnswersClientv2:" + getAnswersClientv2);
       //return getAnswersClientv2;
    }
    
    
}   
    
   
