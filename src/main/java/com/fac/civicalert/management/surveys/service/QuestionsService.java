package com.fac.civicalert.management.surveys.service;

import com.fac.civicalert.management.surveys.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionsService {

  @Autowired
  private QuestionRepository questionRepository;

}
