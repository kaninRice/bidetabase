export type passAppStateObject = {
    passAppState: React.Dispatch<React.SetStateAction<string>>;
};

export type markerObject = {
    id: number,
    coordinates: {
        x: number,
        y: number
    }
}