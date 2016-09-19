$(document).ready(function() {
	var lat= 60.164159;
	var longitude = 24.922583;
	showOnMap(lat,longitude);
	var marker;
	$(".bottomNav li").click(function(){
		if($(this).attr("class")!="active"){
			$(".bottomNav li").removeClass("active");
			openBottomDiv();
			$(this).addClass("active");
			if($(this).index()==0){
				$(".bottomDiv").html("Near you");
			}else{
				$(".bottomDiv").html("Favorite");
			}
		} else {
			closeBottomDiv()
			$(this).removeClass("active");
			$(".bottomDiv").html("");
		}
	})
});

function openNav(){
	$(".sidenav").css("left","0");
	$("#blackOverlay").css("display", "block");
}

function closeNav(){
	$(".sidenav").css("left","-70%");
	$("#blackOverlay").css("display", "none");
}

function openBottomDiv(){
	$(".bottomDiv").css("height","70%");
	$("#blackOverlay").css("display", "block");
}

function closeBottomDiv(){
	$(".bottomDiv").css("height","0");
	$("#blackOverlay").css("display", "none");
	$(".bottomNav li").removeClass("active");
}


function gotPosition (position) {
	alert("got position: " + position);
}

function errorGettingPosition(error) {
	alert("getCurrentPosition failed with error: " + error);
}

function showOnMap(lat, longitude) {
	var markerBike, i;
	var infowindow = new google.maps.InfoWindow();
	var initZoom = 16;
	var myCoords = new google.maps.LatLng(lat, longitude);
	var myOptions = {
		zoom: initZoom,
		center: myCoords,
	};

	var map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);

	$.getJSON( "http://api.digitransit.fi/routing/v1/routers/hsl/bike_rental")
	.done(function( json ) {
		for (i = 0; i < json.stations.length; i++) {
			markerBike = new google.maps.Marker({
				position: new google.maps.LatLng(json.stations[i].y, json.stations[i].x),
				map: map,
				icon: 'img/largeBike.png'
			});
			google.maps.event.addListener(markerBike, 'click', (function(markerBike, i) {
				return function() {
					var content = '<div class="cityBike"><div class="title"><h3>Citybike Station</h3><img src="img/heart.png" alt="love icon" onclick="toggleIcon(this)" class="loveIcon"><br><span>'+json.stations[i].name+ '</span><h4 class="info"> Bike Available: '+json.stations[i].bikesAvailable + '/' +(json.stations[i].bikesAvailable+json.stations[i].spacesAvailable)+ '</h4></div>' ;
					for (counter = 0; counter < (json.stations[i].bikesAvailable); counter++) {
						content+='<div class="freeBike">&nbsp;</div>';
					}
					for (counter = 0; counter < (json.stations[i].spacesAvailable); counter++) {
						content+='<div class="freeSpot">&nbsp;</div>';
					}
					content+='<hr class="separate"><button class="register"><a href="https://www.hsl.fi/citybike">Register to use</a></button><br><br><a href="https://www.hsl.fi/kaupunkipyorat" class="moreInfo"><span class="glyphicon glyphicon-info-sign"></span> More information</a></div>';
					infowindow.setContent(content);
					infowindow.open(map, markerBike);
				}
			})(markerBike, i));

			google.maps.event.addDomListener(map,'zoom_changed',(function(markerBike, i) {
				return function() {
					var zoomLevel =  map.getZoom();
					if (zoomLevel <14) {
						markerBike.setIcon('img/smallBike.png');
					}
					else {
						markerBike.setIcon('img/largeBike.png');
					}
				}})(markerBike, i));
		}

	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});

	$("#location").click(function(){
		marker = new google.maps.Marker({
			position: myCoords,
			map: map,
			title: "Here I am!"
		});
	});

	$("#save").click(function(){
		if(typeof(Storage) !== "undefined") {
			var string = Date() + " : "+ myCoords;
			localStorage.setItem('history', string);
		} else {
			$("#locationHistory").text("Sorry, your browser does not support web storage.");
		}
	});

	$("#history").click(function(){
		if(typeof(Storage) !== "undefined") {
			$("#locationHistory").text(localStorage.getItem('history'));
		} else {
			$("#locationHistory").text("Sorry, your browser does not support web storage.");
		}
	});

	$("#clearHistory").click(function(){
		if(typeof(Storage) !== "undefined") {
			localStorage.removeItem('history')
			$("#locationHistory").text("");
		} else {
			$("#locationHistory").text("Sorry, your browser does not support web storage.");
		}
	});
}

function toggleIcon(element){
	if($(element).attr('class') =="loveIcon"){
		var src;
		if($(element).attr('src') =="img/heartFill.png"){
			src="img/heart.png";
		}else{
			src="img/heartFill.png";
		}
		$(element).fadeOut('fast', function () {
			$(element).attr('src', src);
			$(element).fadeIn('fast');
		});

	}
}

