export interface User {
    _id  : string ,
    name : string,
    email : string
}

export interface ContactList {
    _id  : string ,
    id  : string ,
    friends : Friend[]
}

export interface Friend extends User {
   isFriend :boolean,
   chatId : string,
   showModel? : boolean
}
