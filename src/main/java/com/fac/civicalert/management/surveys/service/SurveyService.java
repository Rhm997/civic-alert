package com.fac.civicalert.management.surveys.service;

import static com.fac.civicalert.commons.common.utils.EntityUtils.findByIdNullSafe;
import static java.lang.Boolean.FALSE;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;

import java.time.LocalDate;

import com.fac.civicalert.commons.repository.AgricYearRepository;
import com.fac.civicalert.commons.service.AgricYearService;
import com.fac.civicalert.commons.service.UtilsService;
import com.fac.civicalert.management.surveys.repository.*;
import com.fac.civicalert.management.surveys.dto.AnswerDTO;
import com.fac.civicalert.management.surveys.dto.QuestionDTO;
import com.fac.civicalert.management.surveys.dto.SurveyFormDTO;
import com.fac.civicalert.management.surveys.entity.Answer;
import com.fac.civicalert.management.surveys.entity.Question;
import com.fac.civicalert.management.surveys.entity.Survey;
import com.fida.anmsurveymanagement.management.surveys.repository.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SurveyService {

  private final SurveyRepository surveysRepository;
  private final SurveyTypeRepository surveyTypeRepository;
  private final QuestionRepository questionRepository;
  private final QuestionTypeRepository questionTypeRepository;
  private final AnswerRepository answerRepository;
  private final UtilsService utilsService;
  private final AgricYearRepository agricYearRepository;
  private final AgricYearService agricYearService;
  private final SurveyRepository surveyRepository;
  private final SavedAnswerRepository savedAnswerRepository;

  @Transactional(rollbackFor = Exception.class)
  public void createSurvey(SurveyFormDTO dto) {
    Survey survey = mapToSurvey(dto);
    survey = surveysRepository.save(survey);

    createQuestions(dto.getQuestions(), survey);
    
    //ToDo generating sessions
    LocalDate startDate = null;
    LocalDate endDate = null;
    Integer freq = dto.getSurveyFrequencyInDays();
    
	/*
	 * if (dto.getIsPermanent()==1) { //ToDo de vazut ce interval luam pt chestionar
	 * permanent startDate= LocalDate.now(); endDate =
	 * startDate.with(TemporalAdjusters.lastDayOfYear());
	 *
	 * }else {
	 */
    	startDate = dto.getStartCampaign();
    	endDate = dto.getEndCampaign();
    //}
    //@todo- de vazut!
    utilsService.sessionGenerate(startDate, endDate, survey.getId(), survey.getFrequency(), survey, agricYearService.getAgricYear().get(0).getId().intValue());



  }

  @Transactional(rollbackFor = Exception.class)
  public void updateSurvey(final SurveyFormDTO dto) {
    System.out.println("ID SURVEY -> " + dto.getId());
    Survey survey = findByIdNullSafe(surveysRepository, dto.getId());
    System.out.println("SURVEY -> " + dto);
    updateSurveyFields(survey, dto);
    survey = surveysRepository.save(survey);

    // check for deleted questions
    for (Question question : survey.getQuestions()) {
      if (FALSE.equals(dto.getQuestions().stream()
          .map(QuestionDTO::getId)
          .collect(toList())
          .contains(question.getId()))) {
        answerRepository.deleteAll(question.getAnswers());
        questionRepository.delete(question);
      }
    }

    // map new/updated questions
    for (QuestionDTO questionDTO : dto.getQuestions()) {
      Question question = mapToQuestion(
          isNull(questionDTO.getId()) ? new Question() : findByIdNullSafe(questionRepository, questionDTO.getId()),
          questionDTO);
      question.setSurvey(survey);
      questionRepository.save(question);

      // check for deleted answers if question is not new
      if (nonNull(questionDTO.getId())) {
        for (Answer answer : question.getAnswers()) {
          if (FALSE.equals(questionDTO.getAnswers().stream()
              .map(AnswerDTO::getId)
              .collect(toList())
              .contains(answer.getId()))) {
            answerRepository.delete(answer);
          }
        }
      }

      // map new/updated answers
      for (AnswerDTO answerDTO : questionDTO.getAnswers()) {
        Answer answer = mapToAnswer(
            isNull(answerDTO.getId()) ? new Answer() : findByIdNullSafe(answerRepository, answerDTO.getId()),
            answerDTO);
        answer.setQuestion(question);
        answerRepository.save(answer);
      }
    }

  }

  @Transactional(readOnly = true)
  public List<SurveyFormDTO> findAll() {
    return surveysRepository.findAllByIsActiveNot((short) -1).stream()
        .map(this::toSurveyFormDto)
        .collect(toList());
  }


  @Transactional(readOnly = true)
  public SurveyFormDTO getById(Long id) {
    SurveyFormDTO sdto = toSurveyFormWithQuestionDto(findByIdNullSafe(surveysRepository, id));

    return sdto;
  }

  private void createQuestions(List<QuestionDTO> dtos, Survey survey) {
    for (QuestionDTO dto : dtos) {
      Question question = mapToQuestion(new Question(), dto);
      question.setSurvey(survey);

      question = questionRepository.save(question);

      createAnswers(dto.getAnswers(), question);
    }
  }

  private void createAnswers(List<AnswerDTO> dtos, Question question) {
    for (AnswerDTO dto : dtos) {
      Answer answer = mapToAnswer(new Answer(), dto);
      answer.setQuestion(question);

      answerRepository.save(answer);
    }
  }

  private Survey mapToSurvey(final SurveyFormDTO dto) {
    final Survey survey = new Survey();
    survey.setTitleRo(dto.getTitleRo());
    survey.setTitleEn(dto.getTitleEn());
    survey.setNotesRo(dto.getNotesRo());
    survey.setNotesEn(dto.getNotesEn());
    survey.setDescriptionRo(dto.getDescriptionRo());
    survey.setDescriptionEn(dto.getDescriptionEn());
    survey.setStartCampaign(dto.getStartCampaign());
    survey.setEndCampaign(dto.getEndCampaign());
    survey.setFrequency(dto.getSurveyFrequencyInDays());
    survey.setIsPermanent(dto.getIsPermanent());
    survey.setIsActive(dto.getIsActive());
    survey.setSurveyType(findByIdNullSafe(surveyTypeRepository, dto.getIdSurveyType()));

    return survey;
  }


  private Question mapToQuestion(Question question, QuestionDTO dto) {
    question.setTextRo(dto.getTextRo());
    question.setTextEn(dto.getTextEn());
    question.setQuestNotesRo(dto.getQuestNotesRo());
    question.setQuestNotesEn(dto.getQuestNotesEn());
    question.setOrd(dto.getOrd());
    question.setStatGraph(dto.getStat_graph());
    question.setStatMap(dto.getStat_map());
    question.setStatFixed(dto.getStat_fixed());
    question.setQuestionTypes(questionTypeRepository.findAllByName(dto.getQuestionType()));


    return question;
  }

  private Answer mapToAnswer(Answer answer, AnswerDTO dto) {
    answer.setDescriptionRo(dto.getDescriptionRo());
    answer.setDescriptionEn(dto.getDescriptionEn());
    answer.setOrd(dto.getOrd());
    answer.setResponse(dto.getOrd().toString());

    return answer;
  }

  private SurveyFormDTO toSurveyFormDto(Survey survey) {
    SurveyFormDTO surveyFormDTO = new SurveyFormDTO();
    surveyFormDTO.setDescriptionEn(survey.getDescriptionEn());
    surveyFormDTO.setDescriptionRo(survey.getDescriptionRo());
    surveyFormDTO.setEndCampaign(survey.getEndCampaign());
    surveyFormDTO.setId(survey.getId());
    surveyFormDTO.setIsActive(survey.getIsActive());
    surveyFormDTO.setIdSurveyType(survey.getIdSurveyType());
    surveyFormDTO.setStartCampaign(survey.getStartCampaign());
    surveyFormDTO.setTitleEn(survey.getTitleEn());
    surveyFormDTO.setTitleRo(survey.getTitleRo());
    surveyFormDTO.setNotesEn(survey.getNotesEn());
    surveyFormDTO.setNotesRo(survey.getNotesRo());
    return surveyFormDTO;
  }


  private QuestionDTO toQuestionDto(Question question) {
    QuestionDTO qdto = new QuestionDTO();
    qdto.setId(question.getId());
    qdto.setOrd(question.getOrd());
    qdto.setQuestionType(question.getQuestionType());
    qdto.setQuestNotesEn(question.getQuestNotesEn());
    qdto.setQuestNotesRo(question.getQuestNotesRo());
    qdto.setTextEn(question.getTextEn());
    qdto.setTextRo(question.getTextRo());
    qdto.setStat_graph(question.getStatGraph());
    qdto.setStat_map(question.getStatMap());
    List<Answer> la = question.getAnswers();
    qdto.setAnswers(la.stream().map(this::toAnswerDto).collect(Collectors.toList()));
    return qdto;
  }

  private AnswerDTO toAnswerDto(Answer answer) {
    AnswerDTO adto = new AnswerDTO();
    adto.setId(answer.getId());
    adto.setOrd(answer.getOrd());
    adto.setDescriptionEn(answer.getDescriptionEn());
    adto.setDescriptionRo(answer.getDescriptionRo());
    adto.setResponse(answer.getResponse());
    return adto;
  }

  private void updateSurveyFields(Survey survey, SurveyFormDTO dto) {
    survey.setTitleRo(dto.getTitleRo());
    survey.setTitleEn(dto.getTitleEn());
    survey.setDescriptionRo(dto.getDescriptionRo());
    survey.setDescriptionEn(dto.getDescriptionEn());
    survey.setNotesRo(dto.getNotesRo());
    survey.setNotesEn(dto.getNotesEn());
    survey.setSurveyType(findByIdNullSafe(surveyTypeRepository, dto.getIdSurveyType()));
    survey.setIsActive(dto.getIsActive());
    survey.setIsPermanent(dto.getIsPermanent());
  }

  private SurveyFormDTO toSurveyFormWithQuestionDto(Survey survey) {
    SurveyFormDTO surveyFormDTO = new SurveyFormDTO();
    surveyFormDTO.setId(survey.getId());
    surveyFormDTO.setDescriptionEn(survey.getDescriptionEn());
    surveyFormDTO.setIsActive(survey.getIsActive());
    surveyFormDTO.setDescriptionRo(survey.getDescriptionRo());
    surveyFormDTO.setEndCampaign(survey.getEndCampaign());
    surveyFormDTO.setId(survey.getId());
    surveyFormDTO.setIdSurveyType(survey.getIdSurveyType());
    surveyFormDTO.setStartCampaign(survey.getStartCampaign());
    surveyFormDTO.setTitleEn(survey.getTitleEn());
    surveyFormDTO.setTitleRo(survey.getTitleRo());
    surveyFormDTO.setNotesEn(survey.getNotesEn());
    surveyFormDTO.setNotesRo(survey.getNotesRo());
    surveyFormDTO.setSurveyFrequencyInDays(survey.getFrequency());
    List<QuestionDTO> questionsdtos = survey.getQuestions().stream()
    		.sorted((o1, o2)->o1.getOrd().compareTo(o2.getOrd()))
    		.map(this::toQuestionDto)
        .collect(Collectors.toList());
    surveyFormDTO.setQuestions(questionsdtos);

    return surveyFormDTO;
  }

  @Transactional
  public void softDeleteSurvey(Long id) {
    surveyRepository.softDeletSurvey(id);
    savedAnswerRepository.deleteAllBySurveyId(id);
  }

public List<Map<String, Object>> getSurveyCompletionsForCurrentSession() {
	// TODO Auto-generated method stub
	return surveyRepository.getSurveyCompletionsForCurrentSession();
}


}
