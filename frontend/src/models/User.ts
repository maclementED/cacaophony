export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    photoUrl:string
}

export interface UserPublic {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    photoUrl:string
}

export interface UserDoc {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    birthday?: Date
}

