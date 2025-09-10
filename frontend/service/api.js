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
  return fetch('http://localhost:5143/Task/', {
    body: JSON.stringify(taskToSave),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) {
      // return response.text().then((text) => {
      //   throw new Error('Error ' + response.status + ' ' + text);
      // });
      alert("Invalid credentials");
      return null;
    }
    return response.json();
  });
}

export function updateTask(id, taskToUpdate) {
  return fetch(`http://localhost:5143/Task/${id}`, {
    body: JSON.stringify(taskToUpdate),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error('Error ' + response.status + ' ' + text);
      });
    }
    return response.json();
  });
}

export async function getUserByEmail(email) {
  const response = await fetch(`http://localhost:5143/User/${email}`);
  if (!response.ok) {
    return null;
  }

  return await response.json();
}
