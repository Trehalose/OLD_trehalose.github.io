﻿
//RUN WHEN THE PAGE CONTENT LOADS
window.addEventListener('DOMContentLoaded', function() {
	//ACESS DAT CAMERA HOMINAHOMINAHOMINA
	var video = document.createElement('video');
	video.width = 640;
	video.height = 480;
	var datCanvass = document.getElementById("datCanvass");
	var ctx = datCanvass.getContext("2d");
		//Check if the getUserMedia is available in the browser
	navigator.getUserMedia  = navigator.getUserMedia ||
							  navigator.webkitGetUserMedia ||
							  navigator.mozGetUserMedia ||
							  navigator.msGetUserMedia;

	var video = document.querySelector('video');
		//If getUserMedia is in browser... or else
	if (navigator.getUserMedia) {
	  navigator.getUserMedia({video: true}, function(stream) {
		video.src = window.URL.createObjectURL(stream);
	  }, errorCallback);
	} else {
		alert("Your browser does not support the 'getUserMedia' feature. I suggest using Chrome Beta or Chrome Canary");
	}
	//DRAW VIDEO FRAMES TO THE CANVAS, because canvas is BOSS in html5. Canvas is my homie, yo!
	ctx.drawImage(video, 0, 0, 640, 480);
});