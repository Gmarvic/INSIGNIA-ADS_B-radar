from flask import Flask, render_template, jsonify
from opensky_api import OpenSkyApi

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_aircraft_data')
def get_aircraft_data():
    # Create an instance of the OpenSkyApi
    api = OpenSkyApi()

    # Retrieve states (ADS-B data) for Spain as an specified bounding box
    bbox_spain = (21.0, 48, -25, 5.0)
    states = api.get_states(bbox=bbox_spain)
    
     # Log the structure of the states object to debug
    print('States object:', states)
    
    # Process states and prepare data to send back
    aircraft_data = []
    for state in states.states:
        aircraft_data.append({
            'icao24': state.icao24,
            'callsign': state.callsign,
            'origin_country': state.origin_country,
            'latitude': state.latitude,
            'longitude': state.longitude,
            'altitude': state.geo_altitude
        })
    
    return jsonify({'aircraft_data': aircraft_data})

if __name__ == '__main__':
    app.run(debug=True)        
