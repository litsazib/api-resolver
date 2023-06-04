import ApiService from "./index";
import { store } from "../../../store";
import { setLoading, updateGlobalAlert } from "../../../store/slices/appSlice";


export const defaultMethod  = {
  dataMethod:(array) =>{
    return array
  },
  paginationMethods:(Obj) =>{
    return Obj
  }
} 

export async function Create(path, data,requestConfig,loader) {
  const {dataMethod,paginationMethods} = requestConfig
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.post(path, data);
    if(res.resultCode===200){
      return res.data;
    }else {
      return false
    }
  } catch (error) {
    let errorObj ={
      loading:loader,
      Error: new Error (error.message).toString(),
      paginationMethods:paginationMethods({}),
      dataMethod:dataMethod([]),
    }
    return errorObj
  }
}

export async function Read(path,requestConfig,loader) {
  const {dataMethod,paginationMethods} = requestConfig
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.get(path);
    if(res.length > 0) {
      return res;
    }else {
      console.log('data not found')
    }
    return res;
  } catch (error) {
    let errorObj ={
      loader,
      Error: new Error (error.message),
      paginationMethods:paginationMethods({}),
      dataMethod:dataMethod([]),
    }
    return errorObj
  }
}

export async function SelectByPageing (path,params,requestConfig,loader) {
  const {dataMethod,paginationMethods} = requestConfig
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.get(path, {params});
    if(res.status===200){
      return res;
    }
    else{
      return false;
    }
  } catch (error) {
    let errorObj ={
      loader,
      Error: new Error (error.message),
      paginationMethods:paginationMethods({}),
      dataMethod:dataMethod([]),
    }
    return errorObj
  }
}

export async function SelectByID(path,id,loader){
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.get(path+"/"+id);
    if(res.status===200){
      return res;
    }
    else{
      return false;
    }
  } catch (error) {
    let errorObj ={
      loader,
      Error: new Error (error.message)
    }
    return errorObj
  }
}

export async function Delete(path,id,loader){
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.get(path+"/"+id);
    if(res.status===200){
      return res;
    }
    else{
      return false;
    }
  } catch (error) {
    let errorObj ={
      loader,
      Error: new Error (error.message)
    }
    return errorObj
  }
}

export async function Update(path,id,updateValue,loader) {
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.post(path+"/"+id, updateValue);
    if(res.status===200){
      return true;
    }else{
      return  false;
    }
  } catch (error) {
    let errorObj ={
      loading:loader,
      Error: new Error (error.message).toString()
    }
    return errorObj
  }
}

