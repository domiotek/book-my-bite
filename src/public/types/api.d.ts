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
    
    type IResponse<T extends "Success" | "Failure" | "Either"="Either"> = 
        (T extends "Success" | "Either"?ISuccessResponse<undefined>:never) 
        |
        (T extends "Failure" | "Either"?IFailureResponse<"AlreadySignedIn" | "InvalidCredentials" | "DBError">:never)
}

export namespace CheckSignInEndpoint {
    type IResponse = {
        status: "Success",
        data: boolean
    }
}




