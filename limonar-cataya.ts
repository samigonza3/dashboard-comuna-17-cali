let map;
let infoWindows = []; // Almacenar todas las ventanas de información en un arreglo
let selectedPolygon = null;
let currentInfoWindow = null; // Almacena la InfoWindow actualmente abierta

function initMap() {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      zoom: 16,
      center: { lat: 3.3984224839695862, lng: -76.5401101741356 },
      mapTypeId: "satellite",
      disableDefaultUI: true,
      scaleControl: false,
      panControl: false,
      zoomControl: true,
    });
  }

  
// Definición de coordenadas para la zona 1
const zona1 = [
  { lat: 3.397988, lng: -76.542426 },
  { lat: 3.397003, lng: -76.542800 },
  { lat: 3.396984, lng: -76.540155 },
  { lat: 3.397991, lng: -76.540159 },
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
  { lat: 3.397991, lng: -76.540159 },
  { lat: 3.397992, lng: -76.53808 },
  { lat: 3.396961, lng: -76.53813 },
  { lat: 3.396984, lng: -76.540155 },

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
  { lat: 3.396934, lng: -76.542803 },
  { lat: 3.395594, lng: -76.543243 },
  { lat: 3.395761, lng: -76.540849 },
  { lat: 3.396904, lng: -76.540857 },

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

// Configuración del polígono para la zona 4
const zona4Polygon = new google.maps.Polygon({
  title: "Zona 4",
  paths: zona4,
  strokeColor: "#0000FF",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#0000FF",
  fillOpacity: 0.35
});
zona4Polygon.setMap(map);

const zona5 = [
  { lat: 3.401750, lng: -76.536947 },
  { lat: 3.401169, lng: -76.539551 },
  { lat: 3.398299, lng: -76.539521 },
  { lat: 3.398209, lng: -76.538058 },

];

const zona5Polygon = new google.maps.Polygon({
  title: "Zona 5",
  paths: zona5,
  strokeColor: "#0000FF", // Cambié el color a rojo
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#0000FF", // Cambié el color de relleno a rojo
  fillOpacity: 0.35
});
zona5Polygon.setMap(map);

const zona6 = [
  { lat: 3.400891, lng: -76.541519 },
  { lat: 3.401152, lng: -76.539555 },
  { lat: 3.398305, lng: -76.539599 },
  { lat: 3.398305, lng: -76.542336 },

];

const zona6Polygon = new google.maps.Polygon({
  title: "Zona 6",
  paths: zona6,
  strokeColor: "#0000FF", // Cambié el color a rojo
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#0000FF", // Cambié el color de relleno a rojo
  fillOpacity: 0.35
});
zona6Polygon.setMap(map);

  // Crear un arreglo de polígonos
  const polygons = [zona1Polygon, zona2Polygon, zona3Polygon, zona4Polygon, zona5Polygon, zona6Polygon];

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
  { lat: 3.396063275732282, lng: -76.54206818671648, label: 'Parque Cataya' },
  { lat: 3.3964381254899467, lng: -76.54014236064378, label: 'Parque Limonar' },
  { lat: 3.3977494446551546, lng: -76.53913693210097, label: 'Parque Cra. 66' },
  { lat: 3.3999733557797853, lng: -76.53903799405079, label: 'Parque El Limonar' },
  { lat: 3.3972199545161264, lng: -76.53917676539842, label: 'Iglesia Nuestra Sra. del Camino' },
  { lat: 3.3966741371725355, lng: -76.5403328438722, label: 'Parque Javier Adad' },
  { lat: 3.395763, lng:  -76.539995 , label: 'Hueco' },
  { lat: 3.397487704037055, lng:  -76.54011553855364 , label: 'Hueco' },
  { lat: 3.396983797409074, lng:  -76.54011553855364 , label: 'Hueco' },
  { lat: 3.39588254799276, lng:  -76.53838544888312 , label: 'Hueco' },
];

// Agregar marcadores utilizando un bucle
markerCoordinates.forEach((coordinate) => {
  const marker = new google.maps.Marker({
    position: coordinate,
    map: map,
    icon: coordinate.label === 'Iglesia Nuestra Sra. del Camino' ? markerChurch(coordinate.label) : 
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