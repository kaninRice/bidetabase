import styles from './AddButton.module.css';
import AddIcon from './AddIcon.svg?react';

function AddButton() {
    return (
        <div className={styles.addButtonContainer}>
            <AddIcon className={styles.addIcon}/>
        </div>
    )
}

export default AddButton;