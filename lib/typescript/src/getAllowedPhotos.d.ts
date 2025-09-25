export type Photo = {
    uri: string;
    name: string;
    dateAdded: number;
    type: string;
    size: number;
};
export declare function getAllowedPhotos(): Promise<Photo[]>;
