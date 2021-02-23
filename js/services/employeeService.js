class EmployeeService {

  static init(){
    var myLocalStorage = window.localStorage;
    console.log(myLocalStorage);

  for (var key in myLocalStorage) {
    // hole json string aus local storage
    var employee = myLocalStorage.getItem(key);
    //console.log(employee);
    // parse json string to class Emplyee
    try {
      var empl = JSON.parse(employee);
      var newEmployee = new Employee(empl.id, empl.name, empl.email, empl.role, empl.lastModified);
      if(newEmployee instanceof Employee){
        console.log("JO Mitarbeiter wiederhergestellt");
         EmployeeService.createEmployeeLine(newEmployee);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

static changeEmployee(){
  var id = document.getElementById("id_dialog_id").value;
  var name = document.getElementById("id_dialog_name").value;
  var email = document.getElementById("id_dialog_e-mail").value;
  var role = document.getElementById("id_dialog_role").value;
  var lastModified = new Date();
  console.log("change: "+lastModified);

  var employee = new Employee(id, name, email, role, lastModified);
  window.localStorage.setItem(id, JSON.stringify(employee));

  var div = document.getElementById(id);
  console.log(div);
  div.remove();

  EmployeeService.createEmployeeLine(employee);
}

  static processForm(event){
    var empl = JSON.parse(window.localStorage.getItem(event.target.id));
    document.getElementById("id_dialog_name").value = empl.name;
    document.getElementById("id_dialog_e-mail").value = empl.email;
    document.getElementById("id_dialog_role").value = empl.role;
    document.getElementById("id_dialog_id").value = empl.id;
  }

static createEmployeeLine(employee){
  var alle_zeilen = document.getElementById("userContent").innerHTML;
  var row = "<div id="+ employee.id +" class='row'>"+
     "<div class='col'>" + employee.id + "</div>"+
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

    var myLocalStorage = window.localStorage;
    myLocalStorage.removeItem(event.target.id);

    var idToDelete = event.target.id;
    var myobj = document.getElementById(idToDelete);
    myobj.remove();
  }

  static addEmployee(event){

    var name = document.getElementById("id_name").value;
    var email = document.getElementById("id_e-mail").value;
    var role = document.getElementById("id_role").value;
    var id = new Date().getTime();
    var lastModified = new Date();
  console.log("add: "+lastModified);
    var employee = new Employee(id, name, email, role, lastModified);
    console.log(employee);

    var myLocalStorage = window.localStorage;
    myLocalStorage.setItem(employee.id, JSON.stringify(employee) );

   EmployeeService.createEmployeeLine(employee);


  }

  static roleChange(event){
    console.log(event.target.value);
  }

  static valueChange(event){
    console.log(event.target.value);
  }
}
