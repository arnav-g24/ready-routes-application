//Entire file is from Adolfo
let sourceAutocomplete, destAutocomplete;
let loop = document.getElementById("loop");
let tb = document.getElementById("tb");
let tbCheck = false;

function initMap() {
  //assigns directions services to javacript constants to avoid typing everything asll over again
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({draggable:true,}); //draggable makes it so that we can drag the legs of the loop and modify

  //create the map and assigns it to the div in HTML with the corresponding Id
  let map = new google.maps.Map(document.getElementById("map"), {
    //30.6149996259997, -96.34153199058316 A&M University coordinates
    center: { lat: 30.614, lng: -96.34},
    zoom: 15,
  });

  directionsRenderer.setMap(map);

  //Uses Places API so that it autocompletes when typing in the inputs, have to do it for each input
  //each input is given a different Id in HTML
  let sourceAutocomplete = new google.maps.places.Autocomplete(document.getElementById("origin"));
  let firstAutocomplete = new google.maps.places.Autocomplete(document.getElementById("first"));
  let secondAutocomplete = new google.maps.places.Autocomplete(document.getElementById("second"));
  let thirdAutocomplete = new google.maps.places.Autocomplete(document.getElementById("third"));
  let destinationAutocomplete = new google.maps.places.Autocomplete(document.getElementById("end"));


  //when the button with the "submit" id is click the calcRoute function runs
  document.getElementById("loop").addEventListener("click", () => {
    chooseRouteOption();
  });
  document.getElementById("tb").addEventListener("click", () => {
    chooseRouteOption();
  });
  
  document.getElementById("submit").addEventListener("click", () => {
    getLocation(directionsService, directionsRenderer);
  });
}

function getLocation(directionsService, directionsRenderer) {
  if (navigator.geolocation) {
    const successCallback = (position) => {
      console.log(position);
      var userLatLong= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      calcRoute(directionsService, directionsRenderer, userLatLong)
    };
    const errorCallback = (error) => {
      console.error(error);
      var inputSource = document.getElementById("origin").value; 
      calcRoute(directionsService, directionsRenderer, inputSource);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else { 
    var inputSource = document.getElementById("origin").value; 
    calcRoute(directionsService, directionsRenderer, inputSource);
  }
}


// calcRoute function is defined and the google services will need to be passed as parameters since we will use
//them here again
function calcRoute(directionsService, directionsRenderer, userOrigin){
  //gets the values typed by the user into the HTML inputs and assigns it to a javascript variable 
  //var source = new google.maps.LatLng(defaultOrigin[0], defaultOrigin[1]);
  //var source = document.getElementById("source").value; 
  var source = userOrigin;
  var first = document.getElementById("origin").value;
  // var second = document.getElementById("second").value;
  // var third = document.getElementById("third").value; 
  var waypnt;
  if (tbCheck = false){
    // waypnt = [{location: first,},{location: second,},{location: third,}]
  }else if (tbCheck = true){
    var point1 = document.getElementById("end").value;
    waypnt = [{location: point1}]
  }

  //make an array that contain all the waypoints for the route 
  //object that will be used in directionsService.route 
  let request = {
      origin: source,
      destination: source, //source is assigned to both origin and destination since we want a closed loop
      waypoints: waypnt, //waypoint array used here 
      travelMode: "WALKING", //this can be changed to DRIVING, BICYCLING, TRANSIT, etc
      //there are more details that can be added to this object but not necessary for this program
  };
  //asks the directions api for a route using the previously defined object
  //and a callback function
  //if a route is succesfully obtained it will be assigned to the result variable and the status will be 
  //set to 'OK', we check for this condition in the if statement
  directionsService.route(request, function(result, status){
      if(status == 'OK'){
          //renders the route on the map
          directionsRenderer.setDirections(result); 
      }
  });
}

//Toggle Button Script for testing---------------------------------
function checkRadio(name) {
  if (name == "Loop") {
    console.log("Choice: ", name);
    document.getElementById("end").style.display='none';
    document.getElementById("distance").style.display='block';
    tbCheck = false;

  } else if (name == "To-Back") {
    console.log("Choice: ", name);
    document.getElementById("end").style.display='block';
    document.getElementById("distance").style.display='none'; //hello
    tbCheck = true;
  }
}

//------------------------------------------------------------------

window.initMap = initMap;