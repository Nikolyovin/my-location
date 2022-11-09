import { createSlice } from "@reduxjs/toolkit"
import { ILokations } from "../models/models"

interface IAppState {
    locations: Array<ILokations> | null
}

const initialState: IAppState = {
    locations: null
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    }
})