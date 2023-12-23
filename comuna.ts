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
  title: "Comuna 17",
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

// Define la función para crear marcadores comunes
function markerPark(labelText) {
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


// Coordenadas de los marcadores
const markerCoordinates = [
   { lat: 3.3999617483659454,lng:  -76.53906928441614 , label: 'Parque' },
   { lat: 3.3890270198965964,lng:  -76.54149894288598 , label: 'Parque' },
   { lat: 3.3760819412236267,lng:  -76.53861708287884 , label: 'Parque' },
   { lat: 3.3833122858529863,lng: -76.53112853958129 , label: 'Parque' },
   { lat: 3.396843079802499,lng: -76.5224847976983 , label: 'Parque' },
   { lat: 3.3953909520946497,lng: -76.52250248600515 , label: 'Parque' },
   { lat: 3.3953909520946497,lng: -76.52250248600515 , label: 'Parque' },
   { lat: 3.3951413401736845, lng: -76.52049220746586 , label: 'Parque' },
   { lat: 3.3965042601594857,  lng: -76.52003815942278 , label: 'Parque' },
   { lat: 3.3937769844161636,  lng: -76.51789218413116 , label: 'Parque' },
   { lat: 3.3864843326894376,  lng: -76.53174821964623 , label: 'Parque' },
   { lat: 3.386686522848349,  lng: -76.52254477159123 , label: 'Parque' },
   { lat: 3.3836080203518963,   lng: -76.53735732036806 , label: 'Parque' },
   { lat: 3.393039945607696,    lng: -76.51656908724138 , label: 'Parque' },
   { lat: 3.391429934198953,    lng: -76.51857999750557  , label: 'Parque' },
   { lat: 3.3914952547632704,    lng: -76.51721311381586  , label: 'Parque' },
   { lat: 3.397684891992662,   lng: -76.5190131925839   , label: 'Parque' },
   { lat: 3.374913413196946,   lng: -76.52817799433475  , label: 'Parque' },
   { lat: 3.3851547372344877,   lng: -76.54093840144236  , label: 'Parque' },
   { lat: 3.396015763436757,    lng: -76.54204041130477  , label: 'Parque' },
   { lat: 3.396446242698571,    lng: -76.54017011986056  , label: 'Parque' },
   { lat: 3.397765806036558,     lng: -76.53914170555261 , label: 'Parque' },
   { lat: 3.3973987652206006,      lng: -76.54449657293115 , label: 'Parque' },
   { lat: 3.408389181195292,  lng: -76.53793079626516 , label: 'Parque' },
   { lat: 3.394870407375609,   lng: -76.52701961470508 , label: 'Parque' },
   { lat: 3.3932794329718163,   lng: -76.52088443807092  , label: 'Parque' },
   { lat: 3.39518607741492,    lng: -76.53071866630361  , label: 'Parque' },
   { lat: 3.4008646133461533,    lng: -76.52980594125204   , label: 'Parque' },
   { lat: 3.3989874143715126,    lng: -76.53421099422164   , label: 'Parque' },
   { lat: 3.4027785206246115,    lng: -76.52349077808022    , label: 'Parque' },
   { lat: 3.407205868269389,   lng: -76.53090905763183    , label: 'Parque' },
   { lat: 3.3965052516766194,  lng: -76.53659483659577   , label: 'Parque' },
   { lat: 3.3972474, lng: -76.5747762   , label: 'Universidad' },


];

// Agregar marcadores utilizando un bucle
markerCoordinates.forEach((coordinate) => {
  const marker = new google.maps.Marker({
    position: coordinate,
    map: map,
    icon: coordinate.label === 'Parque' ? markerPark(coordinate.label) : 
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