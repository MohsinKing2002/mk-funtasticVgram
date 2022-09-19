import axios from "axios";

//register user
export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        avatar,
      });

      dispatch({
        type: "RegisterSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

//login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(`/login`, { email, password });

    dispatch({
      type: "LoginSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`/me`);

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

//logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });
    const { data } = await axios.get(`/me/logout`);

    dispatch({
      type: "LogoutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
  }
};

//delete user
export const deleteUser = (password) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserRequest",
    });
    const { data } = await axios.delete(`/me/delete`, { data: { password } });

    dispatch({
      type: "DeleteUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserFailure",
      payload: error.response.data.message,
    });
  }
};

//update user profile
export const updateProfile =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserRequest",
      });
      const { data } = await axios.put(
        `/me/update`,
        {
          name,
          email,
          password,
          avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UpdateUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserFailure",
        payload: error.response.data.message,
      });
    }
  };

//get sinlge users
export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "SingleUserRequest",
    });
    const { data } = await axios.get(`/users/${id}`);

    dispatch({
      type: "SingleUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "SingleUserFailure",
      payload: error.response.data.message,
    });
  }
};

//follow users
export const followUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowUserRequest",
    });
    const { data } = await axios.get(`/follow/${id}`);

    dispatch({
      type: "FollowUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "FollowUserFailure",
      payload: error.response.data.message,
    });
  }
};

//get all users
export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "AllUserRequest",
      });
      const { data } = await axios.get(`/users?name=${name}`);

      dispatch({
        type: "AllUserSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "AllUserFailure",
        payload: error.response.data.message,
      });
    }
  };
