//Declaración de variables

var nombreUsuario = "Esdras";
var masculino = true;
var saldoCuenta = 3500;
var limiteExtraccion = 1500;
var servAgua = 350;
var servTel = 425;
var servLuz = 210;
var servInter= 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var codigoSeg = 2790;
var saldoProtegido;
var intentos = 0;
var bloqueado = false;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	iniciarSesion();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	if (bloqueado) {
		return;
	}
	var nuevoLimite = pedirInput("Ingrese su nuevo límite de extracción");
	if(revisarBilletes(nuevoLimite)) {
		limiteExtraccion = nuevoLimite;
		actualizarLimiteEnPantalla();
		alert("Su nuevo límite de extraccion es $"+limiteExtraccion);
	} else if (nuevoLimite == "ingreso no valido" || nuevoLimite < 100){
		alert("Por favor asegúrese de ingresar su nuevo límite usando un número que use solo billetes de $100.");
	} else {
		return;
	}
}

function extraerDinero() {
	if (bloqueado) {
		return;
	}
	var saldoInicial = saldoCuenta;
	var extraccion = pedirInput("Cuanto dinero está depositando?");
	if (revisarBilletes(extraccion) && extraccion >= 100){
		if (extraccion > saldoCuenta) {
			alert("No hay saldo disponible en su cuenta para extraer esa cantidad de dinero.");
		} else if (extraccion > limiteExtraccion) {
			alert("La cantidad de dinero que desea extraer es mayor a su límite de extracción.");
		} else {
			restarAlSaldo(extraccion);
			actualizarSaldoEnPantalla();
			alert("Ha retirado: $"+extraccion+"\nSaldo anterior: $"+saldoInicial+"\nSaldo Actual: $"+saldoCuenta);
		}
	} else if (extraccion == "vacio") {
		return;
	} else {
		alert("Por favor recuerde que la cantidad que quiere extraer tiene que ser un número, y que solo se pueden extraer billetes de $100.");
	}
	
}

function depositarDinero() {
	if (bloqueado) {
		return;
	}
	var saldoInicial = saldoCuenta;
	var deposito = pedirInput("Cuanto dinero está depositando?");
	if(deposito == "vacio") {
		return;
	} else if (deposito == "ingreso no valido") {
		alert("Su deposito tiene que ser un número entero.");
	} else {
		if(deposito > 0) {
			sumarAlSaldo(deposito);
			actualizarSaldoEnPantalla();
			alert("Ha depositado: $"+deposito+"\nSaldo anterior: $"+saldoInicial+"\nSaldo Actual: $"+saldoCuenta);	
		} else {
			alert("No puede depositar menos de $1.")
		}
	}
}

function pagarServicio() {
	if (bloqueado) {
		return;
	}
	var servicio = pedirInput("Ingrese el número que corresponda con el servicio que quiere pagar:\n1 - Agua\n2 - Luz\n3 - Internet\n4 - Teléfono");
	var nombre;
	var costo;
	var saldoInicial = saldoCuenta;
	if (servicio == "vacio") {
		return;
	}
	switch(servicio){
		case 1:
			nombre = "Agua";
			costo = servAgua;
			break;
		case 2:
			nombre = "Luz";
			costo = servLuz;
			break;
		case 3:
			nombre = "Internet";
			costo = servInter;
			break;
		case 4:
			nombre = "Teléfono";
			costo = servTel;
			break;
		default:
			alert("Ingrese una opción válida.");
			return;
	}
	if (costo <= saldoCuenta) {
		restarAlSaldo(costo);
		alert("Ha pagado el servicio "+nombre+".\nSaldo anterior: $"+saldoInicial+"\nDinero descontado: $"+costo+"\nSaldo actual: $"+saldoCuenta);
	} else {
		alert("No hay saldo disponible en su cuenta para pagar esa cuenta.");
		return;
	}
	actualizarSaldoEnPantalla();
}

function transferirDinero() {
	if (bloqueado) {
		return;
	}
	var envio = pedirInput("Por favor ingrese el monto que desea transferir.");
	if (envio == "vacio") {
		return;
	}
	var amigo;
	if(envio <= saldoCuenta && envio > 0) {
		amigo = pedirInput("Por favor ingrese el número de la cuenta de destino.");
		if(checkAmigo(amigo)){
			restarAlSaldo(envio);
			actualizarSaldoEnPantalla();
			alert("Se han transferido $"+envio+"\nCuenta destino: "+amigo);
		} else {
			alert("El número de cuenta destino no es válido.");
		}
	} else if(envio == "ingreso no valido" || envio < 0) {
		alert("Recuerde que la transferencia debe escribirse como un número entero mayor a 0.");
	} else {
		alert("No hay saldo disponible en su cuenta para hacer esa transferencia.");
	}
}

function iniciarSesion() {
	var ingresoCodigo = prompt("Ingrese el código de seguridad de su cuenta.");
	if(revisarInput(ingresoCodigo)) {
		alert("Por favor ingrese su código cuando recibe el pedido. Recuerde que el código de acceso es un número de 4 dígitos.");
		iniciarSesion();
		return;
	}
	ingresoCodigo = parseInt(ingresoCodigo);
	if (ingresoCodigo == codigoSeg) {
		saludarUsuario();
    	cargarNombreEnPantalla();
	} else {
		protegerCuenta();
	}
}

//Funciones no incluídas en el JS descargado de Acámica

function sumarAlSaldo(cant) {
	saldoCuenta += cant;
}

function restarAlSaldo(cant) {
	saldoCuenta -= cant;
}

function revisarBilletes(num) {
	if (num%100 === 0 && num > 0) {
		return(true);
	} else {
		return(false);
	}
}

function checkAmigo(num) {
	if (num == cuentaAmiga1 || num == cuentaAmiga2) {
		return(true);
	} else {
		return(false);
	}
}

function protegerCuenta() {
	if(intentos < 3) {
		alert("Ha ingresado una contraseña incorrecta. El número de intentos que le quedan antes de que la cuenta se bloquee por seguridad es: "+(3-intentos));
		intentos++;
		iniciarSesion();
		return;
	} else {
		bloqueado = true;
		saldoProtegido = saldoCuenta;
		saldoCuenta = 0;
		actualizarSaldoEnPantalla();
		document.getElementById("nombre").innerHTML = "Usuario bloqueado";
		alert("Ha ingresado una contraseña incorrecta 4 veces. Por razones de seguridad se bloqueará su cuenta y saldo.");
	}
}

function saludarUsuario() {
	if (masculino) {
		alert("Bienvenido "+nombreUsuario+", ya puede comenzar a realizar operaciones.");
	} else {
		alert("Bienvenida "+nombreUsuario+", ya puede comenzar a realizar operaciones.");
	}
}

function pedirInput(pedido) {
	var inputUsuario = prompt(pedido);
	if(revisarInput(inputUsuario)) {
		return("vacio");
	} else if ((inputUsuario % 1) != 0) {
		return("ingreso no valido");
	}
	inputUsuario = parseInt(inputUsuario);
	if (inputUsuario) {
		return(inputUsuario);
	} else {
		return("ingreso no valido");
	}
}

function revisarInput(input) {
	if (input === "" ) {
		return(true);
	} else if(input) {
		return(false);
	} else {
		return(true);
	}
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
	if (masculino) {
    	document.getElementById("nombre").innerHTML = "Bienvenido " + nombreUsuario;
	}
	else {
		document.getElementById("nombre").innerHTML = "Bienvenida " + nombreUsuario;
	}
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}