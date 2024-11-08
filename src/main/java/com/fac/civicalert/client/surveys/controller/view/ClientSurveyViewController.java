package com.fac.civicalert.client.surveys.controller.view;

import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.service.AgricYearService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fac.civicalert.client.surveys.service.SurveyResponseService;
import com.fac.civicalert.management.surveys.dto.SurveyFormDTO;
import com.fac.civicalert.management.surveys.repository.SavedAnswerRepository;
import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import com.fac.civicalert.management.surveys.service.QuestionTypeService;
import com.fac.civicalert.management.surveys.service.SavedAnswerService;
import com.fac.civicalert.management.surveys.service.SurveyService;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/client/survey")
public class ClientSurveyViewController {

  private final SurveyResponseService surveyResponseService;
  private final SurveyService surveyService;
  private final QuestionTypeService questionTypeService;
  private final SavedAnswerRepository savedAnswerRepository;
  private final SavedAnswerService savedAnswerService;
  private final AgricYearService agricYearService;
  private final AuthUtils authUtils;
  private final SurveyRepository surveyRepository;

  @GetMapping("/viewForAnswer")
  public String viewForAnswer(ModelMap mModel) throws JsonProcessingException {
    //de vazut daca avem nevoie de ceva in model

    return "pages/_client/viewforanswers";
  }


  @GetMapping("/listClientSurveys")
  public String listClientSurveys(HttpServletRequest request, ModelMap mModel) throws JsonProcessingException {
     //@todo de incarcat chestionarele completate deja
	 long idUser =  authUtils.getUserId(); 
	 List<Map<String, Object>> mySurveys =  surveyResponseService.getMySurveys(idUser); 
	 mModel.put("mySurveys", mySurveys);
     return "pages/_client/listClientSurveys";
  }
  
  //${idSurvey}/${calendar}
  @GetMapping("/listClientResponses/{idSurvey}/{calendar}")
  public String listClientResponses(@PathVariable("idSurvey") Long idSurvey, @PathVariable("calendar") String calendar, ModelMap mModel) throws JsonProcessingException {
     //@todo de incarcat chestionarele completate deja
	 
	 Long idUser =  authUtils.getUserId();
	 System.out.println("idSurvey:" + idSurvey);
	 System.out.println("calendar:" + calendar);
	 
	 String[] parts = calendar.split("-W");
     int year = Integer.parseInt(parts[0]);
     int weekNumber = Integer.parseInt(parts[1]);

     // Calculate the start and end dates for the specified week and year
     LocalDate firstDayOfYear = LocalDate.of(year, 1, 1);
     WeekFields weekFields = WeekFields.of(Locale.getDefault());
     
     LocalDate startDate = firstDayOfYear.with(weekFields.weekOfYear(), weekNumber)
                                         .with(weekFields.dayOfWeek(), 1);
     LocalDate endDate = startDate.plusDays(6);

	 mModel.put("raspunsuri", surveyResponseService.getCrtSelectionResponses(idSurvey, idUser, Date.valueOf(startDate), Date.valueOf(endDate)));
     mModel.put("survey", surveyService.getById(idSurvey.longValue()));
	 
     return "pages/_client/listResponses";
  }
  

  @GetMapping("/viewUserClient")
  public String viewUserClient(ModelMap mModel) throws JsonProcessingException {
    //de vazut daca avem nevoie de ceva in model

    return "pages/_client/viewUserClient";
  }
  @GetMapping("/viewLocalizare")
  public String viewLocalizare(ModelMap mModel) throws JsonProcessingException {
    //de vazut daca avem nevoie de ceva in model
     System.out.println("in viewLocalizare");
    return "pages/harti/localizare";
  }
  //@GetMapping("/firstPage")
  //public String clientEntry(HttpServletRequest request, ModelMap mModel) {
  //	System.out.println("main page");
  //	return "pages/clientFirstPage";
  //}
  @GetMapping("/listSurveysClient")
  public String listSurveysClient(HttpServletRequest request, ModelMap mModel) throws JsonProcessingException {
    //@todo de vazut!!!!!
    List<SurveyFormDTO> listSurveys = surveyService.findAll();

    System.out.println("lista surveys:" + listSurveys);
    mModel.put("surveys", listSurveys);
    mModel.put("questionTypes", questionTypeService.getAllQuestionTypes());
    return "pages/_client/surveysList";
  }

  @GetMapping("/getSurveyClient/{id}/{zona}")
  public String getSurveyClient(@PathVariable("id") Long id, @PathVariable("zona") Long idZona, ModelMap mModel) {
    SurveyFormDTO sdto = surveyService.getById(id);
    Long crtSession = savedAnswerRepository.getMaxSessionForCurrentSurvey(id, idZona, agricYearService.getAgricYear().get(0).getId(), authUtils.getUserId());
    mModel.put("survey", sdto);
    mModel.put("questionTypes", questionTypeService.getAllQuestionTypes());
    mModel.put("idSession", savedAnswerRepository.getCurrentSessionForCurrentSurvey(id));
    mModel.put("crtYear", agricYearService.getAgricYear());//@todo de scapat de hardcodare
    mModel.put("idUser", authUtils.getUserId());
    mModel.put("idZona",idZona);
    mModel.put("savedAnswers", savedAnswerService.getAnswersClient(id, crtSession, agricYearService.getAgricYear().get(0).getId(),idZona, authUtils.getUserId()));

    return "pages/_client/surveyClient";
  }

  @GetMapping("/getSavedAnswers/{id}/{idZona}")
  public String getSavedAnswers(@PathVariable("id") Long id,@PathVariable("idZona") Long idZona, ModelMap mModel) {
    mModel.put("survey", surveyService.getById(id));
    Long crtSession = savedAnswerRepository.getMaxSessionForCurrentSurvey(id, idZona, agricYearService.getAgricYear().get(0).getId(), authUtils.getUserId());
    mModel.put("savedAnswers", savedAnswerService.getAnswersClient(id, crtSession, agricYearService.getAgricYear().get(0).getId(),idZona, authUtils.getUserId()));
    mModel.put("idSurveyResponse", savedAnswerRepository.getIdSurveyResponseByIdSurvey(id, crtSession, agricYearService.getAgricYear().get(0).getId(),idZona));
    mModel.put("idZona",idZona);
    mModel.put("idSession", crtSession);
    mModel.put("crtYear",agricYearService.getAgricYear());
    mModel.put("idUser", authUtils.getUserId());
    return "pages/_client/surveyClient";
  }

  @GetMapping("/complete-register/{token}")
  public String getSavedAnswers(@PathVariable("token") String token, ModelMap mModel) {
    mModel.put("token", token);
    return "activateAccount";
  }
}
