import styles from './MarkerForm.module.css';
import CloseIcon from '../../assets/CloseIcon.svg?react'

import type { setStateStringType, coordinates, markerObject } from '../../types/common.ts';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as constants from '../../config/config.ts';

type formInputs = {
    xcoord: number,
    ycoord: number,
    location: string,
    addi_desc: string
}

function MarkerForm({
    setAppState,
    coordinates,
}: {
    setAppState: setStateStringType;
    coordinates: coordinates;
}) {
    const url =
        constants.SERVER_URL +
        constants.POST_MARKER_INFORMATION_URI;
        
    const { register, handleSubmit } = useForm<formInputs>();
    const onSubmit: SubmitHandler<formInputs> = data => console.log(data)

    return (
        <div className={styles.markerInformationContainer}>
            <div className={styles.header}>
                <CloseIcon
                    className={styles.closeIcon}
                    onClick={() => setAppState('default')}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="hidden"
                    value={coordinates.latitude}
                    {...register('xcoord')}
                />
                <input type="hidden"
                    value={coordinates.longitude}
                    {...register('ycoord')}
                />
                <div
                    className={`${styles.markerInformationField} ${styles.markerInformationImage}`}
                >
                    Add Image
                </div>
                <textarea
                    className={styles.markerInformationField}
                    placeholder="Describe location (required)"
                    {...register('location', {required: true})}
                />
                <textarea
                    className={styles.markerInformationField}
                    placeholder="Additional Description"
                    {...register('addi_desc')}
                />
                <div className={styles.buttonsContainer}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => setAppState('default')}
                    >
                        Cancel
                    </button>
                    <button className={styles.submitButton} type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MarkerForm;
