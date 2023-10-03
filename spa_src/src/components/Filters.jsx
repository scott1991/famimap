function Filters({ filters }) {
  return (
    <form className="d-flex flex-wrap">
      {filters.map(filter => (
        <div className="form-check col-6 col-sm-4 col-md-3 col-xl-2" key={filter.name}>
          <input className="form-check-input" type="checkbox" value={filter.name} id={filter.name} />
          <label className="form-check-label" htmlFor={filter.name}>
            {filter.displayName}
          </label>
        </div>
      ))}
    </form>
  );
}

export default Filters;