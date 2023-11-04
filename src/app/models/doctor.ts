import { Title } from "@angular/platform-browser";

export interface Doctor {
    doctorId: number,
    name: string,
    surname: string,
    title: Title,
    code: string
}