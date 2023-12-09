import styles from './MarkerInformation.module.css';
import CloseIcon from './CloseIcon.svg?react'

import type { setAppStateObject } from '../../types/common.ts';

function MarkerInformation({ setAppState }: setAppStateObject) {
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
                Image
            </div>
            <div className={styles.markerInformationField}>
                Roxas Boulevard, Ermita, Manila, Metro Manila, Philippines
            </div>
            <div className={styles.markerInformationField}>
                Additional Information
            </div>
        </div>
    );
}

export default MarkerInformation;
