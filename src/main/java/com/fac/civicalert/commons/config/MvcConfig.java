package com.fac.civicalert.commons.config;

import com.fac.civicalert.commons.controller.interceptor.ControllerInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import java.util.Locale;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

  @Autowired
  private ControllerInterceptor controllerInterceptor;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/resources/**")
        .addResourceLocations("/resources/");
  }

  @Bean("messageSource")
  public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasenames("messages");
    messageSource.setDefaultLocale(new Locale("ro", "RO"));
    messageSource.setDefaultEncoding("UTF-8");
    return messageSource;
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(this.localeChangeInterceptor());
    registry.addInterceptor(this.controllerInterceptor).addPathPatterns("/api/**");
  }

  @Bean
  public LocaleChangeInterceptor localeChangeInterceptor() {
    LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
    lci.setParamName("lang");
    return lci;
  }

  @Bean
  public LocaleResolver localeResolver() {
    CookieLocaleResolver clr = new CookieLocaleResolver();
//    slr.setDefaultLocale(new Locale("ro", "RO"));
    return clr;
  }

}