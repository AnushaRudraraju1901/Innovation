import React, { useState, useEffect } from 'react';
import './Prediction.css';

const PredictionPage = () => {
  // State to store prediction data
  const [predictions, setPredictions] = useState([]);
  const [probs, setPro] = useState([]);

  // Function to fetch predictions from the FastAPI endpoint
  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/predict');
      const data = await response.json();
      setPredictions(data); // Assuming the prediction data is an array of objects
      console.log(data)
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const fetchProb = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/prob');
      const data = await response.json();
      setPro(data); // Assuming the prediction data is an array of objects
      console.log(data)
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  // Fetch predictions on component mount
  useEffect(() => {
    fetchPredictions();
    fetchProb();
  }, []);

  return (
    <div className="container mt-4">
      <div className='row'>
        
          {/* Cards column */}
          {predictions.map((prediction, index) => (
            <div className="card" key={index}>
                <h3>Cloud Cover</h3>
                <p className="cloudcover">{prediction.cloudcover}</p>
                <h4 className="flood_prob">Flood Prediction: <span className='safe'>Safe</span></h4>
             
            </div>
          ))}
        </div>
        <div className='row mt-4'>
        
        {/* Cards column */}
        {probs.map((prediction, index) => (
          <div className="card" key={index}>
              <h3>Day {prediction.day}</h3>
              <p className="cloudcover">{prediction.flood_probability}</p>
              <h4 className="flood_prob">Status: <span className='safe'>{prediction.prediction}</span></h4>
           
          </div>
        ))}
      </div>
      </div>
   
  );
};

export default PredictionPage;
