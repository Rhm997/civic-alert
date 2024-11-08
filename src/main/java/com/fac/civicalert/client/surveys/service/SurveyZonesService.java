package com.fac.civicalert.client.surveys.service;

import com.fac.civicalert.client.surveys.dao.SurveyZonesDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SurveyZonesService {

    private final SurveyZonesDao surveyZonesDao;
    private final EntityManager entityManager;

    public Map<String, String> findAllByIdUser(Long id, Long idSurvey) {

        Map<String, String> getAnswersClient = entityManager.createQuery("select auzs.zone.id as id_zone, auzs.survey.id as id_survey from AsocUserZoneSurvey auzs where auzs.user.id = :id and auzs.survey.id = :idSurvey", Tuple.class)
                .setParameter("id", id)
                .setParameter("idSurvey", idSurvey)
                .getResultStream()
                .collect(
                        Collectors.toMap(
                                x -> String.valueOf(x.get("id_zone")),
                                x -> String.valueOf(x.get("id_survey"))
                        )
                );
        return getAnswersClient;
    }
}
