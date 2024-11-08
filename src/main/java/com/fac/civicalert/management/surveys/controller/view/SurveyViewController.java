package com.fac.civicalert.management.surveys.controller.view;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.fac.civicalert.commons.repository.AgricYearRepository;
import com.fac.civicalert.commons.service.AgricYearService;
import com.fac.civicalert.management.surveys.repository.SurveyResponseRepository;
import com.fac.civicalert.management.surveys.repository.SavedAnswerRepository;
import com.fac.civicalert.management.surveys.service.QuestionTypeService;
import com.fac.civicalert.management.surveys.service.SavedAnswerService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fac.civicalert.management.surveys.dto.SurveyFormDTO;
import com.fac.civicalert.management.surveys.service.SurveyService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/survey")
public class SurveyViewController {

    private final SurveyService surveyService;
    private final QuestionTypeService questionTypeService;
    private final SurveyResponseRepository surveyResponseRepository;
    private final SavedAnswerRepository savedAnswerRepository;
    private final SavedAnswerService savedAnswerService;
    private final AgricYearService agricYearService;
    private final AgricYearRepository agricYearRepository;

    @GetMapping("/addEditSurvey")
    public String addEditSurvey(HttpServletRequest request, ModelMap mModel, Integer id) throws JsonProcessingException {
        //de vazut daca avem nevoie de ceva in model
        System.out.println(request.getContextPath());
        mModel.put("an", agricYearRepository.findFirstByOrderByIdDesc());
        return "pages/surveys/addedit";
    }


    @GetMapping("/listSurveys")
    public String listSurveys(HttpServletRequest request, ModelMap mModel) throws JsonProcessingException {
        //@todo de vazut!!!!!
        List<SurveyFormDTO> listSurveys = surveyService.findAll();

        System.out.println("lista surveys:" + listSurveys);
        mModel.put("surveys", listSurveys);
        return "pages/surveys/listSurveys";
    }

    @GetMapping("/getSurveyEditStructure/{id}")
    public String getSurveyEditStructure(HttpServletRequest request, @PathVariable("id") Long id, ModelMap mModel) {
        System.out.println(request.getContextPath());
        SurveyFormDTO sdto = surveyService.getById(id);
        mModel.put("survey", sdto);
        mModel.put("id", id);
        mModel.put("questionTypes", questionTypeService.getAllQuestionTypes());
        mModel.put("an", agricYearRepository.findFirstByOrderByIdDesc());
        return "pages/surveys/addedit";
    }

    @GetMapping("/getSurveyEditData/{id}")
    public String getSurveyEditData(@PathVariable("id") Long id, ModelMap mModel) {
        SurveyFormDTO sdto = surveyService.getById(id);
        mModel.put("survey", sdto);
        mModel.put("questionTypes", questionTypeService.getAllQuestionTypes());
        return "pages/surveys/editSurvey";
    }

    @GetMapping("/listPersons")
    public String listPersons(ModelMap mModel) throws JsonProcessingException {
        //de vazut daca avem nevoie de ceva in model
        return "pages/user/listPersons";
    }

    @GetMapping("/listUsers")
    public String listUsers(ModelMap mModel) throws JsonProcessingException {
        //de vazut daca avem nevoie de ceva in model
        return "pages/user/users";
    }

    @GetMapping("/anAgricol")
    public String viewAnAgricol(ModelMap mModel) throws JsonProcessingException {
        mModel.put("an",  agricYearService.getAgricYear());
        return "pages/viewAnAgricol";
    }

    @GetMapping("/dashboard")
    public String viewDashboard(ModelMap mModel) throws JsonProcessingException {
    	mModel.put("survey_completions", surveyService.getSurveyCompletionsForCurrentSession());
        return "pages/dashboard/surveysDashboard";
    }

}
