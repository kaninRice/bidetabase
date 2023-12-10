import styles from './Map.module.css';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { markerIcon } from './markerIcon.ts'
import { useEffect, useState } from 'react';

import type {
    setStateStringType,
    setStateNumberType,
} from '../../types/common.ts';
import * as constants from '../../config/config.ts';
import { markerObject } from '../../types/common.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';

function Map({
    setAppState,
    setMarkerOpenedID,
}: {
    setAppState: setStateStringType,
    setMarkerOpenedID: setStateNumberType
}) {
    const url = constants.SERVER_URL + constants.GET_ALL_COORDINATES_URI;
    const [markers, setMarkers] = useState<markerObject[]>([]);

    const fetchMarkerIdData = () => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMarkers(data);
            });
    };

    useEffect(() => {
        fetchMarkerIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    click: () => setAppState('default'),
                }}
            />

            <SearchBar />

            {markers.length > 0 &&
                markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[marker.coordinates.x, marker.coordinates.y]}
                        icon={markerIcon}
                        eventHandlers={{
                            click: () => {
                                setAppState('markerOpened');
                                setMarkerOpenedID(marker.id);
                            },
                        }}
                    />
                ))}
        </MapContainer>
    );
}

export default Map;
