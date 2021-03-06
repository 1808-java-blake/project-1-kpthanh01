console.log('loading js');

function updateReimb(event) {
  event.preventDefault();

  const id = document.getElementById('input-id').value;
  const user = JSON.parse(localStorage.getItem('user'));
  const resolverId = user.id;
  let statusId;
  const radios = document.getElementsByName('statusType');
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked === true){
      statusId = +radios[i].value;
    }
  }
  


  const reimb = {
    id,
    statusId,
    resolverId,
  }
  console.log(reimb);
  
  fetch(`http://localhost:8080/reimbursement/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reimb)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location = 'http://localhost:8080/admin/admin-home/adminHome.html';
  })
  .catch(err => {
    console.log(err);
  });
}