import { initialData } from "./initialData.js";

export class LoadData {
   
    loadData() {
        return new Promise((resolve) => {
           resolve(initialData);
        })
    }
}



