package com.fac.civicalert.client.surveys.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SurveyZonesDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertSurveyZones(Long idUser, Map<String, List<Integer>> asoc) {
        for (Map.Entry<String, List<Integer>> entry : asoc.entrySet()) {
            String key = entry.getKey();
            List<Integer> values = entry.getValue();
            for (Integer value : values) {
                String sql = "INSERT INTO app.asoc_user_zone_survey(id_user, id_zone, id_survey) VALUES (?, ?, ?)";
                jdbcTemplate.update(sql, idUser, Integer.valueOf(key), value);
            }
        }
    }

    public void deleteAllByUserId(Long idUser) {
        String sql = "delete from app.asoc_user_zone_survey auzs where auzs.id_user = ?";
        jdbcTemplate.update(sql, idUser);
    }
}
