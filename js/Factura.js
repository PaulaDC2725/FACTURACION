const formDetalle = document.getElementById("formDetalle");
const inputCantidad = document.getElementById("inputCantidad");
const selectDescripcion = document.getElementById("selectDescripcion");
const inputPUnitario = document.getElementById("inputPUnitario");
const inputPTotal = document.getElementById("inputPTotal");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const btnGuardar = document.getElementById("btnGuardar");
const inputNombre =document.getElementById("inputNombre");
const inputDireccion =document.getElementById("inputDireccion");
const inputFecha =document.getElementById("inputFecha");
const formCabecera = document.getElementById("formCabecera");
const inputProcentaje = document.getElementById("inputProcentaje");
const inputPSinUnitario = document.getElementById("inputPSinUnitario");
const inputSubtotal = document.getElementById("inputSubtotal");
const inputValorIva = document.getElementById("inputValorIva");
//arreglo vacio para facturas
let facturas = [];
//para inicializar el detalle de la factura(2)
let arregloDetalle = [];
//despues de añadir la funcion redibujartabla
//arreglo para que se llene el select de descripcion
let arregloProductos = [{id:1, nombre: "Arroz", precio: 2000 },
						{id:2, nombre: "Carne", precio: 10000 },
						{id:3, nombre: "Aceite", precio: 4500 },
						{id:4, nombre: "Lapiz", precio: 700 }];

//funcion(17) para que se queden guardadas las facturas en el localstorage
const verificarFacturasLclStorage = () => {
	const facturasLS = JSON.parse(localStorage.getItem("facturas"));
	//si existe la factura iguale o si no no pasa nada
	if (facturasLS) {
		facturas = facturasLS;
	}
};
verificarFacturasLclStorage();

// funcion(3) una funcion para llenar el select y se pueda escoger el en formDetalle
 const llenarProductos = () => {
 	//iterar el arreglo producto
 	//cada iteracion se va a recibir un producto que esta representando por p
 	arregloProductos.forEach((p) =>{
 		//llenar el producto con los option del select del HTML
 		//crear elemento
 		const option = document.createElement("option");
 		//cada option tiene un value que va ser igual al id del producto 
 		option.value = p.id;
 		//el option va a tener un texto que sera el nomre del producto
 		option.innerText = p.nombre;
 		//inyectaren cada vuelta el  select 
 		selectDescripcion.appendChild(option);
 	});
 };
 //para que se ejecute automaticamente toca llamar la funcion
 llenarProductos();

 //funcion(4) para traer el nombre del producto en la descripcion del cuerpo de la tabla
 //se trae el id del producto para poder asignarle el nombre
 //nombre del producto dado su id
 //retorna el nombre del producto 
 const getNombreProductoById = (id) =>{
 	//el objeto producto va a encontrar dentro del arreglo productos
 	//pero se va es hacer algo similar a una validacion con el if
 	const objProducto = arregloProductos.find((p) =>{
 		//si el producto es igual al id
 		// se puede poner igual == o === +id para decirle que es un tipo de dato numerico
 		if (p.id == id) {
 			//retorna solo el producto que se esta pidiendo eso lo hace mediante el id pero arrojaria el nombre del producto
 			return p;
 		}
 	});
 	//lo que se retorna de la funciona ya teniendo encontrado el producto
 	//se retorna el objeto producto con el nombre del producto
 	return objProducto.nombre;
 };

// funcion(7) para captar el precio de cada producto dependiendo el id
  const getPrecioProductoById = (id) =>{
 	//el objeto producto va a encontrar dentro del arreglo productos
 	//pero se va es hacer algo similar a una validacion con el if
 	const objProducto = arregloProductos.find((p) =>{
 		//si el producto es igual al id
 		// se puede poner igual == o === +id para decirle que es un tipo de dato numerico
 		if (p.id == id) {
 			//retorna solo el producto que se esta pidiendo eso lo hace mediante el id pero arrojaria el precio del producto
 			return p;
 		}
 	});
 	//lo que se retorna de la funciona ya teniendo encontrado el producto
 	//se retorna el objeto producto con el precio del producto buscando por el id
 	return objProducto.precio;
 };



//funcion(2) no recibe nada porque va a manejar el arreglo global o detalle
const redibujarTabla = () => {
	//para arreglar el bug que se genera al añadir otro producto a la tabala
	//cada vuelta que de el foreach se borra el arreglo para que no se ponga dos veces 
	cuerpoTabla.innerHTML="";
	//iterar el arregloDetalle con un forEach
	//el detalle son los campos que va a tener el formDetalle
	arregloDetalle.forEach((detalle) =>{
		//creando elemento fila para que se muestre los datos detalle y tambien mostrar la accion de eliminar
		let fila = document.createElement("tr");
		//se puede combinar un innerHTML con un appendChild
		//para que me muestre el nombre de producto y no el id se pone getProducto que se esta declarando arriba
		fila.innerHTML = `	<td>${detalle.cant}</td>
							<td>${getNombreProductoById(detalle.descripcion)}</td>
							<td>${detalle.porcentaje}</td>
							<td>${detalle.pUnit}</td>
							<td>${detalle.pSinUnit}</td>
							<td>${detalle.valorIva}</td>
							<td>${detalle.subtotal}</td>
							<td>${detalle.pTotal}</td> `;

		// crear otra fila para poner el boton Eliminar
		let tdEliminar = document.createElement("td");
		//crea el boton eliminar 
		let botonEliminar = document.createElement("button");
		//ponerle clases a el boton
		botonEliminar.classList.add("btn","btn-danger");
		//El nombre o valor que va a terner
		botonEliminar.innerText = "Eliminar";
		//Al hacer click se elimine el objeto que se quiera
		//funcion(14) se esta creando un boton eliminar diferente para cada producto porque esta dentro de un forEach
		botonEliminar.onclick = () => {
				//se llama la funcion y se trae la descripcion que se encuentra en el cuerpo de la tabla donde esta el id
				eliminarDetalleById(detalle.descripcion);
		};
		//agregar el boton al td o fila
		tdEliminar.appendChild(botonEliminar);
		//añadir el boton eliminar a la fila
		fila.appendChild(tdEliminar);
		//añadir al cuerpo de la tabla de los datos de detalle, la fila que se acabo de crear para el boton eliminar
		cuerpoTabla.appendChild(fila); 
	});
};

 //funcion(15)
 //se envia la descripcion pero no se recibe en la funcion
 //se llama id el parametro porque estos se puedennombran como se quiera
 const eliminarDetalleById = (id) => {
 		//filtrar todos los productos cuyo id sea diferente al que estoy trayendo
 		//el arreglo detalle va ser igual al arreglo detalle pero ya filtrado 
 		arregloDetalle = arregloDetalle.filter((detalle) => {
 			//si es que el id que se esta recibiendo es diferente al detalle de la descripcion
 			//retornar todos los detalles que sean diferentes
 				if(+id !== +detalle.descripcion){
 						return detalle;
 				}
 		});
 		//para que vuelva a poner la tabla pero sin el producto que se esta excluyendo arriba
 		redibujarTabla();
 };


//cuando se digite una descripcion y si ya esta en el cuerpo de la tabla
//sumarlo a ese registro no poner otro igual
//funcion(11)
const agregarDetalle = (objDetalle) =>{

	//inyectar un nuevo datelle sin modificar ni nada
	//en el mismo arreglo detalle verifico eso
	//cada iteracion se va a recibir un detalle
	//buscando si el objeto detalle ya existe
	//pero se va a igualar a una variable
	//funcion(13)
	const resultado = arregloDetalle.find((detalle)=>{
		//si el objeto detalle llega a ser igual al detalle entonces retorne detalle
			if (+objDetalle.descripcion === +detalle.descripcion ) {
				return detalle; 
			}
	});



	//buscar si el objeto detalle ya existia en el arreglo detalle
	//de ser asi, sumar las cantidades para que solo aparezca una vez en el arreglo 
		//trae la descripcion o sea el id no el nombre 
		//funcion(12) funcion map por que se piensa rrecorrer varios objetos
		//la funcion map permite modificar un elemento del objeto 
		// en cada iteracion va recibir un detalle que vendrian siendo todos los objetos detalles que se tienen 
		//igual el arreglo detalle para revisar el arreglo del map y si es el caso modificar
		//si resultado existe aplicar lo del map
		if (resultado) {
		arregloDetalle = arregloDetalle.map((detalle)=>{
			//si se encuentra en algun momento en ese arreglo detalle de la descripcion o sea el id se ecnuentra
			//que el id que estoy enviando son iguales 
			//entonces retornar todas las cantidades pero antes toca rehacerlas
			//+ para que pasen enteros y con tres iguales
			if (+detalle.descripcion === +objDetalle.descripcion) {
				//retornar el mismo objeto detalle
				return {
					//convertir todos a enteros con el+
					//la nueva cantidad que llevara el objeto se van a sumar para mostrarsen abajo en el cuerpo de la tabla
					cant: +detalle.cant + +objDetalle.cant,
					//descripcion no varia
					descripcion: detalle.descripcion,
					porcentaje: +detalle.porcentaje,
					//precio total va ser igual a las dos cantidades por el precio unitario
					//y puede ser de cualquiera por que el precio unitario no cambia o se detalle o objDetalle
					pTotal: (+detalle.cant + +objDetalle.cant)* +detalle.pUnit,
					//precio unitario no cambia por eso lo se trae una vez una con el detalle
					pUnit: +detalle.pUnit,
					pSinUnit: +detalle.pSinUnit,
					//subtotal si se llega a cambiar
					subtotal: (+detalle.cant + +objDetalle.cant)* +detalle.pSinUnit,
					//valor iva 
					valorIva: (+detalle.pTotal+ +objDetalle.pTotal)/((detalle.porcentaje/100)+1),
					
				};
			}
			//si no encuentra el objeto detalle entonces retornar el detalle que se digito
			return detalle; 
		});
	} else {
		//en caso de que no exista se anullo o lago asi acer un push 
		arregloDetalle.push(objDetalle);
	}
};


//este es el agrgar del formulario detalle
//para que se agregue un nuevo detalle a la factura (Cantidad, descripcion, etc..) (1)
formDetalle.onsubmit = (e) => {
	//controlar el evento 
	e.preventDefault();
	//hacer un objeto con los datos Cantidad, descripcion.. para poder añadirlos al arregloDetalle
	const objDetalle = {
		cant: inputCantidad.value,
		descripcion: selectDescripcion.value,
		porcentaje: inputProcentaje.value,
		pUnit: inputPUnitario.value,
		pSinUnit: inputPSinUnitario.value,
		valorIva: inputValorIva.value,
		subtotal: inputSubtotal.value,
		pTotal: inputPTotal.value
	};

	//se llama aqui par que traiga el push que hay dentro de esa funcion
	agregarDetalle(objDetalle);
	//este objeto detalle se tiene que llevar a la funcion de agregarDetalle


	//mirar que los producto se encuentren en el arreglo correctamente creados y que vaya creciendo correctamente el arreglo
	console.log(arregloDetalle);
	//llamar la funcion
	redibujarTabla();
};


//funcion (5) boton guardar (boton guardar factura)
//cuando le de click a boton guardar 
btnGuardar.onclick = () => {
	//se crea un objeto de la cabecera de la factura
	let ObjFactura = {
		nombre: inputNombre.value,
		direccion: inputDireccion.value,
		fecha: inputFecha.value,
		//al rreglo que se tiene globlamente para el from detalle
		detalle: arregloDetalle,
	};
	//al arreglo de facturas se le va agregando el objeto factura
	// se va a guardar como una mas en el objeto de facturas
	facturas.push(ObjFactura);
	//limpiar campos
	formCabecera.reset();
	formDetalle.reset();
	// guardarlo en el localstorage
	//se va a guardar el arreglo de factura 
	// se pasa a string el arreglo de factura por que esta en el formato JSON
	localStorage.setItem("facturas",JSON.stringify(facturas));
	//borrar tabla de tbody
	arregloDetalle=[];
	//limpia primero y que da vacio porque no recibe iteraciones
	redibujarTabla();

};

//un evento para que cuando se oprima un articulo se cambie automaticamente el precio unitario
//cada vez que cambie el elemento
//funcion(6)
selectDescripcion.onchange = () => {
	//si el select descripcion es igual a 0 resete el formulario de detalle
	if (selectDescripcion.value == "0") {
		formDetalle.reset();
		return;
	}

	//siempre que cambie el select, se le dice dame el precio del producto 
	//que se digite por eso el selct descripcion.value y lo recibe en la constante precio
	const precio = getPrecioProductoById(selectDescripcion.value);
	//posibilidad que no exista cuando se marce el option 0 para eso el if
	//si el precio exitse se va a poner en el input de precio unitario su value que va ser igual al precio que acaba de llegar 
	if (precio) {
		inputPUnitario.value = precio;
		//cuando se cambia el option de la descripcion cambie el precio total y unitario llamando la funcion calcular total
		calcularTotal();
	}
};

// funcion(9) para tener todos los claculos que se necesiten 
const calcularTotal = () => {
	//el mas(+) para transformar a entero
	const cantidad = +inputCantidad.value;
	const pUnit = +inputPUnitario.value;
	const total = cantidad * pUnit;
	//para colocar en el input del precio total
	inputPTotal.value = total.toFixed(2);
	//porcentaje IVA
	const porcentaje = +inputProcentaje.value;
	//Precio unitario sin IVA
	const preciosiniva = pUnit/((porcentaje/100)+1);
	inputPSinUnitario.value = preciosiniva.toFixed(2);
	//subtotal
	const sub = cantidad * preciosiniva;
	inputSubtotal.value = sub.toFixed(2);
	//valor del IVA
	const valori = total/((porcentaje/100)+1);
	inputValorIva.value = valori.toFixed(2);


};

//evento para calcular automaticamente el precio total 
//cada vez que se levante la tecla
//funcion(8)
inputCantidad.onkeyup = () => {
	calcularTotal();
};

//cada vez que se cambie ejemplo si le dan con el spinner que trae el input se cambie
//funcion(10)
inputCantidad.onchange = () => {
	calcularTotal();
};
//cuando se cambia el option de la descripcion cambie el precio total y unitario

//eventos para cambiar el precio unitario sin IVA
inputProcentaje.onkeyup =  () => {
	calcularTotal();
};

inputProcentaje.onchange = () => {
	calcularTotal();
};



