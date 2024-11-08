package com.fac.civicalert.commons.service;

import com.fac.civicalert.commons.security.UserDetailsServiceImpl;
import com.fac.civicalert.commons.security.utils.JwtUtils;
import com.fac.civicalert.management.surveys.entity.GeneratedSession;
import com.fac.civicalert.management.surveys.entity.Survey;
import com.fac.civicalert.management.surveys.repository.GeneratedSessionRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilsService {

  private final GeneratedSessionRepository generatedSessionRepository;
  private final JwtUtils jwtUtils;
  private final UserDetailsServiceImpl userDetailsService;

  public void sessionGenerate(LocalDate startDate, LocalDate endDate, Long id_survey, Integer freq, Survey survey,
      Integer agricYear) {

    LocalDate tempEnd = startDate.plusDays(freq - 1);
    List<String> intervals = new ArrayList<>();
    int k = 0;
    while (tempEnd.isBefore(endDate)) {
      String sessionName = "session_" + k;
      saveSession(startDate, tempEnd, sessionName, id_survey, generatedSessionRepository, survey, agricYear);
      //save intervals in db
      intervals.add(String.format("( %s, %s)", startDate, tempEnd));

      startDate = LocalDate.from(tempEnd).plusDays(1);
      tempEnd = tempEnd.plusDays(freq);
      k++;
    }

    tempEnd = LocalDate.from(endDate);
    //save intervals in db
    intervals.add(String.format("( %s, %s)", startDate, tempEnd));
    String sessionName = "session_" + k;
    saveSession(startDate, tempEnd, sessionName, id_survey, generatedSessionRepository, survey, agricYear);

    System.out.println(intervals);

  }

  private void saveSession(LocalDate startDate, LocalDate endDate, String sessionName, Long id_survey,
      GeneratedSessionRepository generatedSessionRepository, Survey survey, Integer agricYear) {

    //System.out.println("AGRIC YEAR: "+agricYear);
    GeneratedSession gSession = new GeneratedSession();
    gSession.setStartDate(startDate);
    gSession.setEndDate(endDate);
    gSession.setValid(1);
    gSession.setSessionName(sessionName);
    gSession.setIdSurvey(id_survey);
    gSession.setSurvey(survey);
    gSession.setWho(111);
    gSession.setAgricYear(agricYear);
    generatedSessionRepository.save(gSession);
  }


  //@pt controllerele in care intru de pe redirect; de vazut de- mi mai tre chestii , nu doar id!!!
  public long getLoggedUserIdFromJwtToken(String jwtToken) {
    String jwt = jwtToken.substring(1, jwtToken.length() - 1);
    Long userId = null;

    if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
      userId = jwtUtils.getUserIdFromJwtToken(jwt);

    }
    return userId;
  }

}
