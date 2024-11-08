package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/map")
public class MapViewController {

//  private final NomService nomService;
//  private final WasteCollectService wasteCollectService;
//  private final ConfigService configService;
//
//  @GetMapping("/getBinMap/{barCode}")
//  public String getAllGroups(ModelMap mModel, @PathVariable @Nullable String barCode) {
//
//    List<NomCapacityDTO> capacities = nomService.getCapacities();
//    List<NomFractionDTO> fractions = nomService.getFractions();
//
//    String paramCond = "";
//    String cond = " 1=1";
//    if (barCode != null && !barCode.isEmpty() && !barCode.equals("1")) {
//      cond += " and bar_code in (" + barCode + ") ";
//    }
//
//    mModel.put("cond_straturi", cond);
//    // mModel.put("urlAPI", "http://localhost:8082/waste");
//    mModel.put("urlAPI", "https://isaccea-des.gisapp.ro");
//
//    ObjectMapper mapper = new ObjectMapper();
//
//
//    Map<Long, String> resultCapacities = capacities.stream().collect(
//        Collectors.toMap(NomCapacityDTO::getId, NomCapacityDTO::getCapacityUm));
//
//
//    Map<Long, String> resultFractions = fractions.stream().collect(
//        Collectors.toMap(NomFractionDTO::getId, NomFractionDTO::getDescription));
//    try {
//      mModel.put("capacities", mapper.writeValueAsString(resultCapacities));
//    } catch (JsonProcessingException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    }
//    try {
//      mModel.put("fractions", mapper.writeValueAsString(resultFractions));
//    } catch (JsonProcessingException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    }
//    mModel.put("cond_aut", "");
//
//    String cond_final_harta = "";
//    List listDocs = new ArrayList<>();
//    try {
//      mModel.put("listDocs", mapper.writeValueAsString(resultCapacities));
//    } catch (JsonProcessingException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    }
//    String page = configService.getConfigByKey("map_page").getStringValue();
//    return isNull(page) ? "pages/harta/harta" : page;
//  }
//
//  @GetMapping("/getClientNameOfBin/{objectid}")
//  public @ResponseBody ResponseEntity<List> getClientNameOfBin(@PathVariable Integer objectid) throws JsonProcessingException {
//    System.out.println("intra in objectid=" + objectid);
//
//    ObjectMapper mapper = new ObjectMapper();
//    List<Map> lista = wasteCollectService.getClientNameOfBin(objectid);
//
//    return ResponseEntity.ok(lista);
//  }


}
