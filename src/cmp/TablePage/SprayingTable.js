import React, {Component} from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import {translate, keys} from 'utils/translate/index'
import {paths} from 'utils/constants/paths'
import {BoolLabel} from 'cmp/App/BoolLabel'
// import {Card} from 'cmp/App/Container/Card/index'
import {Spraying} from 'api/classes'

const cn = makeBem('SprayingTable')
const rowPerPage = 20

export class SprayingTable extends Component {
  state = {page: 1}

  onPaginationClick = page => this.setState({page})

  render() {
    const props = this.props
    const state = this.state

    const chemicalSectorDetailsSummaryHeader = _.range(1, 5).map((chemicalId, chemicalIndex) => {
      const cellClassName = chemicalIndex % 2 === 0 ? 'even' : 'odd'

      return (
        <th
          className={cellClassName}
          key={`chemical${chemicalIndex}`}
          colSpan={2 + (props.chemicalSectorsVisibility[chemicalIndex] ? 11 : 0)}
        >
          {translate(keys.CHEMICAL)} {chemicalId}
        </th>
      )
    })

    const weedSectorDetailsHeader = props.areWeedSectorsVisible && _.range(1, 10).map((sectorId, sectorIndex) => (
        <th key={`sector${sectorIndex}`}>{translate(keys.WEED_INFESTATION)} {translate(keys.SECTOR)} {sectorId} [%]</th>
      ))

    const chemicalSectorDetailsHeader = _.range(1, 5).map((chemicalId, chemicalIndex) => {
      const cellClassName = chemicalIndex % 2 === 0 ? 'even' : 'odd'

      const chemicalHeaderCells = [
        <th
          className={cellClassName}
          key={`chemical${chemicalIndex}.quantity`}>{translate(keys.QUANTITY)} [l]</th>,
        <th
          className={cellClassName}
          key={`chemical${chemicalIndex}.dosage`}>{translate(keys.DOSE)} [l/ha]</th>,
      ]

      if(props.chemicalSectorsVisibility[chemicalIndex]) {
        chemicalHeaderCells.push(..._.range(1, 10).map((sectorId, sectorIndex) => (
          <th
            className={cellClassName}
            key={`chemical${chemicalIndex}.sector${sectorIndex}`}>{translate(keys.SECTOR)} {sectorId} {translate(keys.DOSE)} [l/ha]</th>
        )))

        chemicalHeaderCells.push(...[
          <th
            className={cellClassName}
            key={`chemical${chemicalIndex}.leftNozzleMajority`}>{translate(keys.LEFT_NOZZLE_MAJORITY)}</th>,
          <th
            className={cellClassName}
            key={`chemical${chemicalIndex}.rightNozzleMajority`}>{translate(keys.RIGHT_NOZZLE_MAJORITY)}</th>,
        ])
      }

      return chemicalHeaderCells
    })

    const dataTableBody = _.slice(props.spraying.sections, (state.page - 1) * rowPerPage, (state.page - 1) * rowPerPage + rowPerPage).map((section, sectionIndex) => {
      const weedSectorDetails = props.areWeedSectorsVisible && section.sectors.map((sector, sectorIndex) => (
          <td key={`section${sectionIndex}.sector${sectorIndex}`}>{sector.weedInfestation}</td>
        ))

      const chemicalSectorDetails = section.chemicals.map((chemical, chemicalIndex) => {
        const cellClassName = chemicalIndex % 2 === 0 ? 'even' : 'odd'

        const chemicalCells = [
          <td
            className={cellClassName}
            key={`section${sectionIndex}.chemical${chemicalIndex}.quantity`}
          >{chemical.quantity}</td>,
          <td
            className={cellClassName}
            key={`section${sectionIndex}.chemical${chemicalIndex}.dosage`}
          >{chemical.dosage}</td>,
        ]

        if(props.chemicalSectorsVisibility[chemicalIndex]) {
          chemicalCells.push(..._.range(1, 10).map((sectorId, sectorIndex) => (
            <td
              className={cellClassName}
              key={`section${sectionIndex}.chemical${chemicalIndex}.sector${sectorIndex}`}
            >{chemical.sectors[sectorIndex].dosage}</td>
          )))

          chemicalCells.push(...[
            <td
              className={cellClassName}
              key={`${sectionIndex}.${chemicalIndex}.leftNozzleMajority`}
            >
              <BoolLabel value={chemical.leftNozzleMajority}/>
            </td>,
            <td
              className={cellClassName}
              key={`${sectionIndex}.${chemicalIndex}.rightNozzleMajority`}
            >
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
            <Link to={`${paths.MAP_PAGE}/${props.spraying.id}/${section.id}`}>{section.position.lat + ', ' + section.position.lon}</Link>
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

    const pagination = (
      <div className={cn.el('Pagination')}>{_.range(Math.ceil(props.spraying.sections.length / rowPerPage)).map(i => state.page === i + 1 ? (
        <span>{i + 1}</span>
      ) : (
        <button
          key={i}
          onClick={() => this.onPaginationClick(i + 1)}
        >{i + 1}</button>
      ))}</div>
    )

    return (
      <div className={cn}>
        <div className={cn.el('TableContainer')}>
          <table>
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
              {dataTableBody}
            </tbody>
          </table>
        </div>
        {pagination}
      </div>
    )
  }
}

SprayingTable.propTypes = {
  spraying: PropTypes.instanceOf(Spraying).isRequired,
  areWeedSectorsVisible: PropTypes.bool.isRequired,
  chemicalSectorsVisibility: PropTypes.arrayOf(PropTypes.bool).isRequired,
}
