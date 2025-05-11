import './App.css';
import TextPressure from './TextPressure';
import { useRef } from 'react';
import VariableProximity from './VariableProximity';



function App() {
    const containerRef = useRef(null);
  return (
      <div className="App">
          <div style={{position: 'static', height: 'auto', width:'100%', marginBottom: '1rem', display: 'block'}}>
              <TextPressure
                  text="Hello!"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={36}
              />
              <br/>
              <div
            ref={containerRef}
            style={{position: 'relative'}}
            >
              <VariableProximity
                label={'I build intelligent systems that balance\n ' + 'accuracy,' +
                    ' scalability and interpretability.'}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
              />
              <a href='http://google.com' className='resetButtonHref'>
                  <div className="resumeButton">
                    <p>My Resume</p>
                  </div>
              </a>

            </div>

          </div>


      </div>
  );
}

export default App;
