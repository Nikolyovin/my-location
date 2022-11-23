import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { AsyncStorage } from "react-native"
import { ILokations } from "../models/models"

const keyAsyncStorage = 'locations'

interface IAppState {
    locations: Array<ILokations>
    iSModal: boolean
    isNotification: boolean
    isNotificationError: boolean
    isLoading: boolean
}

const initialState: IAppState = {
    locations:  JSON.parse(localStorage.getItem(keyAsyncStorage) ?? '[]') ,
    iSModal: false,
    isNotification: false,
    isNotificationError: false,
    isLoading: false
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
            AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(state.locations))
        },
        removeLocation(state, action: PayloadAction<string>) {
            state.locations = state.locations?.filter((item) => item.id !== action.payload)
            AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(state.locations))
        },
        isShowNotification(state, action: PayloadAction<boolean>) {
            state.isNotification = action.payload
        },
        isShowNotificationError(state, action: PayloadAction<boolean>) {
            state.isNotificationError = action.payload
        },
        isShowLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
    }
})


export const appActions = appSlice.actions
export const appReducer = appSlice.reducer