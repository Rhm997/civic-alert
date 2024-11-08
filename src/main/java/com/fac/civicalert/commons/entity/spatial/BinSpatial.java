package com.fac.civicalert.commons.entity.spatial;

import com.fac.civicalert.commons.entity.base.SpatialAuditable;

/**
 * Left for reference purposes only in case we need to work with spatial tables, should not be used
 */
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name = "bin", schema = "sde")
//@EntityListeners(AuditingEntityListener.class)
public class BinSpatial extends SpatialAuditable {

//    @Id
//    @GeneratedValue(generator = "id-generator")
//    @GenericGenerator(name = "id-generator",
//            parameters = @Parameter(name = "tableName", value = "bin"),
//            strategy = "com.fida.wastemanagement.entity.spatial.IdGenerator")
//    @Column(name = "objectid", updatable = false, nullable = false)
//    private Integer id;

//    @Column(name = "bar_code")
//    private String barCode;
//
//    @Column(name = "rfid")
//    private String rfId;
//
//    @Column(name = "description")
//    private String description;
//
//    @Column(name = "obs")
//    private String obs;
//
//    @Column(name = "active")
//    private Integer active;
//
//    @Column(name = "id_location", insertable = false, updatable = false)
//    private Long idLocation;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_location", referencedColumnName = "id", nullable = false)
//    private Location location;
//
//    @Column(name = "id_fraction", insertable = false, updatable = false)
//    private Long idFraction;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_fraction", referencedColumnName = "id")
//    private NomFraction fraction;
//
//    @Column(name = "id_capacity", insertable = false, updatable = false)
//    private Long idCapacity;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "id_capacity", referencedColumnName = "id", nullable = false)
//    private NomCapacity capacity;
//
//    @Column(name = "um", insertable = false, updatable = false)
//    private String idUm;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "um", referencedColumnName = "id")
//    private NomUm um;
//
//    @Column(name = "lat")
//    private String latitudine;
//    @Column(name = "long")
//    private String longitudine;
//    @Column(name = "simbolgis")
//    private String simbolgis;
//    @Column(name = "x")
//    private String x;
//    @Column(name = "y")
//    private String y;
//    @Column(name = "last_collected_at")
//    private Timestamp lastCollectedAt;
//    @Column(name = "status_valid")
//    private Integer statusValid;
//    @Column(name = "state")
//    private String state;
//    @Column(name = "load_level")
//    private Integer loadLevel;
//    @Column(name = "id_fraction_last_collect")
//    private Integer idFractionLastCollect;
//
//    @OneToMany(mappedBy = "bin", fetch = FetchType.LAZY)
//    private Set<ProblemSpatial> problems;
//    @OneToMany(mappedBy = "bin", fetch = FetchType.LAZY)
//    private Set<WasteCollectSpatial> wasteCollects;
//    @Column(name = "id_uat")
//    private Long idUat;
}
