package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/uat")
public class UatViewController {

//  private final UatService uatService;
//  private final CollectorService collectorService;
//
//  @GetMapping("/all")
//  public String getAllUats(ModelMap mModel) {
//    mModel.put("uat_list", uatService.findAllActiveUats());
//    mModel.put("collectors", collectorService.findAllActiveCollectors());
//
//    return "pages/uat/uats";
//  }
//
//  @GetMapping("/{id}")
//  public String getUat(ModelMap mModel, @PathVariable Long id) {
//    mModel.put("uat", uatService.findById(id));
//    mModel.put("collector", collectorService.findAllActiveCollectors());
//
//    return "pages/uat/uat";
//  }

}
