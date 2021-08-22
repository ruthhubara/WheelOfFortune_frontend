import produce from 'immer';
import createReducer from "./ReducerUtils";


const initialState = {
  user: {
    email: "",
    password: "",
    uid: ""
  }
}
//דרך קצרה
const users = {
  setUserEmail(state, action) {
    state.user.email = action.payload;
  },
  setUserPassword(state, action) {
    state.user.password = action.payload;
  },
  setUserUid(state, action) {
    state.user.uid = action.payload;
  }

};

export default produce((state, action) => createReducer(state, action, users), initialState);
