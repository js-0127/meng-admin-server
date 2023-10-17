
export class CreateMenuDto {
    icon: string
    name: string
    parentId: number
    type: number
    route: string
    orderNumber?:number
    url?: string
    authCode?: string
    show?: boolean
    filePath?: string
}
