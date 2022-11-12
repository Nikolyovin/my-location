import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILokations } from "../models/models"

interface IAppState {
    locations: Array<ILokations> | null
    iSModal: boolean
}

const initialState: IAppState = {
    locations: null,
    iSModal: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        iShowModal(state, action: PayloadAction<boolean>) {
            state.iSModal = action.payload
        }
    }
})


export const appActions = appSlice.actions
export const appReducer = appSlice.reducer