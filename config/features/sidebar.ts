import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import NavigationItems from '../../navigation'

const initialState = {
    data: NavigationItems
}

interface ActiveItemPayload  { 
    path: string
}

export const sideBarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        handleActiveItem: (state, action:PayloadAction<ActiveItemPayload>)=>{
            state.data = state.data.map((item)=>{
                if(item.link===action.payload.path){
                    return {...item, isActive: true}
                }
                else return {...item, isActive: false}
            })
        }
    }
})

export const { handleActiveItem } = sideBarSlice.actions

export default sideBarSlice.reducer