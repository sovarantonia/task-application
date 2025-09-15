export async function getPaginatedUsers(paginationDetails) {
  const response = await fetch('http://localhost:5143/User/list/', {
    body: JSON.stringify(paginationDetails),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  return await response.json();
}

export async function getPaginatedTasks(paginationDetails) {
  const response = await fetch('http://localhost:5143/Task/list', {
    body: JSON.stringify(paginationDetails),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  return await response.json();
}

export async function getAllStatuses() {
  const response = await fetch('http://localhost:5143/Status/');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  return await response.json();
}

export async function getAllUsers() {
  const response = await fetch('http://localhost:5143/User/');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  return await response.json();
}

export async function addUser(userToSave) {
  const response = await fetch('http://localhost:5143/User/', {
    body: JSON.stringify(userToSave),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  return await response.json();
}

export async function addTask(taskToSave) {
  const response = fetch('http://localhost:5143/Task/', {
    body: JSON.stringify(taskToSave),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
  });

  return await response.json();
}

export async function updateTask(id, taskToUpdate) {
  const response = await fetch(`http://localhost:5143/Task/${id}`, {
    body: JSON.stringify(taskToUpdate),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }

  return await response.json();
}

export async function getUserByEmail(email) {
  const response = await fetch(`http://localhost:5143/User/${email}`);

  return await response.json();
}
