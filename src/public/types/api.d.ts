interface Location {
    id: number
    name: string
}

interface Foodtype {
    id: number
    name: string
}

type IResponse<T> = {
    data: T
}