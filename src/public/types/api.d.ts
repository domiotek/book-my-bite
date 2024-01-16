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

type ISuccessResponse<T> = {
    status: "Success"
    data: T
}

type IFailureResponse<T> = {
    status: "Failure"
    errCode: T
}


export namespace SignInEndpoint {
    interface IRequest {
        email?: string
        password?: string
    }
    
    type IResponse = ISuccessResponse<undefined> | IFailureResponse<"AlreadySignedIn" | "InvalidCredentials" | "DBError">
}




