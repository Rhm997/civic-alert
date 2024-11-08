package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/dashboard")
public class DashboardViewController {

//  private final ContractService contractService;
//  private final AuthUtils authUtils;
//  private final LocationService locationService;
//  private final BinService binService;
//  private final UatService uatService;
//  private final WasteCollectService wasteCollectService;
//  private final ObjectMapper objectMapper;
//
//  @GetMapping("/contracts")
//  public String getContractsCreatedOrEditedBetween(ModelMap mModel, Integer only_card, @RequestHeader("filters") final String filters) throws JsonProcessingException {
//    mModel.put("contracts", contractService.getContractsCreatedOrEditedBetween(objectMapper.readValue(filters, FiltersDTO.class)));
//    mModel.put("uat", uatService.findAllActiveUats());
//    if (only_card == 1) {
//      return "pages/dahsboard/cardContracts";
//    } else {
//      return "pages/dahsboard/rapContracts";
//    }
//  }
//
//  @GetMapping("/locations/today")
//  public String getLocationsCreatedOrEditedToday(ModelMap mModel, Integer only_card, @RequestHeader("filters") final String filters) {
//    mModel.put("locations", locationService.getLocationsCreatedOrEditedToday());
//    if (only_card == 1) {
//      return "pages/dahsboard/cardLocations";
//    } else {
//      return "pages/dahsboard/rapLocations";
//    }
//  }
//
//  @GetMapping("/bins")
//  public String getBinsCreatedOrEditedBetween(ModelMap mModel, Integer only_card, @RequestHeader("filters") final String filters) throws JsonProcessingException {
//    //objectMapper.readValue(filters, FiltersDTO.class)
//    mModel.put("bins", binService.getBinsCreatedOrEditedBetween(objectMapper.readValue(filters, FiltersDTO.class)));
//    if (only_card == 1) {
//      return "pages/dahsboard/cardBins";
//    } else {
//      mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//      return "pages/dahsboard/rapBins";
//    }
//  }
//
//  @GetMapping("/collects")
//  public String getCollects(ModelMap mModel, Integer only_card, @RequestHeader("filters") final String filters) throws JsonProcessingException {
//    //objectMapper.readValue(filters, FiltersDTO.class)
//    mModel.put("collects", wasteCollectService.getCollects(objectMapper.readValue(filters, FiltersDTO.class)));
//    if (only_card == 1) {
//      return "pages/dahsboard/cardCollects";
//    } else {
//      return "pages/collect/collects";
//    }
//  }
//
//  @GetMapping("/problems")
//  public String getProblems(ModelMap mModel, Integer only_card, @RequestHeader("filters") final String filters) throws JsonProcessingException {
//    //objectMapper.readValue(filters, FiltersDTO.class)
//    mModel.put("collects", wasteCollectService.getProblems(objectMapper.readValue(filters, FiltersDTO.class)));
//    if (only_card == 1) {
//      return "pages/dahsboard/cardProblems";
//    } else {
//      return "pages/collect/problems";
//    }
//  }
}
