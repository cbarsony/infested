import React, {Component} from 'react'
import * as ol from 'openlayers'
import PropTypes from 'prop-types'

import {translate, keys} from 'utils/translate'
import {Spraying} from 'api/classes.js'

import {Popup} from './Popup'

const popupContainer = document.getElementById('sectionDataPopup')

export class Map extends Component {
  state = {sectionId: this.props.sectionId || -1}

  componentDidMount() {
    const sprayedVectorSource = new ol.source.Vector({})
    const notSprayedVectorSource = new ol.source.Vector({})

    this.props.spraying.sections.forEach((section, index) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([section.position.lon, section.position.lat])),
        name: 'Section ' + (index + 1),
        sectionId: section.id,
      })

      if(section.sprayed === 1) {
        sprayedVectorSource.addFeature(iconFeature)
      }
      else {
        notSprayedVectorSource.addFeature(iconFeature)
      }
    })

    const sprayedIconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.8,
        src: '/img/icon_red_small.png',
      })),
    })

    const notSprayedIconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.8,
        src: '/img/icon_green_small.png',
      })),
    })

    const sprayedVectorLayer = new ol.layer.Vector({
      source: sprayedVectorSource,
      style: sprayedIconStyle,
    })

    const notSprayedVectorLayer = new ol.layer.Vector({
      source: notSprayedVectorSource,
      style: notSprayedIconStyle,
    })

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        sprayedVectorLayer,
        notSprayedVectorLayer,
      ],
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    })

    this.popupOverlay = new ol.Overlay(
      {
        element: popupContainer,
        stopEvent: false,
      })

    this.map.addOverlay(this.popupOverlay)

    this.map.on('pointermove', e => {
      const hit = this.map.forEachFeatureAtPixel(e.pixel, () => true)

      this.map.getTargetElement().style.cursor = hit ? 'pointer' : ''
    })

    this.map.on('click', e => {
      const feature = this.map.forEachFeatureAtPixel(e.pixel, feature => feature)

      if(feature) {
        const geometry = feature.getGeometry()
        const position = geometry.getCoordinates()
        this.popupOverlay.setPosition(position)
        this.setState({sectionId: feature.get('sectionId')})
      }
    })

    const sections = this.props.spraying.sections.map(data => ({
      data,
      checked: false,
    }))

    sections[0].checked = true

    const boundSprayed = this.map.getLayers().getArray()[1].getSource().getExtent()
    const boundNotSprayed = this.map.getLayers().getArray()[2].getSource().getExtent()
    this.map.getView().fit(ol.extent.extend(boundSprayed, boundNotSprayed))
    
    if(this.state.sectionId >= 0) {
      const section = this.props.spraying.sections.find(section => section.id === this.state.sectionId)

      this.popupOverlay.setPosition(ol.proj.fromLonLat([section.position.lon, section.position.lat]))

      this.map.getView().setCenter(ol.proj.fromLonLat([section.position.lon, section.position.lat]))
      this.map.getView().setZoom(18)
      this.mapNode.scrollIntoView()
    }
  }

  onClosePopup = () => this.setState({sectionId: -1})

  render() {
    const props = this.props
    const state = this.state

    return (
      <div
        className="Map"
        style={{position: 'relative'}}
      >
        <div
          id="map"
          className="map"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          ref={node => this.mapNode = node}
        >
          <button
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 10,
              right: 10,
            }}
            onClick={() => {
              const boundSprayed = this.map.getLayers().getArray()[1].getSource().getExtent()
              const boundNotSprayed = this.map.getLayers().getArray()[2].getSource().getExtent()
              this.map.getView().fit(ol.extent.extend(boundSprayed, boundNotSprayed))
            }}
          >{translate(keys.FIT_TO_MAP)}</button>
        </div>
        {state.sectionId > -1 && (
          <Popup
            section={props.spraying.sections.find(s => s.id === state.sectionId)}
            closePopup={this.onClosePopup}
          />
        )}
      </div>
    )
  }
}

Map.propTypes = {
  spraying: PropTypes.instanceOf(Spraying).isRequired,
  sectionId: PropTypes.number,
}
