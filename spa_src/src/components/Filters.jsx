function Filters({ filters, handleFilterChange }) {
  return (
    <form className="d-flex flex-wrap">
      {filters.map(filter => {
        const iconUrl = require(`../icons/${filter.name}.png`);
        return (
        <div className="form-check col-6 col-sm-4 col-md-3 col-xl-2" key={filter.name}>
          <input
            className="form-check-input"
            type="checkbox"
            value={filter.name}
            id={filter.name}
            checked={filter.selected}
            onChange={e => handleFilterChange(filter.name, e.target.checked)}
          />
          
          <label className="form-check-label" htmlFor={filter.name}>
          <img style={{ maxWidth: '30px', maxHeight: '30px', height: 'auto' }} src={iconUrl} alt={filter.displayName}/>
            {filter.displayName}
          </label>
        </div>
      )})}
    </form>
  );
}

export default Filters;

