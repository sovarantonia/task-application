export class Task {
    constructor(id, title, description, status, assignedUser) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignedUser = assignedUser;
    }
}