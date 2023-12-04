import L from 'leaflet';
import icon from './Marker.svg'

const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [80, 120],
    iconAnchor: [40,120],
})

export { markerIcon }