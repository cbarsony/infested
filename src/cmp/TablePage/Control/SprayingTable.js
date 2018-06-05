import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import {translate, keys} from 'utils/translate'
import {paths} from 'utils/constants/paths'
import {BoolLabel} from 'cmp/App/BoolLabel'

const cn = makeBem('SprayingTable')
export const SprayingContext = React.createContext()

export const SprayingTable = props => {
  const chemicalSectorDetailsSummaryHeader = _.range(1, 5).map((chemicalId, chemicalIndex) => (
    <th
      key={`chemical${chemicalIndex}`}
      colSpan={2 + (props.chemicalSectorVisibility[chemicalIndex] ? 11 : 0)}
    >
      {translate(keys.CHEMICAL)} {chemicalId}
    </th>
  ))

  const weedSectorDetailsHeader = props.areWeedSectorsVisible && _.range(1, 10).map((sectorId, sectorIndex) => (
      <th key={`sector${sectorIndex}`}>{translate(keys.WEED_INFESTATION)} {translate(keys.SECTOR)} {sectorId} [%]</th>
    ))

  const chemicalSectorDetailsHeader = _.range(1, 5).map((chemicalId, chemicalIndex) => {
    const chemicalHeaderCells = [
      <th key={`chemical${chemicalIndex}.quantity`}>{translate(keys.QUANTITY)} [l]</th>,
      <th key={`chemical${chemicalIndex}.dosage`}>{translate(keys.DOSE)} [l/ha]</th>,
    ]

    if(props.chemicalSectorVisibility[chemicalIndex]) {
      chemicalHeaderCells.push(..._.range(1, 10).map((sectorId, sectorIndex) => (
        <th key={`chemical${chemicalIndex}.sector${sectorIndex}`}>{translate(keys.SECTOR)} {sectorId} {translate(keys.DOSE)} [l/ha]</th>
      )))

      chemicalHeaderCells.push(...[
        <th key={`chemical${chemicalIndex}.leftNozzleMajority`}>{translate(keys.LEFT_NOZZLE_MAJORITY)}</th>,
        <th key={`chemical${chemicalIndex}.rightNozzleMajority`}>{translate(keys.RIGHT_NOZZLE_MAJORITY)}</th>,
      ])
    }

    return chemicalHeaderCells
  })

  const dataTableBody = spraying => spraying.sections.map((section, sectionIndex) => {
    const weedSectorDetails = props.areWeedSectorsVisible && section.sectors.map((sector, sectorIndex) => (
        <td key={`section${sectionIndex}.sector${sectorIndex}`}>{sector.weedInfestation}</td>
      ))

    const chemicalSectorDetails = section.chemicals.map((chemical, chemicalIndex) => {
      const chemicalCells = [
        <td key={`section${sectionIndex}.chemical${chemicalIndex}.quantity`}>{chemical.quantity}</td>,
        <td key={`section${sectionIndex}.chemical${chemicalIndex}.dosage`}>{chemical.dosage}</td>,
      ]

      if(props.chemicalSectorVisibility[chemicalIndex]) {
        chemicalCells.push(..._.range(1, 10).map((sectorId, sectorIndex) => (
          <td key={`section${sectionIndex}.chemical${chemicalIndex}.sector${sectorIndex}`}>{chemical.sectors[sectorIndex].dosage}</td>
        )))

        chemicalCells.push(...[
          <td key={`${sectionIndex}.${chemicalIndex}.leftNozzleMajority`}>
            <BoolLabel value={chemical.leftNozzleMajority}/>
          </td>,
          <td key={`${sectionIndex}.${chemicalIndex}.rightNozzleMajority`}>
            <BoolLabel value={chemical.rightNozzleMajority}/>
          </td>,
        ])
      }

      return chemicalCells
    })

    return (
      <tr key={`section${sectionIndex}`}>
        <td>{section.distance}</td>
        <td>
          <Link to={`${paths.MAP_PAGE}/${spraying.id}/${section.id}`}>{section.position.lat + ', ' + section.position.lon}</Link>
        </td>
        <td>
          <BoolLabel value={section.sprayed}/>
        </td>
        <td>{section.water}</td>
        <td>{section.waterDosage}</td>
        <td>{section.weedInfestation}</td>
        {weedSectorDetails}
        {chemicalSectorDetails}
      </tr>
    )
  })

  return (
    <table className={cn}>
      <thead>
      <tr>
        <th colSpan={6 + (props.areWeedSectorsVisible ? 9 : 0)}>{translate(keys.SECTION_DATA)}</th>
        {chemicalSectorDetailsSummaryHeader}
      </tr>
      <tr>
        <th>{translate(keys.DISTANCE)} [m]</th>
        <th>{translate(keys.POSITION)}</th>
        <th>{translate(keys.SPRAYED)}</th>
        <th>{translate(keys.WATER)} [l]</th>
        <th>{translate(keys.WATER_DOSE)} [l/ha]</th>
        <th>{translate(keys.WEED_INFESTATION)} [%]</th>
        {weedSectorDetailsHeader}
        {chemicalSectorDetailsHeader}
      </tr>
      </thead>
      <tbody>
        <SprayingContext.Consumer>{dataTableBody}</SprayingContext.Consumer>
      </tbody>
    </table>
  )
}

SprayingTable.propTypes = {
  areWeedSectorsVisible: PropTypes.bool.isRequired,
  chemicalSectorVisibility: PropTypes.arrayOf(PropTypes.bool).isRequired,
}
