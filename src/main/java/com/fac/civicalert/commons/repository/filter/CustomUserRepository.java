package com.fac.civicalert.commons.repository.filter;

import com.fac.civicalert.commons.entity.User;
import com.fac.civicalert.commons.security.utils.AuthUtils;
import com.fac.civicalert.commons.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

import static java.util.Objects.isNull;
import static java.util.stream.Collectors.toList;
import static org.springframework.data.jpa.domain.Specification.where;

@Component
@RequiredArgsConstructor
public class CustomUserRepository<T> {

  private final UserRepository userRepository;
  private final AuthUtils authUtils;

  public Page<User> getQueryResult(final List<Filter> filters, final Integer page) {
    if (filters.size() > 0) {
      return userRepository.findAll(getSpecificationFromFilters(filters),
          PageRequest.of(page, 10));
    } else {
      return userRepository.findAll(PageRequest.of(page, 10));
    }
  }

  public List<User> getQueryResultNotPaged(final List<Filter> filters) {
    if (filters.size() > 0) {
      return userRepository.findAll(getSpecificationFromFilters(filters));
    }
    return userRepository.findAll();
  }

  private Specification<User> getSpecificationFromFilters(final List<Filter> filters) {
    final List<Specification<User>> specs = filters.stream()
        .filter(f -> !isNull(f.getValue()) || (!isNull(f.getValues()) && !f.getValues().isEmpty()))
        .map(this::createSpecification)
        .collect(toList());

    return (Specification) StreamSupport.stream(specs.spliterator(), false)
        .reduce(where((Specification) null), Specification::and);
  }

  private Specification<User> createSpecification(final Filter filter) {
    Boolean isMaster = authUtils.isUserMaster();
    switch (filter.getOperator()) {
      case EQUALS:
        return (root, query, criteriaBuilder) -> {
          if (filter.getField().equals("idUat")) {
            query.distinct(true);
            return criteriaBuilder.equal(root.join("groups", JoinType.INNER).join("uats", JoinType.INNER).get("id"),
                castToRequiredType(Long.class, filter.getValue()));
          }
          if (filter.getField().equals("groups")) {
            query.distinct(true);
            return criteriaBuilder.equal(root.join("groups", JoinType.INNER).get("id"),
                castToRequiredType(Long.class, filter.getValue()));
          }
          if (filter.getField().contains(".")) {
            return criteriaBuilder.equal(getPath((Root<T>) root, filter.getField()),
                castToRequiredType(getPath((Root<T>) root, filter.getField()).getJavaType(),
                    filter.getValue()));
          }
          System.out.println(
              "filter.getField()).getJavaType() " + root.get(filter.getField()).getJavaType());
          System.out.println("filter.getValue() " + filter.getValue());
          return criteriaBuilder.equal(root.get(filter.getField()),
              castToRequiredType(root.get(filter.getField()).getJavaType(), filter.getValue()));
        };
      case NOT_EQ:
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.notEqual(root.get(filter.getField()),
                castToRequiredType(root.get(filter.getField()).getJavaType(), filter.getValue()));
      case GREATER_THAN:
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.ge(root.get(filter.getField()),
                (Number) castToRequiredType(root.get(filter.getField()).getJavaType(),
                    filter.getValue()));
      case LESS_THAN:
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.le(root.get(filter.getField()),
                (Number) castToRequiredType(root.get(filter.getField()).getJavaType(),
                    filter.getValue()));
      case LIKE:
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(
            criteriaBuilder.lower(root.get(filter.getField())),
            "%" + filter.getValue().toLowerCase() + "%");
      case IN:
        return (root, query, criteriaBuilder) -> {
          if (filter.getField().equals("idUat")) {
            if (isMaster) return criteriaBuilder.and();// daca e master le aduc pe toate
            query.distinct(true);
            return criteriaBuilder.in(root.join("groups", JoinType.INNER).join("uats", JoinType.INNER).get("id")).value(
                castToRequiredType(Long.class, filter.getValues()));
          }
          if (filter.getField().equals("groups")) {
            if (isMaster) return criteriaBuilder.and();// daca e master le aduc pe toate
            query.distinct(true);
            return criteriaBuilder.in(root.join("groups", JoinType.INNER).get("id")).value(
                castToRequiredType(Long.class, filter.getValues()));

          }
          return criteriaBuilder.in(root.get(filter.getField()))
              .value(castToRequiredType(root.get(filter.getField()).getJavaType(),
                  filter.getValues()));
        };
      default:
        throw new RuntimeException("Operation not supported yet");
    }
  }

  private Object castToRequiredType(final Class fieldType, final String value) {
    if (fieldType.isAssignableFrom(Double.class)) {
      return Double.valueOf(value);
    } else if (fieldType.isAssignableFrom(BigDecimal.class)) {
      return BigDecimal.valueOf(Double.valueOf(value));
    } else if (fieldType.isAssignableFrom(Boolean.class)) {
      return Boolean.valueOf(value);
    } else if (fieldType.isAssignableFrom(Integer.class)) {
      return Integer.valueOf(value);
    } else if (fieldType.isAssignableFrom(Long.class)) {
      return Long.valueOf(value);
    } else if (fieldType.isAssignableFrom(String.class)) {
      return value;
    } else if (Enum.class.isAssignableFrom(fieldType)) {
      return Enum.valueOf(fieldType, value);
    }
    return null;
  }

  private Object castToRequiredType(final Class fieldType, final List<String> value) {
    List<Object> lists = new ArrayList<>();
    for (String s : value) {
      lists.add(castToRequiredType(fieldType, s));
    }
    return lists;
  }

  private Path<T> getPath(final Root<T> root, final String attributeName) {
    Path<T> path = root;
    for (String part : attributeName.split("\\.")) {
      path = path.get(part);
    }
    return path;
  }

  private String sanitizeKeyword(String keyword) {
    if (!keyword.contains("%")) {
      return "%" + keyword.toLowerCase() + "%";
    }
    return keyword.toLowerCase();
  }


}