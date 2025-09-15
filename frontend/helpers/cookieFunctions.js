import { getUserByEmail } from '../service/api.js';

export function setCookie(name, value, expDays) {
  const date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

export function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function deleteCookie() {
  setCookie('email', '', -1);
  alert('Cookie removed');
}

export async function checkCookie() {
  if (getCookie('email')) {
    alert('Welcome again ' + getCookie('email'));
    return;
  }

  const user = prompt('Please enter your email:', '');
  if (user != null) {
    const response = await getUserByEmail(user);

    if (response.statusCode) {
      alert(response.message);
      return;
    }

    setCookie('email', user, 30);
    alert('User set');
  }
}
