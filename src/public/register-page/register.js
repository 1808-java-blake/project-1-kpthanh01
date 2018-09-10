function register(event) {
    event.preventDefault();
    let username = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;
    let firstname = document.getElementById('inputFirstname').value;
    let lastname = document.getElementById('inputLastname').value;
    let email = document.getElementById('inputEmail').value;
  
    const credentials = { username, password, firstname, lastname, email };
    fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })
      .then(res => {
          console.log(res);
        if (res.status === 401) {
          document.getElementById('error-message').innerText = 'Invalid Credentials';
        } else if (res.status === 201) {
          return res;
        } else {
          document.getElementById('error-message').innerText = 'Failed to Login at this time';
        }
        throw 'Failed to create account';
      })
      .then(res => {
        console.log(res);
        // localStorage.setItem('user', JSON.stringify(res));
        window.location = 'http://localhost:8080/admin/admin-home/adminHome.html';
      })
      .catch(err => {
        console.log(err);
      });
  }