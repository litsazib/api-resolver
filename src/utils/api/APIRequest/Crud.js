import ApiService from "../index";
import { store } from "../../../store";
import { setLoading, updateGlobalAlert } from "../../../store/slices/appSlice";

export async function Create(path, data,requestConfig,loader) {
  const {dataMethod,paginationMethods} = requestConfig
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.post(path, data);
    return res;
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

export async function Read(path,requestConfig) {
  const {loader,dataMethod,paginationMethods} = requestConfig
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
