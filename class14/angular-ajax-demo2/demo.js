var app = angular.module('myApp', ['ngMaterial']);
app.coords = {latitude: 43, longitude: -88}
app.clientId = 'IGKRWPQOO05XWHTEBGYDF2WJLRQYLUE5ENHP3Y3DHWCCIGOR';
app.clientSecret = 'IY14ATXF1HGRBJMQRNYSGJQDJBTM1MXCLPWROXPEVIECM4VR';

// controller for finding/displaying places
app.controller('placesCtrl', function($scope, $http) {
	// run something when the page loads
	angular.element(document).ready(function(){
		// get the current location
		navigator.geolocation.getCurrentPosition(app.setPosition);
	});
	
	
	// look up places using current location
	$scope.getPlaces = function(){
		// peform ajax request
		$http({
			method: 'get',
			url: 'https://api.foursquare.com/v2/venues/search',
			params: {
				client_id: app.clientId,
				client_secret: app.clientSecret,
				v: 20180323,
				ll: app.coords.latitude + ',' + app.coords.longitude,
				query: $scope.searchPlace
			}
		}).then(function(response){ // called when the response is received
			console.log(response);
			
			// pass venues to view
			$scope.places = response.data.response.venues;
		});
	};
	
	$scope.getDetails = function(place){
		// peform ajax request
		$http({
			method: 'get',
			url: 'https://api.foursquare.com/v2/venues/' + place.id,
			params: {
				client_id: app.clientId,
				client_secret: app.clientSecret,
				v: 20180323
			}
		}).then(function(response){ // called when the response is received
			console.log(response);
			
			// update the object 
			//place = response.data.response.venue;
			place.photos = response.data.response.venue.photos;
		});
	};

});

// called when the browser figures out the current location
app.setPosition = function(position){
	console.log(position);
	
	// store for later api lookups
	app.coords = position.coords;
};


	