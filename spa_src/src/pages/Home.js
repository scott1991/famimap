import { useEffect, useState } from 'react';
import Map from '../components/Map.jsx';
import Filters from '../components/Filters.jsx';
function Home() {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch('/allspecial')
      .then(response => response.json())
      .then(data => setFilters(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='d-flex flex-column' style={{ height: '100vh' }}>
      <header className="flex-wrap justify-content-start py-3" style={{ backgroundColor: "#00b347" }}>
        <a href="/" class="px-1 px-sm-3 text-decoration-none">
          <span class="fs-4" style={{ color: "#007bff", fontWeight: "bold", textShadow: "0px 0px 4px white" }}>FamiMap</span>
        </a>
      </header>

      <div className='d-flex flex-grow-1 flex-column flex-sm-row'>
        <div className='flex-grow-1 col-sm-2'>
          {/* TODO: store list in current map */}list
        </div>
        <div className='flex-grow-1 col-sm-10'>
          <Map />
        </div>

      </div>
      <div className='mt-auto' style={{maxHeight:'25vh'}}>
        <div className='container h-100' style={{ overflowY: 'auto'}}>
          <Filters filters={filters} />
        </div>
      </div>
    </div>

  );
}

export default Home;
