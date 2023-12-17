import styles from './MarkerInformation.module.css';
import CloseIcon from '../../assets/CloseIcon.svg?react'

import { useEffect, useState } from 'react';

import { SERVER_URL, GET_MARKER_INFO_URI } from '../../config/config.ts';
import type { setStateStringType, markerObject } from '../../types/common.ts';

function MarkerInformation({
    setAppState,
    markerOpenedID,
}: {
    setAppState: setStateStringType;
    markerOpenedID: number | null;
}) {
    const url = SERVER_URL + GET_MARKER_INFO_URI + markerOpenedID;
    const [markerInfo, setMarkerInformation] = useState<markerObject | null>();

    const fetchMarkerData = () => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMarkerInformation(data[0]);
            });
    };

    useEffect(() => {
        fetchMarkerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markerOpenedID]);

    return (
        <div className={styles.markerInformationContainer}>
            <div className={styles.header}>
                <CloseIcon
                    className={styles.closeIcon}
                    onClick={() => setAppState('default')}
                />
            </div>
            <div
                className={`${styles.markerInformationField} ${styles.markerInformationImage}`}
            >
                {markerInfo?.image_link} tmp
            </div>
            <div className={styles.markerInformationField}>
                {markerInfo?.location}
            </div>
            <div className={styles.markerInformationField}>
                {markerInfo?.addi_desc}
            </div>
        </div>
    );
}

export default MarkerInformation;
