
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

type IAPIResponse<D=undefined, E="InternalError", T extends TResponseTypes="Either"> = 
        (T extends "Success" | "Either"?ISuccessResponse<D>:never) 
        |
        (T extends "Failure" | "Either"?IFailureResponse<E | "BadRequest" | "InternalError">:never)

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

    interface ITableAvailability {
        id: number
        isBooked: boolean
    }

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

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<undefined, "UserSignedIn" | "InvalidCredentials",T>;
}

export namespace SignUpEndpoint {
    interface IBody {
        email?: string
        password?: string
        name?: string
        surname?: string
        phone?: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<undefined, "UserSignedIn" | "UserExists",T>;
}

export namespace CheckSignInEndpoint {
    type IResponse = {
        status: "Success",
        data: boolean
    }
}

export namespace GetTableMapEndpoint {
    interface IParams {
        id?: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<TableMap.ITableMapDefinition,"NoEntity", T>
}

export namespace GetTableAvailabilityEndpoint {

    interface IParams {
        restaurantID?: string,
        dateTime?: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<TableMap.ITableAvailability[], "NoEntity", T>
}


export namespace CreateReservationEndpoint {
    interface IBody {
        datetime?: string, 
        tableID?: string, 
        numOfClients?: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<undefined, "Unauthorized" | "NoEntity", T>
}

export namespace GetHomePageFoodTypesEndpoint {
    interface IFoodType {
        id: number
        name: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<IFoodType[], "InternalError", T>
}

export namespace GetUserBookingsEndpoint {
    interface IBookingData {
        id: number,
        clients: number,
        restaurantName: string,
        location: string,
        datetime: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<IBookingData[], "Unauthorized", T>
}

export namespace DeleteBookingEndpoint {

    interface IParams {
        id: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<undefined, "Unauthorized" | "NoEntity", T>
}

export namespace GetRestaurantSearchParamsEndpoint {

    interface ILocation {
        id: number
        name: string
    }
    
    interface IFoodtype {
        id: number
        name: string
    }

    interface IResponseData {
        foodtypes: IFoodtype[]
        locations: ILocation[]
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<IResponseData, "InternalError", T>
}

export namespace GetRestaurantsEndpoint {

    interface IRestaurantData {
        id: number,
        foodtype: string,
        imgUrl: string,
        location: string,
        name: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<IRestaurantData[], "InternalError", T>
}

export namespace GetRestaurantEndpoint {

    interface IParams {
        id: string
    }

    interface IDetailedRestaurantData {
        name: string,
        description: string,
        location: string,
        foodtype: string,
        menu: string,
        imgUrl: string
    }

    type IResponse<T extends TResponseTypes="Either"> = IAPIResponse<IDetailedRestaurantData, "NoEntity", T>
}