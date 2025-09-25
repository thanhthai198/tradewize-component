export type Photo = {
    uri: string;
    name: string;
    dateAdded: number;
};
export declare function getAllowedPhotos(): Promise<Photo[]>;
