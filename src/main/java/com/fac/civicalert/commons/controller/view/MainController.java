package com.fac.civicalert.commons.controller.view;

import com.fac.civicalert.commons.repository.AgricYearRepository;
import com.fac.civicalert.client.surveys.service.SurveyResponseService;
import com.fac.civicalert.commons.security.UserDetailsServiceImpl;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.security.utils.JwtUtils;
import com.fac.civicalert.commons.service.AgricYearService;
import com.fac.civicalert.commons.service.UtilsService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/")
public class MainController {

  private final SurveyResponseService surveyResponseService;
  private final UtilsService utilsService;
  private final AgricYearService agricYearService;
  private final JwtUtils jwtUtils;
  private final AuthUtils authUtils;

  private final UserDetailsServiceImpl userDetailsService;
  private final AgricYearRepository agricYearRepository;

  @GetMapping()
  public String login(HttpServletRequest request) {
    System.out.println("index jsp:" + request.getContextPath());
    return "index";
  }


  @GetMapping("/main")
  public String mainEntry(HttpServletRequest request, ModelMap mModel, @CookieValue("wstToken") String jwtToken) {
    System.out.println("main page manager");
    Long userId = utilsService.getLoggedUserIdFromJwtToken(jwtToken);
    System.out.println("logged manager user id:" + userId);

    return "pages/firstPage";
  }


  @GetMapping("/maps")
  public String getMap(HttpServletRequest request, ModelMap mModel, @CookieValue("wstToken") String jwtToken) {
    System.out.println("main page manager");
    Long userId = utilsService.getLoggedUserIdFromJwtToken(jwtToken);
    System.out.println("logged manager user id:" + userId);
 
    return "pages/getMap";
  }
  
  
  //@todo de mutat de aici!!!!!- TOT CE I CLIENT DE PUS IN PACKAGE DE CLIENT; TOT CE I MANAGER- DE PUS IN MANAGER; CHESTII COMUNE IN COMMONS!!!!
  @GetMapping("/client")
  public String clientEntry(HttpServletRequest request, ModelMap mModel, @CookieValue("wstToken") String jwtToken) {
    System.out.println("main page client");

    Long idUser = utilsService.getLoggedUserIdFromJwtToken(jwtToken);
    System.out.println("logged client user id:" + idUser);
    //@todo de vazut unde mai am hardcodat 20 ul!!!!
    //Long idUser =new Long(20);
    SurveyRepository surveyRepository;

    Map<Integer, List<Map<String, Object>>> vZones = surveyResponseService.getZonesWithSurveys(idUser,
        agricYearService.getAgricYear().get(0).getId().intValue());
    //System.out.println("lista zone:" + vZones);1
    
    //din lista asta vreau doar chestionarele la care nu s-a raspuns in sesiunea curenta!!!
    //List alert_list= new ArrayList(<String,Object>);
    
    Map<Integer, List<Map<String, Object>>> vZonesAlert= new HashMap();
    
    for (Map.Entry<Integer, List<Map<String, Object>>> entry : vZones.entrySet()) {
        //System.out.println(entry.getKey() + ":" + entry.getValue());
    	Integer id_zona= entry.getKey();
    	List<Map<String, Object>> lista_chestionare= entry.getValue();
    	List alert_list= new ArrayList();
    	for(Map m: lista_chestionare) {
    		//nu s-a raspuns la chestionar in sesiunea curenta, il adaugam in lista de alerte!!!
    		if(m.get("survey_from_answer")==null) {
    			alert_list.add(m);
    		}
    	}
    	vZonesAlert.put(id_zona, alert_list);
    	//   	
    }
    
    System.out.println("zone alert:" + vZonesAlert);
    mModel.put("alertZones", vZonesAlert);
    mModel.put("zones", vZones);
    mModel.put("agricYear", agricYearService.getAgricYear().get(0).getId().intValue());
    return "pages/clientFirstPage";
  }

  //@GetMapping("/firstPage")
  //public String firstPage(HttpServletRequest request, ModelMap mModel) {
  //final Timestamp todayAtMidnightTimestamp = valueOf(now().with(LocalTime.MIDNIGHT));
  //Filter filter = new Filter("insertedAtStart", null, new SimpleDateFormat("yyyy-MM-dd HH:mm").format(todayAtMidnightTimestamp), null);
  //FiltersDTO filters = new FiltersDTO(1, Arrays.asList(filter));

  //mModel.put("bins", binService.getBinsCreatedOrEditedBetween(filters));
  //mModel.put("contracts", contractService.getContractsCreatedOrEditedBetween(filters));
  //mModel.put("collects", wasteCollectService.getCollects(filters));
  //mModel.put("problems", wasteCollectService.getProblems(filters));
  //System.out.println("first page");
  //return "pages/dash";
  //}

}
