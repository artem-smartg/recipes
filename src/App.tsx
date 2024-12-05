import { useEffect, useState } from 'react';
import './App.css';
import { Approuter } from './components/Approuter';
import NavigationBar from './components/NavigationBar'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!hasNavigated) {
      navigate('/all-recipe'); 
      setHasNavigated(true); 
    }
  }, [navigate, hasNavigated]);

  return (
    <div className="App">
      <NavigationBar />
      <Approuter />
    </div>
  );
}

export default App;
