package com.fac.civicalert.commons.common.email;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;


  public void sendPlainTextEmail(final String to, final String subject, final String body) {
    final SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setText(body);

    mailSender.send(message);
  }

/*  @Async
  public void sendHtmlEmail(final String to, final String subject, final String htmlContent) throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    message.setContent(htmlContent, "text/html; charset=UTF-8");

    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
    helper.setTo(to);
    helper.setSubject(subject);

    mailSender.send(message);
  }*/
}
