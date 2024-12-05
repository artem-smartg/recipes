import { useEffect } from 'react';
import './App.css';
import { Approuter } from './components/Approuter';
import NavigationBar from './components/NavigationBar'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  useEffect(() => {navigate('/all-recipe')}, [])

  return (
    <div className="App">
      <NavigationBar />
      <Approuter />
    </div>
  );
}

export default App;
