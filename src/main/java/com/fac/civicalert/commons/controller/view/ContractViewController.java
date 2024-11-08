package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/contracts")
public class ContractViewController {

//  private final AuthUtils authUtils;
//  private final ContractService contractService;
//  private final UatService uatService;
//  private final NomService nomService;
//  private final ObjectMapper objectMapper;
//
//  @GetMapping("/add")
//  public String addContract(ModelMap mModel, Long contractType) {
//    mModel.put("contractTypes", nomService.getContractTypes());
//    mModel.put("contractType", contractType);
//    mModel.put("contract", new ContractFullDTO());
//    mModel.put("editMode", ADD_MODE);
//    mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//
//    if (contractType > 0) {
//      mModel.put("capacities", nomService.getCapacities());
//      mModel.put("fractions", nomService.getFractions());
//      mModel.put("regions", nomService.getRegions());
//      mModel.put("ums", nomService.getUms());
//    }
//
//    return "pages/contract/add";
//  }
//
//  @GetMapping("all/filtered")
//  public String getFilteredContracts(ModelMap mModel, @RequestHeader("filters") final String filters)
//      throws JsonProcessingException {
//    mModel.addAttribute("contracts",
//        contractService.findWithFilters(objectMapper.readValue(filters, FiltersDTO.class)));
//
//    return "pages/contract/tabel_contracte";
//  }
//
//  @GetMapping("viewPage")
//  public String getContractsPage(ModelMap mModel) {
//    mModel.put("contractTypes", nomService.getContractTypes());
//    mModel.put("statuses", nomService.getStatuses());
//    mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//
//    return "pages/contract/contracts";
//  }
//
//  @GetMapping("/all")
//  public String getAllContracts(ModelMap mModel) {
//
//    mModel.addAttribute("contracts", contractService.getAllContracts());
//
//    return "pages/contract/contracts";
//  }
//
//  @GetMapping("/{id}")
//  public String getContractById(ModelMap mModel, @PathVariable Long id) {
////        List listaDocumente = wContractService.getListaDocumente(contractId);
////
////        mModel.put("listaDoc", listaDocumente);
//    ContractFullDTO contract = contractService.getContractById(id);
//
//    //List<Map<String, Object>> inv_types = wContractService.getInvTypes(cb.getId_type());
//    //mModel.put("inv_types", inv_types);
//
////        List suspendari = wContractService.getSuspendariRezilieri(contractId, Constants.CONTRACT_SUSPENDED+"");
////        List rezilieri = wContractService.getSuspendariRezilieri(contractId, Constants.CONTRACT_CLOSED + ", "+Constants.CONTRACT_COLSED_UNILATERAL);
////        mModel.put("suspendari", suspendari);
////        mModel.put("rezilieri", rezilieri);
//
//    //ToDo show current capacity on edit bin even if inactive
//    mModel.put("capacities", nomService.getActiveCapacities());
//    mModel.put("fractions", nomService.getActiveFractions());
//    mModel.put("regions", nomService.getRegions());
//    mModel.put("ums", nomService.getActiveUms());
//    mModel.put("contractType", contract.getIdContractType());
//    mModel.put("contract", contract);
//    if (contract.getId() != 0) {
//      mModel.put("editMode", EDIT_MODE);
//    }
//
//    if (contract.getIdContractType() == Constants.DOC_TYPE_CONTRACT_PF) {
//      return "pages/contract/contractPF";
//    } else if (contract.getIdContractType() == Constants.DOC_TYPE_CONTRACT_PJ) {
//      return "pages/contract/contractPJ";
//    } else {
//      return "";
//    }
//
//  }
//
//  @GetMapping("/addLocationPoint")
//  public String addLocationPoint(ModelMap mModel, Integer tip_contract) {
//    mModel.put("capacities", nomService.getActiveCapacities());
//    mModel.put("fractions", nomService.getActiveFractions());
//    mModel.put("regions", nomService.getRegions());
//
//    mModel.put("tip_contract", tip_contract);
//    mModel.put("from", 2);
//    return "/pages/templates/location_point";
//  }
//
//  @GetMapping("/addBin")
//  public String addBin(ModelMap mModel) {
//    mModel.put("capacities", nomService.getActiveCapacities());
//    mModel.put("fractions", nomService.getActiveFractions());
//
//    mModel.put("from", 1);
//    return "/pages/templates/bin";
//  }

}
