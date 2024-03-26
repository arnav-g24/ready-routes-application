//Entire file is from Adolfo

let sourceAutocomplete, destAutocomplete;

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({draggable:true,});
  let map = new google.maps.Map(document.getElementById("map"), {
    //30.6149996259997, -96.34153199058316 A&M University coordinates
    center: { lat: 30.614, lng: -96.34},
    zoom: 15,
  });

  directionsRenderer.setMap(map);
  sourceAutocomplete = new google.maps.places.Autocomplete(document.getElementById("source"))
  destAutocomplete = new google.maps.places.Autocomplete(document.getElementById("dest"))

  document.getElementById("submit").addEventListener("click", () => {
    calcRoute(directionsService, directionsRenderer);
  });
}


function calcRoute(directionsService, directionsRenderer){
  //var commons = new google.maps.LatLng(30.61559002223024,-96.33629578329555); // The Commons
  //var zach = new google.maps.LatLng(30.621374831665857,-96.34028658095146); //Zach
  var source = document.getElementById("source").value;
  var dest = document.getElementById("dest").value;
  let request = {
      origin: source,
      destination: dest,
      travelMode: "WALKING",
  };
  directionsService.route(request, function(result, status){
      if(status == 'OK'){
          directionsRenderer.setDirections(result); 
      }
  });
}

//Sidebar Scripts --------------------------------------------------
function openBar(){
  document.getElementById("mySidebar").style.display = "block";
}

function closeBar(){
  document.getElementById("mySidebar").style.display = "none";
}
//-------------------------------------------------------------------




window.initMap = initMap;