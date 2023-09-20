export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput] (input);
    };
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    };   
    
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];


const mensajesDeError = {
    nombre: {
        valueMissing: "El campo no puede estar vacio",
    },
    email: {
        valueMissing: "El campo no puede estar vacio",
        typeMismatch: "este correo no es valido",
    },
    password: {
        valueMissing: "El campo no puede estar vacio.",
        patternMismatch: "debe tener 6 o más carácteres.",
    },
    nacimiento:{
        valueMissing: "El campo no puede estar vacio.",
        customError: "debes tener al menos 18 años de edad."
    },
    numero: {
        valueMissing: "El campo no puede estar vacio.",
        patternMismatch: "el formato requerido XXXXXXXXXX 10 numeros.",
    },
    direccion: {
        valueMissing: "El campo no puede estar vacio.",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "El campo no puede estar vacio.",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
    },
    estado: {
        valueMissing: "El campo no puede estar vacio.",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres.",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje ="";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        };
    });


    return mensaje;

}


function validarNacimiento(input) {
    const fechaClienta = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaClienta)) {
        mensaje = "debes tener al menos 18 años de edad.";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDay()
    );
    return(diferenciaFecha <= fechaActual);
}

