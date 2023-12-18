import styles from './MarkerForm.module.css';
import CloseIcon from '../../assets/CloseIcon.svg?react'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SERVER_URL, POST_MARKER_URI } from '../../config/config.ts';
import type { setStateStringType, InputChangeEventHandler, coordinates } from '../../types/common.ts';

type formInputs = {
    x: number,
    y: number,
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
    const url = SERVER_URL + POST_MARKER_URI;
    const [image, setImage] = useState('');
        
    const { register, handleSubmit } = useForm<formInputs>();
    const onImageChange = (e: InputChangeEventHandler) => {
        if (e.target.files != null) setImage(URL.createObjectURL(e.target.files[0]))
    };

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
                <input type="hidden" value={coordinates.x} {...register('x')} />
                <input type="hidden" value={coordinates.y} {...register('y')} />
                <label
                    className={`${styles.markerInformationField} ${styles.markerInformationImage}`}
                >
                    <input type="file" onChange={onImageChange} />
                    Upload Image
                    {image == null ? null : <img src={image} />}
                </label>
                <textarea
                    className={styles.markerInformationField}
                    placeholder="Describe location (required)"
                    {...register('location', { required: true })}
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
