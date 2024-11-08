package com.fac.civicalert.commons.entity.spatial;

import java.io.Serializable;
import java.util.Properties;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.exception.spi.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

public class IdGenerator implements IdentifierGenerator, Configurable {

  private String tableName;

  @Override
  public Serializable generate(SharedSessionContractImplementor session, Object obj)
      throws HibernateException {
    String query = String.format("select sde.next_rowId('sde', '%s')", tableName);

    return (Serializable) session.createSQLQuery(query)
        .stream()
        .findFirst()
        .orElse(null);
  }

  @Override
  public void configure(Type type, Properties properties, ServiceRegistry serviceRegistry)
      throws MappingException {
    tableName = properties.getProperty("tableName");
  }

  @Override
  public void configure(Properties properties) throws HibernateException {
    tableName = properties.getProperty("tableName");
  }
}
