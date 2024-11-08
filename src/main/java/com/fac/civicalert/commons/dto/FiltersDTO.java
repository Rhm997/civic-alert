package com.fac.civicalert.commons.dto;

import com.fac.civicalert.commons.repository.filter.Filter;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FiltersDTO {

  private Integer page;
  private List<Filter> filters;

}
