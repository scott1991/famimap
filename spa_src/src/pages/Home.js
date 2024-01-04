import { useEffect, useState } from 'react';
import _ from 'lodash-es';
import DarkModeToggle from "react-dark-mode-toggle";

import Map from '../components/Map.jsx';
import Filters from '../components/Filters.jsx';
import List from '../components/List.jsx';
import './Home.css';

function Home() {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 25.0510035, lng: 121.5422824, radius: 3000 });
  const [markers, setMarkers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      return theme === 'dark';
    }
    // if theme not found in localStorage, use system prefers setting
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // some div will not effect by data-bs-theme because they inherit from body, but react can't add data-bs-theme there directly
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', theme);
  }, [isDarkMode]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/allspecial')
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) throw Error(data.err || 'HTTP error');
          setFilters(data);
        });
      })
      .catch(error => console.error(error));
  }, []);

  const debouncedGetStoresInRange = _.debounce(() => getStoresInRangeImpl(mapCenter.lat, mapCenter.lng, mapCenter.radius), 1000);



  useEffect(() => {
    debouncedGetStoresInRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapCenter, selectedFilters]);

  const onToggleDarkMode = (newIsDarkMode) => {
    setIsDarkMode(newIsDarkMode);
    const theme = newIsDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  /*
  const getStoresInRange = () => {
    getStoresInRangeImpl(mapCenter.lat, mapCenter.lng, mapCenter.radius);
  }
  */
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

    fetch(process.env.PUBLIC_URL + '/store/getinrange?' + queryParams.toString())
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) throw Error(data.err || 'HTTP error');
          setMarkers(data);
        });
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
      <header className="d-flex flex-wrap justify-content-start py-1 py-sm-3" style={{ backgroundColor: "#00b347" }}>
        <a href="/" className="px-1 px-sm-3 text-decoration-none">
          <span className="fs-4" style={{ color: "#007bff", fontWeight: "bold", textShadow: "0px 0px 4px white" }}>FamiMap</span>
        </a>
        <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
          <DarkModeToggle
            onChange={onToggleDarkMode}
            checked={isDarkMode}
            size={80}
          />
        </div>

      </header>

      <div className='d-flex flex-grow-1 flex-column flex-sm-row'>
        <div className='flex-grow-1 col-sm-2 content-height-list' style={{ overflowX: 'scroll', overflowY: 'scroll' }}>
          <List markers={markers} />
        </div>
        <div className='flex-grow-1 col-sm-10 content-height'>
          <Map handleMapCenter={handleMapCenter} markers={markers} mapCenter={mapCenter}>
          </Map>
        </div>

      </div>
      <div className='mt-auto w-100 container-fluid' style={{ height: '25vh', overflowY: 'scroll' }} >
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
      </div>
    </div>

  );
}

export default Home;
