import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import SafestPlaces from './safestplaces';
import ReactDOMServer from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaHospitalSymbol } from "react-icons/fa";

const Maps = () => {
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState(null);
 
  const hospitalLocations = [
    { name: "Rajiv Gandhi Government General Hospital, Park Town, Chennai", lat: 13.0868, lng: 80.2731 },
    { name: "Government Stanley Medical College and Hospital, Royapuram, Chennai", lat: 13.1071, lng: 80.2918 },
    { name: "Government Kilpauk Medical College and Hospital, Kilpauk, Chennai", lat: 13.0855, lng: 80.2432 },
    { name: "Institute of Child Health and Hospital for Children, Egmore, Chennai", lat: 13.0827, lng: 80.2593 },
    { name: "Government Peripheral Hospital, Anna Nagar, Chennai", lat: 13.0892, lng: 80.2094 },
    { name: "Government Royapettah Hospital, Royapettah, Chennai", lat: 13.0562, lng: 80.2647 },
    { name: "Government Thiruvotriyur Hospital, Thiruvotriyur, Chennai", lat: 13.1637, lng: 80.2986 },
    { name: "Government Kasturba Gandhi Hospital for Women & Children, Triplicane, Chennai", lat: 13.0565, lng: 80.2695 },
    { name: "Government Omandurar Medical College and Hospital, Royapuram, Chennai", lat: 13.0915, lng: 80.2887 },
    { name: "Government Institute of Rehabilitation Medicine (GIRM), K.K. Nagar, Chennai", lat: 13.0389, lng: 80.1997 },
{    name: "Apollo Hospital, Greams Road, Chennai", lat: 13.0611, lng: 80.2629 },
    { name: "Fortis Malar Hospital, Adyar, Chennai", lat: 13.0054, lng: 80.2563 },
    { name: "MIOT International Hospital, Manapakkam, Chennai", lat: 13.0123, lng: 80.1693 },
    { name: "Chennai Meenakshi Multispeciality Hospital, Mylapore, Chennai", lat: 13.0427, lng: 80.2729 },
    { name: "SIMS Hospital (SRM Institutes for Medical Science), Vadapalani, Chennai", lat: 13.0484, lng: 80.2102 }
];

const CustomMarkerIcon = () => {
  return (
    <div className="custom-marker">
      <FaHospitalSymbol className="marker-icon" style={{ color: 'green', fontSize: '24px'}}/>
    </div>
  );
};

  useEffect(() => {
    // Initialize the map
    const newMap = L.map(mapRef.current).setView([13.0827, 80.2707], 13); // Chennai coordinates and zoom level
 
    // Add the tile layer (map background)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

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
     hospitalLocations.forEach(place => {
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
      <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
        <option value="Maps">Hospitals</option>
        <option value="SafestPlaces">Safest Places</option>
      </select>
      {selectedOption === 'Maps' ? <Maps /> : <SafestPlaces />}
    </div>
  );
};
 
export default MainComponent;
 