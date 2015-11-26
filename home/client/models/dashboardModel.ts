import {CommandModel} from "./commandModel";
import {ItemModel} from "./itemModel";

export enum DashboardType {
    ITEM = 0,
    SHORTCUT = 1,
    GRAPH = 2
}

export interface DashboardModel {
    id: string,
    type: DashboardType,
    title?: string,
}

export interface DashboardShortcutModel extends DashboardModel {
    commands: Array<CommandModel>
}

export interface DashboardItemModel extends DashboardModel {
    item: ItemModel
}