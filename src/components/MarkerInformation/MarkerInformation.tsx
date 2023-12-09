import styles from './MarkerInformation.module.css';
import CloseIcon from './CloseIcon.svg?react'

import { useEffect, useState } from 'react';

import type { setStateStringType, markerObject } from '../../types/common.ts';
import * as constants from '../../config/config.ts';

function MarkerInformation({
    setAppState,
    markerOpenedID,
}: {
    setAppState: setStateStringType;
    markerOpenedID: number | null;
}) {
    const url =
        constants.SERVER_URL +
        constants.GET_MARKER_INFORMATION_URI +
        markerOpenedID;
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
                {markerInfo?.image_link}
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
