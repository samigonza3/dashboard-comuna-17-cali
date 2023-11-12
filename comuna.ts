let map;
let infoWindows = []; // Almacenar todas las ventanas de información en un arreglo
let selectedPolygon = null;
let currentInfoWindow = null; // Almacena la InfoWindow actualmente abierta

function initMap() {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      zoom: 13,
      center: { lat: 3.3865264, lng: -76.5303159 },
      mapTypeId: "satellite",
      disableDefaultUI: true,
      scaleControl: false,
      panControl: false,
      zoomControl: true,
    });
  }

  
// Definición de coordenadas para la zona 1
const zona1 = [
  { lat: 3.400107,  lng: -76.546400 },
  { lat: 3.399680,  lng: -76.542301 },
  { lat: 3.410256,  lng: -76.538681 },
  { lat: 3.405517,  lng: -76.522732 },
  { lat: 3.393571,  lng: -76.513318 },
  { lat: 3.388414,  lng: -76.510011 },
  { lat: 3.388186464199814, lng: -76.513385796698 },
  { lat: 3.363012,  lng: -76.513882 },
  { lat: 3.362812,  lng: -76.524399 },
  { lat: 3.374303,  lng: -76.524717 },
  { lat: 3.374371,  lng: -76.529179 },
  { lat: 3.367572,  lng: -76.529713 },
  { lat: 3.373610,  lng: -76.541772 },
  { lat: 3.398191,  lng: -76.546516 },
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
  



  // Crear un arreglo de polígonos
  const polygons = [zona1Polygon];

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