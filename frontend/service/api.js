export function getPaginatedUsers(paginationDetails) {
    return fetch("http://localhost:5143/User/list/", {
        body: JSON.stringify(paginationDetails),
        headers: {
      "Content-Type": "application/json"
    },
        method: "POST",
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then((text) => {
            throw new Error("Error " + response.status + " " + text);
        })
        
      }
      return response.json();
    });
}

export function getPaginatedTasks(paginationDetails){
    return fetch("http://localhost:5143/Task/list", {
        body: JSON.stringify(paginationDetails),
        headers: {
      "Content-Type": "application/json"
    },
        method: "POST",
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then((text) => {
            throw new Error("Error " + response.status + " " + text);
        })
        
      }
      return response.json();
    });
}
