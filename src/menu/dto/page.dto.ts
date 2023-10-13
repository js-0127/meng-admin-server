import {} from 'class-validator'

export class pageDto {
    page: string | number
    size: string | number
    route?: string
}