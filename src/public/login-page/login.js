function login(event) {
    event.preventDefault();
    let username = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;
  
    const credentials = { username, password };
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })
      .then(res => {
        if (res.status === 401) {
          document.getElementById('error-message').innerText = 'Invalid Credentials';
        } else if (res.status === 200) {
          return res.json();
        } else {
          document.getElementById('error-message').innerText = 'Failed to Login at this time';
        }
        throw 'Failed to login';
      })
      .then(res => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        if(res.role === 'Administrator'){
          window.location = 'http://localhost:3000/admin/admin-home/adminHome.html';
        } else if(res.role === 'Employee'){
          window.location = 'http://localhost:3000/employee/emp-home/empHome.html';
        }
      })
      .catch(err => {
        console.log(err);
      });
  }