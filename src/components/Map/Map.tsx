import styles from './Map.module.css';
import markerIcon from './markerIcon.ts';

import SearchBar from '../SearchBar/SearchBar.tsx';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';

import {
    SERVER_URL,
    GET_ALL_MARKER_COORDS_URI,
    DEFAULT_COORDS,
} from '../../config/config.ts';
import type {
    markerObject,
    setStateStringType,
    setStateNumberType,
    setStateCoordsType,
} from '../../types/common.ts';

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
    const url = SERVER_URL + GET_ALL_MARKER_COORDS_URI;
    const [markers, setMarkers] = useState<markerObject[]>([]);

    const AddLocationEvent = () => {
        useMapEvents({
            click(e) {
                console.log(e.latlng.lat);
                console.log(e.latlng.lng);
                setAppState('formOpened');
                setMarkerFormCoord({x: e.latlng.lat, y: e.latlng.lng})
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
            center={[DEFAULT_COORDS.x, DEFAULT_COORDS.y]}
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

            {appState == 'addLocationState' ? <AddLocationEvent /> : null}

            {markers.length > 0 &&
                markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={[
                            marker.coordinates.x,
                            marker.coordinates.y,
                        ]}
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
