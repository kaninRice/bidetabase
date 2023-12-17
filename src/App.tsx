import './App.css';
import { useState } from 'react';

import AddButton from './components/AddButton/AddButton.tsx';
import Map from './components/Map/Map.tsx';
import MarkerInformation from './components/MarkerInformation/MarkerInformation.tsx';
import MarkerForm from './components/MarkerForm/MarkerForm.tsx'

function App() {
  const [appState, setAppState] = useState('default');
  const [markerOpenedID, setMarkerOpenedID] = useState<number>(-1);
  const [markerFormCoord, setMarkerFormCoord] = useState({latitude: 0, longitude: 0})

  return (
      <>
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

          <Map
              appState={appState}
              setAppState={setAppState}
              setMarkerOpenedID={setMarkerOpenedID}
              setMarkerFormCoord={setMarkerFormCoord}
          />
      </>
  );
}

export default App
