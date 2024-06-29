import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { ChatService } from "../services/chat-service/chat.service";
import { loadApi, loadApiRes } from "./actions";
import { concatMap, map, of } from "rxjs";

@Injectable()
export class AppEffects {
    loadLoginApi$ = createEffect(() => this.action.pipe(
        ofType(loadApi),
        concatMap(() => {
            return this.chatservice.getAPi('get-user').pipe(map((res) => loadApiRes({ apiData: res })))
        })
    ))
    constructor(private action: Actions, private chatservice: ChatService) { }
}