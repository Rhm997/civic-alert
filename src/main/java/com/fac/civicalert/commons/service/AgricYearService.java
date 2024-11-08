package com.fac.civicalert.commons.service;

import com.fac.civicalert.commons.repository.AgricYearRepository;
import com.fac.civicalert.commons.dto.AgricYearDTO;
import com.fac.civicalert.commons.entity.AgricYear;
import com.fac.civicalert.management.surveys.entity.Survey;
import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class AgricYearService {

    private final AgricYearRepository agricYearRepository;
    private final SurveyRepository surveyRepository;
    private final UtilsService utilsService;

    public List<AgricYearDTO> getAgricYear() {
        List<AgricYearDTO> anAgricol = agricYearRepository.findFirstByOrderByIdDesc()
                .stream()
                .map(this::mapToAgriYearDTO)
                .collect(toList());

        return anAgricol;
    }

    public AgricYearDTO mapToAgriYearDTO(AgricYear agricYear) {
        AgricYearDTO agricYearDTO = new AgricYearDTO();
        agricYearDTO.setId(agricYear.getId());
        agricYearDTO.setObs(agricYear.getObs());
        agricYearDTO.setAgricYear(agricYear.getAgricYear());
        agricYearDTO.setStartDate(agricYear.getStartDate());
        agricYearDTO.setEndDate(agricYear.getEndDate());
        return agricYearDTO;

    }

    @Transactional(rollbackFor = Exception.class)
    public void createAgricYear(AgricYear agricYear) {
        agricYearRepository.save(agricYear);
        List<Survey> surveys = surveyRepository.findAllByIsActiveEquals((short) 1);
                surveys.stream()
                        .forEach(survey ->
                                utilsService.sessionGenerate(agricYear.getStartDate(), agricYear.getEndDate(), survey.getId(), survey.getFrequency(), survey, agricYear.getId().intValue()));

                surveys.forEach(survey -> surveyRepository.updateSurveyCampaign(agricYear.getStartDate(), agricYear.getEndDate(), survey.getId()));
    }
}
