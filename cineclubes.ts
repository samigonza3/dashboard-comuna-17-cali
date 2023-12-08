let map;
let infoWindows = []; // Almacenar todas las ventanas de información en un arreglo
let selectedPolygon = null;
let currentInfoWindow = null; // Almacena la InfoWindow actualmente abierta

function initMap() {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      zoom: 11.8,
      center: { lat: 3.44, lng: -76.5303159 },
      mapTypeId: "satellite",
      disableDefaultUI: true,
      scaleControl: false,
      panControl: false,
      zoomControl: true,
    });
  }

  

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
  { lat: 3.4558323, lng:  -76.5256986 , label: 'Cine Quanon' },
  { lat: 3.4557832, lng:  -76.5302506 , label: 'Casa Mangle' },
  { lat: 3.392523, lng:  -76.5460429 , label: 'Oromo' },
  { lat: 3.4406607, lng:  -76.549231 , label: 'EnBiciArte' },
  { lat: 3.4095661, lng:  -76.5193826 , label: 'Cine Consciencia' },
  { lat: 3.4500471, lng:  -76.7071516 , label: 'Cinerrante' },
  { lat: 3.4529044, lng:  -76.5388781 , label: 'Cinestribos' },
  { lat: 3.4498315, lng:  -76.5387631 , label: 'Sala Audiovisual' },
  { lat: 3.4478189, lng:  -76.5412893 , label: 'Cafe Macondo' },
  { lat: 3.4447028, lng:  -76.5490525 , label: 'Los Cristales' },
  { lat: 3.4351843, lng:  -76.5447866 , label: 'Dulcencanto' },
  { lat: 3.4324338, lng:  -76.5480368 , label: 'Cinemandra' },
  { lat: 3.440148, lng:  -76.5356076 , label: 'La Negrona' },
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