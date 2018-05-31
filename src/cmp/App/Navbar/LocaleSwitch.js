import React from 'react'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'
import _ from 'lodash'

const cn = makeBem('LocaleSwitch')
const storedLocale = localStorage.getItem('locale')
const locale = storedLocale ? storedLocale : 'en'
const locales = {
  hu: 'Magyar',
  en: 'English',
  de: 'Deutsch',
}
const localesToSwitch = {}

_.each(locales, (value, key) => {
  if(key !== locale) localesToSwitch[key] = value
})

const onLocaleChange = e => {
  localStorage.setItem('locale', e.target.value)
  window.location.reload()
}

const LocaleOption = props => (
  <option
    className={props.className}
    value={props.locale}
  >
    {props.localeName}
  </option>
)

LocaleOption.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  locale: PropTypes.oneOf(_.keys(locales)).isRequired,
  localeName: PropTypes.oneOf(_.values(locales)).isRequired,
}

export const LocaleSwitch = () => (
  <select
    className={cn}
    value={locale}
    onChange={onLocaleChange}
  >
    <LocaleOption
      key={locale}
      className={cn.mod(locale)}
      locale={locale}
      localeName={locales[locale]}
    />
    {_.map(localesToSwitch, (locale, key) => (
      <LocaleOption
        key={key}
        className={cn.mod(key)}
        locale={key}
        localeName={locale}
      />
    ))}
  </select>
)
