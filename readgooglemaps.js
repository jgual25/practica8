function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  
}

function viewJSON() {
    loadJSON(function(response) {
        /* Aqui l'objecte response representa l'objecte JSON que ens 
           ha retornat el servidor */
        //creació de la variable str amb la capçalera de cada columna
        var str = "<tr><th>Nom</th><th>Latitud</th><th>Longitud</th><th>Adreça</th><th>Tipus establiment</th><th>Icona</th></tr>";
        //bucle for que recorre els elements de la funcio JSON el qual escriurà cada un dels elements demanats.
        for (var i=0; i<response.results.length; i++){

        str += "<tr><td>"+ response.results[i].name + "</td>"+
        "<td>"+ response.results[i].geometry.location.lat + "</td>"+
        "<td>"+ response.results[i].geometry.location.lng + "</td>"+
        "<td>"+ response.results[i].vicinity + "</td>"+
        "<td>"+ response.results[i].types + "</td>"+
        "<td><img src=' "+ response.results[i].icon+"'></td></tr>";
        }
        console.log(str);

        document.getElementById("taula").innerHTML = str;
        //la taula es posa al final perquè englobarà tota la informació dins ella a partir de la varialbe creada al principi.
        
    });
}
