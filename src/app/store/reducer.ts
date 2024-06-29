import { createReducer , on } from "@ngrx/store";
import { loadApi, loadApiRes, loadLoginApi } from "./actions";

const initialState ={
    userdata : {},
    
}

const reducer = createReducer(
    initialState, 
    on(loadLoginApi , (state , action)=>({...state , userdata : action.data})),
    on(loadApiRes , (state , action)=>({...state , apiData : action.apiData})),

)

export function AppReducer(state , action) {
   return reducer(state , action)
}