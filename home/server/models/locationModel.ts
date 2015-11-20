export class LocationType {
    static LIVING_ROOM = 'livingroom';
    static BEDROOM = 'bedroom';
    static KITCHEN = 'kitchen';
    static OUTSIDE = 'outside';
    static BATHROOM = 'bathroom';
    static HALL = 'hall';
    static TOILET = 'toilet';
    static OTHER = 'other';
}

export interface LocationModel {
    _id?: string,
    type?: LocationType,
    title?: string
}