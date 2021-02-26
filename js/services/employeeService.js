class EmployeeService {

  static init(){

//checkElasticSearch();
var employees = loadAllEmployees();
var array = employees.then(data =>  {
  for (var i=0; i < data.length; i++) {
    var _id = data[i]._id;
    var empl = data[i]._source;
    console.log(empl)
    var newEmployee = new Employee (_id, empl.name, empl.email, empl.role, empl.lastModified )
    if(newEmployee instanceof Employee){
      EmployeeService.createEmployeeLine(newEmployee);
    }
  }
});

}
  //  var myLocalStorage = window.localStorage;
  //  console.log(myLocalStorage);

  //for (var key in myLocalStorage) {
    // hole json string aus local storage
    //var employee = myLocalStorage.getItem(key);
    //console.log(employee);
    // parse json string to class Emplyee
//    try {
  //    var empl = JSON.parse(employee);
  //    var newEmployee = new Employee(empl.id, empl.name, empl.email, empl.role, empl.lastModified);
  //    if(newEmployee instanceof Employee){
    //    console.log("JO Mitarbeiter wiederhergestellt");
      //   EmployeeService.createEmployeeLine(newEmployee);
  //    }
  //  } catch (e) {
    //  console.log(e);
  //  }
//  }
//}

static changeEmployee(){
  var id = document.getElementById("id_dialog_id").value;
  var name = document.getElementById("id_dialog_name").value;
  var email = document.getElementById("id_dialog_e-mail").value;
  var role = document.getElementById("id_dialog_role").value;
  var lastModified = new Date();


  var employee = new Employee(id, name, email, role, lastModified);

var jsonEmpl = JSON.stringify(employee);

var data = updateEmployee(jsonEmpl, id);


data.then(data => {
  var result = data.result;
  if(result === 'updated'){
    alert("Mitarbeiter wurde aktualiseiert");
    var div = document.getElementById(id);
    console.log(div);
    div.remove();
      EmployeeService.createEmployeeLine(employee);
  }
  else{
    alert("Mitarbeiter wurde nicht aktualisiert")
  }
})

}

  static processForm(event){
    var empl = JSON.parse(window.localStorage.getItem(event.target.id));
    var data = loadEmployee(event.target.id);
    data.then(data => {
      document.getElementById("id_dialog_name").value = data._source.name;
      document.getElementById("id_dialog_e-mail").value = data._source.email;
      document.getElementById("id_dialog_role").value = data._source.role;
      document.getElementById("id_dialog_id").value = data._id;
    })

  }

static createEmployeeLine(employee){
  var alle_zeilen = document.getElementById("userContent").innerHTML;
  var row = "<div id="+ employee.id +" class='row'>"+
     "<div class='col'>" + employee.name + "</div>"+
     "<div class='col'>" + employee.email + "</div>"+
     "<div class='col'>" + employee.role + "</div>"+
     "<div class='col'>" + moment(employee.lastModified).format('DD.MM.YYYY HH:mm:ss') + "</div>"+
     "<div class='col'>"+
        "<button class='button' onClick='EmployeeService.deleteEmployee(event)'><i id="+employee.id+" class='fa fa-trash'></i></button>"+
        "<button class='button' data-bs-toggle='modal' data-bs-target='#exampleModal' onClick='EmployeeService.processForm(event)'><i id="+employee.id+" class='fa fa-wrench'></i></button>"+
        "</div>"+
     "</div>"

     console.log(document);
  alle_zeilen = alle_zeilen + row;
  document.getElementById("userContent").innerHTML = alle_zeilen;
}

  static deleteEmployee(event){
    console.log("Event:"+event.target.id);

  //  var myLocalStorage = window.localStorage;
  //  myLocalStorage.removeItem(event.target.id);

    var data = deleteEmployee(event.target.id);
    data.then(data => {
      var result = data.result;
      if(result === 'deleted'){
        alert("Mitarbeiter wurde gelöscht");
        var idToDelete = event.target.id;
        var myobj = document.getElementById(idToDelete);
        myobj.remove();
      }
      else{
        alert("Mitarbeiter wurde nicht gelöscht")
      }
    })

//    var idToDelete = event.target.id;
  //  var myobj = document.getElementById(idToDelete);
  //  myobj.remove();
  }

  static addEmployee(event){

    var name = document.getElementById("id_name").value;
    var email = document.getElementById("id_e-mail").value;
    var role = document.getElementById("id_role").value;
    var id = new Date().getTime();
    var lastModified = new Date();
  console.log("add: "+lastModified);
    var employee = new Employee(id, name, email, role, lastModified);
    var jsonEmpl = JSON.stringify(employee);
    var data = saveEmployee(jsonEmpl);
    data.then(
      data => {
        var _id = data._id;
        employee.id = _id;
         EmployeeService.createEmployeeLine(employee);
      });

  //  console.log(employee);

  //  var myLocalStorage = window.localStorage;
  //  myLocalStorage.setItem(employee.id, JSON.stringify(employee) );

//   EmployeeService.createEmployeeLine(employee);


  }

  static roleChange(event){
    console.log(event.target.value);
  }

  static valueChange(event){
    console.log(event.target.value);
  }
}
