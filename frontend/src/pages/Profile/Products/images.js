import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { UploadProductImage } from "../../../apicalls/products";

function Images({
  selectedProduct,
  setShowPoductForm,
  getData,
}) {
    const [images=[],setImages]=useState(selectedProduct.images)
    const [file=null,setFile] = useState(null)
    const [showPreview = false,setShowPreview] = useState(true)
    const dispatch = useDispatch();
    const upload = async()=>{
        try {
          dispatch(setLoader(true))
          //upload image to Cloudinary
          const formData = new FormData();
          formData.append("file",file);
          formData.append("productId",selectedProduct._id);
          const response = await UploadProductImage(formData)
          dispatch(setLoader(false));
          if(response.success){
            message.success(response.message);
            setImages([...images,response.data]);
            setShowPreview(false)
            setFile(null)
            getData();
          }else{
            message.error(response.message);
          }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
            
        }
    }
  return <div>
    <Upload
        listType="picture"
        beforeUpload={()=>false}
        onChange={(info)=>{
            setFile(info.file);
            setShowPreview(true)
        }}
        showUploadList={showPreview}
    >
        <div style={{display:"flex",gap:5,margin:"10px 0"}}>
        {
            images.map((img)=>{
                return (
                    <div style={{padding:"3px",display:"flex",gap:2,border:"1px solid #7C7C7C",borderRadius:"5px",alignItems:"end"}}>
                        <img style={{height:"100px",width:"100px",objectFit:"cover"}} src={img} alt=""/>
                        <i className="ri-delete-bin-line"
                        onClick={()=>{}}></i>
                    </div>
                )
            }
        )}
        </div>
        <Button type="dashed" >
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
