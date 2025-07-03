import { initialData } from "./initialData";

export class DbService {
    constructor() {
        this.objectList = initialData;
    }

    save({objToSave}) {
        return new Promise((resolve) => {
            this.objectList.push(objToSave);
            resolve(objToSave);
        })
    }

    update(id, {props}) {
        return new Promise((resolve, reject) => {
            const objToFind = this.objectList.find(obj => obj.id === id);
            if(objToFind !== undefined) {
                Object.assign(objToFind, props);
                resolve(objToFind, {props});
            }
            else {
                reject(`Object with id ${id} not found`);
            }
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const index = this.objectList.findIndex(o => o.id === id);
            if (index !== -1) {
                const removed = this.objectList.splice(index, 1)[0];
                resolve(removed); 
            }
            else {
                reject(`Object with id ${id} not found`);
            }
        })
    }

    findById(objId) {
        return new Promise((resolve, reject) => {
            const objToFind = this.objectList.find(obj => obj.id === objId);
            if(objToFind !== undefined) {
                resolve(objToFind);
            }
            else {
                reject(`Object with id ${objId} not found`);
            }
        })
    }
}