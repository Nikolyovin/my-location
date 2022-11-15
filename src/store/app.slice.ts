import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILokations } from "../models/models"

interface IAppState {
    locations: Array<ILokations>
    iSModal: boolean
}

const initialState: IAppState = {
    locations: [],
    iSModal: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        iShowModal(state, action: PayloadAction<boolean>) {
            state.iSModal = action.payload
        },
        addLocation(state, action: PayloadAction<ILokations>) {
            console.log('action', action);


            state.locations?.push(action.payload)
            console.log('state', state);
        }
    }
})


export const appActions = appSlice.actions
export const appReducer = appSlice.reducer