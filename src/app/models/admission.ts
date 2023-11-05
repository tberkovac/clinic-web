import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Record } from "./record";

export interface Admission {
    admissionId?: number,
    admissionDate: Date,
    patientId: number,
    patient: Patient,
    doctorId: number,
    doctor: Doctor,
    recordId?: number
    record: Record
    isEmergency: boolean,
}