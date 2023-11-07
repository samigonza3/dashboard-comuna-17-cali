let map;
let infoWindows = []; // Almacenar todas las ventanas de información en un arreglo
let selectedPolygon = null;
let currentInfoWindow = null; // Almacena la InfoWindow actualmente abierta

function initMap() {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      zoom: 16,
      center: { lat: 3.3951742596, lng:  -76.529816 },
      mapTypeId: "satellite",
      disableDefaultUI: true,
      scaleControl: false,
      panControl: false,
      zoomControl: true,
    });
  }

  
// Definición de coordenadas para la zona 1
const zona1 = [
  { lat: 3.397497, lng: -76.527832 },
  { lat: 3.397038, lng: -76.524221 },
  { lat: 3.392471, lng: -76.524474 },
  { lat: 3.392886, lng: -76.528138 },
];

// Configuración del polígono para la zona 1
const zona1Polygon = new google.maps.Polygon({
  title: "Zona 1",
  paths: zona1,
  strokeColor: "#0000FF",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#0000FF",
  fillOpacity: 0.35
});
zona1Polygon.setMap(map);
  


// Definición de coordenadas para la zona 2
const zona2 = [
  { lat: 3.397853, lng: -76.532221 },
  { lat: 3.397420, lng: -76.527959 },
  { lat: 3.392911, lng: -76.528240 },
  { lat: 3.393268, lng: -76.532246 },

];

// Configuración del polígono para la zona 2
const zona2Polygon = new google.maps.Polygon({
  title: "Zona 2",
  paths: zona2,
  strokeColor: "#0000FF",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#0000FF",
  fillOpacity: 0.35
});
zona2Polygon.setMap(map);



// Definición de coordenadas para la zona 3
const zona3 = [
  { lat: 3.397930, lng: -76.534926 },
  { lat: 3.397853, lng: -76.532425 },
  { lat: 3.391687, lng: -76.532562 },
  { lat: 3.392006, lng: -76.535369 },

];

// Configuración del polígono para la zona 3
const zona3Polygon = new google.maps.Polygon({
  title: "Zona 3",
  paths: zona3,
  strokeColor: "#0000FF",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#0000FF",
  fillOpacity: 0.35
});
zona3Polygon.setMap(map);

// Definición de coordenadas para la zona 4
const zona4 = [
  { lat: 3.396904, lng: -76.540857 },
  { lat: 3.395761, lng: -76.540849 },
  { lat: 3.395894, lng: -76.5382 },
  { lat: 3.396851, lng: -76.538139 },

];



  // Crear un arreglo de polígonos
  const polygons = [zona1Polygon, zona2Polygon, zona3Polygon];

// Establecer la opacidad inicial de los polígonos
polygons.forEach((polygon) => {
  polygon.setOptions({ fillOpacity: 0.2 });
});

  // Configurar un InfoWindow global
  const globalInfoWindow = new google.maps.InfoWindow();
  // Agregar un evento al mapa para cerrar todas las ventanas de información
  google.maps.event.addListener(map, "click", function () {
    infoWindows.forEach((infoWindow) => {
      infoWindow.close();
    });

    google.maps.event.addListener(map, "click", function () {
      globalInfoWindow.close();
    });

  });

  // Define el estilo por defecto y otros estilos
  const styleDefault = {
    strokeColor: "#0000FF",
    strokeOpacity: 1, // Opacidad inicial baja
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.2, // Opacidad inicial baja
  };

  const styleMouseOver = {
    ...styleDefault,
    strokeWeight: 5, // Hacer el trazo más ancho en el mouseover
  };

  // Agregar eventos de mouseover y click para cada polígono
  polygons.forEach((polygon) => {
    polygon.addListener("mouseover", function () {
      polygon.setOptions(styleMouseOver); // Cambiar estilo en mouseover
    });

    polygon.addListener("mouseout", function () {
      // Restaurar el estilo por defecto al salir del mouse si no está seleccionado
      if (selectedPolygon !== polygon) {
        polygon.setOptions(styleDefault);
      }
    });

    polygon.addListener("click", function (event) {
      // Cambiar estilo al dar clic y guardar el polígono seleccionado
      polygon.setOptions({ strokeOpacity: 5, fillOpacity: 0.7 });
      if (selectedPolygon && selectedPolygon !== polygon) {
        selectedPolygon.setOptions(styleDefault); // Restaurar el estilo del polígono previamente seleccionado
      }
      selectedPolygon = polygon;

      const contentString = `
        <div class="card text-start" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${polygon.title}</h5>
            <p class="card-text">Ubicación: ${event.latLng.lat()}, ${event.latLng.lng()} Zona 1: 59 predios</p>
            <a href="#" class="btn btn-sm btn-primary">Ir a algún lugar</a>
          </div>
        </div>
      `;
      globalInfoWindow.setContent(contentString);
      globalInfoWindow.setPosition(event.latLng);
      globalInfoWindow.open(map);
    });
  });

// Define la función para crear marcadores comunes
function markerCommon(labelText) {
  return {
    path: 'M 8.4 0.2 A 0.5 0.5 90 0 0 7.6 0.2 L 4.6 4.7 A 0.5 0.5 90 0 0 5 5.5 H 5.1 L 3.1 8.7 A 0.5 0.5 90 0 0 3.5 9.5 H 3.7 L 2.1 12.8 A 0.5 0.5 90 0 0 2.5 13.5 H 7 V 16 H 9 V 13.5 H 13.5 A 0.5 0.5 90 0 0 13.9 12.8 L 12.3 9.5 H 12.5 A 0.5 0.5 90 0 0 12.9 8.7 L 10.9 5.5 H 11 A 0.5 0.5 90 0 0 11.4 4.7 L 8.4 0.2 Z Z',
    label: labelText,
    fillColor: 'green',
    fillOpacity: 3,
    anchor: new google.maps.Point(10, 0),
    strokeWeight: 1,
    scale: 2,
    color: 'white',
    fontSize: '16px',
  };
}

// Define la función para crear marcadores comunes
function markerConstruction(labelText) {
  return {
    path: 'm9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z',
    label: labelText,
    fillColor: 'yellow',
    fillOpacity: 3,
    anchor: new google.maps.Point(10, 0),
    strokeWeight: 1,
    scale: 2,
    color: 'white',
    fontSize: '16px',
  };
}

// Define la función para crear marcadores comunes
function markerHueco(labelText) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    label: labelText,
    fillColor: 'red',    
    animation: google.maps.Animation.BOUNCE,
    fillOpacity: 5,
    anchor: new google.maps.Point(0, 0),
    strokeWeight: 2,
    scale: 7,
    color: 'white',
    fontSize: '16px',
  }; 

}

// Define la función para crear el marcador de cruz
function markerChurch(labelText) {
  return {
    path: 'M 12 5 L 12 5 L 17 5 L 17 12 L 22 12 L 22 17 L 17 17 L 17 24 L 12 24 L 12 17 L 7 17 L 7 12 L 12 12 L 12 5 Z',
    fillColor: 'yellow',
    fillOpacity: 4,
    anchor: new google.maps.Point(10, 0),
    strokeWeight: 2,
    scale: 1.5,
    labelOrigin: new google.maps.Point(12, 10),
    label: {
      text: labelText,
      color: 'white',
      fontSize: '16px',
    },
  };
}

// Coordenadas de los marcadores
const markerCoordinates = [
  { lat: 3.3953091387162466, lng: -76.53082652224637, label: 'Parque' },
  { lat: 3.3952639558878492, lng: -76.52963092757798, label: 'Parque' },
  { lat: 3.395728787005886, lng: -76.52981962392562, label: 'Iglesia' },
  { lat: 3.3953710, lng: -76.52699163390733, label: 'Parque' },
  { lat: 3.3948998156824968, lng: -76.52569032228432, label: 'Parque' },
  { lat: 3.395763, lng:  -76.539995 , label: 'Hueco' },
];

// Agregar marcadores utilizando un bucle
markerCoordinates.forEach((coordinate) => {
  const marker = new google.maps.Marker({
    position: coordinate,
    map: map,
    icon: coordinate.label === 'Iglesia' ? markerChurch(coordinate.label) : 
          (coordinate.label === 'Parque Javier Adad' ? markerConstruction(coordinate.label) :
          (coordinate.label === 'Hueco' ? markerHueco(coordinate.label) : markerCommon(coordinate.label))),
    });

// Agregar un evento click para mostrar la etiqueta al hacer clic en el marcador
marker.addListener('click', function() {
  // Cerrar la InfoWindow actual si está abierta
  if (currentInfoWindow) {
    currentInfoWindow.close();
    currentInfoWindow = null; // Restablecer la referencia a la InfoWindow
  }

  // Crear una nueva InfoWindow y abrirla
  const infoWindow = new google.maps.InfoWindow({
    content: coordinate.label,
  });
  infoWindow.open(map, marker);

  // Actualizar la referencia a la InfoWindow actual
  currentInfoWindow = infoWindow;
});
});
}

window.initMap = initMap;