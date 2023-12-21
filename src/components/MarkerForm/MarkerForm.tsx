import styles from './MarkerForm.module.css';
import CloseIcon from '../../assets/CloseIcon.svg?react'

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { SERVER_URL, POST_MARKER_URI } from '../../config/config.ts';
import type { setStateStringType, InputChangeEventHandler, coordinates } from '../../types/common.ts';

type formInputs = {
    x: number;
    y: number;
    image: string;
    location: string;
    addi_desc: string | null;
};

function MarkerForm({
    setAppState,
    coordinates,
}: {
    setAppState: setStateStringType;
    coordinates: coordinates;
}) {
    const url = SERVER_URL + POST_MARKER_URI;
    const [imgPreview, setImgPreview] = useState<string | null>();
    const [imgFile, setImgFile] = useState<File>();
        
    const { register, handleSubmit } = useForm<formInputs>();
    const onImageChange = (e: InputChangeEventHandler) => {
        if (e.target.files != null) {
            setImgPreview(URL.createObjectURL(e.target.files[0]))
            setImgFile(e.target.files[0]);
        }
    };

    const onSubmit = async (data: formInputs) => {
        const formData = new FormData();

        if (data.addi_desc == '') data.addi_desc = null;
        formData.append('form', JSON.stringify(data));

        if (imgFile != null) {
            data = { ...data, image: imgFile.name };
            formData.append('file', imgFile);
        }

        fetch(url, {
            method: 'POST',
            body: formData,
        });

        setAppState('default');
    }

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
                    Upload Image
                    <input
                        {...register('image')}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={onImageChange}
                    />
                    {imgPreview == null ? null : <img src={imgPreview} />}
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
