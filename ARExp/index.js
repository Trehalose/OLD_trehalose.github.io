(function() {	//Not sure what this is supposed to do, but without it don't function so swell
	//When this document loads
	window.addEventListener('DOMContentLoaded', function() {
		var vid = document.getElementById('vid');	//our video
		var datCanvass = document.getElementById('datCanvass');	//our canvas element (where the magic tends to happen
		var ctx = datCanvass.getContext('2d');	//more canvas stuff, stuff that processes things to be drawn
		var w = 640;	//video resolution stuff
		var h = 480;	//ditto
		
		var constraints = {	//variable to alter when i figure out how to access specific cameras for mobile devices
			video: true,	//yes beedeyo
			audio:false	//no audio
		};
		function successCallback(stream) {	//When the media-call is a WIN
			var url = window.URL || window.webkitURL;	//I have no idea what this does, but it is necessary for streaming from cam.
			vid.src = url ? url.createObjectURL(stream) : stream;	//Set the video's source(the video). Not sure about this specific code in it though. It's foreign to source linking that I'm used to, but necessary for streaming from cam.
			// Set the video to play
			vid.play();
		}
		function errorCallback(error) {	//When the media call is a LOSE
			alert("Could not access your camera for some reason.");
			return;
		}

		//For allowing the getUserMedia call to be a cross-browser experience
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		if (navigator.getUserMedia) {
			navigator.getUserMedia(constraints, successCallback, errorCallback);	//The magic call for accessing getUserMedia. Counts as a cross-domain call and as such does not work so-good on LOCAL.
		}
		else {
			alert('Sorry, the browser you use is inferior. Update and assimilate');	//If you have a camera but your browser is not up to my personal standards of being able to handle me
			return;
		}

		// When the video plays(should be on auto in markup, 	TODO: if not, fix later)
		vid.addEventListener('play', function() {
			// Every 24 milliseconds copy the video image to the canvas
			setInterval(function() {
				ctx.fillRect(0, 0, w, h);	//DRAW A RECTANGLE ON CANVAS TO BE FANCY IF THE VIDEO ISNT THERE
				ctx.drawImage(vid, 0, 0, w, h);	//DRAW THE VIDEO ON CANVAS TO BE FANCY IF THE VIDEO IS THERE
			}, 24);
		}, false);	//FALSE, like everything we thought we believed.
		
	})
})();