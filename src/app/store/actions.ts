import { createAction , props } from "@ngrx/store";

export const loadLoginApi = createAction('[Login Component] load login api',props<{data :any}>())
export const loadApi = createAction('[Login Component] load login')
export const loadApiRes = createAction('[Login Component] load res' , props<{apiData : any}>())
