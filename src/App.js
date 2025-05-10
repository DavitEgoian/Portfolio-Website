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
            <h1 >Davit Egoian</h1>
            <p><ShinyText text="Coming soon" disabled={false} speed={3} className='custom-class' /></p>
          </Magnet>
        </header>
        <SplashCursor />
    </div>
  );
}

export default App;
