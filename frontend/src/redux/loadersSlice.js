import {createSlice} from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name:"loaders",
    initialState:{
        loading:false,
    },
    reducers:{
        setLoaders:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setLoader} = loaderSlice.actions;