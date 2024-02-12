window.onload = function () {
    $( "#accordion" ).accordion();
    var imagen = document.getElementsByName("imagenes");
    var botones = document.getElementsByName("boton");
    for (let j = 0; j < imagen.length; j++) {
        imagen[j].addEventListener("click", imagenextend);
    }
    for (let j = 0; j < botones.length; j++) {
        botones[j].addEventListener("mouseover", textzoom);
    }
    for (let j = 0; j < botones.length; j++) {
        botones[j].addEventListener("mouseout", textunzoom);
    }
    
    document.getElementById("registro").onclick = registro;
    document.getElementById("button1").onclick = muestra;
    document.getElementById("reset").onclick = borrar;
    document.getElementById("nombre").focus();
    document.onsubmit = envio;

}

function muestra() {
    if (document.getElementById("button1").value == "mostrar") {
        datos = "/files/resultado.xml"
        idDiv = "contenedor";
        if (window.XMLHttpRequest) {
            XMLHttpRequestObject = new XMLHttpRequest();
        } else {
            alert("No ha sido posible crear una instancia de XMLHttpRequest");
        }
        if (XMLHttpRequestObject) {
            XMLHttpRequestObject.open("GET", datos);
            XMLHttpRequestObject.onreadystatechange = function () {
                if (XMLHttpRequestObject.readyState == 4 &&
                    XMLHttpRequestObject.status == 200) {
                    var documentoXml = XMLHttpRequestObject.responseXML;
                    var root = documentoXml.getElementsByTagName("Torneo")[0];
                    var tope = root.getElementsByTagName("Jugador").length;
                    for (var i = 0; i < tope; i++) {
                        jugador = root.getElementsByTagName("Jugador")[i];
                        nombre = jugador.getElementsByTagName("Nombre")[0].firstChild.nodeValue;
                        lider = jugador.getElementsByTagName("Lider")[0].firstChild.nodeValue;
                        resultado = jugador.getElementsByTagName("Resultado")[0].firstChild.nodeValue;
                        muestraHTML('contenedor', "<ul><li>" + (i + 1) + ". Nombre: " + nombre + "</li><ul><li>Líder: " + lider + "</li><li>Resultado: " + resultado + "</li></ul></ul>");
                    }
                }
            }
            XMLHttpRequestObject.send(null);
        }
        document.getElementById("button1").value = "ocultar";
    }
    else {
        datos = ""
        idDiv = "contenedor";

        if (XMLHttpRequestObject) {
            var lugar = document.getElementById(idDiv);
            XMLHttpRequestObject.open("GET", datos);
            XMLHttpRequestObject.onreadystatechange = function () {
                if (XMLHttpRequestObject.readyState == 4 &&
                    XMLHttpRequestObject.status == 200) {
                    lugar.innerHTML = XMLHttpRequestObject.responseXML;
                }
            }
            XMLHttpRequestObject.send(null);
        }
        document.getElementById("button1").value = "mostrar";
    }
}

function muestraHTML(id, texto) {
    if (document.getElementById) {
        document.getElementById(id).innerHTML += texto;
    }
}

//----Comprobación enlace

function registro(event) {
    const NOW = new Date();
    const DURATION = DATE_TARGET - NOW;
    if (DURATION <= 0) {
        alert("Lo sentimos, la fecha límite para inscribirte al torneo ha expirado. Puedes ver los resultados del último torneo a continuación:");
        document.getElementById("registro").href = "resultados.html";
    }
}

//----Cuenta atrás

const DATE_TARGET = new Date('04/04/2024 0:01 AM');
const SPAN_DAYS = document.querySelector('span#days');
const SPAN_HOURS = document.querySelector('span#hours');
const SPAN_MINUTES = document.querySelector('span#minutes');
const SPAN_SECONDS = document.querySelector('span#seconds');
const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

function updateCountdown() {

    const NOW = new Date()
    const DURATION = DATE_TARGET - NOW;
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
    const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
    const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);

    if (DURATION > 0) {
        SPAN_DAYS.textContent = REMAINING_DAYS;
        SPAN_HOURS.textContent = REMAINING_HOURS;
        SPAN_MINUTES.textContent = REMAINING_MINUTES;
        SPAN_SECONDS.textContent = REMAINING_SECONDS;
    }
    else {
        SPAN_DAYS.textContent = 0;
        SPAN_HOURS.textContent = 0;
        SPAN_MINUTES.textContent = 0;
        SPAN_SECONDS.textContent = 0;
    }
}

updateCountdown();
setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);

//----Imagenes extendidas

function imagenextend(e) {
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = "images/index/expanded/" + e.currentTarget.id + ".jpg";
    expandImg.parentElement.style.display = "block";
}

//----Formulario
function envio(event) {
    var tel = document.getElementById("telefono").value;
    if (!(/^\d{9}$/.test(tel))) {
        alert("El número de teléfono es incorrecto");
        event.preventDefault();
    }
}

//----Botones ampliados

function textzoom() {
    this.style.fontSize = '16pt';
}

function textunzoom() {
    this.style.fontSize = '12pt';
}

//----Borrar form

function borrar() {
    var elems = document.getElementsByTagName("input");
    for (i = 0; i < elems.length - 2; i++) {
        elems[i].value = "";
    }
}
