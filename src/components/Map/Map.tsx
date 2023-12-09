import styles from './Map.module.css';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { markerIcon } from './markerIcon.ts'
import { useEffect, useState } from 'react';

import type { passAppStateObject } from '../../types/common.ts';
import * as constants from '../../config/config.ts';
import { markerObject } from '../../types/common.ts';

function Map({ passAppState } : passAppStateObject) {
    const [markers, setMarkers] = useState<markerObject[]>([])

    const fetchMarkerData = () => {
        fetch(constants.SERVER_URL + constants.GET_ALL_COORDINATES_URI)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setMarkers(data)
        });
    }

    useEffect(() => {
        fetchMarkerData();
    }, [])

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
            {markers.length > 0 &&
                markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[marker.coordinates.x, marker.coordinates.y]}
                        icon={markerIcon}
                        eventHandlers={{
                            click: () => passAppState('markerOpened'),
                        }}
                    />
                ))}
        </MapContainer>
    );
}

export default Map;
