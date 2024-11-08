package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/nom")
public class NomViewController {
//
//  private final NomService nomService;
//
//  @GetMapping("/{type}")
//  public String getNom(ModelMap mModel, @PathVariable Integer type) {
//    mModel.put("nom_name", NOM_NAMES[type]);
//    mModel.put("nom", nomService.getNom(type));
//    mModel.put("type", type);
//
//    return "pages/nom/" + NOM_PAGES[type];
//  }
//
//  @GetMapping("/modal/{type}")
//  public String getNomForModal(ModelMap mModel, @PathVariable Integer type, String id, String typeNom) {
//    mModel.put("type", type);
//    switch (type) {
//      case 0:
//        mModel.put("nom", nomService.getActiveUms());
//        if (id != null && !id.isEmpty()) {
//          mModel.put("test", nomService.getNomEntity(type, id));
//        }
//        if (id.isEmpty()) {
//          id = "null";
//        }
//        mModel.put("id", id);
//        mModel.put("um", typeNom);
//        break;
//      case 1:
//        List<Enum> wasteTypes = Arrays.asList(WasteType.values());
//        mModel.put("nom", nomService.getNom(type == 0 ? 2 : type));
//        if (id != null && !id.isEmpty()) {
//          mModel.put("fraction", nomService.getNomEntity(type, id));
//        }
//        mModel.put("wasteTypes", wasteTypes);
//        if (id.isEmpty()) {
//          id = "null";
//        }
//        mModel.put("id", id);
//        mModel.put("wasteType", typeNom);
//        break;
//      case 2:
//        mModel.put("nom", nomService.getNom(type == 0 ? 2 : type));
//        if (id != null && !id.isEmpty()) {
//          mModel.put("ums", nomService.getNomEntity(type, id));
//        }
//        break;
//    }
//
//    return "pages/modal/" + NOM_PAGES_MODAL[type];
//  }
}
