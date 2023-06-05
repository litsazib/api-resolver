import ApiService from "./index";
import { store } from "../../../store";
import { setLoading, updateGlobalAlert } from "../../../store/slices/appSlice";
import { logoutAction, updateAlert } from "../../../store/slices/authSlice";


export const defaultMethod  = {
  dataMethod:(data) =>{
    return data
  },
  paginationMethods:(Obj) =>{
    return Obj
  }
} 

export async function Create(path, data ,loader=true) {
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.post(path, data);
    if(res.resultCode === 200){
      store.dispatch(updateGlobalAlert({
        type: 'Success',
        title: res.success.title,
        message: res.data.message
      }))
      return true;
    }else{
      if(res.response.data.resultCode === 401){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
        store.dispatch(logoutAction())
      }else if(res.response.data.resultCode === 500){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
      }
      return false
    }
  } catch (error) {
    store.dispatch(updateGlobalAlert({
      type: 'Error',
      title: 'System Error',
      message: new Error(error).message
    }))
    return false;
  }
}

export async function SelectByPageing (path,params ,loader=true) {
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.get(path, {params});
    if (res.resultCode === 200) {
      return {
        data:res.data.data,
        pagination:{
            currentPage:res.data.currentPage,
            totalItem:res.data.totalItem,
            totalpage:res.data.totalpage
        }
      }
    }
    else{
      if(res.response.data.resultCode === 401){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
        store.dispatch(logoutAction())
      }else if(res.response.data.resultCode === 500){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
      }else if(res.response.data.resultCode === 404){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
      }
      return false
    }
  } catch (error) {
    if (error.response) {
      store.dispatch(
        updateGlobalAlert({
          type: "Error",
          title: error.response.data.error.title,
          message: error.response.data.error.message,
        })
      );
      if (error.response.data.resultCode === 401) {
        store.dispatch(logoutAction());
      }
    } else {
      store.dispatch(
        updateGlobalAlert({
          type: "Error",
          title: "System Failure!",
          message: new Error(error).message,
        })
      );
    }
    store.dispatch(setLoading(false));
  }
}

export async function Delete(path,params,loader=true){
  const {id} = params
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.delete(path, {params: {id}});
    if (res.resultCode === 200) {
      store.dispatch(
        updateGlobalAlert({
          type: "Success",
          title: res.success.title,
          message: res.success.message,
        })
      );
      return true;
    }else{
      if(res.response.data.resultCode === 401){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
        store.dispatch(logoutAction())
      }else if(res.response.data.resultCode === 500){
        store.dispatch(updateGlobalAlert({
          type: 'Error',
          title: res.response.data.error.title,
          message: res.response.data.error.message
        }))
      }
      return false
    }
  } catch (error) {
    store.dispatch(updateGlobalAlert({
      type: 'Error',
      title: 'System Error',
      message: new Error(error).message
    }))
    return false;
  }
}

export async function Update(path,updateValue,params,loader=true) {
  const {id} = params
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.post(path, updateValue, {params:{id}});
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



export async function Read(path,requestConfig,loader=true) {
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
export async function SelectByID(path,id,loader=true){
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





