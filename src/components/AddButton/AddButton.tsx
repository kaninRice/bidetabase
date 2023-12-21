import styles from './AddButton.module.css';
import AddIcon from './AddIcon.svg?react';

import { useEffect, useState } from 'react';
import type { setStateStringType } from '../../types/common.ts';

function AddButton({
    appState, setAppState 
} : { 
    appState: string, setAppState: setStateStringType 
}) {
    const [styleState, setStyleState] = useState(`${styles.addButtonContainer}`);

    const toggleAppState = (appState: string, setAppState: setStateStringType) => {
        appState == 'setLocationState'
            ? setAppState('default')
            : setAppState('setLocationState');
    }

    // set button styling based on current app state
    useEffect(() => {
        appState == 'setLocationState'
            ? setStyleState(`${styles.addButtonContainer} ${styles.active}`)
            : setStyleState(`${styles.addButtonContainer}`);
    }, [appState]);
    
    return (
        <div
            className={styleState}
            onClick={() => toggleAppState(appState, setAppState)}
        >
            <AddIcon className={styles.addIcon} />
        </div>
    );
}

export default AddButton;