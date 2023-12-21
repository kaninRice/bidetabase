import styles from './MarkerInformationContainer.module.css';
import CloseIcon from '../../assets/CloseIcon.svg?react'

import { useEffect, useState } from 'react';

import { SERVER_URL, GET_MARKER_INFO_URI } from '../../config/config.ts';
import type { setStateStringType, markerObject } from '../../types/common.ts';

function MarkerInformationContainer({
    setAppState,
    markerOpenedID,
}: {
    setAppState: setStateStringType;
    markerOpenedID: number;
}) {
    const url = SERVER_URL + GET_MARKER_INFO_URI + markerOpenedID;
    const [markerInfo, setMarkerInformation] = useState<markerObject | null>();

    const fetchMarkerData = () => {
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data[0].image_link != null) {
                    data[0].image_link =
                        SERVER_URL + '/images/' + data[0].image_link;
                }

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
                {markerInfo?.image_link == null
                ? (<span className={styles.noInformationIndication}>No image provided</span>) 
                : (<img src={markerInfo?.image_link} />)}
            </div>

            <div className={styles.markerInformationField}>
                {markerInfo?.location}
            </div>

            <div className={styles.markerInformationField}>
                {markerInfo?.addi_desc == null
                ? (<span className={styles.noInformationIndication}>No additional information provided</span>)
                : (markerInfo?.addi_desc)}
            </div>
        </div>
    );
}

export default MarkerInformationContainer;
