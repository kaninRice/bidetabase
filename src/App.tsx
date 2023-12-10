import './App.css';
import { useState } from 'react';

import AddButton from './components/AddButton/AddButton.tsx';
import Map from './components/Map/Map.tsx';
import MarkerInformation from './components/MarkerInformation/MarkerInformation.tsx';

function App() {
  const [appState, setAppState] = useState('default');
  const [markerOpenedID, setMarkerOpenedID] = useState<number>(-1);

  return (
      <>
        <AddButton />

        {appState == 'markerOpened' ? (
            <MarkerInformation
                setAppState={setAppState}
                markerOpenedID={markerOpenedID}
            />
        ) : null}
        <Map
            setAppState={setAppState}
            setMarkerOpenedID={setMarkerOpenedID}
        />
      </>
  );
}

export default App
