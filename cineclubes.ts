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
    path: google.maps.SymbolPath.CIRCLE,
    label: labelText,
    fillColor: 'yellow',    
    animation: google.maps.Animation.BOUNCE,
    fillOpacity: 5,
    anchor: new google.maps.Point(0, 0),
    strokeWeight: 2,
    scale: 7,
    color: 'white',
    fontSize: '16px',
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