



const FilterButton = ({ handleFilter, filterName, currentFilter, className }: any) => {
    return (
        <button type="button" 
                className={`btn filter-item ${filterName === currentFilter ? 'active-btn' : ''} ${className}`} 
                onClick={() => handleFilter(filterName)}>
                {filterName}
        </button>
    )

}

export default FilterButton;