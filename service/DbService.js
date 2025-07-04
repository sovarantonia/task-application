export class DbService {
    constructor(initialData) {
        this.objectList = initialData;
    }

    save(objToSave) {
        return new Promise((resolve) => {
            this.objectList.push(objToSave);
            resolve(objToSave);
        })
    }

    update(id, props) {
        return new Promise((resolve, reject) => {
            const objToFind = this.objectList.find(obj => obj.id === id);
            if(!objToFind) {
                return reject(`Object with id ${id} not found`);
            }

            Object.assign(objToFind, props);
            resolve(objToFind);   
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

    getAll() {
       return new Promise((resolve) => {
        resolve(this.objectList);
       }) 
    }
}