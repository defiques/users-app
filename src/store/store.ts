import {combineReducers, configureStore} from "@reduxjs/toolkit";
import peopleReducer from './reducers/PeopleSlice';

const rootReducer = combineReducers({
    peopleReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];