import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../utils/Helpers/APIRequest/";
import { apiLink } from "../../utils/env.constant";

export const loginAction = createAsyncThunk("auth/login", async (loginData) => {
  return await ApiService.post(apiLink.hitLoginLink, loginData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
});

export const logoutAction = createAsyncThunk("auth/logout", async () => {
  return await ApiService.post(apiLink.hitLogoutLink);
});

const initialStoreData = {
  userType: "DO",
  isLoading: false,
  isLoggedIn: false,
  user: {},
  token: "",
  refreshToken: "",
  alert: {
    type: "",
    title: "",
    message: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStoreData,
  reducers: {
    access: (state) => {
      return state;
    },
    updateAlert: (state, actions) => {
      state.alert = actions.payload;
    },
    setUserLogout: (state, actions) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = {};
    },
  },
  extraReducers: (builder) => {
    //Login Builder actions.....
    builder.addCase(loginAction.pending, (state, actions) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, actions) => {
      let response = actions.payload;
      try {
        if (
          response?.code === "ERR_BAD_REQUEST" ||
          response?.code === "ERR_BAD_RESPONSE"
        ) {
          state.alert = {
            type: "Error",
            title: response.response.data.error.title,
            message: response.response.data.error.message,
          };
        } else {
          if (response.resultCode === 200) {
            state.isLoggedIn = true;
            state.user = response.data;
            state.token = response.data.token;

            state.alert = {
              type: "Success",
              title: response.success.title,
              message: response.success.message,
            };
          }
        }
      } catch (error) {
        state.alert = {
          type: "Error",
          title: "System Failure!",
          message: "An error occured. Please try again",
        };
      }
      state.isLoading = false;
    });
    builder.addCase(loginAction.rejected, (state, actions) => {
      state.isLoading = false;
    });

    //Logout builder actions....
    builder.addCase(logoutAction.pending, (state, actions) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state, actions) => {
      let response = actions.payload;

      try {
        if (
          response?.code === "ERR_BAD_REQUEST" ||
          response?.code === "ERR_BAD_RESPONSE"
        ) {
          state.alert = {
            type: "Error",
            title: response.response.data.error.title,
            message: response.response.data.error.message,
          };
        } else {
          if (response.resultCode === 200) {
            state.isLoggedIn = false;
            state.user = {};
            state.token = "";
          }

          state.alert = {
            type: "Success",
            title: response.success.title,
            message: response.success.message,
          };
        }
      } catch (error) {
        state.alert = {
          type: "Error",
          title: "System Failure!",
          message: "An error occured. Please try again",
        };
      }
      state.isLoading = false;
    });
    builder.addCase(logoutAction.rejected, (state, actions) => {
      state.isLoading = false;
    });
  },
});

export const { access, updateAlert, setUserLogout } = authSlice.actions;
export default authSlice.reducer;
