import { useEffect, useState, useCallback } from 'react';
import _ from 'lodash-es';
import Map from '../components/Map.jsx';
import Filters from '../components/Filters.jsx';
import List from '../components/List.jsx';
import './Home.css';

function Home() {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 25.0510035, lng: 121.5422824, radius: 3000 });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch('/allspecial')
      .then(response => response.json())
      .then((data) => {
        setFilters(data);
      })
      .catch(error => console.error(error));
  }, []);

  const debouncedGetStoresInRange = _.debounce(() => getStoresInRangeImpl(mapCenter.lat, mapCenter.lng, mapCenter.radius), 1000);



  useEffect(() => {
    debouncedGetStoresInRange();
  }, [mapCenter, selectedFilters]);

  // some div will not effect by data-bs-theme because they inherit from body, but react can't add data-bs-theme there directly
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'dark');
  }, []);
  
  
  const getStoresInRange = () => {
    getStoresInRangeImpl(mapCenter.lat, mapCenter.lng, mapCenter.radius);
  }

  const getStoresInRangeImpl = (lat, lng, radius) => {
    const queryParams = new URLSearchParams({
      lat: lat,
      lng: lng,
      radius: radius,
    });
    let specialFilters = [];
    for (const filter in selectedFilters) {
      if (selectedFilters[filter]) {
        specialFilters.push(filter);
      }
    }
    if (specialFilters.length > 0) {
      queryParams.append('specials', specialFilters.join(','));
    }

    fetch('/store/getinrange?' + queryParams.toString())
      .then(response => response.json())
      .then(data => {
        setMarkers(data);
      })
      .catch(error => console.error(error));
  };


  const handleFilterChange = (filterName, isSelected) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: isSelected
    }))
  };

  const handleMapCenter = (lat, lng, radius) => {
    setMapCenter({ lat, lng, radius });
  }
  
  return (
    <div className='d-flex flex-column' style={{ height: '100vh' }}>
      <header className="flex-wrap justify-content-start py-3" style={{ backgroundColor: "#00b347" }}>
        <a href="/" className="px-1 px-sm-3 text-decoration-none">
          <span className="fs-4" style={{ color: "#007bff", fontWeight: "bold", textShadow: "0px 0px 4px white" }}>FamiMap</span>
        </a>
      </header>

      <div className='d-flex flex-grow-1 flex-column flex-sm-row'>
        <div className='flex-grow-1 col-sm-2 content-height' style={{ overflowX: 'scroll', overflowY: 'scroll' }}>
          <List markers={markers} />
        </div>
        <div className='flex-grow-1 col-sm-10 content-height'>
          <Map handleMapCenter={handleMapCenter} markers={markers}>
          </Map>
        </div>

      </div>
      <div className='mt-auto w-100 dark-style' style={{ height: '25vh', overflowY:'scroll' }} >
          <Filters filters={filters} handleFilterChange={handleFilterChange} />
      </div>
    </div>

  );
}

export default Home;
