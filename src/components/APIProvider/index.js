import React from 'react'
import { useDispatch } from "react-redux";
import { setLoading, updateGlobalAlert } from "../../store/slices/appSlice";
import PropTypes from 'prop-types'


export const Create = async()=>{
 let  data = ['iPhone','Samsung']
  if(data) {
    return data
  }else {
    return new Error("Data not found")
  }
//   let URL="/api/v1/CreateProduct";
//   let PostBody={
//       ProductName:ProductName,
//       ProductCode:ProductCode,
//       Img:Img,
//       UnitPrice:UnitPrice,
//       Qty:Qty,
//       TotalPrice:TotalPrice
//   }
//  return axios.post(URL,PostBody).then((res)=>{
//       if(res.status===200){
//          return true;
//       }
//       else{
//          return  false;
//       }
//   }).catch((err)=>{
//       console.log(err);
//       return false;
//   });
}

export const save=() =>{
  return new Promise((resolve,reject)=>{
    let data = ['apple','mango']
    if(data) {
			resolve(data)
		}else {
			reject(new Error("Data not found"))
		}
  })
}



function APIProvider(props) {
  return (
    <div>api provider</div>
  )
}

APIProvider.propTypes = {}

export default APIProvider
