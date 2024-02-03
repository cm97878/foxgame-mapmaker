export interface AreaData {
    areaSpecialID?: string;
    customFunc?: string;
    areaName: string;
    zone: Zone;
    description: string;
    killCount: number;
    scoutThreshold: number;
    interactable?: boolean;
    handles: string[];
}

export enum SpecialAreaId {
    HOME = "Home",
    CLEARING = "Clearing"
}

export enum Zone {
    SPECIAL = "special",
    FOREST = "forest",
    DEEP_FOREST = "deep_forest"
}