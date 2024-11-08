package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/complaints")
@RequiredArgsConstructor
public class ComplaintViewController {

//    private final ComplaintService complaintService;
//    private final UatService uatService;
 //   private final AuthUtils authUtils;
//    private final ObjectMapper objectMapper;
//
//    @GetMapping()
//    public String getAll(ModelMap mModel) {
////        mModel.put("complaints", complaintService.getAll());
//        mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//        return "pages/complaints/complaints";
//    }
//
//    @GetMapping("/complaints")
//    public String getCollects(ModelMap mModel, @RequestHeader("filters") final String filters) throws JsonProcessingException {
//        mModel.put("complaints", complaintService.getAll(objectMapper.readValue(filters, FiltersDTO.class)));
//        return "pages/complaints/tabel_sesizari";
//    }


}
