import { Button } from 'antd'
import React, { useState } from 'react'
import ProductsForm from './ProductsForm'

function Product() {
    const [showProductForm,setShowProductForm] = useState(false)
    const btnOverlay = {
        display:"flex",
        justifyContent:"end",  
    }
  return (
    <div>
      <div style={btnOverlay}>
            <Button type='default'
            onClick={()=>setShowProductForm(true)}>
                Add Product
            </Button>
      </div>
      {showProductForm && <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm}/>}
    </div>
  )
}

export default Product
