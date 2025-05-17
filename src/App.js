import './App.css';
import TextPressure from './TextPressure';
import { useRef } from 'react';
import VariableProximity from './VariableProximity';
import SpotlightCard from './SpotlightCard';
import dataScienceIcon from './images/data-science-icon.png';
import machineLearningIcon from './images/machine-learning-icon.jpg';
import explainableAiIcon from './images/explainable-AI-icon.png'
import featureEngineeringIcon from './images/feature-engineering-icon.png'



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
                </div>
            </div>
            <h1 style={{marginTop: '8rem', fontSize: '3rem', color: 'white', fontWeight: '900'}}>WHAT I DO</h1>
          <div className='cards-container'>
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <img src={dataScienceIcon} alt="data-science-icon"/>
                  <h3>Data Science</h3>
                  <p>Advanced statistical modeling, A/B testing & interactive data visualization for business
                      insights.</p>
              </SpotlightCard>

              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <img src={machineLearningIcon} alt="machine-learning-icon"/>
              <h3>Machine Learning</h3>
              <p>Algorithm selection, cross-validation & hyperparameter tuning to maximize predictive power.</p>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
               <img src={featureEngineeringIcon} alt="feature-engineering-icon"/>
              <h3>Feature Engineering</h3>
              <p>Automated feature creation, selection & dimensionality reduction to supercharge your models.</p>
            </SpotlightCard>

            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
               <img src={explainableAiIcon} alt="explainable-Ai-icon"/>
              <h3>Explainable AI</h3>
              <p>Model interpretability with SHAP/LIME, bias detection & transparent decision-making pipelines.</p>
            </SpotlightCard>
          </div>


      </div>
  );
}

export default App;
