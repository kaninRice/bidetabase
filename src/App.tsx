import './App.css';
import { useState } from 'react';

import AddButton from './components/AddButton/AddButton.tsx';
import Map from './components/Map/Map.tsx';
import MarkerInformation from './components/MarkerInformation/MarkerInformation.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';

function App() {
  const [appState, setAppState] = useState('default');

  return (
    <>
      <SearchBar />
      <AddButton />

      {appState == 'markerOpened' ?
        (<MarkerInformation passAppState={setAppState}/>) : 
        (null)
      }
      
      <Map
        passAppState={setAppState}
      />
    </>
  );
}

export default App
