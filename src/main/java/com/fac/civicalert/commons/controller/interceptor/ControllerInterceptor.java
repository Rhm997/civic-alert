package com.fac.civicalert.commons.controller.interceptor;

import com.fac.civicalert.commons.repository.RequestLogsRepository;
import com.fac.civicalert.commons.entity.RequestLogs;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import static java.lang.Boolean.FALSE;

@Component
public class ControllerInterceptor implements HandlerInterceptor {

  @Autowired
  private RequestLogsRepository requestLogsRepository;

  public ControllerInterceptor() {
    super();
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
	  //System.out.println("0000");
	  //System.out.println("in afterCompletion " );
    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                         ModelAndView modelAndView) {
	  //System.out.println("1111");
	  //System.out.println("in afterCompletion " );
    return;
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
      throws Exception {
 
    String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

    RequestLogs requestLog = new RequestLogs();
    requestLog.setTimestamp(LocalDateTime.now());
    requestLog.setHttp_method(request.getMethod());
    requestLog.setPath(request.getServletPath());
    requestLog.setParameters(new JSONObject(request.getParameterMap()).toString());
    if (FALSE.equals(request.getServletPath().contains("api/complaints"))) {
      if (FALSE.equals(request.getServletPath().contains("login"))) {
        requestLog.setPayload(requestBody);
      } else {
        requestLog.setPayload("hidden payload (contains credentials)");
      }
    }
    request.setAttribute("request-log-object", requestLog);
  }
}
