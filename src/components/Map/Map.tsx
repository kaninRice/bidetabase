import styles from './Map.module.css';

import type { passAppStateObject } from '../../types/common.ts'

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { markerIcon } from './markerIcon.ts'

function Map({ passAppState } : passAppStateObject) {
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
                eventHandlers={{
                    click: () => passAppState('default'),
                }}
            />
            <Marker
                position={[14.5123, 121.0165]}
                icon={markerIcon}
                eventHandlers={{
                    click: () => passAppState('markerOpened'),
                }}
            />
        </MapContainer>
    );
}

export default Map;
