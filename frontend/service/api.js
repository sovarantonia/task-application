export function getPaginatedUsers(paginationDetails) {
  return fetch('http://localhost:5143/User/list/', {
    body: JSON.stringify(paginationDetails),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}

export function getPaginatedTasks(paginationDetails) {
  return fetch('http://localhost:5143/Task/list', {
    body: JSON.stringify(paginationDetails),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}

export function getAllStatuses() {
  return fetch('http://localhost:5143/Status/').then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}

export function getAllUsers() {
  return fetch('http://localhost:5143/User/').then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}

export function addUser(userToSave) {
  return fetch('http://localhost:5143/User/', {
    body: JSON.stringify(userToSave),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}

export function addTask(taskToSave) {
  return fetch('http://localhost:5143/Task/SaveTask/', {
    body: JSON.stringify(taskToSave),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}
