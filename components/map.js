import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOn from '@material-ui/icons/LocationOn';
import styles from './map.module.css'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import addresses from '../data/addresses'

function handleMarkerHover() {
  console.log("aki")
}

const Marker = ({address}) => {
  return(
    <div
      onMouseEnter={handleMarkerHover}
      className={styles.marker}
    >
      <Tooltip title={address.address}>
        <Button className={styles.button}>
          <LocationOn style={{ fontSize: 40 }} className={styles.markerIcon} ></LocationOn>
        </Button>
      </Tooltip>
    </div>
  )
}

export default function Map() {
  const center = {
    lat: -31.543852,
    lng: -68.524590
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '200px', width: '100%', borderRadius: '5px', overflow: 'hidden' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBadrEzn3x1m-UDvo8uTM6zrgMAa0lWjkI' }}
        defaultCenter={center}
        defaultZoom={13}
      >
        {addresses.map(marker => 
          <Marker
            key={marker.key}
            lat={marker.lat}
            lng={marker.lng}
            address={marker}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}