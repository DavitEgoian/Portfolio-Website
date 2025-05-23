import "./App.css";
import TextPressure from "./TextPressure";
import React, { useRef } from 'react';
import VariableProximity from "./VariableProximity";
import SpotlightCard from "./SpotlightCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

import dataScienceIcon from "./images/cards_container_icons/data-science-icon.png";
import machineLearningIcon from "./images/cards_container_icons/machine-learning-icon.jpg";
import explainableAiIcon from "./images/cards_container_icons/explainable-AI-icon.png";
import featureEngineeringIcon from "./images/cards_container_icons/feature-engineering-icon.png";
import pythonLogo from './images/tech-stack-logos/python-logo.png';
import anacondaLogo from './images/tech-stack-logos/anaconda-logo.png';
import apacheSparkLogo from './images/tech-stack-logos/apache-spark-logo.png';
import djangoLogo from './images/tech-stack-logos/django-logo.png';
import flaskLogo from './images/tech-stack-logos/flask-logo.png';
import mongoDBLogo from './images/tech-stack-logos/mongoDB-logo.png';
import mySQLLogo from './images/tech-stack-logos/mySQL-logo.png';
import circleCILogo from './images/tech-stack-logos/circleCI-logo.png';
import dockerLogo from './images/tech-stack-logos/docker-logo.png';
import gitLogo from './images/tech-stack-logos/git-logo.png'
import githubActionLogo from './images/tech-stack-logos/github-actions-logo.png'
import gitLabLogo from './images/tech-stack-logos/gitlab-logo.png'
import grafanaLogo from './images/tech-stack-logos/grafana-logo.png'
import kerasLogo from './images/tech-stack-logos/keras-logo.png'
import kubernetesLogo from './images/tech-stack-logos/kubernetes-logo.png'
import matplotlibLogo from './images/tech-stack-logos/matplotlib-logo.png'
import new4jLogo from './images/tech-stack-logos/new4j-logo.png'
import numpyLogo from './images/tech-stack-logos/numPy-logo.png'
import pandasLogo from './images/tech-stack-logos/pandas-logo.png'
import plotlyLogo from './images/tech-stack-logos/plotly-logo.png'
import postmanLogo from './images/tech-stack-logos/postman-logo.png'
import powerBILogo from './images/tech-stack-logos/power_BI_logo.png'
import prometheusLogo from './images/tech-stack-logos/prometheus-logo.png'
import pytorchLogo from './images/tech-stack-logos/pyTorch-logo.png'
import scikitLearnLogo from './images/tech-stack-logos/scikit-learn-logo.png'
import scipySeekLogo from './images/tech-stack-logos/scipy-seek-logo.png'
import travisCILogo from './images/tech-stack-logos/travisCI-logo.png'

const imageStyle = {
    width: '80px',
    height: '80px',
}

function App() {
  const containerRef = useRef(null);
  return (
    <div className="App">
      <div
        style={{
          position: "static",
          height: "auto",
          width: "100%",
          marginBottom: "1rem",
          display: "block",
        }}
      >
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
        />{" "}
        <br />
        <div
          ref={containerRef}
          style={{
            position: "relative",
          }}
        >
          <VariableProximity
            label={
              "I build intelligent systems that balance\n " +
              "accuracy," +
              " scalability and interpretability."
            }
            className={"variable-proximity-demo"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>{" "}
      </div>{" "}
      <h1
        style={{
          marginTop: "8rem",
          fontSize: "2.5rem",
          fontWeight: "900",
          color: "rgb(163, 116, 255)",
        }}
      >
        {" "}
        WHAT I DO{" "}
      </h1>{" "}
      <div className="cards-container">
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgb(163, 116, 255)"
        >
          <img src={dataScienceIcon} alt="data-science-icon" />
          <h3> Data Science </h3>{" "}
          <p>
            {" "}
            Advanced statistical modeling, A/B testing & interactive data
            visualization for business insights.{" "}
          </p>{" "}
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgb(163, 116, 255)"
        >
          <img src={machineLearningIcon} alt="machine-learning-icon" />
          <h3> Machine Learning </h3>{" "}
          <p>
            {" "}
            Algorithm selection, cross-validation & hyperparameter tuning to
            maximize predictive power.{" "}
          </p>{" "}
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgb(163, 116, 255)"
        >
          <img src={featureEngineeringIcon} alt="feature-engineering-icon" />
          <h3> Feature Engineering </h3>{" "}
          <p>
            {" "}
            Automated feature creation, selection & dimensionality reduction to
            supercharge your models.{" "}
          </p>{" "}
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgb(163, 116, 255)"
        >
          <img src={explainableAiIcon} alt="explainable-Ai-icon" />
          <h3> Explainable AI </h3>{" "}
          <p>
            {" "}
            Model interpretability with SHAP/LIME, bias detection &
            transparent decision-making pipelines.{" "}
          </p>{" "}
        </SpotlightCard>{" "}
      </div>{" "}
      <h1
        style={{
          marginTop: "8rem",
          fontSize: "2.5rem",
          fontWeight: "900",
          color: "rgb(163, 116, 255)",
        }}
      >
        {" "}
        MY TECH STACK{" "}
      </h1>{" "}
      <p
        style={{
          fontSize: "2rem",
          color: "white",
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        My expertise spans{" "}
        <span
          style={{
            color: "rgb(255, 208, 116)",
          }}
        >
          Data Science and AI technologies{" "}
        </span>
        , enabling me to deliver <br />
        <span
          style={{
            color: "rgb(23, 241, 209)",
          }}
        >
          Machine Learning-driver{" "}
        </span>{" "}
        solutions across various platforms.
      </p>
      <div className="relative flex h-full bg-black" >
        <div className="container max-w-screen-xl mx-auto relative z-20 overflow-x-hidden" style={{overflowX: 'hidden', paddingTop: '5rem', paddingBottom: '5rem'}}>
            <Splide
                options={{
                    type: "loop", // Loop back to the beginning when reaching the end
                    autoScroll: {
                        pauseOnHover: false, // Do not pause scrolling when hovering over the carousel
                        pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                        rewind: true, // Rewind to start when the end is reached
                        speed: 1 // Scrolling speed
                    },
                    arrows: false, // Hide navigation arrows
                    pagination: false, // Hide pagination dots
                    fixedWidth: '145px', // Fixed width for each slide
                    gap: '2px', // Gap between slides
                }}
                extensions={{ AutoScroll }} // Use the AutoScroll extension
            >
                <SplideSlide>
                    <img src={pythonLogo} alt="Python Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={anacondaLogo} alt="Anaconda Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={apacheSparkLogo} alt="Apache Spark Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={djangoLogo} alt="Django Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={flaskLogo} alt="Flask Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={mongoDBLogo} alt="MongoDB Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={mySQLLogo} alt="MySQL Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={circleCILogo} alt="CircleCI Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={dockerLogo} alt="Docker Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={gitLogo} alt="Git Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={githubActionLogo} alt="GitHub Action Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={gitLabLogo} alt="GitLab Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={grafanaLogo} alt="Grafana Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={kerasLogo} alt="Keras Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={kubernetesLogo} alt="Kubernetes Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={matplotlibLogo} alt="MatplotLib Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={new4jLogo} alt="New4j Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={numpyLogo} alt="NumPy Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={pandasLogo} alt="Pandas Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={plotlyLogo} alt="Plotly Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={postmanLogo} alt="Postman Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={powerBILogo} alt="PowerBI Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={prometheusLogo} alt="Prometheus Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={pytorchLogo} alt="Pytorch Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={scikitLearnLogo} alt="Scikit-Learn Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={scipySeekLogo} alt="ScipySeek Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={pytorchLogo} alt="Pytorch Logo" style={imageStyle} />
                </SplideSlide>
                <SplideSlide>
                    <img src={travisCILogo} alt="TravisCI Logo" style={imageStyle} />
                </SplideSlide>

            </Splide>
        </div>
        </div>
    </div>
  );
}

export default App;
