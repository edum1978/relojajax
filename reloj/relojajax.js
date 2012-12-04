//**************************************************************//
//******Reloj sincronizado con el servidor mediante AJAX********//
//**************************************************************//
//***Creado por Eduardo Mazarrasa Oc�n Diciembre 2012***********//
//**************************************************************//
//*********Optimizado para IE9, Chrome23, firefox15 ************//
//**************************************************************//

var http = getXMLHttpRequest();

function getXMLHttpRequest()
{
  var req = false;
  try
	{
		req = new XMLHttpRequest(); /*IE7+, Firefox, Chrome, Opera, Safari*/
	}
  catch(err1)
  {
    try
		{
			req = new ActiveXObject("Msxml2.XMLHttp");/*explorer antiguos*/
		}
    catch(err2) 
		{ 
		try
			{
				req = new ActiveXObject("Microsoft.XMLHttp");/*explorer*/
			}
		catch(err3) 
		{ 
			req = false
		}
	}
  }
  return req;
}

function compruebaHoraServidor(){
	var myurl = 'datexml.php';
	//Evita el cacheo de la petici�n//
	var miAleatorio = parseInt(Math.random()*99999999);
	var modurl =  myurl +"?rand="+miAleatorio;
	http.open("GET",modurl,true);
	http.onreadystatechange = recargaDatos;
	http.send(null);
	//document.getElementById('servidor').innerHTML = 'Conectando con servidor...<img width="15px" src="wait.gif">';
	
	//Extablece el valor en milisegundos en el que se actuliza la hora con la del servidor
	setTimeout("compruebaHoraServidor()",60000)
	}

//variable global que adopta en prime momento los la hora del cliente//
//y se actualiza con cada llamada a compruebaHoraServidor()//
var horaServer = new Date();

function recargaDatos()
	{
		if(http.readyState ==4)
			{
			if (http.status == 200)
				{
				/*codigo a ejecutar porque todo ha ido bien*/
				
				var segundos = http.responseXML.getElementsByTagName("hora")[0].childNodes[0].nodeValue
				//milisegundos desde 1970(�poca Unix)
				horaServer.setTime(Number(segundos)*1000);
				//muestra la fecha de ultima sincronizaci�n con el servidor				
				document.getElementById('servidor').innerHTML = "�ltima sincronizaci�n con el servidor: "+ horaServer;
				
				}
			else
				{
				//mensaje de error
				document.getElementById('servidor').innerHTML = 'No se encuentra el servidor <img width="15px" src="wait.gif">';
				}
			}
		else
			{
				//waiting server
			document.getElementById('servidor').innerHTML = 'Sincronizando con el servidor...<img width="15px" src="wait.gif">';
			}
		//setTimeout("compruebaHoraServidor()",10000)
	}

	
	
function mueveReloj(){
	
	//mostrar la hora del cliente	
	var cliente = new Date();
	var horacliente = cliente.getHours();
	var minutocliente = cliente.getMinutes();
	var segundocliente = cliente.getSeconds();
	//document.getElementById('relojcliente').innerText = "Hora Cliente: "+ imprimeHora(horacliente,minutocliente,segundocliente);
	// para que funcione en firefox
	document.getElementById('relojcliente').textContent = "Hora Cliente: "+ imprimeHora(horacliente,minutocliente,segundocliente);
	
	

	//mostrar la hora calculada apartir de los datos de la hora del servidor
	var horaScliente = horaServer.getHours();
	var minutoScliente = horaServer.getMinutes();
	var segundoScliente = horaServer.getSeconds();
	document.getElementById('relojservidorcliente').textContent = "Hora Servidor-Cliente: "+ imprimeHora(horaScliente,minutoScliente,segundoScliente);
	
	//calcula el angulo de desplazamineto de cada aguja del reloj
	var posSeg = "rotate("+(90 +( segundoScliente * 6 ))+"deg)";
	var posMin = "rotate("+(90 +( minutoScliente * 6 ))+"deg)";
	var posHor = "rotate("+(90 +( horaScliente * 30 ))+"deg)";
	
	//Rotar agujas para IE9, Firefox15 y Chrome23//
	/*document.getElementById('segundos').style.transform = "rotate(0deg)";*/
	document.getElementById('segundero').style.msTransform = posSeg;
	document.getElementById('minutero').style.msTransform = posMin;
	document.getElementById('horero').style.msTransform = posHor;
	
	document.getElementById('segundero').style.MozTransform = posSeg;
	document.getElementById('minutero').style.MozTransform = posMin;
	document.getElementById('horero').style.MozTransform = posHor;
	
	document.getElementById('segundero').style.webkitTransform = posSeg;
	document.getElementById('minutero').style.webkitTransform = posMin;
	document.getElementById('horero').style.webkitTransform = posHor;
	
	
	/* Incrementa cada segundo en un segundo la hora del servidor */
	horaServer.setTime(horaServer.getTime()+1000);
	setTimeout("mueveReloj()",1000)
	
}
function imprimeHora(horas,minutos,segundos){
	var imprimible = dosDigitos(horas) + " : " + dosDigitos(minutos) + " : " + dosDigitos(segundos);
	return imprimible;
}
function dosDigitos(i)
{
if (i<10) 
  {
  i="0" + i;
  }
return i;
}	
/*fin*/