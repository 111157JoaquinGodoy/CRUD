//Variables Globales

const formularioUI = document.querySelector('#formulario');
const listaElementossUI = document.getElementById('listaElementos');
let arrayElementos = [];




//Funciones

const CrearItem = (elemento) => {

    let item = {
        elemento: elemento
    }

    arrayElementos.push(item);

    return item
}

const GuardarDB = () => {
    localStorage.setItem('cosas', JSON.stringify(arrayElementos));
    LeerDB();

}

const LeerDB = () => {
    listaElementossUI.innerHTML = '';

    arrayElementos = JSON.parse(localStorage.getItem('cosas'));
    if(arrayElementos === null) {
        arrayElementos = [];
    } else {

        arrayElementos.forEach((elemento, index) => {
            listaElementossUI.innerHTML += 
            `<div class="alert alert-primary" role="alert"><b>${elemento.elemento}</b><span class="float-right"><i href="#" class="material-icons" onClick="EditarDB(${index})">edit</i><i href="#" class="material-icons ml-1" onClick="EliminarDB(${index})">delete</i></span></div>`
        });        
    }
}

const EliminarDB = (i) => {
    arrayElementos.splice(i,1);
    GuardarDB();
}

const EditarDB = (i) => {
    listaElementossUI.innerHTML = '';
    arrayElementos.forEach((elemento, index) => {
        if(index == i) {
            listaElementossUI.innerHTML +=
            `<div class="alert alert-warning" role="alert"><input id="nuevoElemento" placeholder="${elemento.elemento}"></input><span class="float-right"><i href="#" class="material-icons" onClick="ActualizarDB(${i})">done</i><i href="#" class="material-icons ml-1" onClick="LeerDB()">not_interested</i></span></div>`
        } else {
            listaElementossUI.innerHTML +=
            `<div class="alert alert-primary" role="alert"><b>${elemento.elemento}</b><span class="float-right"><i href="#" class="material-icons" onClick="EditarDB(${index})">done</i><i href="#" class="material-icons ml-1">delete</i></span></div>`
        }
    });    
}

const ActualizarDB = (i) => {
    let elementoNuevo = document.querySelector('#nuevoElemento').value;
    
    if(elementoNuevo === "") {
        alert("Escriba algo");
    } else {  
        let item = {
            elemento: elementoNuevo
        }      
        arrayElementos.splice(i, 1, item);
        GuardarDB();
    }
}

//EventListener

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let elementoUI = document.querySelector('#elemento').value;
    if(elementoUI === "") {
        alert("Escriba algo");
    } else {
        CrearItem(elementoUI);
        GuardarDB();
    }

    formularioUI.reset();
});


document.addEventListener('DOMContentLoaded', LeerDB);

