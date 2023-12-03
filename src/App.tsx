import './App.css';

import AddButton from './components/AddButton/AddButton.tsx';
import Map from './components/Map/Map.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';

function App() {
  return (
    <>
      <SearchBar />
      <AddButton />
      <Map />
    </>
  );
}

export default App
