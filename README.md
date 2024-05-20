# INSIGNIA ADS-B radar
 A map with ENAIRE-INSIGNIA layers that displays ADS-B aircraft data using Flask, Esri-leaflet and OpenSky Python API. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/gmarvic/INSIGNIA-ADS_B-radar
```
2. Navigate to the project directory:

```bash
cd INSIGNIA-ADS_B-radar
```
3. Install dependencies:

```bash
pip install -r requirements.txt
```
If you experience problems with OpenSky API, check https://github.com/openskynetwork/opensky-api

## Usage

1. Run the main script

```bash
python main.py
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the GNU General Public License (GPL) version 3.0. 

## Credits

OpenSky Network: This project uses data from the OpenSky Network, which provides free access to real-time aircraft data.

Leaflet: Leaflet was used for creating the interactive maps.

Esri Leaflet: The project uses Esri Leaflet to integrate Esri services with Leaflet maps.

Flask: The backend server is built using Flask.

Python Packages: Various Python packages, including but not limited to:
Requests
NumPy
Matplotlib
Pillow

Icons: The icons used in this project are sourced from https://www.pngitem.com/middle/bwRmwo_transparent-airplane-icon-png-blue-airplane-icon-png and https://servais.enaire.es/insignia/rest/services/INSIGNIA_SRV/Aero_SRV_VIGOR_V1/FeatureServer/3.

Contributors: Special thanks to:

Guillermo Martín as main developer