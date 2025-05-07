// src/App.js
import logo from './logo.svg';
import './App.css';
import SplashCursor from './SplashCursor';
import Magnet from './Magnet';
import ShinyText from './ShinyText';

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <Magnet padding={50} disabled={false} magnetStrength={50}>
            <h1 >
               <ShinyText text="Davit Egoian" disabled={false} speed={3} className='custom-class' />
            </h1>
            <p>Coming soon</p>
          </Magnet>
        </header>
        <SplashCursor />
    </div>
  );
}

export default App;
