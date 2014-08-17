//TODO SET TO CANVAS CONTAINER

//WHEN THE WEBSITE LOADS... DO ALL THIS JUNK
document.addEventListener('DOMContentLoaded',function(){
	var videoElement = document.getElementById("vid");	//Our page's video source
	var datCanvass = document.getElementById("datCanvass");
	var ctx = datCanvass.getContext("2d");
    var w = 0;
    var h = 0;
    datCanvass.width = w;
    datCanvass.height = h;
	
	vid.addEventListener('play', function() {
	   // Every 33 milliseconds copy the video image to the canvas
	   setInterval(function() {
			if (vid.paused || vid.ended) return;
			w = vid.videoWidth;
			h = vid.videoHeight;
			datCanvass.width = w;
			datCanvass.height = h;
			ctx.fillRect(0, 0, w, h);
			ctx.drawImage(vid, 0, 0, w, h);
	   }, 33);
	}, false);

	//Get media devices from all the browsers
	navigator.getUserMedia = navigator.getUserMedia ||
	  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	function absorbAllTheSources(sourceInfos) {	//Get source data from devices
		  var videoSource = null;
		  for (var i = 0; i != sourceInfos.length; ++i) {	//loop through all sources, settle on last video source
			var sourceInfo = sourceInfos[i];
			if (sourceInfo.kind === 'video') {
			  videoSource = sourceInfo.id;
			}
		  }
		  sourceSelected(videoSource);
	}
	function sourceSelected(videoSource) {	//set video source to be recorded from. SNEAKY!!
	  var constraints = {
		audio: false,
		video: {
		  optional: [{sourceId: videoSource}]
		}
	  };

	  navigator.getUserMedia(constraints, successCallback, errorCallback);
	}

	if (typeof MediaStreamTrack === 'undefined'){
		alert('Sorry, the browser you use is inferior. Update and assimilate');	//If you have a camera but your browser is not up to my personal standards of being able to handle me
	}
	else {
		MediaStreamTrack.getSources(absorbAllTheSources);
	}


	function successCallback(stream) {	//When the media call is a WIN
	  window.stream = stream;
	  videoElement.src = window.URL.createObjectURL(stream);
	  videoElement.play();
	}

	function errorCallback(error){	//When the media call is a LOSE
		alert("Could not access your camera for some reason.");
	}
});