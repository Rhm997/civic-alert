package com.fac.civicalert.commons.repository.filter;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Filter {

  private String field;
  private QueryOperator operator;
  private String value;
  private List<String> values;

}
