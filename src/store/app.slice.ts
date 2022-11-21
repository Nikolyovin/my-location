import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { ILokations } from "../models/models"

interface IAppState {
    locations: Array<ILokations>
    iSModal: boolean
}

const initialState: IAppState = {
    locations: [
        { coordinates: [500000, 390000], description: 'tetwtwe', id: '1' },
        { coordinates: [500000, 390000], description: 'tetwtwe1', id: '2' },
        { coordinates: [500000, 390000], description: 'tetwtwe2', id: '3' },
        { coordinates: [500000, 390000], description: 'tetwtwe3', id: '4' },
        { coordinates: [500000, 390000], description: 'tetwtwe4', id: '5' },
        { coordinates: [500000, 390000], description: 'tetwtwe5', id: '6' },
        { coordinates: [500000, 390000], description: 'tetwtwe6', id: '7' },
    ],
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
            state.locations?.push(action.payload)
            console.log('state1', state)
        },
        removeLocation(state, action: PayloadAction<string>) {
            state.locations = state.locations?.filter((item) => {
                console.log('item.id',item.id)
                console.log('action.payload', action.payload)
               return item.id !== action.payload})
                console.log(current(state))    
        },
    }
})


export const appActions = appSlice.actions
export const appReducer = appSlice.reducer