export interface Task {
    id: string;
    title: string;
    description?: string;
    creationDate?: Date;
    userId: string;
    statusId: number;
}
