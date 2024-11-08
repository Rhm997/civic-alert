package com.fac.civicalert.commons.controller.advisor;

import com.fac.civicalert.commons.common.exception.AuthException;
import com.fac.civicalert.commons.common.exception.FieldErrorException;
import com.fac.civicalert.commons.common.exception.MessageException;
import com.fac.civicalert.commons.common.exception.UserMessageException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice(annotations = RestController.class)
public class ControllerAdvisor {

  @ExceptionHandler(UserMessageException.class)
  public ResponseEntity<MessageException> handleException(UserMessageException e) {
    return ResponseEntity.internalServerError().body(new MessageException(e.getMessage()));
  }

  @ExceptionHandler(FieldErrorException.class)
  public ResponseEntity<FieldErrorException> handleException(FieldErrorException e) {
    return ResponseEntity.badRequest().body(e);
  }

  @ExceptionHandler(AuthException.class)
  public ResponseEntity<AuthException> handleException(AuthException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e);
  }

  //ToDo asta nu e prinsa cand se arunca in filter chain, de vazut cum putem diferentia 401 de unauthorized de jwt expired pt FE
  @ExceptionHandler(ExpiredJwtException.class)
  public ResponseEntity<MessageException> handleException(ExpiredJwtException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageException("token expired"));
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<MessageException> handleException(AccessDeniedException e) {
    //return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthException(e.getMessage()));
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageException(e.getMessage()));
  }
}
