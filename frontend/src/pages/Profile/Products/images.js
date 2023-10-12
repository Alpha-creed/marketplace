import { Button, Upload } from "antd";
import React, { useState } from "react";

function Images({
  selectedProduct,
  setShowPoductForm,
  getData,
}) {
    const [file=null,setFile] = useState(null)
    const upload = ()=>{
        console.log(file);
    }
  return <div>
    <Upload
        listType="picture"
        beforeUpload={()=>false}
        onChange={(info)=>{
            setFile(info.file);
        }}
    >
        <Button type="dashed">
            Upload Image
        </Button>
    </Upload>
    <div style={{display:"flex",justifyContent:"end",gap:7,marginTop:"10px"}}>
        <Button type="primary"
        onClick={()=>{
            setShowPoductForm(false);
        }} >
            Cancel
        </Button>
        <Button type="primary"  disabled={!file} onClick={upload}>Upload</Button>
    </div>
  </div>;
}

export default Images;
