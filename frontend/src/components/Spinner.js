import React from 'react'

function Spinner() {
    const spinnerClass={
        position:"fixed",
        inset:0,
        backgroundColor:"black",
        zIndex:10,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        // opacity:20,

    }
    const spinnerDetClass={
      width:"30px",
      height:"30px",
      borderRadius:"15px",
      borderStyle:"solid",
      borderColor:"gray",
      borderLeft:"transparent",
      Animation:"spin",
    }
  return (
    <div style={spinnerClass}>
        <div style={spinnerDetClass}></div>
    
    </div>
  )
}

export default Spinner
