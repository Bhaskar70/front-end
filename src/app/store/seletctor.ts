import { createSelector , createFeatureSelector } from "@ngrx/store";
 interface Data {
 userdata : any,
 apiData :any
}
const featureSelector = createFeatureSelector<Data>('data')
export const loginData = createSelector(featureSelector , (state)=>state.userdata)
export const loadApiRes = createSelector(featureSelector , (state)=>state.apiData)
