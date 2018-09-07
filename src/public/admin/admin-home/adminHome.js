function addAllReimbToTable(reimb) {
    const tbody = document.getElementById('movie-table-body');
    tbody.innerHTML += `
      <tr>
        <th scope="row">${reimb.id}</th>
        <td>${reimb.description}</td>
        <td>${reimb.amount}</td>
        <td>${reimb.reimbType}</td>
        <td>${reimb.reimbStatus}</td>
        <td>${reimb.submitted}</td>
        <td>${reimb.resolved}</td>
      </tr>
      `
  }

fetch(`http://localhost:3000/reimbursement`)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // res.forEach(ticket => {
        //     addAllReimbToTable(ticket);
        // })
    })
    .catch(err => {
        console.log(err)
    })
