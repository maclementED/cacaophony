export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    progression?: Progression;
    birthday?: Date;
}

export interface UserDoc {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    progression?: Progression;
    birthday?: Date
}

export interface MoreInfoForm {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthday: Date | string;
    email: string;
}

interface Progression {
    level: number;
    type: DifficultyType;
}

enum DifficultyType {
    SKI = 'SKI',
    SNOW = 'SNOW',
}

export type Role = "ADMIN" | "USER" | undefined