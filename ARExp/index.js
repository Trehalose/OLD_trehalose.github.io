var DEBUG = false;	//Set the  JSKIT build-in debugging info, TRUE FOR SEEING DEBUG CANVAS STUFF(also make it visible in html)
var threshold = 130;	//marker detection threshold(the BW image we detect marker accuracy from ORIG: 128
var markerScale = 120;	//idk yo.
	
//STEP 5: MATRIX ELEMENTS
	/*function checkWebGl(!Detector.webgl){
		Detector.addGetWebGLMessage();
		throw new Error('Your browser does not seem to support WebGL');
	}*/
	THREE.Matrix4.prototype.setFromArray = function(m){	//THREEJS matrix conversion method. The intermediary.
		return this.set(
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]
		);
	};
	function copyMarkerMatrix(arMat, glMat) {	//the JSKIT Matrix conversion method. Not even gonna try to explain it. Necessary part of tutorial TODO: study and understand later
        glMat[0] = arMat.m00;
        glMat[1] = -arMat.m10;
        glMat[2] = arMat.m20;
        glMat[3] = 0;
        glMat[4] = arMat.m01;
        glMat[5] = -arMat.m11;
        glMat[6] = arMat.m21;
        glMat[7] = 0;
        glMat[8] = -arMat.m02;
        glMat[9] = arMat.m12;
        glMat[10] = -arMat.m22;
        glMat[11] = 0;
        glMat[12] = arMat.m03;
        glMat[13] = -arMat.m13;
        glMat[14] = arMat.m23;
        glMat[15] = 1;
    }
	function showChildren(object3d, visible){
		var children = object3d.children;
		for(var k = 0; k < children.length; k++){
			if(children[k] instanceof THREE.Mesh){
				children[k].visible = visible;
			}
		}
	}
	
//WHEN THE WEBSITE LOADS... DO ALL THIS JUNK
document.addEventListener('DOMContentLoaded',function(){
	//checkWebGl();	//Checks for WebGL, which is what THREEJS is a framework/wrappy-thingy for.
//STEP 1: OUR MAIN CANVAS ELEMENT.
	var w = 0;	//Temp settings for canvas/video resolution. Will adjust to fit the loaded camera settings
    var h = 0;	//ditto
	var datCanvass = document.getElementById("datCanvass");	//Our page's canvas viewport
	var debugCanvas = document.getElementById("debugCanvas");	//Our page's debug canvas
	var ctx = datCanvass.getContext("2d");	//the proverbial brush that paints our canvas
    //datCanvass.width = w;	//ditto
    //datCanvass.height = h;	//ditto
	
//STEP 2: OUR VIDEO ELEMENT AND PREP
	var vid = document.getElementById("vid");	//Our page's video source
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
	  vid.src = window.URL.createObjectURL(stream);
	  vid.play();
	}
	function errorCallback(error){	//When the media call is a LOSE
		alert("Could not access your camera for some reason. Try plugging it in.");
	}
	
//STEP 3: INITIALIZE JS AR TOOLKIT, LIKE A FOX YO. SUCKAS DONT KNOW WHAT HIT EM
	// Most of the remaining codes are from the JSARTOOLKIT tutorial (http://www.html5rocks.com/en/tutorials/webgl/jsartoolkit_webrtc/), with modifications that suit var name quirks and little things like that.
	var raster = new NyARRgbRaster_Canvas2D(datCanvass);	//creates an RGB raster obj for the main canvas
	var param = new FLARParam(w, h);	//sets camera parameters. TODO: MUST BE SAME SIZE AS RASTER OR GETS UNCAUGHT OBJ ERROR
	var detector = new FLARMultiIdMarkerDetector(param, markerScale); //marker detection engine. VROOM VROOM VROOM!~
	detector.setContinueMode(true);
		
//STEP 6: INITIALIZE THEEJS STUFF
	var renderer = new THREE.WebGLRenderer({	//create the renderer object for THREE
		antialias : true
	});
	renderer.setSize(w,h);	//TODO, SET CORRECT SIZE IN LOOP
	var ahhh = document.getElementById('ahhh');
	ahhh.appendChild(renderer.domElement);	//renderer's .domElement is a DOM element created in the THREE framework perhaps?
	var scene = new THREE.Scene();	//That ho is making a scene up in dis hurr hizzy
	var camera = new THREE.Camera();	//creates a camera and marker root obj for the scene!~
	var tmp = new Float32Array(16);	//for 3D rendering matrix library
	param.copyCameraMatrix(tmp, 10, 10000);	//zNear and zFar planes for perspective matrix
	camera.projectionMatrix.setFromArray(tmp); //helps use FLARP matrix
	//Create a scene and "quad" for the video?	REQUIRES CANVAS AS THE TEXTURE, VIDEO IS UNACCEPTABLE. That racist code.
	var videoTex = new THREE.Texture(datCanvass);
	var geometry = new THREE.PlaneGeometry(2,2);
	var material = new THREE.MeshBasicMaterial({
		map: videoTex,
		depthTest: false,
		depthWrite: false
	});
	var plane = new THREE.Mesh(geometry, material);
	var vidScene = new THREE.Scene();
	var vidCam = new THREE.Camera();
	vidScene.add(plane);
	vidScene.add(vidCam);
	
/*//STEP 7: STATS??
	//create a stat monitor?... okay, lets just see what that does
	var stats = new Stats();
	var statsahhh = document.getElementById('statsahhh');
	statsahhh.appendChild(stats.domElement);	//THREE framework perhaps has build-in domElement for stats object too?*/
	
//STEP 4: THE FRAME LOOP
	var resultMat = new NyARTransMatResult();	//for getting marker translation matrices
	var markerRoots= {};
	var markers = {};
	vid.addEventListener('play', function() {	//When video plays, do this neat junk.
	   setInterval(function() {	//Timer event for drawing to the canvass. Updates every 24 millisecs
			if (vid.paused || vid.ended) return;
			w = vid.videoWidth;	//SET ALL THE WIDTHS AND HEIGHTS
			h = vid.videoHeight;
			datCanvass.width = w;
			datCanvass.height = h;
			debugCanvas.width = w;
			debugCanvas.height = h;
			param.w = w;
			param.h = h;
			renderer.setSize(w,h);	//TODO SEE IF IT TAKES TWICE?
			//ctx.fillRect(0, 0, w, h);
			ctx.drawImage(vid, 0, 0, w, h);	//Draw to main canvas
			datCanvass.changed = true;	//tell raster that the canvas changed
			videoTex.needsUpdate = true;
			Object.keys(markerRoots).forEach(function(key){	//hide all markers first?
				showChildren(markerRoots[key], false);
			});
			var markerCount = detector.detectMarkerLite(raster, threshold);	//Do marker detection by using detector obj on raster obj
			for(var indx = 0; indx < markerCount; indx++){	//Go through detected markers and IDs and their matrices
				var id = detector.getIdMarkerData(indx);	//get id data for current marker
				//Read bytes from id packet?
				var currentId = -1;
				if(id.packetLength <= 4){	//only handles 32bit numbers or less
					currentId = 0;
					for(var j = 0; j < id.packetLength; j++){
						currentId = (currentId<<8) | id.getPacketData(j);
					}
				}
				if(typeof markers[currentId] === 'undefined'){	//If its a new ID, track that bitch!
					markers[currentId] = {};
					//creates new THREE obj as marker root
					var markerRoot = new THREE.Object3D();
					markerRoot.matrixAutoUpdate = false;
					markerRoots[currentId] = markerRoot;
					//add marker models to marker root obj
					var cube = new THREE.Mesh(
						new THREE.CubeGeometry(120,120,120),
						new THREE.MeshNormalMaterial({color: 0xff00ff, side: THREE.BackSide, wireframe: false})
					);
					cube.position.z = -60;
					markerRoot.add(cube);
					
					scene.add(markerRoot);	//add the marker root to the scene
				}
				detector.getTransformMatrix(indx, resultMat);	//Get trans matrix for the detected marker
				copyMarkerMatrix(resultMat, tmp);	//copy marker matrix to the temp matrix
				markerRoots[currentId].matrix.setFromArray(tmp);	//copy marker matrix to mark root objs
				markerRoots[currentId].matrixWorldNeedsUpdate = true;
				showChildren(markerRoots[currentId], true);//show children of this marker
				markers[currentId].transform = Object.asCopy(resultMat);	// copy resulting matric into marker tracker obj
			}
			//RENDER STUFF
			renderer.autoClear = false;
			renderer.clear();
			renderer.render(vidScene, vidCam);
			renderer.render(scene, camera);
			//Update stats
			//stats.update();
	   }, 24);
	}, false);	//MIGHT NOT NEED. TODO SEE ABOUT THAT
});