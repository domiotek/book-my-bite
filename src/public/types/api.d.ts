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
    message?: string
}

type TResponseTypes = "Success" | "Failure" | "Either";

type IAPIResponse<D=undefined, E="DBError", T extends TResponseTypes="Either"> = 
        (T extends "Success" | "Either"?ISuccessResponse<D>:never) 
        |
        (T extends "Failure" | "Either"?IFailureResponse<E | "BadRequest" | "DBError">:never)

export namespace TableMap {
    interface IRectTableData {
        type: "Rect"
        id: number,
        name: string
        x: number
        y: number
        width: number
        height: number
        rotation?: number
        minPeople: number
        maxPeople: number
    }
    
    interface IRoundTableData {
        type: "Round"
        id: number
        name: string
        x: number
        y: number
        radius: number
        minPeople: number
        maxPeople: number
    }
    
    interface IDecorData {
        x: number
        y: number
        width: number
        height: number
        label?: string
    }
    
    type ITableData = IRoundTableData | IRectTableData;

    interface ITableMapDefinition {
        width: number, 
        height: number, 
        tables: ITableData[], 
        decors: IDecorData[]
    }
}

export namespace SignInEndpoint {
    interface IRequest {
        email?: string
        password?: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<undefined, "AlreadySignedIn" | "InvalidCredentials",T>;
}

export namespace CheckSignInEndpoint {
    type IResponse = {
        status: "Success",
        data: boolean
    }
}

export namespace GetTableMapEndpoint {
    interface IRequest {
        id?: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<TableMap.ITableMapDefinition,"NoEntity", T>
}




