package com.fac.civicalert.commons.controller.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor //asta nu mai necesita @Autowired
@RequestMapping("/collect")
public class WasteCollectViewController {
//
//  private final NomService nomService;
//  private final ContractService contractService;
//  private final CollectorService collectorService;
//  private final UatService uatService;
//  private final NomLocalityRepository nomLocalityRepository;
//  private final NomLoadLevelRepository nomLoadLevelRepository;
//  private final AuthUtils authUtils;
//  private final WasteCollectService wasteCollectService;
//  private final ObjectMapper objectMapper;
//
//  @GetMapping("/viewPage")
//  public String getCollectPage(ModelMap mModel) throws JsonProcessingException {
//    mModel.put("fractions", nomService.getFractions());
//    mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//    return "pages/collect/collects";
//  }
//
//  @GetMapping("/addPage")
//  public String addCollectPage(ModelMap mModel) throws JsonProcessingException {
//    mModel.put("fractions", nomService.getFractions());
//    mModel.put("loadLevel", nomLoadLevelRepository.findAll());
//    mModel.put("localitate", nomLocalityRepository.findAll());
//    mModel.put("um", nomService.getUms());
//    mModel.put("contracts", contractService.getAllContractsByUats(authUtils.getUserId()));
//    mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//    return "pages/collect/add_collects";
//  }
//
//  @GetMapping("/collects")
//  public String getCollects(ModelMap mModel, @RequestHeader("filters") final String filters) throws JsonProcessingException {
//    mModel.put("collects", wasteCollectService.getCollects(objectMapper.readValue(filters, FiltersDTO.class)));
//    return "pages/collect/tabel_colectari";
//  }
//
//  @GetMapping("/problems/viewPage")
//  public String getProblemsPage(ModelMap mModel) throws JsonProcessingException {
//    mModel.put("uats", uatService.getAllForUser(authUtils.getUserId()));
//    return "pages/collect/problems";
//  }
//
//  @GetMapping("/problems")
//  public String getProblems(ModelMap mModel, @RequestHeader("filters") final String filters)
//      throws JsonProcessingException {
//    mModel.put("problems", wasteCollectService.getProblems(objectMapper.readValue(filters, FiltersDTO.class)));
//    return "pages/collect/tabel_probleme";
//  }
//
//  @GetMapping("/problems/filtered")
//  public String getFilteredProblems(ModelMap mModel, @RequestHeader("filters") final String filters)
//      throws JsonProcessingException {
//    mModel.put("problems",
//        wasteCollectService.findProblemsWithFilters(objectMapper.readValue(filters, FiltersDTO.class)));
//    return "pages/collect/problems";
//  }
//
//  @GetMapping("downloadDoc/{idProblem}")
//  public void downloadDoc(HttpServletRequest request, HttpServletResponse response, @PathVariable Integer idProblem) {
//    String docPath = wasteCollectService.getProblemPath(idProblem);
//
//    Path crtpath = Paths.get(docPath);
//    try {
//      response.setContentType(Files.probeContentType(crtpath));
//      response.setHeader("Content-disposition", " filename=\"" + crtpath.getFileName() + "\" ");
//      ServletOutputStream out;
//      out = response.getOutputStream();
//
//      FileInputStream is = new FileInputStream(docPath);
//
//      BufferedInputStream bin = new BufferedInputStream(is);
//      BufferedOutputStream bout = new BufferedOutputStream(out);
//      int ch = 0;
//      ;
//      while ((ch = bin.read()) != -1) {
//        bout.write(ch);
//      }
//
//      bin.close();
//      is.close();
//      bout.close();
//      out.close();
//    } catch (IOException ex) {
//      System.out.println("eroare citire ci in PersoanaController: " + ex.toString());
//    } catch (Exception ex1) {
//      ex1.printStackTrace();
//    }
//
//  }
}
