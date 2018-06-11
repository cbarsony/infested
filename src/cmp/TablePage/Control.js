import React from 'react'
import PropTypes from 'prop-types'

import {translate, keys} from 'utils/translate/index'
import {Field} from 'cmp/App/Form/Field/index'

export const Control = props => {
  const setWeedSectorsVisibility = (checked, index) => {
    const result = props.chemicalSectorsVisibility

    result[index] = checked

    props.setChemicalSectorsVisibility(result)
  }

  return (
    <div className="Control">
      <Field
        name="weed"
        label={translate(keys.WEED_INFESTATION)}
        type="checkbox"
        value={props.areWeedSectorsVisible}
        onChange={areWeedSectorsVisible => props.setWeedSectorsVisibility(areWeedSectorsVisible)}
      />
      <Field
        name="chemical1"
        label={translate(keys.CHEMICAL) + '1'}
        type="checkbox"
        value={props.chemicalSectorsVisibility[0]}
        onChange={isChemicalSectorVisible => setWeedSectorsVisibility(isChemicalSectorVisible, 0)}
      />
      <Field
        name="chemical2"
        label={translate(keys.CHEMICAL) + '2'}
        type="checkbox"
        value={props.chemicalSectorsVisibility[1]}
        onChange={isChemicalSectorVisible => setWeedSectorsVisibility(isChemicalSectorVisible, 1)}
      />
      <Field
        name="chemical3"
        label={translate(keys.CHEMICAL) + '3'}
        type="checkbox"
        value={props.chemicalSectorsVisibility[2]}
        onChange={isChemicalSectorVisible => setWeedSectorsVisibility(isChemicalSectorVisible, 2)}
      />
      <Field
        name="chemical4"
        label={translate(keys.CHEMICAL) + '4'}
        type="checkbox"
        value={props.chemicalSectorsVisibility[3]}
        onChange={isChemicalSectorVisible => setWeedSectorsVisibility(isChemicalSectorVisible, 3)}
      />
    </div>
  )
}

Control.propTypes = {
  areWeedSectorsVisible: PropTypes.bool.isRequired,
  chemicalSectorsVisibility: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setWeedSectorsVisibility: PropTypes.func.isRequired,
  setChemicalSectorsVisibility: PropTypes.func.isRequired,
}
