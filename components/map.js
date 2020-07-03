import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>Aca</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBadrEzn3x1m-UDvo8uTM6zrgMAa0lWjkI')
})(MapContainer)