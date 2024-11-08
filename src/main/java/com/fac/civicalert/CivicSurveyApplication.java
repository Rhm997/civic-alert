package com.fac.civicalert;

import com.fac.civicalert.commons.entity.base.AuditorAwareImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableWebMvc
@EnableSwagger2
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@EnableAsync
public class CivicSurveyApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(CivicSurveyApplication.class, args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(CivicSurveyApplication.class);
  }

  @Bean
  AuditorAware<Long> auditorProvider() {
    return new AuditorAwareImpl();
  }

//  @Bean
//  public Docket api() {
//    return new Docket(DocumentationType.SWAGGER_2)
//        .select()
//        .paths(PathSelectors.ant("/anm/api/**").or(PathSelectors.ant("/api/**")).or(PathSelectors.ant("/anm-api-*/api/**")))
//        .apis(RequestHandlerSelectors.basePackage("com.fida"))
//        .build();
//  }

  @Bean
  public ViewResolver viewResolver() {
    InternalResourceViewResolver bean = new InternalResourceViewResolver();
    bean.setViewClass(JstlView.class);
    bean.setPrefix("/WEB-INF/jsp/");
    bean.setSuffix(".jsp");

    return bean;
  }

  @Bean(name = "multipartResolver")
  public CommonsMultipartResolver multipartResolver() {
    CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
    return multipartResolver;
  }
}
