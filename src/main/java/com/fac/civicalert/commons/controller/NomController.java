package com.fac.civicalert.commons.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/noms")
@RequiredArgsConstructor
public class NomController {

//  private final NomService nomService;
//
//  @PutMapping("/createOrUpdateCapacities")
//  public ResponseEntity<MessageResponse> createOrUpdateCapacities(@RequestBody NomCapacityDTO nomCapacityDTO) {
//    nomService.createOrUpdateCapacities(nomCapacityDTO);
//
//    return ResponseEntity.ok(new MessageResponse("Success"));
//  }
//
//  @PutMapping("/createOrUpdateFractions")
//  public ResponseEntity<MessageResponse> createOrUpdateFractions(@RequestBody NomFractionDTO nomFractionDTO) {
//    nomService.createOrUpdateFractions(nomFractionDTO);
//
//    return ResponseEntity.ok(new MessageResponse("Success"));
//  }
//
//  @PutMapping("/createOrUpdateUms")
//  public ResponseEntity<MessageResponse> createOrUpdateUms(@RequestBody NomUmDTO nomUmDTO) {
//    nomService.createOrUpdateUms(nomUmDTO);
//
//    return ResponseEntity.ok(new MessageResponse("Success"));
//  }
//
//  @GetMapping("/loadLevels")
//  public ResponseEntity<List<NomLoadLevelDTO>> getLoadLevels() {
//    return ResponseEntity.ok(nomService.getLoadLevels());
//  }
//
//  @GetMapping("/capacities")
//  public ResponseEntity<List<NomCapacityDTO>> getCapacities() {
//    return ResponseEntity.ok(nomService.getCapacities());
//  }
//
//  @GetMapping("/fractions")
//  public ResponseEntity<List<NomFractionDTO>> getFractions() {
//    return ResponseEntity.ok(nomService.getFractions());
//  }
//
//  @GetMapping("/localities")
//  public ResponseEntity<List<NomLocalityDTO>> getLocalities() {
//    return ResponseEntity.ok(nomService.getLocalities());
//  }
//
//  @GetMapping("/regions")
//  public ResponseEntity<List<NomRegionDTO>> getRegions() {
//    return ResponseEntity.ok(nomService.getRegions());
//  }
//
//  @GetMapping("/regions/{regionCode}/localities")
//  public ResponseEntity<List<NomLocalityDTO>> getLocalitiesByRegion(
//      @PathVariable final Integer regionCode) {
//    return ResponseEntity.ok(nomService.getLocalitiesByRegion(regionCode));
//  }
//
//  @GetMapping("/ums")
//  public ResponseEntity<List<NomUmDTO>> getUms() {
//    return ResponseEntity.ok(nomService.getUms());
//  }
//
//  @GetMapping("/wasteTypes")
//  public ResponseEntity<List<WasteType>> getWasteTypes() {
//    return ResponseEntity.ok(Arrays.asList(WasteType.values()));
//  }
//
//  @GetMapping("/statuses")
//  public ResponseEntity<List<NomStatusDTO>> getStatuses() {
//    return ResponseEntity.ok(nomService.getStatuses());
//  }
//
//  @GetMapping("/contractTypes")
//  public ResponseEntity<List<NomContractTypeDTO>> getContractTypes() {
//    return ResponseEntity.ok(nomService.getContractTypes());
//  }
//
//  @GetMapping("/problems")
//  public ResponseEntity<List<NomProblemDTO>> getProblems() {
//    return ResponseEntity.ok(nomService.getProblems());
//  }
//
//  @GetMapping("/all")
//  public ResponseEntity<NomAllDTO> getAll() {
//    return ResponseEntity.ok(nomService.getAll());
//  }
//
//  @PostMapping("/{id}/toggle-status")
//  public ResponseEntity<MessageResponse> toggleNomActiveStatus(@PathVariable final String id,
//      @RequestParam final Integer type, @RequestParam final Integer currentActive) {
//    nomService.toggleActiveStatus(id, type, currentActive);
//
//    return ResponseEntity.ok(new MessageResponse("Success"));
//  }

}
