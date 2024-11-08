package com.fac.civicalert.commons.common.utils;

import com.fac.civicalert.commons.dto.PageDTO;
import java.util.List;

public class DtoUtils {

  public static <T> PageDTO<T> buildPageDTO(final Integer page, final Integer totalPages,
      final List<T> elements) {
    PageDTO<T> pageDTO = new PageDTO<>();
    pageDTO.setPage(page + 1);
    pageDTO.setTotalPages(totalPages);
    pageDTO.setElements(elements);

    return pageDTO;
  }

}
