import './App.css';
import { useState } from 'react';

import Map from './components/Map/Map.tsx';
import AddButton from './components/AddButton/AddButton.tsx';
import MarkerInformation from './components/MarkerInformation/MarkerInformation.tsx';
import MarkerForm from './components/MarkerForm/MarkerForm.tsx'

import { DEFAULT_COORDS } from './config/config.ts';

function App() {
  const [appState, setAppState] = useState('default');
  const [markerOpenedID, setMarkerOpenedID] = useState<number>(-1);
  const [markerFormCoord, setMarkerFormCoord] = useState(DEFAULT_COORDS)

  return (
    <>
        <Map
            appState={appState}
            setAppState={setAppState}
            setMarkerOpenedID={setMarkerOpenedID}
            setMarkerFormCoord={setMarkerFormCoord}
        />
        
        <AddButton appState={appState} setAppState={setAppState} />

        {appState == 'markerOpened' ? (
            <MarkerInformation
                setAppState={setAppState}
                markerOpenedID={markerOpenedID}
            />
        ) : null}

        {appState == 'formOpened' ? (
            <MarkerForm
                setAppState={setAppState}
                coordinates={markerFormCoord}
            />
        ) : null}
    </>
  );
}

export default App
