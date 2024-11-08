package com.fac.civicalert.commons.security;

import static org.springframework.security.config.Customizer.withDefaults;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {


  //  private final UserDetailsServiceImpl userDetailsService;
  private final AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public static PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // ToDo clarify public and private paths before first release
    http.cors().and()
        .csrf(AbstractHttpConfigurer::disable)
        .headers().frameOptions().sameOrigin()
        .and()
        .addFilterBefore(authenticationJwtTokenFilter(),
            UsernamePasswordAuthenticationFilter.class)
        .authorizeHttpRequests(amrmr -> amrmr
            .antMatchers("/api/auth/**").permitAll()
            .antMatchers("/api/surveys/**").permitAll()
                .antMatchers("/api/surveyResponse/**").permitAll()
                .antMatchers("/users/**").permitAll()
            .antMatchers("/client/survey/**").permitAll()
                .antMatchers("/client/users/**").permitAll()
            .antMatchers("/resources/**").permitAll()
                .antMatchers("/survey/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/uats").permitAll()
            .antMatchers("/**/downloadDoc/**").permitAll()
            .antMatchers("/**/map/**").permitAll()
      
            .antMatchers("/**/users/resetPassword").permitAll()
            .antMatchers("/swagger-ui/**",
                "/swagger-resources/**",
                "/v2/api-docs",
                "/webjars/**"
            ).permitAll()
            .antMatchers("/", "/main", "/client", "/maps" ,"/main/getLanguageContent").permitAll()
            .anyRequest()
            .authenticated())
        .exceptionHandling(eh -> eh.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .httpBasic(withDefaults());
    return http.build();
  }

  @Bean
  public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new
        UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
//    config.setAllowCredentials(true);
    config.addAllowedOrigin("*");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

}