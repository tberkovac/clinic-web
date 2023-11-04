import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface Admission {
    admissionId?: number,
    admissionDate: Date,
    patientId: number,
    patient: Patient,
    doctorId: number,
    doctor: Doctor,
    recordId?: number
    isEmergency: boolean,
}