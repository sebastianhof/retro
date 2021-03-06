export enum LocationType {
    LIVING_ROOM = 0,
    BEDROOM = 1,
    KITCHEN = 2,
    OUTSIDE = 3,
    BATHROOM = 4,
    HALL = 5,
    TOILET = 6,
    OTHER = 7,
}

export interface LocationModel {
    id: string,
    type: LocationType,
    title?: string
}