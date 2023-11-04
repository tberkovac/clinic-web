import { Gender } from "./gender";

export interface Patient {
    patientId: number,
    fullName: string,
    dateOfBirth: Date,
    umcn: string,
    gender: Gender, 
    adress?: string,
    phoneNumber?: string
}
