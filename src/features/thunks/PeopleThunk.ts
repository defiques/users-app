import ky from "ky";
import {createAsyncThunk} from "@reduxjs/toolkit";

const api = ky.create({
    prefixUrl: 'https://randomuser.me/api/'
});

export const fetchPeoples = createAsyncThunk(
    'people/fetchPeople',

    async ({ results , page = 1, gender = 'all', nat = 'all' }: { results: number, page?: number, gender?: string, nat?: string }, { rejectWithValue }) => {

        try {
            const data = await api.get("", {
               searchParams: {
                   results,
                   page,
                   gender,
                   nat
               }
            }).json();
            // @ts-ignore
            return {data: data.results, curPage: page}
        }
        catch (e) {
            return rejectWithValue(e)
        }
    }
)