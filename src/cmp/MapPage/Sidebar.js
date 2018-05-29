import React from 'react'
import makeBem from 'bem-cx'
import PropTypes from 'prop-types'

import {Spraying} from 'utils/api'

const cn = makeBem('MapPage')

export const Sidebar = props => {
  if(props.isSprayingDescriptionListLoading) return <div>loading...</div>

  const options = props.sprayingDescriptionList.map((description, index) => (
    <option
      key={index}
      value={description.id}
    >
      {description.description}
    </option>
  ))

  options.unshift(<option key={-1} value={-1}>Choose one...</option>)

  const sprayingSelect = (
    <select
      value={options[0]}
      onChange={props.selectSpraying}
    >
      {options}
    </select>
  )

  return (
    <div className={cn.el('Sidebar')}>
      {sprayingSelect}
      {props.spraying && (
        <ul>
          <li>{props.spraying.description.requestType}</li>
          <li>{props.spraying.description.databaseName}</li>
          <li>{props.spraying.description.sectionSprayed}</li>
          <li>{props.spraying.description.timeSprayed.toString()}</li>
          <li>{props.spraying.description.distanceSprayed}</li>
        </ul>
      )}
      {props.spraying && (
        <ul>
          <li>{props.spraying.summary}</li>
        </ul>
      )}
    </div>
  )
}

Sidebar.propTypes = {
  sprayingDescriptionList: PropTypes.array.isRequired,
  isSprayingDescriptionListLoading: PropTypes.bool.isRequired,
  spraying: PropTypes.instanceOf(Spraying),
  selectSpraying: PropTypes.func.isRequired,
}
