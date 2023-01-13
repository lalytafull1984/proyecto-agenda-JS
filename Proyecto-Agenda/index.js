//Validación de formulario de Login
const divForm = document.getElementById("formContainer");
const divContacts = document.getElementById("contacts");

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", validLoginform);

  if (localStorage.getItem("logueado") !== "nologueado") {
    divForm.classList.add("fadeFContainer");
    divContacts.classList.remove("contList");
    return;
  }
});

function validLoginform(e) {
  e.preventDefault();

  let user = document.getElementById("UserName").value;
  let password = document.getElementById("Password").value;
  let userType = document.getElementById("UserType").value;
  if (user === "admin" && password === "admin123" && userType === "Admin") {
    divForm.classList.add("fadeFContainer");
    divContacts.classList.remove("contList");
    localStorage.setItem("logueado", "admin")
    return;
  } else if (
    user === "viewer" &&
    password === "v123" &&
    userType === "Usuario"
  ) {
    divForm.classList.add("fadeFContainer");
    divContacts.classList.remove("contList");
    localStorage.setItem("logueado", "usuario")
    return;
  } else {
    localStorage.setItem("logueado", "nologueado")
    alert("Datos incorrectos / No eres un usuario registrado");
  }
  this.submit();
}

//Tabla en donde ingresará la lista de contactos
const tableContainer = document.getElementById("contactTableContainer");
const contactTable = document.createElement("table");
contactTable.classList.add("table", "table-hover", "mt-4", "mb-4");
const tblHead = document.createElement("thead");
const trHead = document.createElement("tr");
trHead.className = "table-primary";
const thTitle1 = document.createElement("th");
thTitle1.className = "table-primary";
thTitle1.scope = "col";
thTitle1.textContent = "Nombre";
const thTitle2 = document.createElement("th");
thTitle2.className = "table-primary";
thTitle2.scope = "col";
thTitle2.textContent = "Teléfono";
const thTitle3 = document.createElement("th");
thTitle3.className = "table-primary";
thTitle3.scope = "col";
thTitle3.textContent = "Email";
const thTitle4 = document.createElement("th");
thTitle4.className = "table-primary";
thTitle4.scope = "col";
thTitle4.textContent = "Acciones";
const tblBody = document.createElement("tbody");

trHead.appendChild(thTitle1);
trHead.appendChild(thTitle2);
trHead.appendChild(thTitle3);
trHead.appendChild(thTitle4);
tblHead.appendChild(trHead);
contactTable.appendChild(tblHead);
contactTable.appendChild(tblBody);
tableContainer.appendChild(contactTable);


//Función para añadir contactos a través del botón submit del formulario
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", createContact);
});

function LS_traerContactos() {
  return JSON.parse(localStorage.getItem("Contacts")) || []
}

function LS_grabarContacto(contacto) {
  let contactos = LS_traerContactos();
  contactos.push(contacto)
  localStorage.setItem("Contacts", JSON.stringify(contactos))
}
function dibujarContactosLS() {
  const contactos = LS_traerContactos()
  const listTable = document.querySelector(
    "#contactTableContainer table tbody"
  );
  listTable.innerHTML = "";
  contactos.forEach((c) => {
    agregarContactoATabla(c)
  })
}
function LS_borrarContacto(i) {
  let contactos = LS_traerContactos()
  contactos.splice(i, 1)
  localStorage.setItem("Contacts", JSON.stringify(contactos))
}
function agregarContactoATabla(myContact) {
  const newRow = document.createElement("tr");
  const newTh = document.createElement("th");
  newTh.scope = "row";
  newTh.textContent = myContact.cName;
  const newTd1 = document.createElement("td");
  newTd1.textContent = myContact.cPhone;
  const newTd2 = document.createElement("td");
  newTd2.textContent = myContact.cEmail;
  const newTd3 = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete";
  deleteButton.classList = "btn btn-sm btn-primary adminbtn";
  deleteButton.textContent = "Borrar";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.remove();
    let contactos = LS_traerContactos()
    let i = contactos.findIndex((c) => {
      if (c.cName === myContact.cName && c.cPhone === myContact.cPhone && c.cEmail === myContact.cEmail) {
        return true
      }
    })
    LS_borrarContacto(i)
    dibujarContactosLS()
  });
  newTd3.appendChild(deleteButton);
  newRow.appendChild(newTh);
  newRow.appendChild(newTd1);
  newRow.appendChild(newTd2);
  newRow.appendChild(newTd3);
  const listTable = document.querySelector(
    "#contactTableContainer table tbody"
  );
  listTable.appendChild(newRow);
}

function createContact(e) {
  e.preventDefault();

  class Contact {
    constructor(cName, cPhone, cEmail) {
      this.cName = cName;
      this.cPhone = cPhone;
      this.cEmail = cEmail;
    }
  }

  let name = document.getElementById("Name").value;
  let phone = document.getElementById("Phone").value;
  let email = document.getElementById("Email").value;
  let myContact = new Contact(name, phone, email);

  // let dataBase = JSON.parse(localStorage.getItem("Contact")) || [];
  // dataBase.push(myContact);
  LS_grabarContacto(myContact);
  //console.log(dataBase);

  // let dataBaseJSON = JSON.stringify(dataBase);
  // localStorage.setItem("Contact", dataBaseJSON);
  dibujarContactosLS()
  // addContacts();

  // function addContacts() {
  //   for (let i = 0; i < dataBase.length; i++) {
  //     addNewRow();
  //     return;
  //   }
  // }

  const form = document.getElementById("contactForm");
  form.reset();
}

// document.addEventListener("DOMContentLoaded", function (e) {
//   let contactArray = JSON.parse(localStorage.getItem("Contact"));
//   contactArray.forEach((element) => {
//     addNewRow(element);
//     console.log("se está cargando el elemento");
//   });
// });
