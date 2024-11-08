package com.fac.civicalert.commons.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AgricYearDTO {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String agricYear;
    private String obs;
}
