package com.fac.civicalert.client.surveys.controller.view;

import com.fac.civicalert.commons.dto.FiltersDTO;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.service.GroupService;
import com.fac.civicalert.commons.service.RoleService;
import com.fac.civicalert.commons.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fac.civicalert.client.surveys.dao.AsocUserZoneSurveyDao;
import com.fac.civicalert.client.surveys.service.SurveyZonesService;
import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import com.fac.civicalert.management.surveys.repository.ZoneRepository;
import com.fac.civicalert.management.surveys.service.SurveyService;
import javax.servlet.http.HttpServletRequest;

import com.fac.civicalert.management.surveys.service.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/client/users")
public class ClientUserViewController {

  private final AuthUtils authUtils;
  private final UserService userService;
  private final RoleService roleService;
  private final GroupService groupService;
  private final ObjectMapper objectMapper;
  private final ZoneRepository zoneRepository;
  private final ZoneService zoneService;
  private final SurveyService surveyService;
  private final SurveyZonesService surveyZonesService;
  private final SurveyRepository surveyRepository;
  private final AsocUserZoneSurveyDao asocUserZoneSurveyDao;

  @GetMapping("/all")
  public String getAllUsers(HttpServletRequest request, ModelMap mModel, @RequestHeader("filters") final String filters) throws JsonProcessingException {
    mModel.put("users", userService.findWithFilters(objectMapper.readValue(filters, FiltersDTO.class)));
    mModel.put("groups", userService.getGroupsForUser(authUtils.getUserId()));
    return "pages/user/users";
  }


  @GetMapping()
  public String getUser(ModelMap mModel) {
    Long id = authUtils.getUserId();

    mModel.put("loggedUser", authUtils.getUserId());
    mModel.put("user", userService.getUser(id));
    mModel.put("roles", roleService.findAll());
    mModel.put("surveys", surveyService.findAll());
    mModel.put("zones", zoneService.findAll());

    return "pages/_client/viewUserClient";
  }

  @GetMapping("/resetPassword")
  public String resetPassword(ModelMap mModel) {
    return "pages/user/resetPassword";
  }

  @GetMapping("/locations")
  public String getUserLocationVIew() {

    return "pages/user/location";
  }

/*  @PostMapping
  public String getClientSurveyZoneAsoc(ModelMap mModel, @PathVariable("id") Long id) {
    Long id = authUtils.getUserId();

    mModel.put("loggedUser", authUtils.getUserId());
    mModel.put("user", userService.getUser(id));
    mModel.put("roles", roleService.findAll());
    mModel.put("surveys", surveyService.findAll());
    mModel.put("zones", zoneService.findAll());

    return "pages/_client/viewUserClient";
  }*/

  @GetMapping("/asoc-page")
  public String getAsocSurveysToLocations(ModelMap mModel) {
    mModel.put("asocs", asocUserZoneSurveyDao.getAsocUserZoneSurvey(authUtils.getUserId()));
    mModel.put("ids", asocUserZoneSurveyDao.getAsocUserZoneSurveyIds(authUtils.getUserId()));
    mModel.put("permanentSurvey", surveyRepository.getPermanentSurveyForAsoc((short) 1));
    mModel.put("surveys", surveyService.findAll());
    mModel.put("zones", zoneService.findAll());
    return "pages/_client/asocSurveysToLocations";
  }
}
