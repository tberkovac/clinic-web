export interface Admission {
    admissionId?: number,
    admissionDate: Date,
    patientName: string,
    doctorName: string,
    isEmergency: boolean 
}