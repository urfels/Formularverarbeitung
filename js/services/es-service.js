function checkElasticSearch(){
  fetch('http://localhost:9200').then(response => response.json()).then(data => console.log(data));
}

function updateEmployee(employee, id){

return fetch('http://localhost:9200/employees/_update/'+id, {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: { 'doc': employee}
}).then(response => response.json())
.then(data => {return(data)});
}

function loadEmployee(_id){
  return fetch('http://localhost:9200/employees/_doc/'+_id)
  .then(response => response.json())
  .then( data => {return data});


}

function deleteEmployee(_id){
  return fetch('http://localhost:9200/employees/_doc/'+_id, {
    method: 'DELETE',

  })
  .then(response => response.json())
  .then(data => {return(data)});
}

function saveEmployee(employee){
  return fetch('http://localhost:9200/employees/_doc', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: employee
}).then(response => response.json())
.then(data => {return(data)});
}

function loadAllEmployees(){
  return fetch('http://localhost:9200/employees/_search/?size=100')
  .then(response => response.json())
  .then( data => {return data.hits.hits});
}
