function addReimbToTable(reimb) {
  const tbody = document.getElementById('movie-table-body');
  tbody.innerHTML += `
    <tr>
      <th scope="row">${reimb.description}</th>
      <td>${reimb.amount}</td>
      <td>${reimb.reimbType}</td>
      <td>${reimb.reimbStatus}</td>
      <td>${reimb.submitted}</td>
      <td>${reimb.resolved}</td>
    </tr>
    `
}
let user = JSON.parse(localStorage.getItem('user'));
fetch(`http://localhost:8080/users/${user.id}`)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    res.reimbTicket.forEach(reimb => {
      addReimbToTable(reimb);
    })
  })
  .catch(err => {
    console.log(err);
  })