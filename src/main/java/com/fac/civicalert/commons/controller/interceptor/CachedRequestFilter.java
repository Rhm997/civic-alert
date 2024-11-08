package com.fac.civicalert.commons.controller.interceptor;

import com.fac.civicalert.commons.repository.RequestLogsRepository;
import com.fac.civicalert.commons.entity.RequestLogs;
import lombok.SneakyThrows;
import org.apache.catalina.connector.RequestFacade;
import org.apache.catalina.connector.ResponseFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CachedRequestFilter implements Filter {

  @Autowired
  private RequestLogsRepository requestLogsRepository;

  @Override
  @SneakyThrows
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
    MultiReadRequest wrapper = new MultiReadRequest((HttpServletRequest) request);
    chain.doFilter(wrapper, response);
    final RequestLogs requestLogs = (RequestLogs) request.getAttribute("request-log-object");
    if (requestLogs != null) {
      requestLogs.setResponse_code(String.valueOf(((ResponseFacade) response).getStatus()));
      requestLogs.setRequest_token(((RequestFacade) request).getHeader("authorization"));
      requestLogsRepository.save(requestLogs);
    }
  }

  @Override
  public void destroy() {
  }

  class MultiReadRequest extends HttpServletRequestWrapper {

    private String requestBody;

    @SneakyThrows
    public MultiReadRequest(HttpServletRequest request) {
      super(request);
      requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
    }

    @Override
    public ServletInputStream getInputStream() {
      final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(requestBody.getBytes());
      return new ServletInputStream() {
        @Override
        public boolean isFinished() {
          return byteArrayInputStream.available() == 0;
        }

        @Override
        public boolean isReady() {
          return true;
        }

        @Override
        public void setReadListener(ReadListener readListener) {

        }

        @Override
        public int read() {
          return byteArrayInputStream.read();
        }
      };
    }

    @Override
    @SneakyThrows
    public BufferedReader getReader() {
      return new BufferedReader(new InputStreamReader(this.getInputStream(), StandardCharsets.UTF_8));
    }
  }

}
