//TODO SET TO CANVAS CONTAINER

//WHEN THE WEBSITE LOADS... DO ALL THIS JUNK
document.addEventListener('DOMContentLoaded',function(){
	var videoElement = document.getElementById("vid");	//Our page's video source
	var datCanvass = document.getElementById("datCanvass");	//Our page's canvas viewport
	var ctx = datCanvass.getContext("2d");	//the proverbial brush that paints our canvas
    var w = 0;	//Temp settings for canvas/video resolution. Will adjust to fit the loaded camera settings
    var h = 0;	//ditto
    datCanvass.width = w;	//ditto
    datCanvass.height = h;	//ditto
	
	vid.addEventListener('play', function() {	//When video plays, do this neat junk.
	   setInterval(function() {	//Timer event for drawing to the canvass. Updates every 24 millisecs
			if (vid.paused || vid.ended) return;
			w = vid.videoWidth;
			h = vid.videoHeight;
			datCanvass.width = w;
			datCanvass.height = h;
			ctx.fillRect(0, 0, w, h);
			ctx.drawImage(vid, 0, 0, w, h);
	   }, 24);
	}, false);

	//Get media devices from all the browsers
	navigator.getUserMedia = navigator.getUserMedia ||
	  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	function absorbAllTheSources(sourceInfos) {	//Get the source data from devices (info on cams mics etc)
		  var videoSource = null;
		  for (var i = 0; i != sourceInfos.length; ++i) {	//loop through all sources, settle on last video source
			var sourceInfo = sourceInfos[i];
			if (sourceInfo.kind === 'video') {
			  videoSource = sourceInfo.id;
			}
		  }
		  sourceSelected(videoSource);
	}
	function sourceSelected(videoSource) {	//set video source that is to be recorded from. SNEAKY!!
	  var constraints = {
		audio: false,
		video: {
		  optional: [{sourceId: videoSource}]
		}
	  };

	  navigator.getUserMedia(constraints, successCallback, errorCallback);	//this is the magic call that does the actions.
	}

	if (typeof MediaStreamTrack === 'undefined'){
		alert('Sorry, the browser you use is inferior. Update and-or assimilate');	//If you have a camera but your browser is not up to my personal standards of being able to handle me
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