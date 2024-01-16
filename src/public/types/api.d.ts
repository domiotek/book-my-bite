interface Location {
    id: number
    name: string
}

interface Foodtype {
    id: number
    name: string
}

interface Restaurants {
    id: number,
    foodtype: string,
    imgUrl: string,
    location: string,
    name: string
}

interface Restaurant {
    name: string,
    description: string,
    location: string,
    foodtype: string,
    menu: string,
    tablesMap: string,
    imgUrl: string
}

type IResponse<T> = {
    data: T
}