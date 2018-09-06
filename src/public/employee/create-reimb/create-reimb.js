console.log('loading js');

function createReimb(event) {
  event.preventDefault();

  const description = document.getElementById('input-description').value;
  const user = JSON.parse(localStorage.getItem('user'));
  const authorId = user.id;
  const amount = document.getElementById('input-amount').value;
  let reimbType;
  const radios = document.getElementsByName('reimbType');
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked === true){
      reimbType = radios[i].value;
    }
  }
  


  const reimb = {
    description,
    amount,
    reimbType,
    authorId,
  }
  console.log(reimb);
  
  fetch('http://localhost:3000/reimbursement', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reimb)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location = 'http://localhost:3000/employee/emp-home/empHome.html';
  })
  .catch(err => {
    console.log(err);
  });
}