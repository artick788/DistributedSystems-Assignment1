import {createStore} from "redux";
import reducer, {initialState} from "./Reducer";

const store = createStore(reducer, initialState);

export default store;