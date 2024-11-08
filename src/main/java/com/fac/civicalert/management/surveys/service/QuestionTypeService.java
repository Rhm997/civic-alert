package com.fac.civicalert.management.surveys.service;

import com.fac.civicalert.management.surveys.repository.QuestionTypeRepository;
import com.fac.civicalert.management.surveys.dto.QuestionTypeDTO;
import com.fac.civicalert.management.surveys.entity.QuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class QuestionTypeService {

    private final QuestionTypeRepository questionTypeRepository;

    public List<QuestionTypeDTO> getAllQuestionTypes() {
        return  questionTypeRepository.findAll().stream()
                .map(this::mapToQuestionTypeDto)
                .collect(toList());
    }

    private QuestionTypeDTO mapToQuestionTypeDto(final QuestionType questionType) {
        return QuestionTypeDTO.builder()
                .id(questionType.getId())
                .name(questionType.getName())
                .description(questionType.getDescription())
                .build();
    }
}
