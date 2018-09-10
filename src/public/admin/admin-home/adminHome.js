function addAllReimbToTable(ticket) {
    const tbody = document.getElementById('movie-table-body');
    tbody.innerHTML += `
      <tr>
        <th scope="row">${ticket.id}</th>
        <td>${ticket.authorFirstname} ${ticket.authorLastname}</td>
        <td>${ticket.description}</td>
        <td>${ticket.amount}</td>
        <td>${ticket.reimbType}</td>
        <td>${ticket.reimbStatus}</td>
        <td>${ticket.submitted}</td>
        <td>${ticket.resolved}</td>
      </tr>
      `
  }

fetch(`http://localhost:8080/reimbursement`)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        res.forEach(ticket => {
            addAllReimbToTable(ticket);
        })
    })
    .catch(err => {
        console.log(err)
    })
