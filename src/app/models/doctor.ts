import { Title } from "@angular/platform-browser";

export interface Doctor {
    doctorId: number,
    name: string,
    surname: string,
    titleId: number,
    title: Title,
    code: string,
    password: string
}