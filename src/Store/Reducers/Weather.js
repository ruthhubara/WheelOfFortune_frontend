import produce from 'immer';
import createReducer from "./ReducerUtils";

const initialState = {
    weather: {
        uid:"",
        city:"",
        temp:"",
        description:"",
        icon:""
    },
    weatherHistory:[]
}

//דרך קצרה
const weather = {
    setWeather(state, action) {
        state.weather = action.payload;
    },
    setWeatherHistory(state, action) {
        state.weatherHistory = action.payload;
    },
};

export default produce((state, action) => createReducer(state, action, weather), initialState);

