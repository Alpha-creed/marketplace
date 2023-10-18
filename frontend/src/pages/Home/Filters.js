import React from 'react'

function Filters({
    showFilters,
    setShowFilters,
    filters,
    setFilters
}) {
  return (
    <div style={{width:"300px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <h3 style={{color:"#470101"}}>Filters</h3>
            <i className="ri-close-line" style={{fontSize:"30px"}} onClick={()=>setShowFilters(!showFilters)}></i>
        </div>
    </div>
  )
}

export default Filters
