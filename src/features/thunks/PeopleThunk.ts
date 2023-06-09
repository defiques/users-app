import ky from "ky";
import {createAsyncThunk} from "@reduxjs/toolkit";

const api = ky.create({
    prefixUrl: 'https://randomuser.me/api/'
});

export const fetchPeoples = createAsyncThunk(
    'people/fetchPeople',

    async ({ results , page }: {results: number, page: number}, { rejectWithValue }) => {

        try {
            const data = await api.get("", {
               searchParams: {
                   results,
                   seed: 'foobar',
                   page
               }
            }).json();
            // @ts-ignore
            return data.results
        }
        catch (e) {
            return rejectWithValue(e)
        }
    }
)