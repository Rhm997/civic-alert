package com.fac.civicalert.management.surveys.common.mapper;

import com.fac.civicalert.management.surveys.entity.Survey;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.fac.civicalert.management.surveys.dto.SurveyFormDTO;


@Mapper(componentModel = "spring")
public interface SurveyMapper {

  SurveyMapper surveyMapper = Mappers.getMapper(SurveyMapper.class);
  
  SurveyFormDTO toSurveyFormDto(final Survey survey);

  Survey toSurvey(final SurveyFormDTO surveyFormDTO);

}
