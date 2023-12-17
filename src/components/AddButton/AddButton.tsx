import styles from './AddButton.module.css';
import AddIcon from './AddIcon.svg?react';

import { useEffect, useState } from 'react';
import type { setStateStringType } from '../../types/common.ts';

function toggleState({
    appState, setAppState 
} : { 
    appState: string,
    setAppState: setStateStringType 
}) {
    appState == 'addLocationState' ? setAppState('default') : setAppState('addLocationState')
}

function AddButton({
    appState, setAppState 
} : { 
    appState: string,
    setAppState: setStateStringType 
}) {
    const [styleState, setStyleState] = useState(`${styles.addButtonContainer}`);

    useEffect(() => {
        console.log(appState)
        appState == 'addLocationState'
            ? setStyleState(`${styles.addButtonContainer} ${styles.active}`)
            : setStyleState(`${styles.addButtonContainer}`);
    }, [appState]);
    
    return (
        <div
            className={styleState}
            onClick={() => toggleState({ appState, setAppState })}
        >
            <AddIcon className={styles.addIcon} />
        </div>
    );
}

export default AddButton;