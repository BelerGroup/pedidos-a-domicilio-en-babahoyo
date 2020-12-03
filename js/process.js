window.addEventListener('load',loaded,false);

function loaded(){

	
	/* Configuramos el boton enviar pedidos */	
	let btnEnviarPedido = document.getElementById("generarPedido");
	btnEnviarPedido.addEventListener("click", pedidos, false);

	/* Asignamos las funciones sumar y restar a todos los botones */	
	for(let i = 1; i<=6; i++){

		document.getElementById("btn"+i+"-menos1").addEventListener("click", restarProducto, false);
		document.getElementById("btn"+i+"-mas1").addEventListener("click", sumarProducto, false);
	
	};

	let cerrarModal = document.getElementById("cerrar");
	cerrarModal.addEventListener("click", ocultar, false);

	function ocultar(){		
		document.getElementById("ventana").classList.add("ocultar");
	}
	
	/* limitamos el numero de caracteres para los inputs numèricos */
	let tamañoMaximo = 10;

	document.getElementById("dato3").oninput = function(){

	 	if(this.value.length > tamañoMaximo ) this.value = this.value.slice(0, tamañoMaximo);

	};

	document.getElementById("dato4").oninput = function(){

	 	if(this.value.length > tamañoMaximo ) this.value = this.value.slice(0, tamañoMaximo);

	}





	function restarProducto(objeto){

		/* Id padre del objeto que ejecutó el evento click */		
		let id = objeto.target.parentNode.parentNode.id;

		/* Capturamos la cantidad actual del objeto input */	
		let cantidadProducto = document.getElementById("inputProducto"+id);

		/* Comprobamos que sea mayor a "0" para poder resta "1" */

		if(cantidadProducto.value > 0) {

			let restarUno = cantidadProducto.value - 1;
			cantidadProducto.value = restarUno;				

		} else {

			alert("LLegó a la cantidad mínima");

		};

	};



	function sumarProducto(objeto){

		/* Id padre del objeto que ejecutó el evento click */	
		let idNumero = objeto.target.parentNode.parentNode.id;

		/* Capturamos cantidad actual del producto */	
			let cantidadActual = document.getElementById("inputProducto"+idNumero);
			
			/* Tranformamos a formato número y le sumamos "1" */			
			let nuevaCantidad = Number(cantidadActual.value) + 1;

			/* Actualizamos la cantidad actual */	
			cantidadActual.value = nuevaCantidad;			
	
	};

	function pedidos(){

		/* Traemos todos los datos del cliente */
		let dato1 = document.getElementById("dato1");
		let dato2 = document.getElementById("dato2");
		let dato3 = document.getElementById("dato3");
		let dato4 = document.getElementById("dato4");
		let dato5 = document.getElementById("dato5");

		/* Rellenamos los datos de la tabla que generamos */
		document.getElementById("labelNombre").innerHTML = dato1.value;
		document.getElementById("labelApellido").innerHTML = dato2.value;
		document.getElementById("labelCedula").innerHTML = dato3.value;
		document.getElementById("labelTelefono").innerHTML = dato4.value;
		document.getElementById("labelDireccion").innerHTML = dato5.value;

		let fecha = new Date();
		document.getElementById("labelFecha").innerHTML = `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`;
		
		/* Contenedor de id's de los productos seleccionados */		
 		let contenedorIds = [];

 		/* Capturamos los id's padres de los productos seleccionados*/		
 		for(let j = 1; j <= 6; j++) {

 			let inputProducto = document.getElementById("inputProducto"+j);
 			let idProducto = inputProducto.parentNode.parentNode.id;
 			
 			/* Verificamos que la cantidad sea mayor a "0" */		
 			if(inputProducto.value > 0 ){

 				/* Agregamos el id al contenedor de id's de productos */			
 				contenedorIds.push(idProducto);
 				/* para verificar si se agregaron los productos al pedido 
 				console.log(`Producto ${idProducto} agregado al pedido`)
 				*/
 				 
 			} else {

			};
 			
 		};

 		/* Verificamos que haya id's en el contenedor */		
 		if(contenedorIds == "") {					
 			/* --- mostramos mensaje por pantalla -- */
 			alert("No hay productos seleccionados")

 		} else {

 			let numeroDatosCliente = 5;

 			if(dato1.value !== "" && dato2.value !== "" && dato3.value !== "" && dato4.value !== "" && dato5.value !== "" ) {

 				/* Quitamos la clase 'is-invalid' y agregamos la clase 'is-valid' */
 				for(let k = 1; k<=numeroDatosCliente; k++){
 					document.getElementById("dato"+k).classList.remove("is-invalid");
 					document.getElementById("dato"+k).classList.add("is-valid");
 				};
 				
				/* Generamos una tabla con los productos seleccionados */ 
				let subtotal = 0;
				let productos = "<table class='table'><tr><th>Cantidad</t><th>Detalle</t><th>P Unit.</t><th>Importe</t></tr>"		
				for(let l=0; l<contenedorIds.length; l++){

					let cantidad = document.getElementById("inputProducto"+contenedorIds[l]).value;
					let descripcion = document.getElementById("descripcion"+contenedorIds[l]).innerHTML;
					let precio = document.getElementById("precio"+contenedorIds[l]).innerHTML;
					let calcular_importe = cantidad * precio;
					let importe = calcular_importe.toFixed(2);
					subtotal = subtotal + calcular_importe;
					productos += "<tr><td>"+cantidad+"</td><td>"+descripcion+"</td><td>"+precio+"</td><td>"+importe+"</td></tr>"

				};

				let iva = (subtotal * 0.12).toFixed(2);
				let total = parseFloat(subtotal) + parseFloat(iva);
				productos +="<tr><td></td><td></td><td><strong>Subtotal: </strong></td><td>"+subtotal.toFixed(2) +"</td></tr>";
				productos += "<tr><td></td><td></td><td><strong>i.v.a(12%):  </strong></td><td>"+iva+"</td></tr>";
				productos += "<tr><td></td><td></td><td><strong>Total: </strong></td><td>"+total.toFixed(2)+"</td></tr></table>"
			
				/* Rellenamos la ventana modal con los productos seleccionados */

				document.getElementById("tabla-productos").innerHTML = productos;
 				document.getElementById("ventana").classList.remove("ocultar");


 				/* le asignamos la funcion guardar al boton confirmarPedido */
 				document.getElementById('confirmarPedido').addEventListener('click', enviarPedido, false);

 			}else{
 				for(let m = 1; m <=numeroDatosCliente; m++){

 					var selecionaInputs = document.getElementById('dato'+m);
 					if(selecionaInputs.value == ""){
 						selecionaInputs.classList.add("is-valid");
 						selecionaInputs.classList.add("is-invalid");

 					} else {

 						selecionaInputs.classList.remove("is-invalid");
 						selecionaInputs.classList.add("is-valid");

 					};
 				};

 				for(let n = 1; n <= numeroDatosCliente; n++){

 					var datoSeleccionado = document.getElementById('dato'+n);

 					if(datoSeleccionado.value == ""){ 				
 						datoSeleccionado.focus();
 						break;
 					} else {

 					};

 				};

 			};			

 		};		
	};


	function enviarPedido(){
		alert("Se ha guardado y enviado su pedido");
		document.getElementById("ventana").classList.add("ocultar");

		for(let p = 1; p <= 6; p++){

			document.getElementById("inputProducto"+p).value = 0;
		};

		for(let q = 1; q <= 5; q++){

			document.getElementById("dato"+q).value = "";
			document.getElementById("dato"+q).classList.remove("is-valid");
		};

	}


}

