(function() {
    "use strict";

    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function() {

        var mapa = document.querySelector('#mapa');

        if(mapa) {
            var map = L.map('mapa').setView([20.677024, -103.344610], 17);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([20.677024, -103.344610]).addTo(map)
                .bindPopup('DIGI EVENT 2022 <br> Boletos ya disponibles')
                .openPopup();            
        }
        
        // CAMPOS DATOS USUARIO
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // CAMPOS PASES
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        // BOTONES Y DIVS
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // EXTRAS
        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);
        
        
        function validarCampos() {
            if(this.value == '') {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "Este campo es obligatorio";
                this.style.border = '1px solid red';
            }
            else 
            {
                errorDiv.style.display = "none";
                this.style.border = "1px solid black";
            }
        }

        function validarMail() {
            if(this.value.indexOf("@") >= 1) {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid black';
            }
            else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "El campo debe contener un @";
                this.style.border = '1px solid red';
            }
        }

        function calcularMontos(event) {
            event.preventDefault();
            if(regalo.value == '') {
                alert("Debes elegir un regalo");
                regalo.focus();
            }
            else {
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                boletos2Dias = parseInt(pase_dosdias.value) || 0,
                boletoCompleto = parseInt(pase_completo.value) || 0,
                cantidadCamisas = parseInt(camisas.value) || 0,
                cantidadEtiquetas = parseInt(etiquetas.value) || 0;

                var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantidadCamisas * 10) * .93) + (cantidadEtiquetas * 2);

                var listadoProductos = [];

                if (boletosDia > 0) {
                    if (boletosDia == 1) {
                        listadoProductos.push(boletosDia + ' Pase por Día');
                    }
                    else {
                        listadoProductos.push(boletosDia + ' Pases por Día');
                    }
                }

                if(boletos2Dias > 0) {
                    if (boletos2Dias == 1) {
                        listadoProductos.push(boletos2Dias + ' Pase por 2 Días');
                    }
                    else {
                        listadoProductos.push(boletos2Dias + ' Pases por 2 Días');
                    }
                }

                if(boletoCompleto > 0){
                    if (boletoCompleto == 1) {
                        listadoProductos.push(boletoCompleto + ' Pase Completo');
                    }
                    else {
                        listadoProductos.push(boletoCompleto + ' Pases Completos');
                    }
                }

                if(cantidadCamisas > 0){
                    if (cantidadCamisas == 1) {
                        listadoProductos.push(cantidadCamisas + ' Camisa del Evento');
                    }
                    else {
                        listadoProductos.push(cantidadCamisas + ' Camisas del Evento');
                    }
                }

                if(cantidadEtiquetas > 0){
                    if (cantidadEtiquetas == 1) {
                        listadoProductos.push(cantidadEtiquetas + ' Paquete de Etiquetas del Evento');
                    }
                    else {
                        listadoProductos.push(cantidadEtiquetas + ' Paquetes de Etiquetas del Evento');
                    }
                }

                if(regalo.value == 'ETI') {
                    listadoProductos.push('Regalo elegido: Etiquetas');
                }

                if(regalo.value == 'PUL') {
                    listadoProductos.push('Regalo elegido: Pulsera');
                }

                if(regalo.value == 'TER') {
                    listadoProductos.push('Regalo elegido: Termo');
                }

                lista_productos.style.display = "block";

                lista_productos.innerHTML= '';
                for(var i  = 0; i < listadoProductos.length; i++) {
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                }

                suma.innerHTML = "$ " + totalPagar.toFixed(2);
            }
        }
        
        function mostrarDias() {
            var boletosDia = parseInt(pase_dia.value, 10) || 0,
            boletos2Dias = parseInt(pase_dosdias.value) || 0,
            boletoCompleto = parseInt(pase_completo.value) || 0;

            var diasElegidos = [];

            if(boletosDia > 0 ){
                diasElegidos.push('viernes');
            }

            if(boletos2Dias > 0 ){
                diasElegidos.push('viernes', 'sabado');
            }

            if(boletoCompleto > 0 ){
                diasElegidos.push('viernes', 'sabado', 'domingo');
            }

            for(var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display = 'block';
            }
        }


 
    }); // DOM CONTENT LOADED
})();