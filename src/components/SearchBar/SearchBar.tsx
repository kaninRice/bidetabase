import './SearchBar.css';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

/**
 * Searchbar used by the Map component
 * @component
 */

function SearchBar() {
    const map = useMap();
    const provider = new OpenStreetMapProvider();

    // @ts-expect-error from API
    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: false,
        // @ts-expect-error from API
        popupFormat: ({ query, result }) => result.label, // eslint-disable-line @typescript-eslint/no-unused-vars
        // @ts-expect-error from API
        resultFormat: ({ result }) => result.label,
    });

    // @ts-expect-error from API
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

export default SearchBar;
