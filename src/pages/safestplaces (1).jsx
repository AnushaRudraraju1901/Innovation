import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import SafestPlaces from './safestplaces';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
 
const safePlaces = [
    { name: "Poonthotam School, Chennai", lat: 13.128314, lng: 80.181857 },
    { name: "St. Joseph Church Community Hall, Chennai", lat: 13.071943, lng: 80.211790 },
    { name: "Kalaimagal School, Chennai", lat: 13.091170, lng: 80.198623 },
    { name: "Ramanathapuram School, Chennai", lat: 13.060969, lng: 80.254159 },
    { name: "Kannilal Layout Hall, Chennai", lat: 13.105832, lng: 80.270422 },
    { name: "Annai Sivagami Nagar Govt. School, Chennai", lat: 13.106770, lng: 80.172485 },
    { name: "Rettai Malai Seenivasan Nagar Govt Hostel, Chennai", lat: 13.101641, lng: 80.185017 },
    { name: "Sathangadu Y.M.C.Hall, Chennai", lat: 13.146184, lng: 80.270228 },
    { name: "Gowri Aasiramam, Chennai", lat: 13.059212, lng: 80.227484 },
    { name: "Chennai Middle School, Veduperumbakkam, Chennai", lat: 13.127689, lng: 80.221572 },
    { name: "Govt. High School, Mathoor, Chennai", lat: 13.045108, lng: 80.242472 },
    { name: "Zonal Office Building , Basin Bridge road, Chennai", lat: 13.098840, lng: 80.275216 },
    { name: "Corporation Community hall, Kannappar thidal, Choolaimedu, Chennai", lat: 13.069730, lng: 80.226186 },
    { name: "Corporation Community centre, SM nagar, Chennai", lat: 13.058874, lng: 80.257260 },
    { name: "MRTS Railway station, Chindaradripet, Chennai", lat: 13.075441, lng: 80.270286 },
    { name: "Chennai Primary school,3rd main road, CMDA colony, Chennai", lat: 13.071424, lng: 80.203942 },
    { name: "Vyaparigal sangam, Mathoor, Chennai", lat: 13.044314, lng: 80.267243 },
    { name: "Corporation Middle School, Kannapparsamy Nagar, Chennai", lat: 13.063778, lng: 80.229995 },
    { name: "Bhuvaneswari School, Padi, Chennai", lat: 13.096756, lng: 80.159435 },
    { name: "CHS Padikuppam, Chennai", lat: 13.090848, lng: 80.201601 },
    { name: "Britania School, Padi, Chennai", lat: 13.094663, lng: 80.157726 },
    { name: "Singaram Pillai School, Chennai", lat: 13.097307, lng: 80.238833 },
    { name: "Jain Kalyana Mandapam, Chennai", lat: 13.079739, lng: 80.209535 },
    { name: "Sathyasai Nagar Church, Chennai", lat: 13.056478, lng: 80.205034 },
    { name: "Kamalammal Thirumana Mandapam, Chennai", lat: 13.038950, lng: 80.200945 },
    { name: "MGR Colony , Anganwadi, Chennai", lat: 13.041762, lng: 80.194778 },
    { name: "Melnaduvankarai, Anganwadi, Chennai", lat: 13.032670, lng: 80.197538 },
    { name: "Anna Adarsh College, Chennai", lat: 13.011606, lng: 80.221744 },
    { name: "CPS, Nathamuni Street, Chennai", lat: 13.077079, lng: 80.204156 },
    { name: "CPS, NSK Nagar, Chennai", lat: 13.076573, lng: 80.205783 },
    { name: "Periakoodal Corporation School, Chennai", lat: 13.089086, lng: 80.267235 },
    { name: "Anna Sidha Hospital, Chennai", lat: 13.067614, lng: 80.278965 },
    { name: "Sundaravadanam School, Chennai", lat: 13.083866, lng: 80.272585 },
    { name: "Division office, Raja street, Alandur, Chennai", lat: 13.004621, lng: 80.200229 },
    { name: "Infant Jesus School, Labour Colony, Chennai", lat: 13.034873, lng: 80.249050 },
    { name: "Teachers Training Institute, Saidpat, Chennai", lat: 13.026944, lng: 80.221424 },
    { name: "Modern Hr. Sec. School, Saidapet, Chennai", lat: 13.019288, lng: 80.220903 },
    { name: "St. Francis Savier School, Little Mount, Chinnamalai, Chennai", lat: 13.010946, lng: 80.215606 }
  ];
  
 
const CustomMarkerIcon = () => {
  return (
    <div className="custom-marker">
      <FaMapMarkerAlt className="marker-icon" style={{ color: 'red', fontSize: '24px'}}/>
    </div>
  );
};
 
const Maps = () => {
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);
 
  useEffect(() => {
    // Initialize the map
    const newMap = L.map(mapRef.current).setView([13.0827, 80.2707], 13);
 
    // Add the tile layer (map background)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);
 
    // Create a custom marker icon using L.divIcon
    const customIcon = L.divIcon({
      html: ReactDOMServer.renderToString(<CustomMarkerIcon />),
      iconSize: [32, 32],
      className: 'custom-marker-icon',
    });
 
    // Add the search control
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'button',
      showMarker: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true
    });
    newMap.addControl(searchControl);
 
    // Add markers for safe places with custom icon
    safePlaces.forEach(place => {
      L.marker([place.lat, place.lng], { icon: customIcon })
        .addTo(newMap)
        .bindPopup(place.name);
    });
 
    // Set the map instance in the state
    setMap(newMap);
 
    // Clean up the map on component unmount
    return () => {
      newMap.remove();
    };
  }, []);
 
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
 
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      performSearch(searchQuery);
    }
  };
 
  const performSearch = (query) => {
    if (map) {
      const provider = new OpenStreetMapProvider();
      provider.search({ query: query }).then((results) => {
        if (results.length > 0) {
          const location = results[0];
          map.flyTo([location.y, location.x], 13);
          L.marker([location.y, location.x]).addTo(map);
        }
      });
    }
  };
 
  return (
    <div className="maps-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a region in Chennai"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleSearchSubmit}
        />
      </div>
      <div ref={mapRef} className="map-container" />
    </div>
  );
};
 
const MainComponent = () => {
  const [selectedOption, setSelectedOption] = useState('Maps');
 
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
 
  return (
    <div>
    <div>
          {selectedOption === 'Maps' && < Maps />}
      {selectedOption === 'SafestPlaces' && <SafestPlaces />}
    </div>
    </div>
  );
};
 
  
 
export default MainComponent;
 