import {IPeople} from "../../models/IPeople";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPeoples} from "../../features/thunks/PeopleThunk";
import {transformData} from "../../features/transformData";
import {fetchFilters} from "../../features/fetchFilters";

interface PeopleState {
    people: IPeople[],
    search: string,
    filterGender: string[],
    filterNation: string[],
    activeFGender: string,
    activeFNation: string
    error: string,
    loading: boolean,
    resultsOnPage: number,
    curPage: number
}

const initialState: PeopleState = {
    people: [],
    search: '',
    filterGender: [],
    filterNation: [],
    activeFGender: 'all',
    activeFNation: 'all',
    error: '',
    loading: false,
    resultsOnPage: 10,
    curPage: 1
};

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        handleFilter(state, action:PayloadAction<{value: string, type: "nationality" | "gender"}>) {
            action.payload.type === "nationality"
                ?
            state.activeFNation = action.payload.value
                :
            state.activeFGender = action.payload.value
        },
        handleSearch(state, action:PayloadAction<string>) {
            state.search = action.payload;
        },
        handleResultsNumber(state, action:PayloadAction<number>) {
            state.resultsOnPage = action.payload;
        }
    },
    extraReducers: {
        [fetchPeoples.pending.type]: (state) => {
            state.people = [];
            state.loading = true;
        }
        ,
        [fetchPeoples.fulfilled.type]: (state, action: PayloadAction<{data: IPeople[], curPage: number}>) => {
            const needData = transformData(action.payload.data);
            state.people = needData;
            state.curPage = action.payload.curPage;
            state.filterGender = [...new Set(state.filterGender.concat(fetchFilters(needData, "gender")))]
            state.filterNation = [...new Set(state.filterNation.concat(fetchFilters(needData, "nationality")))];
            state.loading = false;
        },
        [fetchPeoples.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export default peopleSlice.reducer;