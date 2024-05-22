from fastapi import FastAPI
from flask import Flask
from fastapi.middleware.wsgi import WSGIMiddleware
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
import pickle
import json
import pandas as pd

app = FastAPI()
flaskapp = Flask(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this with the origin of your React application
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)
        
# loading the saved model
flood_model = pickle.load(open('chennai_model.sav', 'rb'))

@app.get('/predict')
def flood_predd():
    X_test = pd.read_csv('fastapi_test.csv')

    prediction = flood_model.predict(X_test)

    prediction_list = prediction.tolist()

    X_test['occur'] = prediction_list

    prediction_columns = X_test[X_test['occur'] == 1]
    
    prediction_data = []
    for index, row in prediction_columns.iterrows():
        prediction_data.append(row.to_dict())
    
    # Return only the first 10 records
    return prediction_data[:10]

@app.get('/prob')
def flood_prob():
    X_test = pd.read_csv('fastapi_test.csv')

    prediction = flood_model.predict(X_test)

    prediction_list = prediction.tolist()

    future_y_pred = flood_model.predict(X_test)

    # Get probabilities from the model (assuming model outputs probabilities)
    future_y_proba = flood_model.predict_proba(X_test)[:, 0]

    # Print predictions and flood probabilities for each day
    response = []

    # Create response objects
    for i in range(len(future_y_pred)):
        flood_proba = future_y_proba[i] * 100
        prediction = "Flooded" if future_y_pred[i] == 0 else "Not Flooded"
        response.append({"day": i+1, "prediction": prediction, "flood_probability": f"{flood_proba:.2f}%"})

    return response[:10]

@app.get("/app")
def main_app():
    return "Main app called!"
 
@flaskapp.route("/")
def flask_app():
    return "Flask app called!"
 
app.mount("/flask", WSGIMiddleware(flaskapp))

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)