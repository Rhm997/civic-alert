package com.fac.civicalert.management.surveys.service;

import com.fac.civicalert.client.surveys.dao.SurveyZonesDao;
import com.fac.civicalert.management.surveys.repository.SurveyRepository;
import com.fac.civicalert.management.surveys.repository.SurveyResponseRepository;
import com.fac.civicalert.management.surveys.repository.ZoneRepository;
import com.fac.civicalert.management.surveys.dto.ZoneDTO;
import com.fac.civicalert.management.surveys.entity.Zone;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class ZoneService {

    private final ZoneRepository zoneRepository;
    private final SurveyResponseRepository surveyResponseRepository;
    private final SurveyRepository surveyRepository;
    private final SurveyZonesDao surveyZonesDao;

    @Transactional(readOnly = true)
    public List<ZoneDTO> findAll() {
        return zoneRepository.findAll().stream()
                .map(this::toZoneDTO)
                .collect(toList());
    }

    private ZoneDTO toZoneDTO(Zone zone) {
        ZoneDTO zoneDTO = new ZoneDTO();
        zoneDTO.setId(zone.getId());
        zoneDTO.setCountry(zone.getCountry());
        zoneDTO.setCity(zone.getCity());
        zoneDTO.setRegion(zone.getRegion());
        zoneDTO.setCounty(zone.getCounty());

        return zoneDTO;
    }

    public void updateSurveyZones(Long idUser, Map<String, List<Integer>> asoc) {
        surveyZonesDao.deleteAllByUserId(idUser);
        surveyZonesDao.insertSurveyZones(idUser, asoc);
    }
}
