console.log('loading js');

function createReimb(event) {
  event.preventDefault();

  const description = document.getElementById('input-description').value;
  const user = JSON.parse(localStorage.getItem('user'));
  const authorId = user.id;
  const amount = document.getElementById('input-amount').value;
  let reimbTypeId;
  const radios = document.getElementsByName('reimbType');
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked === true){
      reimbTypeId = +radios[i].value;
    }
  }
  


  const reimb = {
    description,
    amount,
    reimbTypeId,
    authorId,
  }
  console.log(reimb);
  
  fetch('http://localhost:8080/reimbursement/create', {
    method: 'POST',
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