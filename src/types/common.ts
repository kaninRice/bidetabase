export type setStateStringType = React.Dispatch<React.SetStateAction<string>>;
export type setStateNumberType = React.Dispatch<React.SetStateAction<number>>;

export type markerObject = {
    id: number,
    image_link: string,
    location: string,
    addi_desc: string,
    coordinates: {
        x: number,
        y: number
    }
}