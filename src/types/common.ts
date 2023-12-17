export type setStateStringType = React.Dispatch<React.SetStateAction<string>>;
export type setStateNumberType = React.Dispatch<React.SetStateAction<number>>;
export type setStateCoordsType = React.Dispatch<React.SetStateAction<coordinates>>;

export type coordinates = {
    x: number;
    y: number;
};

export type markerObject = {
    id: number,
    image_link: string,
    location: string,
    addi_desc: string,
    coordinates: coordinates
}