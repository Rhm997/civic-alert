package com.fac.civicalert.commons.repository.filter;

import javax.persistence.criteria.From;
import javax.persistence.criteria.Join;

public class SpecificationUtils {

  public static <Z, X> Join<X, ?> getJoin(From<Z, X> root, String attribute) {
    return root.getJoins().stream()
        .filter(join -> join.getAttribute().getName().equals(attribute))
        .findAny()
        .orElseGet(() -> root.join(attribute));
  }
}
