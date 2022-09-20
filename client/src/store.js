import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./components/Reducers/Post";
import {
  userReducer,
  singleUserReducer,
  allUserReducer,
} from "./components/Reducers/User";

export const store = configureStore({
  reducer: {
    //user
    user: userReducer,
    singleUser: singleUserReducer,
    allUsers: allUserReducer,

    //post
    post: postReducer,
  },
});
