package com.fac.civicalert.commons.common.utils;

import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toList;

import com.fac.civicalert.commons.common.exception.UserMessageException;

import java.util.List;
import java.util.function.Function;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class EntityUtils {

  public static <C> List<C> findByIdsNullSafe(final JpaRepository<C, Long> repository,
                                              final List<Long> ids) {
    return ids.stream()
        .map(id -> findByIdNullSafe(repository, id))
        .collect(toList());
  }

  public static <C> C findByIdNullSafe(final JpaRepository<C, Long> repository, final Long id) {
    return repository.findById(id)
        .orElseThrow(() -> {
          throw new UserMessageException("Entitatea cu ID: " + id + " nu a putut fi gasită");
        });
  }

  public static <C> C findByIdNullSafe(final JpaRepository<C, Integer> repository,
                                       final Integer id) {
    return repository.findById(id)
        .orElseThrow(() -> {
          throw new UserMessageException("Entitatea cu ID: " + id + " nu a putut fi gasită");
        });
  }

  public static <C> C findByIdOrNull(final JpaRepository<C, Long> repository, final Long id) {
    return ofNullable(id)
        .map(idEntity -> findByIdNullSafe(repository, idEntity))
        .orElse(null);
  }


  /**
   * For cases with Long id on entity/repo but Integer on DTO
   **/
  public static <C> C findByIdOrNull(final JpaRepository<C, Long> repository, final Integer id) {
    return ofNullable(id)
        .map(idEntity -> findByIdNullSafe(repository, idEntity.longValue()))
        .orElse(null);
  }

  public static <C> C findByIdNullSafe(final JpaRepository<C, String> repository, final String id) {
    return repository.findById(id)
        .orElseThrow(() -> {
          throw new UserMessageException("Entitatea cu ID: " + id + " nu a putut fi gasită");
        });
  }

  public static <C> C findByIdOrNull(final JpaRepository<C, String> repository, final String id) {
    return ofNullable(id)
        .map(idEntity -> findByIdNullSafe(repository, idEntity))
        .orElse(null);
  }

  public static <R, T> R getValueOrDefault(T input, Function<T, R> function, R defaultValue) {
    return ofNullable(input)
        .map(function)
        .orElse(defaultValue);
  }

  public static <R, T, A> R getValueOrDefault(T input, Function<T, A> function,
                                              Function<A, R> function2, R defaultValue) {
    return ofNullable(input)
        .map(function)
        .map(function2)
        .orElse(defaultValue);
  }

  public static <R, T, A, C> R getValueOrDefault(T input, Function<T, A> function,
                                                 Function<A, C> function2, Function<C, R> function3,
                                                 R defaultValue) {
    return ofNullable(input)
        .map(function)
        .map(function2)
        .map(function3)
        .orElse(defaultValue);
  }

}
