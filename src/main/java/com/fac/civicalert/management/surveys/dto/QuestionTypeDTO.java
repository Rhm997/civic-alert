package com.fac.civicalert.management.surveys.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionTypeDTO {

    private Long id;
    private String name;
    private String description;
}
