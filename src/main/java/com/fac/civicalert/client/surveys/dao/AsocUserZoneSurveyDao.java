package com.fac.civicalert.client.surveys.dao;

import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.pbkdf2.Integers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AsocUserZoneSurveyDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getAsocUserZoneSurvey(Long idUser) {
        String sql = "select auzs.id, s.survey_title_ro, concat(z.city, ', ' , z.county) as zone, z.id as id_zone, s.id as id_survey " +
                " from app.asoc_user_zone_survey auzs " +
                " inner join app.surveys s on auzs.id_survey = s.id " +
                " inner join app.zones z on z.id = auzs.id_zone " +
                " where auzs.id_user = ? " +
                " order by auzs.id ";

        return jdbcTemplate.queryForList(sql, idUser);
    }

    public List<Map<String, Object>> getAsocUserZoneSurveyIds(Long idUser) {
        String sql = "select distinct auzs.id_zone, concat(z.city, ', ' , z.county) as zone from app.asoc_user_zone_survey auzs " +
                "inner join app.zones z on z.id = auzs.id_zone " +
                "where auzs.id_user = ? ";

        return jdbcTemplate.queryForList(sql, idUser);
    }
}
