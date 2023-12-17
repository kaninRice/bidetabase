import styles from './Map.module.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { markerIcon } from './markerIcon.ts'
import { useEffect, useState } from 'react';

import type {
    setStateStringType,
    setStateNumberType,
    setStateCoordsType,
} from '../../types/common.ts';
import * as constants from '../../config/config.ts';
import { markerObject } from '../../types/common.ts';
import SearchBar from '../SearchBar/SearchBar.tsx';

function Map({
    appState,
    setAppState,
    setMarkerOpenedID,
    setMarkerFormCoord,
}: {
    appState: string,
    setAppState: setStateStringType,
    setMarkerOpenedID: setStateNumberType,
    setMarkerFormCoord: setStateCoordsType
}) {
    const url = constants.SERVER_URL + constants.GET_ALL_COORDINATES_URI;
    const [markers, setMarkers] = useState<markerObject[]>([]);

    const AddLocationEvent = () => {
        useMapEvents({
            click(e) {
                console.log(e.latlng.lat);
                console.log(e.latlng.lng);
                setAppState('formOpened');
                setMarkerFormCoord({latitude: e.latlng.lat, longitude: e.latlng.lng})
            },
        });

        return false;
    };

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
                        position={[marker.coordinates.latitude, marker.coordinates.longitude]}
                        icon={markerIcon}
                        eventHandlers={{
                            click: () => {
                                setAppState('markerOpened');
                                setMarkerOpenedID(marker.id);
                            },
                        }}
                    />
                ))}

            {appState == 'addLocationState' ? <AddLocationEvent /> : null}
        </MapContainer>
    );
}

export default Map;
