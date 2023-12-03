import styles from './Map.module.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { markerIcon } from './markerIcon.ts'

function Map() {
  return (
      <MapContainer
            className={styles.mapContainer}
            center={[14.5123, 121.0165]}
            zoom={12}
            zoomControl={false}
      >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[14.5123, 121.0165]}
                icon={markerIcon}
            >
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
      </MapContainer>
  );
}

export default Map;
