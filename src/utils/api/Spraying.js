export class Spraying {
  /**
   * @param id {number}
   * @param sections {Section[]}
   * @param description {Description}
   * @param summary {Summary}
   */
  constructor(id, sections, description, summary) {
    this.id = id
    this.sections = sections
    this.description = description
    this.summary = summary
  }
}

export class Chemical {

}

export class Sector {

}

export class Position {
  constructor(lat, lon) {
    this.lat = lat
    this.lon = lon
  }
}

export class Section {
  /**
   * @param id {number}
   * @param distance {number}
   * @param position {Position}
   * @param sprayed {number}
   * @param water {number}
   * @param waterDosage {number}
   * @param weedInfestation {number}
   * @param chemicals {Chemical[]}
   * @param sectors {Sector[]}
   */
  constructor(id, distance, position, sprayed, water, waterDosage, weedInfestation, chemicals, sectors) {
    this.id = id
    this.distance = distance
    this.position = position
    this.sprayed = sprayed
    this.water = water
    this.waterDosage = waterDosage
    this.weedInfestation = weedInfestation
    this.chemicals = chemicals
    this.sectors = sectors
  }
}

export class Description {
  /**
   * @param requestType {string}
   * @param databaseName {string}
   * @param sectionSprayed {string}
   * @param timeSprayed {Date}
   * @param distanceSprayed {string}
   */
  constructor(requestType, databaseName, sectionSprayed, timeSprayed, distanceSprayed) {
    this.requestType = requestType
    this.databaseName = databaseName
    this.sectionSprayed = sectionSprayed
    this.timeSprayed = timeSprayed
    this.distanceSprayed = distanceSprayed
  }
}

export class Summary {
  /**
   * @param water {number}
   * @param weedInfestationSummary {WeedInfestationSummary}
   * @param chemicalSummaries {ChemicalSummary[]}
   */
  constructor(water, weedInfestationSummary, chemicalSummaries) {
    this.water = water
    this.weedInfestationSummary = weedInfestationSummary
    this.chemicalSummaries = chemicalSummaries
  }
}

export class SectorQuantity {
  /**
   * @param sectorId {number}
   * @param quantity {number}
   */
  constructor(sectorId, quantity) {
    this.sectorId = sectorId
    this.quantity = quantity
  }
}

export class ChemicalSummary {
  /**
   * @param chemicalId {number}
   * @param quantity {number}
   * @param sectorQuantities {SectorQuantity[]}
   */
  constructor(chemicalId, quantity, sectorQuantities) {
    this.chemicalId = chemicalId
    this.quantity = quantity
    this.sectorQuantities = sectorQuantities
  }
}

export class WeedInfestationSummary {
  /**
   * @param quantity {number}
   * @param sectorQuantities {SectorQuantity[]}
   */
  constructor(quantity, sectorQuantities) {
    this.quantity = quantity
    this.sectorQuantities = sectorQuantities
  }
}
