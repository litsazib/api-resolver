import ApiService from "../index";
import { store } from "../../../store";
import { setLoading, updateGlobalAlert } from "../../../store/slices/appSlice";

export async function apiRequest(path, data,requestConfig) {
  const {loader,dataMethod,paginationMethods} = requestConfig
  try {
    loader && store.dispatch(setLoading(true));
    let res = await ApiService.post(path, data);
    return res;







    // if (res.resultCode === 200) {
    //   store.dispatch(
    //     updateGlobalAlert({
    //       type: "Success",
    //       title: "Success!",
    //       message: res.data.message,
    //     })
    //   );
    //   store.dispatch(setLoading(false));
    //   return (updateGlobalAlert = {
    //     type: "Success",
    //     title: "Success!",
    //     message: res.data.message,
    //   });
    // } else {
    //   store.dispatch(
    //     updateGlobalAlert({
    //       type: "Error",
    //       title: "Failed!",
    //       message: "Failed to create",
    //     })
    //   );
    //   store.dispatch(setLoading(false));
    //   return (updateGlobalAlert = {
    //     type: "Error",
    //     title: "Failed!",
    //     message: "Failed to create",
    //   });
    // }
  } catch (error) {
    // if (error.response) {
    //   dispatch(
    //     updateGlobalAlert({
    //       type: "Error",
    //       title: error.response.data.error.title,
    //       message: error.response.data.error.message,
    //     })
    //   );
    //   return {
    //     type: "Error",
    //     title: error.response.data.error.title,
    //     message: error.response.data.error.message,
    //   };

    //   if (error.response.data.resultCode === 401) {
    //     dispatch(logoutAction());
    //     return {
    //       type: "logoutAction",
    //       title: "logoutAction",
    //       fn: logoutAction,
    //     };
    //   }
    // } else {
    //   store.dispatch(
    //     updateGlobalAlert({
    //       type: Math.random(),
    //       title: "System Failure!",
    //       message: new Error(error).message,
    //     })
    //   );
    //   return {
    //     loader,
    //     dataMethod:dataMethod(
    //       [
    //         {},{},{}
    //       ]
    //     ),
    //     paginationMethods:paginationMethods(
    //       {
    //         currentPage: 1,
    //         totalItem: 6,
    //         totalPage: 1,
    //       }
    //     ),
    //     error:{
    //       Error: new Error (error.message).toString(),
    //       pagination:{},
    //       data:[],
    //     }
        
    //   }
    // }


      return {
        error:{
          loader,
          Error: new Error (error.message).toString(),
          paginationMethods:paginationMethods({}),
          dataMethod:dataMethod([]),
        }
      }






    
  }
}
