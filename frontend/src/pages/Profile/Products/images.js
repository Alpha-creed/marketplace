import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { EditProduct, UploadProductImage } from "../../../apicalls/products";

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

    const deleteImage = async(image)=>{
        try {
            const updatedImagesArray = images.filter((img)=>img !==image);
            const updatedProduct = {...selectedProduct,images:updatedImagesArray}
            const response = await EditProduct(
                selectedProduct._id,
                updatedProduct
            )
            if(response.success){
                message.success(response.message);
                setImages(updatedImagesArray)
                setFile(null)
                getData()
            }else{
                throw new Error(response.messsage)
            }
            dispatch(setLoader(true))
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }
  return <div>
    <div style={{display:"flex",gap:5,margin:"10px 0"}}>
        {
            images.map((img)=>{
                return (
                    <div style={{padding:"3px",display:"flex",gap:2,border:"1px solid #7C7C7C",borderRadius:"5px",alignItems:"end"}}>
                        <img style={{height:"100px",width:"100px",objectFit:"cover"}} src={img} alt=""/>
                        <i className="ri-delete-bin-line"
                        onClick={()=>deleteImage(img)}></i>
                    </div>
                )
            }
        )}
        </div>
    <Upload
        listType="picture"
        beforeUpload={()=>false}
        onChange={(info)=>{
            setFile(info.file);
            setShowPreview(true)
        }}
        showUploadList={showPreview}
    >
        
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
