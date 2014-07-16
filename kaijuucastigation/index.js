$(document).ready(function(){
//THE BASE OBJECTS AND VARIABLES
		//API VARS
	var yourAPIKey = undefined;
	var playerName = undefined;
	var playerLvl = undefined;
	var lvl1Vocab = new Array();
	var lvl2Vocab = new Array();
	var lvl3Vocab = new Array();
	var lvl4Vocab = new Array();
	var lvl5Vocab = new Array();
	var lvl6Vocab = new Array();
	var lvl7Vocab = new Array();
	var lvl8Vocab = new Array();
	var lvl9Vocab = new Array();
	var lvl10Vocab = new Array();
		//CANVAS STUFF
	var canvas1 = document.getElementById("gameBoard1");
	var canvas1b = document.getElementById("gameBoard1b"); //TODO test drawing player sprites
	var canvas2 = document.getElementById("gameBoard2");
	var canvas3 = document.getElementById("gameBoard3");
	var canvas4 = document.getElementById("gameBoard4");
	var ct1 = canvas1.getContext("2d");
	var ct1b = canvas1b.getContext("2d"); //TODO test drawing player sprites
	var ct2 = canvas2.getContext("2d");
	var ct3 = canvas3.getContext("2d");
	var ct4 = canvas4.getContext("2d");
		//OTHER VARS
	var then = undefined;
	var ifMenu = true;
	var whichMenu = "start"; //start, pause, settings, map, quests, beasts, lose, transition, or null when not menuing
	var lastMenu = null;
	var ifGame = false;
	var whichMode = null; //explore, battle, cutscene
	var whichMap = null;
	var currentMap = null;
	var ifTutorial = false;
	var isDialog = false;
	var isCutscene = false;
	var isChoice = false;
	var currentPlace = null;
	var storyProgress = 0;
	var questsComplete = new Array();
	var lvlsUnlocked = 0;


		//PLAYER
	var player = {	//TODO IMAGE, FILL IN FUNCTIONS, ETC
		name: playerName,
		lvl: playerLvl,
		hp: 4,
		maxHP: 4,
		exp: 0,
		isAlive : true,
		isSmitten: false,
		isStunned: false,
		isHurt: false,
		isAttacking: false,
		isCollided: false,
		speed: 0,
		x: 0,
		y: 0,
		height: 100,
		width: 100,
		action: 0,
		frame: [], //which states character has, in relation to animation frames
		tempImage: new Image(),//TODO REMOVE LATER
		//tempImage.src: "/imgs/sprites/tempWK.jpg", //doesnt work with "." in declaring object items as such
		itemList: [],
		fieldList: [],
		move: function(direction){
			//TODO if up, down, left, right, if in battle or not
			for(var a = 0; a < map1.collidables.length; a++){		//TODO FIX WITH A MORE VARIABLE MAP-NAME
				collision(player, map1.collidables[a], direction);
			}
			map1.update(direction); //TODO FIX WITH MORE VARIABLE APPROP MAP NAME
			console.log(player.isCollided);
			switch (direction){
				case ("up"):
					if((player.y-9)>0){
						if(player.isCollided === false){
							player.y-=10;
						}
						else{
							console.log("COLLIDED UP");
							player.isCollided = false;
						}
					}
					break;
				case ("down"):
					if((player.y+100)<400){
						if(player.isCollided === false){
							player.y+=10;
						}
						else{
							console.log("COLLIDED DOWN");
							player.isCollided = false;
						}
					}
					break;
				case ("right"):
					if((player.x+100)<800){
						if(player.isCollided === false){
							player.x+=10;
						}
						else{
							console.log("COLLIDED RIGHT");
							player.isCollided = false;
						}
					}
					break;
				case ("left"):
					if((player.x-9)>0){
						if(player.isCollided === false){
							player.x-=10;
						}
						else{
							console.log("COLLIDED LEFT");
							player.isCollided = false;
						}
					}
					break;
				default:
					break;
			}
			
		},
		/*collisionCheck: function(direction){
			//TODO if up, down, left, right, if in battle or not
			switch (direction){
				case ("up"):
					for(var a = 0; a < map1.collidables.length; a++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if((((player.y - 10) < (map1.collidables[a].y + map1.collidables[a].tileH)) && ((player.y - 10) > (map1.collidables[a].y))) && (((player.x >= map1.collidables[a].x) && (player.x < (map1.collidables[a].x + map1.collidables[a].tileW))) || (((player.x + 100) > map1.collidables[a].x) && ((player.x + 100) <= (map1.collidables[a].x + map1.collidables[a].tileW))))){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				case ("down"):
					for(var b = 0; b < map1.collidables.length; b++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if((((player.y + 110) > map1.collidables[b].y) && ((player.y + 110) < (map1.collidables[b].y + 100))) && (((player.x >= map1.collidables[b].x) && (player.x < (map1.collidables[b].x + map1.collidables[b].tileW))) || (((player.x + 100) > map1.collidables[b].x) && ((player.x + 100) <= (map1.collidables[b].x + map1.collidables[b].tileW))))){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				case ("right"):
					for(var c = 0; c < map1.collidables.length; c++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if((((player.x + 110) < (map1.collidables[c].x + map1.collidables[c].tileW)) && ((player.x + 110) > (map1.collidables[c].x))) && (((player.y >= map1.collidables[c].y) && (player.y < (map1.collidables[c].y + map1.collidables[c].tileH))) || (((player.y + 100) > map1.collidables[c].y) && ((player.y + 100) <= (map1.collidables[c].y + map1.collidables[c].tileH))))){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				case ("left"):
					for(var d = 0; d < map1.collidables.length; d++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if((((player.x - 10) < (map1.collidables[d].x + map1.collidables[d].tileW)) && ((player.x - 10) > (map1.collidables[d].x))) && (((player.y >= map1.collidables[d].y) && (player.y < (map1.collidables[d].y + map1.collidables[d].tileH))) || (((player.y + 100) > map1.collidables[d].y) && ((player.y + 100) <= (map1.collidables[d].y + map1.collidables[d].tileH))))){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				default:
					break;
			}
			
		},*/
		update: function(){
			//TODO collect movement stuff: move, attack, hit, etc.
		//TODO account for appropriate context
				if(player.hp <= 0){
					ifGame = false;
					whichMode = null;
					ifMenu = true;
					whichMenu = "lose";
				}
		},
		draw: function(){ //DRAWS OUR HERO ON SCREEN
			ct1.drawImage(player.tempImage, player.x, player.y, player.width, player.height);
			//TODO ct1b.drawImage(player.tempImage, player.frame[player.action].x, player.frame[player.action].y, player.width, player.height, player.x, player.y, player.width, player.height);
			player.tempImage.src = "imgs/sprites/tempWK.jpg";
			//WHEN IN BATTLE, DRAW HP BAR BELOW HERO
			if(whichMode === "battle"){
				var hpBarWidth = Math.floor((player.hp/player.maxHP)*100); // adjusts HP bar based on percent pf HP player has left at the time
				ct1.lineWidth = 1;
				ct1.fillStyle = "#ff0000";
				ct1.strokeStyle = "#ffffff";
				ct1.fillRect(player.x,(player.y + player.height),hpBarWidth,5);
				ct1.strokeRect(player.x,(player.y + player.height),100,5);
			}
			
		},
		attack: function(){
			//TODO HPBAR choose from attack list and do proper ones
		}
	};


	function collision(thingA, thingB, direction){
		switch (direction){
			case ("up"):
				if((((thingA.y - 10) < (thingB.y + thingB.height)) && ((thingA.y - 10) > (thingB.y))) && (((thingA.x >= thingB.x) && (thingA.x < (thingB.x + thingB.width))) || (((thingA.x + thingA.width) > thingB.x) && ((thingA.x + thingA.width) <= (thingB.x + thingB.width))))){ //If collided from x and y coordinates of respective sides
					thingA.isCollided = true;
				}
				break;
			case ("down"):
				if((((thingA.y + thingA.height + 10) > thingB.y) && ((thingA.y + thingA.height + 10) < (thingB.y + 100))) && (((thingA.x >= thingB.x) && (thingA.x < (thingB.x + thingB.width))) || (((thingA.x + thingA.width) > thingB.x) && ((thingA.x + thingA.width) <= (thingB.x + thingB.width))))){ //If collided from x and y coordinates of respective sides
					thingA.isCollided = true;
				}
				break;
			case ("right"):
				if((((thingA.x + thingA.width + 10) < (thingB.x + thingB.width)) && ((thingA.x + thingA.width + 10) > (thingB.x))) && (((thingA.y >= thingB.y) && (thingA.y < (thingB.y + thingB.height))) || (((thingA.y + thingA.height) > thingB.y) && ((thingA.y + thingA.height) <= (thingB.y + thingB.height))))){ //If collided from x and y coordinates of respective sides
					thingA.isCollided = true;
				}
				break;
			case ("left"):
				if((((thingA.x - 10) < (thingB.x + thingB.width)) && ((thingA.x - 10) > (thingB.x))) && (((thingA.y >= thingB.y) && (thingA.y < (thingB.y + thingB.height))) || (((thingA.y + thingA.height) > thingB.y) && ((thingA.y + thingA.height) <= (thingB.y + thingB.height))))){ //If collided from x and y coordinates of respective sides
					thingA.isCollided = true;
				}
				break;
			default:
				break;
		}
	}
	
//START MENU
	var startMenu = {
		//BG, LOGO, BUTTON GRAPHIC STUFF
		button: ["new","load","settings","quit"], //button names down the list, to keep track-o-where you at
		current: 0, //current index of the selection place, to search button array. Its cheap, but it works.
		selected: false, //TODO: ADD COLOR CHANGE FOR WHEN SELECTED
		update: function(){
			//NAVIGATE, Up/W Down/S Enter/Z BckSpace/X
			$("body").on("keyup", function(key){
				if(whichMenu === "start"){
					if(((parseInt(key.which,10)===40)||(parseInt(key.which,10)===83))&&(startMenu.button[startMenu.current] !== "quit")){ //Down or S
						//go down 1 or down _ or down to second lvl
						key.which = null;
						startMenu.current++;
						console.log(startMenu.button[startMenu.current]);
					}
					else if(((parseInt(key.which,10)===38)||(parseInt(key.which,10)===87))&&(startMenu.button[startMenu.current] != "new")){ //Up or W
						//go up 1 or up _ or up to first lvl
						key.which = null;
						startMenu.current--;
						console.log(startMenu.button[startMenu.current]);
					}
					else if((parseInt(key.which,10)===13)||(parseInt(key.which,10)===90)||(parseInt(key.which,10)===32)){ //Enter or Z
						//accept, change something, choose, etc
						key.preventDefault();
						key.which = null;
						//WHAT HAPPENS WHEN YOU PRESS ENTER WHERE.
						switch(startMenu.button[startMenu.current]){
							case ("new"):
								console.log("//TODO START NEW GAME");
								startMenu.leaveMenu("new");
								break;
							case ("load"):
								console.log("//TODO LOAD SAVED GAME");
								startMenu.leaveMenu("load");
								break;
							case ("settings"):
								console.log("//TODO OPEN SETTINGS MENU");
								startMenu.leaveMenu("settings");
								break;
							case ("quit"): //WHEN YOU WANT TO LEAVE, YO.
								startMenu.leaveMenu("back");
								break;
							default:
								break;
						}
						}
					else if((parseInt(key.which,10)===88)){ //X 
						//back, nevermind, etc.
						key.preventDefault();
						key.which = null;
						startMenu.leaveMenu("back");
					}
					else{}
				}
			});
			$("body").on("keydown", function(key){  //Backspace	
				if(whichMenu === "start"){
					if(parseInt(key.which,10)===8){
						//back, nevermind, etc.
						key.preventDefault();
						key.which = null;
						startMenu.leaveMenu("back");
					}
				}
			});
		},
		draw: function(){
			//TODO BG AND LOGO, SPRUCE UP
			ct1.fillStyle = "#aaaaaa";
			ct1.fillRect(0,0,800,600);
			ct1.font = "25px sans-serif";
			//DRAW BUTTONS
			ct1.lineWidth = 3;
			ct1.fillStyle = "#119911";
			ct1.fillRect(311,287,175,50);
			ct1.strokeStyle = "#225522";
			ct1.strokeRect(311,287,175,50);
			ct1.fillStyle = "#225522";
			ct1.fillText("New Game",335,320);
			//new game button
			ct1.fillStyle = "#119911";
			ct1.fillRect(311,356,175,50);
			ct1.strokeStyle = "#225522";
			ct1.strokeRect(311,356,175,50);
			ct1.fillStyle = "#225522";
			ct1.fillText("Load Game",335,389);
			//load game button
			ct1.fillStyle = "#119911";
			ct1.fillRect(311,427,175,50);
			ct1.strokeStyle = "#225522";
			ct1.strokeRect(311,427,175,50);
			ct1.fillStyle = "#225522";
			ct1.fillText("Settings",350,460);
			//settings button
			ct1.fillStyle = "#119911";
			ct1.fillRect(311,496,175,50);
			ct1.strokeStyle = "#225522";
			ct1.strokeRect(311,496,175,50);
			ct1.fillStyle = "#225522";
			ct1.fillText("Quit Game",335,529);
			//quit button
			switch(startMenu.button[startMenu.current]){//CHANGE BUTTON COLOR WHEN SELECTED
				case ("new"):
					ct1.clearRect(311,287,175,50);
					ct1.fillStyle = "#ff0000";
					ct1.fillRect(311,287,175,50);
					ct1.strokeStyle = "#990000";
					ct1.strokeRect(311,287,175,50);
					ct1.font = "bold 25px sans-serif";
					ct1.fillStyle = "#990000";
					ct1.fillText("New Game",335,320);
					break;
				case ("load"):
					ct1.clearRect(311,356,175,50);
					ct1.fillStyle = "#ff0000";
					ct1.fillRect(311,356,175,50);
					ct1.strokeStyle = "#990000";
					ct1.strokeRect(311,356,175,50);
					ct1.font = "bold 25px sans-serif";
					ct1.fillStyle = "#990000";
					ct1.fillText("Load Game",335,389);
					break;
				case ("settings"):
					ct1.clearRect(311,427,175,50);
					ct1.fillStyle = "#ff0000";
					ct1.fillRect(311,427,175,50);
					ct1.strokeStyle = "#990000";
					ct1.strokeRect(311,427,175,50);
					ct1.font = "bold 25px sans-serif";
					ct1.fillStyle = "#990000";
					ct1.fillText("Settings",350,460); 
					break;
				case ("quit"):
					ct1.clearRect(311,496,175,50);
					ct1.fillStyle = "#ff0000";
					ct1.fillRect(311,496,175,50);
					ct1.strokeStyle = "#990000";
					ct1.strokeRect(311,496,175,50);
					ct1.font = "bold 25px sans-serif";
					ct1.fillStyle = "#990000";
					ct1.fillText("Quit Game",335,529);
					break;
				default:
					break;
			}
		},
		leaveMenu: function(where){
			//TODO, when menu is left, reset items that need resetting
			if(where === "back"){
				var leave = confirm("You really wanna leave? How disappointing! \n Lets take you to a place you'll more belong.");
				if(leave===true){
					screenSwitch()
					whichMenu = lastMenu;
					lastMenu = null;
					location.assign("http://www.wanikani.com");
				}
			}
			else if(where === "settings"){
				startMenu.current = 0;
				screenSwitch();
				whichMenu = where;
				lastMenu = "start";
				console.log("//SETTINGS MENU");
			}
			else if(where === "new"){
				startMenu.current = 0;
				screenSwitch();
				whichMenu = "transition";
				ifMenu = false;
				whichMenu = null;
				ifGame = true;
				whichMode = "cutscene"; //TODO CHANGE TO OPENING CUTSCENE
				currentPlace = 0;
				isCutscene = true;
				player.x = 200;
				player.y = 300;
				//TODO SET LIST OF CUTSCENE DATA, TO 0
			}
			else if(where === "load"){
				startMenu.current = 0;
				screenSwitch();
				console.log("//TODO load saved game data and set from cookies");
				whichMenu = "transition";
				ifMenu = false;
				whichMenu = null;
				ifGame = true;
			}
			else{}
		}
	};


//SETTINGS OBJ
	var settingsMenu = {
		//TODO BG IMPLEMENT MUTES, IMPLEMENT BACK
		mainButtons: ["all","sounds","bgm","back"], //Mute which
		subButtons: [false, false, false, null], //yes or no to muting that shit
		current: 0, //which main button are we on?
		update : function(){
			//NAVIGATION, IF SELECTED, CHANGE SUB BUTTONS
			$("body").on("keyup", function(key){
				if(whichMenu === "settings"){
					//up, down, enter->on/off, back
					if((parseInt(key.which, 10) === 38) || (parseInt(key.which, 10) === 87)){ //up or w
						key.which = null;
						if(settingsMenu.current > 0){
							settingsMenu.current--;
						}
					}
					else if((parseInt(key.which, 10) === 40) || (parseInt(key.which, 10) === 83)){ //down or s
						key.which = null;
						if(settingsMenu.current < (settingsMenu.mainButtons.length-1)){
							settingsMenu.current++;
						}
					}
					else if((parseInt(key.which, 10) === 13) || (parseInt(key.which, 10) === 90) || (parseInt(key.which, 10) === 32)){ //enter x or space
						key.which = null;
						if(settingsMenu.mainButtons[settingsMenu.current] === "back"){
							//GO TO LAST MENU
							console.log("TODO, go to last menu");
							settingsMenu.leaveMenu("back");
						}
						else if(settingsMenu.mainButtons[settingsMenu.current] === "all"){
							if(settingsMenu.subButtons[settingsMenu.current] === true){
								 settingsMenu.subButtons[0] = false;
								 settingsMenu.subButtons[1] = false;
								 settingsMenu.subButtons[2] = false;
							}
							else{
								 settingsMenu.subButtons[0] = true;
								 settingsMenu.subButtons[1] = true;
								 settingsMenu.subButtons[2] = true;
							}
							console.log("mute " + settingsMenu.mainButtons[settingsMenu.current] + " = " + settingsMenu.subButtons[settingsMenu.current]);
						}
						else{ //IF ENTER, MUTE OR UNMUTE APPROPRIATE ITEM	TODO SAVE INFO
							if(settingsMenu.subButtons[settingsMenu.current] === true){
								 settingsMenu.subButtons[settingsMenu.current] = false;
								 settingsMenu.subButtons[0] = false;
							}
							else{
								 settingsMenu.subButtons[settingsMenu.current] = true;
								if((settingsMenu.subButtons[1] === true) && (settingsMenu.subButtons[2] === true)){
									settingsMenu.subButtons[0] = true;
								}
							}
							console.log("mute " + settingsMenu.mainButtons[settingsMenu.current] + " = " + settingsMenu.subButtons[settingsMenu.current]);
						}
					}
					else if(parseInt(key.which, 10) === 88){ //x-back
						key.which = null;
						//GO TO LAST MENU
						console.log("TODO go to last menu");
						settingsMenu.leaveMenu("back");
					}
					else{}
				}
			});
			$("body").on("keydown", function(key){
				if(whichMenu === "settings"){
					if(parseInt(key.which, 10) === 8){ //backspace back
						key.preventDefault();
						key.which = null;
						//GO TO LAST MENU
						console.log("TODO, go to last menu");
						settingsMenu.leaveMenu("back");
					}
				}
			});
		},
		draw: function(){
			//DRAW BG, TITLE, MAIN BUTTONS
			ct2.fillStyle = "#aaaaaa";
			ct2.fillRect(0,0,800,600);
			ct2.lineWidth = 3;
			ct2.font = "25px sans-serif";
			if(settingsMenu.current === 0){ //MUTE ALL BUTTON, if hovered, if selected
				ct1.clearRect(314,217,180,60);
				ct2.fillStyle = "#991111";
				ct2.strokeStyle = "#552222"
				ct2.fillRect(314,217,180,60);
				ct2.strokeRect(314,217,180,60);
				if(settingsMenu.subButtons[0] === true){ //if selected
					ct2.fillStyle = "#552222";
					ct2.fillText("Unmute All", 340,255);
				}
				else{ //if not selected
					ct2.fillStyle = "#552222";
					ct2.fillText("Mute All", 355,255);
				}
			}
			else{ //MUTE ALL BUTTON, if not hovered, if selected
				ct1.clearRect(314,217,180,60);
				ct2.fillStyle = "#119911";
				ct2.strokeStyle = "#225522"
				ct2.fillRect(314,217,180,60);
				ct2.strokeRect(314,217,180,60);
				if(settingsMenu.subButtons[0] === true){ //if selected
					ct2.fillStyle = "#225522";
					ct2.fillText("Unmute All", 340,255);
				}
				else{ //if not selected
					ct2.fillStyle = "#225522";
					ct2.fillText("Mute All", 355,255);
				}
			}
			if(settingsMenu.current === 1){ //MUTE SOUNDS BUTTON, if hovered, if selected
				ct1.clearRect(314,313,180,60);
				ct2.fillStyle = "#991111";
				ct2.strokeStyle = "#552222"
				ct2.fillRect(314,313,180,60);
				ct2.strokeRect(314,313,180,60);
				if(settingsMenu.subButtons[1] === true){ //if selected
					ct2.fillStyle = "#552222";
					ct2.fillText("Unmute Sound", 320,350);
				}
				else{ //if not selected
					ct2.fillStyle = "#552222";
					ct2.fillText("Mute Sounds", 330,350);
				}
			}
			else{ //MUTE SOUNDS BUTTON, if not hovered, if selected
				ct1.clearRect(314,313,180,60);
				ct2.fillStyle = "#119911";
				ct2.strokeStyle = "#225522"
				ct2.fillRect(314,313,180,60);
				ct2.strokeRect(314,313,180,60);
				if(settingsMenu.subButtons[1] === true){ //if selected
					ct2.fillStyle = "#225522";
					ct2.fillText("Unmute Sound", 320,350);
				}
				else{ //if not selected
					ct2.fillStyle = "#225522";
					ct2.fillText("Mute Sounds", 330,350);
				}
			}
			if(settingsMenu.current === 2){ //MUTE BGM BUTTON, if hovered, if selected
				ct1.clearRect(314,409,180,60);
				ct2.fillStyle = "#991111";
				ct2.strokeStyle = "#552222"
				ct2.fillRect(314,409,180,60);
				ct2.strokeRect(314,409,180,60);
				if(settingsMenu.subButtons[2] === true){ //if selected
					ct2.fillStyle = "#552222";
					ct2.fillText("Unmute Music", 323,447);
				}
				else{ //if not selected
					ct2.fillStyle = "#552222";
					ct2.fillText("Mute Music", 340,447);
				}
			}
			else{ //MUTE BGM BUTTON, if not hovered, if selected
				ct1.clearRect(314,409,180,60);
				ct2.fillStyle = "#119911";
				ct2.strokeStyle = "#225522"
				ct2.fillRect(314,409,180,60);
				ct2.strokeRect(314,409,180,60);
				if(settingsMenu.subButtons[2] === true){ //if selected
					ct2.fillStyle = "#225522";
					ct2.fillText("Unmute Music",323,447);
				}
				else{ //if not selected
					ct2.fillStyle = "#225522";
					ct2.fillText("Mute Music",340,447);
				}
			}
			if(settingsMenu.current === 3){ //MUTE BGM BUTTON, if hovered, if selected
				ct1.clearRect(314,504,180,60);
				ct2.fillStyle = "#991111";
				ct2.strokeStyle = "#552222"
				ct2.fillRect(314,504,180,60);
				ct2.strokeRect(314,504,180,60);
				ct2.fillStyle = "#552222";
				ct2.fillText("Back...",365,540);
			}
			else{ //MUTE BGM BUTTON, if not hovered, if selected
				ct1.clearRect(314,504,180,60);
				ct2.fillStyle = "#119911";
				ct2.strokeStyle = "#225522"
				ct2.fillRect(314,504,180,60);
				ct2.strokeRect(314,504,180,60);
				ct2.fillStyle = "#225522";
				ct2.fillText("Back...",365,540);
			}
			//DRAW IS HOVERED, AND IF TRUE, TEXT IS DIFFERENT
		},
		leaveMenu: function(where){
			//TODO, when menu is left, reset items that need resetting
			switch(where){
				case ("back"):
					settingsMenu.current = 0;
					screenSwitch();
					whichMenu = lastMenu;
					lastMenu = null;
					break;
				default:
					break;
			}
		}
	};


//PAUSE OBJ
	var pauseMenu = {
		//BG, ITEMS, ITEM SLOTS, BUTTONS,
		//CONTINUE, SAVE, SIDE ITEMS, MAP, SETTINGS, MAIN MENU
		mainBar: ["continue","map","save","settings","main","fieldItems","genItems", "dialog"],
		fieldItems: [0,1,2,3,4], //fill with items						TODO RENULL
		genItems: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], //fill with current items and nulls	TODO RENULL
		currentBar: 0,
		currentfItem: null,
		currentgItem: null,
		menuX: null,
		slotX: null,
		menuY: null,
		slotY: null,
		currentAction: null, //use switch replace remove toss overload
		dChoices: ["use","switch","toss","replace","remove","confirm","cancel"],
		currentdItem: null,
		update: function(){
			//TODO NAVIGATE MAIN BAR, ITEMS BAR, ITEMS GRID, ETC
			$("body").on("keyup", function(key){
				if(whichMenu === "pause"){
					//currentAction determines what happens on those keypresses
					if((parseInt(key.which, 10) === 38) || (parseInt(key.which, 10) === 87)){	//UP
						key.which = null;
						if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
							//GEN ITEMS LIST
							if(pauseMenu.currentAction === null){
								 //if top row in gen item menu, go to field item menu
								if((pauseMenu.currentgItem >= 0) && (pauseMenu.currentgItem <= 4)){
									pauseMenu.currentgItem = null;
									pauseMenu.currentBar = 5;
									pauseMenu.currentfItem = 0;
								}
								else{
									pauseMenu.currentgItem -= 5;
								}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("switch"):
										if((pauseMenu.slotX >= 0)&&(pauseMenu.currentgItem > 4)){
											if((pauseMenu.currentgItem - 5) !== pauseMenu.slotX){
												pauseMenu.currentgItem-=5;
											}
											else if(((pauseMenu.currentgItem - 5) === pauseMenu.slotX)&&((pauseMenu.currentgItem - 10) >= 0)){
												pauseMenu.currentgItem-=10;
											}
											else{}
										}
										else{}
										break;
									case ("replace"):
										if((pauseMenu.currentgItem <= 19)&&(pauseMenu.currentgItem > 4)){
											pauseMenu.currentgItem -= 5;
										}
										break;
									default:
										break;
								}
							}
						}
						else if((pauseMenu.mainBar[pauseMenu.currentBar] !== "genItems")&&(pauseMenu.mainBar[pauseMenu.currentBar] !== "fieldItems") && (pauseMenu.mainBar[pauseMenu.currentBar] !== "dialog")){
							//MAIN MENU
							if(pauseMenu.currentAction === null){
								if(pauseMenu.currentBar > 0){ //If current menu item isn't top item, go up list
									pauseMenu.currentBar--;
								}
								else{}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
							}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "dialog"){
							if(pauseMenu.currentAction === null){
								//If selected menuX is fieltItems do this. genItems do this.
								if(pauseMenu.mainBar[pauseMenu.menuX] === "fieldItems"){
									//switch1, replace3, remove4, cancel6
									switch(pauseMenu.currentdItem){
										case(6):
											pauseMenu.currentdItem = 4;
											break;
										case(4):
											pauseMenu.currentdItem = 3;
											break;
										case(3):
											pauseMenu.currentdItem = 1;
											break;
										default:
											break;
									}
								}
								else if(pauseMenu.mainBar[pauseMenu.menuX] === "genItems"){
									//use0, switch1, toss2, cancel6
									switch(pauseMenu.currentdItem){
										case(6):
											pauseMenu.currentdItem = 2;
											break;
										case(2):
											pauseMenu.currentdItem = 1;
											break;
										case(1):
											pauseMenu.currentdItem = 0;
											break;
										default:
											break;
									}
								}
								else{
									//MENU BAR, confirm5, cancel6
									switch(pauseMenu.currentdItem){
											case(6):
											pauseMenu.currentdItem = 5;
											break;
										default:
											break;
									}
								}
							}
							else{}
						}
						else{}
						console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
						console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
						console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
						console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
					}
					if((parseInt(key.which, 10) === 40) || (parseInt(key.which, 10) === 83)){	//DOWN
						key.which = null;
						if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
							//FIELD ITEMS LIST
							//If currentAction = null, currentfItem = null && currentgItem = 0 && currentBar = 6;
							if(pauseMenu.currentAction === null){
								pauseMenu.currentfItem = null;
								pauseMenu.currentBar = 6;
								pauseMenu.currentgItem = 0;
							}
							else{}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
							if(pauseMenu.currentAction === null){
								if((pauseMenu.currentgItem >= 0)&&(pauseMenu.currentgItem < 15)){
									pauseMenu.currentgItem += 5;
								}
								else{}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("switch"):
										if((pauseMenu.slotX <= 19)&&(pauseMenu.currentgItem < 15)){
											if((pauseMenu.currentgItem + 5) !== pauseMenu.slotX){
												pauseMenu.currentgItem+=5;
											}
											else if(((pauseMenu.currentgItem + 5) === pauseMenu.slotX)&&((pauseMenu.currentgItem + 10) <= 19)){
												pauseMenu.currentgItem+=10;
											}
											else{}
										}
										else{}
										break;
									case ("replace"):
										if((pauseMenu.currentgItem >= 0)&&(pauseMenu.currentgItem < 15)){
											pauseMenu.currentgItem += 5;
										}
										break;
									default:
										break;
								}
							}
						}
						else if((pauseMenu.mainBar[pauseMenu.currentBar] !== "genItems")&&(pauseMenu.mainBar[pauseMenu.currentBar] !== "fieldItems") && (pauseMenu.mainBar[pauseMenu.currentBar] !== "dialog")){
							//MAIN MENU
							if(pauseMenu.currentAction === null){
								if(pauseMenu.currentBar < 4){
									pauseMenu.currentBar++;
								}
							}
						else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("iunno"):
										break;
									default:
										break;
								}
							}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "dialog"){
							if(pauseMenu.currentAction === null){
								//If selected menuX is fieltItems do this. genItems do this.
								if(pauseMenu.mainBar[pauseMenu.menuX] === "fieldItems"){
									//switch1, replace3, remove4, cancel6
									switch(pauseMenu.currentdItem){
										case(1):
											pauseMenu.currentdItem = 3;
											break;
										case(3):
											pauseMenu.currentdItem = 4;
											break;
										case(4):
											pauseMenu.currentdItem = 6;
											break;
										default:
											break;
									}
								}
								else if(pauseMenu.mainBar[pauseMenu.menuX] === "genItems"){
									//use0, switch1, toss2, cancel6
									switch(pauseMenu.currentdItem){
										case(0):
											pauseMenu.currentdItem = 1;
											break;
										case(1):
											pauseMenu.currentdItem = 2;
											break;
										case(2):
											pauseMenu.currentdItem = 6;
											break;
										default:
											break;
									}
								}
								else{
									//MENU BAR, confirm5, cancel6
									switch(pauseMenu.currentdItem){
										case(5):
											pauseMenu.currentdItem = 6;
											break;
										default:
											break;
									}
								}
							}
							else{
								
							}
						}
						else{}
						console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
						console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
						console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
						console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
					}
					if((parseInt(key.which, 10) === 37) || (parseInt(key.which, 10) === 65)){	//LEFT
						key.which = null;
						if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
							//FIELD ITEMS LIST
							if(pauseMenu.currentAction === null){	
								if(pauseMenu.currentfItem > 0){
									pauseMenu.currentfItem--;
								}
								else{
									pauseMenu.currentfItem = null;
									pauseMenu.currentBar = 0;
								}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("switch"):
										if((pauseMenu.slotX >= 0)&&(pauseMenu.currentfItem > 0)){
											if((pauseMenu.currentfItem < pauseMenu.slotX) || ((pauseMenu.currentfItem - 1) > pauseMenu.slotX)){
												pauseMenu.currentfItem--;
											}
											else{
												pauseMenu.currentfItem-=2;
											}
										}
										else{}
										break;
									default:
										break;
								}
							}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
							//GEN ITEMS LIST
							if(pauseMenu.currentAction === null){	
								if(pauseMenu.currentgItem > 0){
									pauseMenu.currentgItem--;
								}
								else{}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("switch"):
										if((pauseMenu.slotX >= 0)&&(pauseMenu.currentgItem > 0)){
											if((pauseMenu.currentgItem < pauseMenu.slotX) || ((pauseMenu.currentgItem - 1) > pauseMenu.slotX)){
											pauseMenu.currentgItem--;
											}
											else if(pauseMenu.slotX > 0){
												pauseMenu.currentgItem-=2;
											}
											else{}
										}
										else{}
										break;
									case ("replace"):
										if(pauseMenu.currentgItem > 0){
											pauseMenu.currentgItem--;
										}
										break;
									default:
										break;
								}
							}
						}
						else{}
						console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
						console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
						console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
						console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
					}
					if((parseInt(key.which, 10) === 39) || (parseInt(key.which, 10) === 68)){	//RIGHT
						key.which = null;
						if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
							//FIELD ITEMS LIST
							if(pauseMenu.currentAction === null){	
								if(pauseMenu.currentfItem < 4){
									pauseMenu.currentfItem++;
								}
							else{
									pauseMenu.currentfItem = null;
									pauseMenu.currentBar = 0;
								}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("switch"):
										if((pauseMenu.slotX <= 4)&&(pauseMenu.currentfItem < 4)){
											if(((pauseMenu.currentfItem + 1) < pauseMenu.slotX) || (pauseMenu.currentfItem > pauseMenu.slotX)){
												pauseMenu.currentfItem++;
											}
											else{
												pauseMenu.currentfItem+=2;
											}
										}
										else{}
										break;
									default:
										break;
								}
							}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
							//GEN ITEMS LIST
							if(pauseMenu.currentAction === null){	
								if(pauseMenu.currentgItem < 19){
									pauseMenu.currentgItem++;
								}
								else{}
							}
							else{
								//TODO MESS WITH AFTER ENTERS STARTED
								switch (pauseMenu.currentAction){
									case ("switch"):
										if((pauseMenu.slotX <= 19)&&(pauseMenu.currentgItem < 19)){
											if((pauseMenu.currentgItem > pauseMenu.slotX) || ((pauseMenu.currentgItem + 1) < pauseMenu.slotX)){
												pauseMenu.currentgItem++;
											}
											else if(pauseMenu.slotX < 19){
												pauseMenu.currentgItem+=2;
											}
											else{}
										}
										else{}
										break;
									case ("replace"):
										if(pauseMenu.currentgItem < 19){
											pauseMenu.currentgItem++;
										}
										break;
									default:
										break;
								}
							}
						}
						else if((pauseMenu.mainBar[pauseMenu.currentBar] !== "genItems")&&(pauseMenu.mainBar[pauseMenu.currentBar] !== "fieldItems") && (pauseMenu.mainBar[pauseMenu.currentBar] !== "dialog")){
							//MAIN MENU
							if(pauseMenu.currentAction === null){
								pauseMenu.currentBar = 5;
								pauseMenu.currentfItem = 0;
							}
							else{}
						}
						else{}
						console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
						console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
						console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
						console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
					}
					if((parseInt(key.which, 10) === 13) || (parseInt(key.which, 10) === 32) || (parseInt(key.which, 10) === 90)){	//ENTER
						key.which = null;
						if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
							//TODO: IF ON SLOT 0 1 2 3 4	CURRENTACTION OR NO
							if(pauseMenu.currentAction === null){
								if(pauseMenu.fieldItems[pauseMenu.currentfItem] !== null){
									pauseMenu.menuX = pauseMenu.currentBar;
									pauseMenu.slotX = pauseMenu.currentfItem;
									pauseMenu.currentBar = 7;
									pauseMenu.currentdItem = 1;
									pauseMenu.currentfItem = null
									console.log(pauseMenu.mainBar[pauseMenu.currentBar] + " " + pauseMenu.dChoices[pauseMenu.currentdItem]);
								}
								else{
									console.log("//TODO BEEP, CAN'T DO SOMETHING WITH NOTHING.");
								}
							}
							else{
								//TODO, OTHER JUNK, SWITCH for which CURRENT ACTION
								console.log("//TODO set menuY and slotY and call the SWITCH method");
								switch(pauseMenu.currentAction){
									case ("switch"):
										pauseMenu.slotY = pauseMenu.currentfItem;
										pauseMenu.switchItem(pauseMenu.menuX, pauseMenu.slotX, pauseMenu.slotY);
										break;
									default:
										break;
								}
							}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
							//TODO: IF ON SLOTS 0-19	CURRENTACTION OR NO
							if(pauseMenu.currentAction === null){
								if(pauseMenu.fieldItems[pauseMenu.currentfItem] !== null){
									console.log("//TODO OPEN DIALOG MENU, implement Selected Item Slot and Menu");
									pauseMenu.menuX = pauseMenu.currentBar;
									pauseMenu.slotX = pauseMenu.currentgItem;
									pauseMenu.currentBar = 7;
									pauseMenu.currentdItem = 0;
									pauseMenu.currentgItem = null
									console.log(pauseMenu.mainBar[pauseMenu.currentBar] + " " + pauseMenu.dChoices[pauseMenu.currentdItem]);
								}
								else{
									console.log("//TODO BEEP, CANT DO SOMETHING WITH NOTHING");
								}
							}
							else{
								//TODO, OTHER JUNK, SWITCH for which CURRENT ACTION
								switch(pauseMenu.currentAction){
									case ("switch"):
										pauseMenu.slotY = pauseMenu.currentgItem;
										pauseMenu.switchItem(pauseMenu.menuX, pauseMenu.slotX, pauseMenu.slotY);
										break;
									case ("replace"):
										if(pauseMenu.fieldItems[pauseMenu.currentfItem] !== null){
											pauseMenu.menuY = pauseMenu.currentBar;
											pauseMenu.slotY = pauseMenu.currentgItem;
											pauseMenu.replaceItem(pauseMenu.menuX, pauseMenu.slotX, pauseMenu.menuY, pauseMenu.slotY);
										}
										else{
											console.log("//TODO BEEP, REMOVE YOUR ITEM, FOO.");
										}
										break;
									case ("overload"):
										break;
									default:
										break;
								}
							}
						}
						else if((pauseMenu.mainBar[pauseMenu.currentBar] !== "genItems")&&(pauseMenu.mainBar[pauseMenu.currentBar] !== "fieldItems") && (pauseMenu.mainBar[pauseMenu.currentBar] !== "dialog")){
							//TODO: IF ON CONTINUE MAP SAVE SETTINGS MAIN	 	CURRENTACTION OR NO
							if(pauseMenu.currentAction === null){
								switch(pauseMenu.mainBar[pauseMenu.currentBar]){
									case ("continue"):
										pauseMenu.leaveMenu("back");
										break;
									case ("map"):
										pauseMenu.leaveMenu("map");
										break;
									case ("save"):
										console.log("//TODO SAVE GAME, DIALOG GAME SAVED");
										break;
									case ("settings"):
										console.log("//TODO GO TO SETTINGS MENU");
										pauseMenu.leaveMenu("settings");
										break;
									case ("main"):
										console.log("//TODO GO TO MAIN MENU, DIALOG NO SAVE?");
										pauseMenu.leaveMenu("main");
										break;
									default:
										break;
								}
							}
							else{
								//TODO STUFF???
							}
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "dialog"){
							if(pauseMenu.currentAction === null){
								//TODO cancel and remove selected menu/item or switch current action action: use, switch, replace, remove, toss
								switch(pauseMenu.dChoices[pauseMenu.currentdItem]){
									//"use","switch","toss","replace","remove","confirm","cancel"
									case ("use"):
										console.log("//TODO call the USE method");
										break;
									case ("switch"):
										pauseMenu.currentAction = "switch";
										if(pauseMenu.menuX === 5){
											pauseMenu.currentBar = pauseMenu.menuX;
											if(pauseMenu.slotX >= 4){
												pauseMenu.currentfItem = (pauseMenu.slotX-1);
											}
											else{
												pauseMenu.currentfItem = (pauseMenu.slotX+1);
											}
										}
										else{
											pauseMenu.currentBar = pauseMenu.menuX;
											if(pauseMenu.slotX >= 19){
												pauseMenu.currentgItem = (pauseMenu.slotX-1);
											}
											else{
												pauseMenu.currentgItem = (pauseMenu.slotX+1);
											}
										}
										break;
									case ("toss"):
										pauseMenu.currentAction = "toss";
										pauseMenu.tossItem(pauseMenu.slotX);
										console.log("//TODO call the TOSS method");
										break;
									case ("replace"):
										pauseMenu.currentAction = "replace";
										pauseMenu.currentBar = 6;
										pauseMenu.currentgItem = 0;
										console.log("//TODO set menuY and slotY and call the REPLACE method");
										break;
									case ("remove"):
										pauseMenu.currentAction = "remove";
										pauseMenu.removeItem(pauseMenu.slotX);
										console.log("//TODO call the REMOVE method");
										break;
									case ("confirm"):
										console.log("//TODO call the CONFIRM method, pass its context");
										break;
									case ("cancel"):
										//TODO GO BACK TO LAST ITEM AREA, ETC
										pauseMenu.currentBar = pauseMenu.menuX;
										if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
											pauseMenu.currentfItem = pauseMenu.slotX;
										}
										else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
											pauseMenu.currentgItem = pauseMenu.slotX;
										}
										else{}
										pauseMenu.menuX = null;
										pauseMenu.slotX = null;
										pauseMenu.currentdItem = null;
											console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
											console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
											console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
											console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
										break;
									default:
										console.log("OTHER ACTION ON DIALOG MENU");
										break;
								}
								pauseMenu.currentdItem = null;
							}
							else{
								//??
							}
						}
						else{}
					}
					if(parseInt(key.which, 10) === 88){	//BACKS
						key.which = null;
						if((pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems") || (pauseMenu.mainBar[pauseMenu.currentBar] === "genItems")){
							//TODO GO BACK TO MAIN MENU LIST or game, if current action is right
							if(pauseMenu.currentAction === null){
								pauseMenu.currentBar = 0;
								pauseMenu.currentfItem = null;
								pauseMenu.currentgItem = null;
									console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
									console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
									console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
									console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
							}
							else if(pauseMenu.currentAction === "overload"){
								
							}
							else{
								pauseMenu.currentAction = null
								pauseMenu.currentBar = pauseMenu.menuX;
								if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
									pauseMenu.currentfItem = pauseMenu.slotX;
								}
								else{
									pauseMenu.currentgItem = pauseMenu.slotX;
								}
									console.log("CANCELED YOUR ACTION...");
									console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
									console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
									console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
									console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
							}
						}
						else if((pauseMenu.mainBar[pauseMenu.currentBar] !== "genItems")&&(pauseMenu.mainBar[pauseMenu.currentBar] !== "fieldItems") && (pauseMenu.mainBar[pauseMenu.currentBar] !== "dialog")){
							pauseMenu.leaveMenu("back");
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "dialog"){
							if(pauseMenu.currentAction === null){
								//TODO GO BACK TO LAST ITEM AREA, ETC
								pauseMenu.currentBar = pauseMenu.menuX;
								if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
									pauseMenu.currentfItem = pauseMenu.slotX;
								}
								else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
									pauseMenu.currentgItem = pauseMenu.slotX;
								}
								else{}
								pauseMenu.menuX = null;
								pauseMenu.slotX = null;
								pauseMenu.currentdItem = null;
									console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
									console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
									console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
									console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
							}
							else{
								
							}
						}
						else{}
					}
				}
			});
			$("body").on("keydown", function(key){
				if(whichMenu === "pause"){
					if(parseInt(key.which, 10) === 8){ 	//backspace back
						key.preventDefault();
						key.which = null;
						//TODO GO TO LAST MENU, OR GO BACK CHOICE
						if((pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems") || (pauseMenu.mainBar[pauseMenu.currentBar] === "genItems")){
							if(pauseMenu.currentAction === null){
								pauseMenu.currentBar = 0;
								pauseMenu.currentfItem = null;
								pauseMenu.currentgItem = null;
									console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
									console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
									console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
									console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
							}
							else if(pauseMenu.currentAction === "overload"){
								
							}
							else{
								pauseMenu.currentAction = null
								pauseMenu.currentBar = pauseMenu.menuX;
								if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
									pauseMenu.currentfItem = pauseMenu.slotX;
								}
								else{
									pauseMenu.currentgItem = pauseMenu.slotX;
								}
									console.log("CANCELED YOUR ACTION...");
									console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
									console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
									console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
									console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
							}
						}
						else if((pauseMenu.mainBar[pauseMenu.currentBar] !== "genItems")&&(pauseMenu.mainBar[pauseMenu.currentBar] !== "fieldItems") && (pauseMenu.mainBar[pauseMenu.currentBar] !== "dialog")){
							pauseMenu.leaveMenu("back");
						}
						else if(pauseMenu.mainBar[pauseMenu.currentBar] === "dialog"){
							if(pauseMenu.currentAction === null){
								//TODO GO BACK TO LAST ITEM AREA, ETC
								pauseMenu.currentBar = pauseMenu.menuX;
								if(pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems"){
									pauseMenu.currentfItem = pauseMenu.slotX;
								}
								else if(pauseMenu.mainBar[pauseMenu.currentBar] === "genItems"){
									pauseMenu.currentgItem = pauseMenu.slotX;
								}
								else{}
								pauseMenu.menuX = null;
								pauseMenu.slotX = null;
								pauseMenu.currentdItem = null;
									console.log(pauseMenu.mainBar[pauseMenu.currentBar]);
									console.log(pauseMenu.fieldItems[pauseMenu.currentfItem]);
									console.log(pauseMenu.genItems[pauseMenu.currentgItem]);
									console.log(pauseMenu.dChoices[pauseMenu.currentdItem]);
							}
							else{
								
							}
						}
						else{}
					}
				}
			});
		},
		draw: function(){
			//DRAW BG
			ct2.fillStyle = "#aaaaaa";
			ct2.fillRect(0,0,800,600);
			//DRAW ALL NORMAL (if items not null, draw them in)
			ct2.lineWidth = 5;
				//MAIN MENU BAR
			if(pauseMenu.currentBar === 0){
				ct2.fillStyle = "#ff9900"; //CONTINUE HOVERED
				ct2.fillRect(0,35,197,87);
				ct2.strokeStyle = "#993300";
				ct2.strokeRect(0,35,197,87);
				ct2.font = "bold 24px sans-serif";
				ct2.fillStyle = "#993300";
				ct2.fillText("BACK TO GAME",4,85);
			}
			else if(pauseMenu.currentAction !== null){
				ct2.fillStyle = "#996666"; //CONTINUE LOCKED
				ct2.fillRect(0,35,197,87);
				ct2.strokeStyle = "#663333";
				ct2.strokeRect(0,35,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#663333";
				ct2.fillText("BACK TO GAME",7,85);
			}
			else{
				ct2.fillStyle = "#ffcc00"; //CONTINUE NORMAL
				ct2.fillRect(0,35,197,87);
				ct2.strokeStyle = "#cc6600";
				ct2.strokeRect(0,35,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#cc6600";
				ct2.fillText("BACK TO GAME",7,85);
			}
			if(pauseMenu.currentBar === 1){
				ct2.fillStyle = "#ff9900"; //MAP HOVERED
				ct2.fillRect(0,146,197,87);
				ct2.strokeStyle = "#993300";
				ct2.strokeRect(0,146,197,87);
				ct2.font = "bold 24px sans-serif";
				ct2.fillStyle = "#993300";
				ct2.fillText("THE MAP",44,196);
			}
			else if(pauseMenu.currentAction !== null){
				ct2.fillStyle = "#996666"; //MAP LOCKED
				ct2.fillRect(0,146,197,87);
				ct2.strokeStyle = "#663333";
				ct2.strokeRect(0,146,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#663333";
				ct2.fillText("THE MAP",45,196);
			}
			else{
				ct2.fillStyle = "#ffcc00"; //MAP NORMAL
				ct2.fillRect(0,146,197,87);
				ct2.strokeStyle = "#cc6600";
				ct2.strokeRect(0,146,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#cc6600";
				ct2.fillText("THE MAP",45,196);
			}
			if(pauseMenu.currentBar === 2){
				ct2.fillStyle = "#ff9900"; //SAVE HOVERED
				ct2.fillRect(0,257,197,87);
				ct2.strokeStyle = "#993300";
				ct2.strokeRect(0,257,197,87);
				ct2.font = "bold 24px sans-serif";
				ct2.fillStyle = "#993300";
				ct2.fillText("SAVE GAME",28,307);
			}
			else if(pauseMenu.currentAction !== null){
				ct2.fillStyle = "#996666"; //SAVE LOCKED
				ct2.fillRect(0,257,197,87);
				ct2.strokeStyle = "#663333";
				ct2.strokeRect(0,257,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#663333";
				ct2.fillText("SAVE GAME",29,307);
			}
			else{
				ct2.fillStyle = "#ffcc00"; //SAVE NORMAL
				ct2.fillRect(0,257,197,87);
				ct2.strokeStyle = "#cc6600";
				ct2.strokeRect(0,257,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#cc6600";
				ct2.fillText("SAVE GAME",29,307);
			}
			if(pauseMenu.currentBar === 3){
				ct2.fillStyle = "#ff9900"; //SETTINGS HOVERED
				ct2.fillRect(0,368,197,87);
				ct2.strokeStyle = "#993300";
				ct2.strokeRect(0,368,197,87);
				ct2.font = "bold 24px sans-serif";
				ct2.fillStyle = "#993300";
				ct2.fillText("SETTINGS",34,418);
			}
			else if(pauseMenu.currentAction !== null){
				ct2.fillStyle = "#996666"; //SETTINGS LOCKED
				ct2.fillRect(0,368,197,87);
				ct2.strokeStyle = "#663333";
				ct2.strokeRect(0,368,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#663333";
				ct2.fillText("SETTINGS",35,418);
			}
			else{
				ct2.fillStyle = "#ffcc00"; //SETTINGS NORMAL
				ct2.fillRect(0,368,197,87);
				ct2.strokeStyle = "#cc6600";
				ct2.strokeRect(0,368,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#cc6600";
				ct2.fillText("SETTINGS",35,418);
			}
			if(pauseMenu.currentBar === 4){
				ct2.fillStyle = "#ff9900"; //GOTO START HOVERED
				ct2.fillRect(0,479,197,87);
				ct2.strokeStyle = "#993300";
				ct2.strokeRect(0,479,197,87);
				ct2.font = "bold 24px sans-serif";
				ct2.fillStyle = "#993300";
				ct2.fillText("MAIN MENU",29,529);
			}
			else if(pauseMenu.currentAction !== null){
				ct2.fillStyle = "#996666"; //GOTO START LOCKED
				ct2.fillRect(0,479,197,87);
				ct2.strokeStyle = "#663333";
				ct2.strokeRect(0,479,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#663333";
				ct2.fillText("MAIN MENU",30,529);
			}
			else{
				ct2.fillStyle = "#ffcc00"; //GOTO START NORMAL
				ct2.fillRect(0,479,197,87);
				ct2.strokeStyle = "#cc6600";
				ct2.strokeRect(0,479,197,87);
				ct2.font = "24px sans-serif";
				ct2.fillStyle = "#cc6600";
				ct2.fillText("MAIN MENU",30,529);
			}
				//FIELD ITEMS BAR
			for(var f = 0; f < pauseMenu.fieldItems.length; f++){
				var rectXa = 264 + (f*105);
				if((pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems") && (f === pauseMenu.currentfItem)){ //HOVERED FIELD ITEM
					ct2.fillStyle = "#ff9900"; //orange
					ct2.fillRect(rectXa,38,90,90);
					//TODO DRAW ITEM ON TOP
				}
				else if((pauseMenu.currentAction !== null) && (pauseMenu.menuX === 5) && (f === pauseMenu.slotX)){ //SELECTED FIELD ITEM
					ct2.fillStyle = "#99ff33"; //limey
					ct2.fillRect(rectXa,38,90,90);
					//TODO DRAW ITEM ON TOP
				}
				else if((pauseMenu.mainBar[pauseMenu.currentBar] === "genItems") && (pauseMenu.currentAction !== null)){ //LOCKED FIELD ITEM
					ct2.fillStyle = "#cc9999"; //purpley grey
					ct2.fillRect(rectXa,38,90,90);
					//TODO DRAW ITEM ON TOP
				}
				else{ //NORMAL FIELD ITEM
					ct2.fillStyle = "#ffcc66"; //creamy gold
					ct2.fillRect(rectXa,38,90,90);
					//TODO DRAW ITEM ON TOP
				}
			}
				//GEN ITEMS BAR
			for(var gY = 0; gY < 4; gY++){
				for(var gX = 0; gX < 5; gX++){
					var g = (gY*5)+(gX);
					var rectXb = 264 + (gX*105);
					var rectYb = 153 + (gY*105);
					if((pauseMenu.mainBar[pauseMenu.currentBar] === "genItems") && (g === pauseMenu.currentgItem)){ //HOVERED GENERAL ITEM
						ct2.fillStyle = "#ff6633"; //unsaturated orange
						ct2.fillRect(rectXb,rectYb,90,90);
						//TODO DRAW ITEM ON TOP
					}
					else if((pauseMenu.currentAction !== null) && (pauseMenu.menuX === 6) && (g === pauseMenu.slotX)){ //SELECTED GENERAL ITEM
						ct2.fillStyle = "#66ff66"; //soft green
						ct2.fillRect(rectXb,rectYb,90,90);
						//TODO DRAW ITEM ON TOP
					}
					else if((pauseMenu.mainBar[pauseMenu.currentBar] === "fieldItems") && (pauseMenu.currentAction !== null)){ //LOCKED GENERAL ITEM
						ct2.fillStyle = "#cc6666"; //magentaey grey
						ct2.fillRect(rectXb,rectYb,90,90);
						//TODO DRAW ITEM ON TOP
					}
					else{ //NORMAL GENERAL ITEM
						ct2.fillStyle = "#ff9966"; //unsaturated coral
						ct2.fillRect(rectXb,rectYb,90,90);
						//TODO DRAW ITEM ON TOP
					}
				}
			}
				//DIALOG
			if(pauseMenu.currentBar === 7){ //IF DIALOG BOX
				//THE BOX BG
				ct4.fillStyle = "#ff6666";
				ct4.fillRect(310,210,200,128);
				ct4.lineWidth = 3;
				ct4.strokeStyle = "#cc0000";
				ct4.strokeRect(310,210,200,128);
				switch(pauseMenu.menuX){
					case(5):	//FIELD ITEM MENU DIALOG
						if(pauseMenu.currentdItem === 1){ //HOVERED SWITCH
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,215,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Switch Item",359,235);
						}
						else{ 				//NORMAL SWITCH
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,215,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Switch Item",360,235);
						}
						if(pauseMenu.currentdItem === 3){ //HOVERED REPLACE
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,245,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Replace Item",351,265);
						}
						else{ 				//NORMAL REPLACE
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,245,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Replace Item",352,265);
						}
						if(pauseMenu.currentdItem === 4){ //HOVERED REMOVE
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,275,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Un-field Item",354,295);
						}
						else{ 				//NORMAL REMOVE
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,275,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Un-field Item",355,295);
						}
						if(pauseMenu.currentdItem === 6){ //HOVERED CANCEL
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,305,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Cancel",379,325);
						}
						else{ 				//NORMAL CANCEL
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,305,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Cancel",380,325);
						}
						break;
					case(6): //GEN ITEM MENU DIALOG
						if(pauseMenu.currentdItem === 0){ //HOVERED USE
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,215,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Use Item",369,235);
						}
						else{ 				//NORMAL USE
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,215,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Use Item",370,235);
						}
						if(pauseMenu.currentdItem === 1){ //HOVERED SWITCH
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,245,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Switch Item",359,265);
						}
						else{ 				//NORMAL SWITCH
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,245,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Switch Item",360,265);
						}
						if(pauseMenu.currentdItem === 2){ //HOVERED TOSS
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,275,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Toss Item",364,295);
						}
						else{ 				//NORMAL TOSS
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,275,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Toss Item",365,295);
						}
						if(pauseMenu.currentdItem === 6){ //HOVERED CANCEL
							ct4.fillStyle= "#ff3333";
							ct4.fillRect(315,305,190,27);
							ct4.font = "bold 20px sans-serif";
							ct4.fillStyle= "#990000";
							ct4.fillText("Cancel",379,325);
						}
						else{ 				//NORMAL CANCEL
							ct4.fillStyle= "#ff5555";
							ct4.fillRect(315,305,190,27);
							ct4.font = "20px sans-serif";
							ct4.fillStyle= "#cc0000";
							ct4.fillText("Cancel",380,325);
						}
						break;
					default:
						break;
				}		
			}
			else{
				//DRAW NOTHING THERE, YO
				ct4.clearRect(0,0,800,600);
			}
		},
		fillItems: function(){
			//TODO FILL ITEMS LISTS WITH ITEMS, YO
		},
		useItem: function(){
			//TODO for whatever item, use its effect on stats, etc
			//TODO take one away from its quantity. If quantity = 0, tossItem()
		},
		switchItem: function(mX, sX, sY){
			//TODO if mX fieldItems or genItems, make temp variable to store item in sX, and place item in sY in sX and item in temp var in sY
			pauseMenu.currentAction = null;
			console.log(pauseMenu.currentAction);
			if(pauseMenu.mainBar[mX] === "fieldItems"){
				console.log(pauseMenu.fieldItems[sX] + " to be replaced with " + pauseMenu.fieldItems[sY]);
				var tempSlot = pauseMenu.fieldItems[sX];
				pauseMenu.fieldItems[sX] = pauseMenu.fieldItems[sY];
				pauseMenu.fieldItems[sY] = tempSlot;
				console.log(pauseMenu.fieldItems[sX] + " has now replaced " + pauseMenu.fieldItems[sY]);
				pauseMenu.currentfItem = sX;
			}
			else{
				console.log(pauseMenu.genItems[sX] + " to be replaced with " + pauseMenu.genItems[sY]);
				var tempSlot = pauseMenu.genItems[sX];
				pauseMenu.genItems[sX] = pauseMenu.genItems[sY];
				pauseMenu.genItems[sY] = tempSlot;
				console.log(pauseMenu.genItems[sX] + " has now replaced " + pauseMenu.genItems[sY]);
				pauseMenu.currentgItem = sX;
			}
			pauseMenu.menuX = null;
			pauseMenu.slotX = null;
			pauseMenu.menuY = null;
			pauseMenu.slotY = null;
		},
		tossItem: function(sX){
			//TODO remove item from genItems and, if in it, fieldItems
			pauseMenu.currentAction = null;
			if(pauseMenu.genItems[sX] !== null){
				console.log(pauseMenu.genItems[sX] + "about to be removed");
				for(var index = 0; index<pauseMenu.fieldItems.length; index++){
					if(pauseMenu.fieldItems[index] === pauseMenu.genItems[sX]){
						pauseMenu.fieldItems[index] = null;
					}
				}
				pauseMenu.genItems[sX] = null;
				console.log( pauseMenu.genItems[sX] + "removed");
			}
			else{
				
				console.log("Can't Remove that which is not there");
			}
			pauseMenu.currentBar = pauseMenu.menuX;
			pauseMenu.currentgItem = pauseMenu.slotX;
			pauseMenu.menuX = null;
			pauseMenu.slotX = null;
			pauseMenu.menuY = null;
			pauseMenu.slotY = null;
		},
		replaceItem: function(mX, sX, mY, sY){
			if(pauseMenu.currentAction === "overload"){
				//like too many items, outside-menu influence
				//menuX and slotX is outside influence
				//DIALOG, NOT IN THIS FUNCTION, you sure you wanna do that?
				//replace like in switch
			}
			else{
				//menuX and slotX is fieldItem, accessed through being on pause menu already
				var isAlreadyThere = false;
				for(var slotX = 0; slotX < pauseMenu.fieldItems.length; slotX++){
					if(pauseMenu.fieldItems[slotX] === pauseMenu.genItems[sY]){
						//Same item, not gonna replace that shit.
							isAlreadyThere = true;
					}
					else{}
				}
				if(isAlreadyThere === true){
					console.log("//TODO CAN'T DO WARNING, ITEM ALREADY ON FIELD LIST");
				}
				else{
					pauseMenu.currentAction = null;
					//else replace similar to switch
					console.log(pauseMenu.genItems[sX] + " to be replaced with " + pauseMenu.genItems[sY]);
					pauseMenu.fieldItems[sX] = pauseMenu.genItems[sY];
					console.log(pauseMenu.genItems[sX] + " has now replaced " + pauseMenu.genItems[sY]);
					pauseMenu.currentBar = pauseMenu.menuX;
					pauseMenu.currentfItem = pauseMenu.slotX;
					pauseMenu.currentgItem = null;
					pauseMenu.menuX = null;
					pauseMenu.slotX = null;
					pauseMenu.menuY = null;
					pauseMenu.slotY = null;
				}
			}
		},
		removeItem: function(sX){
			//TODO remove item from fieldItems only
			pauseMenu.currentAction = null;
			if(pauseMenu.genItems[sX] !== null){
				console.log(pauseMenu.fieldItems[sX] + "about to be removed");
				pauseMenu.fieldItems[sX] = null;
				console.log(pauseMenu.fieldItems[sX] + "removed");
			}
			else{
				
				console.log("Can't Remove that which is not there");
			}
			pauseMenu.currentBar = pauseMenu.menuX;
			pauseMenu.currentfItem = pauseMenu.slotX;
			pauseMenu.menuX = null;
			pauseMenu.slotX = null;
			pauseMenu.menuY = null;
			pauseMenu.slotY = null;
		},
		leaveMenu: function(where){
			console.log("Leaving Pause Screen");
			//TODO	SET CURRENT MENU AS PARAMETER, TAKE PARAMETER AS PLACE YOU WANT TO GO	BACK MAP SETTINGS MAIN
			pauseMenu.currentAction = null;
			currentBar = 0;
			currentfItem = null;
			currentgItem = null;
			currentdItem = null;
			menuX = null;
			slotX = null;
			menuY = null;
			slotY = null;
			switch(where){
				case ("back"):
					ifMenu = false;
					whichMenu = null;
					ifGame = true;
					break;
				case ("map"):
					whichMenu = "map"
					break;
				case ("settings"):
					whichMenu = "settings";
					lastMenu = "pause";
					break;
				case ("main"):
					whichMenu = "start";
					ifGame = false;
					whichMode = null;
					break;
				case ("quests"):
					whichMenu = "quests";
					lastMenu = "pause";
					break;
				case ("beasts"):
					whichMenu = "beasts";
					lastMenu = "pause";
					break;
				default:
					break;
			}
			/*canvas1.width = canvas1.width;
			canvas2.width = canvas2.width;
			canvas3.width = canvas3.width;
			canvas4.width = canvas4.width;*/
			screenSwitch();
		}
	};
//MAP OBJ
	var mapMenu = {
		//THE MAP ITSELF THE LOCATION CHOICES, LOCKED AND UNLOCKED, BACK
		//YOU SURE YOU WANNA GO HERE?
		unlocked: ["back",1,2,3,4,5], //TODO, FILL IN AS LOCATIONS ARE UNLOCKED
		last: 0,
		current: 1,
		update: function(){
			//NAVIGATION, IF SELECTED
			$("body").on("keyup", function(key){
				if(whichMenu === "map"){
					if((parseInt(key.which,10)===38) || (parseInt(key.which,10)===87)){ //UP W
						key.which = null;
						if(mapMenu.current <= 0){
							mapMenu.current = mapMenu.last;
							mapMenu.last = 0;
						}
						console.log(mapMenu.unlocked[mapMenu.current]);
					}
					else if((parseInt(key.which,10)===40) || (parseInt(key.which,10)===83)){ //DOWN S
						key.which = null;
						if(mapMenu.current > 0){
							mapMenu.last = mapMenu.current;
							mapMenu.current = 0;
						}
						console.log(mapMenu.unlocked[mapMenu.current]);
					}
					else if((parseInt(key.which,10)===37) || (parseInt(key.which,10)===65)){ //LEFT A
						key.which = null;
						if(mapMenu.current > 1){
							mapMenu.last = mapMenu.current;
							mapMenu.current--;
						}
						console.log(mapMenu.unlocked[mapMenu.current]);
					}
					else if((parseInt(key.which,10)===39) || (parseInt(key.which,10)===68)){ //RIGHT D
						key.which = null;
						if(mapMenu.current < (mapMenu.unlocked.length - 1)){
							mapMenu.last = mapMenu.current;
							mapMenu.current++;
						}
						console.log(mapMenu.unlocked[mapMenu.current]);
					}
					else if((parseInt(key.which,10)===13) || (parseInt(key.which,10)===90) || (parseInt(key.which,10)===32)){ //ENTER Z SPACE
						key.which = null;
						if(mapMenu.current === 0){
							console.log("//TODO GO BACK TO MAIN MENU");
						}
						else{
							console.log("//TODO GO TO NEW MAP LOCATION");
						}
					}
					else if(parseInt(key.which,10)===88){ //X BACK
						key.which = null;
						console.log("//TODO GO TO NEW MAP LOCATION");
					}
					else{}
				}
			});
			$("body").on("keydown", function(key){ //BACKSPACE BACK
				if(whichMenu === "map"){
					if(parseInt(key.which, 10) === 8){
						key.preventDefault();
						key.which = null;
						console.log("//TODO GO TO NEW MAP LOCATION");
					}
				}
			});
		},
		draw: function(){
			ct3.fillStyle = "#aaaaaa";
			ct3.fillRect(0,0,800,600);
			//TODO DRAW BG, LOCI BUTTONS, CHANGE COLORS
		},
		fillLoci: function(){
			//TODO Gather map locations, fill in unlocked spots, etc.
		},
		leaveMap: function(menuItem){
			//TODO, IF BACK, GO BACK TO PAUSE MENU, ELSE GO TO WHATEVER MAP LOCATION
		}
	};
//QUEST LOG OBJ
	var questLog = {
		//BG PAGE ITEMS NEXT||LAST PAGE BACK
		page: [1,2,3,4,5,6],	//TODO APPLY LATER
		pageNum: 0,
		button: ["last","back","next"],
		current: 0,
		update: function(){	
			//TODO NAIGATION, IF SELECTED
			$("body").on("keyup", function(key){
				if(whichMenu === "quests"){
					if((parseInt(key.which, 10) === 38) || (parseInt(key.which, 10) === 87)){ //UP W
						key.which = null;
						questLog.current = 2;
						console.log(questLog.button[questLog.current]);
					}
					else if((parseInt(key.which, 10) === 40) || (parseInt(key.which, 10) === 83)){ //DOWN S
						key.which = null;
						questLog.current = 1;
						console.log(questLog.button[questLog.current]);
					}
					else if((parseInt(key.which, 10) === 37) || (parseInt(key.which, 10) === 65)){ //LEFT D
						key.which = null;
						questLog.current = 0;
						console.log(questLog.button[questLog.current]);
					}
					else if((parseInt(key.which, 10) === 39) || (parseInt(key.which, 10) === 68)){ //RIGHT A
						key.which = null;
						questLog.current = 2;
						console.log(questLog.button[questLog.current]);
					}
					else if((parseInt(key.which, 10) === 13) || (parseInt(key.which, 10) === 90) || (parseInt(key.which, 10) === 32)){ //ENTER Z SPACE
						key.which = null;
						switch(questLog.current){
							case(0):
								if(questLog.pageNum > 0){
									questLog.pageNum--;
								}
								console.log(questLog.page[questLog.pageNum]);
								break;
							case(1):
								questLog.leaveMenu(); //TODO PASS PARAMETER
								break;
							case(2):
								if(questLog.pageNum < (questLog.page.length-1)){
									questLog.pageNum++;
								}
								console.log(questLog.page[questLog.pageNum]);
								break;
							default:
								break;
						}
					}
					else if(parseInt(key.which, 10) ===88){ //BACK X
						key.which = null;
						if(questLog.current === 1){
							questLog.leaveMenu();
						}
						else{
							questLog.current = 1;	
						}
					}
					else{}
				}
			});
			$("body").on("keydown", function(key){ //BACKSPACE
				if(whichMenu === "quests"){
					if(parseInt(key.which, 10) === 8){
						key.preventDefault();
						key.which = null;
						if(questLog.current === 1){
							questLog.leaveMenu();
						}
						else{
							questLog.current = 1;	
						}
					}
				}
			});
		},
		draw: function(){
			//DRAW BG		TODO REPLACE WITH PAGE 1 PAGE 2
			ct3.fillStyle = "#aaaaaa";
			ct3.fillRect(0,0,800,600);
			ct3.lineWidth = 3;
			// DRAW BUTTONS LEFT RIGHT BACK
			if(questLog.current === 0){	//HOVERED LEFT
				ct3.beginPath();
				ct3.moveTo(10,300);
				ct3.lineTo(30,280);
				ct3.lineTo(50,280);
				ct3.lineTo(30,300);
				ct3.lineTo(50,320);
				ct3.lineTo(30,320);
				ct3.closePath();
				ct3.fillStyle = "#ff6633";
				ct3.fill();
				ct3.strokeStyle = "#990000";
				ct3.stroke();
				ct3.font = "bold 24px sans-serif"
				ct3.fillStyle = "#990000";
				ct3.fillText(">",0,0);
			}
			else{	//NORMAL LEFT
				ct3.beginPath();
				ct3.moveTo(10,300);
				ct3.lineTo(30,280);
				ct3.lineTo(50,280);
				ct3.lineTo(30,300);
				ct3.lineTo(50,320);
				ct3.lineTo(30,320);
				ct3.closePath();
				ct3.fillStyle = "#ff9966";
				ct3.fill();
				ct3.strokeStyle = "#cc3300";
				ct3.stroke();
				ct3.font = "24px sans-serif"
				ct3.fillStyle = "#cc3300";
				ct3.fillText(">",0,0);
			}	
			if(questLog.current === 2){	//HOVERED RIGHT
				ct3.beginPath();
				ct3.moveTo(790,300);
				ct3.lineTo(770,280);
				ct3.lineTo(750,280);
				ct3.lineTo(770,300);
				ct3.lineTo(750,320);
				ct3.lineTo(770,320);
				ct3.closePath();
				ct3.fillStyle = "#ff6633";
				ct3.fill();
				ct3.strokeStyle = "#990000";
				ct3.stroke();
			}
			else{	//NORMAL RIGHT
				ct3.beginPath();
				ct3.moveTo(790,300);
				ct3.lineTo(770,280);
				ct3.lineTo(750,280);
				ct3.lineTo(770,300);
				ct3.lineTo(750,320);
				ct3.lineTo(770,320);
				ct3.closePath();
				ct3.fillStyle = "#ff9966";
				ct3.fill();
				ct3.strokeStyle = "#cc3300";
				ct3.stroke();
			}	
			if(questLog.current === 1){	//HOVERED BACK
				ct3.fillStyle = "#ff6633";
				ct3.fillRect(335,545,130,50);
				ct3.strokeStyle = "#990000";
				ct3.strokeRect(335,545,130,50);
				ct3.font = "bold 18px sans-serif"
				ct3.fillStyle = "#990000";
				ct3.fillText("Back to Menu",342,575);
			}
			else{	//NORMAL BACK
				ct3.fillStyle = "#ff9966";
				ct3.fillRect(335,545,130,50);
				ct3.strokeStyle = "#cc3300";
				ct3.strokeRect(335,545,130,50);
				ct3.font = "18px sans-serif"
				ct3.fillStyle = "#cc3300";
				ct3.fillText("Back to Menu",345,575);
			}
		},
		fillPages: function(){
			//TODO	FILL PAGES WITH IMAGES AND ALL DAT SHIT YO
		},
		leaveMenu: function(){
			console.log("//TODO GO BACK TO PAUSE MENU");
		}
	};
//BEASTIARY OBJ
	var beastiary = {
		//BG PAGE ITEMS NEXT||LAST PAGE BACK
		page: [1,2,3,4,5,6],	//TODO APPLY LATER
		pageNum: 0,
		button: ["last","back","next"],
		current: 0,
		update: function(){
			//TODO NAIGATION, IF SELECTED
			$("body").on("keyup", function(key){
				if(whichMenu === "beasts"){
					if((parseInt(key.which, 10) === 38) || (parseInt(key.which, 10) === 87)){ //UP W
						key.which = null;
						beastiary.current = 2;
						console.log(beastiary.button[beastiary.current]);
					}
					else if((parseInt(key.which, 10) === 40) || (parseInt(key.which, 10) === 83)){ //DOWN S
						key.which = null;
						beastiary.current = 1;
						console.log(beastiary.button[beastiary.current]);
					}
					else if((parseInt(key.which, 10) === 37) || (parseInt(key.which, 10) === 65)){ //LEFT D
						key.which = null;
						beastiary.current = 0;
						console.log(beastiary.button[beastiary.current]);
					}
					else if((parseInt(key.which, 10) === 39) || (parseInt(key.which, 10) === 68)){ //RIGHT A
						key.which = null;
						beastiary.current = 2;
						console.log(beastiary.button[beastiary.current]);
					}
					else if((parseInt(key.which, 10) === 13) || (parseInt(key.which, 10) === 90) || (parseInt(key.which, 10) === 32)){ //ENTER Z SPACE
						key.which = null;
						switch(beastiary.current){
							case(0):
								if(beastiary.pageNum > 0){
									beastiary.pageNum--;
								}
								console.log(beastiary.page[beastiary.pageNum]);
								break;
							case(1):
								beastiary.leaveMenu(); //TODO PASS PARAMETER
								break;
							case(2):
								if(beastiary.pageNum < (beastiary.page.length-1)){
									beastiary.pageNum++;
								}
								console.log(beastiary.page[beastiary.pageNum]);
								break;
							default:
								break;
						}
					}
					else if(parseInt(key.which, 10) === 88){ //BACK X
						key.which = null;
						if(beastiary.current === 1){
							beastiary.leaveMenu();
						}
						else{
							beastiary.current = 1;	
						}
					}
					else{}
				}
			});
			$("body").on("keydown", function(key){ //BACKSPACE
				if(whichMenu === "beasts"){
					if(parseInt(key.which, 10) === 8){
						key.preventDefault();
						key.which = null;
						if(beastiary.current === 1){
							beastiary.leaveMenu();
						}
						else{
							beastiary.current = 1;	
						}
					}
				}
			});
		},
		draw: function(){
			//DRAW BG		TODO REPLACE WITH PAGE 1 PAGE 2
			ct3.fillStyle = "#aaaaaa";
			ct3.fillRect(0,0,800,600);
			ct3.lineWidth = 3;
			// DRAW BUTTONS LEFT RIGHT BACK
			if(beastiary.current === 0){	//HOVERED LEFT
				ct3.beginPath();
				ct3.moveTo(10,300);
				ct3.lineTo(30,280);
				ct3.lineTo(50,280);
				ct3.lineTo(30,300);
				ct3.lineTo(50,320);
				ct3.lineTo(30,320);
				ct3.closePath();
				ct3.fillStyle = "#ff6633";
				ct3.fill();
				ct3.strokeStyle = "#990000";
				ct3.stroke();
				ct3.font = "bold 24px sans-serif"
				ct3.fillStyle = "#990000";
				ct3.fillText(">",0,0);
			}
			else{	//NORMAL LEFT
				ct3.beginPath();
				ct3.moveTo(10,300);
				ct3.lineTo(30,280);
				ct3.lineTo(50,280);
				ct3.lineTo(30,300);
				ct3.lineTo(50,320);
				ct3.lineTo(30,320);
				ct3.closePath();
				ct3.fillStyle = "#ff9966";
				ct3.fill();
				ct3.strokeStyle = "#cc3300";
				ct3.stroke();
				ct3.font = "24px sans-serif"
				ct3.fillStyle = "#cc3300";
				ct3.fillText(">",0,0);
			}	
			if(beastiary.current === 2){	//HOVERED RIGHT
				ct3.beginPath();
				ct3.moveTo(790,300);
				ct3.lineTo(770,280);
				ct3.lineTo(750,280);
				ct3.lineTo(770,300);
				ct3.lineTo(750,320);
				ct3.lineTo(770,320);
				ct3.closePath();
				ct3.fillStyle = "#ff6633";
				ct3.fill();
				ct3.strokeStyle = "#990000";
				ct3.stroke();
			}
			else{	//NORMAL RIGHT
				ct3.beginPath();
				ct3.moveTo(790,300);
				ct3.lineTo(770,280);
				ct3.lineTo(750,280);
				ct3.lineTo(770,300);
				ct3.lineTo(750,320);
				ct3.lineTo(770,320);
				ct3.closePath();
				ct3.fillStyle = "#ff9966";
				ct3.fill();
				ct3.strokeStyle = "#cc3300";
				ct3.stroke();
			}	
			if(beastiary.current === 1){	//HOVERED BACK
				ct3.fillStyle = "#ff6633";
				ct3.fillRect(335,545,130,50);
				ct3.strokeStyle = "#990000";
				ct3.strokeRect(335,545,130,50);
				ct3.font = "bold 18px sans-serif"
				ct3.fillStyle = "#990000";
				ct3.fillText("Back to Menu",342,575);
			}
			else{	//NORMAL BACK
				ct3.fillStyle = "#ff9966";
				ct3.fillRect(335,545,130,50);
				ct3.strokeStyle = "#cc3300";
				ct3.strokeRect(335,545,130,50);
				ct3.font = "18px sans-serif"
				ct3.fillStyle = "#cc3300";
				ct3.fillText("Back to Menu",345,575);
			}
		},
		fillPages: function(){
			//TODO	FILL PAGES WITH IMAGES AND ALL DAT SHIT YO
		},
		leaveMenu: function(){
			console.log("//TODO GO BACK TO PAUSE MENU");
		}
	};


	var viewport = { //Determines at what bounds a tile should be drawn. saves memory?
		x: 0,
		y: 0,
		width: 800,
		height: 400
	}
	//BACKGROUND TILE/PROP OBJECT
	function Prop(type, x, y){
		this.type = type;
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 100;
		this.imageXStart = 0;
		this.imageYStart = 0;
		this.img = 1;	//FOR WHATEVER REASON, CAN'T REFERENCE .THIS IN A DRAW IMAGE CALL
		this.isDoor = false;
		this.passable = true;
		this.turnedOn = false;
		function create(){
			//If a certain type, fill set rest of variables.
			switch(this.type){
				case ("blank"): //TESTING
					this.imageXStart = 0;
					break;
				case ("door1"): //TESTING
					this.imageXStart = 1;
					this.isDoor = true;
					break;
				case ("door2"): //TESTING
					this.imageXStart = 2;
					this.isDoor = true;
					break;
				case ("door3"): //TESTING
					this.imageXStart = 3;
					this.isDoor = true;
					break;
				case ("door4"): //TESTING
					this.imageXStart = 4;
					this.isDoor = true;
					break;
				case ("water"): //TESTING
					this.imageXStart = 5;
					//this.passable = false;
					break;
				case ("waterl"): //TESTING
					this.imageXStart = 6;
					//this.passable = false;
					break;
				case ("watert"): //TESTING
					this.imageXStart = 7;
					//this.passable = false;
					break;
				case ("waterr"): //TESTING
					this.imageXStart = 8;
					//this.passable = false;
					break;
				case ("waterb"): //TESTING
					this.imageXStart = 9;
					//this.passable = false;
					break;
				case ("waterbl"): //TESTING
					this.imageXStart = 10;
					//this.passable = false;
					break;
				case ("watertl"): //TESTING
					this.imageXStart = 11;
					//this.passable = false;
					break;
				case ("watertr"): //TESTING
					this.imageXStart = 12;
					//this.passable = false;
					break;
				case ("waterbr"): //TESTING
					this.imageXStart = 13;
					//this.passable = false;
					break;
					case ("dirt"): //TESTING
					this.imageXStart = 14;
					break;
				case ("dirtl"): //TESTING
					this.imageXStart = 15;
					break;
				case ("dirtt"): //TESTING
					this.imageXStart = 16;
					break;
				case ("dirtr"): //TESTING
					this.imageXStart = 17;
					break;
				case ("dirtb"): //TESTING
					this.imageXStart = 18;
					break;
				case ("dirtbl"): //TESTING
					this.imageXStart = 19;
					break;
				case ("dirttl"): //TESTING
					this.imageXStart = 20;
					break;
				case ("dirttr"): //TESTING
					this.imageXStart = 21;
					break;
				case ("dirtbr"): //TESTING
					this.imageXStart = 22;
					break;
					case ("grass"): //TESTING
					this.imageXStart = 23;
					break;
				case ("grassl"): //TESTING
					this.imageXStart = 24;
					break;
				case ("grasst"): //TESTING
					this.imageXStart = 25;
					break;
				case ("grassr"): //TESTING
					this.imageXStart = 26;
					break;
				case ("grassb"): //TESTING
					this.imageXStart = 27;
					break;
				case ("grassbl"): //TESTING
					this.imageXStart = 28;
					break;
				case ("grasstl"): //TESTING
					this.imageXStart = 29;
					break;
				case ("grasstr"): //TESTING
					this.imageXStart = 30;
					break;
				case ("grassbr"): //TESTING
					this.imageXStart = 31;
					break;
				case ("indoor1"): //TESTING
					this.imageXStart = 32;
					this.isDoor = true;
					break;
				case ("indoor2"): //TESTING
					this.imageXStart = 33;
					this.isDoor = true;
					break;
				case ("indoor3"): //TESTING
					this.imageXStart = 34;
					this.isDoor = true;
					break;
				case ("indoor4"): //TESTING
					this.imageXStart = 35;
					this.isDoor = true;
					break;
				case ("wkfloor"): //TESTING
					this.imageXStart = 36;
					break;
				case ("wkwall"): //TESTING
					this.imageXStart = 37;
					//this.passable = false;
					break;
				case ("wkroof1"): //TESTING
					this.imageXStart = 38;
					//this.passable = false;
					break;
				case ("wkroof2"): //TESTING
					this.imageXStart = 39;
					//this.passable = false;
					break;
				case ("wkroof3"): //TESTING
					this.imageXStart = 40;
					//this.passable = false;
					break;
				case ("wkroof4"): //TESTING
					this.imageXStart = 41;
					//this.passable = false;
					break;
				case ("tree1"): //TESTING
					this.imageXStart = 42;
					//this.passable = false;
					break;
				case ("tree2"): //TESTING
					this.imageXStart = 43;
					//this.passable = false;
					break;
				case ("tree3"): //TESTING
					this.imageXStart = 44;
					//this.passable = false;
					break;
				case ("tree4"): //TESTING
					this.imageXStart = 45;
					//this.passable = false;
					break;
				case ("dBrick"): //TESTING
					this.imageXStart = 46;
					//this.passable = false;
					break;
				case ("dDoor"): //TESTING
					this.imageXStart = 47;
					this.isDoor = true;
					//this.passable = false;
					break;
				case ("dBars"): //TESTING
					this.imageXStart = 48;
					//this.passable = false;
					break;
				case ("bTreeTrunk1"): //TESTING
					this.imageXStart = 49;
					//this.passable = false;
					break;
				case ("bTreeTrunk2"): //TESTING
					this.imageXStart = 50;
					//this.passable = false;
					break;
				case ("bTreeTrunk3"): //TESTING
					this.imageXStart = 51;
					//this.passable = false;
					break;
				case ("bTreeDoor"): //TESTING
					this.imageXStart = 52;
					this.isDoor = true;
					break;
				case ("ladder"): //TESTING
					this.imageXStart = 53;
					break;
				case ("panel"): //TESTING
					this.imageXStart = 54;
					break;
				case ("bTreeTop1"): //TESTING
					this.imageXStart = 55;
					//this.passable = false;
					break;
				case ("bTreeTop2"): //TESTING
					this.imageXStart = 56;
					//this.passable = false;
					break;
				case ("bTreeTop3"): //TESTING
					this.imageXStart = 57;
					//this.passable = false;
					break;
				case ("bTreeMid1"): //TESTING
					this.imageXStart = 58;
					//this.passable = false;
					break;
				case ("bTreeMid2"): //TESTING
					this.imageXStart = 59;
					//this.passable = false;
					break;
				case ("bTreeMid3"): //TESTING
					this.imageXStart = 60;
					//this.passable = false;
					break;
				case ("flowers1"): //TESTING
					this.imageXStart = 61;
					break;
				case ("flowers2"): //TESTING
					this.imageXStart = 62;
					break;
				case ("flowers3"): //TESTING
					this.imageXStart = 63;
					break;
				case ("bwall1"): //TESTING
					this.imageXStart = 64;
					//this.passable = false;
					break;
				case ("bwall2"): //TESTING
					this.imageXStart = 65;
					//this.passable = false;
					break;
				case ("bwall3"): //TESTING
					this.imageXStart = 66;
					//this.passable = false;
					break;
				case ("bwall4"): //TESTING
					this.imageXStart = 67;
					//this.passable = false;
					break;
				case ("bwall5"): //TESTING
					this.imageXStart = 68;
					//this.passable = false;
					break;
				case ("bwall6"): //TESTING
					this.imageXStart = 69;
					//this.passable = false;
					break;
				case ("broof1"): //TESTING
					this.imageXStart = 70;
					//this.passable = false;
					break;
				case ("broof2"): //TESTING
					this.imageXStart = 71;
					//this.passable = false;
					break;
				case ("broof3"): //TESTING
					this.imageXStart = 72;
					//this.passable = false;
					break;
				case ("broof4"): //TESTING
					this.imageXStart = 73;
					//this.passable = false;
					break;
				case ("broof5"): //TESTING
					this.imageXStart = 74;
					//this.passable = false;
					break;
				case ("broof6"): //TESTING
					this.imageXStart = 75;
					//this.passable = false;
					break;
				case ("broof7"): //TESTING
					this.imageXStart = 76;
					//this.passable = false;
					break;
				case ("stalagmite"): //TESTING
					this.imageXStart = 77;
					//this.passable = false;
					break;
				case ("cavewall"): //TESTING
					this.imageXStart = 78;
					//this.passable = false;
					break;
				case ("abush"): //TESTING
					this.imageXStart = 79;
					//this.passable = false;
					break;
				case ("abushl"): //TESTING
					this.imageXStart = 80;
					//this.passable = false;
					break;
				case ("abushr"): //TESTING
					this.imageXStart = 81;
					//this.passable = false;
					break;
				case ("abusht"): //TESTING
					this.imageXStart = 82;
					//this.passable = false;
					break;
				case ("abushb"): //TESTING
					this.imageXStart = 83;
					//this.passable = false;
					break;
				case ("abushmidv"): //TESTING
					this.imageXStart = 84;
					//this.passable = false;
					break;
				case ("abushmidh"): //TESTING
					this.imageXStart = 85;
					//this.passable = false;
					break;
				case ("crop1"): //TESTING
					this.imageXStart = 86;
					break;
				case ("crop2"): //TESTING
					this.imageXStart = 87;
					break;
				case ("crop3"): //TESTING
					this.imageXStart = 88;
					break;
				case ("naturedoorv"): //TESTING
					this.imageXStart = 89;
					this.isDoor = true;
					//this.passable = false;
					break;
				case ("naturedoorh"): //TESTING
					this.imageXStart = 90;
					this.isDoor = true;
					break;
				case ("dockt"): //TESTING
					this.imageXStart = 91;
					//TODO IS CROSSABLE
					break;
				case ("dockb"): //TESTING
					this.imageXStart = 92;
					//this.passable = false;
					break;
				case ("dockpole"): //TESTING
					this.imageXStart = 93;
					//this.passable = false;
					break;
				case ("vendortl"): //TESTING
					this.imageXStart = 94;
					//this.passable = false;
					break;
				case ("vendortm"): //TESTING
					this.imageXStart = 95;
					//this.passable = false;
					break;
				case ("vendortr"): //TESTING
					this.imageXStart = 96;
					//this.passable = false;
					break;
				case ("vendorbl"): //TESTING
					this.imageXStart = 97;
					//this.passable = false;
					break;
				case ("vendorbm"): //TESTING
					this.imageXStart = 98;
					//this.passable = false;
					break;
				case ("vendorbr"): //TESTING
					this.imageXStart = 99;
					//this.passable = false;
					break;
				case ("venditem1"): //TESTING
					this.imageXStart = 100;
					//this.passable = false;
					break;
				case ("venditem2"): //TESTING
					this.imageXStart = 101;
					//this.passable = false;
					break;
				case ("venditem3"): //TESTING
					this.imageXStart = 102;
					//this.passable = false;
					break;
				case ("venditem4"): //TESTING
					this.imageXStart = 103;
					//this.passable = false;
					break;
				case ("venditem5"): //TESTING
					this.imageXStart = 104;
					//this.passable = false;
					break;
				case ("venditem6"): //TESTING
					this.imageXStart = 105;
					//this.passable = false;
					break;
				case ("venditem7"): //TESTING
					this.imageXStart = 106;
					//this.passable = false;
					break;
				case ("venditem8"): //TESTING
					this.imageXStart = 107;
					//this.passable = false;
					break;
				case ("venditem9"): //TESTING
					this.imageXStart = 108;
					//this.passable = false;
					break;
				case ("towerwall"): //TESTING
					this.imageXStart = 109;
					//this.passable = false;
					break;
				case ("towerwindow"): //TESTING
					this.imageXStart = 110;
					//this.passable = false;
					break;
				case ("hutta"): //TESTING
					this.imageXStart = 111;
					//this.passable = false;
					break;
				case ("hutb1"): //TESTING
					this.imageXStart = 112;
					//this.passable = false;
					break;
				case ("hutm"): //TESTING
					this.imageXStart = 113;
					//this.passable = false;
					break;
				case ("hutb3"): //TESTING
					this.imageXStart = 114;
					//this.passable = false;
					break;
				case ("huttb1"): //TESTING
					this.imageXStart = 115;
					//this.passable = false;
					break;
				case ("huttb2"): //TESTING
					this.imageXStart = 116;
					//this.passable = false;
					break;
				case ("wall1"): //TESTING
					this.imageXStart = 117;
					//this.passable = false;
					break;
				case ("wall2"): //TESTING
					this.imageXStart = 118;
					//this.passable = false;
					break;
				case ("wall3"): //TESTING
					this.imageXStart = 119;
					//this.passable = false;
					break;
				case ("window1"): //TESTING
					this.imageXStart = 120;
					break;
				case ("window2"): //TESTING
					this.imageXStart = 121;
					break;
				case ("sidewall1"): //TESTING
					this.imageXStart = 122;
					//this.passable = false;
					break;
				case ("sidewall2"): //TESTING
					this.imageXStart = 123;
					//this.passable = false;
					break;
				case ("sidewall3"): //TESTING
					this.imageXStart = 124;
					//this.passable = false;
					break;
				case ("bridge"): //TESTING
					this.imageXStart = 125;
					break;
				case ("towergatem"): //TESTING
					this.imageXStart = 126;
					//this.passable = false;
					break;
				case ("towergatetl"): //TESTING
					this.imageXStart = 127;
					//this.passable = false;
					break;
				case ("towergatetr"): //TESTING
					this.imageXStart = 128;
					//this.passable = false;
					break;
				case ("bushwallm"): //TESTING
					this.imageXStart = 129;
					//this.passable = false;
					break;
				case ("bushwalltr"): //TESTING
					this.imageXStart = 130;
					//this.passable = false;
					break;
				case ("bushwalltl"): //TESTING
					this.imageXStart = 131;
					//this.passable = false;
					break;
				case ("bushwallt"): //TESTING
					this.imageXStart = 132;
					//this.passable = false;
					break;
				case ("bushwallb"): //TESTING
					this.imageXStart = 133;
					//this.passable = false;
					break;
				case ("bushwallbr"): //TESTING
					this.imageXStart = 134;
					//this.passable = false;
					break;
				case ("bushwallbl"): //TESTING
					this.imageXStart = 135;
					//this.passable = false;
					break;
				case ("stablewall"): //TESTING
					this.imageXStart = 136;
					//this.passable = false;
					break;
				case ("painting1"): //TESTING
					this.imageXStart = 137;
					break;
				case ("painting2"): //TESTING
					this.imageXStart = 138;
					break;
				case ("painting3"): //TESTING
					this.imageXStart = 139;
					break;
				case ("painting4"): //TESTING
					this.imageXStart = 140;
					break;
				case ("package"): //TESTING
					this.imageXStart = 141;
					//this.passable = false;
					break;
				case ("packagel"): //TESTING
					this.imageXStart = 142;
					//this.passable = false;
					break;
				case ("packager"): //TESTING
					this.imageXStart = 143;
					//this.passable = false;
					break;
				case ("signa"): //TESTING
					this.imageXStart = 144;
					//this.passable = false;
					break;
				case ("signb"): //TESTING
					this.imageXStart = 145;
					//this.passable = false;
					break;
				case ("signl"): //TESTING
					this.imageXStart = 146;
					//this.passable = false;
					break;
				case ("signr"): //TESTING
					this.imageXStart = 147;
					//this.passable = false;
					break;
				case ("storename1"): //TESTING
					this.imageXStart = 148;
					break;
				case ("storename2"): //TESTING
					this.imageXStart = 149;
					break;
				case ("storename3"): //TESTING
					this.img = 2;
					this.imageXStart = 0;
					break;
				case ("storename4"): //TESTING
					this.img = 2;
					this.imageXStart = 1;
					break;
				case ("storename5"): //TESTING
					this.img = 2;
					this.imageXStart = 2;
					break;
				case ("carpettl"): //TESTING
					this.img = 2;
					this.imageXStart = 3;
					break;
				case ("carpettm"): //TESTING
					this.img = 2;
					this.imageXStart = 4;
					break;
				case ("carpettr"): //TESTING
					this.img = 2;
					this.imageXStart = 5;
					break;
				case ("carpetml"): //TESTING
					this.img = 2;
					this.imageXStart = 6;
					break;
				case ("carpetmm"): //TESTING
					this.img = 2;
					this.imageXStart = 7;
					break;
				case ("carpetmr"): //TESTING
					this.img = 2;
					this.imageXStart = 8;
					break;
				case ("carpetbl"): //TESTING
					this.img = 2;
					this.imageXStart = 9
					break;
				case ("carpetbm"): //TESTING
					this.img = 2;
					this.imageXStart = 10;
					break;
				case ("carpetbr"): //TESTING
					this.img = 2;
					this.imageXStart = 11;
					break;
				case ("waterfallh"): //TESTING
					this.img = 2;
					this.imageXStart = 12;
					//this.passable = false;
					break;
				case ("waterfallv"): //TESTING
					this.img = 2;
					this.imageXStart = 13;
					//this.passable = false;
					break;
				case ("waterfalltl"): //TESTING
					this.img = 2;
					this.imageXStart = 14;
					//this.passable = false;
					break;
				case ("waterfalltr"): //TESTING
					this.img = 2;
					this.imageXStart = 15;
					//this.passable = false;
					break;
				case ("trough"): //TESTING
					this.img = 2;
					this.imageXStart = 16;
					//this.passable = false;
					break;
				case ("troughl"): //TESTING
					this.img = 2;
					this.imageXStart = 17;
					//this.passable = false;
					break;
				case ("troughr"): //TESTING
					this.img = 2;
					this.imageXStart = 18;
					//this.passable = false;
					break;
				case ("trought"): //TESTING
					this.img = 2;
					this.imageXStart = 19;
					//this.passable = false;
					break;
				case ("troughb"): //TESTING
					this.img = 2;
					this.imageXStart = 20;
					//this.passable = false;
					break;
				case ("counterfront"): //TESTING
					this.img = 2;
					this.imageXStart = 21;
					//this.passable = false;
					break;
				case ("counterside"): //TESTING
					this.img = 2;
					this.imageXStart = 22;
					//this.passable = false;
					break;
				case ("counterl"): //TESTING
					this.img = 2;
					this.imageXStart = 23;
					//this.passable = false;
					break;
				case ("counterr"): //TESTING
					this.img = 2;
					this.imageXStart = 24;
					//this.passable = false;
					break;
				case ("countert"): //TESTING
					this.img = 2;
					this.imageXStart = 25;
					//this.passable = false;
					break;
				case ("counterb"): //TESTING
					this.img = 2;
					this.imageXStart = 26;
					//this.passable = false;
					break;
				case ("curtainll"): //TESTING
					this.img = 2;
					this.imageXStart = 27;
					//this.passable = false;
					break;
				case ("curtainlr"): //TESTING
					this.img = 2;
					this.imageXStart = 28;
					//this.passable = false;
					break;
				case ("curtainm"): //TESTING
					this.img = 2;
					this.imageXStart = 29;
					//this.passable = false;
					break;
				case ("curtainrl"): //TESTING
					this.img = 2;
					this.imageXStart = 30;
					//this.passable = false;
					break;
				case ("curtainrr"): //TESTING
					this.img = 2;
					this.imageXStart = 31;
					//this.passable = false;
					break;
				case ("stonetable"): //TESTING
					this.img = 2;
					this.imageXStart = 32;
					//this.passable = false;
					break;
				case ("stonetablel"): //TESTING
					this.img = 2;
					this.imageXStart = 33;
					//this.passable = false;
					break;
				case ("stonetabler"): //TESTING
					this.img = 2;
					this.imageXStart = 34;
					//this.passable = false;
					break;
				case ("stonetableb"): //TESTING
					this.img = 2;
					this.imageXStart = 35;
					//this.passable = false;
					break;
				case ("stonetablet"): //TESTING
					this.img = 2;
					this.imageXStart = 36;
					//this.passable = false;
					break;
				case ("poollinertl"): //TESTING
					this.img = 2;
					this.imageXStart = 37;
					break;
				case ("poollinertm"): //TESTING
					this.img = 2;
					this.imageXStart = 38;
					break;
				case ("poollinertr"): //TESTING
					this.img = 2;
					this.imageXStart = 39;
					break;
				case ("poollinerml"): //TESTING
					this.img = 2;
					this.imageXStart = 40;
					break;
				case ("poollinermr"): //TESTING
					this.img = 2;
					this.imageXStart = 41;
					break;
				case ("poollinerbl"): //TESTING
					this.img = 2;
					this.imageXStart = 42;
					break;
				case ("poollinerbm"): //TESTING
					this.img = 2;
					this.imageXStart = 43;
					break;
				case ("poollinerbr"): //TESTING
					this.img = 2;
					this.imageXStart = 44;
					break;
				case ("bearhead"): //TESTING
					this.img = 2;
					this.imageXStart = 45;
					//this.passable = false;
					break;
				case ("beararml"): //TESTING
					this.img = 2;
					this.imageXStart = 46;
					break;
				case ("beartorso"): //TESTING
					this.img = 2;
					this.imageXStart = 47;
					break;
				case ("beararmr"): //TESTING
					this.img = 2;
					this.imageXStart = 48;
					break;
				case ("bearlegl"): //TESTING
					this.img = 2;
					this.imageXStart = 49;
					break;
				case ("bearbutt"): //TESTING
					this.img = 2;
					this.imageXStart = 50;
					break;
				case ("bearlegr"): //TESTING
					this.img = 2;
					this.imageXStart = 51;
					break;
				case ("UNFILLED"): //TESTING
					this.img = 2;
					this.imageXStart = 52;
					break;
				case ("pittl"): //TESTING
					this.img = 2;
					this.imageXStart = 53;
					//this.passable = false;
					break;
				case ("pitm"): //TESTING
					this.img = 2;
					this.imageXStart = 54;
					//this.passable = false;
					break;
				case ("pittr"): //TESTING
					this.img = 2;
					this.imageXStart = 55;
					//this.passable = false;
					break;
				case ("pitbl"): //TESTING
					this.img = 2;
					this.imageXStart = 56;
					//this.passable = false;
					break;
				case ("pitbr"): //TESTING
					this.img = 2;
					this.imageXStart = 57;
					//this.passable = false;
					break;
				case ("stageb"): //TESTING
					this.img = 2;
					this.imageXStart = 58;
					//this.passable = false;
					break;
				case ("staget"): //TESTING
					this.img = 2;
					this.imageXStart = 59;
					//this.passable = false;
					break;
				case ("potterswheell"): //TESTING
					this.img = 2;
					this.imageXStart = 60;
					//this.passable = false;
					break;
				case ("potterswheelr"): //TESTING
					this.img = 2;
					this.imageXStart = 61;
					//this.passable = false;
					break;
				case ("garbagem"): //TESTING
					this.img = 2;
					this.imageXStart = 62;
					//this.passable = false;
					break;
				case ("garbagel"): //TESTING
					this.img = 2;
					this.imageXStart = 63;
					//this.passable = false;
					break;
				case ("garbage"): //TESTING
					this.img = 2;
					this.imageXStart = 64;
					//this.passable = false;
					break;
				case ("garbager"): //TESTING
					this.img = 2;
					this.imageXStart = 65;
					//this.passable = false;
					break;
				case ("haym"): //TESTING
					this.img = 2;
					this.imageXStart = 66;
					//this.passable = false;
					break;
				case ("hayl"): //TESTING
					this.img = 2;
					this.imageXStart = 67;
					//this.passable = false;
					break;
				case ("hay"): //TESTING
					this.img = 2;
					this.imageXStart = 68;
					//this.passable = false;
					break;
				case ("hayr"): //TESTING
					this.img = 2;
					this.imageXStart = 69;
					//this.passable = false;
					break;
				case ("coalbl"): //TESTING
					this.img = 2;
					this.imageXStart = 70;
					//this.passable = false;
					break;
				case ("coalbr"): //TESTING
					this.img = 2;
					this.imageXStart = 71;
					//this.passable = false;
					break;
				case ("coalm"): //TESTIN
					this.img = 2;
					this.imageXStart = 72;
					//this.passable = false;
					break;
				case ("coaltl"): //TESTING
					this.img = 2;
					this.imageXStart = 73;
					//this.passable = false;
					break;
				case ("coaltr"): //TESTING
					this.img = 2;
					this.imageXStart = 74;
					//this.passable = false;
					break;
				case ("millerpillar"): //TESTING
					this.img = 2;
					this.imageXStart = 75;
					//this.passable = false;
					break;
				case ("millertl"): //TESTING
					this.img = 2;
					this.imageXStart = 76;
					//this.passable = false;
					break;
				case ("millertm"): //TESTING
					this.img = 2;
					this.imageXStart = 77;
					//this.passable = false;
					break;
				case ("millertr"): //TESTING
					this.img = 2;
					this.imageXStart = 78;
					//this.passable = false;
					break;
				case ("millerbl"): //TESTING
					this.img = 2;
					this.imageXStart = 79;
					//this.passable = false;
					break;
				case ("millerbm"): //TESTING
					this.img = 2;
					this.imageXStart = 80;
					//this.passable = false;
					break;
				case ("millerbr"): //TESTING
					this.img = 2;
					this.imageXStart = 81;
					//this.passable = false;
					break;
				case ("lamp1"): //TESTING
					this.img = 2;
					this.imageXStart = 82;
					//this.passable = false;
					break;
				case ("lamp2"): //TESTING
					this.img = 2;
					//this.passable = false;
					this.imageXStart = 83;
					break;
				case ("lamp3"): //TESTING
					this.img = 2;
					this.imageXStart = 84;
					//this.passable = false;
					break;
				case ("lamp4"): //TESTING
					this.img = 2;
					this.imageXStart = 85;
					//this.passable = false;
					break;
				case ("lamp5"): //TESTING
					this.img = 2;
					this.imageXStart = 86;
					//this.passable = false;
					break;
				case ("couchl"): //TESTING
					this.img = 2;
					this.imageXStart = 87;
					//this.passable = false;
					break;
				case ("couchr"): //TESTING
					this.img = 2;
					this.imageXStart = 88;
					//this.passable = false;
					break;
				case ("coucht"): //TESTING
					this.img = 2;
					this.imageXStart = 89;
					//this.passable = false;
					break;
				case ("couchb"): //TESTING
					this.img = 2;
					this.imageXStart = 90;
					//this.passable = false;
					break;
				case ("benchl"): //TESTING
					this.img = 2;
					this.imageXStart = 91;
					//this.passable = false;
					break;
				case ("benchr"): //TESTING
					this.img = 2;
					this.imageXStart = 92;
					//this.passable = false;
					break;
				case ("bencht"): //TESTING
					this.img = 2;
					this.imageXStart = 93;
					//this.passable = false;
					break;
				case ("benchb"): //TESTING
					this.img = 2;
					this.imageXStart = 94;
					//this.passable = false;
					break;
				case ("lockerl"): //TESTING
					this.img = 2;
					this.imageXStart = 95;
					//this.passable = false;
					break;
				case ("lockerr"): //TESTING
					this.img = 2;
					this.imageXStart = 96;
					//this.passable = false;
					break;
				case ("lockerf"): //TESTING
					this.img = 2;
					this.imageXStart = 97;
					//this.passable = false;
					break;
				case ("shelfl"): //TESTING
					this.img = 2;
					this.imageXStart = 98;
					//this.passable = false;
					break;
				case ("shelfr"): //TESTING
					this.img = 2;
					this.imageXStart = 99;
					//this.passable = false;
					break;
				case ("shelff"): //TESTING
					this.img = 2;
					this.imageXStart = 100;
					//this.passable = false;
					break;
				case ("table1"): //TESTING
					this.img = 2;
					this.imageXStart = 101;
					//this.passable = false;
					break;
				case ("table2"): //TESTING
					this.img = 2;
					this.imageXStart = 102;
					//this.passable = false;
					break;
				case ("tablel"): //TESTING
					this.img = 2;
					this.imageXStart = 103;
					//this.passable = false;
					break;
				case ("tabler"): //TESTING
					this.img = 2;
					this.imageXStart = 104;
					//this.passable = false;
					break;
				case ("tablet"): //TESTING
					this.img = 2;
					this.imageXStart = 105;
					//this.passable = false;
					break;
				case ("tableb"): //TESTING
					this.img = 2;
					this.imageXStart = 106;
					//this.passable = false;
					break;
				case ("chair1f"): //TESTING
					this.img = 2;
					this.imageXStart = 107;
					//this.passable = false;
					break;
				case ("chair1s"): //TESTING
					this.img = 2;
					this.imageXStart = 108;
					//this.passable = false;
					break;
				case ("chair2f"): //TESTING
					this.img = 2;
					this.imageXStart = 109;
					//this.passable = false;
					break;
				case ("chair2s"): //TESTING
					this.img = 2;
					this.imageXStart = 110;
					//this.passable = false;
					break;
				case ("bedl"): //TESTING
					this.img = 2;
					this.imageXStart = 111;
					//this.passable = false;
					break;
				case ("bedr"): //TESTING
					this.img = 2;
					this.imageXStart = 112;
					//this.passable = false;
					break;
				case ("bedt"): //TESTING
					this.img = 2;
					this.imageXStart = 113;
					//this.passable = false;
					break;
				case ("bedb"): //TESTING
					this.img = 2;
					this.imageXStart = 114;
					//this.passable = false;
					break;
				case ("hydrant"): //TESTING
					this.img = 2;
					this.imageXStart = 115;
					//this.passable = false;
					break;
				case ("vase"): //TESTING
					this.img = 2;
					this.imageXStart = 116;
					//this.passable = false;
					break;
				case ("trophy"): //TESTING
					this.img = 2;
					this.imageXStart = 117;
					//this.passable = false;
					break;
				case ("toilet"): //TESTING
					this.img = 2;
					this.imageXStart = 118;
					//this.passable = false;
					break;
				case ("sink"): //TESTING
					this.img = 2;
					this.imageXStart = 119;
					//this.passable = false;
					break;
				case ("campfire"): //TESTING
					this.img = 2;
					this.imageXStart = 120;
					//this.passable = false;
					break;
				case ("bucket"): //TESTING
					this.img = 2;
					this.imageXStart = 121;
					//this.passable = false;
					break;
				case ("podium"): //TESTING
					this.img = 2;
					this.imageXStart = 122;
					//this.passable = false;
					break;
				case ("catfood"): //TESTING
					this.img = 2;
					this.imageXStart = 123;
					break;
				case ("cradle"): //TESTING
					this.img = 2;
					this.imageXStart = 124;
					//this.passable = false;
					break;
				case ("mirror"): //TESTING
					this.img = 2;
					this.imageXStart = 125;
					//this.passable = false;
					break;
				case ("apple"): //TESTING
					this.img = 2;
					this.imageXStart = 126;
					break;
				case ("barn1"): //TESTING
					this.img = 2;
					this.imageXStart = 127;
					//this.passable = false;
					break;
				case ("brick"): //TESTING
					this.img = 2;
					this.imageXStart = 128;
					//this.passable = false;
					break;
				case ("barn2"): //TESTING
					this.img = 2;
					this.imageXStart = 129;
					//this.passable = false;
					break;
				case ("fencev"): //TESTING
					this.img = 2;
					this.imageXStart = 130;
					//this.passable = false;
					break;
				case ("fenceh"): //TESTING
					this.img = 2;
					this.imageXStart = 131;
					//this.passable = false;
					break;
				case ("wellt"): //TESTING
					this.img = 2;
					this.imageXStart = 132;
					//this.passable = false;
					break;
				case ("wellb"): //TESTING
					this.img = 2;
					this.imageXStart = 133;
					//this.passable = false;
					break;
				case ("cobblestone"): //TESTING
					this.img = 2;
					this.imageXStart = 134;
					break;
				case ("statue1"): //TESTING
					this.img = 2;
					this.imageXStart = 135;
					//this.passable = false;
					break;
				case ("statue2"): //TESTING
					this.img = 2;
					this.imageXStart = 136;
					//this.passable = false;
					break;
				case ("slumroof"): //TESTING
					this.img = 2;
					this.imageXStart = 137;
					//this.passable = false;
					break;
				case ("slumbox"): //TESTING
					this.img = 2;
					this.imageXStart = 138;
					//this.passable = false;
					break;
				case ("stairsf"): //TESTING
					this.img = 2;
					this.imageXStart = 139;
					//this.passable = false;
					break;
				case ("stairss"): //TESTING
					this.img = 2;
					this.imageXStart = 140;
					//this.passable = false;
					break;
				case ("redcarpet"): //TESTING
					this.img = 2;
					this.imageXStart = 141;
					break;
				case ("brstallside"): //TESTING
					this.img = 2;
					this.imageXStart = 142;
					//this.passable = false;
					break;
				case ("brstalldoorclose"): //TESTING
					this.img = 2;
					this.imageXStart = 143;
					//this.passable = false;
					break;
				case ("brstalldooropen"): //TESTING
					this.img = 2;
					this.imageXStart = 144;
					//this.passable = false;
					break;
				case ("wood"): //TESTING
					this.img = 2;
					this.imageXStart = 145;
					//this.passable = false;
					break;
				case ("tarpt"): //TESTING
					this.img = 2;
					this.imageXStart = 146;
					break;
				case ("tarpb"): //TESTING
					this.img = 2;
					this.imageXStart = 147;
					break;
				case ("secretdoor"): //TESTING
					this.img = 2;
					this.imageXStart = 148;
					this.isDoor = true;
					break;
				case ("openwindow"): //TESTING
					this.img = 2;
					this.imageXStart = 149;
					break;
				/*case (""): //TESTING
					this.img = 3;
					this.imageXStart = ;
					break;*/
				default: //NOTHINGNESS
					this.imageXStart = 0;
					this.passable = false;
					break;
			}
		}
		this.create = create	
		function update(direction){
			//Update position and collision
			switch(direction){
				case("up"):
					if(player.isCollided === false){
						this.y+=10;
					}
					break;
				case("down"):
					if(player.isCollided === false){
						this.y-=10;
					}
					break;
				case("left"):
					if(player.isCollided === false){
						this.x+=10;
					}
					break;
				case("right"):
					if(player.isCollided === false){
						this.x-=10;
					}
					break;
				default:
					break;
			}
		}
		this.update = update;
		function draw(){
			//draw at x and y
			if((((this.y + this.height) > viewport.y) && (this.y < (viewport.y + viewport.height))) && (((this.x + this.width) > viewport.x) && (this.x < (viewport.x + viewport.width)))){ //Tile is in viewport, draw it~
				if(this.img === 1){
					ct1.drawImage(tilePropsImg1, (this.imageXStart*this.width), (this.imageYStart*this.height), this.width, this.height, this.x, this.y, 100, 100);
				}
				else if(this.img ===2){
					ct1.drawImage(tilePropsImg2, (this.imageXStart*this.width), (this.imageYStart*this.height), this.width, this.height, this.x, this.y, 100, 100);
				}
				else{}
			}
			else{} //Don't do It, sherlock~
		}
		this.draw = draw;
	}
	//PLACE OBJ
	function Place(map/*, bgImage*/){
		this.map = map; //inserted array filled with prop objects
		//this.bgImage = bgImage;
		this.T = 0;
		this.L = 0;
		this.B = 0;
		this.R = 0;
		this.collidables = new Array();
		function create(){
			//for each tile item in the map object, run the create function
			for(var i = 0; i <this.map.length; i++){
				this.map[i].create();
				if(i===0){
					this.T = this.map[i].y;
					this.L = this.map[i].x;
				}
				else if(i===(this.map.length - 1)){
					this.B = (this.map[i].y + this.map[i].height);
					this.R = (this.map[i].x + this.map[i].width);
				}
				else{}
			}
		}
		this.create = create;
		function collidableRange(){
			this.collidables = null;
			this.collidables = new Array;
			for(var q = 0; q < this.map.length; q++){
				if((((this.map[q].y + this.map[q].height) > (viewport.y - 100)) && (this.map[q].y < (viewport.y + viewport.height + 100))) && (((this.map[q].x + this.map[q].width) > (viewport.x - 100)) && (this.map[q].x < (viewport.x + viewport.width + 100)))){ //Tile is in viewport, draw it~
					if(this.map[q].passable === false){
						this.collidables.push(this.map[q]);
					}
				}
			}
		}
		this.collidableRange = collidableRange;
		function update(direction){
			//Update position and collision
			//for each tile item in the map object, run the create function
			switch(direction){
				case("up"):
					if((this.T < viewport.y) && (player.isCollided === false)){
						this.T += 10;
						this.B += 10;
						for(var i = 0; i <this.map.length; i++){
							this.map[i].update(direction);
						}
					}
					break;
				case("down"):
					if((this.B > viewport.height) && (player.isCollided === false)){
						this.B -= 10;
						this.T -= 10;
						for(var j = 0; j <this.map.length; j++){
							this.map[j].update(direction);
						}
					}
					break;
				case("left"):
					if((this.L < viewport.x) && (player.isCollided === false)){
						this.L += 10;
						this.R += 10;
						for(var k = 0; k <this.map.length; k++){
							this.map[k].update(direction);
						}
					}
					break;
				case("right"):
					if((this.R > viewport.width) && (player.isCollided === false)){
						this.R -= 10;
						this.L -= 10;
						for(var l = 0; l <this.map.length; l++){
							this.map[l].update(direction);
						}
					}
					break;
				default:
					break;
			}
		}
		this.update = update;
		function draw(){
			//call all draw functions in map object prop
			//for each tile item in the map object, run the create function
			for(var k = 0; k <this.map.length; k++){
				this.map[k].draw();
			}
		}
		this.draw = draw;
	}
	//DOOR OBJ FOR DOORS IN YOUR MAPS
	function Door(x,y,destination, playerx, playery, mapx, mapy){ //Door position, door's destination, where player and map will be when moved to next map
		this.x = x;
		this.y = y;
		this.destination = destination;
		this.playerx = playerx;
		this.playery = playery;
		function leaveMap(){
			//TODO CALL TRANSITION FUNCTION, CHANGE MAP, MAP COORDINATES TO SHOW, COORDINATES OF PLAYER
			whichMap = this.destination;
			/*tempCurrentX = currentMap.L
			tempCurrentY = currentMap.T
			if(this.mapx < currentMap.L){
				for(var i = tempCurrentX; i <= this.mapx; i+=10){
					currentMap.L += 10;
					currentMap.R += 10;
				}
			}
			else if(this.mapx > currentMap.L){
				for(var j = tempCurrentX; j >= this.mapx; j-=10){
					currentMap.L -= 10;
					currentMap.R -= 10;
				}
			}
			else{}
			if(this.mapy < currentMap.T){
				for(var k = tempCurrentY; k <= this.mapx; k+=10){
					currentMap.T += 10;
					currentMap.B += 10;
				}
			}
			else if(this.mapy > currentMap.T){
				for(var l = tempCurrentY; l >= this.mapx; l-=10){
					currentMap.T -= 10;
					currentMap.B -= 10;
				}
			}
			else{}*/
			player.x = this.playerx;
			player.y = this.playery;
		}
		this.leaveMap = leaveMap;
	}
	//MAPS WITH TILES
	var wkhomeout = [	//First and last tiles of a map list must fill top and bottom corners of map bounds, even if filled with "blank" tile
		new Prop("water",-100,-500),
		new Prop("water",0,-500),
		new Prop("water",100,-500),
		new Prop("water",200,-500),
		new Prop("water",300,-500),
		new Prop("water",400,-500),
		new Prop("water",500,-500),
		new Prop("water",600,-500),
		new Prop("water",700,-500),
		new Prop("water",800,-500),
		new Prop("water",900,-500),
		new Prop("water",1000,-500),
		new Prop("water",-100,-400),
		new Prop("water",0,-400),
		new Prop("water",100,-400),
		new Prop("water",200,-400),
		new Prop("water",300,-400),
		new Prop("water",400,-400),
		new Prop("water",500,-400),
		new Prop("water",600,-400),
		new Prop("water",700,-400),
		new Prop("water",800,-400),
		new Prop("water",900,-400),
		new Prop("water",1000,-400),
		new Prop("water",-100,-300),
		new Prop("water",0,-300),
		new Prop("water",100,-300),
		new Prop("water",200,-300),
		new Prop("water",300,-300),
		new Prop("water",400,-300),
		new Prop("water",500,-300),
		new Prop("water",-100,-200),
		new Prop("water",0,-200),
		new Prop("water",100,-200),
		new Prop("water",200,-200),
		new Prop("water",300,-200),
		new Prop("water",400,-200),
		new Prop("water",500,-200),
		new Prop("dirt",800,-200),
		new Prop("dirt",900,-200),
		new Prop("dirt",1000,-200),
		new Prop("water",0,-100),
		new Prop("water",100,-100),
		new Prop("water",200,-100),
		new Prop("water",300,-100),
		new Prop("water",400,-100),
		new Prop("dirt",800,-100),
		new Prop("wkroof1",100,0),
		new Prop("wkroof2",200,0),
		new Prop("wkroof3",300,0),
		new Prop("wkroof4",400,0),
		new Prop("dirt",800,0),
		new Prop("wkroof1",0,100),
		new Prop("wkwall",100,100),
		new Prop("wkwall",200,100),
		new Prop("wkwall",300,100),
		new Prop("wkwall",400,100),
		new Prop("wkroof4",500,100),
		new Prop("dirt",800,100),
		new Prop("wkwall",0,200),
		new Prop("wkwall",100,200),
		new Prop("door1",200,200),
		new Prop("wkwall",300,200),
		new Prop("wkwall",400,200),
		new Prop("wkwall",500,200),
		new Prop("wkwall",600,200),
		new Prop("dirt",800,200),
		new Prop("dirt",200,300),
		new Prop("dirt",800,300),
		new Prop("dirt",200,400),
		new Prop("dirt",300,400),
		new Prop("dirt",400,400),
		new Prop("dirt",500,400),
		new Prop("dirt",600,400),
		new Prop("dirt",700,400),
		new Prop("dirt",800,400),
		new Prop("blank", 1000, 500)
	];
	var forest1 = [
		new Prop("tree1",0,0),
		new Prop("tree1",100,0),
		new Prop("tree1",200,0),
		new Prop("tree1",300,0),
		new Prop("tree1",400,0),
		new Prop("tree1",500,0),
		new Prop("tree1",600,0),
		new Prop("tree1",700,0),
		new Prop("tree1",800,0),
		new Prop("tree1",900,0),
		new Prop("naturedoorh",1000,0),
		new Prop("naturedoorh",1100,0),
		new Prop("tree1",1200,0),
		new Prop("tree1",1300,0),
		new Prop("tree1",1400,0),
		new Prop("tree1",1500,0),
		new Prop("tree1",1600,0),
		new Prop("tree1",1700,0),
		new Prop("tree1",0,100),
		new Prop("tree1",700,100),
		new Prop("tree1",800,100),
		new Prop("tree1",900,100),
		new Prop("tree1",1200,100),
		new Prop("tree1",1600,100),
		new Prop("tree1",1700,100),
		new Prop("tree1",0,200),
		new Prop("tree1",200,200),
		new Prop("tree1",500,200),
		new Prop("tree1",800,200),
		new Prop("tree1",1200,200),
		new Prop("tree1",1600,200),
		new Prop("tree1",1700,200),
		new Prop("tree1",0,300),
		new Prop("tree1",200,300),
		new Prop("tree1",500,300),
		new Prop("tree1",700,300),
		new Prop("tree1",800,300),
		new Prop("tree1",1200,300),
		new Prop("tree1",1300,300),
		new Prop("tree1",1600,300),
		new Prop("tree1",1700,300),
		new Prop("tree1",0,400),
		new Prop("tree1",100,400),
		new Prop("tree1",400,400),
		new Prop("tree1",500,400),
		new Prop("tree1",700,400),
		new Prop("tree1",800,400),
		new Prop("tree1",1600,400),
		new Prop("tree1",1700,400),
		new Prop("tree1",0,500),
		new Prop("tree1",100,500),
		new Prop("tree1",400,500),
		new Prop("tree1",500,500),
		new Prop("tree1",700,500),
		new Prop("tree1",800,500),
		new Prop("tree1",1100,500),
		new Prop("tree1",1200,500),
		new Prop("tree1",1300,500),
		new Prop("tree1",1400,500),
		new Prop("tree1",1500,500),
		new Prop("tree1",1600,500),
		new Prop("tree1",1700,500),
		new Prop("tree1",0,600),
		new Prop("tree1",400,600),
		new Prop("tree1",700,600),
		new Prop("tree1",800,600),
		new Prop("tree1",1100,600),
		new Prop("tree1",1200,600),
		new Prop("tree1",1300,600),
		new Prop("tree1",1400,600),
		new Prop("tree1",1500,600),
		new Prop("tree1",1600,600),
		new Prop("tree1",1700,600),
		new Prop("tree1",0,700),
		new Prop("tree1",100,700),
		new Prop("tree1",200,700),
		new Prop("tree1",300,700),
		new Prop("tree1",400,700),
		new Prop("tree1",700,700),
		new Prop("tree1",1400,700),
		new Prop("tree1",1700,700),
		new Prop("tree1",0,800),
		new Prop("tree1",200,800),
		new Prop("tree1",300,800),
		new Prop("tree1",400,800),
		new Prop("tree1",1700,800),
		new Prop("naturedoorv",0,900),
		new Prop("tree1",900,900),
		new Prop("tree1",1000,900),
		new Prop("tree1",1100,900),
		new Prop("tree1",1200,900),
		new Prop("tree1",1300,900),
		new Prop("tree1",1400,900),
		new Prop("tree1",1700,900),
		new Prop("naturedoorv",0,1000),
		new Prop("tree1",500,1000),
		new Prop("tree1",600,1000),
		new Prop("tree1",1200,1000),
		new Prop("tree1",1700,1000),
		new Prop("tree1",0,1100),
		new Prop("tree1",100,1100),
		new Prop("tree1",500,1100),
		new Prop("tree1",600,1100),
		new Prop("tree1",900,1100),
		new Prop("tree1",1200,1100),
		new Prop("tree1",1300,1100),
		new Prop("tree1",1400,1100),
		new Prop("tree1",1700,1100),
		new Prop("tree1",0,1200),
		new Prop("tree1",100,1200),
		new Prop("tree1",200,1200),
		new Prop("tree1",500,1200),
		new Prop("tree1",900,1200),
		new Prop("tree1",1000,1200),
		new Prop("tree1",1200,1200),
		new Prop("tree1",1600,1200),
		new Prop("tree1",1700,1200),
		new Prop("tree1",0,1300),
		new Prop("tree1",100,1300),
		new Prop("tree1",500,1300),
		new Prop("tree1",900,1300),
		new Prop("tree1",1000,1300),
		new Prop("tree1",1600,1300),
		new Prop("tree1",1700,1300),
		new Prop("tree1",0,1400),
		new Prop("tree1",100,1400),
		new Prop("tree1",200,1400),
		new Prop("tree1",300,1400),
		new Prop("tree1",400,1400),
		new Prop("tree1",500,1400),
		new Prop("tree1",600,1400),
		new Prop("tree1",700,1400),
		new Prop("tree1",800,1400),
		new Prop("tree1",900,1400),
		new Prop("tree1",1000,1400),
		new Prop("tree1",1100,1400),
		new Prop("tree1",1200,1400),
		new Prop("tree1",1300,1400),
		new Prop("naturedoorh",1400,1400),
		new Prop("naturedoorh",1500,1400),
		new Prop("tree1",1600,1400),
		new Prop("tree1",1700,1400)
	];
	var forest2 = [
		new Prop("tree1",0,0),
		new Prop("tree1",100,0),
		new Prop("naturedoorh",200,0),
		new Prop("naturedoorh",300,0),
		new Prop("tree1",400,0),
		new Prop("tree1",500,0),
		new Prop("tree1",600,0),
		new Prop("tree1",700,0),
		new Prop("tree1",800,0),
		new Prop("tree1",900,0),
		new Prop("tree1",1300,0),
		new Prop("tree1",1400,0),
		new Prop("tree1",1500,0),
		new Prop("tree1",1600,0),
		new Prop("tree1",1700,0),
		new Prop("tree1",100,100),
		new Prop("tree1",700,100),
		new Prop("tree1",800,100),
		new Prop("tree1",900,100),
		new Prop("tree1",1000,100),
		new Prop("tree1",1100,100),
		new Prop("tree1",1400,100),
		new Prop("tree1",1500,100),
		new Prop("tree1",1600,100),
		new Prop("tree1",700,200),
		new Prop("tree1",900,200),
		new Prop("tree1",1000,200),
		new Prop("tree1",1200,200),
		new Prop("tree1",1400,200),
		new Prop("tree1",1500,200),
		new Prop("tree1",0,300),
		new Prop("tree1",1700,300),
		new Prop("tree1",0,400),
		new Prop("tree1",1700,400),
		new Prop("tree1",400,500),
		new Prop("tree1",600,500),
		new Prop("tree1",700,500),
		new Prop("tree1",1100,500),
		new Prop("tree1",1200,500),
		new Prop("tree1",1500,500),
		new Prop("tree1",0,600),
		new Prop("tree1",500,600),
		new Prop("tree1",700,600),
		new Prop("tree1",1000,600),
		new Prop("tree1",1100,600),
		new Prop("tree1",1300,600),
		new Prop("tree1",1700,600),
		new Prop("tree1",500,700),
		new Prop("tree1",1100,700),
		new Prop("tree1",1300,700),
		new Prop("tree1",0,800),
		new Prop("tree1",200,800),
		new Prop("tree1",1600,800),
		new Prop("tree1",1700,800),
		new Prop("tree1",1600,900),
		new Prop("tree1",1700,900),
		new Prop("tree1",0,1000),
		new Prop("tree1",500,1000),
		new Prop("tree1",900,1000),
		new Prop("tree1",1200,1000),
		new Prop("tree1",1400,1000),
		new Prop("tree1",1500,1000),
		new Prop("tree1",1600,1000),
		new Prop("tree1",1700,1000),
		new Prop("tree1",300,1100),
		new Prop("tree1",1200,1100),
		new Prop("tree1",1300,1100),
		new Prop("tree1",1600,1100),
		new Prop("tree1",100,1200),
		new Prop("tree1",200,1200),
		new Prop("tree1",300,1200),
		new Prop("tree1",400,1200),
		new Prop("tree1",500,1200),
		new Prop("tree1",700,1200),
		new Prop("tree1",1100,1200),
		new Prop("tree1",200,1300),
		new Prop("tree1",300,1300),
		new Prop("tree1",400,1300),
		new Prop("tree1",900,1300),
		new Prop("tree1",1400,1300),
		new Prop("tree1",1600,1300),
		new Prop("tree1",0,1400),
		new Prop("tree1",100,1400),
		new Prop("tree1",800,1400),
		new Prop("tree1",900,1400),
		new Prop("tree1",1200,1400),
		new Prop("tree1",1300,1400),
		new Prop("tree1",1400,1400),
		new Prop("tree1",1500,1400),
		new Prop("blank",1700,1400)
	];
	var forest3 = [
		new Prop("tree1",0,0),
		new Prop("tree1",100,0),
		new Prop("tree1",800,0),
		new Prop("tree1",900,0),
		new Prop("tree1",1000,0),
		new Prop("tree1",1100,0),
		new Prop("tree1",1300,0),
		new Prop("tree1",1500,0),
		new Prop("tree1",1700,0),
		new Prop("tree1",300,100),
		new Prop("tree1",1000,100),
		new Prop("tree1",1100,100),
		new Prop("tree1",1200,100),
		new Prop("tree1",1300,100),
		new Prop("tree1",1400,100),
		new Prop("tree1",1600,100),
		new Prop("tree1",1700,100),
		new Prop("tree1",200,200),
		new Prop("tree1",300,200),
		new Prop("tree1",400,200),
		new Prop("tree1",600,200),
		new Prop("tree1",700,200),
		new Prop("tree1",800,200),
		new Prop("tree1",1400,200),
		new Prop("tree1",1500,200),
		new Prop("tree1",1600,200),
		new Prop("tree1",100,300),
		new Prop("tree1",200,300),
		new Prop("tree1",300,300),
		new Prop("tree1",400,300),
		new Prop("tree1",500,300),
		new Prop("tree1",1000,300),
		new Prop("tree1",1100,300),
		new Prop("tree1",1200,300),
		new Prop("naturedoorv",1700,300),
		new Prop("tree1",500,400),
		new Prop("tree1",600,400),
		new Prop("tree1",900,400),
		new Prop("tree1",1000,400),
		new Prop("tree1",1200,400),
		new Prop("tree1",1300,400),
		new Prop("tree1",1700,400),
		new Prop("tree1",0,500),
		new Prop("tree1",100,500),
		new Prop("tree1",1600,500),
		new Prop("tree1",0,600),
		new Prop("tree1",100,600),
		new Prop("tree1",200,600),
		new Prop("tree1",400,600),
		new Prop("tree1",1000,600),
		new Prop("tree1",1100,600),
		new Prop("tree1",1300,600),
		new Prop("tree1",1400,600),
		new Prop("tree1",1500,600),
		new Prop("tree1",200,700),
		new Prop("tree1",300,700),
		new Prop("tree1",400,700),
		new Prop("tree1",500,700),
		new Prop("tree1",800,700),
		new Prop("tree1",1100,700),
		new Prop("tree1",1700,700),
		new Prop("naturedoorv",0,800),
		new Prop("tree1",700,800),
		new Prop("tree1",800,800),
		new Prop("tree1",1100,800),
		new Prop("tree1",1700,800),
		new Prop("tree1",200,900),
		new Prop("tree1",300,900),
		new Prop("tree1",400,900),
		new Prop("tree1",500,900),
		new Prop("tree1",600,900),
		new Prop("tree1",700,900),
		new Prop("tree1",800,900),
		new Prop("tree1",1300,900),
		new Prop("tree1",1400,900),
		new Prop("tree1",0,1000),
		new Prop("tree1",500,1000),
		new Prop("tree1",600,1000),
		new Prop("tree1",700,1000),
		new Prop("tree1",1000,1000),
		new Prop("tree1",1400,1000),
		new Prop("tree1",1500,1000),
		new Prop("tree1",0,1100),
		new Prop("tree1",200,1100),
		new Prop("tree1",600,1100),
		new Prop("tree1",900,1100),
		new Prop("tree1",1000,1100),
		new Prop("tree1",1100,1100),
		new Prop("tree1",1200,1100),
		new Prop("tree1",1500,1100),
		new Prop("tree1",1600,1100),
		new Prop("tree1",0,1200),
		new Prop("tree1",100,1200),
		new Prop("tree1",200,1200),
		new Prop("tree1",300,1200),
		new Prop("tree1",400,1200),
		new Prop("tree1",600,1200),
		new Prop("tree1",900,1200),
		new Prop("tree1",1500,1200),
		new Prop("tree1",1600,1200),
		new Prop("tree1",0,1300),
		new Prop("tree1",100,1300),
		new Prop("tree1",200,1300),
		new Prop("tree1",800,1300),
		new Prop("tree1",1200,1300),
		new Prop("tree1",1300,1300),
		new Prop("tree1",1400,1300),
		new Prop("tree1",0,1400),
		new Prop("tree1",100,1400),
		new Prop("tree1",200,1400),
		new Prop("naturedoorh",300,1400),
		new Prop("tree1",400,1400),
		new Prop("tree1",500,1400),
		new Prop("tree1",600,1400),
		new Prop("tree1",700,1400),
		new Prop("tree1",1000,1400),
		new Prop("tree1",1300,1400),
		new Prop("tree1",1400,1400),
		new Prop("tree1",1500,1400),
		new Prop("naturedoorh",1600,1400),
		new Prop("tree1",1700,1400)
	];
	var field1 = [
		new Prop("tree1",0,0),
		new Prop("tree1",100,0),
		new Prop("tree1",300,0),
		new Prop("tree1",500,0),
		new Prop("tree1",1300,0),
		new Prop("tree1",2400,0),
		new Prop("tree1",2600,0),
		new Prop("tree1",3200,0),
		new Prop("tree1",3500,0),
		new Prop("tree1",3800,0),
		new Prop("tree1",3900,0),
		new Prop("tree1",4000,0),
		new Prop("tree1",4200,0),
		new Prop("naturedoorh",4300,0),
		new Prop("tree1",4500,0),
		new Prop("tree1",4700,0),
		new Prop("tree1",4900,0),
		new Prop("tree1",0,100),
		new Prop("tree1",200,100),
		new Prop("tree1",1000,100),
		new Prop("tree1",1700,100),
		new Prop("tree1",3700,100),
		new Prop("tree1",4000,100),
		new Prop("dirt",4300,100),
		new Prop("tree1",4800,100),
		new Prop("tree1",4900,100),
		new Prop("grass",0,200),
		new Prop("grass",100,200),
		new Prop("grass",200,200),
		new Prop("grass",300,200),
		new Prop("grass",400,200),
		new Prop("grass",500,200),
		new Prop("grass",600,200),
		new Prop("grass",700,200),
		new Prop("grass",800,200),
		new Prop("grass",900,200),
		new Prop("grass",1000,200),
		new Prop("grass",1100,200),
		new Prop("grass",1200,200),
		new Prop("grass",1300,200),
		new Prop("grass",1400,200),
		new Prop("grass",1500,200),
		new Prop("grass",1600,200),
		new Prop("grass",1700,200),
		new Prop("grass",1800,200),
		new Prop("grass",1900,200),
		new Prop("grass",2000,200),
		new Prop("grass",2100,200),
		new Prop("grass",2200,200),
		new Prop("grass",2300,200),
		new Prop("grass",2400,200),
		new Prop("grass",2500,200),
		new Prop("grass",2600,200),
		new Prop("grass",2700,200),
		new Prop("grass",2800,200),
		new Prop("grass",2900,200),
		new Prop("grass",3000,200),
		new Prop("grass",3100,200),
		new Prop("grass",3200,200),
		new Prop("grass",3300,200),
		new Prop("grass",3400,200),
		new Prop("grass",3500,200),
		new Prop("grass",3600,200),
		new Prop("tree1",3900,200),
		new Prop("dirt",4300,200),
		new Prop("tree1",4600,200),
		new Prop("tree1",4800,200),
		new Prop("grass",0,300),
		new Prop("grass",100,300),
		new Prop("grass",200,300),
		new Prop("grass",300,300),
		new Prop("grass",400,300),
		new Prop("grass",500,300),
		new Prop("grass",600,300),
		new Prop("grass",700,300),
		new Prop("grass",800,300),
		new Prop("grass",900,300),
		new Prop("grass",1000,300),
		new Prop("grass",1100,300),
		new Prop("grass",1200,300),
		new Prop("grass",1300,300),
		new Prop("grass",1400,300),
		new Prop("grass",1500,300),
		new Prop("grass",1600,300),
		new Prop("grass",1700,300),
		new Prop("grass",1800,300),
		new Prop("grass",1900,300),
		new Prop("grass",2000,300),
		new Prop("grass",2100,300),
		new Prop("grass",2200,300),
		new Prop("grass",2300,300),
		new Prop("grass",2400,300),
		new Prop("grass",2500,300),
		new Prop("grass",2600,300),
		new Prop("grass",2700,300),
		new Prop("grass",2800,300),
		new Prop("grass",2900,300),
		new Prop("grass",3000,300),
		new Prop("grass",3100,300),
		new Prop("grass",3200,300),
		new Prop("grass",3300,300),
		new Prop("grass",3400,300),
		new Prop("grass",3500,300),
		new Prop("grass",3600,300),
		new Prop("dirt",4300,300),
		new Prop("tree1",4900,300),
		new Prop("dirt",0,400),
		new Prop("naturedoorv",0,400),
		new Prop("dirt",100,400),
		new Prop("dirt",200,400),
		new Prop("dirt",300,400),
		new Prop("dirt",400,400),
		new Prop("dirt",500,400),
		new Prop("dirt",600,400),
		new Prop("dirt",700,400),
		new Prop("dirt",800,400),
		new Prop("dirt",900,400),
		new Prop("dirt",1000,400),
		new Prop("dirt",1100,400),
		new Prop("dirt",1200,400),
		new Prop("dirt",1300,400),
		new Prop("dirt",1400,400),
		new Prop("dirt",1500,400),
		new Prop("dirt",1600,400),
		new Prop("dirt",1700,400),
		new Prop("dirt",1800,400),
		new Prop("dirt",1900,400),
		new Prop("dirt",2000,400),
		new Prop("dirt",2100,400),
		new Prop("dirt",2200,400),
		new Prop("dirt",2300,400),
		new Prop("dirt",2400,400),
		new Prop("dirt",2500,400),
		new Prop("dirt",2600,400),
		new Prop("dirt",2700,400),
		new Prop("dirt",2800,400),
		new Prop("dirt",2900,400),
		new Prop("dirt",3000,400),
		new Prop("dirt",3100,400),
		new Prop("dirt",3200,400),
		new Prop("dirttr",3300,400),
		new Prop("grass",3500,400),
		new Prop("grass",3600,400),
		new Prop("grass",3700,400),
		new Prop("grass",3800,400),
		new Prop("grass",3900,400),
		new Prop("grass",4000,400),
		new Prop("grass",4100,400),
		new Prop("dirt",4300,400),
		new Prop("tree1",4700,400),
		new Prop("tree2",500,500),
		new Prop("tree1",2500,500),
		new Prop("dirt",3300,500),
		new Prop("grass",3600,500),
		new Prop("grass",3700,500),
		new Prop("grass",3800,500),
		new Prop("grass",3900,500),
		new Prop("grass",4000,500),
		new Prop("grass",4100,500),
		new Prop("dirt",4300,500),
		new Prop("tree2",4500,500),
		new Prop("tree1",0,600),
		new Prop("tree1",400,600),
		new Prop("tree1",1100,600),
		new Prop("grass",1300,600),
		new Prop("grass",1400,600),
		new Prop("grass",1500,600),
		new Prop("grass",1600,600),
		new Prop("grass",1700,600),
		new Prop("grass",1800,600),
		new Prop("grass",1900,600),
		new Prop("grass",2000,600),
		new Prop("grass",2100,600),
		new Prop("grass",2200,600),
		new Prop("grass",2300,600),
		new Prop("grass",2400,600),
		new Prop("grass",2500,600),
		new Prop("grass",2600,600),
		new Prop("grass",2700,600),
		new Prop("grass",2800,600),
		new Prop("grass",2900,600),
		new Prop("grass",3000,600),
		new Prop("grass",3100,600),
		new Prop("dirt",3300,600),
		new Prop("sign1",3400,600),
		new Prop("dirt",4300,600),
		new Prop("tree2",4900,600),
		new Prop("grass",1300,700),
		new Prop("tree2",1400,700),
		new Prop("grass",1500,700),
		new Prop("grass",1600,700),
		new Prop("grass",1700,700),
		new Prop("grass",1800,700),
		new Prop("grass",1900,700),
		new Prop("grass",2000,700),
		new Prop("tree1",2100,700),
		new Prop("grass",2200,700),
		new Prop("grass",2300,700),
		new Prop("grass",2400,700),
		new Prop("grass",2500,700),
		new Prop("grass",2600,700),
		new Prop("grass",2700,700),
		new Prop("grass",2800,700),
		new Prop("grass",2900,700),
		new Prop("grass",3000,700),
		new Prop("grass",3100,700),
		new Prop("dirt",3300,700),
		new Prop("dirt",3400,700),
		new Prop("dirt",3500,700),
		new Prop("dirt",3600,700),
		new Prop("dirt",3700,700),
		new Prop("dirt",3800,700),
		new Prop("dirt",3900,700),
		new Prop("dirt",4000,700),
		new Prop("dirt",4100,700),
		new Prop("dirt",4200,700),
		new Prop("dirtbr",4300,700),
		new Prop("tree1",4400,700),
		new Prop("water",0,800),
		new Prop("water",100,800),
		new Prop("water",200,800),
		new Prop("water",300,800),
		new Prop("water",400,800),
		new Prop("water",500,800),
		new Prop("watertr",600,800),
		new Prop("tree1",800,800),
		new Prop("grass",1300,800),
		new Prop("grass",1400,800),
		new Prop("grass",1500,800),
		new Prop("grass",1600,800),
		new Prop("grass",1700,800),
		new Prop("grass",1800,800),
		new Prop("grass",1900,800),
		new Prop("grass",2000,800),
		new Prop("grass",2100,800),
		new Prop("grass",2200,800),
		new Prop("grass",2300,800),
		new Prop("grass",2400,800),
		new Prop("grass",2500,800),
		new Prop("grass",2600,800),
		new Prop("grass",2700,800),
		new Prop("grass",2800,800),
		new Prop("grass",2900,800),
		new Prop("grass",3000,800),
		new Prop("grass",3100,800),
		new Prop("dirt",3300,800),
		new Prop("water",0,900),
		new Prop("water",100,900),
		new Prop("water",200,900),
		new Prop("water",300,900),
		new Prop("water",400,900),
		new Prop("water",500,900),
		new Prop("water",600,900),
		new Prop("grass",1300,900),
		new Prop("grass",1400,900),
		new Prop("grass",1500,900),
		new Prop("grass",1600,900),
		new Prop("grass",1700,900),
		new Prop("grass",1800,900),
		new Prop("grass",1900,900),
		new Prop("grass",2000,900),
		new Prop("grass",2100,900),
		new Prop("grass",2200,900),
		new Prop("grass",2300,900),
		new Prop("grass",2400,900),
		new Prop("grass",2500,900),
		new Prop("grass",2600,900),
		new Prop("grass",2700,900),
		new Prop("grass",2800,900),
		new Prop("grass",2900,900),
		new Prop("grass",3000,900),
		new Prop("grass",3100,900),
		new Prop("dirt",3300,900),
		new Prop("tree2",4800,900),
		new Prop("water",0,1000),
		new Prop("water",100,1000),
		new Prop("water",200,1000),
		new Prop("water",300,1000),
		new Prop("water",400,1000),
		new Prop("water",500,1000),
		new Prop("water",600,1000),
		new Prop("grass",1300,1000),
		new Prop("grass",1400,1000),
		new Prop("grass",1500,1000),
		new Prop("grass",1600,1000),
		new Prop("grass",1700,1000),
		new Prop("grass",1800,1000),
		new Prop("grass",1900,1000),
		new Prop("grass",2000,1000),
		new Prop("grass",2100,1000),
		new Prop("grass",2200,1000),
		new Prop("grass",2300,1000),
		new Prop("grass",2400,1000),
		new Prop("grass",2500,1000),
		new Prop("grass",2600,1000),
		new Prop("grass",2700,1000),
		new Prop("grass",2800,1000),
		new Prop("grass",2900,1000),
		new Prop("grass",3000,1000),
		new Prop("grass",3100,1000),
		new Prop("dirt",3300,1000),
		new Prop("tree1",4400,1000),
		new Prop("water",0,1100),
		new Prop("water",100,1100),
		new Prop("water",200,1100),
		new Prop("water",300,1100),
		new Prop("water",400,1100),
		new Prop("water",500,1100),
		new Prop("water",600,1100),
		new Prop("water",700,1100),
		new Prop("grass",1300,1100),
		new Prop("grass",1400,1100),
		new Prop("grass",1500,1100),
		new Prop("grass",1600,1100),
		new Prop("grass",1700,1100),
		new Prop("grass",1800,1100),
		new Prop("grass",1900,1100),
		new Prop("grass",2000,1100),
		new Prop("grass",2100,1100),
		new Prop("grass",2200,1100),
		new Prop("grass",2300,1100),
		new Prop("grass",2400,1100),
		new Prop("grass",2500,1100),
		new Prop("grass",2600,1100),
		new Prop("grass",2700,1100),
		new Prop("grass",2800,1100),
		new Prop("grass",2900,1100),
		new Prop("grass",3000,1100),
		new Prop("grass",3100,1100),
		new Prop("dirt",3300,1100),
		new Prop("tree2",3800,1100),
		new Prop("tree1",4600,1100),
		new Prop("water",0,1200),
		new Prop("water",100,1200),
		new Prop("water",200,1200),
		new Prop("water",300,1200),
		new Prop("water",400,1200),
		new Prop("water",500,1200),
		new Prop("water",600,1200),
		new Prop("water",700,1200),
		new Prop("water",800,1200),
		new Prop("dockpole", 800, 1200),
		new Prop("water",900,1200),
		new Prop("water",1000,1200),
		new Prop("grass",1500,1200),
		new Prop("grass",1600,1200),
		new Prop("grass",1700,1200),
		new Prop("tree1",3100,1200),
		new Prop("dirt",3300,1200),
		new Prop("tree2",3700,1200),
		new Prop("tree1",4800,1200),
		new Prop("water",0,1300),
		new Prop("water",100,1300),
		new Prop("water",200,1300),
		new Prop("water",300,1300),
		new Prop("water",400,1300),
		new Prop("water",500,1300),
		new Prop("water",600,1300),
		new Prop("water",700,1300),
		new Prop("dockt",800,1300),
		new Prop("dockt",900,1300),
		new Prop("dockt",1000,1300),
		new Prop("dockt",1100,1300),
		new Prop("grass",1500,1300),
		new Prop("grass",1600,1300),
		new Prop("grass",1700,1300),
		new Prop("dirttl",1900,1300),
		new Prop("dirt",2000,1300),
		new Prop("dirt",2100,1300),
		new Prop("dirt",2200,1300),
		new Prop("dirt",2300,1300),
		new Prop("dirt",2400,1300),
		new Prop("dirt",2500,1300),
		new Prop("dirt",2600,1300),
		new Prop("dirt",2700,1300),
		new Prop("dirt",2800,1300),
		new Prop("dirt",2900,1300),
		new Prop("dirt",3000,1300),
		new Prop("dirt",3100,1300),
		new Prop("dirt",3200,1300),
		new Prop("dirt",3300,1300),
		new Prop("flowers1",4100,1300),
		new Prop("flowers1",4200,1300),
		new Prop("flowers1",4300,1300),
		new Prop("water",0,1400),
		new Prop("water",100,1400),
		new Prop("water",200,1400),
		new Prop("water",300,1400),
		new Prop("water",400,1400),
		new Prop("water",500,1400),
		new Prop("water",600,1400),
		new Prop("water",700,1400),
		new Prop("dockb",800,1400),
		new Prop("dockb",900,1400),
		new Prop("dockb",1000,1400),
		new Prop("dockb",1100,1400),
		new Prop("grass",1500,1400),
		new Prop("grass",1600,1400),
		new Prop("grass",1700,1400),
		new Prop("dirt",1900,1400),
		new Prop("dirt",3300,1400),
		new Prop("tree1",3500,1400),
		new Prop("tree1",3700,1400),
		new Prop("flowers1",4100,1400),
		new Prop("flowers1",4200,1400),
		new Prop("flowers1",4300,1400),
		new Prop("flowers1",4400,1400),
		new Prop("flowers1",4500,1400),
		new Prop("flowers1",4600,1400),
		new Prop("flowers1",4700,1400),
		new Prop("flowers1",4800,1400),
		new Prop("water",0,1500),
		new Prop("water",100,1500),
		new Prop("water",200,1500),
		new Prop("water",300,1500),
		new Prop("water",400,1500),
		new Prop("water",500,1500),
		new Prop("water",600,1500),
		new Prop("water",700,1500),
		new Prop("water",800,1500),
		new Prop("water",900,1500),
		new Prop("waterbr",1000,1500),
		new Prop("grass",1500,1500),
		new Prop("grass",1600,1500),
		new Prop("grass",1700,1500),
		new Prop("dirt",1900,1500),
		new Prop("tree2",2100,1500),
		new Prop("tree1",2400,1500),
		new Prop("tree1",2600,1500),
		new Prop("tree1",2800,1500),
		new Prop("dirt",3300,1500),
		new Prop("tree1",3600,1500),
		new Prop("tree1",3700,1500),
		new Prop("flowers1",3900,1500),
		new Prop("flowers1",4000,1500),
		new Prop("flowers1",4100,1500),
		new Prop("flowers1",4200,1500),
		new Prop("flowers1",4300,1500),
		new Prop("flowers1",4400,1500),
		new Prop("flowers1",4500,1500),
		new Prop("flowers1",4600,1500),
		new Prop("flowers1",4700,1500),
		new Prop("water",0,1600),
		new Prop("water",100,1600),
		new Prop("water",200,1600),
		new Prop("water",300,1600),
		new Prop("water",400,1600),
		new Prop("water",500,1600),
		new Prop("water",600,1600),
		new Prop("water",700,1600),
		new Prop("water",800,1600),
		new Prop("water",900,1600),
		new Prop("grass",1500,1600),
		new Prop("grass",1600,1600),
		new Prop("grass",1700,1600),
		new Prop("dirt",1900,1600),
		new Prop("tree1",2300,1600),
		new Prop("tree1",2400,1600),
		new Prop("tree1",2600,1600),
		new Prop("tree1",2900,1600),
		new Prop("dirt",3300,1600),
		new Prop("tree2",3500,1600),
		new Prop("flowers1",3900,1600),
		new Prop("flowers1",4000,1600),
		new Prop("flowers1",4100,1600),
		new Prop("flowers1",4200,1600),
		new Prop("flowers1",4300,1600),
		new Prop("flowers1",4400,1600),
		new Prop("flowers1",4500,1600),
		new Prop("flowers1",4600,1600),
		new Prop("flowers1",4700,1600),
		new Prop("water",0,1700),
		new Prop("water",100,1700),
		new Prop("water",200,1700),
		new Prop("water",300,1700),
		new Prop("water",400,1700),
		new Prop("water",500,1700),
		new Prop("water",600,1700),
		new Prop("water",700,1700),
		new Prop("water",800,1700),
		new Prop("water",900,1700),
		new Prop("grass",1500,1700),
		new Prop("grass",1600,1700),
		new Prop("grass",1700,1700),
		new Prop("dirt",1900,1700),
		new Prop("tree1",2200,1700),
		new Prop("dirt",3300,1700),
		new Prop("flowers1",4200,1700),
		new Prop("flowers1",4300,1700),
		new Prop("flowers1",4400,1700),
		new Prop("flowers1",4500,1700),
		new Prop("water",0,1800),
		new Prop("water",100,1800),
		new Prop("water",200,1800),
		new Prop("water",300,1800),
		new Prop("water",400,1800),
		new Prop("water",500,1800),
		new Prop("water",600,1800),
		new Prop("water",700,1800),
		new Prop("water",800,1800),
		new Prop("waterbr",900,1800),
		new Prop("grass",1500,1800),
		new Prop("grass",1600,1800),
		new Prop("grass",1700,1800),
		new Prop("dirt",1900,1800),
		new Prop("tree1",2500,1800),
		new Prop("tree2",2700,1800),
		new Prop("dirt",3300,1800),
		new Prop("tree1",4700,1800),
		new Prop("water",0,1900),
		new Prop("water",100,1900),
		new Prop("water",200,1900),
		new Prop("water",300,1900),
		new Prop("water",400,1900),
		new Prop("grass",1200,1900),
		new Prop("grass",1300,1900),
		new Prop("grass",1400,1900),
		new Prop("grass",1500,1900),
		new Prop("grass",1600,1900),
		new Prop("grass",1700,1900),
		new Prop("dirt",1900,1900),
		new Prop("tree1",2900,1900),
		new Prop("dirt",3300,1900),
		new Prop("tree1",4300,1900),
		new Prop("tree2",4400,1900),
		new Prop("tree1",4500,1900),
		new Prop("tree1",4900,1900),
		new Prop("water",0,2000),
		new Prop("water",100,2000),
		new Prop("water",200,2000),
		new Prop("water",300,2000),
		new Prop("waterbr",400,2000),
		new Prop("grass",1200,2000),
		new Prop("grass",1300,2000),
		new Prop("grass",1400,2000),
		new Prop("grass",1500,2000),
		new Prop("grass",1600,2000),
		new Prop("grass",1700,2000),
		new Prop("dirt",1900,2000),
		new Prop("tree1",2100,2000),
		new Prop("tree1",2300,2000),
		new Prop("tree1",2500,2000),
		new Prop("dirt",3300,2000),
		new Prop("tree1",3900,2000),
		new Prop("tree1",4100,2000),
		new Prop("tree1",4400,2000),
		new Prop("tree1",600,2100),
		new Prop("grass",1200,2100),
		new Prop("grass",1300,2100),
		new Prop("grass",1400,2100),
		new Prop("grass",1500,2100),
		new Prop("grass",1600,2100),
		new Prop("grass",1700,2100),
		new Prop("dirt",1900,2100),
		new Prop("tree1",3000,2100),
		new Prop("dirt",3300,2100),
		new Prop("tree1",4300,2100),
		new Prop("tree2",4900,2100),
		new Prop("tree1",100,2200),
		new Prop("tree1",900,2200),
		new Prop("grass",1200,2200),
		new Prop("grass",1300,2200),
		new Prop("grass",1400,2200),
		new Prop("grass",1500,2200),
		new Prop("grass",1600,2200),
		new Prop("grass",1700,2200),
		new Prop("dirt",2000,2200),
		new Prop("dirt",3300,2200),
		new Prop("tree1",0,2300),
		new Prop("tree1",300,2300),
		new Prop("grass",1200,2300),
		new Prop("grass",1300,2300),
		new Prop("grass",1400,2300),
		new Prop("grass",1500,2300),
		new Prop("grass",1600,2300),
		new Prop("grass",1700,2300),
		new Prop("dirt",1900,2300),
		new Prop("dirt",3300,2300),
		new Prop("dirt",3400,2300),
		new Prop("dirt",3500,2300),
		new Prop("dirt",3600,2300),
		new Prop("dirt",3700,2300),
		new Prop("dirt",3800,2300),
		new Prop("dirt",3900,2300),
		new Prop("dirt",4000,2300),
		new Prop("dirt",4100,2300),
		new Prop("dirt",4200,2300),
		new Prop("dirt",4300,2300),
		new Prop("dirt",4400,2300),
		new Prop("dirt",4500,2300),
		new Prop("dirt",4600,2300),
		new Prop("dirt",4700,2300),
		new Prop("dirt",4800,2300),
		new Prop("dirt",4900,2300),
		new Prop("naturedoorv",4900,2300),
		new Prop("tree1",0,2400),
		new Prop("tree2",100,2400),
		new Prop("tree1",200,2400),
		new Prop("grass",1200,2400),
		new Prop("grass",1300,2400),
		new Prop("grass",1400,2400),
		new Prop("grass",1500,2400),
		new Prop("grass",1600,2400),
		new Prop("grass",1700,2400),
		new Prop("dirt",2000,2400),
		new Prop("tree1",2300,2400),
		new Prop("tree1",2900,2400),
		new Prop("sign1",3800,2400),
		new Prop("dirt",3900,2400),
		new Prop("tree1",4300,2400),
		new Prop("tree1",4500,2400),
		new Prop("tree1",0,2500),
		new Prop("tree1",200,2500),
		new Prop("grass",1200,2500),
		new Prop("grass",1300,2500),
		new Prop("grass",1400,2500),
		new Prop("grass",1500,2500),
		new Prop("grass",1600,2500),
		new Prop("grass",1700,2500),
		new Prop("dirt",1900,2500),
		new Prop("tree1",3500,2500),
		new Prop("tree1",3700,2500),
		new Prop("dirt",3900,2500),
		new Prop("tree1",4200,2500),
		new Prop("tree1",4300,2500),
		new Prop("tree1",4700,2500),
		new Prop("tree1",4900,2500),
		new Prop("tree1",0,2600),
		new Prop("tree1",100,2600),
		new Prop("tree1",400,2600),
		new Prop("grass",1200,2600),
		new Prop("grass",1300,2600),
		new Prop("grass",1400,2600),
		new Prop("grass",1500,2600),
		new Prop("grass",1600,2600),
		new Prop("grass",1700,2600),
		new Prop("dirt",1900,2600),
		new Prop("tree1",3200,2600),
		new Prop("tree1",3500,2600),
		new Prop("dirt",3900,2600),
		new Prop("tree1",4400,2600),
		new Prop("tree1",4800,2600),
		new Prop("tree1",100,2700),
		new Prop("tree1",300,2700),
		new Prop("grass",1200,2700),
		new Prop("grass",1300,2700),
		new Prop("grass",1400,2700),
		new Prop("grass",1500,2700),
		new Prop("grass",1600,2700),
		new Prop("grass",1700,2700),
		new Prop("dirt",1900,2700),
		new Prop("tree1",2600,2700),
		new Prop("tree2",3700,2700),
		new Prop("dirt",3900,2700),
		new Prop("tree1",4200,2700),
		new Prop("tree1",0,2800),
		new Prop("tree1",100,2800),
		new Prop("tree1",800,2800),
		new Prop("grass",1200,2800),
		new Prop("grass",1300,2800),
		new Prop("grass",1400,2800),
		new Prop("grass",1500,2800),
		new Prop("grass",1600,2800),
		new Prop("grass",1700,2800),
		new Prop("dirt",1900,2800),
		new Prop("dirt",3900,2800),
		new Prop("tree1",4400,2800),
		new Prop("tree1",4600,2800),
		new Prop("tree1",0,2900),
		new Prop("tree1",200,2900),
		new Prop("tree1",400,2900),
		new Prop("dirt",1900,2900),
		new Prop("tree2",2900,2900),
		new Prop("dirt",3900,2900),
		new Prop("tree1",4100,2900),
		new Prop("dirt",0,3000),
		new Prop("naturedoorv",0,3000),
		new Prop("dirt",100,3000),
		new Prop("dirt",200,3000),
		new Prop("dirt",300,3000),
		new Prop("dirt",400,3000),
		new Prop("dirt",500,3000),
		new Prop("dirt",600,3000),
		new Prop("dirt",700,3000),
		new Prop("dirt",800,3000),
		new Prop("dirt",900,3000),
		new Prop("dirt",1000,3000),
		new Prop("dirt",1100,3000),
		new Prop("dirt",1200,3000),
		new Prop("dirt",1300,3000),
		new Prop("dirt",1400,3000),
		new Prop("dirt",1500,3000),
		new Prop("dirt",1600,3000),
		new Prop("dirt",1700,3000),
		new Prop("dirt",1800,3000),
		new Prop("dirt",1900,3000),
		new Prop("tree1",2200,3000),
		new Prop("dirt",3900,3000),
		new Prop("grass",4700,3000),
		new Prop("sign1",300,3100),
		new Prop("dirt",400,3100),
		new Prop("tree1",500,3100),
		new Prop("tree1",800,3100),
		new Prop("tree1",1100,3100),
		new Prop("flowers3",3100,3100),
		new Prop("flowers3",3200,3100),
		new Prop("flowers3",3300,3100),
		new Prop("dirt",3900,3100),
		new Prop("grass",4700,3100),
		new Prop("grass",0,3200),
		new Prop("tree1",200,3200),
		new Prop("dirt",400,3200),
		new Prop("tree2",700,3200),
		new Prop("flowers3",3100,3200),
		new Prop("flowers3",3200,3200),
		new Prop("flowers3",3300,3200),
		new Prop("tree2",3400,3200),
		new Prop("tree2",3700,3200),
		new Prop("dirt",3900,3200),
		new Prop("grass",4500,3200),
		new Prop("grass",4700,3200),
		new Prop("grass",0,3300),
		new Prop("grass",100,3300),
		new Prop("grass",200,3300),
		new Prop("dirt",400,3300),
		new Prop("flowers3",600,3300),
		new Prop("flowers3",700,3300),
		new Prop("flowers3",800,3300),
		new Prop("flowers3",900,3300),
		new Prop("flowers3",1000,3300),
		new Prop("flowers3",1100,3300),
		new Prop("flowers3",1200,3300),
		new Prop("flowers3",1300,3300),
		new Prop("flowers3",1400,3300),
		new Prop("flowers3",1500,3300),
		new Prop("flowers3",1600,3300),
		new Prop("flowers3",1700,3300),
		new Prop("flowers3",1800,3300),
		new Prop("flowers3",1900,3300),
		new Prop("flowers3",2000,3300),
		new Prop("flowers3",3100,3300),
		new Prop("flowers3",3200,3300),
		new Prop("flowers3",3300,3300),
		new Prop("dirt",3900,3300),
		new Prop("grass",4200,3300),
		new Prop("grass",4300,3300),
		new Prop("grass",4400,3300),
		new Prop("grass",4500,3300),
		new Prop("grass",4600,3300),
		new Prop("grass",4700,3300),
		new Prop("grass",0,3400),
		new Prop("grass",100,3400),
		new Prop("grass",200,3400),
		new Prop("dirt",400,3400),
		new Prop("flowers3",600,3400),
		new Prop("flowers3",700,3400),
		new Prop("flowers3",800,3400),
		new Prop("tree2",900,3400),
		new Prop("flowers3",1000,3400),
		new Prop("flowers3",1100,3400),
		new Prop("flowers3",1200,3400),
		new Prop("flowers3",1300,3400),
		new Prop("flowers3",1400,3400),
		new Prop("flowers3",1500,3400),
		new Prop("flowers3",1600,3400),
		new Prop("flowers3",1700,3400),
		new Prop("flowers3",1800,3400),
		new Prop("flowers3",1900,3400),
		new Prop("flowers3",2000,3400),
		new Prop("dirt",3900,3400),
		new Prop("grass",4200,3400),
		new Prop("grass",4300,3400),
		new Prop("grass",4400,3400),
		new Prop("grass",4500,3400),
		new Prop("grass",4600,3400),
		new Prop("grass",4700,3400),
		new Prop("tree1",4900,3400),
		new Prop("grass",0,3500),
		new Prop("dirt",400,3500),
		new Prop("flowers3",600,3500),
		new Prop("flowers3",700,3500),
		new Prop("tree1",800,3500),
		new Prop("flowers3",900,3500),
		new Prop("flowers3",1000,3500),
		new Prop("flowers3",1100,3500),
		new Prop("flowers3",1200,3500),
		new Prop("tree1",1300,3500),
		new Prop("flowers3",1400,3500),
		new Prop("flowers3",1500,3500),
		new Prop("flowers3",1600,3500),
		new Prop("flowers3",1700,3500),
		new Prop("flowers3",1800,3500),
		new Prop("flowers3",1900,3500),
		new Prop("flowers3",2000,3500),
		new Prop("flowers3",2400,3500),
		new Prop("flowers3",2500,3500),
		new Prop("flowers3",2600,3500),
		new Prop("flowers3",2700,3500),
		new Prop("flowers3",2800,3500),
		new Prop("dirt",3900,3500),
		new Prop("grass",4200,3500),
		new Prop("grass",4300,3500),
		new Prop("grass",4400,3500),
		new Prop("grass",4500,3500),
		new Prop("grass",4600,3500),
		new Prop("grass",4700,3500),
		new Prop("grass",0,3600),
		new Prop("dirt",400,3600),
		new Prop("flowers3",600,3600),
		new Prop("flowers3",700,3600),
		new Prop("flowers3",800,3600),
		new Prop("flowers3",900,3600),
		new Prop("flowers3",1000,3600),
		new Prop("flowers3",1100,3600),
		new Prop("flowers3",1200,3600),
		new Prop("flowers3",1300,3600),
		new Prop("flowers3",1400,3600),
		new Prop("flowers3",1500,3600),
		new Prop("flowers3",1600,3600),
		new Prop("flowers3",1700,3600),
		new Prop("flowers3",1800,3600),
		new Prop("flowers3",1900,3600),
		new Prop("flowers3",2000,3600),
		new Prop("tree1",2200,3600),
		new Prop("flowers3",2400,3600),
		new Prop("tree1",2500,3600),
		new Prop("flowers3",2600,3600),
		new Prop("flowers3",2700,3600),
		new Prop("flowers3",2800,3600),
		new Prop("tree1",3700,3600),
		new Prop("dirt",3900,3600),
		new Prop("grass",4200,3600),
		new Prop("grass",4300,3600),
		new Prop("grass",4400,3600),
		new Prop("grass",4500,3600),
		new Prop("grass",4600,3600),
		new Prop("grass",4700,3600),
		new Prop("grass",0,3700),
		new Prop("dirt",400,3700),
		new Prop("tree1",500,3700),
		new Prop("flowers3",600,3700),
		new Prop("flowers3",700,3700),
		new Prop("flowers3",800,3700),
		new Prop("flowers3",900,3700),
		new Prop("flowers3",1000,3700),
		new Prop("flowers3",1100,3700),
		new Prop("flowers3",1200,3700),
		new Prop("flowers3",1300,3700),
		new Prop("flowers3",1400,3700),
		new Prop("flowers3",1500,3700),
		new Prop("flowers3",1600,3700),
		new Prop("flowers3",1700,3700),
		new Prop("flowers3",1800,3700),
		new Prop("flowers3",1900,3700),
		new Prop("flowers3",2000,3700),
		new Prop("flowers3",2400,3700),
		new Prop("flowers3",2500,3700),
		new Prop("flowers3",2600,3700),
		new Prop("flowers3",2700,3700),
		new Prop("tree1",2800,3700),
		new Prop("dirt",3900,3700),
		new Prop("grass",4200,3700),
		new Prop("grass",4300,3700),
		new Prop("grass",4400,3700),
		new Prop("grass",4500,3700),
		new Prop("grass",4600,3700),
		new Prop("grass",4700,3700),
		new Prop("grass",0,3800),
		new Prop("grass",100,3800),
		new Prop("grass",200,3800),
		new Prop("dirt",400,3800),
		new Prop("flowers3",600,3800),
		new Prop("flowers3",700,3800),
		new Prop("flowers3",800,3800),
		new Prop("flowers3",900,3800),
		new Prop("flowers3",1000,3800),
		new Prop("flowers3",1100,3800),
		new Prop("flowers3",1200,3800),
		new Prop("flowers3",1300,3800),
		new Prop("flowers3",1400,3800),
		new Prop("flowers3",1500,3800),
		new Prop("flowers3",1600,3800),
		new Prop("flowers3",1700,3800),
		new Prop("flowers3",1800,3800),
		new Prop("flowers3",1900,3800),
		new Prop("flowers3",2000,3800),
		new Prop("flowers3",2400,3800),
		new Prop("flowers3",2500,3800),
		new Prop("flowers3",2600,3800),
		new Prop("flowers3",2700,3800),
		new Prop("flowers3",2800,3800),
		new Prop("tree2",3100,3800),
		new Prop("tree1",3500,3800),
		new Prop("flowers3",3600,3800),
		new Prop("dirt",3900,3800),
		new Prop("grass",4500,3800),
		new Prop("grass",4700,3800),
		new Prop("grass",0,3900),
		new Prop("dirt",400,3900),
		new Prop("flowers3",600,3900),
		new Prop("flowers3",700,3900),
		new Prop("flowers3",800,3900),
		new Prop("flowers3",900,3900),
		new Prop("flowers3",1000,3900),
		new Prop("flowers3",1100,3900),
		new Prop("flowers3",1200,3900),
		new Prop("flowers3",1300,3900),
		new Prop("flowers3",1400,3900),
		new Prop("flowers3",1500,3900),
		new Prop("flowers3",1600,3900),
		new Prop("flowers3",1700,3900),
		new Prop("flowers3",1800,3900),
		new Prop("flowers3",1900,3900),
		new Prop("flowers3",2000,3900),
		new Prop("flowers3",2400,3900),
		new Prop("flowers3",2500,3900),
		new Prop("flowers3",2600,3900),
		new Prop("tree1",2700,3900),
		new Prop("flowers3",2800,3900),
		new Prop("flowers3",3500,3900),
		new Prop("flowers3",3600,3900),
		new Prop("dirt",3900,3900),
		new Prop("tree2",4400,3900),
		new Prop("grass",4500,3900),
		new Prop("grass",4700,3900),
		new Prop("grass",0,4000),
		new Prop("dirt",400,4000),
		new Prop("flowers3",600,4000),
		new Prop("flowers3",700,4000),
		new Prop("flowers3",800,4000),
		new Prop("flowers3",900,4000),
		new Prop("flowers3",1000,4000),
		new Prop("flowers3",1100,4000),
		new Prop("flowers3",1200,4000),
		new Prop("flowers3",1300,4000),
		new Prop("flowers3",1400,4000),
		new Prop("flowers3",1500,4000),
		new Prop("flowers3",1600,4000),
		new Prop("flowers3",1700,4000),
		new Prop("flowers3",1800,4000),
		new Prop("flowers3",1900,4000),
		new Prop("flowers3",2000,4000),
		new Prop("dirt",3900,4000),
		new Prop("tree1",4200,4000),
		new Prop("grass",4500,4000),
		new Prop("grass",4700,4000),
		new Prop("tree1",4900,4000),
		new Prop("grass",0,4100),
		new Prop("dirt",400,4100),
		new Prop("flowers3",600,4100),
		new Prop("flowers3",700,4100),
		new Prop("tree2",800,4100),
		new Prop("flowers3",900,4100),
		new Prop("flowers3",1000,4100),
		new Prop("flowers3",1100,4100),
		new Prop("flowers3",1200,4100),
		new Prop("flowers3",1300,4100),
		new Prop("flowers3",1400,4100),
		new Prop("flowers3",1500,4100),
		new Prop("flowers3",1600,4100),
		new Prop("flowers3",1700,4100),
		new Prop("flowers3",1800,4100),
		new Prop("flowers3",1900,4100),
		new Prop("flowers3",2000,4100),
		new Prop("dirt",3900,4100),
		new Prop("tree1",4400,4100),
		new Prop("grass",4500,4100),
		new Prop("grass",4700,4100),
		new Prop("grass",0,4200),
		new Prop("dirt",400,4200),
		new Prop("tree1",500,4200),
		new Prop("flowers3",600,4200),
		new Prop("flowers3",700,4200),
		new Prop("flowers3",800,4200),
		new Prop("flowers3",900,4200),
		new Prop("flowers3",1000,4200),
		new Prop("flowers3",1100,4200),
		new Prop("flowers3",1200,4200),
		new Prop("flowers3",1300,4200),
		new Prop("flowers3",1400,4200),
		new Prop("flowers3",1500,4200),
		new Prop("flowers3",1600,4200),
		new Prop("flowers3",1700,4200),
		new Prop("tree2",1800,4200),
		new Prop("flowers3",1900,4200),
		new Prop("flowers3",2000,4200),
		new Prop("dirttl",2400,4200),
		new Prop("dirt",2500,4200),
		new Prop("dirt",2600,4200),
		new Prop("dirt",2700,4200),
		new Prop("dirt",2800,4200),
		new Prop("dirt",2900,4200),
		new Prop("dirt",3000,4200),
		new Prop("dirt",3100,4200),
		new Prop("dirt",3200,4200),
		new Prop("dirt",3300,4200),
		new Prop("dirt",3400,4200),
		new Prop("dirt",3500,4200),
		new Prop("dirt",3600,4200),
		new Prop("dirt",3700,4200),
		new Prop("dirt",3800,4200),
		new Prop("dirtbr",3900,4200),
		new Prop("grass",4500,4200),
		new Prop("grass",4700,4200),
		new Prop("",4800,4200),
		new Prop("tree1",4900,4200),
		new Prop("grass",0,4300),
		new Prop("tree1",100,4300),
		new Prop("dirt",400,4300),
		new Prop("flowers3",600,4300),
		new Prop("flowers3",700,4300),
		new Prop("flowers3",800,4300),
		new Prop("flowers3",900,4300),
		new Prop("flowers3",1000,4300),
		new Prop("flowers3",1100,4300),
		new Prop("flowers3",1200,4300),
		new Prop("flowers3",1300,4300),
		new Prop("flowers3",1400,4300),
		new Prop("flowers3",1500,4300),
		new Prop("flowers3",1600,4300),
		new Prop("flowers3",1700,4300),
		new Prop("flowers3",1800,4300),
		new Prop("flowers3",1900,4300),
		new Prop("flowers3",2000,4300),
		new Prop("dirt",2400,4300),
		new Prop("grass",2500,4300),
		new Prop("grass",2600,4300),
		new Prop("grass",2700,4300),
		new Prop("grass",2800,4300),
		new Prop("grass",2900,4300),
		new Prop("grass",3000,4300),
		new Prop("grass",3100,4300),
		new Prop("grass",3200,4300),
		new Prop("grass",3300,4300),
		new Prop("grass",3400,4300),
		new Prop("grass",3500,4300),
		new Prop("grass",3600,4300),
		new Prop("grass",3700,4300),
		new Prop("grass",3800,4300),
		new Prop("grass",3900,4300),
		new Prop("grass",4000,4300),
		new Prop("grass",4100,4300),
		new Prop("grass",4200,4300),
		new Prop("grass",4500,4300),
		new Prop("grass",4700,4300),
		new Prop("tree1",4800,4300),
		new Prop("grass",0,4400),
		new Prop("dirt",400,4400),
		new Prop("tree1",1200,4400),
		new Prop("dirt",2400,4400),
		new Prop("grass",4500,4400),
		new Prop("grass",4700,4400),
		new Prop("grass",0,4500),
		new Prop("grass",100,4500),
		new Prop("dirt",400,4500),
		new Prop("dirt",500,4500),
		new Prop("dirt",600,4500),
		new Prop("dirt",700,4500),
		new Prop("dirt",800,4500),
		new Prop("dirt",900,4500),
		new Prop("dirt",1000,4500),
		new Prop("dirt",1100,4500),
		new Prop("dirt",1200,4500),
		new Prop("dirt",1300,4500),
		new Prop("dirt",1400,4500),
		new Prop("dirt",1500,4500),
		new Prop("dirt",1600,4500),
		new Prop("dirt",1700,4500),
		new Prop("dirt",1800,4500),
		new Prop("dirt",1900,4500),
		new Prop("dirt",2000,4500),
		new Prop("dirt",2100,4500),
		new Prop("dirt",2200,4500),
		new Prop("dirt",2300,4500),
		new Prop("dirtbr",2400,4500),
		new Prop("tree1",2600,4500),
		new Prop("grass",2800,4500),
		new Prop("grass",2900,4500),
		new Prop("grass",3000,4500),
		new Prop("grass",3100,4500),
		new Prop("grass",3200,4500),
		new Prop("grass",3300,4500),
		new Prop("grass",3400,4500),
		new Prop("grass",3500,4500),
		new Prop("grass",3600,4500),
		new Prop("grass",3700,4500),
		new Prop("grass",3800,4500),
		new Prop("grass",3900,4500),
		new Prop("grass",4000,4500),
		new Prop("grass",4100,4500),
		new Prop("grass",4200,4500),
		new Prop("grass",4300,4500),
		new Prop("grass",4400,4500),
		new Prop("grass",4500,4500),
		new Prop("tree1",4900,4500),
		new Prop("grass",0,4600),
		new Prop("dirt",400,4600),
		new Prop("sign1",500,4600),
		new Prop("grass",4500,4600),
		new Prop("tree2",4900,4600),
		new Prop("grass",0,4700),
		new Prop("dirt",400,4700),
		new Prop("tree1",800,4700),
		new Prop("tree1",1800,4700),
		new Prop("tree1",2300,4700),
		new Prop("grass",3100,4700),
		new Prop("grass",3200,4700),
		new Prop("grass",3300,4700),
		new Prop("grass",3400,4700),
		new Prop("grass",3500,4700),
		new Prop("grass",3600,4700),
		new Prop("grass",3700,4700),
		new Prop("grass",3800,4700),
		new Prop("grass",3900,4700),
		new Prop("grass",4000,4700),
		new Prop("grass",4100,4700),
		new Prop("grass",4200,4700),
		new Prop("grass",4300,4700),
		new Prop("grass",4400,4700),
		new Prop("grass",4500,4700),
		new Prop("tree1",4700,4700),
		new Prop("tree1",4900,4700),
		new Prop("grass",0,4800),
		new Prop("grass",100,4800),
		new Prop("grass",200,4800),
		new Prop("dirt",400,4800),
		new Prop("tree2",2200,4800),
		new Prop("grass",3100,4800),
		new Prop("grass",3200,4800),
		new Prop("grass",3300,4800),
		new Prop("grass",3400,4800),
		new Prop("grass",3500,4800),
		new Prop("grass",3600,4800),
		new Prop("grass",3700,4800),
		new Prop("grass",3800,4800),
		new Prop("grass",3900,4800),
		new Prop("grass",4000,4800),
		new Prop("grass",4100,4800),
		new Prop("grass",4200,4800),
		new Prop("grass",4300,4800),
		new Prop("grass",4400,4800),
		new Prop("grass",4500,4800),
		new Prop("tree1",4700,4800),
		new Prop("tree1",4800,4800),
		new Prop("tree1",4900,4800),
		new Prop("grass",0,4900),
		new Prop("dirt",400,4900),
		new Prop("naturedoorh",400,4900),
		new Prop("tree1",700,4900),
		new Prop("tree2",900,4900),
		new Prop("tree2",1400,4900),
		new Prop("tree2",1700,4900),
		new Prop("tree1",2600,4900),
		new Prop("tree1",4400,4900),
		new Prop("tree1",4600,4900),
		new Prop("tree1",4700,4900),
		new Prop("tree1",4900,4900)
	];
	var farm = [
		new Prop("blank",0,0),
		new Prop("dirt",1600,0),
		new Prop("dirt",1700,0),
		new Prop("naturedoorh",1600,0),
		new Prop("naturedoorh",1700,0),
		new Prop("water",3600,0),
		new Prop("water",3700,0),
		new Prop("water",3800,0),
		new Prop("tree3",3900,0),
		new Prop("tree3",4000,0),
		new Prop("tree3",4100,0),
		new Prop("tree3",4600,0),
		new Prop("tree3",4900,0),
		new Prop("dirt",1600,100),
		new Prop("dirt",1700,100),
		new Prop("water",3600,100),
		new Prop("water",3700,100),
		new Prop("water",3800,100),
		new Prop("tree3",4000,100),
		new Prop("tree3",4300,100),
		new Prop("tree3",4800,100),
		new Prop("barn1",400,200),
		new Prop("barn1",500,200),
		new Prop("barn1",600,200),
		new Prop("barn1",700,200),
		new Prop("barn1",800,200),
		new Prop("barn1",900,200),
		new Prop("barn1",1000,200),
		new Prop("barn2",1200,200),
		new Prop("barn2",1300,200),
		new Prop("dirt",1600,200),
		new Prop("dirt",1700,200),
		new Prop("crop1",1900,200),
		new Prop("crop2",2000,200),
		new Prop("crop1",2100,200),
		new Prop("crop2",2200,200),
		new Prop("crop1",2300,200),
		new Prop("crop2",2400,200),
		new Prop("crop1",2500,200),
		new Prop("crop2",2600,200),
		new Prop("crop1",2700,200),
		new Prop("crop2",2800,200),
		new Prop("crop1",2900,200),
		new Prop("crop2",3000,200),
		new Prop("crop1",3100,200),
		new Prop("water",3600,200),
		new Prop("water",3700,200),
		new Prop("water",3800,200),
		new Prop("tree3",3900,200),
		new Prop("tree3",4100,200),
		new Prop("tree3",4900,200),
		new Prop("dirt",300,300),
		new Prop("barn1",400,300),
		new Prop("barn1",500,300),
		new Prop("barn1",600,300),
		new Prop("barn1",700,300),
		new Prop("barn1",800,300),
		new Prop("barn1",900,300),
		new Prop("barn1",1000,300),
		new Prop("dirt",1100,300),
		new Prop("barn2",1200,300),
		new Prop("barn2",1300,300),
		new Prop("dirt",1400,300),
		new Prop("dirt",1500,300),
		new Prop("dirt",1600,300),
		new Prop("crop1",1900,300),
		new Prop("crop2",2000,300),
		new Prop("crop1",2100,300),
		new Prop("crop2",2200,300),
		new Prop("crop1",2300,300),
		new Prop("crop2",2400,300),
		new Prop("crop1",2500,300),
		new Prop("crop2",2600,300),
		new Prop("crop1",2700,300),
		new Prop("crop2",2800,300),
		new Prop("crop1",2900,300),
		new Prop("crop2",3000,300),
		new Prop("crop1",3100,300),
		new Prop("water",3600,300),
		new Prop("water",3700,300),
		new Prop("water",3800,300),
		new Prop("dirt",100,400),
		new Prop("dirt",200,400),
		new Prop("dirt",300,400),
		new Prop("barn1",400,400),
		new Prop("barn1",500,400),
		new Prop("barn1",600,400),
		new Prop("barn1",700,400),
		new Prop("barn1",800,400),
		new Prop("barn1",900,400),
		new Prop("barn1",1000,400),
		new Prop("dirt",1100,400),
		new Prop("barn2",1200,400),
		new Prop("barn2",1300,400),
		new Prop("crop1",1900,400),
		new Prop("crop2",2000,400),
		new Prop("crop1",2100,400),
		new Prop("crop2",2200,400),
		new Prop("crop1",2300,400),
		new Prop("crop2",2400,400),
		new Prop("crop1",2500,400),
		new Prop("crop2",2600,400),
		new Prop("crop1",2700,400),
		new Prop("crop2",2800,400),
		new Prop("crop1",2900,400),
		new Prop("crop2",3000,400),
		new Prop("crop1",3100,400),
		new Prop("water",3600,400),
		new Prop("water",3700,400),
		new Prop("water",3800,400),
		new Prop("tree3",4000,400),
		new Prop("crop2",4300,400),
		new Prop("crop2",4400,400),
		new Prop("crop2",4500,400),
		new Prop("crop2",4600,400),
		new Prop("dirt",100,500),
		new Prop("barn1",400,500),
		new Prop("barn1",500,500),
		new Prop("barn1",600,500),
		new Prop("barn1",700,500),
		new Prop("barn1",800,500),
		new Prop("barn1",900,500),
		new Prop("barn1",1000,500),
		new Prop("barn2",1200,500),
		new Prop("barn2",1300,500),
		new Prop("crop1",1900,500),
		new Prop("crop2",2000,500),
		new Prop("crop1",2100,500),
		new Prop("crop2",2200,500),
		new Prop("crop1",2300,500),
		new Prop("crop2",2400,500),
		new Prop("crop1",2500,500),
		new Prop("crop2",2600,500),
		new Prop("crop1",2700,500),
		new Prop("crop2",2800,500),
		new Prop("crop1",2900,500),
		new Prop("crop2",3000,500),
		new Prop("crop1",3100,500),
		new Prop("water",3600,500),
		new Prop("water",3700,500),
		new Prop("water",3800,500),
		new Prop("barn1",4300,500),
		new Prop("barn1",4400,500),
		new Prop("barn1",4500,500),
		new Prop("barn1",4600,500),
		new Prop("dirt",100,600),
		new Prop("barn1",400,600),
		new Prop("barn1",500,600),
		new Prop("barn1",600,600),
		new Prop("door2",700,600),
		new Prop("barn1",800,600),
		new Prop("barn1",900,600),
		new Prop("barn1",1000,600),
		new Prop("barn2",1200,600),
		new Prop("barn2",1300,600),
		new Prop("crop1",1900,600),
		new Prop("crop2",2000,600),
		new Prop("crop1",2100,600),
		new Prop("crop2",2200,600),
		new Prop("crop1",2300,600),
		new Prop("crop2",2400,600),
		new Prop("crop1",2500,600),
		new Prop("crop2",2600,600),
		new Prop("crop1",2700,600),
		new Prop("crop2",2800,600),
		new Prop("crop1",2900,600),
		new Prop("crop2",3000,600),
		new Prop("crop1",3100,600),
		new Prop("water",3600,600),
		new Prop("water",3700,600),
		new Prop("water",3800,600),
		new Prop("barn1",4300,600),
		new Prop("barn1",4400,600),
		new Prop("barn1",4500,600),
		new Prop("barn1",4600,600),
		new Prop("dirt",100,700),
		new Prop("crop1",1900,700),
		new Prop("crop2",2000,700),
		new Prop("crop1",2100,700),
		new Prop("crop2",2200,700),
		new Prop("crop1",2300,700),
		new Prop("crop2",2400,700),
		new Prop("crop1",2500,700),
		new Prop("crop2",2600,700),
		new Prop("crop1",2700,700),
		new Prop("crop2",2800,700),
		new Prop("crop1",2900,700),
		new Prop("crop2",3000,700),
		new Prop("crop1",3100,700),
		new Prop("water",3600,700),
		new Prop("water",3700,700),
		new Prop("water",3800,700),
		new Prop("tree3",4100,700),
		new Prop("barn1",4300,700),
		new Prop("door3",4400,700),
		new Prop("barn1",4500,700),
		new Prop("barn1",4600,700),
		new Prop("dirt",100,800),
		new Prop("crop1",1900,800),
		new Prop("crop2",2000,800),
		new Prop("crop1",2100,800),
		new Prop("crop2",2200,800),
		new Prop("crop1",2300,800),
		new Prop("crop2",2400,800),
		new Prop("crop1",2500,800),
		new Prop("crop2",2600,800),
		new Prop("crop1",2700,800),
		new Prop("crop2",2800,800),
		new Prop("crop1",2900,800),
		new Prop("crop2",3000,800),
		new Prop("crop1",3100,800),
		new Prop("water",3600,800),
		new Prop("water",3700,800),
		new Prop("water",3800,800),
		new Prop("tree3",4000,800),
		new Prop("crop1",4300,800),
		new Prop("crop1",4400,800),
		new Prop("crop1",4500,800),
		new Prop("crop1",4600,800),
		new Prop("dirt",100,900),
		new Prop("crop1",300,900),
		new Prop("crop1",400,900),
		new Prop("crop1",500,900),
		new Prop("crop1",600,900),
		new Prop("crop1",700,900),
		new Prop("crop1",800,900),
		new Prop("crop1",900,900),
		new Prop("crop1",1000,900),
		new Prop("crop1",1100,900),
		new Prop("crop1",1200,900),
		new Prop("crop1",1300,900),
		new Prop("crop1",1400,900),
		new Prop("crop1",1500,900),
		new Prop("crop1",1600,900),
		new Prop("crop1",1900,900),
		new Prop("crop2",2000,900),
		new Prop("crop1",2100,900),
		new Prop("crop2",2200,900),
		new Prop("crop1",2300,900),
		new Prop("crop2",2400,900),
		new Prop("crop1",2500,900),
		new Prop("crop2",2600,900),
		new Prop("crop1",2700,900),
		new Prop("crop2",2800,900),
		new Prop("crop1",2900,900),
		new Prop("crop2",3000,900),
		new Prop("crop1",3100,900),
		new Prop("water",3600,900),
		new Prop("water",3700,900),
		new Prop("water",3800,900),
		new Prop("tree3",4100,900),
		new Prop("crop1",4300,900),
		new Prop("crop1",4400,900),
		new Prop("crop1",4500,900),
		new Prop("crop1",4600,900),
		new Prop("dirt",100,1000),
		new Prop("crop2",300,1000),
		new Prop("crop2",400,1000),
		new Prop("crop2",500,1000),
		new Prop("crop2",600,1000),
		new Prop("crop2",700,1000),
		new Prop("crop2",800,1000),
		new Prop("crop2",900,1000),
		new Prop("crop2",1000,1000),
		new Prop("crop2",1100,1000),
		new Prop("crop2",1200,1000),
		new Prop("crop2",1300,1000),
		new Prop("crop2",1400,1000),
		new Prop("crop2",1500,1000),
		new Prop("crop2",1600,1000),
		new Prop("crop1",1900,1000),
		new Prop("crop2",2000,1000),
		new Prop("crop1",2100,1000),
		new Prop("crop2",2200,1000),
		new Prop("crop1",2300,1000),
		new Prop("crop2",2400,1000),
		new Prop("crop1",2500,1000),
		new Prop("crop2",2600,1000),
		new Prop("crop1",2700,1000),
		new Prop("crop2",2800,1000),
		new Prop("crop1",2900,1000),
		new Prop("crop2",3000,1000),
		new Prop("crop1",3100,1000),
		new Prop("water",3600,1000),
		new Prop("water",3700,1000),
		new Prop("water",3800,1000),
		new Prop("crop1",4300,1000),
		new Prop("crop1",4400,1000),
		new Prop("crop1",4500,1000),
		new Prop("crop1",4600,1000),
		new Prop("dirt",100,1100),
		new Prop("crop1",300,1100),
		new Prop("crop1",400,1100),
		new Prop("crop1",500,1100),
		new Prop("crop1",600,1100),
		new Prop("crop1",700,1100),
		new Prop("crop1",800,1100),
		new Prop("crop1",900,1100),
		new Prop("crop1",1000,1100),
		new Prop("crop1",1100,1100),
		new Prop("crop1",1200,1100),
		new Prop("crop1",1300,1100),
		new Prop("crop1",1400,1100),
		new Prop("crop1",1500,1100),
		new Prop("crop1",1600,1100),
		new Prop("crop1",1900,1100),
		new Prop("crop2",2000,1100),
		new Prop("crop1",2100,1100),
		new Prop("crop2",2200,1100),
		new Prop("crop1",2300,1100),
		new Prop("crop2",2400,1100),
		new Prop("crop1",2500,1100),
		new Prop("crop2",2600,1100),
		new Prop("crop1",2700,1100),
		new Prop("crop2",2800,1100),
		new Prop("crop1",2900,1100),
		new Prop("crop2",3000,1100),
		new Prop("crop1",3100,1100),
		new Prop("dirttl",3400,1100),
		new Prop("bridge",3500,1100),
		new Prop("bridge",3600,1100),
		new Prop("bridge",3700,1100),
		new Prop("bridge",3800,1100),
		new Prop("bridge",3900,1100),
		new Prop("dirttr",4000,1100),
		new Prop("crop1",4300,1100),
		new Prop("crop1",4400,1100),
		new Prop("crop1",4500,1100),
		new Prop("crop1",4600,1100),
		new Prop("dirt",100,1200),
		new Prop("crop2",300,1200),
		new Prop("crop2",400,1200),
		new Prop("crop2",500,1200),
		new Prop("crop2",600,1200),
		new Prop("crop2",700,1200),
		new Prop("crop2",800,1200),
		new Prop("crop2",900,1200),
		new Prop("crop2",1000,1200),
		new Prop("crop2",1100,1200),
		new Prop("crop2",1200,1200),
		new Prop("crop2",1300,1200),
		new Prop("crop2",1400,1200),
		new Prop("crop2",1500,1200),
		new Prop("crop2",1600,1200),
		new Prop("crop1",1900,1200),
		new Prop("crop2",2000,1200),
		new Prop("crop1",2100,1200),
		new Prop("crop2",2200,1200),
		new Prop("crop1",2300,1200),
		new Prop("crop2",2400,1200),
		new Prop("crop1",2500,1200),
		new Prop("crop2",2600,1200),
		new Prop("crop1",2700,1200),
		new Prop("crop2",2800,1200),
		new Prop("crop1",2900,1200),
		new Prop("crop2",3000,1200),
		new Prop("crop1",3100,1200),
		new Prop("dirttl",3300,1200),
		new Prop("dirt",3400,1200),
		new Prop("bridge",3500,1200),
		new Prop("bridge",3600,1200),
		new Prop("bridge",3700,1200),
		new Prop("bridge",3800,1200),
		new Prop("bridge",3900,1200),
		new Prop("dirt",4000,1200),
		new Prop("dirttr",4100,1200),
		new Prop("dirt",100,1300),
		new Prop("crop1",300,1300),
		new Prop("crop1",400,1300),
		new Prop("crop1",500,1300),
		new Prop("crop1",600,1300),
		new Prop("crop1",700,1300),
		new Prop("crop1",800,1300),
		new Prop("crop1",900,1300),
		new Prop("crop1",1000,1300),
		new Prop("crop1",1100,1300),
		new Prop("crop1",1200,1300),
		new Prop("crop1",1300,1300),
		new Prop("crop1",1400,1300),
		new Prop("crop1",1500,1300),
		new Prop("crop1",1600,1300),
		new Prop("crop1",1900,1300),
		new Prop("crop2",2000,1300),
		new Prop("crop1",2100,1300),
		new Prop("crop2",2200,1300),
		new Prop("crop1",2300,1300),
		new Prop("crop2",2400,1300),
		new Prop("crop1",2500,1300),
		new Prop("crop2",2600,1300),
		new Prop("crop1",2700,1300),
		new Prop("crop2",2800,1300),
		new Prop("crop1",2900,1300),
		new Prop("crop2",3000,1300),
		new Prop("crop1",3100,1300),
		new Prop("dirt",3300,1300),
		new Prop("water",3600,1300),
		new Prop("water",3700,1300),
		new Prop("water",3800,1300),
		new Prop("dirt",4100,1300),
		new Prop("dirt",4200,1300),
		new Prop("dirt",4300,1300),
		new Prop("dirt",4400,1300),
		new Prop("dirt",4500,1300),
		new Prop("dirt",4600,1300),
		new Prop("dirt",4700,1300),
		new Prop("tree3",4900,1300),
		new Prop("dirt",100,1400),
		new Prop("crop2",300,1400),
		new Prop("crop2",400,1400),
		new Prop("crop2",500,1400),
		new Prop("crop2",600,1400),
		new Prop("crop2",700,1400),
		new Prop("crop2",800,1400),
		new Prop("crop2",900,1400),
		new Prop("crop2",1000,1400),
		new Prop("crop2",1100,1400),
		new Prop("crop2",1200,1400),
		new Prop("crop2",1300,1400),
		new Prop("crop2",1400,1400),
		new Prop("crop2",1500,1400),
		new Prop("crop2",1600,1400),
		new Prop("crop1",1900,1400),
		new Prop("crop2",2000,1400),
		new Prop("crop1",2100,1400),
		new Prop("crop2",2200,1400),
		new Prop("crop1",2300,1400),
		new Prop("crop2",2400,1400),
		new Prop("crop1",2500,1400),
		new Prop("crop2",2600,1400),
		new Prop("crop1",2700,1400),
		new Prop("crop2",2800,1400),
		new Prop("crop1",2900,1400),
		new Prop("crop2",3000,1400),
		new Prop("crop1",3100,1400),
		new Prop("dirt",3300,1400),
		new Prop("water",3600,1400),
		new Prop("water",3700,1400),
		new Prop("water",3800,1400),
		new Prop("tree3",3900,1400),
		new Prop("dirt",4200,1400),
		new Prop("dirt",4300,1400),
		new Prop("dirt",4400,1400),
		new Prop("dirt",4500,1400),
		new Prop("dirt",4600,1400),
		new Prop("dirt",4700,1400),
		new Prop("dirttr",4800,1400),
		new Prop("dirt",100,1500),
		new Prop("crop1",300,1500),
		new Prop("crop1",400,1500),
		new Prop("crop1",500,1500),
		new Prop("crop1",600,1500),
		new Prop("crop1",700,1500),
		new Prop("crop1",800,1500),
		new Prop("crop1",900,1500),
		new Prop("crop1",1000,1500),
		new Prop("crop1",1100,1500),
		new Prop("crop1",1200,1500),
		new Prop("crop1",1300,1500),
		new Prop("crop1",1400,1500),
		new Prop("crop1",1500,1500),
		new Prop("crop1",1600,1500),
		new Prop("dirt",3300,1500),
		new Prop("water",3600,1500),
		new Prop("water",3700,1500),
		new Prop("water",3800,1500),
		new Prop("dirtbl",4700,1500),
		new Prop("dirt",4800,1500),
		new Prop("dirt",4900,1500),
		new Prop("naturedoorv",4900,1500),
		new Prop("dirt",100,1600),
		new Prop("dirt",1900,1600),
		new Prop("dirt",2000,1600),
		new Prop("dirt",2100,1600),
		new Prop("dirt",2200,1600),
		new Prop("dirt",2300,1600),
		new Prop("dirt",2400,1600),
		new Prop("dirt",2500,1600),
		new Prop("dirt",2600,1600),
		new Prop("dirt",2700,1600),
		new Prop("dirt",2800,1600),
		new Prop("dirt",2900,1600),
		new Prop("dirt",3000,1600),
		new Prop("dirt",3100,1600),
		new Prop("dirt",3200,1600),
		new Prop("dirt",3300,1600),
		new Prop("water",3600,1600),
		new Prop("water",3700,1600),
		new Prop("water",3800,1600),
		new Prop("tree3",4000,1600),
		new Prop("crop1",4300,1600),
		new Prop("crop1",4400,1600),
		new Prop("crop1",4500,1600),
		new Prop("crop1",4600,1600),
		new Prop("dirtbl",4800,1600),
		new Prop("dirt",4900,1600),
		new Prop("naturedoorv",4900,1600),
		new Prop("dirt",100,1700),
		new Prop("dirt",200,1700),
		new Prop("dirt",300,1700),
		new Prop("dirt",400,1700),
		new Prop("dirt",500,1700),
		new Prop("dirt",600,1700),
		new Prop("dirt",700,1700),
		new Prop("dirt",800,1700),
		new Prop("dirt",900,1700),
		new Prop("dirt",1000,1700),
		new Prop("dirt",1100,1700),
		new Prop("dirt",1200,1700),
		new Prop("dirt",1300,1700),
		new Prop("dirt",1400,1700),
		new Prop("dirt",1500,1700),
		new Prop("dirt",1600,1700),
		new Prop("dirt",1700,1700),
		new Prop("dirt",1800,1700),
		new Prop("dirt",1900,1700),
		new Prop("dirt",2000,1700),
		new Prop("dirt",3200,1700),
		new Prop("dirt",3300,1700),
		new Prop("water",3600,1700),
		new Prop("water",3700,1700),
		new Prop("water",3800,1700),
		new Prop("crop1",4300,1700),
		new Prop("crop1",4400,1700),
		new Prop("crop1",4500,1700),
		new Prop("crop1",4600,1700),
		new Prop("bridge",1900,1800),
		new Prop("bridge",2000,1800),
		new Prop("bridge",3200,1800),
		new Prop("bridge",3300,1800),
		new Prop("water",3600,1800),
		new Prop("water",3700,1800),
		new Prop("water",3800,1800),
		new Prop("crop1",4300,1800),
		new Prop("crop1",4400,1800),
		new Prop("crop1",4500,1800),
		new Prop("crop1",4600,1800),
		new Prop("water",0,1900),
		new Prop("water",100,1900),
		new Prop("water",200,1900),
		new Prop("water",300,1900),
		new Prop("water",400,1900),
		new Prop("water",500,1900),
		new Prop("water",600,1900),
		new Prop("water",700,1900),
		new Prop("water",800,1900),
		new Prop("water",900,1900),
		new Prop("water",1000,1900),
		new Prop("water",1100,1900),
		new Prop("water",1200,1900),
		new Prop("water",1300,1900),
		new Prop("water",1400,1900),
		new Prop("water",1500,1900),
		new Prop("water",1600,1900),
		new Prop("water",1700,1900),
		new Prop("water",1800,1900),
		new Prop("bridge",1900,1900),
		new Prop("bridge",2000,1900),
		new Prop("water",2100,1900),
		new Prop("water",2200,1900),
		new Prop("water",2300,1900),
		new Prop("water",2400,1900),
		new Prop("water",2500,1900),
		new Prop("water",2600,1900),
		new Prop("water",2700,1900),
		new Prop("water",2800,1900),
		new Prop("water",2900,1900),
		new Prop("water",3000,1900),
		new Prop("water",3100,1900),
		new Prop("bridge",3200,1900),
		new Prop("bridge",3300,1900),
		new Prop("water",3400,1900),
		new Prop("water",3500,1900),
		new Prop("water",3600,1900),
		new Prop("water",3700,1900),
		new Prop("water",3800,1900),
		new Prop("crop1",4300,1900),
		new Prop("crop1",4400,1900),
		new Prop("crop1",4500,1900),
		new Prop("crop1",4600,1900),
		new Prop("tree3",4900,1900),
		new Prop("water",0,2000),
		new Prop("water",100,2000),
		new Prop("water",200,2000),
		new Prop("water",300,2000),
		new Prop("water",400,2000),
		new Prop("water",500,2000),
		new Prop("water",600,2000),
		new Prop("water",700,2000),
		new Prop("water",800,2000),
		new Prop("water",900,2000),
		new Prop("water",1000,2000),
		new Prop("water",1100,2000),
		new Prop("water",1200,2000),
		new Prop("water",1300,2000),
		new Prop("water",1400,2000),
		new Prop("water",1500,2000),
		new Prop("water",1600,2000),
		new Prop("water",1700,2000),
		new Prop("water",1800,2000),
		new Prop("bridge",1900,2000),
		new Prop("bridge",2000,2000),
		new Prop("water",2100,2000),
		new Prop("water",2200,2000),
		new Prop("water",2300,2000),
		new Prop("water",2400,2000),
		new Prop("water",2500,2000),
		new Prop("water",2600,2000),
		new Prop("water",2700,2000),
		new Prop("water",2800,2000),
		new Prop("water",2900,2000),
		new Prop("water",3000,2000),
		new Prop("water",3100,2000),
		new Prop("bridge",3200,2000),
		new Prop("bridge",3300,2000),
		new Prop("water",3400,2000),
		new Prop("water",3500,2000),
		new Prop("water",3600,2000),
		new Prop("water",3700,2000),
		new Prop("water",3800,2000),
		new Prop("crop2",4300,2000),
		new Prop("crop2",4400,2000),
		new Prop("crop2",4500,2000),
		new Prop("crop2",4600,2000),
		new Prop("water",0,2100),
		new Prop("water",100,2100),
		new Prop("water",200,2100),
		new Prop("water",300,2100),
		new Prop("water",400,2100),
		new Prop("water",500,2100),
		new Prop("water",600,2100),
		new Prop("water",700,2100),
		new Prop("water",800,2100),
		new Prop("water",900,2100),
		new Prop("water",1000,2100),
		new Prop("water",1100,2100),
		new Prop("water",1200,2100),
		new Prop("water",1300,2100),
		new Prop("water",1400,2100),
		new Prop("water",1500,2100),
		new Prop("water",1600,2100),
		new Prop("water",1700,2100),
		new Prop("water",1800,2100),
		new Prop("bridge",1900,2100),
		new Prop("bridge",2000,2100),
		new Prop("water",2100,2100),
		new Prop("water",2200,2100),
		new Prop("water",2300,2100),
		new Prop("water",2400,2100),
		new Prop("water",2500,2100),
		new Prop("water",2600,2100),
		new Prop("water",2700,2100),
		new Prop("water",2800,2100),
		new Prop("water",2900,2100),
		new Prop("water",3000,2100),
		new Prop("water",3100,2100),
		new Prop("bridge",3200,2100),
		new Prop("bridge",3300,2100),
		new Prop("water",3400,2100),
		new Prop("water",3500,2100),
		new Prop("water",3600,2100),
		new Prop("water",3700,2100),
		new Prop("water",3800,2100),
		new Prop("tree3",3900,2100),
		new Prop("crop2",4300,2100),
		new Prop("crop2",4400,2100),
		new Prop("crop2",4500,2100),
		new Prop("crop2",4600,2100),
		new Prop("tree3",100,2200),
		new Prop("tree3",400,2200),
		new Prop("tree3",1700,2200),
		new Prop("bridge",1900,2200),
		new Prop("bridge",2000,2200),
		new Prop("tree3",2600,2200),
		new Prop("tree3",2700,2200),
		new Prop("tree3",2900,2200),
		new Prop("bridge",3200,2200),
		new Prop("bridge",3300,2200),
		new Prop("tree3",3700,2200),
		new Prop("tree3",3800,2200),
		new Prop("tree3",3900,2200),
		new Prop("crop2",4300,2200),
		new Prop("crop2",4400,2200),
		new Prop("crop2",4500,2200),
		new Prop("crop2",4600,2200),
		new Prop("tree3",4900,2200),
		new Prop("tree3",0,2300),
		new Prop("tree3",200,2300),
		new Prop("dirt",1900,2300),
		new Prop("dirt",2000,2300),
		new Prop("tree3",2200,2300),
		new Prop("tree3",3800,2300),
		new Prop("crop2",4300,2300),
		new Prop("crop2",4400,2300),
		new Prop("crop2",4500,2300),
		new Prop("crop2",4600,2300),
		new Prop("tree3",0,2400),
		new Prop("tree3",100,2400),
		new Prop("tree3",700,2400),
		new Prop("tree3",1300,2400),
		new Prop("tree3",1500,2400),
		new Prop("dirt",1900,2400),
		new Prop("dirt",2000,2400),
		new Prop("dirt",2100,2400),
		new Prop("tree3",2800,2400),
		new Prop("tree3",3400,2400),
		new Prop("tree3",4800,2400),
		new Prop("tree3",0,2500),
		new Prop("tree3",400,2500),
		new Prop("tree3",600,2500),
		new Prop("tree3",700,2500),
		new Prop("tree3",900,2500),
		new Prop("tree3",1000,2500),
		new Prop("tree3",1200,2500),
		new Prop("tree3",1500,2500),
		new Prop("tree3",1600,2500),
		new Prop("tree3",1800,2500),
		new Prop("dirt",2100,2500),
		new Prop("dirt",2200,2500),
		new Prop("tree3",2300,2500),
		new Prop("tree3",3100,2500),
		new Prop("fenceh",600,2600),
		new Prop("fenceh",700,2600),
		new Prop("fenceh",800,2600),
		new Prop("fenceh",900,2600),
		new Prop("fenceh",1000,2600),
		new Prop("fenceh",1100,2600),
		new Prop("fenceh",1200,2600),
		new Prop("fenceh",1300,2600),
		new Prop("fenceh",1400,2600),
		new Prop("fenceh",1500,2600),
		new Prop("fenceh",1600,2600),
		new Prop("fenceh",1700,2600),
		new Prop("fenceh",1800,2600),
		new Prop("fenceh",1900,2600),
		new Prop("fence",2000,2600),
		new Prop("dirt",2200,2600),
		new Prop("tree3",4700,2600),
		new Prop("tree3",4900,2600),
		new Prop("tree3",0,2700),
		new Prop("fencev",600,2700),
		new Prop("stablewall",700,2700),
		new Prop("stablewall",800,2700),
		new Prop("stablewall",900,2700),
		new Prop("stablewall",1000,2700),
		new Prop("stablewall",1100,2700),
		new Prop("dirt",1200,2700),
		new Prop("dirt",1300,2700),
		new Prop("dirt",1400,2700),
		new Prop("dirt",1500,2700),
		new Prop("dirt",1600,2700),
		new Prop("dirt",1700,2700),
		new Prop("dirt",1800,2700),
		new Prop("dirt",1900,2700),
		new Prop("fencev",2000,2700),
		new Prop("dirt",2200,2700),
		new Prop("grass",2500,2700),
		new Prop("grass",2600,2700),
		new Prop("grass",2700,2700),
		new Prop("grass",2800,2700),
		new Prop("grass",2900,2700),
		new Prop("grass",3000,2700),
		new Prop("grass",3100,2700),
		new Prop("grass",3200,2700),
		new Prop("grass",3300,2700),
		new Prop("grass",3400,2700),
		new Prop("grass",3500,2700),
		new Prop("grass",3600,2700),
		new Prop("grass",3700,2700),
		new Prop("grass",3800,2700),
		new Prop("tree3",0,2800),
		new Prop("tree3",100,2800),
		new Prop("tree3",200,2800),
		new Prop("fencev",600,2800),
		new Prop("stablewall",700,2800),
		new Prop("dirt",800,2800),
		new Prop("stablewall",900,2800),
		new Prop("dirt",1000,2800),
		new Prop("stablewall",1100,2800),
		new Prop("dirt",1200,2800),
		new Prop("dirt",1300,2800),
		new Prop("dirt",1400,2800),
		new Prop("dirt",1500,2800),
		new Prop("dirt",1600,2800),
		new Prop("dirt",1700,2800),
		new Prop("dirt",1800,2800),
		new Prop("dirt",1900,2800),
		new Prop("dirt",2200,2800),
		new Prop("grass",2500,2800),
		new Prop("grass",2600,2800),
		new Prop("grass",2700,2800),
		new Prop("grass",2800,2800),
		new Prop("grass",2900,2800),
		new Prop("grass",3000,2800),
		new Prop("grass",3100,2800),
		new Prop("grass",3200,2800),
		new Prop("grass",3300,2800),
		new Prop("grass",3400,2800),
		new Prop("grass",3500,2800),
		new Prop("grass",3600,2800),
		new Prop("grass",3700,2800),
		new Prop("grass",3800,2800),
		new Prop("tree3",4500,2800),
		new Prop("tree3",4700,2800),
		new Prop("fencev",600,2900),
		new Prop("dirt",700,2900),
		new Prop("dirt",800,2900),
		new Prop("dirt",900,2900),
		new Prop("dirt",1000,2900),
		new Prop("dirt",1100,2900),
		new Prop("dirt",1200,2900),
		new Prop("dirt",1300,2900),
		new Prop("dirt",1400,2900),
		new Prop("dirt",1500,2900),
		new Prop("dirt",1600,2900),
		new Prop("dirt",1700,2900),
		new Prop("dirt",1800,2900),
		new Prop("dirt",1900,2900),
		new Prop("fencev",2000,2900),
		new Prop("dirt",2200,2900),
		new Prop("grass",2500,2900),
		new Prop("grass",2600,2900),
		new Prop("grass",2700,2900),
		new Prop("grass",2800,2900),
		new Prop("grass",2900,2900),
		new Prop("grass",3000,2900),
		new Prop("grass",3100,2900),
		new Prop("grass",3200,2900),
		new Prop("grass",3300,2900),
		new Prop("grass",3400,2900),
		new Prop("grass",3500,2900),
		new Prop("grass",3600,2900),
		new Prop("grass",3700,2900),
		new Prop("grass",3800,2900),
		new Prop("tree3",4700,2900),
		new Prop("tree3",100,3000),
		new Prop("fencev",600,3000),
		new Prop("dirt",700,3000),
		new Prop("dirt",800,3000),
		new Prop("dirt",900,3000),
		new Prop("dirt",1000,3000),
		new Prop("dirt",1100,3000),
		new Prop("dirt",1200,3000),
		new Prop("dirt",1300,3000),
		new Prop("dirt",1400,3000),
		new Prop("dirt",1500,3000),
		new Prop("dirt",1600,3000),
		new Prop("dirt",1700,3000),
		new Prop("dirt",1800,3000),
		new Prop("dirt",1900,3000),
		new Prop("fencev",2000,3000),
		new Prop("dirt",2200,3000),
		new Prop("grass",2500,3000),
		new Prop("grass",2600,3000),
		new Prop("grass",2700,3000),
		new Prop("grass",2800,3000),
		new Prop("grass",2900,3000),
		new Prop("grass",3000,3000),
		new Prop("grass",3100,3000),
		new Prop("grass",3200,3000),
		new Prop("grass",3300,3000),
		new Prop("grass",3400,3000),
		new Prop("grass",3500,3000),
		new Prop("grass",3600,3000),
		new Prop("grass",3700,3000),
		new Prop("grass",3800,3000),
		new Prop("tree3",4300,3000),
		new Prop("tree3",4400,3000),
		new Prop("tree3",0,3100),
		new Prop("tree3",200,3100),
		new Prop("fencev",600,3100),
		new Prop("dirt",700,3100),
		new Prop("dirt",800,3100),
		new Prop("dirt",900,3100),
		new Prop("dirt",1000,3100),
		new Prop("dirt",1100,3100),
		new Prop("dirt",1200,3100),
		new Prop("dirt",1300,3100),
		new Prop("dirt",1400,3100),
		new Prop("dirt",1500,3100),
		new Prop("dirt",1600,3100),
		new Prop("dirt",1700,3100),
		new Prop("dirt",1800,3100),
		new Prop("dirt",1900,3100),
		new Prop("fencev",2000,3100),
		new Prop("dirt",2200,3100),
		new Prop("grass",2500,3100),
		new Prop("grass",2600,3100),
		new Prop("grass",2700,3100),
		new Prop("grass",2800,3100),
		new Prop("grass",2900,3100),
		new Prop("grass",3000,3100),
		new Prop("grass",3100,3100),
		new Prop("grass",3200,3100),
		new Prop("grass",3300,3100),
		new Prop("grass",3400,3100),
		new Prop("grass",3500,3100),
		new Prop("grass",3600,3100),
		new Prop("grass",3700,3100),
		new Prop("grass",3800,3100),
		new Prop("tree3",4100,3100),
		new Prop("tree3",4900,3100),
		new Prop("tree3",0,3200),
		new Prop("fencev",600,3200),
		new Prop("dirt",700,3200),
		new Prop("dirt",800,3200),
		new Prop("dirt",900,3200),
		new Prop("dirt",1000,3200),
		new Prop("dirt",1100,3200),
		new Prop("dirt",1200,3200),
		new Prop("dirt",1300,3200),
		new Prop("dirt",1400,3200),
		new Prop("dirt",1500,3200),
		new Prop("dirt",1600,3200),
		new Prop("dirt",1700,3200),
		new Prop("dirt",1800,3200),
		new Prop("dirt",1900,3200),
		new Prop("fencev",2000,3200),
		new Prop("dirt",2200,3200),
		new Prop("grass",2500,3200),
		new Prop("grass",2600,3200),
		new Prop("grass",2700,3200),
		new Prop("grass",2800,3200),
		new Prop("grass",2900,3200),
		new Prop("grass",3000,3200),
		new Prop("grass",3100,3200),
		new Prop("grass",3200,3200),
		new Prop("grass",3300,3200),
		new Prop("grass",3400,3200),
		new Prop("grass",3500,3200),
		new Prop("grass",3600,3200),
		new Prop("grass",3700,3200),
		new Prop("grass",3800,3200),
		new Prop("tree3",4400,3200),
		new Prop("tree3",0,3300),
		new Prop("tree3",200,3300),
		new Prop("tree3",500,3300),
		new Prop("fencev",600,3300),
		new Prop("dirt",700,3300),
		new Prop("dirt",800,3300),
		new Prop("dirt",900,3300),
		new Prop("dirt",1000,3300),
		new Prop("dirt",1100,3300),
		new Prop("dirt",1200,3300),
		new Prop("dirt",1300,3300),
		new Prop("dirt",1400,3300),
		new Prop("dirt",1500,3300),
		new Prop("dirt",1600,3300),
		new Prop("dirt",1700,3300),
		new Prop("dirt",1800,3300),
		new Prop("dirt",1900,3300),
		new Prop("fencev",2000,3300),
		new Prop("dirt",2200,3300),
		new Prop("grass",2500,3300),
		new Prop("grass",2600,3300),
		new Prop("grass",2700,3300),
		new Prop("grass",2800,3300),
		new Prop("grass",2900,3300),
		new Prop("grass",3000,3300),
		new Prop("grass",3100,3300),
		new Prop("grass",3200,3300),
		new Prop("grass",3300,3300),
		new Prop("grass",3400,3300),
		new Prop("grass",3500,3300),
		new Prop("grass",3600,3300),
		new Prop("grass",3700,3300),
		new Prop("grass",3800,3300),
		new Prop("tree3",4900,3300),
		new Prop("fencev",600,3400),
		new Prop("dirt",700,3400),
		new Prop("dirt",800,3400),
		new Prop("dirt",900,3400),
		new Prop("dirt",1000,3400),
		new Prop("dirt",1100,3400),
		new Prop("dirt",1200,3400),
		new Prop("dirt",1300,3400),
		new Prop("dirt",1400,3400),
		new Prop("dirt",1500,3400),
		new Prop("dirt",1600,3400),
		new Prop("dirt",1700,3400),
		new Prop("dirt",1800,3400),
		new Prop("dirt",1900,3400),
		new Prop("fencev",2000,3400),
		new Prop("dirt",2200,3400),
		new Prop("grass",2500,3400),
		new Prop("grass",2600,3400),
		new Prop("grass",2700,3400),
		new Prop("grass",2800,3400),
		new Prop("grass",2900,3400),
		new Prop("grass",3000,3400),
		new Prop("grass",3100,3400),
		new Prop("grass",3200,3400),
		new Prop("grass",3300,3400),
		new Prop("grass",3400,3400),
		new Prop("grass",3500,3400),
		new Prop("grass",3600,3400),
		new Prop("grass",3700,3400),
		new Prop("grass",3800,3400),
		new Prop("tree3",100,3500),
		new Prop("fencev",600,3500),
		new Prop("dirt",700,3500),
		new Prop("dirt",800,3500),
		new Prop("dirt",900,3500),
		new Prop("dirt",1000,3500),
		new Prop("dirt",1100,3500),
		new Prop("dirt",1200,3500),
		new Prop("dirt",1300,3500),
		new Prop("dirt",1400,3500),
		new Prop("dirt",1500,3500),
		new Prop("dirt",1600,3500),
		new Prop("dirt",1700,3500),
		new Prop("dirt",1800,3500),
		new Prop("dirt",1900,3500),
		new Prop("fencev",2000,3500),
		new Prop("dirtbl",2200,3500),
		new Prop("dirttr",2300,3500),
		new Prop("grass",2500,3500),
		new Prop("grass",2600,3500),
		new Prop("grass",2700,3500),
		new Prop("grass",2800,3500),
		new Prop("grass",2900,3500),
		new Prop("grass",3000,3500),
		new Prop("grass",3100,3500),
		new Prop("grass",3200,3500),
		new Prop("grass",3300,3500),
		new Prop("grass",3400,3500),
		new Prop("grass",3500,3500),
		new Prop("grass",3600,3500),
		new Prop("grass",3700,3500),
		new Prop("grass",3800,3500),
		new Prop("tree3",4600,3500),
		new Prop("tree3",4900,3500),
		new Prop("tree3",0,3600),
		new Prop("tree3",400,3600),
		new Prop("fenceh",700,3600),
		new Prop("fenceh",800,3600),
		new Prop("fenceh",900,3600),
		new Prop("fenceh",1000,3600),
		new Prop("fenceh",1100,3600),
		new Prop("fenceh",1200,3600),
		new Prop("fenceh",1300,3600),
		new Prop("fenceh",1400,3600),
		new Prop("fenceh",1500,3600),
		new Prop("fenceh",1600,3600),
		new Prop("fenceh",1700,3600),
		new Prop("fenceh",1800,3600),
		new Prop("fenceh",1900,3600),
		new Prop("fenceh",2000,3600),
		new Prop("dirt",2300,3600),
		new Prop("tree3",4400,3600),
		new Prop("tree3",0,3700),
		new Prop("tree3",100,3700),
		new Prop("dirt",2300,3700),
		new Prop("tree3",3300,3700),
		new Prop("tree3",3500,3700),
		new Prop("tree3",3900,3700),
		new Prop("tree3",4600,3700),
		new Prop("tree3",4800,3700),
		new Prop("tree3",4900,3700),
		new Prop("tree3",100,3800),
		new Prop("tree3",200,3800),
		new Prop("tree3",500,3800),
		new Prop("tree3",700,3800),
		new Prop("dirt",2300,3800),
		new Prop("dirttr",2400,3800),
		new Prop("tree3",3700,3800),
		new Prop("tree3",4100,3800),
		new Prop("tree3",4500,3800),
		new Prop("tree3",4700,3800),
		new Prop("tree3",0,3900),
		new Prop("tree3",200,3900),
		new Prop("tree3",300,3900),
		new Prop("tree3",500,3900),
		new Prop("tree3",800,3900),
		new Prop("tree3",1100,3900),
		new Prop("tree3",1300,3900),
		new Prop("tree3",1400,3900),
		new Prop("dirt",2300,3900),
		new Prop("dirt",2400,3900),
		new Prop("naturedoorh",2300,3900),
		new Prop("naturedoorh",2400,3900),
		new Prop("tree3",3500,3900),
		new Prop("tree3",3600,3900),
		new Prop("tree3",3800,3900),
		new Prop("tree3",4300,3900),
		new Prop("tree3",4500,3900),
		new Prop("tree3",4600,3900),
		new Prop("tree3",4800,3900),
		new Prop("tree3",4900,3900)
	];
	var village1 = [
		new Prop("tree2",0,0),
		new Prop("tree2",200,0),
		new Prop("tree2",300,0),
		new Prop("tree2",1100,0),
		new Prop("tree2",4200,0),
		new Prop("tree2",4300,0),
		new Prop("tree2",4700,0),
		new Prop("tree2",4900,0),
		new Prop("tree2",100,100),
		new Prop("tree2",700,100),
		new Prop("huttb1",800,100),
		new Prop("hutm",900,100),
		new Prop("huttb2",1000,100),
		new Prop("tree2",1200,100),
		new Prop("tree2",1700,100),
		new Prop("tree2",2400,100),
		new Prop("tree2",3600,100),
		new Prop("huttb1",3700,100),
		new Prop("hutm",3800,100),
		new Prop("huttb2",3900,100),
		new Prop("tree2",4000,100),
		new Prop("tree2",4400,100),
		new Prop("tree2",4500,100),
		new Prop("tree2",4600,100),
		new Prop("tree2",4700,100),
		new Prop("tree2",4800,100),
		new Prop("tree2",4900,100),
		new Prop("tree2",200,200),
		new Prop("tree2",400,200),
		new Prop("tree2",600,200),
		new Prop("hutm",800,200),
		new Prop("door3",900,200),
		new Prop("hutm",1000,200),
		new Prop("tree2",1100,200),
		new Prop("tree2",1500,200),
		new Prop("tree2",3500,200),
		new Prop("tree2",3600,200),
		new Prop("hutm",3700,200),
		new Prop("door3",3800,200),
		new Prop("hutm",3900,200),
		new Prop("tree2",4600,200),
		new Prop("tree2",4700,200),
		new Prop("tree2",4900,200),
		new Prop("tree2",0,300),
		new Prop("huttb1",2200,300),
		new Prop("hutm",2300,300),
		new Prop("huttb2",2400,300),
		new Prop("huttb1",2600,300),
		new Prop("hutm",2700,300),
		new Prop("huttb2",2800,300),
		new Prop("huttb1",3000,300),
		new Prop("hutm",3100,300),
		new Prop("huttb2",3200,300),
		new Prop("tablet",3600,300),
		new Prop("tableb",3700,300),
		new Prop("tableb",3800,300),
		new Prop("tableb",3900,300),
		new Prop("tableb",4100,300),
		new Prop("tableb",4200,300),
		new Prop("tableb",4300,300),
		new Prop("tableb",4400,300),
		new Prop("tableb",4500,300),
		new Prop("tableb",4600,300),
		new Prop("tableb",4700,300),
		new Prop("tree2",4800,300),
		new Prop("tree2",4900,300),
		new Prop("tree2",100,400),
		new Prop("hutm",2200,400),
		new Prop("door3",2300,400),
		new Prop("hutm",2400,400),
		new Prop("tree2",2500,400),
		new Prop("hutm",2600,400),
		new Prop("door3",2700,400),
		new Prop("hutm",2800,400),
		new Prop("tree2",2900,400),
		new Prop("hutm",3000,400),
		new Prop("door3",3100,400),
		new Prop("hutm",3200,400),
		new Prop("tree2",3300,400),
		new Prop("tablet",3600,400),
		new Prop("tablet",4700,400),
		new Prop("tree2",0,500),
		new Prop("tree2",800,500),
		new Prop("tree",1100,500),
		new Prop("huttb1",1400,500),
		new Prop("hutm",1500,500),
		new Prop("huttb2",1600,500),
		new Prop("hutta",2000,500),
		new Prop("tablet",3600,500),
		new Prop("tablet",4700,500),
		new Prop("tree2",4900,500),
		new Prop("tree2",600,600),
		new Prop("tree2",900,600),
		new Prop("tree2",1300,600),
		new Prop("hutm",1400,600),
		new Prop("door3",1500,600),
		new Prop("hutm",1600,600),
		new Prop("hutb1",1900,600),
		new Prop("hutm",2000,600),
		new Prop("hutb2",2100,600),
		new Prop("huttb1",3400,600),
		new Prop("hutm",3500,600),
		new Prop("huttb2",3600,600),
		new Prop("tablet",4700,600),
		new Prop("tree2",4900,600),
		new Prop("hutb1",1800,700),
		new Prop("hutm",1900,700),
		new Prop("hutm",2000,700),
		new Prop("hutm",2100,700),
		new Prop("hutb3",2200,700),
		new Prop("tree2",2300,700),
		new Prop("tree2",3300,700),
		new Prop("hutm",3400,700),
		new Prop("door3",3500,700),
		new Prop("hutm",3600,700),
		new Prop("tablet",4700,700),
		new Prop("tree2",1700,800),
		new Prop("hutb1",1800,800),
		new Prop("hutm",1900,800),
		new Prop("door3",2000,800),
		new Prop("hutm",2100,800),
		new Prop("hutb3",2200,800),
		new Prop("tree2",2400,800),
		new Prop("tablet",3600,800),
		new Prop("tablet",4700,800),
		new Prop("tree2",4800,800),
		new Prop("tablet",2800,900),
		new Prop("tablet",3600,900),
		new Prop("tableb",3700,900),
		new Prop("tableb",3800,900),
		new Prop("tableb",3900,900),
		new Prop("tableb",4000,900),
		new Prop("tableb",4100,900),
		new Prop("tableb",4200,900),
		new Prop("tableb",4300,900),
		new Prop("tableb",4400,900),
		new Prop("tableb",4500,900),
		new Prop("tableb",4600,900),
		new Prop("tableb",4700,900),
		new Prop("huttb1",600,1000),
		new Prop("hutm",700,1000),
		new Prop("huttb2",800,1000),
		new Prop("tablet",2800,1000),
		new Prop("tree2",3700,1000),
		new Prop("huttb1",3800,1000),
		new Prop("hutm",3900,1000),
		new Prop("huttb2",4000,1000),
		new Prop("tree2",4100,1000),
		new Prop("tree2",4200,1000),
		new Prop("tree2",100,1100),
		new Prop("tree2",200,1100),
		new Prop("hutm",600,1100),
		new Prop("door3",700,1100),
		new Prop("hutm,",800,1100),
		new Prop("huttb1",1200,1100),
		new Prop("hutm",1300,1100),
		new Prop("huttb2",1400,1100),
		new Prop("tableb",2000,1100),
		new Prop("tablet",2100,1100),
		new Prop("tree2",3600,1100),
		new Prop("hutm",3800,1100),
		new Prop("door3",3900,1100),
		new Prop("hutm",4000,1100),
		new Prop("tree2",4600,1100),
		new Prop("tree2",200,1200),
		new Prop("tree2",300,1200),
		new Prop("hutm",1200,1200),
		new Prop("door3",1300,1200),
		new Prop("hutm",1400,1200),
		new Prop("tableb",2100,1200),
		new Prop("tableb",2200,1200),
		new Prop("tableb",2300,1200),
		new Prop("tableb",2400,1200),
		new Prop("tableb",2500,1200),
		new Prop("tableb",2600,1200),
		new Prop("tablet",2700,1200),
		new Prop("tree2",4800,1200),
		new Prop("tableb",2700,1300),
		new Prop("tablet",2800,1300),
		new Prop("tree2",3200,1300),
		new Prop("tree2",3300,1300),
		new Prop("tree2",4200,1300),
		new Prop("tree2",4500,1300),
		new Prop("tree2",900,1400),
		new Prop("tree2",1000,1400),
		new Prop("tablet",2800,1400),
		new Prop("huttb1",3100,1400),
		new Prop("hutm",3200,1400),
		new Prop("huttb2",3300,1400),
		new Prop("tree2",3400,1400),
		new Prop("tree2",4000,1400),
		new Prop("tree2",4500,1400),
		new Prop("tree2",800,1500),
		new Prop("tree2",900,1500),
		new Prop("tree2",1000,1500),
		new Prop("tree2",1100,1500),
		new Prop("tablet",1600,1500),
		new Prop("campfire",2200,1500),
		new Prop("tablet",2800,1500),
		new Prop("tree2",3000,1500),
		new Prop("hutm",3100,1500),
		new Prop("door3",3200,1500),
		new Prop("hutm",3300,1500),
		new Prop("tree3",4700,1500),
		new Prop("tree2",1000,1600),
		new Prop("tableb",1600,1600),
		new Prop("tablet",1700,1600),
		new Prop("tablet",2800,1600),
		new Prop("tree2",4000,1600),
		new Prop("tree2",4300,1600),
		new Prop("tree2",1100,1700),
		new Prop("tableb",1700,1700),
		new Prop("tablet",1800,1700),
		new Prop("tablet",700,1700),
		new Prop("tableb",2800,1700),
		new Prop("tree2",3900,1700),
		new Prop("tree2",4400,1700),
		new Prop("tree2",4900,1700),
		new Prop("dirt",0,1800),
		new Prop("tree2",1600,1800),
		new Prop("tree2",1700,1800),
		new Prop("tableb",1800,1800),
		new Prop("tableb",1900,1800),
		new Prop("tableb",2000,1800),
		new Prop("tableb",2100,1800),
		new Prop("tableb",2200,1800),
		new Prop("tableb",2300,1800),
		new Prop("tableb",2400,1800),
		new Prop("tableb",2500,1800),
		new Prop("tableb",2600,1800),
		new Prop("tableb",2700,1800),
		new Prop("dirt",100,1900),
		new Prop("dirt",600,1900),
		new Prop("tree2",1700,1900),
		new Prop("huttb1",1800,1900),
		new Prop("hutm",1900,1900),
		new Prop("huttb2",2000,1900),
		new Prop("tree2",2100,1900),
		new Prop("tree2",4300,1900),
		new Prop("tree2",4400,1900),
		new Prop("tree2",4500,1900),
		new Prop("dirt",0,2000),
		new Prop("dirt",300,2000),
		new Prop("dirt",400,2000),
		new Prop("hutm",1800,2000),
		new Prop("door3",1900,2000),
		new Prop("hutm",2000,2000),
		new Prop("tree2",2900,2000),
		new Prop("tree2",3100,2000),
		new Prop("tree2",3300,2000),
		new Prop("huttb1",4100,2000),
		new Prop("hutm",4200,2000),
		new Prop("huttb2",4300,2000),
		new Prop("tableb",4400,2000),
		new Prop("tableb",4500,2000),
		new Prop("tableb",4600,2000),
		new Prop("tableb",4700,2000),
		new Prop("tableb",4800,2000),
		new Prop("tablet",4900,2000),
		new Prop("tree2",2900,2100),
		new Prop("huttb1",3000,2100),
		new Prop("hutm",3100,2100),
		new Prop("huttb2",3200,2100),
		new Prop("hutm",4100,2100),
		new Prop("door3",4200,2100),
		new Prop("hutm",4300,2100),
		new Prop("tablet",4900,2100),
		new Prop("dirt",100,2200),
		new Prop("dirt",500,2200),
		new Prop("tree2",1600,2200),
		new Prop("tree2",2400,2200),
		new Prop("tree2",2600,2200),
		new Prop("hutm",3000,2200),
		new Prop("door3",3100,2200),
		new Prop("hutm",3200,2200),
		new Prop("tree2",3800,2200),
		new Prop("tablet",3900,2200),
		new Prop("tablet",4900,2200),
		new Prop("dirt",0,2300),
		new Prop("dirt",100,2300),
		new Prop("dirt",200,2300),
		new Prop("dirt",700,2300),
		new Prop("tree2",1500,2300),
		new Prop("huttb1",1600,2300),
		new Prop("hutm",1700,2300),
		new Prop("huttb2",1800,2300),
		new Prop("tree2",1900,2300),
		new Prop("tree2",2200,2300),
		new Prop("tablet",3800,2300),
		new Prop("tableb",3900,2300),
		new Prop("tablet",4900,2300),
		new Prop("dirt",0,2400),
		new Prop("dirt",100,2400),
		new Prop("dirt",200,2400),
		new Prop("dirt",300,2400),
		new Prop("hutm",1600,2400),
		new Prop("door3",1700,2400),
		new Prop("hutm",1800,2400),
		new Prop("tree2",2600,2400),
		new Prop("tree2",2900,2400),
		new Prop("tablet",3800,2400),
		new Prop("tablet",4900,2400),
		new Prop("dirt",0,2500),
		new Prop("dirt",100,2500),
		new Prop("dirt",200,2500),
		new Prop("dirt",300,2500),
		new Prop("dirt",400,2500),
		new Prop("dirt",500,2500),
		new Prop("tree2",2500,2500),
		new Prop("tree2",2600,2500),
		new Prop("tree2",2700,2500),
		new Prop("tree2",2800,2500),
		new Prop("tablet",3800,2500),
		new Prop("tablet",4900,2500),
		new Prop("dirt",0,2600),
		new Prop("dirt",100,2600),
		new Prop("dirt",200,2600),
		new Prop("dirt",300,2600),
		new Prop("dirt",400,2600),
		new Prop("dirt",500,2600),
		new Prop("dirt",600,2600),
		new Prop("dirt",700,2600),
		new Prop("tree2",1000,2600),
		new Prop("tree2",2400,2600),
		new Prop("huttb1",2500,2600),
		new Prop("hutm",2600,2600),
		new Prop("huttb2",2700,2600),
		new Prop("tree2",2800,2600),
		new Prop("tree2",3700,2600),
		new Prop("tablet",3800,2600),
		new Prop("tablet",4900,2600),
		new Prop("dirt",0,2700),
		new Prop("dirt",100,2700),
		new Prop("dirt",200,2700),
		new Prop("dirt",300,2700),
		new Prop("dirt",400,2700),
		new Prop("dirt",500,2700),
		new Prop("dirt",600,2700),
		new Prop("dirt",700,2700),
		new Prop("dirt",800,2700),
		new Prop("dirt",900,2700),
		new Prop("tree2",1300,2700),
		new Prop("hutm",2500,2700),
		new Prop("door3",2600,2700),
		new Prop("hutm",2700,2700),
		new Prop("tree2",3600,2700),
		new Prop("tree2",3700,2700),
		new Prop("tableb",3800,2700),
		new Prop("tableb",3900,2700),
		new Prop("tableb",4000,2700),
		new Prop("tableb",4100,2700),
		new Prop("tableb",4200,2700),
		new Prop("tableb",4300,2700),
		new Prop("tableb",4400,2700),
		new Prop("tableb",4500,2700),
		new Prop("tableb",4600,2700),
		new Prop("tableb",4700,2700),
		new Prop("tableb",4800,2700),
		new Prop("tableb",4900,2700)
	];
	var village2 = [
		new Prop("tree1",0,0),
		new Prop("tree1",100,0),
		new Prop("tree1",200,0),
		new Prop("tree1",300,0),
		new Prop("tree1",400,0),
		new Prop("tree1",500,0),
		new Prop("tree1",600,0),
		new Prop("tree1",700,0),
		new Prop("tree1",800,0),
		new Prop("tree1",1100,0),
		new Prop("tree1",1300,0),
		new Prop("tree1",1400,0),
		new Prop("tree1",1800,0),
		new Prop("tree1",1900,0),
		new Prop("tree1",2200,0),
		new Prop("tree1",2300,0),
		new Prop("tree1",2400,0),
		new Prop("tree1",2500,0),
		new Prop("tree1",2700,0),
		new Prop("tree1",3000,0),
		new Prop("tree1",3100,0),
		new Prop("tree1",3300,0),
		new Prop("tree1",3500,0),
		new Prop("tree1",3600,0),
		new Prop("tree1",3700,0),
		new Prop("tree1",3900,0),
		new Prop("tree1",4300,0),
		new Prop("tree1",4500,0),
		new Prop("tree1",4700,0),
		new Prop("tree1",4800,0),
		new Prop("tree1",4900,0),
		new Prop("tablet",0,100),
		new Prop("tableb",100,100),
		new Prop("tableb",200,100),
		new Prop("tableb",300,100),
		new Prop("tableb",400,100),
		new Prop("tableb",500,100),
		new Prop("tableb",600,100),
		new Prop("tableb",700,100),
		new Prop("tablet",800,100),
		new Prop("tree1",900,100),
		new Prop("tree1",1000,100),
		new Prop("tree1",1200,100),
		new Prop("tree1",2100,100),
		new Prop("tree1",2400,100),
		new Prop("tree1",2600,100),
		new Prop("tree1",2900,100),
		new Prop("tree1",3100,100),
		new Prop("tree1",3400,100),
		new Prop("tree1",3500,100),
		new Prop("tree1",4200,100),
		new Prop("tree1",4400,100),
		new Prop("tree1",4500,100),
		new Prop("tree1",4700,100),
		new Prop("tree1",4800,100),
		new Prop("tree1",4900,100),
		new Prop("tableb",0,200),
		new Prop("tableb",800,200),
		new Prop("tableb",900,200),
		new Prop("tablet",1000,200),
		new Prop("tree1",1100,200),
		new Prop("",1200,200),
		new Prop("",1300,200),
		new Prop("",1400,200),
		new Prop("huttb1",1500,200),
		new Prop("hutm",1600,200),
		new Prop("huttb2",1700,200),
		new Prop("tree1",2800,200),
		new Prop("tree1",4400,200),
		new Prop("tree1",4600,200),
		new Prop("tree1",4700,200),
		new Prop("tree1",4900,200),
		new Prop("tablet",1000,300),
		new Prop("hutm",1500,300),
		new Prop("door2",1600,300),
		new Prop("hutm",1700,300),
		new Prop("tree1",1800,300),
		new Prop("tree1",4700,300),
		new Prop("tree1",4800,300),
		new Prop("tablet",1000,400),
		new Prop("tree1",1100,400),
		new Prop("tableb",1800,400),
		new Prop("tableb",1900,400),
		new Prop("tableb",2000,400),
		new Prop("tableb",2100,400),
		new Prop("tree1",3800,400),
		new Prop("huttb1",3900,400),
		new Prop("hutm",4000,400),
		new Prop("huttb2",4100,400),
		new Prop("tree1",4200,400),
		new Prop("tree1",4400,400),
		new Prop("tree1",4600,400),
		new Prop("tree1",4900,400),
		new Prop("tablet",1000,500),
		new Prop("hutta",3300,500),
		new Prop("tree1",3600,500),
		new Prop("tree1",3800,500),
		new Prop("hutm",3900,500),
		new Prop("door2",4000,500),
		new Prop("hutm",4100,500),
		new Prop("tree1",4700,500),
		new Prop("tablet",1000,600),
		new Prop("tree1",2600,600),
		new Prop("tree1",2800,600),
		new Prop("tree1",2900,600),
		new Prop("tree1",3000,600),
		new Prop("tree1",3100,600),
		new Prop("hutb1",3200,600),
		new Prop("hutm",3300,600),
		new Prop("hutb3",3400,600),
		new Prop("tableb",3500,600),
		new Prop("tableb",3600,600),
		new Prop("tableb",3700,600),
		new Prop("tableb",3800,600),
		new Prop("tableb",3900,600),
		new Prop("tableb",100,700),
		new Prop("tablet",200,700),
		new Prop("tablet",900,700),
		new Prop("tableb",1000,700),
		new Prop("tree1",2000,700),
		new Prop("tree1",2400,700),
		new Prop("tree1",2600,700),
		new Prop("hutb1",3100,700),
		new Prop("hutm",3200,700),
		new Prop("hutm",3300,700),
		new Prop("hutm",3400,700),
		new Prop("hutb3",3500,700),
		new Prop("tree1",3600,700),
		new Prop("tree1",4600,700),
		new Prop("huttb1",4700,700),
		new Prop("hutm",4800,700),
		new Prop("huttb2",4900,700),
		new Prop("tableb",200,800),
		new Prop("tableb",300,800),
		new Prop("tablet",400,800),
		new Prop("",500,800),
		new Prop("tablet",800,800),
		new Prop("tableb",900,800),
		new Prop("tree1",1000,800),
		new Prop("tree1",1100,800),
		new Prop("tree1",2900,800),
		new Prop("hutb1",3100,800),
		new Prop("hutm",3200,800),
		new Prop("door2",3300,800),
		new Prop("hutm",3400,800),
		new Prop("hutb3",3500,800),
		new Prop("tree1",3700,800),
		new Prop("hutm",4700,800),
		new Prop("door2",4800,800),
		new Prop("hutm",4900,800),
		new Prop("tree1",300,900),
		new Prop("tableb",400,900),
		new Prop("tableb",500,900),
		new Prop("tableb",600,900),
		new Prop("tableb",700,900),
		new Prop("tableb",800,900),
		new Prop("huttb1",900,900),
		new Prop("hutm",1000,900),
		new Prop("huttb2",1100,900),
		new Prop("tree1",2100,900),
		new Prop("tree1",2200,900),
		new Prop("tree1",2800,900),
		new Prop("tree1",4300,900),
		new Prop("tree1",4400,900),
		new Prop("tree1",800,1000),
		new Prop("hutm",900,1000),
		new Prop("door2",1000,1000),
		new Prop("hutm",1100,1000),
		new Prop("huttb1",1700,1000),
		new Prop("hutm",1800,1000),
		new Prop("huttb2",1900,1000),
		new Prop("huttb1",3600,1000),
		new Prop("hutm",3700,1000),
		new Prop("huttb2",3800,1000),
		new Prop("huttb1",4300,1000),
		new Prop("hutm",4400,1000),
		new Prop("huttb2",4500,1000),
		new Prop("tree1",4600,1000),
		new Prop("tree1",1600,1100),
		new Prop("hutm",1700,1100),
		new Prop("door2",1800,1100),
		new Prop("hutm",1900,1100),
		new Prop("tree1",2800,1100),
		new Prop("hutm",3600,1100),
		new Prop("door2",3700,1100),
		new Prop("hutm",3800,1100),
		new Prop("hutm",4300,1100),
		new Prop("door2",4400,1100),
		new Prop("hutm",4500,1100),
		new Prop("tree1",0,1200),
		new Prop("tree1",2400,1200),
		new Prop("tree1",2700,1200),
		new Prop("tree1",3200,1200),
		new Prop("tree1",100,1400),
		new Prop("tree1",300,1400),
		new Prop("huttb1",4000,1400),
		new Prop("hutm",4100,1400),
		new Prop("huttb2",4200,1400),
		new Prop("tree1",0,1500),
		new Prop("tableb",3700,1500),
		new Prop("tablet",3800,1500),
		new Prop("tree1",3900,1500),
		new Prop("hutm",4000,1500),
		new Prop("door2",4100,1500),
		new Prop("hutm",4200,1500),
		new Prop("tree1",4300,1500),
		new Prop("tree1",4400,1500),
		new Prop("tree1",200,1600),
		new Prop("huttb1",1100,1600),
		new Prop("hutm",1200,1600),
		new Prop("huttb2",1300,1600),
		new Prop("tree1",1400,1600),
		new Prop("huttb1",1500,1600),
		new Prop("hutm",1600,1600),
		new Prop("huttb2",1700,1600),
		new Prop("tableb",3800,1600),
		new Prop("tablet",3900,1600),
		new Prop("tree1",0,1700),
		new Prop("tree1",100,1700),
		new Prop("tree1",300,1700),
		new Prop("tree1",1000,1700),
		new Prop("hutm",1100,1700),
		new Prop("door2",1200,1700),
		new Prop("hutm",1300,1700),
		new Prop("hutm",1500,1700),
		new Prop("door2",1600,1700),
		new Prop("hutm",1700,1700),
		new Prop("tree1",1800,1700),
		new Prop("campfire",2700,1700),
		new Prop("tree1",3700,1700),
		new Prop("tableb",3900,1700),
		new Prop("tableb",4000,1700),
		new Prop("tablet",4100,1700),
		new Prop("tree1",100,1800),
		new Prop("tree1",300,1800),
		new Prop("tree1",400,1800),
		new Prop("tableb",4100,1800),
		new Prop("tableb",4200,1800),
		new Prop("tree1",200,1900),
		new Prop("tree1",300,1900),
		new Prop("tree1",500,1900),
		new Prop("huttb1",4500,1900),
		new Prop("hutm",4600,1900),
		new Prop("huttb2",4700,1900),
		new Prop("tablet",3300,2000),
		new Prop("table",3400,2000),
		new Prop("tableb",3500,2000),
		new Prop("tableb",3600,2000),
		new Prop("tableb",3700,2000),
		new Prop("tableb",3800,2000),
		new Prop("tableb",3900,2000),
		new Prop("hutm",4500,2000),
		new Prop("door2",4600,2000),
		new Prop("hutm",4700,2000),
		new Prop("tree1",4900,2000),
		new Prop("tree1",0,2100),
		new Prop("tree1",400,2100),
		new Prop("tree1",700,2100),
		new Prop("huttb1",800,2100),
		new Prop("hutm",900,2100),
		new Prop("huttb2",1000,2100),
		new Prop("tree1",1100,2100),
		new Prop("wellt",1400,2100),
		new Prop("tablet",3100,2100),
		new Prop("tableb",3200,2100),
		new Prop("tableb",3300,2100),
		new Prop("tree1",4900,2100),
		new Prop("tree1",100,2200),
		new Prop("hutm",800,2200),
		new Prop("door2",900,2200),
		new Prop("hutm",1000,2200),
		new Prop("wellb",1400,2200),
		new Prop("tablet",2900,2200),
		new Prop("tableb",3000,2200),
		new Prop("tableb",3100,2200),
		new Prop("tree1",3800,2200),
		new Prop("water",3900,2200),
		new Prop("water",4000,2200),
		new Prop("water",4100,2200),
		new Prop("water",4800,2200),
		new Prop("water",4900,2200),
		new Prop("tree1",0,2300),
		new Prop("huttb1",1700,2300),
		new Prop("hutm",1800,2300),
		new Prop("huttb2",1900,2300),
		new Prop("tree1",2000,2300),
		new Prop("tableb",2800,2300),
		new Prop("tableb",2900,2300),
		new Prop("water",3500,2300),
		new Prop("water",3600,2300),
		new Prop("water",3700,2300),
		new Prop("water",3800,2300),
		new Prop("water",3900,2300),
		new Prop("water",4000,2300),
		new Prop("water",4100,2300),
		new Prop("water",4200,2300),
		new Prop("water",4300,2300),
		new Prop("water",4400,2300),
		new Prop("water",4600,2300),
		new Prop("water",4700,2300),
		new Prop("water",4800,2300),
		new Prop("water",4900,2300),
		new Prop("tree1",0,2400),
		new Prop("tree1",200,2400),
		new Prop("tablet",1200,2400),
		new Prop("tree1",1600,2400),
		new Prop("hutm",1700,2400),
		new Prop("door2",1800,2400),
		new Prop("hutm",1900,2400),
		new Prop("water",3200,2400),
		new Prop("water",3300,2400),
		new Prop("water",3400,2400),
		new Prop("water",3500,2400),
		new Prop("water",3600,2400),
		new Prop("water",3700,2400),
		new Prop("water",3800,2400),
		new Prop("water",3900,2400),
		new Prop("water",4000,2400),
		new Prop("water",4100,2400),
		new Prop("water",4200,2400),
		new Prop("water",4300,2400),
		new Prop("water",4400,2400),
		new Prop("water",4500,2400),
		new Prop("water",4600,2400),
		new Prop("water",4700,2400),
		new Prop("water",4800,2400),
		new Prop("water",4900,2400),
		new Prop("tree1",100,2500),
		new Prop("tree1",200,2500),
		new Prop("tree1",400,2500),
		new Prop("tree1",500,2500),
		new Prop("tableb",1200,2500),
		new Prop("tablet",1300,2500),
		new Prop("tree1",2400,2500),
		new Prop("huttb1",2500,2500),
		new Prop("hutm",2600,2500),
		new Prop("huttb2",2700,2500),
		new Prop("tree1",2900,2500),
		new Prop("water",3100,2500),
		new Prop("water",3200,2500),
		new Prop("water",3300,2500),
		new Prop("water",3400,2500),
		new Prop("water",3500,2500),
		new Prop("water",3600,2500),
		new Prop("water",3700,2500),
		new Prop("water",3800,2500),
		new Prop("water",3900,2500),
		new Prop("water",4000,2500),
		new Prop("water",4100,2500),
		new Prop("water",4200,2500),
		new Prop("water",4300,2500),
		new Prop("water",4400,2500),
		new Prop("water",4500,2500),
		new Prop("water",4600,2500),
		new Prop("water",4700,2500),
		new Prop("water",4800,2500),
		new Prop("water",4900,2500),
		new Prop("tree1",0,2600),
		new Prop("tree1",100,2600),
		new Prop("tree1",300,2600),
		new Prop("tree1",400,2600),
		new Prop("huttb1",500,2600),
		new Prop("hutm",600,2600),
		new Prop("huttb2",700,2600),
		new Prop("tableb",1300,2600),
		new Prop("tableb",1400,2600),
		new Prop("tableb",1500,2600),
		new Prop("tableb",1600,2600),
		new Prop("tableb",1700,2600),
		new Prop("tableb",1800,2600),
		new Prop("tableb",1900,2600),
		new Prop("tree1",2300,2600),
		new Prop("hutm",2500,2600),
		new Prop("door2",2600,2600),
		new Prop("hutm",2700,2600),
		new Prop("tree1",2800,2600),
		new Prop("tree1",2900,2600),
		new Prop("water",3200,2600),
		new Prop("water",3300,2600),
		new Prop("water",3400,2600),
		new Prop("water",3500,2600),
		new Prop("water",3600,2600),
		new Prop("water",3700,2600),
		new Prop("water",3800,2600),
		new Prop("water",3900,2600),
		new Prop("water",4000,2600),
		new Prop("water",4100,2600),
		new Prop("water",4200,2600),
		new Prop("water",4300,2600),
		new Prop("water",4400,2600),
		new Prop("water",4500,2600),
		new Prop("water",4600,2600),
		new Prop("water",4700,2600),
		new Prop("water",4800,2600),
		new Prop("water",4900,2600),
		new Prop("tree1",0,2700),
		new Prop("tree1",100,2700),
		new Prop("tree1",200,2700),
		new Prop("tree1",300,2700),
		new Prop("tree1",400,2700),
		new Prop("hutm",500,2700),
		new Prop("door2",600,2700),
		new Prop("hutm",700,2700),
		new Prop("tree1",800,2700),
		new Prop("water",3400,2700),
		new Prop("water",3500,2700),
		new Prop("water",3600,2700),
		new Prop("water",3700,2700),
		new Prop("water",3800,2700),
		new Prop("water",3900,2700),
		new Prop("water",4000,2700),
		new Prop("water",4100,2700),
		new Prop("water",4200,2700),
		new Prop("water",4300,2700),
		new Prop("water",4400,2700),
		new Prop("water",4500,2700),
		new Prop("water",4600,2700),
		new Prop("water",4700,2700),
		new Prop("water",4800,2700),
		new Prop("water",4900,2700)
	];
	var officedistrict = [
		new Prop("blank",0,0),
		new Prop("cobblestone",1600,0),
		new Prop("cobblestone",300,100),
		new Prop("broof6",400,100),
		new Prop("broof6",500,100),
		new Prop("broof6",600,100),
		new Prop("broof2",700,100),
		new Prop("broof2",800,100),
		new Prop("broof2",900,100),
		new Prop("cobblestone",1000,100),
		new Prop("broof6",1100,100),
		new Prop("broof6",1200,100),
		new Prop("broof6",1300,100),
		new Prop("cobblestone",1400,100),
		new Prop("cobblestone",1500,100),
		new Prop("cobblestone",1600,100),
		new Prop("sign2",1700,100),
		new Prop("cobblestone",100,200),
		new Prop("cobblestone",200,200),
		new Prop("cobblestone",300,200),
		new Prop("bwall6",400,200),
		new Prop("door1",500,200),
		new Prop("bwall6",600,200),
		new Prop("bwall2",700,200),
		new Prop("door1",800,200),
		new Prop("bwall2",900,200),
		new Prop("sign1",1000,200),
		new Prop("bwall6",1100,200),
		new Prop("door1",1200,200),
		new Prop("bwall6",1300,200),
		new Prop("sign2",1500,200),
		new Prop("cobblestone",1600,200),
		new Prop("cobblestone",1700,200),
		new Prop("cobblestone",1800,200),
		new Prop("cobblestone",1900,200),
		new Prop("cobblestone",2000,200),
		new Prop("cobblestone",2100,200),
		new Prop("cobblestone",2200,200),
		new Prop("cobblestone",2300,200),
		new Prop("cobblestone",2400,200),
		new Prop("cobblestone",2500,200),
		new Prop("cobblestone",2600,200),
		new Prop("cobblestone",2700,200),
		new Prop("cobblestone",2800,200),
		new Prop("cobblestone",2900,200),
		new Prop("cobblestone",3000,200),
		new Prop("cobblestone",3100,200),
		new Prop("cobblestone",3200,200),
		new Prop("cobblestone",3300,200),
		new Prop("cobblestone",3400,200),
		new Prop("cobblestone",3500,200),
		new Prop("cobblestone",3600,200),
		new Prop("cobblestone",100,300),
		new Prop("cobblestone",1600,300),
		new Prop("broof2",2200,300),
		new Prop("broof2",2300,300),
		new Prop("broof2",2400,300),
		new Prop("broof6",2900,300),
		new Prop("broof6",3000,300),
		new Prop("broof6",3100,300),
		new Prop("broof6",3200,300),
		new Prop("broof6",3300,300),
		new Prop("broof6",3400,300),
		new Prop("broof6",3500,300),
		new Prop("cobblestone",3600,300),
		new Prop("cobblestone",100,400),
		new Prop("broof1",300,400),
		new Prop("broof1",400,400),
		new Prop("broof1",500,400),
		new Prop("broof6",600,400),
		new Prop("broof6",700,400),
		new Prop("broof6",800,400),
		new Prop("broof4",900,400),
		new Prop("broof4",1000,400),
		new Prop("broof4",1100,400),
		new Prop("broof1",1200,400),
		new Prop("broof1",1300,400),
		new Prop("broof1",1400,400),
		new Prop("cobblestone",1600,400),
		new Prop("broof1",1800,400),
		new Prop("broof1",1900,400),
		new Prop("broof1",2000,400),
		new Prop("bwall2",2200,400),
		new Prop("bwall2",2300,400),
		new Prop("storesign1",2300,400),
		new Prop("bwall2",2400,400),
		new Prop("bwall6",2900,400),
		new Prop("bwall6",3000,400),
		new Prop("bwall6",3100,400),
		new Prop("bwall6",3200,400),
		new Prop("bwall6",3300,400),
		new Prop("bwall6",3400,400),
		new Prop("bwall6",3500,400),
		new Prop("cobblestone",3600,400),
		new Prop("cobblestone",100,500),
		new Prop("bwall1",300,500),
		new Prop("door1",400,500),
		new Prop("bwall1",500,500),
		new Prop("bwall6",600,500),
		new Prop("door1",700,500),
		new Prop("bwall6",800,500),
		new Prop("bwall4",900,500),
		new Prop("door1",1000,500),
		new Prop("bwall4",1100,500),
		new Prop("bwall1",1200,500),
		new Prop("door1",1300,500),
		new Prop("bwall1",1400,500),
		new Prop("cobblestone",1600,500),
		new Prop("bwall1",1800,500),
		new Prop("bwall1",1900,500),
		new Prop("bwall1",2000,500),
		new Prop("bwall2",2200,500),
		new Prop("bwall2",2300,500),
		new Prop("bwall2",2400,500),
		new Prop("broof1",2600,500),
		new Prop("broof1",2700,500),
		new Prop("broof1",2800,500),
		new Prop("bwall6",2900,500),
		new Prop("bwall6",3000,500),
		new Prop("bwall6",3100,500),
		new Prop("bwall6",3200,500),
		new Prop("bwall6",3300,500),
		new Prop("bwall6",3400,500),
		new Prop("bwall6",3500,500),
		new Prop("cobblestone",3600,500),
		new Prop("cobblestone",100,600),
		new Prop("cobblestone",400,600),
		new Prop("cobblestone",700,600),
		new Prop("cobblestone",1000,600),
		new Prop("cobblestone",1300,600),
		new Prop("cobblestone",1600,600),
		new Prop("bwall1",1800,600),
		new Prop("door1",1900,600),
		new Prop("bwall1",2000,600),
		new Prop("bwall2",2200,600),
		new Prop("door1",2300,600),
		new Prop("bwall2",2400,600),
		new Prop("bwall1",2600,600),
		new Prop("door1",2700,600),
		new Prop("bwall1",2800,600),
		new Prop("bwall6",2900,600),
		new Prop("door1",3000,600),
		new Prop("bwall6",3100,600),
		new Prop("door1",3200,600),
		new Prop("bwall6",3300,600),
		new Prop("door1",3400,600),
		new Prop("bwall6",3500,600),
		new Prop("cobblestone",3600,600),
		new Prop("cobblestone",100,700),
		new Prop("cobblestone",200,700),
		new Prop("cobblestone",300,700),
		new Prop("cobblestone",400,700),
		new Prop("cobblestone",500,700),
		new Prop("broof6",600,700),
		new Prop("broof6",700,700),
		new Prop("broof6",800,700),
		new Prop("broof2",900,700),
		new Prop("broof2",1000,700),
		new Prop("broof2",1100,700),
		new Prop("cobblestone",1200,700),
		new Prop("cobblestone",1300,700),
		new Prop("cobblestone",1400,700),
		new Prop("cobblestone",1500,700),
		new Prop("cobblestone",1600,700),
		new Prop("sign2",1700,700),
		new Prop("cobblestone",1900,700),
		new Prop("cobblestone",2300,700),
		new Prop("cobblestone",2700,700),
		new Prop("cobblestone",3600,700),
		new Prop("cobblestone",100,800),
		new Prop("cobblestone",500,800),
		new Prop("bwall6",600,800),
		new Prop("door2",700,800),
		new Prop("bwall6",800,800),
		new Prop("bwall2",900,800),
		new Prop("door2",1000,800),
		new Prop("bwall2",1100,800),
		new Prop("cobblestone",1600,800),
		new Prop("cobblestone",1700,800),
		new Prop("cobblestone",1800,800),
		new Prop("cobblestone",1900,800),
		new Prop("cobblestone",2000,800),
		new Prop("cobblestone",2100,800),
		new Prop("cobblestone",2200,800),
		new Prop("cobblestone",2300,800),
		new Prop("cobblestone",2400,800),
		new Prop("cobblestone",2500,800),
		new Prop("cobblestone",2600,800),
		new Prop("cobblestone",2700,800),
		new Prop("cobblestone",2800,800),
		new Prop("cobblestone",2900,800),
		new Prop("cobblestone",3000,800),
		new Prop("cobblestone",3100,800),
		new Prop("cobblestone",3200,800),
		new Prop("cobblestone",3300,800),
		new Prop("cobblestone",3400,800),
		new Prop("cobblestone",3500,800),
		new Prop("cobblestone",3600,800),
		new Prop("cobblestone",100,900),
		new Prop("broof4",200,900),
		new Prop("broof4",300,900),
		new Prop("broof4",400,900),
		new Prop("cobblestone",500,900),
		new Prop("cobblestone",700,900),
		new Prop("cobblestone",1000,900),
		new Prop("broof2",1300,900),
		new Prop("broof2",1400,900),
		new Prop("broof2",1500,900),
		new Prop("cobblestone",1600,900),
		new Prop("cobblestone",3500,900),
		new Prop("cobblestone",100,1000),
		new Prop("bwall4",200,1000),
		new Prop("door1",300,1000),
		new Prop("bwall4",400,1000),
		new Prop("cobblestone",500,1000),
		new Prop("cobblestone",600,1000),
		new Prop("cobblestone",700,1000),
		new Prop("cobblestone",800,1000),
		new Prop("cobblestone",900,1000),
		new Prop("cobblestone",1000,1000),
		new Prop("cobblestone",1100,1000),
		new Prop("bwall2",1300,1000),
		new Prop("door1",1400,1000),
		new Prop("bwall2",1500,1000),
		new Prop("cobblestone",1600,1000),
		new Prop("broof6",1800,1000),
		new Prop("broof6",1900,1000),
		new Prop("broof6",2000,1000),
		new Prop("broof4",2400,1000),
		new Prop("broof4",2500,1000),
		new Prop("broof4",2600,1000),
		new Prop("broof4",2700,1000),
		new Prop("broof4",2800,1000),
		new Prop("broof4",2900,1000),
		new Prop("cobblestone",3500,1000),
		new Prop("cobblestone",100,1100),
		new Prop("broof1",600,1100),
		new Prop("broof1",700,1100),
		new Prop("broof1",800,1100),
		new Prop("broof1",900,1100),
		new Prop("cobblestone",1100,1100),
		new Prop("cobblestone",1400,1100),
		new Prop("cobblestone",1600,1100),
		new Prop("bwall6",1800,1100),
		new Prop("bwall6",1900,1100),
		new Prop("bwall6",2000,1100),
		new Prop("broof2",2100,1100),
		new Prop("broof2",2200,1100),
		new Prop("broof2",2300,1100),
		new Prop("bwall4",2400,1100),
		new Prop("bwall4",2500,1100),
		new Prop("bwall4",2600,1100),
		new Prop("bwall4",2700,1100),
		new Prop("storesign5",2600,1100),
		new Prop("storesign5",2700,1100),
		new Prop("bwall4",2800,1100),
		new Prop("bwall4",2900,1100),
		new Prop("broof1",3100,1100),
		new Prop("broof1",3200,1100),
		new Prop("broof1",3300,1100),
		new Prop("cobblestone",3500,1100),
		new Prop("cobblestone",100,1200),
		new Prop("bwall1",600,1200),
		new Prop("bwall1",700,1200),
		new Prop("bwall1",800,1200),
		new Prop("bwall1",900,1200),
		new Prop("cobblestone",1100,1200),
		new Prop("cobblestone",1200,1200),
		new Prop("cobblestone",1300,1200),
		new Prop("cobblestone",1400,1200),
		new Prop("cobblestone",1500,1200),
		new Prop("cobblestone",1600,1200),
		new Prop("bwall6",1800,1200),
		new Prop("door1",1900,1200),
		new Prop("bwall6",2000,1200),
		new Prop("bwall2",2100,1200),
		new Prop("door1",2200,1200),
		new Prop("bwall2",2300,1200),
		new Prop("bwall4",2400,1200),
		new Prop("door1",2500,1200),
		new Prop("bwall4",2600,1200),
		new Prop("bwall4",2700,1200),
		new Prop("door1",2800,1200),
		new Prop("bwall4",2900,1200),
		new Prop("bwall1",3100,1200),
		new Prop("door1",3200,1200),
		new Prop("bwall1",3300,1200),
		new Prop("cobblestone",3500,1200),
		new Prop("cobblestone",100,1300),
		new Prop("broof4",300,1300),
		new Prop("broof4",400,1300),
		new Prop("broof4",500,1300),
		new Prop("bwall1",600,1300),
		new Prop("bwall1",700,1300),
		new Prop("bwall1",800,1300),
		new Prop("storesign2",800,1300),
		new Prop("storesign2",900,1300),
		new Prop("bwall1",1000,1300),
		new Prop("broof2",1100,1300),
		new Prop("broof2",1200,1300),
		new Prop("broof2",1300,1300),
		new Prop("broof2",1400,1300),
		new Prop("cobblestone",1600,1300),
		new Prop("cobblestone",1900,1300),
		new Prop("cobblestone",2200,1300),
		new Prop("cobblestone",2500,1300),
		new Prop("cobblestone",2800,1300),
		new Prop("cobblestone",3200,1300),
		new Prop("cobblestone",3500,1300),
		new Prop("sign2",3600,1300),
		new Prop("cobblestone",100,1400),
		new Prop("bwall4",300,1400),
		new Prop("bwall4",400,1400),
		new Prop("bwall4",500,1400),
		new Prop("bwall1",600,1400),
		new Prop("bwall1",700,1400),
		new Prop("bwall1",800,1400),
		new Prop("bwall1",900,1400),
		new Prop("bwall2",1100,1400),
		new Prop("bwall2",1200,1400),
		new Prop("bwall2",1300,1400),
		new Prop("bwall2",1400,1400),
		new Prop("cobblestone",1600,1400),
		new Prop("cobblestone",1700,1400),
		new Prop("cobblestone",1800,1400),
		new Prop("cobblestone",1900,1400),
		new Prop("cobblestone",2000,1400),
		new Prop("cobblestone",2100,1400),
		new Prop("cobblestone",2200,1400),
		new Prop("cobblestone",2300,1400),
		new Prop("cobblestone",2400,1400),
		new Prop("cobblestone",2500,1400),
		new Prop("cobblestone",2600,1400),
		new Prop("cobblestone",2700,1400),
		new Prop("cobblestone",2800,1400),
		new Prop("cobblestone",2900,1400),
		new Prop("cobblestone",3000,1400),
		new Prop("cobblestone",3100,1400),
		new Prop("cobblestone",3200,1400),
		new Prop("cobblestone",3300,1400),
		new Prop("cobblestone",3400,1400),
		new Prop("cobblestone",3500,1400),
		new Prop("cobblestone",3600,1400),
		new Prop("cobblestone",100,1500),
		new Prop("sign2",200,1500),
		new Prop("bwall4",300,1500),
		new Prop("door1",400,1500),
		new Prop("bwall4",500,1500),
		new Prop("bwall1",600,1500),
		new Prop("door1",700,1500),
		new Prop("door1",800,1500),
		new Prop("bwall1",900,1500),
		new Prop("bwall2",1100,1500),
		new Prop("door2",1200,1500),
		new Prop("door2",1300,1500),
		new Prop("bwall2",1400,1500),
		new Prop("cobblestone",1800,1500),
		new Prop("cobblestone",1900,1500),
		new Prop("broof5",2200,1500),
		new Prop("broof5",2300,1500),
		new Prop("broof5",2400,1500),
		new Prop("broof5",2500,1500),
		new Prop("broof5",2600,1500),
		new Prop("broof5",2700,1500),
		new Prop("broof5",2800,1500),
		new Prop("broof5",2900,1500),
		new Prop("broof5",3000,1500),
		new Prop("cobblestone",3500,1500),
		new Prop("cobblestone",100,1600),
		new Prop("cobblestone",400,1600),
		new Prop("cobblestone",700,1600),
		new Prop("cobblestone",800,1600),
		new Prop("cobblestone",1200,1600),
		new Prop("cobblestone",1300,1600),
		new Prop("cobblestone",1800,1600),
		new Prop("cobblestone",1900,1600),
		new Prop("sign1",2000,1600),
		new Prop("bwall5",2200,1600),
		new Prop("bwall5",2300,1600),
		new Prop("bwall5",2400,1600),
		new Prop("bwall5",2500,1600),
		new Prop("bwall5",2600,1600),
		new Prop("bwall5",2700,1600),
		new Prop("bwall5",2800,1600),
		new Prop("bwall5",2900,1600),
		new Prop("bwall5",3000,1600),
		new Prop("signl",3200,1600),
		new Prop("signr",3300,1600),
		new Prop("cobblestone",3500,1600),
		new Prop("cobblestone",0,1700),
		new Prop("cobblestone",100,1700),
		new Prop("cobblestone",200,1700),
		new Prop("cobblestone",300,1700),
		new Prop("cobblestone",400,1700),
		new Prop("broof2",500,1700),
		new Prop("broof2",600,1700),
		new Prop("broof2",700,1700),
		new Prop("broof2",800,1700),
		new Prop("broof2",900,1700),
		new Prop("broof2",1000,1700),
		new Prop("broof2",1100,1700),
		new Prop("broof2",1200,1700),
		new Prop("cobblestone",1300,1700),
		new Prop("cobblestone",1400,1700),
		new Prop("cobblestone",1500,1700),
		new Prop("cobblestone",1600,1700),
		new Prop("cobblestone",1700,1700),
		new Prop("cobblestone",1800,1700),
		new Prop("cobblestone",1900,1700),
		new Prop("bwall5",2200,1700),
		new Prop("bwall5",2300,1700),
		new Prop("bwall5",2400,1700),
		new Prop("storesign4",2500,1700),
		new Prop("storesign4",2600,1700),
		new Prop("storesign4",2700,1700),
		new Prop("bwall5",2800,1700),
		new Prop("bwall5",2900,1700),
		new Prop("bwall5",3000,1700),
		new Prop("cobblestone",3500,1700),
		new Prop("cobblestone",0,1800),
		new Prop("broof1",100,1800),
		new Prop("broof1",200,1800),
		new Prop("broof1",300,1800),
		new Prop("sign1",400,1800),
		new Prop("bwall2",500,1800),
		new Prop("bwall2",600,1800),
		new Prop("bwall2",700,1800),
		new Prop("bwall2",800,1800),
		new Prop("bwall2",900,1800),
		new Prop("bwall2",1000,1800),
		new Prop("bwall2",1100,1800),
		new Prop("bwall2",1200,1800),
		new Prop("broof6",1400,1800),
		new Prop("broof6",1500,1800),
		new Prop("broof6",1600,1800),
		new Prop("cobblestone",1800,1800),
		new Prop("cobblestone",1900,1800),
		new Prop("bwall5",2200,1800),
		new Prop("bwall5",2300,1800),
		new Prop("bwall5",2400,1800),
		new Prop("bwall5",2500,1800),
		new Prop("bwall5",2600,1800),
		new Prop("bwall5",2700,1800),
		new Prop("bwall5",2800,1800),
		new Prop("bwall5",2900,1800),
		new Prop("bwall5",3000,1800),
		new Prop("broof1",3200,1800),
		new Prop("broof1",3300,1800),
		new Prop("broof1",3400,1800),
		new Prop("cobblestone",3500,1800),
		new Prop("cobblestone",0,1900),
		new Prop("bwall1",100,1900),
		new Prop("door1",200,1900),
		new Prop("bwall1",300,1900),
		new Prop("sign2",400,1900),
		new Prop("bwall2",500,1900),
		new Prop("bwall2",600,1900),
		new Prop("bwall2",700,1900),
		new Prop("door2",800,1900),
		new Prop("door2",900,1900),
		new Prop("bwall2",1000,1900),
		new Prop("bwall2",1100,1900),
		new Prop("bwall2",1200,1900),
		new Prop("bwall6",1400,1900),
		new Prop("door1",1500,1900),
		new Prop("bwall6",1600,1900),
		new Prop("cobblestone",1800,1900),
		new Prop("cobblestone",1900,1900),
		new Prop("bwall5",2200,1900),
		new Prop("bwall5",2300,1900),
		new Prop("bwall5",2400,1900),
		new Prop("door1",2500,1900),
		new Prop("bwall5",2600,1900),
		new Prop("door1",2700,1900),
		new Prop("bwall5",2800,1900),
		new Prop("bwall5",2900,1900),
		new Prop("bwall5",3000,1900),
		new Prop("bwall1",3200,1900),
		new Prop("door1",3300,1900),
		new Prop("bwall1",3400,1900),
		new Prop("cobblestone",3500,1900),
		new Prop("cobblestone",0,2000),
		new Prop("cobblestone",200,2000),
		new Prop("cobblestone",1500,2000),
		new Prop("cobblestone",1800,2000),
		new Prop("cobblestone",1900,2000),
		new Prop("sign2",2000,2000),
		new Prop("cobblestone",3500,2000),
		new Prop("cobblestone",0,2100),
		new Prop("cobblestone",100,2100),
		new Prop("cobblestone",200,2100),
		new Prop("cobblestone",300,2100),
		new Prop("cobblestone",400,2100),
		new Prop("cobblestone",500,2100),
		new Prop("cobblestone",600,2100),
		new Prop("cobblestone",700,2100),
		new Prop("cobblestone",800,2100),
		new Prop("cobblestone",900,2100),
		new Prop("cobblestone",1000,2100),
		new Prop("cobblestone",1100,2100),
		new Prop("cobblestone",1200,2100),
		new Prop("cobblestone",1300,2100),
		new Prop("cobblestone",1400,2100),
		new Prop("cobblestone",1500,2100),
		new Prop("cobblestone",1600,2100),
		new Prop("cobblestone",1700,2100),
		new Prop("cobblestone",1800,2100),
		new Prop("cobblestone",1900,2100),
		new Prop("cobblestone",2000,2100),
		new Prop("cobblestone",2100,2100),
		new Prop("cobblestone",2200,2100),
		new Prop("cobblestone",2300,2100),
		new Prop("cobblestone",2400,2100),
		new Prop("cobblestone",2500,2100),
		new Prop("cobblestone",2600,2100),
		new Prop("cobblestone",2700,2100),
		new Prop("cobblestone",2800,2100),
		new Prop("cobblestone",2900,2100),
		new Prop("cobblestone",3000,2100),
		new Prop("cobblestone",3100,2100),
		new Prop("cobblestone",3200,2100),
		new Prop("cobblestone",3300,2100),
		new Prop("cobblestone",3400,2100),
		new Prop("cobblestone",3500,2100),
		new Prop("blank",3600,2100)
	];
	var merchdistrict = [
		new Prop("blank",0,0),
		new Prop("cobblestone",800,0),
		new Prop("cobblestone",2600,0),
		new Prop("cobblestone",4300,0),
		new Prop("cobblestone",800,100),
		new Prop("cobblestone",2600,100),
		new Prop("broof1",3400,100),
		new Prop("broof1",3500,100),
		new Prop("broof1",3600,100),
		new Prop("broof3",3800,100),
		new Prop("broof3",3900,100),
		new Prop("broof3",4000,100),
		new Prop("broof3",4100,100),
		new Prop("cobblestone",4300,100),
		new Prop("broof4",0,200),
		new Prop("broof4",100,200),
		new Prop("broof4",200,200),
		new Prop("cobblestone",800,200),
		new Prop("broof4",1900,200),
		new Prop("broof4",2000,200),
		new Prop("broof4",2100,200),
		new Prop("cobblestone",2600,200),
		new Prop("vendortl",2800,200),
		new Prop("vendortr",2900,200),
		new Prop("vendortl",3100,200),
		new Prop("vendortr",3200,200),
		new Prop("bwall1",3400,200),
		new Prop("bwall1",3500,200),
		new Prop("bwall1",3600,200),
		new Prop("bwall3",3800,200),
		new Prop("bwall3",3900,200),
		new Prop("bwall3",4000,200),
		new Prop("bwall3",4100,200),
		new Prop("cobblestone",4300,200),
		new Prop("sign1",4500,200),
		new Prop("bwall4",0,300),
		new Prop("bwall4",100,300),
		new Prop("bwall4",200,300),
		new Prop("broof3",400,300),
		new Prop("broof3",500,300),
		new Prop("broof3",600,300),
		new Prop("cobblestone",800,300),
		new Prop("broof4",1000,300),
		new Prop("broof4",1100,300),
		new Prop("broof4",1200,300),
		new Prop("broof4",1300,300),
		new Prop("broof1",1500,300),
		new Prop("broof1",1600,300),
		new Prop("broof1",1700,300),
		new Prop("bwall4",1900,300),
		new Prop("bwall4",2000,300),
		new Prop("bwall4",2100,300),
		new Prop("broof5",2200,300),
		new Prop("broof5",2300,300),
		new Prop("broof5",2400,300),
		new Prop("cobblestone",2600,300),
		new Prop("vendorbl",2800,300),
		new Prop("vendorbr",2900,300),
		new Prop("vendorbl",3100,300),
		new Prop("vendorbr",3200,300),
		new Prop("bwall1",3400,300),
		new Prop("door2",3500,300),
		new Prop("bwall1",3600,300),
		new Prop("bwall3",3800,300),
		new Prop("door3",3900,300),
		new Prop("door3",4000,300),
		new Prop("bwall3",4100,300),
		new Prop("cobblestone",4300,300),
		new Prop("bwall4",0,400),
		new Prop("bwall4",100,400),
		new Prop("bwall4",200,400),
		new Prop("bwall3",400,400),
		new Prop("bwall3",500,400),
		new Prop("bwall3",600,400),
		new Prop("cobblestone",800,400),
		new Prop("bwall4",1000,400),
		new Prop("bwall4",1100,400),
		new Prop("bwall4",1200,400),
		new Prop("bwall4",1300,400),
		new Prop("bwall1",1500,400),
		new Prop("bwall1",1600,400),
		new Prop("bwall1",1700,400),
		new Prop("bwall4",1900,400),
		new Prop("bwall4",2000,400),
		new Prop("bwall4",2100,400),
		new Prop("bwall5",2200,400),
		new Prop("bwall5",2300,400),
		new Prop("bwall5",2400,400),
		new Prop("cobblestone",2600,400),
		new Prop("cobblestone",3500,400),
		new Prop("cobblestone",3600,400),
		new Prop("cobblestone",3700,400),
		new Prop("cobblestone",3800,400),
		new Prop("cobblestone",3900,400),
		new Prop("cobblestone",4000,400),
		new Prop("cobblestone",4100,400),
		new Prop("cobblestone",4200,400),
		new Prop("cobblestone",4300,400),
		new Prop("bwall4",0,500),
		new Prop("door2",100,500),
		new Prop("bwall4",200,500),
		new Prop("bwall3",400,500),
		new Prop("door2",500,500),
		new Prop("bwall3",600,500),
		new Prop("cobblestone",800,500),
		new Prop("bwall4",1000,500),
		new Prop("door3",1100,500),
		new Prop("door3",1200,500),
		new Prop("bwall4",1300,500),
		new Prop("bwall1",1500,500),
		new Prop("door2",1600,500),
		new Prop("bwall1",1700,500),
		new Prop("bwall4",1900,500),
		new Prop("door2",2000,500),
		new Prop("bwall4",2100,500),
		new Prop("bwall5",2200,500),
		new Prop("door2",2300,500),
		new Prop("bwall5",2400,500),
		new Prop("cobblestone",2600,500),
		new Prop("vendortl",2900,500),
		new Prop("vendortr",3000,500),
		new Prop("vendortl",3200,500),
		new Prop("vendortr",3300,500),
		new Prop("cobblestone",3500,500),
		new Prop("sign2",3600,500),
		new Prop("sign2",700,600),
		new Prop("cobblestone",800,600),
		new Prop("sign2",2500,600),
		new Prop("cobblestone",2600,600),
		new Prop("vendorbl",2900,600),
		new Prop("vendorbr",3000,600),
		new Prop("vendorbl",3200,600),
		new Prop("vendorbr",3300,600),
		new Prop("cobblestone",3500,600),
		new Prop("broof1",3700,600),
		new Prop("broof1",3800,600),
		new Prop("broof1",3900,600),
		new Prop("broof1",4000,600),
		new Prop("broof1",4100,600),
		new Prop("broof1",4200,600),
		new Prop("broof5",4600,600),
		new Prop("broof5",4700,600),
		new Prop("broof5",4800,600),
		new Prop("cobblestone",0,700),
		new Prop("cobblestone",100,700),
		new Prop("cobblestone",200,700),
		new Prop("cobblestone",300,700),
		new Prop("cobblestone",400,700),
		new Prop("cobblestone",500,700),
		new Prop("cobblestone",600,700),
		new Prop("cobblestone",700,700),
		new Prop("cobblestone",800,700),
		new Prop("cobblestone",900,700),
		new Prop("cobblestone",1000,700),
		new Prop("cobblestone",1100,700),
		new Prop("cobblestone",1200,700),
		new Prop("cobblestone",1300,700),
		new Prop("cobblestone",1400,700),
		new Prop("cobblestone",1500,700),
		new Prop("cobblestone",1600,700),
		new Prop("cobblestone",1700,700),
		new Prop("cobblestone",1800,700),
		new Prop("cobblestone",1900,700),
		new Prop("cobblestone",2000,700),
		new Prop("cobblestone",2100,700),
		new Prop("cobblestone",2200,700),
		new Prop("cobblestone",2300,700),
		new Prop("cobblestone",2400,700),
		new Prop("cobblestone",2500,700),
		new Prop("cobblestone",2600,700),
		new Prop("cobblestone",3500,700),
		new Prop("bwall1",3700,700),
		new Prop("bwall1",3800,700),
		new Prop("bwall1",3900,700),
		new Prop("bwall1",4000,700),
		new Prop("bwall1",4100,700),
		new Prop("bwall1",4200,700),
		new Prop("broof1",4300,700),
		new Prop("broof1",4400,700),
		new Prop("bwall5",4600,700),
		new Prop("door2",4700,700),
		new Prop("bwall5",4800,700),
		new Prop("sign2",1300,800),
		new Prop("cobblestone",1400,800),
		new Prop("cobblestone",2000,800),
		new Prop("vendortl",2100,800),
		new Prop("vendortr",2200,800),
		new Prop("vendortl",2400,800),
		new Prop("vendortr",2500,800),
		new Prop("vendortl",2700,800),
		new Prop("vendortr",2800,800),
		new Prop("vendortl",3000,800),
		new Prop("vendortr",3100,800),
		new Prop("vendortl",3300,800),
		new Prop("vendortr",3400,800),
		new Prop("cobblestone",3500,800),
		new Prop("bwall1",3700,800),
		new Prop("bwall1",3800,800),
		new Prop("bwall1",3900,800),
		new Prop("bwall1",4000,800),
		new Prop("bwall1",4100,800),
		new Prop("bwall1",4200,800),
		new Prop("bwall1",4300,800),
		new Prop("bwall1",4400,800),
		new Prop("cobblestone",1400,900),
		new Prop("sign1",1900,900),
		new Prop("cobblestone",2000,900),
		new Prop("vendorbl",2100,900),
		new Prop("vendorbr",2200,900),
		new Prop("vendorbl",2400,900),
		new Prop("vendorbr",2500,900),
		new Prop("vendorbl",2700,900),
		new Prop("vendorbr",2800,900),
		new Prop("vendorbl",3000,900),
		new Prop("vendorbr",3100,900),
		new Prop("vendorbl",3300,900),
		new Prop("vendorbr",3400,900),
		new Prop("cobblestone",3500,900),
		new Prop("bwall1",3700,900),
		new Prop("bwall1",3800,900),
		new Prop("door3",3900,900),
		new Prop("door3",4000,900),
		new Prop("bwall1",4100,900),
		new Prop("bwall1",4200,900),
		new Prop("bwall1",4300,900),
		new Prop("bwall1",4400,900),
		new Prop("broof1",100,1000),
		new Prop("broof1",200,1000),
		new Prop("broof1",300,1000),
		new Prop("broof2",400,1000),
		new Prop("broof3",500,1000),
		new Prop("broof3",600,1000),
		new Prop("broof4",700,1000),
		new Prop("broof4",800,1000),
		new Prop("broof4",900,1000),
		new Prop("broof5",1000,1000),
		new Prop("broof5",1100,1000),
		new Prop("broof5",1200,1000),
		new Prop("cobblestone",1400,1000),
		new Prop("cobblestone",2000,1000),
		new Prop("cobblestone",2100,1000),
		new Prop("cobblestone",2200,1000),
		new Prop("cobblestone",2300,1000),
		new Prop("cobblestone",2400,1000),
		new Prop("cobblestone",2500,1000),
		new Prop("cobblestone",2600,1000),
		new Prop("cobblestone",2700,1000),
		new Prop("cobblestone",2800,1000),
		new Prop("cobblestone",2900,1000),
		new Prop("cobblestone",3000,1000),
		new Prop("cobblestone",3100,1000),
		new Prop("cobblestone",3200,1000),
		new Prop("cobblestone",3300,1000),
		new Prop("cobblestone",3400,1000),
		new Prop("cobblestone",3500,1000),
		new Prop("bwall1",100,1100),
		new Prop("bwall1",200,1100),
		new Prop("bwall1",300,1100),
		new Prop("bwall3",400,1100),
		new Prop("bwall3",500,1100),
		new Prop("bwall3",600,1100),
		new Prop("bwall4",700,1100),
		new Prop("bwall4",800,1100),
		new Prop("bwall4",900,1100),
		new Prop("bwall5",1000,1100),
		new Prop("bwall5",1100,1100),
		new Prop("bwall5",1200,1100),
		new Prop("cobblestone",1400,1100),
		new Prop("cobblestone",2000,1100),
		new Prop("sign2",2100,1100),
		new Prop("broof4",2400,1100),
		new Prop("broof4",2500,1100),
		new Prop("broof4",2600,1100),
		new Prop("",2700,1100),
		new Prop("broof3",2800,1100),
		new Prop("broof3",2900,1100),
		new Prop("broof3",3000,1100),
		new Prop("broof5",3200,1100),
		new Prop("broof5",3300,1100),
		new Prop("broof5",3400,1100),
		new Prop("cobblestone",3500,1100),
		new Prop("broof1",4400,1100),
		new Prop("broof1",4500,1100),
		new Prop("broof1",4600,1100),
		new Prop("bwall1",100,1200),
		new Prop("door2",200,1200),
		new Prop("bwall1",300,1200),
		new Prop("bwall3",400,1200),
		new Prop("door2",500,1200),
		new Prop("bwall3",600,1200),
		new Prop("bwall4",700,1200),
		new Prop("door2",800,1200),
		new Prop("bwall4",900,1200),
		new Prop("bwall5",1000,1200),
		new Prop("door2",1100,1200),
		new Prop("bwall5",1200,1200),
		new Prop("cobblestone",1400,1200),
		new Prop("cobblestone",2000,1200),
		new Prop("bwall4",2400,1200),
		new Prop("bwall4",2500,1200),
		new Prop("bwall4",2600,1200),
		new Prop("bwall3",2800,1200),
		new Prop("bwall3",2900,1200),
		new Prop("bwall3",3000,1200),
		new Prop("bwall5",3200,1200),
		new Prop("bwall5",3300,1200),
		new Prop("bwall5",3400,1200),
		new Prop("cobblestone",3500,1200),
		new Prop("broof1",4200,1200),
		new Prop("broof1",4300,1200),
		new Prop("bwall1",4400,1200),
		new Prop("bwall1",4500,1200),
		new Prop("bwall1",4600,1200),
		new Prop("broof1",4700,1200),
		new Prop("broof1",4800,1200),
		new Prop("broof1",4900,1200),
		new Prop("cobblestone",1400,1300),
		new Prop("cobblestone",2000,1300),
		new Prop("bwall4",2400,1300),
		new Prop("door2",2500,1300),
		new Prop("bwall4",2600,1300),
		new Prop("bwall3",2800,1300),
		new Prop("door2",2900,1300),
		new Prop("bwall3",3000,1300),
		new Prop("bwall5",3200,1300),
		new Prop("door2",3300,1300),
		new Prop("bwall5",3400,1300),
		new Prop("cobblestone",3500,1300),
		new Prop("bwall1",4200,1300),
		new Prop("bwall1",4300,1300),
		new Prop("bwall1",4400,1300),
		new Prop("bwall1",4500,1300),
		new Prop("bwall1",4600,1300),
		new Prop("bwall1",4700,1300),
		new Prop("bwall1",4800,1300),
		new Prop("bwall1",4900,1300),
		new Prop("cobblestone",1400,1400),
		new Prop("benchl",1600,1400),
		new Prop("benchr",1700,1400),
		new Prop("cobblestone",2000,1400),
		new Prop("broof2",2100,1400),
		new Prop("broof2",2200,1400),
		new Prop("broof2",2300,1400),
		new Prop("cobblestone",3500,1400),
		new Prop("sign1",3700,1400),
		new Prop("bwall1",4200,1400),
		new Prop("door2",4300,1400),
		new Prop("bwall1",4400,1400),
		new Prop("door2",4500,1400),
		new Prop("bwall1",4600,1400),
		new Prop("bwall1",4700,1400),
		new Prop("door2",4800,1400),
		new Prop("bwall1",4900,1400),
		new Prop("cobblestone",0,1500),
		new Prop("cobblestone",100,1500),
		new Prop("cobblestone",200,1500),
		new Prop("cobblestone",300,1500),
		new Prop("cobblestone",400,1500),
		new Prop("cobblestone",500,1500),
		new Prop("cobblestone",600,1500),
		new Prop("cobblestone",700,1500),
		new Prop("cobblestone",800,1500),
		new Prop("cobblestone",900,1500),
		new Prop("cobblestone",1000,1500),
		new Prop("cobblestone",1100,1500),
		new Prop("cobblestone",1200,1500),
		new Prop("cobblestone",1300,1500),
		new Prop("cobblestone",1400,1500),
		new Prop("cobblestone",2000,1500),
		new Prop("bwall2",2100,1500),
		new Prop("bwall2",2200,1500),
		new Prop("bwall2",2300,1500),
		new Prop("cobblestone",3400,1500),
		new Prop("cobblestone",700,1600),
		new Prop("cobblestone",1300,1600),
		new Prop("water",1800,1600),
		new Prop("cobblestone",2000,1600),
		new Prop("bwall2",2100,1600),
		new Prop("door2",2200,1600),
		new Prop("bwall2",2300,1600),
		new Prop("stablewall",2600,1600),
		new Prop("stablewall",2700,1600),
		new Prop("stablewall",2800,1600),
		new Prop("stablewall",2900,1600),
		new Prop("stablewall",3000,1600),
		new Prop("stablewall",3100,1600),
		new Prop("stablewall",3200,1600),
		new Prop("cobblestone",3500,1600),
		new Prop("broof4",100,1700),
		new Prop("broof4",200,1700),
		new Prop("broof4",300,1700),
		new Prop("broof4",400,1700),
		new Prop("broof4",500,1700),
		new Prop("broof4",600,1700),
		new Prop("cobblestone",700,1700),
		new Prop("broof1",1000,1700),
		new Prop("broof1",1100,1700),
		new Prop("broof1",1200,1700),
		new Prop("cobblestone",1300,1700),
		new Prop("bencht",1500,1700),
		new Prop("water",1600,1700),
		new Prop("water",1700,1700),
		new Prop("water",1800,1700),
		new Prop("bencht",1900,1700),
		new Prop("cobblestone",2000,1700),
		new Prop("stablewall",2600,1700),
		new Prop("pit",2700,1700),
		new Prop("pit",2800,1700),
		new Prop("pit",2900,1700),
		new Prop("pit",3000,1700),
		new Prop("pit",3100,1700),
		new Prop("stablewall",3200,1700),
		new Prop("cobblestone",3500,1700),
		new Prop("broof5",3900,1700),
		new Prop("broof5",4000,1700),
		new Prop("broof5",4100,1700),
		new Prop("broof5",4200,1700),
		new Prop("broof5",4300,1700),
		new Prop("broof5",4400,1700),
		new Prop("broof5",4500,1700),
		new Prop("broof5",4600,1700),
		new Prop("broof5",4700,1700),
		new Prop("broof5",4800,1700),
		new Prop("bwall4",100,1800),
		new Prop("bwall4",200,1800),
		new Prop("bwall4",300,1800),
		new Prop("bwall4",400,1800),
		new Prop("bwall4",500,1800),
		new Prop("bwall4",600,1800),
		new Prop("cobblestone",700,1800),
		new Prop("broof1",800,1800),
		new Prop("broof1",900,1800),
		new Prop("bwall1",1000,1800),
		new Prop("bwall1",1100,1800),
		new Prop("bwall1",1200,1800),
		new Prop("cobblestone",1300,1800),
		new Prop("benchb",1500,1800),
		new Prop("water",1600,1800),
		new Prop("water",1700,1800),
		new Prop("water",1800,1800),
		new Prop("benchb",1900,1800),
		new Prop("cobblestone",2000,1800),
		new Prop("broof1",2100,1800),
		new Prop("broof1",2200,1800),
		new Prop("broof1",2300,1800),
		new Prop("stablewall",2600,1800),
		new Prop("staget",2700,1800),
		new Prop("staget",2800,1800),
		new Prop("staget",2900,1800),
		new Prop("staget",3000,1800),
		new Prop("staget",3100,1800),
		new Prop("stablewall",3200,1800),
		new Prop("cobblestone",3500,1800),
		new Prop("bwall5",3900,1800),
		new Prop("bwall5",4000,1800),
		new Prop("bwall5",4100,1800),
		new Prop("bwall5",4200,1800),
		new Prop("bwall5",4300,1800),
		new Prop("bwall5",4400,1800),
		new Prop("bwall5",4500,1800),
		new Prop("bwall5",4600,1800),
		new Prop("bwall5",4700,1800),
		new Prop("bwall5",4800,1800),
		new Prop("bwall4",100,1900),
		new Prop("bwall4",200,1900),
		new Prop("door",300,1900),
		new Prop("bwall4",400,1900),
		new Prop("door2",500,1900),
		new Prop("bwall4",600,1900),
		new Prop("cobblestone",700,1900),
		new Prop("bwall1",800,1900),
		new Prop("bwall1",900,1900),
		new Prop("bwall1",1000,1900),
		new Prop("door2",1100,1900),
		new Prop("bwall1",1200,1900),
		new Prop("cobblestone",1300,1900),
		new Prop("water",1700,1900),
		new Prop("cobblestone",2000,1900),
		new Prop("bwall1",2100,1900),
		new Prop("bwall1",2200,1900),
		new Prop("bwall1",2300,1900),
		new Prop("stageb",2600,1900),
		new Prop("stageb",2700,1900),
		new Prop("stageb",2800,1900),
		new Prop("stageb",2900,1900),
		new Prop("stageb",3000,1900),
		new Prop("stageb",3100,1900),
		new Prop("stageb",3200,1900),
		new Prop("cobblestone",3500,1900),
		new Prop("bwall5",3900,1900),
		new Prop("bwall5",4000,1900),
		new Prop("bwall5",4100,1900),
		new Prop("bwall5",4200,1900),
		new Prop("bwall5",4300,1900),
		new Prop("bwall5",4400,1900),
		new Prop("bwall5",4500,1900),
		new Prop("bwall5",4600,1900),
		new Prop("bwall5",4700,1900),
		new Prop("bwall5",4800,1900),
		new Prop("cobblestone",700,2000),
		new Prop("cobblestone",1300,2000),
		new Prop("cobblestone",2000,2000),
		new Prop("bwall1",2100,2000),
		new Prop("door2",2200,2000),
		new Prop("bwall1",2300,2000),
		new Prop("cobblestone",3500,2000),
		new Prop("bwall5",3900,2000),
		new Prop("bwall5",4000,2000),
		new Prop("bwall5",4100,2000),
		new Prop("bwall5",4200,2000),
		new Prop("bwall5",4300,2000),
		new Prop("bwall5",4400,2000),
		new Prop("bwall5",4500,2000),
		new Prop("bwall5",4600,2000),
		new Prop("bwall5",4700,2000),
		new Prop("bwall5",4800,2000),
		new Prop("cobblestone",0,2100),
		new Prop("cobblestone",100,2100),
		new Prop("cobblestone",200,2100),
		new Prop("cobblestone",300,2100),
		new Prop("cobblestone",400,2100),
		new Prop("cobblestone",500,2100),
		new Prop("cobblestone",600,2100),
		new Prop("cobblestone",700,2100),
		new Prop("cobblestone",800,2100),
		new Prop("cobblestone",900,2100),
		new Prop("cobblestone",1000,2100),
		new Prop("cobblestone",1100,2100),
		new Prop("cobblestone",1200,2100),
		new Prop("cobblestone",1300,2100),
		new Prop("benchl",1700,2100),
		new Prop("benchr",1800,2100),
		new Prop("cobblestone",2000,2100),
		new Prop("chair2f",2600,2100),
		new Prop("chair2f",2800,2100),
		new Prop("chair2f",3000,2100),
		new Prop("chair2f",3200,2100),
		new Prop("cobblestone",3500,2100),
		new Prop("sign1",3700,2100),
		new Prop("bwall5",3900,2100),
		new Prop("door1",4000,2100),
		new Prop("bwall5",4100,2100),
		new Prop("bwall5",4600,2100),
		new Prop("door1",4700,2100),
		new Prop("bwall5",4800,2100),
		new Prop("broof3",100,2200),
		new Prop("broof3",200,2200),
		new Prop("broof3",300,2200),
		new Prop("cobblestone",700,2200),
		new Prop("broof5",900,2200),
		new Prop("broof5",1000,2200),
		new Prop("broof5",1100,2200),
		new Prop("cobblestone",1300,2200),
		new Prop("cobblestone",2000,2200),
		new Prop("broof1",2100,2200),
		new Prop("broof1",2200,2200),
		new Prop("broof1",2300,2200),
		new Prop("chair2f",2700,2200),
		new Prop("chair2f",3100,2200),
		new Prop("cobblestone",3500,2200),
		new Prop("bwall3",100,2300),
		new Prop("bwall3",200,2300),
		new Prop("bwall3",300,2300),
		new Prop("vendortl",500,2300),
		new Prop("vendortr",600,2300),
		new Prop("cobblestone",700,2300),
		new Prop("bwall5",900,2300),
		new Prop("bwall5",1000,2300),
		new Prop("bwall5",1100,2300),
		new Prop("cobblestone",1300,2300),
		new Prop("cobblestone",2000,2300),
		new Prop("bwall1",2100,2300),
		new Prop("bwall1",2200,2300),
		new Prop("bwall1",2300,2300),
		new Prop("chair2f",2600,2300),
		new Prop("chair2f",2800,2300),
		new Prop("chair2f",3000,2300),
		new Prop("chair2f",3200,2300),
		new Prop("cobblestone",3500,2300),
		new Prop("sign2",3600,2300),
		new Prop("bwall3",100,2400),
		new Prop("door2",200,2400),
		new Prop("bwall3",300,2400),
		new Prop("vendorbl",500,2400),
		new Prop("vendorbr",600,2400),
		new Prop("cobblestone",700,2400),
		new Prop("bwall5",900,2400),
		new Prop("bwall5",1000,2400),
		new Prop("bwall5",1100,2400),
		new Prop("cobblestone",1300,2400),
		new Prop("cobblestone",2000,2400),
		new Prop("bwall1",2100,2400),
		new Prop("door2",2200,2400),
		new Prop("bwall1",2300,2400),
		new Prop("chair2f",2700,2400),
		new Prop("chair2f",3100,2400),
		new Prop("cobblestone",3500,2400),
		new Prop("cobblestone",3600,2400),
		new Prop("cobblestone",3700,2400),
		new Prop("cobblestone",3800,2400),
		new Prop("cobblestone",3900,2400),
		new Prop("cobblestone",4000,2400),
		new Prop("cobblestone",4100,2400),
		new Prop("cobblestone",4200,2400),
		new Prop("cobblestone",4300,2400),
		new Prop("cobblestone",4400,2400),
		new Prop("cobblestone",4500,2400),
		new Prop("cobblestone",4600,2400),
		new Prop("cobblestone",4700,2400),
		new Prop("cobblestone",4800,2400),
		new Prop("cobblestone",4900,2400),
		new Prop("cobblestone",700,2500),
		new Prop("bwall5",900,2500),
		new Prop("door2",1000,2500),
		new Prop("bwall5",1100,2500),
		new Prop("cobblestone",1300,2500),
		new Prop("sign1",1400,2500),
		new Prop("cobblestone",2000,2500),
		new Prop("cobblestone",3500,2500),
		new Prop("cobblestone",0,2600),
		new Prop("cobblestone",100,2600),
		new Prop("cobblestone",200,2600),
		new Prop("cobblestone",300,2600),
		new Prop("cobblestone",400,2600),
		new Prop("cobblestone",500,2600),
		new Prop("cobblestone",600,2600),
		new Prop("cobblestone",700,2600),
		new Prop("cobblestone",800,2600),
		new Prop("cobblestone",900,2600),
		new Prop("cobblestone",1000,2600),
		new Prop("cobblestone",1100,2600),
		new Prop("cobblestone",1200,2600),
		new Prop("cobblestone",1300,2600),
		new Prop("cobblestone",2000,2600),
		new Prop("cobblestone",2100,2600),
		new Prop("cobblestone",2200,2600),
		new Prop("cobblestone",2300,2600),
		new Prop("cobblestone",2400,2600),
		new Prop("cobblestone",2500,2600),
		new Prop("cobblestone",2600,2600),
		new Prop("cobblestone",2700,2600),
		new Prop("cobblestone",2800,2600),
		new Prop("cobblestone",2900,2600),
		new Prop("cobblestone",3000,2600),
		new Prop("cobblestone",3100,2600),
		new Prop("cobblestone",3200,2600),
		new Prop("cobblestone",3300,2600),
		new Prop("cobblestone",3400,2600),
		new Prop("cobblestone",3500,2600),
		new Prop("sign2",700,2700),
		new Prop("cobblestone",800,2700),
		new Prop("cobblestone",2000,2700),
		new Prop("sign2",2100,2700),
		new Prop("blank",4900,2700)
	];
	var slurbs = [
		new Prop("blank",0,0),
		new Prop("cobblestone",2600,0),
		new Prop("cobblestone",2700,0),
		new Prop("garbage",3000,0),
		new Prop("garbage",3500,0),
		new Prop("garbage",3600,0),
		new Prop("garbage",3700,0),
		new Prop("broof5",200,100),
		new Prop("broof5",300,100),
		new Prop("broof5",400,100),
		new Prop("broof5",600,100),
		new Prop("broof5",700,100),
		new Prop("broof5",800,100),
		new Prop("broof5",1000,100),
		new Prop("broof5",1100,100),
		new Prop("broof5",1200,100),
		new Prop("broof5",1400,100),
		new Prop("broof5",1500,100),
		new Prop("broof5",1600,100),
		new Prop("broof5",1800,100),
		new Prop("broof5",1900,100),
		new Prop("broof5",2000,100),
		new Prop("broof5",2200,100),
		new Prop("broof5",2300,100),
		new Prop("broof5",2400,100),
		new Prop("cobblestone",2600,100),
		new Prop("cobblestone",2700,100),
		new Prop("garbage",2900,100),
		new Prop("garbage",3200,100),
		new Prop("garbage",3300,100),
		new Prop("garbage",3700,100),
		new Prop("bwall5",200,200),
		new Prop("bwall5",300,200),
		new Prop("bwall5",400,200),
		new Prop("bwall5",600,200),
		new Prop("bwall5",700,200),
		new Prop("bwall5",800,200),
		new Prop("bwall5",1000,200),
		new Prop("bwall5",1100,200),
		new Prop("bwall5",1200,200),
		new Prop("bwall5",1400,200),
		new Prop("bwall5",1500,200),
		new Prop("bwall5",1600,200),
		new Prop("bwall5",1800,200),
		new Prop("bwall5",1900,200),
		new Prop("bwall5",2000,200),
		new Prop("bwall5",2200,200),
		new Prop("bwall5",2300,200),
		new Prop("bwall5",2400,200),
		new Prop("cobblestone",2600,200),
		new Prop("cobblestone",2700,200),
		new Prop("garbage",3500,200),
		new Prop("bwall5",200,300),
		new Prop("door1",300,300),
		new Prop("bwall5",400,300),
		new Prop("bwall5",600,300),
		new Prop("door1",700,300),
		new Prop("bwall5",800,300),
		new Prop("bwall5",1000,300),
		new Prop("door1",1100,300),
		new Prop("bwall5",1200,300),
		new Prop("bwall5",1400,300),
		new Prop("door1",1500,300),
		new Prop("bwall5",1600,300),
		new Prop("bwall5",1800,300),
		new Prop("door1",1900,300),
		new Prop("bwall5",2000,300),
		new Prop("bwall5",2200,300),
		new Prop("door1",2300,300),
		new Prop("bwall5",2400,300),
		new Prop("cobblestone",2600,300),
		new Prop("cobblestone",2700,300),
		new Prop("garbage",2900,300),
		new Prop("garbage",3400,300),
		new Prop("garbage",3500,300),
		new Prop("garbage",3600,300),
		new Prop("cobblestone",2600,400),
		new Prop("cobblestone",2700,400),
		new Prop("garbage",3100,400),
		new Prop("garbage",3400,400),
		new Prop("garbage",3500,400),
		new Prop("garbage",3600,400),
		new Prop("cobblestone",600,500),
		new Prop("cobblestone",700,500),
		new Prop("cobblestone",800,500),
		new Prop("cobblestone",900,500),
		new Prop("cobblestone",2600,500),
		new Prop("cobblestone",2700,500),
		new Prop("garbage",3300,500),
		new Prop("garbage",3400,500),
		new Prop("garbage",3500,500),
		new Prop("garbage",3600,500),
		new Prop("garbage",3700,500),
		new Prop("broof5",100,600),
		new Prop("broof5",200,600),
		new Prop("broof5",300,600),
		new Prop("cobblestone",500,600),
		new Prop("cobblestone",600,600),
		new Prop("cobblestone",700,600),
		new Prop("cobblestone",800,600),
		new Prop("cobblestone",900,600),
		new Prop("cobblestone",1000,600),
		new Prop("cobblestone",1100,600),
		new Prop("cobblestone",1200,600),
		new Prop("cobblestone",1300,600),
		new Prop("cobblestone",1400,600),
		new Prop("cobblestone",1500,600),
		new Prop("cobblestone",1600,600),
		new Prop("cobblestone",1700,600),
		new Prop("cobblestone",1800,600),
		new Prop("cobblestone",1900,600),
		new Prop("cobblestone",2000,600),
		new Prop("cobblestone",2100,600),
		new Prop("cobblestone",2200,600),
		new Prop("cobblestone",2300,600),
		new Prop("cobblestone",2400,600),
		new Prop("cobblestone",2500,600),
		new Prop("cobblestone",2600,600),
		new Prop("cobblestone",2700,600),
		new Prop("garbage",2800,600),
		new Prop("garbage",3200,600),
		new Prop("garbage",3300,600),
		new Prop("garbage",3400,600),
		new Prop("garbage",3500,600),
		new Prop("garbage",3600,600),
		new Prop("garbage",3700,600),
		new Prop("bwall5",100,700),
		new Prop("bwall5",200,700),
		new Prop("bwall5",300,700),
		new Prop("cobblestone",500,700),
		new Prop("cobblestone",600,700),
		new Prop("cobblestone",700,700),
		new Prop("cobblestone",800,700),
		new Prop("cobblestone",900,700),
		new Prop("cobblestone",1000,700),
		new Prop("cobblestone",1100,700),
		new Prop("cobblestone",1200,700),
		new Prop("cobblestone",1300,700),
		new Prop("cobblestone",1400,700),
		new Prop("cobblestone",1500,700),
		new Prop("cobblestone",1600,700),
		new Prop("cobblestone",1700,700),
		new Prop("cobblestone",1800,700),
		new Prop("cobblestone",1900,700),
		new Prop("cobblestone",2000,700),
		new Prop("cobblestone",2100,700),
		new Prop("cobblestone",2200,700),
		new Prop("cobblestone",2300,700),
		new Prop("cobblestone",2400,700),
		new Prop("cobblestone",2500,700),
		new Prop("cobblestone",2600,700),
		new Prop("cobblestone",2700,700),
		new Prop("bwall5",100,800),
		new Prop("door1",200,800),
		new Prop("bwall5",300,800),
		new Prop("cobblestone",600,800),
		new Prop("cobblestone",700,800),
		new Prop("cobblestone",800,800),
		new Prop("cobblestone",900,800),
		new Prop("cobblestone",2600,800),
		new Prop("cobblestone",2700,800),
		new Prop("garbage",3700,800),
		new Prop("cobblestone",2600,900),
		new Prop("cobblestone",2700,900),
		new Prop("garbage",2900,900),
		new Prop("broof5",400,1000),
		new Prop("broof5",500,1000),
		new Prop("broof5",600,1000),
		new Prop("broof5",800,1000),
		new Prop("broof5",900,1000),
		new Prop("broof5",1000,1000),
		new Prop("broof5",1200,1000),
		new Prop("broof5",1300,1000),
		new Prop("broof5",1400,1000),
		new Prop("broof5",1600,1000),
		new Prop("broof5",1700,1000),
		new Prop("broof5",1800,1000),
		new Prop("broof5",2000,1000),
		new Prop("broof5",2100,1000),
		new Prop("broof5",2200,1000),
		new Prop("cobblestone",2600,1000),
		new Prop("cobblestone",2700,1000),
		new Prop("slumroof",3100,1000),
		new Prop("slumroof",3200,1000),
		new Prop("slumroof",3300,1000),
		new Prop("slumroof",3500,1000),
		new Prop("slumroof",3600,1000),
		new Prop("slumroof",3700,1000),
		new Prop("bwall5",400,1100),
		new Prop("bwall5",500,1100),
		new Prop("bwall5",600,1100),
		new Prop("bwall5",800,1100),
		new Prop("bwall5",900,1100),
		new Prop("bwall5",1000,1100),
		new Prop("bwall5",1200,1100),
		new Prop("bwall5",1300,1100),
		new Prop("bwall5",1400,1100),
		new Prop("bwall5",1600,1100),
		new Prop("bwall5",1700,1100),
		new Prop("bwall5",1800,1100),
		new Prop("bwall5",2000,1100),
		new Prop("bwall5",2100,1100),
		new Prop("bwall5",2200,1100),
		new Prop("cobblestone",2600,1100),
		new Prop("cobblestone",2700,1100),
		new Prop("slumbox",3100,1100),
		new Prop("door4",3200,1100),
		new Prop("slumbox",3300,1100),
		new Prop("slumbox",3500,1100),
		new Prop("door4",3600,1100),
		new Prop("slumbox",3700,1100),
		new Prop("bwall5",400,1200),
		new Prop("door1",500,1200),
		new Prop("bwall5",600,1200),
		new Prop("bwall5",800,1200),
		new Prop("door1",900,1200),
		new Prop("bwall5",1000,1200),
		new Prop("bwall5",1200,1200),
		new Prop("door1",1300,1200),
		new Prop("bwall5",1400,1200),
		new Prop("bwall5",1600,1200),
		new Prop("door1",1700,1200),
		new Prop("bwall5",1800,1200),
		new Prop("bwall5",2000,1200),
		new Prop("door1",2100,1200),
		new Prop("bwall5",2200,1200),
		new Prop("cobblestone",2600,1200),
		new Prop("cobblestone",2700,1200),
		new Prop("cobblestone",2600,1300),
		new Prop("cobblestone",2700,1300),
		new Prop("slumroof",3000,1300),
		new Prop("slumroof",3100,1300),
		new Prop("slumroof",3200,1300),
		new Prop("slumroof",3300,1300),
		new Prop("slumroof",3500,1300),
		new Prop("slumroof",3600,1300),
		new Prop("slumroof",3700,1300),
		new Prop("cobblestone",2600,1400),
		new Prop("cobblestone",2700,1400),
		new Prop("slumbox",3000,1400),
		new Prop("slumbox",3100,1400),
		new Prop("slumbox",3200,1400),
		new Prop("slumbox",3300,1400),
		new Prop("slumbox",3500,1400),
		new Prop("door4",3600,1400),
		new Prop("slumbox",3700,1400),
		new Prop("cobblestone",2600,1500),
		new Prop("cobblestone",2700,1500),
		new Prop("slumbox",3000,1500),
		new Prop("door4",3100,1500),
		new Prop("door4",3200,1500),
		new Prop("slumbox",3300,1500),
		new Prop("cobblestone",2600,1600),
		new Prop("cobblestone",2700,1600),
		new Prop("blank",3800,1600)
	];
	var gardens = [
		new Prop("tree1",0,0),
		new Prop("tree1",200,0),
		new Prop("tree1",400,0),
		new Prop("tree1",500,0),
		new Prop("tree1",600,0),
		new Prop("tree1",800,0),
		new Prop("tree1",1000,0),
		new Prop("tree1",1100,0),
		new Prop("tree1",1200,0),
		new Prop("tree1",1300,0),
		new Prop("tree1",1500,0),
		new Prop("tree1",1600,0),
		new Prop("tree1",1700,0),
		new Prop("tree1",1800,0),
		new Prop("tree1",2000,0),
		new Prop("tree1",2200,0),
		new Prop("tree1",2400,0),
		new Prop("tree1",2500,0),
		new Prop("tree1",2700,0),
		new Prop("tree1",2800,0),
		new Prop("tree1",2900,0),
		new Prop("tree1",3000,0),
		new Prop("tree1",3100,0),
		new Prop("tree1",3200,0),
		new Prop("tree1",3500,0),
		new Prop("tree1",3600,0),
		new Prop("tree1",3700,0),
		new Prop("tree1",3800,0),
		new Prop("tree1",3900,0),
		new Prop("tree1",4000,0),
		new Prop("tree1",4100,0),
		new Prop("tree1",4300,0),
		new Prop("tree1",4400,0),
		new Prop("tree1",4500,0),
		new Prop("tree1",4700,0),
		new Prop("tree1",4800,0),
		new Prop("tree1",4900,0),
		new Prop("tree1",100,100),
		new Prop("tree1",300,100),
		new Prop("tree1",500,100),
		new Prop("tree1",700,100),
		new Prop("tree1",900,100),
		new Prop("tree1",1100,100),
		new Prop("tree1",1300,100),
		new Prop("tree1",1400,100),
		new Prop("tree1",1900,100),
		new Prop("tree1",2300,100),
		new Prop("tree1",2500,100),
		new Prop("tree1",2600,100),
		new Prop("tree1",2700,100),
		new Prop("tree1",2800,100),
		new Prop("tree1",2900,100),
		new Prop("tree1",3100,100),
		new Prop("tree1",3300,100),
		new Prop("tree1",3400,100),
		new Prop("tree1",3600,100),
		new Prop("tree1",3700,100),
		new Prop("tree1",3900,100),
		new Prop("tree1",4000,100),
		new Prop("tree1",4200,100),
		new Prop("tree1",4300,100),
		new Prop("tree1",4400,100),
		new Prop("tree1",4700,100),
		new Prop("tree1",4800,100),
		new Prop("tree1",4900,100),
		new Prop("tree1",0,200),
		new Prop("tree1",100,200),
		new Prop("tree1",2500,200),
		new Prop("tree1",2700,200),
		new Prop("tree1",2900,200),
		new Prop("tree1",3000,200),
		new Prop("tree1",3100,200),
		new Prop("tree1",3200,200),
		new Prop("tree1",4100,200),
		new Prop("tree1",4200,200),
		new Prop("tree1",4300,200),
		new Prop("tree1",4500,200),
		new Prop("tree1",4800,200),
		new Prop("tree1",4900,200),
		new Prop("tree1",0,300),
		new Prop("tree1",200,300),
		new Prop("tree1",2600,300),
		new Prop("tree1",2800,300),
		new Prop("tree1",3000,300),
		new Prop("tree1",3200,300),
		new Prop("tree1",3300,300),
		new Prop("tree1",4200,300),
		new Prop("tree1",4300,300),
		new Prop("tree1",4400,300),
		new Prop("tree1",4500,300),
		new Prop("tree1",4900,300),
		new Prop("tree1",100,400),
		new Prop("flowers1",400,400),
		new Prop("flowers1",600,400),
		new Prop("flowers1",800,400),
		new Prop("flowers1",1000,400),
		new Prop("flowers1",1200,400),
		new Prop("flowers1",1400,400),
		new Prop("flowers1",1600,400),
		new Prop("statue1",1700,400),
		new Prop("flowers1",1800,400),
		new Prop("water",2100,400),
		new Prop("water",2200,400),
		new Prop("water",2300,400),
		new Prop("tree1",2800,400),
		new Prop("tree1",2900,400),
		new Prop("tree1",3100,400),
		new Prop("tree1",3200,400),
		new Prop("tree1",3400,400),
		new Prop("tree1",4300,400),
		new Prop("tree1",4500,400),
		new Prop("tree1",4600,400),
		new Prop("tree1",4800,400),
		new Prop("tree1",4900,400),
		new Prop("tree1",0,500),
		new Prop("tree1",200,500),
		new Prop("statue1",300,500),
		new Prop("flowers1",400,500),
		new Prop("flowers1",600,500),
		new Prop("flowers1",800,500),
		new Prop("flowers1",1000,500),
		new Prop("statue2",1100,500),
		new Prop("flowers1",1200,500),
		new Prop("flowers1",1400,500),
		new Prop("flowers1",1600,500),
		new Prop("flowers1",1800,500),
		new Prop("statue2",1900,500),
		new Prop("water",2100,500),
		new Prop("water",2200,500),
		new Prop("water",2300,500),
		new Prop("water",2400,500),
		new Prop("tree1",2700,500),
		new Prop("tree1",2800,500),
		new Prop("tree1",3000,500),
		new Prop("tree1",3100,500),
		new Prop("tree1",3200,500),
		new Prop("tree1",3300,500),
		new Prop("bTreeMid1",3700,500),
		new Prop("bTreeMid2",3800,500),
		new Prop("bTreeMid3",3900,500),
		new Prop("tree1",4400,500),
		new Prop("tree1",4800,500),
		new Prop("tree1",0,600),
		new Prop("tree1",100,600),
		new Prop("flowers1",200,600),
		new Prop("flowers1",400,600),
		new Prop("flowers1",600,600),
		new Prop("statue2",700,600),
		new Prop("flowers1",800,600),
		new Prop("flowers1",1000,600),
		new Prop("flowers1",1200,600),
		new Prop("flowers1",1400,600),
		new Prop("flowers1",1600,600),
		new Prop("flowers1",1800,600),
		new Prop("water",2100,600),
		new Prop("water",2200,600),
		new Prop("water",2300,600),
		new Prop("tree1",2900,600),
		new Prop("tree1",3000,600),
		new Prop("tree1",3200,600),
		new Prop("bTreeMid1",3600,600),
		new Prop("bTreeMid2",3700,600),
		new Prop("bTreeMid2",3800,600),
		new Prop("bTreeMid2",3900,600),
		new Prop("bTreeMid3",4000,600),
		new Prop("tree1",4300,600),
		new Prop("tree1",4400,600),
		new Prop("tree1",4700,600),
		new Prop("tree1",4900,600),
		new Prop("tree1",0,700),
		new Prop("tree1",100,700),
		new Prop("flowers1",200,700),
		new Prop("flowers1",400,700),
		new Prop("flowers1",600,700),
		new Prop("flowers1",800,700),
		new Prop("statue1",900,700),
		new Prop("flowers1",1000,700),
		new Prop("flowers1",1200,700),
		new Prop("flowers1",1400,700),
		new Prop("statue1",1500,700),
		new Prop("flowers1",1600,700),
		new Prop("bTreeMid1",3700,700),
		new Prop("bTreeMid2",3800,700),
		new Prop("bTreeMid3",3900,700),
		new Prop("tree1",4400,700),
		new Prop("tree1",4500,700),
		new Prop("tree1",4700,700),
		new Prop("tree1",4800,700),
		new Prop("tree1",4900,700),
		new Prop("tree1",0,800),
		new Prop("flowers1",200,800),
		new Prop("flowers1",400,800),
		new Prop("statue2",500,800),
		new Prop("flowers1",600,800),
		new Prop("flowers1",800,800),
		new Prop("flowers1",1000,800),
		new Prop("flowers1",1200,800),
		new Prop("flowers1",1400,800),
		new Prop("benchl",2200,800),
		new Prop("benchr",2300,800),
		new Prop("ladder",3600,800),
		new Prop("panel",3700,800),
		new Prop("bTreeTrunk2",3800,800),
		new Prop("bTreeTrunk2",3900,800),
		new Prop("tree1",4400,800),
		new Prop("tree1",4800,800),
		new Prop("flowers1",200,900),
		new Prop("flowers1",400,900),
		new Prop("flowers1",600,900),
		new Prop("flowers1",800,900),
		new Prop("flowers1",1000,900),
		new Prop("flowers1",1200,900),
		new Prop("ladder",3600,900),
		new Prop("bTreeTrunk1",3700,900),
		new Prop("bTreeTrunk2",3800,900),
		new Prop("bTreeTrunk2",3900,900),
		new Prop("bTreeTrunk3",4000,900),
		new Prop("water",4900,900),
		new Prop("flowers1",600,1000),
		new Prop("flowers1",800,1000),
		new Prop("flowers1",1000,1000),
		new Prop("flowers2",2500,1000),
		new Prop("water",4800,1000),
		new Prop("water",4900,1000),
		new Prop("flowers1",800,1100),
		new Prop("flowers2",1200,1100),
		new Prop("flowers2",1900,1100),
		new Prop("flowers2",2700,1100),
		new Prop("flowers2",3500,1100),
		new Prop("flowers2",3600,1100),
		new Prop("flowers2",3700,1100),
		new Prop("flowers2",3900,1100),
		new Prop("flowers2",4100,1100),
		new Prop("water",4900,1100),
		new Prop("flowers2",0,1200),
		new Prop("flowers2",300,1200),
		new Prop("flowers2",400,1200),
		new Prop("flowers2",700,1200),
		new Prop("flowers2",900,1200),
		new Prop("flowers2",1100,1200),
		new Prop("flowers2",1400,1200),
		new Prop("flowers2",2100,1200),
		new Prop("flowers2",2300,1200),
		new Prop("flowers2",2400,1200),
		new Prop("flowers2",2700,1200),
		new Prop("flowers2",2900,1200),
		new Prop("flowers1",3300,1200),
		new Prop("flowers1",3500,1200),
		new Prop("flowers2",3700,1200),
		new Prop("flowers2",3800,1200),
		new Prop("flowers2",3900,1200),
		new Prop("flowers2",4000,1200),
		new Prop("flowers1",4400,1200),
		new Prop("bencht",4500,1200),
		new Prop("water",4900,1200),
		new Prop("flowers2",100,1300),
		new Prop("flowers2",200,1300),
		new Prop("flowers2",400,1300),
		new Prop("flowers2",600,1300),
		new Prop("flowers2",800,1300),
		new Prop("flowers2",1000,1300),
		new Prop("flowers2",1200,1300),
		new Prop("flowers2",1300,1300),
		new Prop("flowers2",1500,1300),
		new Prop("flowers2",1800,1300),
		new Prop("flowers2",2000,1300),
		new Prop("flowers2",2200,1300),
		new Prop("flowers2",2400,1300),
		new Prop("flowers2",2600,1300),
		new Prop("flowers2",2800,1300),
		new Prop("flowers1",3100,1300),
		new Prop("flowers2",3200,1300),
		new Prop("flowers1",3300,1300),
		new Prop("flowers1",3500,1300),
		new Prop("flowers2",3600,1300),
		new Prop("flowers2",3700,1300),
		new Prop("flowers2",3800,1300),
		new Prop("flowers1",4100,1300),
		new Prop("flowers1",4400,1300),
		new Prop("benchb",4500,1300),
		new Prop("water",4900,1300),
		new Prop("flowers2",500,1400),
		new Prop("flowers2",700,1400),
		new Prop("flowers2",800,1400),
		new Prop("flowers2",900,1400),
		new Prop("flowers2",1900,1400),
		new Prop("flowers2",2200,1400),
		new Prop("flowers2",2300,1400),
		new Prop("flowers2",2400,1400),
		new Prop("flowers2",2500,1400),
		new Prop("flowers2",2600,1400),
		new Prop("flowers2",2900,1400),
		new Prop("flowers1",3100,1400),
		new Prop("flowers1",3300,1400),
		new Prop("flowers1",3500,1400),
		new Prop("flowers2",3600,1400),
		new Prop("flowers2",3700,1400),
		new Prop("flowers2",3800,1400),
		new Prop("flowers2",3900,1400),
		new Prop("flowers2",4000,1400),
		new Prop("flowers1",4400,1400),
		new Prop("bencht",200,1500),
		new Prop("flowers2",900,1500),
		new Prop("flowers2",2400,1500),
		new Prop("flowers2",2700,1500),
		new Prop("statue1",2900,1500),
		new Prop("flowers2",3000,1500),
		new Prop("flowers1",3100,1500),
		new Prop("flowers2",3200,1500),
		new Prop("flowers1",3300,1500),
		new Prop("flowers2",3500,1500),
		new Prop("flowers2",3800,1500),
		new Prop("flowers2",3900,1500),
		new Prop("flowers2",4000,1500),
		new Prop("flowers1",4200,1500),
		new Prop("flowers1",4400,1500),
		new Prop("statue2",4600,1500),
		new Prop("flowers2",4900,1500),
		new Prop("benchb",200,1600),
		new Prop("flowers2",700,1600),
		new Prop("flowers2",1200,1600),
		new Prop("flowers1",1300,1600),
		new Prop("flowers1",1400,1600),
		new Prop("flowers1",1500,1600),
		new Prop("flowers1",1600,1600),
		new Prop("flowers2",1700,1600),
		new Prop("flowers1",1800,1600),
		new Prop("flowers1",1900,1600),
		new Prop("flowers1",2000,1600),
		new Prop("flowers1",2100,1600),
		new Prop("flowers2",2200,1600),
		new Prop("flowers2",2400,1600),
		new Prop("flowers2",2500,1600),
		new Prop("flowers2",2600,1600),
		new Prop("flowers2",2700,1600),
		new Prop("flowers2",2800,1600),
		new Prop("flowers2",2900,1600),
		new Prop("flowers1",3100,1600),
		new Prop("flowers2",3300,1600),
		new Prop("flowers2",3400,1600),
		new Prop("flowers1",3600,1600),
		new Prop("flowers2",3700,1600),
		new Prop("flowers2",3800,1600),
		new Prop("flowers1",3900,1600),
		new Prop("flowers1",4200,1600),
		new Prop("statue",4500,1600),
		new Prop("flowers2",500,1700),
		new Prop("flowers1",700,1700),
		new Prop("flowers1",1200,1700),
		new Prop("flowers1",1700,1700),
		new Prop("flowers1",2200,1700),
		new Prop("flowers2",2400,1700),
		new Prop("flowers2",2600,1700),
		new Prop("flowers1",2800,1700),
		new Prop("flowers2",2900,1700),
		new Prop("flowers2",3000,1700),
		new Prop("flowers1",3100,1700),
		new Prop("flowers2",3200,1700),
		new Prop("flowers2",3300,1700),
		new Prop("flowers1",3400,1700),
		new Prop("flowers1",3600,1700),
		new Prop("flowers1",3900,1700),
		new Prop("flowers1",4200,1700),
		new Prop("flowers2",4700,1700),
		new Prop("flowers2",4800,1700),
		new Prop("flowers2",100,1800),
		new Prop("flowers2",400,1800),
		new Prop("flowers1",500,1800),
		new Prop("flowers1",600,1800),
		new Prop("flowers1",700,1800),
		new Prop("flowers1",800,1800),
		new Prop("flowers2",900,1800),
		new Prop("flowers1",1200,1800),
		new Prop("flowers1",1500,1800),
		new Prop("flowers1",1600,1800),
		new Prop("flowers2",1700,1800),
		new Prop("flowers1",1800,1800),
		new Prop("flowers1",1900,1800),
		new Prop("flowers1",2200,1800),
		new Prop("flowers2",2400,1800),
		new Prop("flowers2",2500,1800),
		new Prop("flowers1",2600,1800),
		new Prop("flowers2",2700,1800),
		new Prop("flowers1",2800,1800),
		new Prop("flowers2",2900,1800),
		new Prop("flowers2",3000,1800),
		new Prop("flowers2",3200,1800),
		new Prop("flowers1",3400,1800),
		new Prop("flowers1",3600,1800),
		new Prop("flowers1",3900,1800),
		new Prop("statue2",4100,1800),
		new Prop("flowers1",4400,1800),
		new Prop("flowers2",4600,1800),
		new Prop("flowers2",4900,1800),
		new Prop("flowers1",200,1900),
		new Prop("flowers1",700,1900),
		new Prop("flowers1",1200,1900),
		new Prop("flowers1",1700,1900),
		new Prop("flowers1",2200,1900),
		new Prop("flowers2",2500,1900),
		new Prop("flowers1",2600,1900),
		new Prop("flowers1",2800,1900),
		new Prop("flowers2",2900,1900),
		new Prop("flowers1",3000,1900),
		new Prop("flowers2",3100,1900),
		new Prop("statue1",3200,1900),
		new Prop("flowers1",3400,1900),
		new Prop("flowers1",3600,1900),
		new Prop("flowers1",3900,1900),
		new Prop("statue2",4100,1900),
		new Prop("flowers1",4400,1900),
		new Prop("flowers2",4800,1900),
		new Prop("flowers1",700,2000),
		new Prop("flowers1",1200,2000),
		new Prop("flowers1",1400,2000),
		new Prop("flowers1",1500,2000),
		new Prop("flowers1",1600,2000),
		new Prop("flowers1",1700,2000),
		new Prop("flowers1",1800,2000),
		new Prop("flowers1",1900,2000),
		new Prop("flowers1",2000,2000),
		new Prop("flowers1",2200,2000),
		new Prop("flowers2",2400,2000),
		new Prop("flowers1",2600,2000),
		new Prop("flowers1",2800,2000),
		new Prop("flowers2",2900,2000),
		new Prop("flowers1",3000,2000),
		new Prop("flowers1",3400,2000),
		new Prop("flowers1",3900,2000),
		new Prop("flowers2",4300,2000),
		new Prop("flowers2",4600,2000),
		new Prop("flowers2",4800,2000),
		new Prop("flowers2",4900,2000),
		new Prop("flowers2",100,2100),
		new Prop("flowers1",200,2100),
		new Prop("flowers2",400,2100),
		new Prop("flowers1",500,2100),
		new Prop("flowers1",600,2100),
		new Prop("flowers2",700,2100),
		new Prop("flowers1",900,2100),
		new Prop("flowers1",1000,2100),
		new Prop("flowers1",1200,2100),
		new Prop("flowers1",2200,2100),
		new Prop("flowers2",2500,2100),
		new Prop("flowers1",2600,2100),
		new Prop("flowers2",2700,2100),
		new Prop("flowers1",2800,2100),
		new Prop("flowers1",3000,2100),
		new Prop("flowers1",3400,2100),
		new Prop("flowers1",3900,2100),
		new Prop("flowers2",4100,2100),
		new Prop("flowers1",4500,2100),
		new Prop("flowers2",4700,2100),
		new Prop("flowers2",4800,2100),
		new Prop("flowers1",200,2200),
		new Prop("flowers1",1200,2200),
		new Prop("flowers1",1500,2200),
		new Prop("statue1",1600,2200),
		new Prop("statue1",1800,2200),
		new Prop("flowers1",1900,2200),
		new Prop("flowers1",2200,2200),
		new Prop("statue2",2500,2200),
		new Prop("flowers1",2700,2200),
		new Prop("flowers1",2800,2200),
		new Prop("flowers2",2900,2200),
		new Prop("flowers1",3000,2200),
		new Prop("flowers2",4300,2200),
		new Prop("flowers2",4400,2200),
		new Prop("flowers1",4500,2200),
		new Prop("flowers2",4600,2200),
		new Prop("flowers2",4700,2200),
		new Prop("flowers2",4900,2200),
		new Prop("flowers1",200,2300),
		new Prop("flowers1",500,2300),
		new Prop("statue1",600,2300),
		new Prop("statue1",800,2300),
		new Prop("flowers1",900,2300),
		new Prop("flowers1",1300,2300),
		new Prop("flowers1",1500,2300),
		new Prop("flowers1",1600,2300),
		new Prop("flowers1",1700,2300),
		new Prop("flowers1",1800,2300),
		new Prop("flowers1",1900,2300),
		new Prop("flowers1",2200,2300),
		new Prop("flowers1",2600,2300),
		new Prop("flowers2",2900,2300),
		new Prop("flowers2",3000,2300),
		new Prop("flowers1",3100,2300),
		new Prop("statue2",3200,2300),
		new Prop("flowers1",3400,2300),
		new Prop("flowers1",3500,2300),
		new Prop("flowers1",3600,2300),
		new Prop("flowers2",3700,2300),
		new Prop("flowers2",3900,2300),
		new Prop("flowers2",4100,2300),
		new Prop("flowers1",4300,2300),
		new Prop("flowers1",4400,2300),
		new Prop("flowers2",4500,2300),
		new Prop("flowers2",4600,2300),
		new Prop("flowers2",4800,2300),
		new Prop("flowers2",200,2400),
		new Prop("flowers1",300,2400),
		new Prop("flowers1",500,2400),
		new Prop("flowers1",600,2400),
		new Prop("flowers1",700,2400),
		new Prop("flowers1",800,2400),
		new Prop("flowers1",900,2400),
		new Prop("flowers1",1200,2400),
		new Prop("flowers1",1600,2400),
		new Prop("flowers1",1700,2400),
		new Prop("flowers1",1800,2400),
		new Prop("flowers1",2000,2400),
		new Prop("flowers1",2200,2400),
		new Prop("flowers1",2600,2400),
		new Prop("flowers1",2900,2400),
		new Prop("flowers1",3100,2400),
		new Prop("flowers1",3400,2400),
		new Prop("statue1",3500,2400),
		new Prop("flowers2",3600,2400),
		new Prop("flowers2",3800,2400),
		new Prop("flowers2",4000,2400),
		new Prop("statue2",4100,2400),
		new Prop("flowers2",4200,2400),
		new Prop("flowers1",4400,2400),
		new Prop("flowers1",4500,2400),
		new Prop("flowers2",4700,2400),
		new Prop("flowers2",4900,2400),
		new Prop("flowers2",100,2500),
		new Prop("flowers1",300,2500),
		new Prop("flowers1",400,2500),
		new Prop("flowers1",500,2500),
		new Prop("flowers1",600,2500),
		new Prop("flowers2",700,2500),
		new Prop("flowers1",800,2500),
		new Prop("flowers1",900,2500),
		new Prop("flowers1",1000,2500),
		new Prop("flowers2",1100,2500),
		new Prop("flowers2",1200,2500),
		new Prop("flowers1",1300,2500),
		new Prop("flowers1",1400,2500),
		new Prop("flowers1",1500,2500),
		new Prop("flowers1",1700,2500),
		new Prop("flowers1",1900,2500),
		new Prop("flowers2",2000,2500),
		new Prop("flowers1",2100,2500),
		new Prop("flowers1",2200,2500),
		new Prop("statue1",2800,2500),
		new Prop("flowers1",2900,2500),
		new Prop("flowers1",3100,2500),
		new Prop("flowers1",3300,2500),
		new Prop("flowers1",3400,2500),
		new Prop("flowers2",3500,2500),
		new Prop("flowers2",3700,2500),
		new Prop("flowers2",3900,2500),
		new Prop("flowers2",4100,2500),
		new Prop("flowers2",4300,2500),
		new Prop("flowers1",4500,2500),
		new Prop("flowers1",4900,2500),
		new Prop("flowers1",1200,2600),
		new Prop("flowers1",1300,2600),
		new Prop("flowers1",1400,2600),
		new Prop("flowers1",1500,2600),
		new Prop("flowers1",1600,2600),
		new Prop("flowers2",1700,2600),
		new Prop("flowers1",1800,2600),
		new Prop("flowers1",1900,2600),
		new Prop("flowers1",2000,2600),
		new Prop("flowers1",2100,2600),
		new Prop("flowers2",2200,2600),
		new Prop("flowers1",3100,2600),
		new Prop("flowers1",3300,2600),
		new Prop("flowers2",3400,2600),
		new Prop("flowers2",3600,2600),
		new Prop("flowers2",3800,2600),
		new Prop("flowers2",4000,2600),
		new Prop("flowers2",4200,2600),
		new Prop("flowers2",4400,2600),
		new Prop("flowers1",4500,2600),
		new Prop("flowers2",4700,2600),
		new Prop("flowers2",4900,2600),
		new Prop("flowers2",0,2700),
		new Prop("benchl",600,2700),
		new Prop("benchr",700,2700),
		new Prop("flowers1",1200,2700),
		new Prop("flowers1",2200,2700),
		new Prop("flowers1",3300,2700),
		new Prop("flowers1",3400,2700),
		new Prop("flowers2",3500,2700),
		new Prop("flowers2",3700,2700),
		new Prop("statue2",3800,2700),
		new Prop("flowers2",3900,2700),
		new Prop("flowers2",4100,2700),
		new Prop("flowers2",4300,2700),
		new Prop("statue1",4400,2700),
		new Prop("flowers1",4500,2700),
		new Prop("flowers2",4600,2700),
		new Prop("flowers2",4800,2700),
		new Prop("flowers2",4900,2700),
		new Prop("flowers2",100,2800),
		new Prop("flowers2",200,2800),
		new Prop("flowers2",300,2800),
		new Prop("benchl",1600,2800),
		new Prop("benchr",1700,2800),
		new Prop("water",2800,2800),
		new Prop("water",2900,2800),
		new Prop("water",3000,2800),
		new Prop("flowers1",3400,2800),
		new Prop("flowers1",3500,2800),
		new Prop("flowers1",3600,2800),
		new Prop("flowers2",3800,2800),
		new Prop("flowers2",4000,2800),
		new Prop("flowers2",4200,2800),
		new Prop("flowers1",4300,2800),
		new Prop("flowers1",4400,2800),
		new Prop("flowers1",4500,2800),
		new Prop("flowers2",4600,2800),
		new Prop("flowers2",4700,2800),
		new Prop("flowers2",4800,2800),
		new Prop("flowers2",4900,2800),
		new Prop("flowers2",0,2900),
		new Prop("flowers2",100,2900),
		new Prop("flowers2",200,2900),
		new Prop("flowers2",300,2900),
		new Prop("flowers2",400,2900),
		new Prop("flowers2",600,2900),
		new Prop("flowers2",700,2900),
		new Prop("flowers2",900,2900),
		new Prop("water",2200,2900),
		new Prop("water",2300,2900),
		new Prop("water",2700,2900),
		new Prop("water",2800,2900),
		new Prop("water",2900,2900),
		new Prop("water",3000,2900),
		new Prop("water",3100,2900),
		new Prop("water",3200,2900),
		new Prop("flowers1",3600,2900),
		new Prop("flowers1",3700,2900),
		new Prop("flowers1",3800,2900),
		new Prop("flowers1",3900,2900),
		new Prop("flowers1",4000,2900),
		new Prop("flowers1",4100,2900),
		new Prop("flowers1",4200,2900),
		new Prop("flowers1",4300,2900),
		new Prop("flowers2",4400,2900),
		new Prop("flowers2",4500,2900),
		new Prop("flowers2",4600,2900),
		new Prop("flowers2",4700,2900),
		new Prop("flowers2",4800,2900),
		new Prop("flowers2",4900,2900)
	];
	var cavein = [
		new Prop("cavewall",0,0),
		new Prop("cavewall",100,0),
		new Prop("cavewall",200,0),
		new Prop("cavewall",300,0),
		new Prop("cavewall",400,0),
		new Prop("cavewall",500,0),
		new Prop("cavewall",600,0),
		new Prop("cavewall",700,0),
		new Prop("cavewall",800,0),
		new Prop("cavewall",900,0),
		new Prop("cavewall",1000,0),
		new Prop("cavewall",1100,0),
		new Prop("cavewall",1200,0),
		new Prop("cavewall",1300,0),
		new Prop("cavewall",1400,0),
		new Prop("cavewall",1500,0),
		new Prop("cavewall",1600,0),
		new Prop("cavewall",1700,0),
		new Prop("cavewall",1800,0),
		new Prop("cavewall",0,100),
		new Prop("cavewall",100,100),
		new Prop("cavewall",200,100),
		new Prop("cavewall",300,100),
		new Prop("water",1300,100),
		new Prop("water",1400,100),
		new Prop("cavewall",1500,100),
		new Prop("cavewall",1600,100),
		new Prop("cavewall",1700,100),
		new Prop("cavewall",1800,100),
		new Prop("cavewall",0,200),
		new Prop("cavewall",100,200),
		new Prop("stalagmite",1200,200),
		new Prop("water",1300,200),
		new Prop("water",1400,200),
		new Prop("water",1500,200),
		new Prop("water",1600,200),
		new Prop("cavewall",1700,200),
		new Prop("cavewall",1800,200),
		new Prop("cavewall",0,300),
		new Prop("stalagmite",400,300),
		new Prop("water",1200,300),
		new Prop("water",1300,300),
		new Prop("water",1400,300),
		new Prop("water",1500,300),
		new Prop("water",1600,300),
		new Prop("water",1700,300),
		new Prop("cavewall",1800,300),
		new Prop("cavewall",0,400),
		new Prop("stalagmite",200,400),
		new Prop("stalagmite",600,400),
		new Prop("stalagmite",700,400),
		new Prop("water",1200,400),
		new Prop("water",1300,400),
		new Prop("water",1400,400),
		new Prop("water",1500,400),
		new Prop("cavewall",1700,400),
		new Prop("cavewall",1800,400),
		new Prop("cavewall",0,500),
		new Prop("stalagmite",200,500),
		new Prop("stalagmite",500,500),
		new Prop("stalagmite",1300,500),
		new Prop("cavewall",1800,500),
		new Prop("cavewall",0,600),
		new Prop("stalagmite",300,600),
		new Prop("stalagmite",1500,600),
		new Prop("cavewall",1800,600),
		new Prop("cavewall",0,700),
		new Prop("stalagmite",600,700),
		new Prop("stalagmite",1100,700),
		new Prop("stalagmite",1500,700),
		new Prop("stalagmite",1600,700),
		new Prop("cavewall",1800,700),
		new Prop("cavewall",0,800),
		new Prop("stalagmite",200,800),
		new Prop("stalagmite",500,800),
		new Prop("cavewall",1800,800),
		new Prop("cavewall",0,900),
		new Prop("cavewall",100,900),
		new Prop("stalagmite",500,900),
		new Prop("cavewall",1700,900),
		new Prop("cavewall",1800,900),
		new Prop("cavewall",0,1000),
		new Prop("stalagmite",600,1000),
		new Prop("stalagmite",1500,1000),
		new Prop("cavewall",1800,1000),
		new Prop("cavewall",0,1100),
		new Prop("cavewall",100,1100),
		new Prop("stalagmite",400,1100),
		new Prop("naturedoorh",500,1100),
		new Prop("stalagmite",600,1100),
		new Prop("stalagmite",700,1100),
		new Prop("stalagmite",1200,1100),
		new Prop("stalagmite",1300,1100),
		new Prop("stalagmite",1500,1100),
		new Prop("cavewall",1700,1100),
		new Prop("cavewall",1800,1100)
	];
	var caveout = [
		new Prop("tree4",0,0),
		new Prop("tree4",200,0),
		new Prop("tree4",400,0),
		new Prop("tree4",500,0),
		new Prop("tree4",600,0),
		new Prop("cavewall",800,0),
		new Prop("cavewall",900,0),
		new Prop("cavewall",1000,0),
		new Prop("cavewall",1100,0),
		new Prop("cavewall",1200,0),
		new Prop("cavewall",1300,0),
		new Prop("cavewall",1400,0),
		new Prop("cavewall",1500,0),
		new Prop("tree4",100,100),
		new Prop("tree4",300,100),
		new Prop("tree4",400,100),
		new Prop("tree4",500,100),
		new Prop("cavewall",700,100),
		new Prop("cavewall",800,100),
		new Prop("cavewall",900,100),
		new Prop("cavewall",1000,100),
		new Prop("cavewall",1100,100),
		new Prop("cavewall",1200,100),
		new Prop("cavewall",1300,100),
		new Prop("cavewall",1400,100),
		new Prop("cavewall",1500,100),
		new Prop("tree4",0,200),
		new Prop("tree4",200,200),
		new Prop("tree4",300,200),
		new Prop("tree4",600,200),
		new Prop("cavewall",700,200),
		new Prop("cavewall",800,200),
		new Prop("cavewall",900,200),
		new Prop("cavewall",1000,200),
		new Prop("cavewall",1100,200),
		new Prop("dDoor",1200,200),
		new Prop("cavewall",1300,200),
		new Prop("cavewall",1400,200),
		new Prop("cavewall",1500,200),
		new Prop("tree4",0,300),
		new Prop("tree4",100,300),
		new Prop("tree4",300,300),
		new Prop("tree4",400,300),
		new Prop("tree4",500,300),
		new Prop("flowers2",600,300),
		new Prop("flowers2",800,300),
		new Prop("flowers2",1300,300),
		new Prop("flowers2",1500,300),
		new Prop("tree4",100,400),
		new Prop("tree4",200,400),
		new Prop("flowers2",400,400),
		new Prop("tree4",500,400),
		new Prop("flowers2",900,400),
		new Prop("tree4",0,500),
		new Prop("tree4",300,500),
		new Prop("flowers2",500,500),
		new Prop("flowers2",1400,500),
		new Prop("flowers2",1500,500),
		new Prop("tree4",100,600),
		new Prop("tree4",200,600),
		new Prop("tree4",600,600),
		new Prop("flowers2",1100,600),
		new Prop("flowers2",1300,600),
		new Prop("flowers2",1400,600),
		new Prop("flowers2",1500,600),
		new Prop("tree4",0,700),
		new Prop("tree4",400,700),
		new Prop("flowers2",1100,700),
		new Prop("flowers2",1300,700),
		new Prop("flowers2",1500,700),
		new Prop("tree4",0,800),
		new Prop("naturedoorh",200,8800),
		new Prop("flowers2",1000,800),
		new Prop("flowers2",1200,800),
		new Prop("flowers2",1400,800),
		new Prop("blank",1500,800)
	];
	var maze1 = [
		new Prop("bushwallm",0,0),
		new Prop("bushwallm",100,0),
		new Prop("bushwallm",200,0),
		new Prop("bushwallm",300,0),
		new Prop("bushwallm",400,0),
		new Prop("bushwallb",500,0),
		new Prop("bushwallb",600,0),
		new Prop("bushwallb",700,0),
		new Prop("bushwallb",800,0),
		new Prop("bushwallb",900,0),
		new Prop("bushwallb",1000,0),
		new Prop("bushwallb",1100,0),
		new Prop("bushwallb",1200,0),
		new Prop("bushwallb",1300,0),
		new Prop("bushwallb",1400,0),
		new Prop("bushwallb",1500,0),
		new Prop("bushwallb",1600,0),
		new Prop("bushwallb",1700,0),
		new Prop("bushwallb",1800,0),
		new Prop("bushwallb",1900,0),
		new Prop("bushwallb",2000,0),
		new Prop("bushwallb",2100,0),
		new Prop("bushwallb",2200,0),
		new Prop("bushwallb",2300,0),
		new Prop("bushwallb",2400,0),
		new Prop("bushwallb",2500,0),
		new Prop("bushwallb",2600,0),
		new Prop("bushwallb",2700,0),
		new Prop("bushwallb",2800,0),
		new Prop("bushwallm",2900,0),
		new Prop("bushwallm",0,100),
		new Prop("bushwallm",100,100),
		new Prop("bushwallm",200,100),
		new Prop("bushwallm",300,100),
		new Prop("bushwallm",400,100),
		new Prop("bushwallm",2900,100),
		new Prop("bushwallm",0,200),
		new Prop("bushwallm",100,200),
		new Prop("bushwallm",200,200),
		new Prop("bushwallm",300,200),
		new Prop("bushwallm",400,200),
		new Prop("bushwalltl",600,200),
		new Prop("bushwallr",700,200),
		new Prop("bushwallr",800,200),
		new Prop("bushwallr",900,200),
		new Prop("bushwallr",1000,200),
		new Prop("bushwallr",1100,200),
		new Prop("abushl",1300,200),
		new Prop("abushmh",1400,200),
		new Prop("abushmh",1500,200),
		new Prop("abushmh",1600,200),
		new Prop("abushmh",1700,200),
		new Prop("abushmh",1800,200),
		new Prop("abushmh",1900,200),
		new Prop("abushr",2000,200),
		new Prop("bushwalltl",2200,200),
		new Prop("bushwallt",2300,200),
		new Prop("bushwallt",2400,200),
		new Prop("bushwallt",2500,200),
		new Prop("bushwallt",2600,200),
		new Prop("bushwalltr",2700,200),
		new Prop("bushwallm",2900,200),
		new Prop("bushwallm",0,300),
		new Prop("bushwallm",100,300),
		new Prop("bushwallm",200,300),
		new Prop("bushwallm",300,300),
		new Prop("bushwallm",400,300),
		new Prop("bushwall",600,300),
		new Prop("bushwallm",700,300),
		new Prop("bushwallm",800,300),
		new Prop("bushwallm",900,300),
		new Prop("bushwallm",1000,300),
		new Prop("bushwallm",1100,300),
		new Prop("bushwallm",2200,300),
		new Prop("bushwallm",2300,300),
		new Prop("bushwallm",2400,300),
		new Prop("bushwallm",2500,300),
		new Prop("bushwallm",2600,300),
		new Prop("bushwallm",2700,300),
		new Prop("bushwallm",2900,300),
		new Prop("bushwallb",0,400),
		new Prop("bushwallb",100,400),
		new Prop("bushwallb",200,400),
		new Prop("bushwallb",300,400),
		new Prop("bushwallbr",400,400),
		new Prop("bushwallbl",600,400),
		new Prop("bushwallb",700,400),
		new Prop("bushwallb",800,400),
		new Prop("bushwallm",900,400),
		new Prop("bushwallm",1000,400),
		new Prop("bushwallb",1100,400),
		new Prop("abushmh",1200,400),
		new Prop("abushmh",1300,400),
		new Prop("abushr",1400,400),
		new Prop("abushl",1600,400),
		new Prop("abushmh",1700,400),
		new Prop("abushmh",1800,400),
		new Prop("abushmh",1900,400),
		new Prop("abushr",2000,400),
		new Prop("bushwallbl",2200,400),
		new Prop("bushwallb",2300,400),
		new Prop("bushwallb",2400,400),
		new Prop("bushwallb",2500,400),
		new Prop("bushwallb",2600,400),
		new Prop("bushwallbl",2700,400),
		new Prop("bushwallm",2900,400),
		new Prop("naturedoorv",0,500),
		new Prop("bushwallm",900,500),
		new Prop("bushwallm",1000,500),
		new Prop("bushwallm",2900,500),
		new Prop("bushwallt",0,600),
		new Prop("bushwallt",100,600),
		new Prop("bushwallt",200,600),
		new Prop("bushwalltl",400,600),
		new Prop("bushwallt",500,600),
		new Prop("bushwallt",600,600),
		new Prop("bushwalltr",700,600),
		new Prop("bushwallm",900,600),
		new Prop("bushwallm",1000,600),
		new Prop("bushwalltl",1200,600),
		new Prop("bushwallt",1300,600),
		new Prop("bushwallt",1400,600),
		new Prop("bushwalltr",1500,600),
		new Prop("bushwalltl",1700,600),
		new Prop("bushwallt",1800,600),
		new Prop("bushwallt",1900,600),
		new Prop("bushwallt",2000,600),
		new Prop("bushwallt",2100,600),
		new Prop("bushwalltr",2200,600),
		new Prop("bushwalltl",2400,600),
		new Prop("bushwallt",2500,600),
		new Prop("bushwallt",2600,600),
		new Prop("bushwalltr",2700,600),
		new Prop("bushwallm",2900,600),
		new Prop("bushwallm",0,700),
		new Prop("bushwallm",100,700),
		new Prop("bushwallm",200,700),
		new Prop("bushwallm",400,700),
		new Prop("bushwallm",500,700),
		new Prop("bushwallm",600,700),
		new Prop("bushwallm",700,700),
		new Prop("bushwallm",900,700),
		new Prop("bushwallm",1000,700),
		new Prop("bushwallm",1200,700),
		new Prop("bushwallm",1300,700),
		new Prop("bushwallm",1400,700),
		new Prop("bushwallm",1500,700),
		new Prop("bushwallm",1700,700),
		new Prop("bushwallm",1800,700),
		new Prop("bushwallm",1900,700),
		new Prop("bushwallm",2000,700),
		new Prop("bushwallm",2100,700),
		new Prop("bushwallbr",2200,700),
		new Prop("bushwallm",2400,700),
		new Prop("bushwallm",2500,700),
		new Prop("bushwallm",2600,700),
		new Prop("bushwallm",2700,700),
		new Prop("bushwallm",2900,700),
		new Prop("bushwallm",0,800),
		new Prop("bushwallm",100,800),
		new Prop("bushwallm",200,800),
		new Prop("bushwallm",400,800),
		new Prop("bushwallm",500,800),
		new Prop("bushwallb",600,800),
		new Prop("bushwallbr",700,800),
		new Prop("bushwallm",900,800),
		new Prop("bushwallm",1000,800),
		new Prop("bushwallm",1200,800),
		new Prop("bushwallm",1300,800),
		new Prop("bushwallm",1400,800),
		new Prop("bushwallm",1500,800),
		new Prop("bushwallm",1700,800),
		new Prop("bushwallm",1800,800),
		new Prop("bushwallm",1900,800),
		new Prop("bushwallm",2000,800),
		new Prop("bushwallm",2100,800),
		new Prop("bushwall",2200,800),
		new Prop("bushwallm",2400,800),
		new Prop("bushwallm",2500,800),
		new Prop("bushwallm",2600,800),
		new Prop("bushwallm",2700,800),
		new Prop("bushwallm",2900,800),
		new Prop("bushwallm",0,900),
		new Prop("bushwallm",100,900),
		new Prop("bushwallm",200,900),
		new Prop("bushwallbl",400,900),
		new Prop("bushwallbr",500,900),
		new Prop("bushwallbl",900,900),
		new Prop("bushwallbr",1000,900),
		new Prop("bushwallbl",1200,900),
		new Prop("bushwallm",1300,900),
		new Prop("bushwallm",1400,900),
		new Prop("bushwallbr",1500,900),
		new Prop("bushwallbl",1700,900),
		new Prop("bushwallm",1800,900),
		new Prop("bushwallm",1900,900),
		new Prop("bushwallm",2000,900),
		new Prop("bushwallm",2100,900),
		new Prop("abushmv",2200,900),
		new Prop("abushmh",2300,900),
		new Prop("bushwallb",2400,900),
		new Prop("bushwallb",2500,900),
		new Prop("bushwallb",2600,900),
		new Prop("bushwallbr",2700,900),
		new Prop("bushwallm",2900,900),
		new Prop("bushwallm",0,1000),
		new Prop("bushwallm",100,1000),
		new Prop("bushwallm",200,1000),
		new Prop("abusht",800,1000),
		new Prop("bushwallm",2900,1000),
		new Prop("bushwallm",0,1100),
		new Prop("bushwallm",100,1100),
		new Prop("bushwallb",200,1100),
		new Prop("abushmh",300,1100),
		new Prop("abushmh",400,1100),
		new Prop("abushmh",500,1100),
		new Prop("abushmh",600,1100),
		new Prop("bushwallb",700,1100),
		new Prop("abushmh",800,1100),
		new Prop("abushmh",900,1100),
		new Prop("abushmh",1000,1100),
		new Prop("abushmh",1100,1100),
		new Prop("abushmh",1200,1100),
		new Prop("abushmh",1300,1100),
		new Prop("bushwallt",1400,1100),
		new Prop("bushwallt",1500,1100),
		new Prop("bushwallt",1600,1100),
		new Prop("bushwallt",1700,1100),
		new Prop("bushwallt",1800,1100),
		new Prop("bushwalltr",1900,1100),
		new Prop("bushwalltl",2100,1100),
		new Prop("bushwallr",2200,1100),
		new Prop("bushwallr",2300,1100),
		new Prop("bushwallr",2400,1100),
		new Prop("bushwallr",2500,1100),
		new Prop("bushwallr",2600,1100),
		new Prop("bushwalltr",2700,1100),
		new Prop("bushwallm",2900,1100),
		new Prop("bushwallm",0,1200),
		new Prop("bushwallm",100,1200),
		new Prop("bushwallm",1400,1200),
		new Prop("bushwallm",1500,1200),
		new Prop("bushwallm",1600,1200),
		new Prop("bushwallm",1700,1200),
		new Prop("bushwallm",1800,1200),
		new Prop("bushwallm",1900,1200),
		new Prop("bushwallm",2100,1200),
		new Prop("bushwallm",2200,1200),
		new Prop("bushwallm",2300,1200),
		new Prop("bushwallm",2400,1200),
		new Prop("bushwallm",2500,1200),
		new Prop("bushwallm",2600,1200),
		new Prop("bushwallm",2700,1200),
		new Prop("bushwallm",2900,1200),
		new Prop("bushwallm",0,1300),
		new Prop("bushwallm",100,1300),
		new Prop("bushwalltl",300,1300),
		new Prop("bushwallt",400,1300),
		new Prop("bushwallt",500,1300),
		new Prop("bushwallt",600,1300),
		new Prop("bushwallt",700,1300),
		new Prop("bushwalltr",800,1300),
		new Prop("bushwalltl",1000,1300),
		new Prop("bushwallt",1100,1300),
		new Prop("bushwallt",1200,1300),
		new Prop("bushwalltr",1300,1300),
		new Prop("bushwallb",1400,1300),
		new Prop("bushwallb",1500,1300),
		new Prop("bushwallb",1600,1300),
		new Prop("bushwallb",1700,1300),
		new Prop("bushwallb",1800,1300),
		new Prop("bushwallbr",1900,1300),
		new Prop("bushwallbl",2100,1300),
		new Prop("bushwallb",2200,1300),
		new Prop("bushwallb",2300,1300),
		new Prop("bushwallb",2400,1300),
		new Prop("bushwallb",2500,1300),
		new Prop("bushwallb",2600,1300),
		new Prop("bushwallbr",2700,1300),
		new Prop("bushwallm",2900,1300),
		new Prop("bushwallm",0,1400),
		new Prop("bushwallm",100,1400),
		new Prop("bushwallm",300,1400),
		new Prop("bushwallm",400,1400),
		new Prop("bushwallm",500,1400),
		new Prop("bushwallm",600,1400),
		new Prop("bushwallm",700,1400),
		new Prop("bushwallm",800,1400),
		new Prop("bushwallt",900,1400),
		new Prop("bushwallm",1000,1400),
		new Prop("bushwallm",1100,1400),
		new Prop("bushwallm",1200,1400),
		new Prop("bushwallm",1300,1400),
		new Prop("bushwallm",2900,1400),
		new Prop("bushwallm",0,1500),
		new Prop("bushwallm",100,1500),
		new Prop("bushwallm",300,1500),
		new Prop("bushwallm",400,1500),
		new Prop("bushwallb",500,1500),
		new Prop("bushwallb",600,1500),
		new Prop("bushwallb",700,1500),
		new Prop("bushwallb",800,1500),
		new Prop("bushwallb",900,1500),
		new Prop("bushwallb",1000,1500),
		new Prop("bushwallb",1100,1500),
		new Prop("bushwallb",1200,1500),
		new Prop("bushwallbr",1300,1500),
		new Prop("bushwalltl",1500,1500),
		new Prop("bushwallt",1600,1500),
		new Prop("bushwalltr",1700,1500),
		new Prop("abushl",1900,1500),
		new Prop("abushmh",2000,1500),
		new Prop("bushwallt",2100,1500),
		new Prop("bushwallt",2200,1500),
		new Prop("bushwallt",2300,1500),
		new Prop("bushwalltr",2400,1500),
		new Prop("bushwalltl",2600,1500),
		new Prop("bushwallt",2700,1500),
		new Prop("bushwallt",2800,1500),
		new Prop("bushwallm",2900,1500),
		new Prop("bushwallm",0,1600),
		new Prop("bushwallm",100,1600),
		new Prop("bushwallbl",300,1600),
		new Prop("bushwallbr",400,1600),
		new Prop("bushwallm",1500,1600),
		new Prop("bushwallm",1600,1600),
		new Prop("bushwallm",1700,1600),
		new Prop("bushwallm",2100,1600),
		new Prop("bushwallm",2200,1600),
		new Prop("bushwallm",2300,1600),
		new Prop("bushwallm",2400,1600),
		new Prop("bushwallm",2600,1600),
		new Prop("bushwallm",2700,1600),
		new Prop("bushwallm",2800,1600),
		new Prop("bushwallm",2900,1600),
		new Prop("bushwallm",0,1700),
		new Prop("bushwallm",100,1700),
		new Prop("bushwalltl",600,1700),
		new Prop("bushwallt",700,1700),
		new Prop("bushwallt",800,1700),
		new Prop("bushwallt",900,1700),
		new Prop("bushwallt",1000,1700),
		new Prop("bushwallt",1100,1700),
		new Prop("bushwallt",1200,1700),
		new Prop("bushwalltr",1300,1700),
		new Prop("bushwallm",1500,1700),
		new Prop("bushwallm",1600,1700),
		new Prop("bushwallm",1700,1700),
		new Prop("bushwallt",1800,1700),
		new Prop("bushwalltr",1900,1700),
		new Prop("bushwallbl",2100,1700),
		new Prop("bushwallb",2200,1700),
		new Prop("bushwallb",2300,1700),
		new Prop("bushwallbr",2400,1700),
		new Prop("bushwallbl",2600,1700),
		new Prop("bushwallb",2700,1700),
		new Prop("bushwallb",2800,1700),
		new Prop("bushwallm",2900,1700),
		new Prop("bushwallm",0,1800),
		new Prop("bushwallm",100,1800),
		new Prop("bushwallt",200,1800),
		new Prop("bushwallt",300,1800),
		new Prop("bushwalltr",400,1800),
		new Prop("bushwallm",600,1800),
		new Prop("bushwallm",700,1800),
		new Prop("bushwallm",800,1800),
		new Prop("bushwallm",900,1800),
		new Prop("bushwallm",1000,1800),
		new Prop("bushwallm",1100,1800),
		new Prop("bushwallm",1200,1800),
		new Prop("bushwallm",1300,1800),
		new Prop("bushwallm",1500,1800),
		new Prop("bushwallm",1600,1800),
		new Prop("bushwallm",1700,1800),
		new Prop("bushwallm",1800,1800),
		new Prop("bushwallm",1900,1800),
		new Prop("bushwallm",2000,1800),
		new Prop("bushwallm",2900,1800),
		new Prop("bushwallm",0,1900),
		new Prop("bushwallm",100,1900),
		new Prop("bushwallm",200,1900),
		new Prop("bushwallm",300,1900),
		new Prop("bushwallm",400,1900),
		new Prop("bushwallm",600,1900),
		new Prop("bushwallm",700,1900),
		new Prop("bushwallm",800,1900),
		new Prop("bushwallm",900,1900),
		new Prop("bushwallm",1000,1900),
		new Prop("bushwallm",1100,1900),
		new Prop("bushwallm",1200,1900),
		new Prop("bushwallm",1300,1900),
		new Prop("bushwallm",1500,1900),
		new Prop("bushwallm",1600,1900),
		new Prop("bushwallm",1700,1900),
		new Prop("bushwallm",1800,1900),
		new Prop("bushwallm",1900,1900),
		new Prop("bushwallt",2000,1900),
		new Prop("bushwalltr",2100,1900),
		new Prop("bushwalltl",2300,1900),
		new Prop("bushwallt",2400,1900),
		new Prop("bushwallt",2500,1900),
		new Prop("bushwallt",2600,1900),
		new Prop("bushwalltr",2700,1900),
		new Prop("bushwallm",2900,1900),
		new Prop("bushwallm",0,2000),
		new Prop("bushwallb",100,2000),
		new Prop("bushwallb",200,2000),
		new Prop("bushwallb",300,2000),
		new Prop("bushwallbr",400,2000),
		new Prop("bushwallbl",600,2000),
		new Prop("bushwallb",700,2000),
		new Prop("bushwallb",800,2000),
		new Prop("bushwallb",900,2000),
		new Prop("bushwallb",1000,2000),
		new Prop("bushwallb",1100,2000),
		new Prop("bushwallb",1200,2000),
		new Prop("bushwallbr",1300,2000),
		new Prop("bushwallbl",1500,2000),
		new Prop("bushwallb",1600,2000),
		new Prop("bushwallb",1700,2000),
		new Prop("bushwallb",1800,2000),
		new Prop("bushwallb",1900,2000),
		new Prop("bushwallb",2000,2000),
		new Prop("bushwallbr",2100,2000),
		new Prop("bushwallbl",2300,2000),
		new Prop("bushwallb",2400,2000),
		new Prop("bushwallb",2500,2000),
		new Prop("bushwallb",2600,2000),
		new Prop("bushwallbr",2700,2000),
		new Prop("bushwallm",2900,2000),
		new Prop("bushwallm",0,2100),
		new Prop("bushwallm",2900,2100),
		new Prop("bushwallm",0,2200),
		new Prop("bushwalltl",200,2200),
		new Prop("bushwallt",300,2200),
		new Prop("bushwallt",400,2200),
		new Prop("bushwallt",500,2200),
		new Prop("bushwallt",600,2200),
		new Prop("bushwallt",700,2200),
		new Prop("bushwallt",800,2200),
		new Prop("bushwallt",900,2200),
		new Prop("bushwallt",1000,2200),
		new Prop("bushwallt",1100,2200),
		new Prop("bushwallt",1200,2200),
		new Prop("bushwallt",1300,2200),
		new Prop("bushwallt",1400,2200),
		new Prop("bushwallt",1500,2200),
		new Prop("bushwallt",1600,2200),
		new Prop("bushwallt",1700,2200),
		new Prop("bushwallt",1800,2200),
		new Prop("bushwallt",1900,2200),
		new Prop("abushmh",2000,2200),
		new Prop("abushmh",2100,2200),
		new Prop("abushr",2200,2200),
		new Prop("bushwalltl",2400,2200),
		new Prop("bushwallt",2500,2200),
		new Prop("bushwallt",2600,2200),
		new Prop("bushwalltr",2700,2200),
		new Prop("bushwallm",2900,2200),
		new Prop("bushwallm",0,2300),
		new Prop("bushwallbl",200,2300),
		new Prop("bushwallb",300,2300),
		new Prop("bushwallb",400,2300),
		new Prop("bushwallb",500,2300),
		new Prop("bushwallb",600,2300),
		new Prop("bushwallb",700,2300),
		new Prop("bushwallb",800,2300),
		new Prop("bushwallb",900,2300),
		new Prop("bushwallb",1000,2300),
		new Prop("bushwallb",1100,2300),
		new Prop("bushwallm",1200,2300),
		new Prop("bushwallm",1300,2300),
		new Prop("bushwallm",1400,2300),
		new Prop("bushwallm",1500,2300),
		new Prop("bushwallm",1600,2300),
		new Prop("bushwallm",1700,2300),
		new Prop("bushwallm",1800,2300),
		new Prop("bushwallm",1900,2300),
		new Prop("bushwallm",2400,2300),
		new Prop("bushwallm",2500,2300),
		new Prop("bushwallm",2600,2300),
		new Prop("bushwallm",2900,2300),
		new Prop("bushwallm",0,2400),
		new Prop("bushwallm",1200,2400),
		new Prop("bushwallm",1300,2400),
		new Prop("bushwallm",1400,2400),
		new Prop("bushwallm",1500,2400),
		new Prop("bushwallm",1600,2400),
		new Prop("bushwallm",1700,2400),
		new Prop("bushwallm",1800,2400),
		new Prop("bushwallm",1900,2400),
		new Prop("abushl",2100,2400),
		new Prop("abushmh",2200,2400),
		new Prop("abushmh",2300,2400),
		new Prop("bushwallb",2400,2400),
		new Prop("bushwallb",2500,2400),
		new Prop("bushwallbr",2600,2400),
		new Prop("bushwalltl",2800,2400),
		new Prop("bushwallm",2900,2400),
		new Prop("bushwallm",0,2500),
		new Prop("bushwallt",100,2500),
		new Prop("bushwallt",200,2500),
		new Prop("bushwallt",300,2500),
		new Prop("bushwallt",400,2500),
		new Prop("bushwallt",500,2500),
		new Prop("bushwallt",600,2500),
		new Prop("bushwallt",700,2500),
		new Prop("bushwallt",800,2500),
		new Prop("bushwallt",900,2500),
		new Prop("bushwalltr",1000,2500),
		new Prop("naturedoorh",1100,2500),
		new Prop("bushwallm",1200,2500),
		new Prop("bushwallm",1300,2500),
		new Prop("bushwallm",1400,2500),
		new Prop("bushwallm",1500,2500),
		new Prop("bushwallm",1600,2500),
		new Prop("bushwallm",1700,2500),
		new Prop("bushwallm",1800,2500),
		new Prop("bushwallm",1900,2500),
		new Prop("bushwallm",2800,2500),
		new Prop("bushwallm",2900,2500)
	];
	var wkhomeinside = [
		new Prop("wkfloor",0,0),
		new Prop("window1",100,0),
		new Prop("wkfloor",200,0),
		new Prop("wkfloor",300,0),
		new Prop("sidewall1",300,0),
		new Prop("window1",400,0),
		new Prop("wkfloor",500,0),
		new Prop("shelfl",600,0),
		new Prop("shelfr",700,0),
		new Prop("window1",800,0),
		new Prop("wkfloor",900,0),
		new Prop("bedt",100,100),
		new Prop("table1",200,100),
		new Prop("sidewall1",300,100),
		new Prop("chair2s",400,100),
		new Prop("table1",500,100),
		new Prop("shelfl",600,100),
		new Prop("shelfr",700,100),
		new Prop("bedl",800,100),
		new Prop("bedr",900,100),
		new Prop("bedb",100,200),
		new Prop("sidewall1",300,200),
		new Prop("chair2f",500,200),
		new Prop("table1",900,200),
		new Prop("sidewall1",300,300),
		new Prop("wkfloor",0,400),
		new Prop("wkfloor",200,400),
		new Prop("wkfloor",300,400),
		new Prop("tablet",700,500),
		new Prop("coucht",900,500),
		new Prop("table2",0,600),
		new Prop("lamp5",0,600),
		new Prop("tableb",700,600),
		new Prop("couchb",900,600),
		new Prop("indoor4",400,700),
		new Prop("table1",900,700),
	];
	var tower = [
		new Prop("blank",0,0),
		new Prop("towergatetl",100,0),
		new Prop("towergatem",200,0),
		new Prop("towergatem",300,0),
		new Prop("towerwall",400,0),
		new Prop("towerwall",500,0),
		new Prop("towerwall",600,0),
		new Prop("towerwall",700,0),
		new Prop("towerwall",800,0),
		new Prop("towergatem",900,0),
		new Prop("towergatem",1000,0),
		new Prop("towergatetr",1100,0),
		new Prop("towergatetl",0,100),
		new Prop("towergatem",100,100),
		new Prop("towergatem",200,100),
		new Prop("towergatem",300,100),
		new Prop("towerwall",400,100),
		new Prop("towerwindow",500,100),
		new Prop("towerwall",600,100),
		new Prop("towerwindow",700,100),
		new Prop("towerwall",800,100),
		new Prop("towergatem",900,100),
		new Prop("towergatem",1000,100),
		new Prop("towergatem",1100,100),
		new Prop("towergater",1200,100),
		new Prop("towergatem",0,200),
		new Prop("towergatem",100,200),
		new Prop("cobblestone",200,200),
		new Prop("cobblestone",300,200),
		new Prop("towerwall",400,200),
		new Prop("towerwall",500,200),
		new Prop("towerwall",600,200),
		new Prop("towerwall",700,200),
		new Prop("towerwall",800,200),
		new Prop("cobblestone",900,200),
		new Prop("cobblestone",1000,200),
		new Prop("towergatebl",1100,200),
		new Prop("towergatem",1200,200),
		new Prop("towergatem",0,300),
		new Prop("cobblestone",300,300),
		new Prop("towerwall",400,300),
		new Prop("towerwall",500,300),
		new Prop("door1",600,300),
		new Prop("towerwall",700,300),
		new Prop("towerwall",800,300),
		new Prop("cobblestone",900,300),
		new Prop("towergatem",1200,300),
		new Prop("towergatem",0,400),
		new Prop("cobblestone",300,400),
		new Prop("cobblestone",400,400),
		new Prop("cobblestone",500,400),
		new Prop("cobblestone",600,400),
		new Prop("cobblestone",700,400),
		new Prop("cobblestone",800,400),
		new Prop("cobblestone",900,400),
		new Prop("towergatem",1200,400),
		new Prop("towergatem",0,500),
		new Prop("cobblestone",400,500),
		new Prop("cobblestone",500,500),
		new Prop("cobblestone",600,500),
		new Prop("cobblestone",700,500),
		new Prop("cobblestone",800,500),
		new Prop("towergatem",1200,500),
		new Prop("towergatem",0,600),
		new Prop("towergatem",100,600),
		new Prop("towergatem",200,600),
		new Prop("towergatetl",300,600),
		new Prop("cobblestone",500,600),
		new Prop("cobblestone",600,600),
		new Prop("cobblestone",700,600),
		new Prop("towergatetr",900,600),
		new Prop("towergatem",1000,600),
		new Prop("towergatem",1100,600),
		new Prop("towergatem",1200,600),
		new Prop("towergatem",0,700),
		new Prop("towergatem",100,700),
		new Prop("towergatem",200,700),
		new Prop("towergatetr",300,700),
		new Prop("cobblestone",600,700),
		new Prop("towergatetl",900,700),
		new Prop("towergatem",1000,700),
		new Prop("towergatem",1100,700),
		new Prop("towergatem",1200,700),
		new Prop("cobblestone",600,800),
		new Prop("blank",1200,800)
	];
	
	var theatre = [
		new Prop("wall2",0,0),
		new Prop("wall2",100,0),
		new Prop("wall2",200,0),
		new Prop("curtainll",300,0),
		new Prop("curtainm",400,0),
		new Prop("curtainm",500,0),
		new Prop("curtainlr",600,0),
		new Prop("",700,0),
		new Prop("",800,0),
		new Prop("curtainrl",900,0),
		new Prop("curtainm",1000,0),
		new Prop("curtainm",1100,0),
		new Prop("curtainrr",1200,0),
		new Prop("wall2",1300,0),
		new Prop("wall2",1400,0),
		new Prop("wall2",1500,0),
		new Prop("wall2",0,100),
		new Prop("door4",100,100),
		new Prop("wall2",200,100),
		new Prop("curtainll",300,100),
		new Prop("curtainm",400,100),
		new Prop("curtainlr",500,100),
		new Prop("",600,100),
		new Prop("",700,100),
		new Prop("",800,100),
		new Prop("",900,100),
		new Prop("curtainrl",1000,100),
		new Prop("curtainm",1100,100),
		new Prop("curtainrr",1200,100),
		new Prop("wall2",1300,100),
		new Prop("door4",1400,100),
		new Prop("wall2",1500,100),
		new Prop("curtainll",300,200),
		new Prop("curtainlr",400,200),
		new Prop("staget",500,200),
		new Prop("staget",600,200),
		new Prop("staget",700,200),
		new Prop("staget",800,200),
		new Prop("staget",900,200),
		new Prop("staget",1000,200),
		new Prop("curtainrl",1100,200),
		new Prop("curtainrr",1200,200),
		new Prop("stairss",200,300),
		new Prop("stageb",300,300),
		new Prop("stageb",400,300),
		new Prop("stageb",500,300),
		new Prop("stageb",600,300),
		new Prop("stageb",700,300),
		new Prop("stageb",800,300),
		new Prop("stageb",900,300),
		new Prop("stageb",1000,300),
		new Prop("stageb",1100,300),
		new Prop("stageb",1200,300),
		new Prop("tablet",0,400),
		new Prop("redcarpet",300,400),
		new Prop("redcarpet",400,400),
		new Prop("redcarpet",500,400),
		new Prop("redcarpet",600,400),
		new Prop("redcarpet",700,400),
		new Prop("redcarpet",800,400),
		new Prop("redcarpet",900,400),
		new Prop("redcarpet",1000,400),
		new Prop("redcarpet",1100,400),
		new Prop("redcarpet",1200,400),
		new Prop("tableb",0,500),
		new Prop("chair1f",200,500),
		new Prop("chair1f",300,500),
		new Prop("chair1f",400,500),
		new Prop("chair1f",500,500),
		new Prop("chair1f",600,500),
		new Prop("redcarpet",700,500),
		new Prop("chair1f",800,500),
		new Prop("chair1f",900,500),
		new Prop("chair1f",1000,500),
		new Prop("chair1f",1100,500),
		new Prop("chair1f",1200,500),
		new Prop("tablet",1500,500),
		new Prop("redcarpet",700,600),
		new Prop("tableb",1500,600),
		new Prop("chair1f",200,700),
		new Prop("chair1f",300,700),
		new Prop("chair1f",400,700),
		new Prop("chair1f",500,700),
		new Prop("chair1f",600,700),
		new Prop("redcarpet",700,700),
		new Prop("chair1f",800,700),
		new Prop("chair1f",900,700),
		new Prop("chair1f",1000,700),
		new Prop("chair1f",1100,700),
		new Prop("chair1f",1200,700),
		new Prop("table1",0,800),
		new Prop("redcarpet",700,800),
		new Prop("chair1f",200,900),
		new Prop("chair1f",300,900),
		new Prop("chair1f",400,900),
		new Prop("chair1f",500,900),
		new Prop("chair1f",600,900),
		new Prop("redcarpet",700,900),
		new Prop("chair1f",800,900),
		new Prop("chair1f",900,900),
		new Prop("chair1f",1000,900),
		new Prop("chair1f",1100,900),
		new Prop("chair1f",1200,900),
		new Prop("redcarpet",700,1000),
		new Prop("tablet",1500,1000),
		new Prop("chair1f",200,1100),
		new Prop("chair1f",300,1100),
		new Prop("chair1f",400,1100),
		new Prop("chair1f",500,1100),
		new Prop("chair1f",600,1100),
		new Prop("redcarpet",700,1100),
		new Prop("chair1f",800,1100),
		new Prop("chair1f",900,1100),
		new Prop("chair1f",1000,1100),
		new Prop("chair1f",1100,1100),
		new Prop("chair1f",1200,1100),
		new Prop("tableb",1500,1100),
		new Prop("tableb",0,1200),
		new Prop("redcarpet",700,1200),
		new Prop("chair1f",200,1300),
		new Prop("chair1f",300,1300),
		new Prop("chair1f",400,1300),
		new Prop("chair1f",500,1300),
		new Prop("chair1f",600,1300),
		new Prop("redcarpet",700,1300),
		new Prop("chair1f",800,1300),
		new Prop("chair1f",900,1300),
		new Prop("chair1f",1000,1300),
		new Prop("chair1f",1100,1300),
		new Prop("chair1f",1200,1300),
		new Prop("lamp3",0,1400),
		new Prop("redcarpet",700,1400),
		new Prop("indoor4",700,1400),
		new Prop("lamp3",1500,1400)
	];
	var lockerroom = [
		new Prop("blank",0,0),
		new Prop("lockerl",1300,0),
		new Prop("lockerr",1500,0),
		new Prop("lockerl",1700,0),
		new Prop("lockerr",1900,0),
		new Prop("lockerl",100,100),
		new Prop("lockerr",300,100),
		new Prop("lockerl",500,100),
		new Prop("lockerr",700,100),
		new Prop("lockerl",1300,100),
		new Prop("lockerr",1500,100),
		new Prop("lockerl",1700,100),
		new Prop("lockerr",1900,100),
		new Prop("lockerf",100,200),
		new Prop("lockerf",300,200),
		new Prop("lockerf",500,200),
		new Prop("lockerf",700,200),
		new Prop("lockerl",1300,300),
		new Prop("lockerr",1500,300),
		new Prop("lockerl",1700,300),
		new Prop("lockerr",1900,300),
		new Prop("lockerl",100,400),
		new Prop("lockerr",300,400),
		new Prop("lockerl",500,400),
		new Prop("lockerr",700,400),
		new Prop("lockerf",1300,400),
		new Prop("lockerf",1500,400),
		new Prop("lockerf",1700,400),
		new Prop("lockerf",1900,400),
		new Prop("lockerl",100,500),
		new Prop("lockerr",300,500),
		new Prop("lockerl",500,500),
		new Prop("lockerr",700,500),
		new Prop("indoor4",1100,500),
		new Prop("blank",2000,500)
	];
	var bardichall = [
		new Prop("wall2",0,0),
		new Prop("wall2",100,0),
		new Prop("wall2",200,0),
		new Prop("painting1",300,0),
		new Prop("wall2",400,0),
		new Prop("wall2",500,0),
		new Prop("wall2",600,0),
		new Prop("wall2",700,0),
		new Prop("wall2",800,0),
		new Prop("wall2",900,0),
		new Prop("painting2",1000,0),
		new Prop("wall2",1100,0),
		new Prop("wall2",1200,0),
		new Prop("wall2",1300,0),
		new Prop("wall2",1400,0),
		new Prop("wall2",1500,0),
		new Prop("wall2",1600,0),
		new Prop("painting3",1700,0),
		new Prop("wall2",1800,0),
		new Prop("wall2",1900,0),
		new Prop("wall2",2000,0),
		new Prop("wall2",2100,0),
		new Prop("wall2",2200,0),
		new Prop("painting4",2300,0),
		new Prop("wall2",2400,0),
		new Prop("wall2",2500,0),
		new Prop("wall2",2600,0),
		new Prop("wall2",2700,0),
		new Prop("wall2",2800,0),
		new Prop("painting1",2900,0),
		new Prop("wall2",3000,0),
		new Prop("wall2",3100,0),
		new Prop("indoor1",0,100),
		new Prop("table1",600,100),
		new Prop("lamp3",700,100),
		new Prop("tablel",1300,100),
		new Prop("tabler",1400,100),
		new Prop("table2",2700,100),
		new Prop("indoor3",3100,100),
		new Prop("table2",200,200),
		new Prop("tablel",2200,200),
		new Prop("lamp5",2200,200),
		new Prop("tabler",2300,200),
		new Prop("",0,00),
		new Prop("",100,00),
		new Prop("",200,00),
		new Prop("",300,00),
		new Prop("",400,00),
		new Prop("",500,00),
		new Prop("",600,00),
		new Prop("",700,00),
		new Prop("",800,00),
		new Prop("",900,00),
		new Prop("",1000,00),
		new Prop("",1100,00),
		new Prop("",1200,00),
		new Prop("",1300,00),
		new Prop("",1700,00),
		new Prop("",1800,00),
		new Prop("",1900,00),
		new Prop("",2000,00),
		new Prop("",2100,00),
		new Prop("",2200,00),
		new Prop("",2300,00),
		new Prop("",2400,00),
		new Prop("",2500,00),
		new Prop("",2600,00),
		new Prop("",2700,00),
		new Prop("",2800,00),
		new Prop("",2900,00),
		new Prop("",3000,00),
		new Prop("",3100,00),
		new Prop("tablet",1400,400),
		new Prop("",1700,400),
		new Prop("",1300,500),
		new Prop("tableb",1400,500),
		new Prop("",1700,500),
		new Prop("",1300,600),
		new Prop("",1700,600),
		new Prop("",1300,700),
		new Prop("lamp3",1400,700),
		new Prop("indoor4",1500,700),
		new Prop("table2",1600,700),
		new Prop("",1700,700),
		new Prop("blank",3100,700)
	];
	var bardicentrance = [
		new Prop("wall2",0,0),
		new Prop("wall2",100,0),
		new Prop("wall2",200,0),
		new Prop("wall2",300,0),
		new Prop("wall2",300,0),
		new Prop("door4",400,0),
		new Prop("wall2",500,0),
		new Prop("wall2",600,0),
		new Prop("wall2",700,0),
		new Prop("indoor2",300,100),
		new Prop("tablet",0,200),
		new Prop("tablet",700,200),
		new Prop("tableb",0,300),
		new Prop("tableb",700,300),
		new Prop("tablet",0,500),
		new Prop("tablet",700,500),
		new Prop("tableb",0,600),
		new Prop("tableb",700,600),
		new Prop("indoor4",300,700),
		new Prop("blank",700,700)
	];
	var bardicbath = [
		new Prop("brstallside",0,0),
		new Prop("wall1",100,0),
		new Prop("toilet",100,0),
		new Prop("brstallside",200,0),
		new Prop("wall1",300,0),
		new Prop("toilet",300,0),
		new Prop("brstallside",400,0),
		new Prop("wall1",500,0),
		new Prop("toilet",500,0),
		new Prop("brstallside",600,0),
		new Prop("wall1",700,0),
		new Prop("toilet",700,0),
		new Prop("brstallside",0,100),
		new Prop("brstalldooropen",0,100),
		new Prop("brstallside",200,100),
		new Prop("brstalldooropen",200,100),
		new Prop("brstallside",400,100),
		new Prop("brstalldooropen",400,100),
		new Prop("brstallside",600,100),
		new Prop("brstalldoorclose",700,100),
		new Prop("indoor4",200,300),
		new Prop("sink",600,300)
	];
	var sheenoffice = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("wall1",200,0),
		new Prop("wall1",300,0),
		new Prop("wall1",400,0),
		new Prop("wall1",500,0),
		new Prop("wall1",600,0),
		new Prop("wall1",700,0),
		new Prop("wall1",800,0),
		new Prop("wall1",900,0),
		new Prop("wall1",1000,0),
		new Prop("wall1",1100,0),
		new Prop("wall1",1200,0),
		new Prop("wall1",1300,0),
		new Prop("wall1",1400,0),
		new Prop("wall1",0,100),
		new Prop("wall1",100,100),
		new Prop("wall1",200,100),
		new Prop("painting4",300,100),
		new Prop("wall1",400,100),
		new Prop("painting3",500,100),
		new Prop("wall1",600,100),
		new Prop("painting2",700,100),
		new Prop("wall1",800,100),
		new Prop("painting1",900,100),
		new Prop("wall1",1000,100),
		new Prop("wall1",1100,100),
		new Prop("wall1",1200,100),
		new Prop("wall1",1300,100),
		new Prop("wall1",1400,100),
		new Prop("counterl",0,200),
		new Prop("counterr",100,200),
		new Prop("wall1",200,200),
		new Prop("wall1",300,200),
		new Prop("wall1",400,200),
		new Prop("wall1",500,200),
		new Prop("wall1",600,200),
		new Prop("wall1",700,200),
		new Prop("wall1",800,200),
		new Prop("wall1",900,200),
		new Prop("wall1",1000,200),
		new Prop("wall1",1100,200),
		new Prop("counterl",1200,200),
		new Prop("counterr",1300,200),
		new Prop("wall1",1400,200),
		new Prop("counterl",0,300),
		new Prop("counterr",100,300),
		new Prop("chair1f",700,300),
		new Prop("counterl",1200,300),
		new Prop("counterr",1300,300),
		new Prop("tablel",600,400),
		new Prop("tabler",700,400),
		new Prop("chair2f",700,500),
		new Prop("countert",0,600),
		new Prop("counter2",1400,600),
		new Prop("counterb",0,700),
		new Prop("counterl",300,700),
		new Prop("counterr",400,700),
		new Prop("indoor4",700,700),
		new Prop("counterside",1000,700),
		new Prop("counterl",1300,700),
		new Prop("counterr",1400,700)
	];
	var powderroom1 = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("wall1",200,0),
		new Prop("wall1",300,0),
		new Prop("wall1",400,0),
		new Prop("wall1",500,0),
		new Prop("door4",600,0),
		new Prop("wall1",700,0),
		new Prop("chair2s",100,100),
		new Prop("table1",200,100),
		new Prop("chair2s",300,100),
		new Prop("table1",100,300),
		new Prop("vase",100,300),
	];
	var powderroom2 = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("picture3",100,0),
		new Prop("wall1",200,0),
		new Prop("door4",300,0),
		new Prop("wall1",400,0),
		new Prop("wall1",500,0),
		new Prop("wall1",600,0),
		new Prop("wall1",700,0),
		new Prop("table1",100,100),
		new Prop("chair2s",500,100),
		new Prop("table1",600,100),
		new Prop("chair2s",700,100),
		new Prop("table1",600,300),
		new Prop("vase",600,300),
		new Prop("blank",700,300)
	];
	
	var merchhall1 = [
		new Prop("blank",0,0),
		new Prop("redcarpet",0,100),
		new Prop("indoor1",0,100),
		new Prop("redcarpet",100,100),
		new Prop("redcarpet",200,100),
		new Prop("redcarpet",300,100),
		new Prop("redcarpet",400,100),
		new Prop("redcarpet",500,100),
		new Prop("redcarpet",600,100),
		new Prop("redcarpet",700,100),
		new Prop("redcarpet",800,100),
		new Prop("redcarpet",900,100),
		new Prop("redcarpet",1000,100),
		new Prop("redcarpet",1100,100),
		new Prop("redcarpet",1200,100),
		new Prop("redcarpet",1300,100),
		new Prop("redcarpet",1400,100),
		new Prop("redcarpet",1500,100),
		new Prop("indoor3",1500,100),
		new Prop("tablel",500,200),
		new Prop("tabler",600,200),
		new Prop("table1",1100,200),
		new Prop("blank",1500,200)
	];
	var merchhall2 = [
		new Prop("blank",0,0),
		new Prop("table2",100,0),
		new Prop("lamp3",200,0),
		new Prop("tablel",1300,0),
		new Prop("tabler",1400,0),
		new Prop("lamp1",2200,0),
		new Prop("table2",3100,0),
		new Prop("lamp1",3600,0),
		new Prop("table2",4200,0),
		new Prop("redcarpet",0,100),
		new Prop("indoor1",0,100),
		new Prop("redcarpet",100,100),
		new Prop("redcarpet",200,100),
		new Prop("redcarpet",300,100),
		new Prop("redcarpet",400,100),
		new Prop("redcarpet",500,100),
		new Prop("redcarpet",600,100),
		new Prop("redcarpet",700,100),
		new Prop("redcarpet",800,100),
		new Prop("redcarpet",900,100),
		new Prop("redcarpet",1000,100),
		new Prop("redcarpet",1100,100),
		new Prop("redcarpet",1200,100),
		new Prop("redcarpet",1300,100),
		new Prop("redcarpet",1400,100),
		new Prop("redcarpet",1500,100),
		new Prop("redcarpet",1600,100),
		new Prop("redcarpet",1700,100),
		new Prop("redcarpet",1800,100),
		new Prop("redcarpet",1900,100),
		new Prop("redcarpet",2000,100),
		new Prop("redcarpet",2100,100),
		new Prop("redcarpet",2200,100),
		new Prop("redcarpet",2300,100),
		new Prop("redcarpet",2400,100),
		new Prop("redcarpet",2500,100),
		new Prop("redcarpet",2600,100),
		new Prop("redcarpet",2700,100),
		new Prop("redcarpet",2800,100),
		new Prop("redcarpet",2900,100),
		new Prop("redcarpet",3000,100),
		new Prop("redcarpet",3100,100),
		new Prop("redcarpet",3200,100),
		new Prop("redcarpet",3300,100),
		new Prop("redcarpet",3400,100),
		new Prop("redcarpet",3500,100),
		new Prop("redcarpet",3600,100),
		new Prop("redcarpet",3700,100),
		new Prop("redcarpet",3800,100),
		new Prop("redcarpet",3900,100),
		new Prop("redcarpet",4000,100),
		new Prop("redcarpet",4100,100),
		new Prop("redcarpet",4200,100),
		new Prop("redcarpet",4300,100),
		new Prop("redcarpet",4400,100),
		new Prop("redcarpet",4500,100),
		new Prop("redcarpet",4600,100),
		new Prop("redcarpet",4700,100),
		new Prop("redcarpet",4800,100),
		new Prop("redcarpet",4900,100),
		new Prop("indoor3",4900,100),
		new Prop("tablel",400,200),
		new Prop("tabler",500,200),
		new Prop("redcarpet",900,200),
		new Prop("table2",2500,200),
		new Prop("tablel",3400,200),
		new Prop("tabler",3500,200),
		new Prop("",0,300),
		new Prop("",100,300),
		new Prop("",200,300),
		new Prop("",300,300),
		new Prop("",400,300),
		new Prop("",500,300),
		new Prop("",600,300),
		new Prop("",700,300),
		new Prop("redcarpet",900,300),
		new Prop("",1100,300),
		new Prop("",1200,300),
		new Prop("",1300,300),
		new Prop("",1400,300),
		new Prop("",1500,300),
		new Prop("",1600,300),
		new Prop("",1700,300),
		new Prop("",1800,300),
		new Prop("",1900,300),
		new Prop("",2000,300),
		new Prop("",2100,300),
		new Prop("",2200,300),
		new Prop("",2300,300),
		new Prop("",2400,300),
		new Prop("",2500,300),
		new Prop("",2600,300),
		new Prop("",2700,300),
		new Prop("",2800,300),
		new Prop("",2900,300),
		new Prop("",3000,300),
		new Prop("",3100,300),
		new Prop("",3200,300),
		new Prop("",3300,300),
		new Prop("",3400,300),
		new Prop("",3500,300),
		new Prop("",3600,300),
		new Prop("",3700,300),
		new Prop("",3800,300),
		new Prop("",3900,300),
		new Prop("",4000,300),
		new Prop("",4100,300),
		new Prop("",4200,300),
		new Prop("",4300,300),
		new Prop("",4400,300),
		new Prop("",4500,300),
		new Prop("",4600,300),
		new Prop("",4700,300),
		new Prop("",4800,300),
		new Prop("",4900,300),
		new Prop("",700,400),
		new Prop("redcarpet",900,400),
		new Prop("",1100,400),
		new Prop("",700,500),
		new Prop("tablet",800,500),
		new Prop("redcarpet",900,500),
		new Prop("",1100,500),
		new Prop("",700,600),
		new Prop("tableb",800,600),
		new Prop("redcarpet",900,600),
		new Prop("",1100,600),
		new Prop("",700,700),
		new Prop("redcarpet",900,700),
		new Prop("indoor4",900,700),
		new Prop("",1100,700),
		new Prop("blank",4900,700)
	];
	var merchmeetroom = [
		new Prop("blank",0,0),
		new Prop("indoor2",300,0),
		new Prop("tablel",700,0),
		new Prop("tabler",800,0),
		new Prop("chair2s",500,100),
		new Prop("chair2s",700,100),
		new Prop("chair2s",900,100),
		new Prop("chair2s",1100,100),
		new Prop("chair2s",500,300),
		new Prop("chair2s",700,300),
		new Prop("chair2s",900,300),
		new Prop("chair2s",1100,300),
		new Prop("indoor3",1200,300),
		new Prop("tablet",0,400),
		new Prop("podium",300,400),
		new Prop("tableb",0,500),
		new Prop("lamp5",0,500),
		new Prop("chair2s",500,500),
		new Prop("chair2s",700,500),
		new Prop("chair2s",900,500),
		new Prop("chair2s",1100,500),
		new Prop("chair2s",500,700),
		new Prop("chair2s",700,700),
		new Prop("chair2s",900,700),
		new Prop("chair2s",1100,700),
		new Prop("indoor4",300,900),
		new Prop("tablel",800,900),
		new Prop("tabler",900,900),
		new Prop("lamp5",900,900),
		new Prop("blank",1200,900)
	]
	var merchstorage = [
		new Prop("package",0,0),
		new Prop("vase",100,0),
		new Prop("packagel",200,0),
		new Prop("packager",300,0),
		new Prop("packagel",400,0),
		new Prop("packager",500,0),
		new Prop("vase",600,0),
		new Prop("bucket",700,0),
		new Prop("package",800,0),
		new Prop("vase",900,0),
		new Prop("package",1200,0),
		new Prop("vase",1300,0),
		new Prop("package",1400,0),
		new Prop("vase",1500,0),
		new Prop("packagel",1700,0),
		new Prop("packager",1800,0),
		new Prop("bucket",0,100),
		new Prop("package",100,100),
		new Prop("tablel",200,100),
		new Prop("tabler",300,100),
		new Prop("vase",400,100),
		new Prop("package",700,100),
		new Prop("vase",800,100),
		new Prop("packagel",900,100),
		new Prop("packager",1000,100),
		new Prop("package",1300,100),
		new Prop("vase",1400,100),
		new Prop("table1",1500,100),
		new Prop("package",1800,100),
		new Prop("packagel",0,200),
		new Prop("packager",100,200),
		new Prop("vase",200,200),
		new Prop("package",600,200),
		new Prop("package",700,200),
		new Prop("package",1000,200),
		new Prop("packagel",1200,200),
		new Prop("packager",1300,200),
		new Prop("package",1400,200),
		new Prop("table1",1500,200),
		new Prop("bucket",1700,200),
		new Prop("vase",0,300),
		new Prop("package",200,300),
		new Prop("package",400,300),
		new Prop("vase",800,300),
		new Prop("package",1200,300),
		new Prop("vase",1300,300),
		new Prop("package",1400,300),
		new Prop("indoor3",1800,300),
		new Prop("package",200,400),
		new Prop("vase",600,400),
		new Prop("package",1000,400),
		new Prop("package",1300,400),
		new Prop("package",0,500),
		new Prop("vase",300,500),
		new Prop("vase",1800,500),
		new Prop("package",500,600),
		new Prop("package",800,600),
		new Prop("package",1000,600),
		new Prop("packagel",1400,600),
		new Prop("packager",1500,600),
		new Prop("package",1700,600),
		new Prop("vase",1800,600),
		new Prop("indoor1",0,700),
		new Prop("package",300,700),
		new Prop("packagel",400,700),
		new Prop("packager",500,700),
		new Prop("packagel",800,700),
		new Prop("packager",900,700),
		new Prop("vase",1000,700),
		new Prop("package",1100,700),
		new Prop("packagel",1200,700),
		new Prop("packager",1300,700),
		new Prop("vase",1400,700),
		new Prop("package",1600,700),
		new Prop("vase",1700,700),
		new Prop("package",1800,700),
		new Prop("vase",0,800),
		new Prop("package",100,800),
		new Prop("package",600,800),
		new Prop("package",1600,800),
		new Prop("package",1800,800),
		new Prop("package",0,900),
		new Prop("packagel",100,900),
		new Prop("packager",200,900),
		new Prop("packagel",300,900),
		new Prop("packager",400,900),
		new Prop("bucket",500,900),
		new Prop("package",600,900),
		new Prop("package",700,900),
		new Prop("tablel",800,900),
		new Prop("tabler",900,900),
		new Prop("vase",1000,900),
		new Prop("packagel",1100,900),
		new Prop("packager",1200,900),
		new Prop("vase",1300,900),
		new Prop("package",1400,900),
		new Prop("package",1700,900),
		new Prop("vase",1800,900)
	];
	var chooffice = [
		new Prop("wall3",0,0),
		new Prop("wall3",100,0),
		new Prop("painting3",200,0),
		new Prop("wall3",300,0),
		new Prop("wall3",400,0),
		new Prop("wall3",500,0),
		new Prop("wall3",600,0),
		new Prop("wall3",700,0),
		new Prop("tablet",0,100),
		new Prop("chair2f",500,100),
		new Prop("tableb",0,200),
		new Prop("tablel",400,200),
		new Prop("tabler",500,200),
		new Prop("chair1s",400,400),
		new Prop("chair1f",500,400),
		new Prop("lamp4",0,500),
		new Prop("indoor4",300,700),
		new Prop("blank",700,700)
	];
	var merchstaffroom1 = [
		new Prop("chair2f",0,0),
		new Prop("chair2f",100,0),
		new Prop("table1",400,0),
		new Prop("chair2s",700,0),
		new Prop("chair2f",300,100),
		new Prop("chair2f",500,100),
		new Prop("table1",0,200),
		new Prop("indoor4",400,300),
		new Prop("tablel",600,300),
		new Prop("tabler",700,300)
	];
	var merchstaffroom2 = [
		new Prop("blank",0,0),
		new Prop("",100,0),
		new Prop("tablel",200,0),
		new Prop("tabler",300,0),
		new Prop("chair2f",600,0),
		new Prop("chair2f",700,0),
		new Prop("chair2s",500,100),
		new Prop("tablel",600,100),
		new Prop("tabler",700,100),
		new Prop("chair2f",0,200),
		new Prop("chair2f",600,200),
		new Prop("chair2s",700,200),
		new Prop("indoor4",300,300),
		new Prop("blank",700,300)
	];
	var merchstaffroom3 = [
		new Prop("blank",0,0),
		new Prop("chair2s",100,0),
		new Prop("table1",200,0),
		new Prop("chair2f",300,0),
		new Prop("chair2f",700,0),
		new Prop("chair2f",200,100),
		new Prop("table1",700,100),
		new Prop("table1",0,200),
		new Prop("chair2s",700,200),
		new Prop("indoor4",300,300),
		new Prop("blank",700,300)
	];
	var merchstaffroom4 = [
		new Prop("blank",0,0),
		new Prop("chair2f",100,0),
		new Prop("chair2f",600,0),
		new Prop("tablet",700,0),
		new Prop("chair2s",0,100),
		new Prop("tableb",700,100),
		new Prop("chair2f",100,200),
		new Prop("chair2f",0,300),
		new Prop("indoor4",300,300),
		new Prop("chair2s",700,300)
	];
	var merchstaffroom5 = [
		new Prop("tablet",0,0),
		new Prop("chair2f",200,0),
		new Prop("chair2f",400,0),
		new Prop("chair2f",600,0),
		new Prop("tableb",0,100),
		new Prop("tablet",700,200),
		new Prop("indoor4",300,300),
		new Prop("chair2s",600,300),
		new Prop("tableb",700,300)
	];
	
	var kinghall1 = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("door3",200,0),
		new Prop("wall1",300,0),
		new Prop("wall1",400,0),
		new Prop("tablet",0,100),
		new Prop("carpettl",100,100),
		new Prop("carpettm",200,100),
		new Prop("carpettr",300,100),
		new Prop("tableb",0,200),
		new Prop("carpetml",100,200),
		new Prop("carpetml",200,200),
		new Prop("carpetmr",300,200),
		new Prop("carpetml",100,300),
		new Prop("carpetmm",200,300),
		new Prop("carpetmr",300,300),
		new Prop("carpetml",100,400),
		new Prop("carpetmm",200,400),
		new Prop("carpetmr",300,400),
		new Prop("tablet",400,400),
		new Prop("carpetml",100,500),
		new Prop("carpetmm",200,500),
		new Prop("carpetmr",300,500),
		new Prop("tableb",400,500),
		new Prop("carpetml",100,600),
		new Prop("carpetmm",200,600),
		new Prop("carpetmr",300,600),
		new Prop("carpetml",100,700),
		new Prop("carpetmm",200,700),
		new Prop("carpetmr",300,700),
		new Prop("carpetml",100,800),
		new Prop("carpetmm",200,800),
		new Prop("carpetmr",300,800),
		new Prop("table1",400,800),
		new Prop("carpetml",100,900),
		new Prop("carpetmm",200,900),
		new Prop("carpetmr",300,900),
		new Prop("carpetml",100,1000),
		new Prop("carpetmm",200,1000),
		new Prop("carpetmr",300,1000),
		new Prop("carpetml",100,1100),
		new Prop("carpetmm",200,1100),
		new Prop("carpetmr",300,1100),
		new Prop("tablet",0,1200),
		new Prop("carpetml",100,1200),
		new Prop("carpetmm",200,1200),
		new Prop("carpetmr",300,1200),
		new Prop("tableb",0,1300),
		new Prop("carpetml",100,1300),
		new Prop("carpetmm",200,1300),
		new Prop("carpetmr",300,1300),
		new Prop("carpetml",100,1400),
		new Prop("carpetmm",200,1400),
		new Prop("carpetmr",300,1400),
		new Prop("carpetml",100,1500),
		new Prop("carpetmm",200,1500),
		new Prop("carpetmr",300,1500),
		new Prop("table1",400,1500),
		new Prop("carpetml",100,1600),
		new Prop("carpetmm",200,1600),
		new Prop("carpetmr",300,1600),
		new Prop("carpetml",100,1700),
		new Prop("carpetmm",200,1700),
		new Prop("carpetmr",300,1700),
		new Prop("carpetml",100,1800),
		new Prop("carpetmm",200,1800),
		new Prop("carpetmr",300,1800),
		new Prop("carpetml",100,1900),
		new Prop("carpetmm",200,1900),
		new Prop("carpetmr",300,1900),
		new Prop("carpetml",100,2000),
		new Prop("carpetmm",200,2000),
		new Prop("carpetmr",300,2000),
		new Prop("table1",0,2100),
		new Prop("lamp5",0,2100),
		new Prop("carpetml",100,2100),
		new Prop("carpetmm",200,2100),
		new Prop("carpetmr",300,2100),
		new Prop("carpetml",100,2200),
		new Prop("carpetmm",200,2200),
		new Prop("carpetmr",300,2200),
		new Prop("tablet",400,2200),
		new Prop("carpetml",100,2300),
		new Prop("carpetmm",200,2300),
		new Prop("carpetmr",300,2300),
		new Prop("tableb",400,2300),
		new Prop("carpetml",100,2400),
		new Prop("carpetmm",200,2400),
		new Prop("carpetmr",300,2400),
		new Prop("table1",0,2500),
		new Prop("carpetml",100,2500),
		new Prop("carpetmm",200,2500),
		new Prop("carpetmr",300,2500),
		new Prop("carpetml",100,2600),
		new Prop("carpetmm",200,2600),
		new Prop("carpetmr",300,2600),
		new Prop("carpetbl",100,2700),
		new Prop("carpetbm",200,2700),
		new Prop("indoor4",200,2700),
		new Prop("carpetbr",300,2700),
		new Prop("blank",400,2700),
	];
	var kinghall2 =[ //50
		new Prop("wall1",0,0),
		new Prop("door3",100,0),
		new Prop("door3",200,0),
		new Prop("wall1",300,0),
		new Prop("carpettl",100,100),
		new Prop("carpettr",200,100),
		new Prop("carpetml",100,200),
		new Prop("carpetmr",200,200),
		new Prop("tablet",300,200),
		new Prop("carpetml",100,300),
		new Prop("carpetmr",200,300),
		new Prop("tableb",300,300),
		new Prop("carpetml",100,400),
		new Prop("carpetmr",200,400),
		new Prop("carpetml",100,500),
		new Prop("carpetmr",200,500),
		new Prop("carpetml",100,600),
		new Prop("carpetmr",200,600),
		new Prop("carpetml",100,700),
		new Prop("carpetmr",200,700),
		new Prop("tablet",0,800),
		new Prop("carpetml",100,800),
		new Prop("carpetmr",200,800),
		new Prop("tableb",0,900),
		new Prop("lamp5",0,900),
		new Prop("carpetml",100,900),
		new Prop("carpetmr",200,900),
		new Prop("carpetml",100,1000),
		new Prop("carpetmr",200,1000),
		new Prop("table1",300,1000),
		new Prop("carpetml",100,1100),
		new Prop("carpetmr",200,1100),
		new Prop("carpetml",100,1200),
		new Prop("carpetmr",200,1200),
		new Prop("carpetml",100,1300),
		new Prop("carpetmr",200,1300),
		new Prop("carpetml",100,1400),
		new Prop("carpetmr",200,1400),
		new Prop("carpetml",100,1500),
		new Prop("carpetmr",200,1500),
		new Prop("tablet",0,1600),
		new Prop("carpetml",100,1600),
		new Prop("carpetmr",200,1600),
		new Prop("tableb",0,1700),
		new Prop("carpetml",100,1700),
		new Prop("carpetmr",200,1700),
		new Prop("carpetml",100,1800),
		new Prop("carpetmr",200,1800),
		new Prop("carpetml",100,1900),
		new Prop("carpetmr",200,1900),
		new Prop("carpetml",100,2000),
		new Prop("carpetmr",200,2000),
		new Prop("carpetml",100,2100),
		new Prop("carpetmr",200,2100),
		new Prop("table1",300,2100),
		new Prop("carpetml",100,2200),
		new Prop("carpetmr",200,2200),
		new Prop("carpetml",100,2300),
		new Prop("carpetmr",200,2300),
		new Prop("carpetml",100,2400),
		new Prop("carpetmr",200,2400),
		new Prop("carpetml",100,2500),
		new Prop("carpetmr",200,2500),
		new Prop("carpetml",100,2600),
		new Prop("carpetmr",200,2600),
		new Prop("tablet",300,2600),
		new Prop("carpetml",100,2700),
		new Prop("carpetmr",200,2700),
		new Prop("tableb",300,2700),
		new Prop("carpetml",100,2800),
		new Prop("carpetmr",200,2800),
		new Prop("carpetml",100,2900),
		new Prop("carpetmr",200,2900),
		new Prop("carpetml",100,3000),
		new Prop("carpetmr",200,3000),
		new Prop("carpetml",100,3100),
		new Prop("carpetmr",200,3100),
		new Prop("carpetml",100,3200),
		new Prop("carpetmr",200,3200),
		new Prop("carpetml",100,3300),
		new Prop("carpetmr",200,3300),
		new Prop("table1",0,3400),
		new Prop("carpetml",100,3400),
		new Prop("carpetmr",200,3400),
		new Prop("table1",300,3400),
		new Prop("lamp5",300,3400),
		new Prop("carpetml",100,3500),
		new Prop("carpetmr",200,3500),
		new Prop("carpetml",100,3600),
		new Prop("carpetmr",200,3600),
		new Prop("carpetml",100,3700),
		new Prop("carpetmr",200,3700),
		new Prop("carpetml",100,3800),
		new Prop("carpetmr",200,3800),
		new Prop("carpetml",100,3900),
		new Prop("carpetmr",200,3900),
		new Prop("carpetml",100,4000),
		new Prop("carpetmr",200,4000),
		new Prop("tablet",0,4100),
		new Prop("carpetml",100,4100),
		new Prop("carpetmr",200,4100),
		new Prop("tableb",0,4200),
		new Prop("carpetml",100,4200),
		new Prop("carpetmr",200,4200),
		new Prop("carpetml",100,4300),
		new Prop("carpetmr",200,4300),
		new Prop("carpetml",100,4400),
		new Prop("carpetmr",200,4400),
		new Prop("carpetml",100,4500),
		new Prop("carpetmr",200,4500),
		new Prop("carpetml",100,4600),
		new Prop("carpetmr",200,4600),
		new Prop("carpetml",100,4700),
		new Prop("carpetmr",200,4700),
		new Prop("tablet",300,4700),
		new Prop("carpetml",100,4800),
		new Prop("carpetmr",200,4800),
		new Prop("tableb",300,4800),
		new Prop("carpetbl",100,4900),
		new Prop("carpetbr",200,4900),
		new Prop("indoor4",200,4900),
		new Prop("blank",300,4900),
	];
	var kingbed = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("window1",200,0),
		new Prop("wall1",300,0),
		new Prop("tarpt",400,0),
		new Prop("window1",500,0),
		new Prop("wall1",600,0),
		new Prop("wall1",700,0),
		new Prop("tarpt",800,0),
		new Prop("wall1",900,0),
		new Prop("wall1",1000,0),
		new Prop("tarpt",1100,0),
		new Prop("wall1",1200,0),
		new Prop("window1",1300,0),
		new Prop("tarpt",1400,0),
		new Prop("wall1",1500,0),
		new Prop("window1",1600,0),
		new Prop("wall1",1700,0),
		new Prop("wall1",1800,0),
		new Prop("wall1",1900,0),
		new Prop("shelff",0,100),
		new Prop("shelff",100,100),
		new Prop("wall1",200,100),
		new Prop("shelff",300,100),
		new Prop("shelff",400,100),
		new Prop("wall1",500,100),
		new Prop("wall1",600,100),
		new Prop("countert",700,100),
		new Prop("tarpb",800,100),
		new Prop("bedt",900,100),
		new Prop("bedt",1000,100),
		new Prop("tarpb",1100,100),
		new Prop("countert",1200,100),
		new Prop("wall1",1300,100),
		new Prop("tarpb",1400,100),
		new Prop("wall1",1500,100),
		new Prop("wall1",1600,100),
		new Prop("wall1",1700,100),
		new Prop("wood",1800,100),
		new Prop("wood",1900,100),
		new Prop("counterb",700,200),
		new Prop("bedb",900,200),
		new Prop("bedb",1000,200),
		new Prop("counterb",1200,200),
		new Prop("wood",1900,200),
		new Prop("secretdoor",1900,200),
		new Prop("carpettl",900,300),
		new Prop("carpettr",1000,300),
		new Prop("coucht",0,400),
		new Prop("carpetml",900,400),
		new Prop("carpetmr",1000,400),
		new Prop("coucht",1900,400),
		new Prop("couchb",0,500),
		new Prop("carpettl",300,500),
		new Prop("carpettm",400,500),
		new Prop("carpettm",500,500),
		new Prop("carpettr",600,500),
		new Prop("carpetml",900,500),
		new Prop("carpetmr",1000,500),
		new Prop("carpettl",1300,500),
		new Prop("carpettm",1400,500),
		new Prop("carpettm",1500,500),
		new Prop("carpettr",1600,500),
		new Prop("couchb",1900,500),
		new Prop("carpetml",300,600),
		new Prop("carpetmm",400,600),
		new Prop("carpetmm",500,600),
		new Prop("carpetmr",600,600),
		new Prop("carpetml",900,600),
		new Prop("carpetmr",1000,600),
		new Prop("carpetml",1300,600),
		new Prop("carpetmm",1400,600),
		new Prop("carpetmm",1500,600),
		new Prop("carpetmr",1600,600),
		new Prop("coucht",0,700),
		new Prop("carpetml",300,700),
		new Prop("carpetmm",400,700),
		new Prop("carpetmm",500,700),
		new Prop("carpetmr",600,700),
		new Prop("carpetml",900,700),
		new Prop("carpetmr",1000,700),
		new Prop("carpetml",1300,700),
		new Prop("carpetmm",1400,700),
		new Prop("carpetmm",1500,700),
		new Prop("carpetmr",1600,700),
		new Prop("coucht",1900,700),
		new Prop("couchb",0,800),
		new Prop("carpetbl",300,800),
		new Prop("carpetbm",400,800),
		new Prop("carpetbm",500,800),
		new Prop("carpetbr",600,800),
		new Prop("carpetml",900,800),
		new Prop("carpetmr",1000,800),
		new Prop("carpetbl",1300,800),
		new Prop("carpetbm",1400,800),
		new Prop("carpetbm",1500,800),
		new Prop("carpetbr",1600,800),
		new Prop("couchb",1900,800),
		new Prop("carpetml",900,900),
		new Prop("carpetmr",1000,900),
		new Prop("carpetml",900,1000),
		new Prop("carpetmr",1000,1000),
		new Prop("tablel",300,1100),
		new Prop("tabler",400,1100),
		new Prop("carpetbl",900,1100),
		new Prop("carpetbr",1000,1100),
		new Prop("indoor4",900,1100),
		new Prop("indoor4",1000,1100),
		new Prop("tablel",1400,1100),
		new Prop("tabler",1500,1100),
		new Prop("blank",1900,1100),
	];
	var kingcloset = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("wall1",200,0),
		new Prop("wall1",300,0),
		new Prop("openwindow",400,0),
		new Prop("openwindow",500,0),
		new Prop("openwindow",600,0),
		new Prop("wall1",700,0),
		new Prop("wall1",800,0),
		new Prop("wall1",900,0),
		new Prop("wall1",1000,0),
		new Prop("window1",0,100),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("openwindow",400,100),
		new Prop("openwindow",500,100),
		new Prop("openwindow",600,100),
		new Prop("wood",700,100),
		new Prop("wood",800,100),
		new Prop("wood",900,100),
		new Prop("window1",1000,100),
		new Prop("wall1",0,200),
		new Prop("wood",100,200),
		new Prop("painting4",200,200),
		new Prop("wood",300,200),
		new Prop("stageb",400,200),
		new Prop("stageb",500,200),
		new Prop("stageb",600,200),
		new Prop("wood",700,200),
		new Prop("painting4",800,200),
		new Prop("wood",900,200),
		new Prop("wall1",1000,200),
		new Prop("vase",0,300),
		new Prop("wood",100,300),
		new Prop("wood",200,300),
		new Prop("wood",300,300),
		new Prop("wood",700,300),
		new Prop("wood",800,300),
		new Prop("wood",900,300),
		new Prop("vase",1000,300),
		new Prop("vase",0,500),
		new Prop("vase",1000,500),
		new Prop("tablet",0,600),
		new Prop("lamp3",1000,600),
		new Prop("tableb",0,700),
		new Prop("tablet",1000,700),
		new Prop("lamp3",0,800),
		new Prop("tableb",1000,800),
		new Prop("vase",0,900),
		new Prop("vase",300,900),
		new Prop("indoor4",500,900),
		new Prop("vase",700,900),
		new Prop("vase",1000,900),
	];
	
	var towerhall1 = [
		new Prop("lamp4",0,0),
		new Prop("table2",300,0),
		new Prop("lamp4",400,0),
		new Prop("lamp4",800,0),
		new Prop("lamp4",1200,0),
		new Prop("tablel",1300,0),
		new Prop("tabler",1400,0),
		new Prop("lamp4",1600,0),
		new Prop("lamp4",2000,0),
		new Prop("tablet",2100,0),
		new Prop("indoor1",0,100),
		new Prop("tableb",2100,100),
		new Prop("tablel",0,200),
		new Prop("tabler",100,200),
		new Prop("tablel",1000,200),
		new Prop("tabler",1100,200),
		new Prop("",0,300),
		new Prop("",100,300),
		new Prop("",200,300),
		new Prop("",300,300),
		new Prop("",400,300),
		new Prop("",500,300),
		new Prop("",600,300),
		new Prop("",700,300),
		new Prop("",800,300),
		new Prop("",900,300),
		new Prop("",1000,300),
		new Prop("",1100,300),
		new Prop("",1200,300),
		new Prop("",1300,300),
		new Prop("",1400,300),
		new Prop("",1500,300),
		new Prop("",1600,300),
		new Prop("",1700,300),
		new Prop("",1800,300),
		new Prop("tablet",1900,300),
		new Prop("",2000,300),
		new Prop("lamp4",2100,300),
		new Prop("",1800,400),
		new Prop("tableb",1900,400),
		new Prop("",1800,500),
		new Prop("lamp4",1900,500),
		new Prop("",1800,600),
		new Prop("",1800,700),
		new Prop("lamp4",2100,700),
		new Prop("",0,800),
		new Prop("",100,800),
		new Prop("",200,800),
		new Prop("",1800,800),
		new Prop("table2",1900,800),
		new Prop("indoor3",100,900),
		new Prop("",300,900),
		new Prop("",1800,900),
		new Prop("lamp4",1900,900),
		new Prop("lamp4",200,1000),
		new Prop("",300,1000),
		new Prop("",1800,1000),
		new Prop("tablet",200,1100),
		new Prop("",300,1100),
		new Prop("",1800,1100),
		new Prop("lamp4",2100,1100),
		new Prop("lamp4",0,1200),
		new Prop("tableb",200,1200),
		new Prop("",300,1200),
		new Prop("",1800,1200),
		new Prop("",300,1300),
		new Prop("",1800,1300),
		new Prop("lamp4",1900,1300),
		new Prop("lamp4",200,1400),
		new Prop("",300,1400),
		new Prop("",1800,1400),
		new Prop("table2",2100,1400),
		new Prop("",300,1500),
		new Prop("",1800,1500),
		new Prop("lamp4",2100,1500),
		new Prop("lamp4",0,1600),
		new Prop("",300,1600),
		new Prop("",1800,1600),
		new Prop("table2",0,1700),
		new Prop("lamp4",300,1700),
		new Prop("lamp4",700,1700),
		new Prop("tablel",900,1700),
		new Prop("tabler",1000,1700),
		new Prop("lamp4",1100,1700),
		new Prop("lamp4",1500,1700),
		new Prop("lamp4",1900,1700),
		new Prop("tablel",0,1900),
		new Prop("tabler",100,1900),
		new Prop("table2",800,1900),
		new Prop("tablel",1700,1900),
		new Prop("tabler",1800,1900),
		new Prop("lamp4",2100,1900)
	];
	var towerhall2 = [
		new Prop("blank",0,0),
		new Prop("lamp4",200,0),
		new Prop("lamp4",600,0),
		new Prop("tablel",800,0),
		new Prop("tabler",900,0),
		new Prop("lamp4",1000,0),
		new Prop("lamp4",1400,0),
		new Prop("lamp4",1800,0),
		new Prop("indoor1",0,100),
		new Prop("lamp4",2100,100),
		new Prop("tablel",300,200),
		new Prop("tabler",400,200),
		new Prop("table2",1600,200),
		new Prop("",0,300),
		new Prop("",100,300),
		new Prop("",200,300),
		new Prop("",300,300),
		new Prop("",400,300),
		new Prop("",500,300),
		new Prop("",600,300),
		new Prop("",700,300),
		new Prop("",800,300),
		new Prop("",900,300),
		new Prop("",1000,300),
		new Prop("",1100,300),
		new Prop("",1200,300),
		new Prop("",1300,300),
		new Prop("",1400,300),
		new Prop("",1500,300),
		new Prop("",1600,300),
		new Prop("",1700,300),
		new Prop("",1800,300),
		new Prop("lamp4",1900,300),
		new Prop("",2000,300),
		new Prop("tablet",2100,300),
		new Prop("",1800,400),
		new Prop("tableb",2100,400),
		new Prop("",1800,500),
		new Prop("lamp4",2100,500),
		new Prop("",1800,600),
		new Prop("",1800,700),
		new Prop("lamp4",1900,700),
		new Prop("",0,800),
		new Prop("",100,800),
		new Prop("",200,800),
		new Prop("",1800,800),
		new Prop("tablet",1900,800),
		new Prop("lamp4",0,900),
		new Prop("indoor3",100,900),
		new Prop("",300,900),
		new Prop("",1800,900),
		new Prop("tableb",1900,900),
		new Prop("lamp4",2100,900),
		new Prop("tablet",0,1000),
		new Prop("",300,1000),
		new Prop("",1800,1000),
		new Prop("tableb",0,1100),
		new Prop("lamp4",200,1100),
		new Prop("",300,1100),
		new Prop("",1800,1100),
		new Prop("lamp4",1900,1100),
		new Prop("",300,1200),
		new Prop("",1800,1200),
		new Prop("lamp4",0,1300),
		new Prop("table2",200,1300),
		new Prop("",300,1300),
		new Prop("",1800,1300),
		new Prop("lamp4",2100,1300),
		new Prop("",300,1400),
		new Prop("",1800,1400),
		new Prop("lamp4",200,1500),
		new Prop("",300,1500),
		new Prop("",1800,1500),
		new Prop("lamp4",1900,1500),
		new Prop("table2",2100,1500),
		new Prop("",300,1600),
		new Prop("",400,1600),
		new Prop("",500,1600),
		new Prop("",600,1600),
		new Prop("",700,1600),
		new Prop("",800,1600),
		new Prop("",900,1600),
		new Prop("",1000,1600),
		new Prop("",1100,1600),
		new Prop("",1200,1600),
		new Prop("",1300,1600),
		new Prop("",1400,1600),
		new Prop("",1500,1600),
		new Prop("",1600,1600),
		new Prop("",1700,1600),
		new Prop("",1800,1600),
		new Prop("lamp4",0,1700),
		new Prop("lamp4",400,1700),
		new Prop("lamp4",800,1700),
		new Prop("lamp4",1200,1700),
		new Prop("tablel",1400,1700),
		new Prop("tabler",1500,1700),
		new Prop("lamp4",1700,1700),
		new Prop("lamp4",2100,1700),
		new Prop("tablel",0,1900),
		new Prop("tabler",100,1900),
		new Prop("table2",1100,1900),
		new Prop("blank",2100,1900)
	];
	var towerhall3 = [
		new Prop("tablel",0,0),
		new Prop("tabler",100,0),
		new Prop("lamp4",300,0),
		new Prop("lamp4",700,0),
		new Prop("lamp4",1100,0),
		new Prop("lamp4",1500,0),
		new Prop("table2",1700,0),
		new Prop("lamp4",1900,0),
		new Prop("indoor1",0,100),
		new Prop("lamp4",100,200),
		new Prop("table2",300,200),
		new Prop("lamp4",500,200),
		new Prop("lamp4",900,200),
		new Prop("lamp4",1300,200),
		new Prop("lamp4",1700,200),
		new Prop("lamp4",2100,200),
		new Prop("",0,300),
		new Prop("",100,300),
		new Prop("",200,300),
		new Prop("",300,300),
		new Prop("",400,300),
		new Prop("",500,300),
		new Prop("",600,300),
		new Prop("",700,300),
		new Prop("",800,300),
		new Prop("",900,300),
		new Prop("",1000,300),
		new Prop("",1100,300),
		new Prop("",1200,300),
		new Prop("",1300,300),
		new Prop("",1400,300),
		new Prop("",1500,300),
		new Prop("",1600,300),
		new Prop("",1700,300),
		new Prop("",1800,300),
		new Prop("",1800,400),
		new Prop("lamp4",1900,400),
		new Prop("table2",2100,400),
		new Prop("",1800,500),
		new Prop("",1800,600),
		new Prop("lamp4",2100,600),
		new Prop("",1800,700),
		new Prop("",0,800),
		new Prop("",100,800),
		new Prop("",200,800),
		new Prop("",1800,800),
		new Prop("lamp4",1900,800),
		new Prop("lamp4",0,900),
		new Prop("indoor3",100,900),
		new Prop("tablet",200,900),
		new Prop("",300,900),
		new Prop("",1800,900),
		new Prop("",0,1000),
		new Prop("",100,1000),
		new Prop("tableb",200,1000),
		new Prop("",300,1000),
		new Prop("",1800,1000),
		new Prop("tablet",1900,1000),
		new Prop("lamp4",2100,1000),
		new Prop("lamp4",200,1100),
		new Prop("",300,1100),
		new Prop("",1800,1100),
		new Prop("tableb",1900,1100),
		new Prop("table2",0,1200),
		new Prop("",300,1200),
		new Prop("",1800,1200),
		new Prop("lamp4",1900,1200),
		new Prop("lamp4",0,1300),
		new Prop("",300,1300),
		new Prop("",1800,1300),
		new Prop("",300,1400),
		new Prop("",1800,1400),
		new Prop("lamp4",2100,1400),
		new Prop("lamp4",200,1500),
		new Prop("",300,1500),
		new Prop("",1800,1500),
		new Prop("",300,1600),
		new Prop("",400,1600),
		new Prop("",500,1600),
		new Prop("",600,1600),
		new Prop("",700,1600),
		new Prop("",800,1600),
		new Prop("",900,1600),
		new Prop("",1000,1600),
		new Prop("",1100,1600),
		new Prop("",1200,1600),
		new Prop("",1300,1600),
		new Prop("",1400,1600),
		new Prop("",1500,1600),
		new Prop("",1600,1600),
		new Prop("",1700,1600),
		new Prop("",1800,1600),
		new Prop("lamp4",1900,1600),
		new Prop("lamp4",0,1700),
		new Prop("lamp4",400,1700),
		new Prop("lamp4",800,1700),
		new Prop("lamp4",1200,1700),
		new Prop("lamp4",1600,1700),
		new Prop("lamp4",2100,1800),
		new Prop("table2",0,1900),
		new Prop("tablel",600,1900),
		new Prop("tabler",700,1900),
		new Prop("table2",1400,1900),
		new Prop("tablel",2000,1900),
		new Prop("tabler",2100,1900)
	];
	var towerdining = [
		new Prop("blank",0,0),
		new Prop("tablel",200,0),
		new Prop("tabler",300,0),
		new Prop("indoor2",700,0),
		new Prop("tablel",900,0),
		new Prop("tabler",1000,0),
		new Prop("table1",0,100),
		new Prop("tablet",0,200),
		new Prop("tableb",0,300),
		new Prop("chair1f",300,300),
		new Prop("chair1f",500,300),
		new Prop("chair1f",700,300),
		new Prop("tablet",1000,300),
		new Prop("chair1s",200,400),
		new Prop("wood",300,400),
		new Prop("wood",400,400),
		new Prop("wood",500,400),
		new Prop("wood",600,400),
		new Prop("wood",700,400),
		new Prop("tableb",1000,400),
		new Prop("indoor1",0,500),
		new Prop("wood",300,500),
		new Prop("wood",400,500),
		new Prop("wood",500,500),
		new Prop("wood",600,500),
		new Prop("wood",700,500),
		new Prop("chair1s",800,500),
		new Prop("tablet",1000,500),
		new Prop("chair1f",300,600),
		new Prop("chair1f",500,600),
		new Prop("chair1f",700,600),
		new Prop("tableb",1000,600),
		new Prop("chair2s",0,900),
		new Prop("tablel",100,900),
		new Prop("tabler",200,900),
		new Prop("indoor4",700,900),
		new Prop("blank",1000,900)
	];
	var towerball = [
		new Prop("blank",0,0),
		new Prop("table1",100,0),
		new Prop("indoor2",400,0),
		new Prop("chair2s",900,100),
		new Prop("carpettl",200,200),
		new Prop("carpettm",300,200),
		new Prop("carpettm",400,200),
		new Prop("carpettm",500,200),
		new Prop("carpettm",600,200),
		new Prop("carpettr",700,200),
		new Prop("carpetml",200,300),
		new Prop("carpetmm",300,300),
		new Prop("carpetmm",400,300),
		new Prop("carpetmm",500,300),
		new Prop("carpetmm",600,300),
		new Prop("carpetmr",700,300),
		new Prop("chair2s",900,300),
		new Prop("staget",0,400),
		new Prop("staget",100,400),
		new Prop("carpetml",200,400),
		new Prop("carpetmm",300,400),
		new Prop("carpetmm",400,400),
		new Prop("carpetmm",500,400),
		new Prop("carpetmm",600,400),
		new Prop("carpetmr",700,400),
		new Prop("staget",0,500),
		new Prop("staget",100,500),
		new Prop("carpetml",200,500),
		new Prop("carpetmm",300,500),
		new Prop("carpetmm",400,500),
		new Prop("carpetmm",500,500),
		new Prop("carpetmm",600,500),
		new Prop("carpetmr",700,500),
		new Prop("chair2s",900,500),
		new Prop("staget",0,600),
		new Prop("staget",100,600),
		new Prop("carpetml",200,600),
		new Prop("carpetmm",300,600),
		new Prop("carpetmm",400,600),
		new Prop("carpetmm",500,600),
		new Prop("carpetmm",600,600),
		new Prop("carpetmr",700,600),
		new Prop("staget",0,700),
		new Prop("staget",100,700),
		new Prop("carpetml",200,700),
		new Prop("carpetmm",300,700),
		new Prop("carpetmm",400,700),
		new Prop("carpetmm",500,700),
		new Prop("carpetmm",600,700),
		new Prop("carpetmr",700,700),
		new Prop("chair2s",900,700),
		new Prop("carpetml",200,800),
		new Prop("carpetmm",300,800),
		new Prop("carpetmm",400,800),
		new Prop("carpetmm",500,800),
		new Prop("carpetmm",600,800),
		new Prop("carpetmr",700,800),
		new Prop("carpetbl",200,900),
		new Prop("carpetbm",300,900),
		new Prop("carpetbm",400,900),
		new Prop("carpetbm",500,900),
		new Prop("carpetbm",600,900),
		new Prop("carpetbr",700,900),
		new Prop("chair2s",900,900),
		new Prop("table2",100,1100),
		new Prop("indoor4",500,1100),
		new Prop("table2",900,1100)
	];
	var towersit1 = [
		new Prop("blank",0,0),
		new Prop("tablel",100,0),
		new Prop("tabler",200,0),
		new Prop("tablel",500,0),
		new Prop("tabler",600,0),
		new Prop("tablet",0,200),
		new Prop("table2",300,200),
		new Prop("table2",500,200),
		new Prop("tablet",700,200),
		new Prop("tableb",0,300),
		new Prop("indoor4",400,300),
		new Prop("tableb",700,300)
	];
	var towersit2 = [
		new Prop("blank",0,0),
		new Prop("chair1f",100,0),
		new Prop("table2",200,0),
		new Prop("chair2s",300,0),
		new Prop("chair1s",600,100),
		new Prop("tablet",700,100),
		new Prop("sidewall2",200,200),
		new Prop("chair2s",600,200),
		new Prop("tableb",700,200),
		new Prop("bedl",0,300),
		new Prop("bedr",100,300),
		new Prop("sidewall2",200,300),
		new Prop("indoor4",400,300),
		new Prop("blank",700,300)
	];
	var towersit3 = [
		new Prop("chair1f",0,0),
		new Prop("chair1f",500,0),
		new Prop("table2",0,100),
		new Prop("chair1s",300,100),
		new Prop("tablel",400,100),
		new Prop("tabler",500,100),
		new Prop("chair1s",600,100),
		new Prop("chair1f",0,200),
		new Prop("chair1f",400,200),
		new Prop("indoor4",400,300),
		new Prop("bedl",600,300),
		new Prop("bedr",700,300)
	];
	var towersit4 = [
		new Prop("blank",0,0),
		new Prop("chair1f",400,0),
		new Prop("tablel",500,0),
		new Prop("tabler",600,0),
		new Prop("chair1s",700,0),
		new Prop("chair1f",0,100),
		new Prop("chair1f",500,100),
		new Prop("chair1f",600,100),
		new Prop("table2",0,200),
		new Prop("chair1s",0,300),
		new Prop("indoor4",400,300),
		new Prop("bedl",600,300),
		new Prop("bedr",700,300)
	];var towersit5 = [
		new Prop("tablel",0,0),
		new Prop("tabler",100,0),
		new Prop("tablel",300,0),
		new Prop("tabler",400,0),
		new Prop("tablel",600,0),
		new Prop("tabler",700,0),
		new Prop("tablel",0,200),
		new Prop("tabler",100,200),
		new Prop("tablel",300,200),
		new Prop("tabler",400,200),
		new Prop("tablel",600,200),
		new Prop("tabler",700,200),
		new Prop("indoor4",400,300),
		new Prop("blank",700,300)
	];
	var towerbed = [
		new Prop("tablel",0,0),
		new Prop("tabler",100,0),
		new Prop("indoor2",500,0),
		new Prop("shelfl",700,100),
		new Prop("tablet",400,200),
		new Prop("bedt",500,200),
		new Prop("bedt",600,200),
		new Prop("bedt",700,200),
		new Prop("indoor1",0,300),
		new Prop("tableb",400,300),
		new Prop("bedb",500,300),
		new Prop("bedb",600,300),
		new Prop("bedb",700,300),
		new Prop("vase",700,500),
		new Prop("vase",100,600),
		new Prop("tablel",400,600),
		new Prop("tabler",500,600),
		new Prop("blank",700,600)
	];
	var towerentrance = [
		new Prop("tablet",0,0),
		new Prop("indoor2",300,0),
		new Prop("tablet",700,0),
		new Prop("tableb",0,100),
		new Prop("carpettl",300,100),
		new Prop("carpettr",400,100),
		new Prop("tableb",700,100),
		new Prop("carpetml",300,200),
		new Prop("carpetmr",400,200),
		new Prop("indoor1",0,300),
		new Prop("carpetml",300,300),
		new Prop("carpetmr",400,300),
		new Prop("indoor3",700,300),
		new Prop("carpetml",300,400),
		new Prop("carpetmr",400,400),
		new Prop("tablet",0,500),
		new Prop("carpetml",300,500),
		new Prop("carpetmr",400,500),
		new Prop("tablet",700,500),
		new Prop("tableb",0,600),
		new Prop("carpetml",300,600),
		new Prop("carpetmr",400,600),
		new Prop("tableb",700,600),
		new Prop("carpetml",300,700),
		new Prop("carpetmr",400,700),
		new Prop("carpetml",300,800),
		new Prop("carpetmr",400,800),
		new Prop("tablet",0,900),
		new Prop("carpet",300,900),
		new Prop("carpet",400,900),
		new Prop("tablet",700,900),
		new Prop("tableb",0,1000),
		new Prop("carpet",300,1000),
		new Prop("carpet",400,1000),
		new Prop("tableb",700,1000),
		new Prop("carpetml",300,1100),
		new Prop("carpetmr",400,1100),
		new Prop("indoor1",0,1200),
		new Prop("carpetml",300,1200),
		new Prop("carpetmt",400,1200),
		new Prop("indoor3",700,1200),
		new Prop("carpetml",300,1300),
		new Prop("carpetmr",400,1300),
		new Prop("tablet",0,1400),
		new Prop("carpetbl",300,1400),
		new Prop("carpetbr",400,1400),
		new Prop("tablet",700,1400),
		new Prop("tableb",0,1500),
		new Prop("indoor4",400,1500),
		new Prop("tableb",700,1500)
	];
	
	var tortureroom = [
		new Prop("lamp4",0,0),
		new Prop("indoor2",700,0),
		new Prop("lamp4",1300,0),
		new Prop("chair1s",300,200),
		new Prop("table2",400,200),
		new Prop("chair1s",500,200),
		new Prop("chair1s",800,200),
		new Prop("table2",900,200),
		new Prop("chair1s",1000,200),
		new Prop("tablet",0,300),
		new Prop("indoor3",1300,300),
		new Prop("tableb",0,400),
		new Prop("chair1s",300,400),
		new Prop("table2",400,400),
		new Prop("chair1s",500,400),
		new Prop("chair1s",800,400),
		new Prop("table2",900,400),
		new Prop("chair1s",1000,400),
		new Prop("chair1s",300,600),
		new Prop("table2",400,600),
		new Prop("chair1s",500,600),
		new Prop("chair1s",800,600),
		new Prop("table2",900,600),
		new Prop("chair1s",1000,600),
		new Prop("indoor1",0,700),
		new Prop("tablet",1300,700),
		new Prop("chair1s",300,800),
		new Prop("table2",400,800),
		new Prop("chair1s",500,800),
		new Prop("chair1s",800,800),
		new Prop("table2",900,800),
		new Prop("chair1s",1000,800),
		new Prop("tableb",1300,800),
		new Prop("lamp4",0,1000),
		new Prop("dBrick",0,1100),
		new Prop("dBrick",100,1100),
		new Prop("dBrick",200,1100),
		new Prop("dBrick",300,1100),
		new Prop("dBrick",400,1100),
		new Prop("dBrick",500,1100),
		new Prop("lamp4",600,1100),
		new Prop("pittl",0,1200),
		new Prop("pittr",100,1200),
		new Prop("lamp4",400,1200),
		new Prop("dBrick",500,1200),
		new Prop("carpettl",800,1200),
		new Prop("carpettm",900,1200),
		new Prop("carpettm",1000,1200),
		new Prop("carpettr",1100,1200),
		new Prop("indoor3",1300,1200),
		new Prop("pitm",0,1300),
		new Prop("pitbr",100,1300),
		new Prop("carpetml",800,1300),
		new Prop("carpetmm",900,1300),
		new Prop("carpetmm",1000,1300),
		new Prop("carpetmr",1100,1300),
		new Prop("pitm",0,1400),
		new Prop("dBrick",500,1400),
		new Prop("carpetml",800,1400),
		new Prop("carpetmm",900,1400),
		new Prop("carpetmm",1000,1400),
		new Prop("carpetmr",1100,1400),
		new Prop("pitm",0,1500),
		new Prop("dBrick",500,1500),
		new Prop("carpetml",800,1500),
		new Prop("carpetmm",900,1500),
		new Prop("carpetmm",1000,1500),
		new Prop("carpetmr",1100,1500),
		new Prop("table2",1300,1500),
		new Prop("pitm",0,1600),
		new Prop("pittr",100,1600),
		new Prop("pittl",300,1600),
		new Prop("pittr",400,1600),
		new Prop("dBrick",500,1600),
		new Prop("carpetml",800,1600),
		new Prop("carpetmm",900,1600),
		new Prop("carpetmm",1000,1600),
		new Prop("carpetmr",1100,1600),
		new Prop("pitbl",0,1700),
		new Prop("pitbr",100,1700),
		new Prop("pitbl",300,1700),
		new Prop("pitbr",400,1700),
		new Prop("dBrick",500,1700),
		new Prop("carpetbl",800,1700),
		new Prop("carpetbm",900,1700),
		new Prop("carpetbm",1000,1700),
		new Prop("carpetbr",1100,1700),
		new Prop("table2",1300,1700),
		new Prop("dBrick",500,1800),
		new Prop("lamp4",0,1900),
		new Prop("chair1s",200,1900),
		new Prop("lamp4",400,1900),
		new Prop("dBrick",500,1900),
		new Prop("indoor4",600,1900),
		new Prop("lamp4",1300,1900)
	];
	var sheriffoffice = [
		new Prop("bedt",0,0),
		new Prop("table1",100,0),
		new Prop("lamp3",400,0),
		new Prop("lamp4",700,0),
		new Prop("bedb",0,100),
		new Prop("chair1f",400,100),
		new Prop("tablel",300,200),
		new Prop("tabler",400,200),
		new Prop("lamp4",0,300),
		new Prop("lamp4",700,300),
		new Prop("chair2s",300,400),
		new Prop("chair2f",400,400),
		new Prop("lamp4",0,600),
		new Prop("chair1s",200,600),
		new Prop("indoor4",400,600),
		new Prop("lamp4",700,600)
	];
	var jail1 = [
		new Prop("lamp4",0,0),
		new Prop("dBars",100,0),
		new Prop("bedt",200,0),
		new Prop("toilet",400,0),
		new Prop("dBars",500,0),
		new Prop("bedt",600,0),
		new Prop("toilet",800,0),
		new Prop("dBars",900,0),
		new Prop("bedt",1000,0),
		new Prop("toilet",1200,0),
		new Prop("dBars",1300,0),
		new Prop("bedt",1400,0),
		new Prop("toilet",1600,0),
		new Prop("dBars",1700,0),
		new Prop("toilet",1900,0),
		new Prop("dBars",100,100),
		new Prop("bedb",200,100),
		new Prop("dBars",500,100),
		new Prop("bedb",600,100),
		new Prop("dBars",900,100),
		new Prop("bedb",1000,100),
		new Prop("dBars",1300,100),
		new Prop("bedb",1400,100),
		new Prop("dBars",1700,100),
		new Prop("dDoor",0,200),
		new Prop("dBars",100,200),
		new Prop("dDoor",200,200),
		new Prop("dBars",300,200),
		new Prop("dBars",400,200),
		new Prop("dBars",500,200),
		new Prop("dDoor",600,200),
		new Prop("dBars",700,200),
		new Prop("dBars",800,200),
		new Prop("dBars",900,200),
		new Prop("dDoor",1000,200),
		new Prop("dBars",1100,200),
		new Prop("dBars",1200,200),
		new Prop("dBars",1300,200),
		new Prop("dDoor",1400,200),
		new Prop("dBars",1500,200),
		new Prop("dBars",1600,200),
		new Prop("dBars",1700,200),
		new Prop("bedt",1900,200),
		new Prop("indoor1",0,300),
		new Prop("dDoor",1700,300),
		new Prop("bedb",1900,300),
		new Prop("dBars",1700,400),
		new Prop("dBars",1800,400),
		new Prop("dBars",1900,400),
		new Prop("dBars",300,500),
		new Prop("dDoor",400,500),
		new Prop("dBars",500,500),
		new Prop("dBars",900,500),
		new Prop("dDoor",1000,500),
		new Prop("dBars",1100,500),
		new Prop("lamp4",100,600),
		new Prop("dBars",300,600),
		new Prop("pitm",400,600),
		new Prop("dBars",500,600),
		new Prop("lamp4",700,600),
		new Prop("dBars",900,600),
		new Prop("pitm",1000,600),
		new Prop("dBars",1100,600),
		new Prop("lamp4",1300,600),
		new Prop("dBars",1400,600),
		new Prop("tablel",1600,600),
		new Prop("tabler",1700,600),
		new Prop("lamp4",1900,600)
	];
	var jail2 = [
		new Prop("lamp4",0,0),
		new Prop("dBars",100,0),
		new Prop("bedt",200,0),
		new Prop("toilet",400,0),
		new Prop("dBars",500,0),
		new Prop("bedt",600,0),
		new Prop("toilet",800,0),
		new Prop("dBars",900,0),
		new Prop("bedt",1000,0),
		new Prop("toilet",1200,0),
		new Prop("dBars",1300,0),
		new Prop("bedt",1400,0),
		new Prop("toilet",1600,0),
		new Prop("dBars",1700,0),
		new Prop("toilet",1900,0),
		new Prop("dBars",100,100),
		new Prop("bedb",200,100),
		new Prop("dBars",500,100),
		new Prop("bedb",600,100),
		new Prop("dBars",900,100),
		new Prop("bedb",1000,100),
		new Prop("dBars",1300,100),
		new Prop("bedb",1400,100),
		new Prop("dBars",1700,100),
		new Prop("dDoor",0,200),
		new Prop("dBars",100,200),
		new Prop("dDoor",200,200),
		new Prop("dBars",300,200),
		new Prop("dBars",400,200),
		new Prop("dBars",500,200),
		new Prop("dDoor",600,200),
		new Prop("dBars",700,200),
		new Prop("dBars",800,200),
		new Prop("dBars",900,200),
		new Prop("dDoor",1000,200),
		new Prop("dBars",1100,200),
		new Prop("dBars",1200,200),
		new Prop("dBars",1300,200),
		new Prop("dDoor",1400,200),
		new Prop("dBars",1500,200),
		new Prop("dBars",1600,200),
		new Prop("dBars",1700,200),
		new Prop("bedt",1900,200),
		new Prop("dDoor",1700,300),
		new Prop("bedb",1900,300),
		new Prop("indoor1",0,400),
		new Prop("dBars",1700,400),
		new Prop("dBars",1800,400),
		new Prop("dBars",1900,400),
		new Prop("dBars",200,600),
		new Prop("lamp4",300,600),
		new Prop("dBars",400,600),
		new Prop("dBars",800,600),
		new Prop("lamp4",900,600),
		new Prop("dBars",1000,600),
		new Prop("dBars",1400,600),
		new Prop("dDoor",1500,600),
		new Prop("dBars",1600,600),
		new Prop("tablet",1900,600),
		new Prop("lamp4",0,700),
		new Prop("dBars",200,700),
		new Prop("dDoor",300,700),
		new Prop("dBars",400,700),
		new Prop("lamp4",600,700),
		new Prop("dBars",800,700),
		new Prop("dDoor",900,700),
		new Prop("dBars",1000,700),
		new Prop("lamp4",1200,700),
		new Prop("dBars",1400,700),
		new Prop("dDoor",1500,700),
		new Prop("dBars",1600,700),
		new Prop("lamp4",1800,700),
		new Prop("tableb",1900,700)
	];
	
	var bighome1 = [
		new Prop("wall3",0,0),
		new Prop("wall3",100,0),
		new Prop("window1",200,0),
		new Prop("wall3",300,0),
		new Prop("wall3",400,0),
		new Prop("window1",500,0),
		new Prop("wall3",600,0),
		new Prop("wall3",700,0),
		new Prop("bedt",700,100),
		new Prop("bedb",700,200),
		new Prop("tablel",0,300),
		new Prop("tabler",100,300),
		new Prop("chair1s",0,400),
		new Prop("sink",700,400),
		new Prop("vase",0,500),
		new Prop("carpettl",200,500),
		new Prop("carpettm",300,500),
		new Prop("carpettr",400,500),
		new Prop("vase",700,500),
		new Prop("carpetml",200,600),
		new Prop("carpetmm",300,600),
		new Prop("carpetmr",400,600),
		new Prop("carpetbl",200,700),
		new Prop("carpetbm",300,700),
		new Prop("carpetbr",400,700),
		new Prop("tablet",700,700),
		new Prop("indoor4",300,800),
		new Prop("tableb",700,800)
	];
	var bighome2 = [
		new Prop("wall3",0,0),
		new Prop("wall3",100,0),
		new Prop("window1",200,0),
		new Prop("wall3",300,0),
		new Prop("wall3",400,0),
		new Prop("window",500,0),
		new Prop("wall3",600,0),
		new Prop("wall3",700,0),
		new Prop("carpettl",0,100),
		new Prop("carpettm",100,100),
		new Prop("carpettr",200,100),
		new Prop("vase",500,100),
		new Prop("vase",600,100),
		new Prop("bedl",0,200),
		new Prop("bedr",100,200),
		new Prop("carpetmr",200,200),
		new Prop("carpetbl",0,300),
		new Prop("carpetbm",100,300),
		new Prop("carpetbr",200,300),
		new Prop("tablel",400,400),
		new Prop("tabler",500,400),
		new Prop("chair1s",600,400),
		new Prop("sink",0,600),
		new Prop("vase",700,600),
		new Prop("chair1f",0,700),
		new Prop("indoor4",300,800),
	];
	var shamanhouse = [
		new Prop("hutm",0,0),
		new Prop("hutm",100,0),
		new Prop("hutm",200,0),
		new Prop("hutm",300,0),
		new Prop("hutm",400,0),
		new Prop("hutm",500,0),
		new Prop("hutm",600,0),
		new Prop("hutm",700,0),
		new Prop("shelfl",0,100),
		new Prop("counterl",100,100),
		new Prop("counterr",200,100),
		new Prop("shelfr",300,100),
		new Prop("bedl",500,100),
		new Prop("bedr",600,100),
		new Prop("vase",0,200),
		new Prop("vase",700,200),
		new Prop("chair1f",400,300),
		new Prop("table1",500,300),
		new Prop("chair1s",600,300),
		new Prop("vase",0,400),
		new Prop("campfire",200,400),
		new Prop("bearhead",500,400),
		new Prop("vase",700,400),
		new Prop("beararml",400,500),
		new Prop("beartorso",500,500),
		new Prop("beararmr",600,500),
		new Prop("vase",0,600),
		new Prop("bearlegl",400,600),
		new Prop("bearbutt",500,600),
		new Prop("bearlegr",600,600),
		new Prop("vase",700,600),
		new Prop("bucket",100,800),
		new Prop("vase",200,800),
		new Prop("indoor4",300,800),
		new Prop("vase",500,800),
		new Prop("bucket",600,800),
		new Prop("blank",700,800)
	];
	var bighome4 = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("window1",200,0),
		new Prop("wall1",300,0),
		new Prop("wall1",400,0),
		new Prop("window1",500,0),
		new Prop("wall1",600,0),
		new Prop("wall1",700,0),
		new Prop("tablel",100,100),
		new Prop("tabler",200,100),
		new Prop("bedt",700,100),
		new Prop("bedb",700,200),
		new Prop("carpettl",500,300),
		new Prop("carpettr",600,300),
		new Prop("table2",700,300),
		new Prop("vase",0,400),
		new Prop("vase",100,400),
		new Prop("carpetml",500,400),
		new Prop("carpetmr",600,400),
		new Prop("carpetbl",500,500),
		new Prop("carpetbr",600,500),
		new Prop("chair1s",700,500),
		new Prop("table1",0,600),
		new Prop("sink",700,700),
		new Prop("indoor4",300,800),
		new Prop("counterside",700,800)
	];
	var bighome3 = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("window1",200,0),
		new Prop("wall1",300,0),
		new Prop("wall1",400,0),
		new Prop("window1",500,0),
		new Prop("wall1",600,0),
		new Prop("wall1",700,0),
		new Prop("tablel",500,100),
		new Prop("tabler",600,100),
		new Prop("bedt",0,200),
		new Prop("vase",700,200),
		new Prop("bedb",0,300),
		new Prop("carpettl",300,300),
		new Prop("carpettm",400,300),
		new Prop("carpettm",500,300),
		new Prop("carpettr",600,300),
		new Prop("sink",0,400),
		new Prop("carpetbl",300,400),
		new Prop("carpetbm",400,400),
		new Prop("carpetbm",500,400),
		new Prop("carpetbr",600,400),
		new Prop("shelff",0,500),
		new Prop("vase",700,600),
		new Prop("chair1f",500,700),
		new Prop("tablet",600,700),
		new Prop("indoor4",300,800),
		new Prop("tableb",600,800),
		new Prop("chair1s",700,800)
	];
	var smallhome1 = [
		new Prop("cradle",0,0),
		new Prop("cradle",200,0),
		new Prop("bedt",300,0),
		new Prop("cradle",400,0),
		new Prop("cradle",600,0),
		new Prop("cradle",100,100),
		new Prop("bedb",300,100),
		new Prop("bucket",500,100),
		new Prop("cradle",700,100),
		new Prop("cradle",0,200),
		new Prop("cradle",200,200),
		new Prop("cradle",600,200),
		new Prop("cradle",100,300),
		new Prop("indoor4",400,300),
		new Prop("cradle",700,300)
	];
	var smallhome2 = [
		new Prop("catfood",0,0),
		new Prop("catfood",100,0),
		new Prop("catfood",200,0),
		new Prop("catfood",300,0),
		new Prop("catfood",400,0),
		new Prop("catfood",500,0),
		new Prop("bedt",600,0),
		new Prop("catfood",700,0),
		new Prop("catfood",0,100),
		new Prop("catfood",100,100),
		new Prop("catfood",200,100),
		new Prop("catfood",300,100),
		new Prop("bedb",600,100),
		new Prop("catfood",0,200),
		new Prop("catfood",100,200),
		new Prop("catfood",200,200),
		new Prop("catfood",700,200),
		new Prop("catfood",0,300),
		new Prop("catfood",100,300),
		new Prop("catfood",200,300),
		new Prop("indoor4",400,300),
		new Prop("blank",700,300)
	];
	var smallhome3 = [
		new Prop("blank",0,0),
		new Prop("shelfr",0,100),
		new Prop("chair1f",400,100),
		new Prop("table1",500,100),
		new Prop("indoor4",200,300),
		new Prop("blank",500,300)
	];
	var smallhome4 = [
		new Prop("blank",0,0),
		new Prop("bedl",100,0),
		new Prop("bedr",200,0),
		new Prop("sink",700,0),
		new Prop("table1",200,100),
		new Prop("shelff",600,100),
		new Prop("shelff",700,100),
		new Prop("chair1s",700,200),
		new Prop("vase",0,300),
		new Prop("indoor4",400,300),
		new Prop("blank",700,300)
	];
	var smallhome5 = [
		new Prop("blank",0,0),
		new Prop("table2",200,0),
		new Prop("trophy",200,0),
		new Prop("table2",700,0),
		new Prop("bedl",600,100),
		new Prop("bedr",700,100),
		new Prop("counterfront",0,200),
		new Prop("shelff",100,200),
		new Prop("indoor4",400,300),
		new Prop("chair1s",700,300)
	];
	var hut1 = [
		new Prop("vase",0,0),
		new Prop("vase",100,0),
		new Prop("vase",200,0),
		new Prop("vase",300,0),
		new Prop("vase",400,0),
		new Prop("vase",600,0),
		new Prop("pittl",700,0),
		new Prop("vase",0,100),
		new Prop("vase",200,100),
		new Prop("pitbl",700,100),
		new Prop("vase",100,200),
		new Prop("potterswheell",500,200),
		new Prop("potterswheelr",600,200),
		new Prop("vase",700,200),
		new Prop("vase",0,300),
		new Prop("vase",100,300),
		new Prop("indoor4",300,300),
		new Prop("table2",600,300),
		new Prop("bucket",700,300)
	];
	var hut2 = [
		new Prop("vase",0,0),
		new Prop("chair2f",200,0),
		new Prop("counterl",300,0),
		new Prop("counterr",400,0),
		new Prop("chair2f",500,0),
		new Prop("venditem1",600,0),
		new Prop("vase",700,0),
		new Prop("venditem2",0,100),
		new Prop("campfire",100,100),
		new Prop("venditem2",700,100),
		new Prop("bucket",500,200),
		new Prop("table2",700,200),
		new Prop("vase",0,300),
		new Prop("venditem1",100,300),
		new Prop("indoor4",300,300),
		new Prop("vase",600,300),
		new Prop("venditem2",700,300)
	];
	var hut3 = [
		new Prop("tablel",0,0),
		new Prop("tabler",100,0),
		new Prop("chair2s",200,0),
		new Prop("vase",300,0),
		new Prop("vase",500,0),
		new Prop("vase",600,0),
		new Prop("vase",0,200),
		new Prop("campfire",100,200),
		new Prop("bucket",700,200),
		new Prop("indoor4",300,300),
		new Prop("vase",600,300),
		new Prop("blank",700,300)
	];
	var hut4 = [
		new Prop("blank",0,0),
		new Prop("vase",100,0),
		new Prop("chair2f",300,0),
		new Prop("tablel",400,0),
		new Prop("tabler",500,0),
		new Prop("vase",600,0),
		new Prop("campfire",600,100),
		new Prop("bucket",0,200),
		new Prop("vase",200,300),
		new Prop("indoor4",300,300),
		new Prop("vase",500,300),
		new Prop("vase",600,300),
		new Prop("blank",700,300)
	];
	var hut5 = [
		new Prop("blank",0,0),
		new Prop("table2",100,0),
		new Prop("chair2f",200,0),
		new Prop("bucket",400,0),
		new Prop("chair2s",700,0),
		new Prop("campfire",600,100),
		new Prop("vase",0,200),
		new Prop("vase",0,300),
		new Prop("indoor4",300,300),
		new Prop("bucket",500,300),
		new Prop("vase",700,300)
	];
	var villagearena = [
		new Prop("hutm",0,0),
		new Prop("hutm",100,0),
		new Prop("hutm",200,0),
		new Prop("hutm",300,0),
		new Prop("hutm",400,0),
		new Prop("hutm",500,0),
		new Prop("hutm",600,0),
		new Prop("hutm",700,0),
		new Prop("dockb",100,100),
		new Prop("dockb",200,100),
		new Prop("dockb",500,100),
		new Prop("dockb",600,100),
		new Prop("dockb",0,300),
		new Prop("dockb",100,300),
		new Prop("dockb",600,300),
		new Prop("dockb",700,300),
		new Prop("dockb",300,400),
		new Prop("dockb",400,400),
		new Prop("countert",700,500),
		new Prop("table1",0,600),
		new Prop("shelff",500,600),
		new Prop("counterb",700,600),
		new Prop("counterfront",0,700),
		new Prop("campfire",700,700),
		new Prop("bucket",0,800),
		new Prop("indoor4",400,800),
		new Prop("blank",700,800)
	];
	
	var bigshop1 = [
		new Prop("lamp4",0,0),
		new Prop("lamp4",700,0),
		new Prop("wood",100,200),
		new Prop("wood",200,200),
		new Prop("wood",300,200),
		new Prop("wood",400,200),
		new Prop("wood",500,200),
		new Prop("wood",600,200),
		new Prop("wood",100,300),
		new Prop("wood",600,300),
		new Prop("wood",100,400),
		new Prop("wood",600,400),
		new Prop("wood",100,500),
		new Prop("wood",600,500),
		new Prop("wood",0,600),
		new Prop("wood",100,600),
		new Prop("wood",600,600),
		new Prop("wood",700,600),
		new Prop("lamp4",0,800),
		new Prop("indoor4",300,800),
		new Prop("lamp4",700,800)
	];
	var bigshop2 = [
		new Prop("lamp4",0,0),
		new Prop("wood",600,0),
		new Prop("wood",600,100),
		new Prop("wood",200,200),
		new Prop("wood",300,200),
		new Prop("wood",400,200),
		new Prop("wood",500,200),
		new Prop("wood",600,200),
		new Prop("wood",200,300),
		new Prop("wood",200,400),
		new Prop("wood",200,500),
		new Prop("indoor3",700,500),
		new Prop("wood",0,600),
		new Prop("wood",100,600),
		new Prop("wood",200,600),
		new Prop("lamp4",0,800),
		new Prop("indoor4",400,800),
		new Prop("lamp4",700,800)
	];
	var bigshop3 = [
		new Prop("blank",0,0),
		new Prop("wood",500,0),
		new Prop("wood",600,0),
		new Prop("wood",700,0),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("wood",400,100),
		new Prop("wood",500,100),
		new Prop("wood",700,100),
		new Prop("lamp4",0,200),
		new Prop("wood",0,300),
		new Prop("wood",100,300),
		new Prop("wood",200,300),
		new Prop("wood",200,400),
		new Prop("indoor3",700,400),
		new Prop("wood",200,500),
		new Prop("wood",200,600),
		new Prop("wood",300,600),
		new Prop("wood",400,600),
		new Prop("wood",500,600),
		new Prop("wood",500,700),
		new Prop("wood",500,800),
		new Prop("lamp4",700,800)
	];
	var bigshop4 = [
		new Prop("lamp4",0,0),
		new Prop("lamp4",700,0),
		new Prop("wood",100,100),
		new Prop("wood",300,100),
		new Prop("wood",500,100),
		new Prop("wood",100,200),
		new Prop("wood",300,200),
		new Prop("wood",500,200),
		new Prop("wood",100,300),
		new Prop("wood",300,300),
		new Prop("wood",500,300),
		new Prop("wood",100,400),
		new Prop("wood",300,400),
		new Prop("wood",500,400),
		new Prop("wood",100,500),
		new Prop("wood",300,500),
		new Prop("wood",500,500),
		new Prop("wood",700,600),
		new Prop("wood",600,700),
		new Prop("lamp4",0,800),
		new Prop("indoor4",300,800),
		new Prop("wood",600,800),
		new Prop("blank",700,800)
	];
	var bigshop5 = [
		new Prop("lamp4",0,0),
		new Prop("",0,100),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("wood",400,100),
		new Prop("wood",500,100),
		new Prop("lamp4",700,100),
		new Prop("wood",100,300),
		new Prop("wood",200,300),
		new Prop("wood",300,300),
		new Prop("wood",400,300),
		new Prop("wood",500,300),
		new Prop("indoor3",700,300),
		new Prop("wood",100,500),
		new Prop("wood",200,500),
		new Prop("wood",300,500),
		new Prop("wood",400,500),
		new Prop("wood",500,500),
		new Prop("wood",600,500),
		new Prop("wood",600,700),
		new Prop("wood",700,700),
		new Prop("lamp4",0,800),
		new Prop("indoor4",300,800),
		new Prop("wood",500,800),
		new Prop("blank",700,800)
	];
	var smallshop1 = [
		new Prop("lamp4",0,0),
		new Prop("lamp4",700,0),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("wood",400,100),
		new Prop("wood",500,100),
		new Prop("wood",600,100),
		new Prop("wood",100,200),
		new Prop("wood",600,200),
		new Prop("wood",100,300),
		new Prop("indoor4",300,300),
		new Prop("wood",600,300)
	];
	var smallshop2 = [
		new Prop("lamp4",0,0),
		new Prop("wood",400,0),
		new Prop("lamp4",700,0),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("wood",400,100),
		new Prop("wood",100,200),
		new Prop("indoor3",700,200),
		new Prop("wood",100,300),
		new Prop("indoor4",500,300),
		new Prop("blank",700,300)
	];
	var smallshop3 = [
		new Prop("wood",0,0),
		new Prop("wood",400,0),
		new Prop("wood",500,0),
		new Prop("wood",600,0),
		new Prop("wood",0,100),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",200,200),
		new Prop("indoor3",700,200),
		new Prop("wood",200,300),
		new Prop("indoor4",500,300),
		new Prop("blank",700,300)
	];
	var smallshop4 = [
		new Prop("lamp4",0,0),
		new Prop("wood",100,0),
		new Prop("wood",300,0),
		new Prop("wood",500,0),
		new Prop("lamp4",700,0),
		new Prop("wood",100,100),
		new Prop("wood",300,100),
		new Prop("wood",500,100),
		new Prop("wood",700,200),
		new Prop("indoor4",300,300),
		new Prop("wood",600,300),
		new Prop("blank",700,300)
	];
	var smallshop5 = [
		new Prop("wood",0,0),
		new Prop("wood",100,0),
		new Prop("wood",200,0),
		new Prop("wood",300,0),
		new Prop("wood",400,0),
		new Prop("wood",500,0),
		new Prop("wood",600,0),
		new Prop("wood",700,0),
		new Prop("wood",100,200),
		new Prop("wood",200,200),
		new Prop("wood",300,200),
		new Prop("wood",700,200),
		new Prop("indoor4",400,300),
		new Prop("wood",600,300)
	];
	
	var millroom = [
		new Prop("hay",0,0),
		new Prop("wood",100,0),
		new Prop("millerpillar",300,0),
		new Prop("hay",400,0),
		new Prop("wood",500,0),
		new Prop("hayl",600,0),
		new Prop("hayr",700,0),
		new Prop("wood",0,100),
		new Prop("wood",100,100),
		new Prop("millerpillar",300,100),
		new Prop("wood",500,100),
		new Prop("wood",600,100),
		new Prop("wood",700,100),
		new Prop("hay",0,200),
		new Prop("millerpillar",300,200),
		new Prop("hayl",600,200),
		new Prop("hayr",700,200),
		new Prop("millertl",200,300),
		new Prop("millertm",300,300),
		new Prop("millertr",400,300),
		new Prop("hay",700,300),
		new Prop("millerbl",200,400),
		new Prop("millerbm",300,400),
		new Prop("millerbr",400,400),
		new Prop("trought",0,500),
		new Prop("chair1f",700,500),
		new Prop("troughb",0,600),
		new Prop("chair1s",600,600),
		new Prop("table1",700,600),
		new Prop("bucket",0,700),
		new Prop("hay",600,700),
		new Prop("chair1s",700,700),
		new Prop("hay",0,800),
		new Prop("indoor4",300,800),
		new Prop("hay",700,800)
	];
	var stables = [
		new Prop("wood",0,0),
		new Prop("wood",200,0),
		new Prop("wood",400,0),
		new Prop("wood",600,0),
		new Prop("hay",700,0),
		new Prop("wood",0,100),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",400,100),
		new Prop("wood",600,100),
		new Prop("hay",0,200),
		new Prop("hay",400,200),
		new Prop("indoor4",200,300),
		new Prop("indoor4",500,300),
		new Prop("hay",700,300)
	];
	var courthouse = [
		new Prop("wood",0,0),
		new Prop("wood",200,0),
		new Prop("wood",400,0),
		new Prop("indoor3",700,0),
		new Prop("wood",0,100),
		new Prop("wood",100,100),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("wood",400,100),
		new Prop("wood",600,100),
		new Prop("wood",700,100),
		new Prop("wood",600,200),
		new Prop("benchl",0,300),
		new Prop("benchr",100,300),
		new Prop("benchl",300,300),
		new Prop("benchr",400,300),
		new Prop("wood",600,300),
		new Prop("wood",700,300),
		new Prop("benchl",0,500),
		new Prop("benchr",100,500),
		new Prop("benchl",300,500),
		new Prop("benchr",400,500),
		new Prop("benchl",600,500),
		new Prop("benchr",700,500),
		new Prop("benchl",0,700),
		new Prop("benchr",100,700),
		new Prop("benchl",300,700),
		new Prop("benchr",400,700),
		new Prop("benchl",600,700),
		new Prop("benchr",700,700),
		new Prop("indoor4",200,800),
		new Prop("blank",700,800)
	];
	var mirrorroom = [
		new Prop("wall1",0,0),
		new Prop("wall1",100,0),
		new Prop("wall1",200,0),
		new Prop("wall1",300,0),
		new Prop("wall1",400,0),
		new Prop("wall1",500,0),
		new Prop("wall1",600,0),
		new Prop("wall1",700,0),
		new Prop("mirror",400,100),
		new Prop("apple",400,400),
		new Prop("indoor4",200,800),
		new Prop("blank",700,800)
	];
	var treehouse = [
		new Prop("wood",0,0),
		new Prop("wood",100,0),
		new Prop("bushwallm",200,0),
		new Prop("wood",300,0),
		new Prop("wood",400,0),
		new Prop("bushwallm",500,0),
		new Prop("wood",600,0),
		new Prop("wood",700,0),
		new Prop("bedl",0,100),
		new Prop("bedr",100,100),
		new Prop("cradle",300,100),
		new Prop("chair2f",700,100),
		new Prop("vase",0,300),
		new Prop("sink",100,300),
		new Prop("bucket",200,300),
		new Prop("indoor4",400,300),
		new Prop("tablel",600,300),
		new Prop("tabler",700,300)
	];
	var bathentry = [
		new Prop("blank",0,0),
		new Prop("indoor2",100,0),
		new Prop("wood",200,0),
		new Prop("wood",500,0),
		new Prop("indoor2",600,0),
		new Prop("wood",200,100),
		new Prop("wood",300,100),
		new Prop("wood",400,100),
		new Prop("wood",500,100),
		new Prop("lockerl",0,200),
		new Prop("table1",700,200),
		new Prop("lockerl",0,300),
		new Prop("indoor4",400,300),
		new Prop("indoor3",700,300)
	];
	var bathgirls = [
		new Prop("lockerf",0,0),
		new Prop("lockerf",100,0),
		new Prop("poollinertl",200,0),
		new Prop("poollinertm",300,0),
		new Prop("poollinertm",400,0),
		new Prop("poollinertr",500,0),
		new Prop("waterfalltl",600,0),
		new Prop("waterfallh",700,0),
		new Prop("poollinertl",100,100),
		new Prop("poollinerbr",200,100),
		new Prop("water",300,100),
		new Prop("water",400,100),
		new Prop("water",500,100),
		new Prop("waterfallv",600,100),
		new Prop("poollinermr",700,100),
		new Prop("poollinerml",100,200),
		new Prop("water",200,200),
		new Prop("water",300,200),
		new Prop("water",400,200),
		new Prop("water",500,200),
		new Prop("water",600,200),
		new Prop("poollinermr",700,200),
		new Prop("poollinerml",100,300),
		new Prop("water",200,300),
		new Prop("water",300,300),
		new Prop("water",400,300),
		new Prop("water",500,300),
		new Prop("water",600,300),
		new Prop("poollinermr",700,300),
		new Prop("poollinerml",100,400),
		new Prop("water",200,400),
		new Prop("water",300,400),
		new Prop("water",400,400),
		new Prop("water",500,400),
		new Prop("water",600,400),
		new Prop("poollinermr",700,400),
		new Prop("poollinerbl",100,500),
		new Prop("poollinertr",200,500),
		new Prop("water",300,500),
		new Prop("water",400,500),
		new Prop("water",500,500),
		new Prop("poollinertl",600,500),
		new Prop("poollinerbr",700,500),
		new Prop("poollinerbl",200,600),
		new Prop("poollinerbm",300,600),
		new Prop("poollinerbm",400,600),
		new Prop("poollinerbm",500,600),
		new Prop("poollinerbr",600,600),
		new Prop("tablet",0,700),
		new Prop("tablet",700,700),
		new Prop("tableb",0,800),
		new Prop("indoor4",300,800),
		new Prop("tableb",700,800)
	];
	var bathboys = [
		new Prop("waterfallh",0,0),
		new Prop("waterfalltr",100,0),
		new Prop("poollinertm",200,0),
		new Prop("poollinertm",300,0),
		new Prop("poollinertm",400,0),
		new Prop("poollinertr",500,0),
		new Prop("lockerr",700,0),
		new Prop("poollinermr",0,100),
		new Prop("waterfallv",100,100),
		new Prop("water",200,100),
		new Prop("water",300,100),
		new Prop("water",400,100),
		new Prop("poollinerbl",500,100),
		new Prop("poollinertr",600,100),
		new Prop("lockerl",700,100),
		new Prop("poollinermr",0,200),
		new Prop("water",100,200),
		new Prop("water",200,200),
		new Prop("water",300,200),
		new Prop("water",400,200),
		new Prop("water",500,200),
		new Prop("poollinerml",600,200),
		new Prop("poollinermr",0,300),
		new Prop("water",100,300),
		new Prop("water",200,300),
		new Prop("water",300,300),
		new Prop("water",400,300),
		new Prop("water",500,300),
		new Prop("poollinerml",600,300),
		new Prop("poollinermr",0,400),
		new Prop("water",100,400),
		new Prop("water",200,400),
		new Prop("water",300,400),
		new Prop("water",400,400),
		new Prop("water",500,400),
		new Prop("poollinerml",600,400),
		new Prop("poollinerbl",0,500),
		new Prop("poollinertr",100,500),
		new Prop("water",200,500),
		new Prop("water",300,500),
		new Prop("water",400,500),
		new Prop("poollinertl",500,500),
		new Prop("poollinerbr",600,500),
		new Prop("poollinerbl",100,600),
		new Prop("poollinerbm",200,600),
		new Prop("poollinerbm",300,600),
		new Prop("poollinerbm",400,600),
		new Prop("poollinerbr",500,600),
		new Prop("tablel",0,800),
		new Prop("tabler",100,800),
		new Prop("indoor4",300,800),
		new Prop("tablel",600,800),
		new Prop("tabler",700,800)
	];
	var bathpower = [
		new Prop("campfire",0,0),
		new Prop("pitbr",100,0),
		new Prop("coaltl",200,0),
		new Prop("coalm",300,0),
		new Prop("coalm",400,0),
		new Prop("coaltr",500,0),
		new Prop("stonetablet",700,0),
		new Prop("pitbr",0,100),
		new Prop("counterfront",200,100),
		new Prop("coalbl",300,100),
		new Prop("coalbr",400,100),
		new Prop("shelff",500,100),
		new Prop("stonetableb",700,100),
		new Prop("stonetable",0,300),
		new Prop("indoor4",400,300),
		new Prop("stonetable",700,300)
	];
	
	
	//PLACE VARIABLES
	var wkHomeOut = new Place(wkhomeout);
	wkHomeOut.create();
	
	var mapList = [];
	
	
		//BG
		//WHICH PLACE IS IT?
		//THE ITEMS IN THE AREA, THE SCENERY
		//EXITS
		//THE NPCs IN THE AREA
		//THE PLAYER IN THE AREA
		//MOVEMENT OF THAT STUFF
		//NAVIGATE, UPDATE, DRAW
		//NOT READY FOR THIS LVL AREA YET
	//BATTLE OBJ
		//BG
		//TUTORIAL DIALOG
		//WHICH BATTLE IS IT?
		//IS IT PAUSED?
		//THE BATTLE AREA
			//MONSTERS GENERATING
			//MONSTERS MOVING AND DOING THEIR SHIT
			//PLAYER MOVING AND DOING HIS SHIT
		//INPUT DATA
		//NAVIGATE, UPDATE, DRAW
	//NPC OBJ
		//ENEMY OBJ
			//BOSS
			//MINION
		//FRIEND OBJ
		//FRENEMY OBJ


	//SAVE DATA OBJ
	var saveData = {	//TODO fill in
		//quests completed, lvlunlocked, currentplace, storyprogress, itemsheld, top5items
	};

		//LISTS
	//Cutscene Dialog
	var cutsceneDialog = new Array();
	var cutsceneChoice = new Array();
	cutsceneChoice[0] = new Array(3);
	cutsceneDialog[0] = new Array(17);
	cutsceneDialog[0][0] = "Once upon a time . . .";
	cutsceneDialog[0][1] = ". . . .  . . . .";
	cutsceneDialog[0][2] = "=unslam=                                           NO SOLICITORS, DOUCHE MC-BAGGINS!!!";
	cutsceneDialog[0][3] = "Oh, erm... Hello. Is the 'Wanikani' there?         I am here to summon him by royal decree.           Could you, like, get him or something?";
	cutsceneDialog[0][4] = "=slam=                                             Uh.... okay.... What a jerk...";
	cutsceneDialog[0][5] = "=unslam=                                           Hi, sorry about that. My brother Kaniwani is just  dealing with man-child angst. I'm Wanikani.        What's up?";
	cutsceneDialog[0][6] = "Greetings to you, Mr. Wanikani.                    I am acting-king, and former king's advisor, Viet. Under normal circumstances, I wouldn't bother      addressing kaijuu scum, such as yourself,...       ...but the Tofugu Kingdom is under quite a bit of  duress that needs addressing...";
	cutsceneDialog[0][7] = "Our bloodline king, King Koichi, has recently gone mad with power and the cray-crays! It's just plain awful, よ.  Y'see, it all started when...";
	cutsceneDialog[0][8] = "...King Koichi was getting super hot and lonely. Hewanted to secure an heir to the throne and maintainhis superior genetic lineage with his loin-jelly.  Wise of Tofugian history, and well aware of        the surrounding kingdoms, King Koichi set out to   our well-disliked neighbors in Bane Country in     order to make union with their super-hot Princess  and simultaneously secure a peaceful alliance with them to make closure to our long and shakey history(as well as get some sweet bootay and potential    for an heir). Unfortunately, he might have gone    about it in the... not-wisest of ways...";
	cutsceneDialog[0][9] = "He kinda kidnapped the Princess and has been       holding her hostage...";
	cutsceneDialog[0][10] = "Needless to say, the Bane Country residents are    less than enthused. They are also, and this is     important, kaijuu, much like yourself.";
	cutsceneDialog[0][11] = "But without the Princess to keep them in check,    they become feral and aggressive. They have startedto storm Tofugu kindgom...";
	cutsceneDialog[0][12] = "Meanwhile, our King seems to have locked himself inthe depths of Tofugu Tower.";
	cutsceneDialog[0][13] = "His madness in this matter has lead me to take     leadership on the throne as a king-in-action.      However, I cannot defeat our maddened King alone,  nor, and especially not, all the sieging kaijuu    from Bane Country. I need the help of someone of   the same brute strength as these monsters, another kaijuu. You are the closest kaijuu that has had no hand in attacking the Kingdom...";
	cutsceneDialog[0][14] = "Will you please help save Tofugu Kingdom and returnthat Bane Princess from King Koichi's clutches?!   We'll do anything! ANYTHING~";	
	cutsceneChoice[0][0] = "Will Wanikani help save Tofugu Kingdom?"; //
	cutsceneChoice[0][1] = "You're on your own, kid. YOLO~"; //
	cutsceneChoice[0][2] = "Sure, I was kinda bored anyways!~"; //
	cutsceneDialog[1] = new Array(1);
	cutsceneDialog[2] = new Array(1);
	cutsceneDialog[1][0] = "Damn you, Wanikani....";
	cutsceneDialog[2][0] = "Wonderful!~ In exchange for your services, I offer you diplomatic immunity from our kaijuu-banning    by-laws. Meet me at Tofugu tower post-haste!";

	var cutscene = {
		textCondition: null,
		sceneNum: 0,	//which scene are you on or left off at
		sceneProgress: [null,"locked","locked",null,null,null,null,null,null,null,null,null,null], 	//null, locked, finished; for keeping track of save data and keeping certain scenes from playing prematurely
		sceneLength: [17,1,1,0,0,0,0,0,0,0,0,0,0],	//how long a scene is
		sceneSpot: 0,	//where one is in a particular scene, the place
		fWidth: 333,
		fHeight: 250,
		update: function(){
			//TO DO, CHECK IF SCENE IS OVER, IF SO, RETURN TO EXPLORE MODE
			if((cutscene.sceneProgress[cutscene.sceneNum] === "finished") || (cutscene.sceneProgress[cutscene.sceneNum] === "locked")){
				whichMode = "explore";
				dialogueBox.dialogueCompleted = false
				dialogueBox.dialogue = 0;
				dialogueBox.dialogue = [];
				dialogueBox.text = 0;
				dialogueBox.text = [];
				dialogueBox.pageNum = 0;
				dialogueBox.rowNum = 0;
				dialogueBox.pages = 0;
				dialogueBox.rows = 0;
				dialogueBox.letterIndx = 0;
				dialogueBox.drawLetterIndx = 0;
				dialogueBox.pageFilled = false;
				dialogueBox.pageDone = false;
				dialogueBox.Row1 = [];
				dialogueBox.Row2 = [];
				dialogueBox.Row3 = [];
				dialogueBox.Row4 = [];
			}
		},
		cutsceneExceptions: function(){
			if((cutscene.sceneNum === 0) && (cutscene.sceneSpot === 14)){
				isChoice = true;
				return true;
			}
			else if((cutscene.sceneNum === 1) && (cutscene.sceneSpot === 0)){
				isChoice = false;
				return "loser";
			}
			else{
				return false;
			}
		},
		cutsceneResponse: function(choice){
			dialogueBox.dialogueCompleted = false
			dialogueBox.dialogue = 0;
			dialogueBox.dialogue = [];
			dialogueBox.text = 0;
			dialogueBox.text = [];
			dialogueBox.pageNum = 0;
			dialogueBox.rowNum = 0;
			dialogueBox.pages = 0;
			dialogueBox.rows = 0;
			dialogueBox.letterIndx = 0;
			dialogueBox.drawLetterIndx = 0;
			dialogueBox.pageFilled = false;
			dialogueBox.pageDone = false;
			dialogueBox.Row1 = [];
			dialogueBox.Row2 = [];
			dialogueBox.Row3 = [];
			dialogueBox.Row4 = [];
			if((cutscene.sceneNum === 0) && (cutscene.sceneSpot === 14)){
				if(choice === 1){ //will help
					isChoice = false;
					cutscene.sceneProgress[1] = "null";
					cutscene.sceneNum = 1;
					cutscene.sceneSpot = 0;
				}
				else{ //not help, game over
					isChoice = false;
					cutscene.sceneProgress[2] = "null";
					cutscene.sceneNum = 2;
					cutscene.sceneSpot = 0;
					
				}
			}
			else{
			}
		},
		draw: function(){ //Draw the Cutscene Image to screen
			var sceneImg = null;
			switch(cutscene.sceneNum){
				case(0):
					sceneImg = scene1Img;
					break;
				case(1):
					sceneImg = scene2Img;
					break;
				case(2):
					sceneImg = scene3Img;
					break;
				//TODO ADD MORE LATER
				default:
					break;
			}
			ct3.drawImage(sceneImg,(cutscene.sceneSpot)*cutscene.fWidth,0,cutscene.fWidth,cutscene.fHeight,75,0,cutscene.fWidth*2,cutscene.fHeight*2);
		}
	};	//CUTSCENE LIST //TODO MAKE ARRAYS OF EACH CUTSCENE 250*333PX TEST IMAGES? SCENE LENGTH, CURRENT INDEX
	
	//CHOICE BOX FOR CUTSCENES AND NPC DIALOG
	var choiceBox = {
		currentIndX: 1,
		isSelected: false,
		update: function(){// Which Dialogue
			if(whichMode === "cutscene"){ //if cutscene choice
				if(choiceBox.isSelected === true){
					choiceBox.isSelected = false;
					isChoice = false;
					cutscene.cutsceneResponse(choiceBox.currentIndX);
				}
				else{}
			}
			else if(whichMode === "explore"){ //if NPC chatting choice
				
			}
			else{}
		},
		draw: function(){
			//draw box where choices are drawn
			ct3.fillStyle = "#999999";
			ct3.strokeStyle = "#ffffff";
			ct3.fillRect(200,200,500,150);
			ct3.strokeRect(200,200,500,150);
			if(whichMode === "cutscene"){ //if cutscene choice
				ct3.font = "bold 12pt sans-serif";
				ct3.fillStyle = "#ffffff";
				ct3.fillText(cutsceneChoice[cutscene.sceneNum][0], 275,225);				
				ct3.font = "12pt sans-serif";
				if(choiceBox.currentIndX !== 1){
					ct3.fillStyle = "#ffffff";
					ct3.fillText(cutsceneChoice[cutscene.sceneNum][1], 225,255);
				}
				else{
					ct3.fillStyle = "#ff0000";
					ct3.fillText(cutsceneChoice[cutscene.sceneNum][1], 225,255);
				}
				if(choiceBox.currentIndX !== 2){
					ct3.fillStyle = "#ffffff";
					ct3.fillText(cutsceneChoice[cutscene.sceneNum][2], 225,285);
				}
				else{
					ct3.fillStyle = "#ff0000";
					ct3.fillText(cutsceneChoice[cutscene.sceneNum][2], 225,285);
				}
				if(cutsceneChoice[cutscene.sceneNum].length > 3){
					if(choiceBox.currentIndX !== 3){
						ct3.fillStyle = "#ffffff";
						ct3.fillText(cutsceneChoice[cutscene.sceneNum][3], 225,215);
					}
					else{
						ct3.fillStyle = "#ff0000";
						ct3.fillText(cutsceneChoice[cutscene.sceneNum][3], 225,215);
					}
				}
			}
			else if(whichMode === "explore"){ //if NPC chatting choice
				
			}
			else{}
		}
	};
	
	var theBattles = new Array();	//BATTLE LIST
	var theNPCs = new Array();	//NPC LIST
	var theQuests = new Array();	//QUEST LIST
	var thePlaces = new Array();	//PLACE LIST
	var theItems = new Array();	//GAME ITEMS LIST
	var theBGM = new Array();	//BGM LIST
	var theFrenemys = new Array();	//FRENEMY LIST
	var theEnemies = new Array();	//ENEMY LIST
	var currentEnemyLoad = new Array();	//CURRENT BATTLE ENEMIES LIST

//GAME FUNCTIONS
	//CREATE LIST: QUEST
	//TODO CUTSCENE IMAGES
	var scene1Img = new Image();
	var scene2Img = new Image();
	var scene3Img = new Image();
	//TODO BACKGROUND IMAGES
	var backdrop1Img = new Image();
	//TODO BACKDROP PROP IMAGES
	var tilePropsImg1 = new Image();
	var tilePropsImg2 = new Image();
	//TODO ITEM IMAGES
	//TODO SPRITE IMAGES
	//CREATE LIST: BATTLES
	//CREATE LIST: GAME ITEMS
	//CREATE LIST: PLACES
	//CREATE LIST: NPCS
	//CREATE LIST: BGM
	//CREATE LIST: FRENEMY
	//CREATE LIST: ENEMY
	//CREATE LIST: CURRENT ENEMY
	//PAUSE MOVEMENT THINGS FUNCTION
	//UNPAUSE MOVEMENT THINGS FUNCTION
	//ANIMATION FUNCTION
	//COLLISION DETECTION FUNCTION
	//MONSTER SPAWN FUNCTION
	//INPUT FUNCTION
	function userInput(scenario){
		//WHICH SCENARIO? EXPLORE, BATTLE, CUTSCENE
		switch(scenario){
			case ("explore"):
				//MOVEMENT U-W D-S L-A R-D
				//INTERACT ENTER SPACE Z
				//PAUSE SHIFT P
				$("body").on("keydown", function(key){ //MOVEMENT KEYS
					if(ifGame === true){
						map1.collidableRange();
						if((parseInt(key.which, 10) === 38)||(parseInt(key.which, 10) === 87)){ //UP W
							key.which = null;
							player.move("up");
							//map1.update("up"); //TEST
						}
						if((parseInt(key.which, 10) === 40)||(parseInt(key.which, 10) === 83)){ //DOWN S
							key.which = null;
							player.move("down");
							//map1.update("down"); //TEST
						}
						if((parseInt(key.which, 10) === 37)||(parseInt(key.which, 10) === 65)){ //LEFT A
							key.which = null;
							player.move("left");
							//map1.update("left"); //TEST
						}
						if((parseInt(key.which, 10) === 39)||(parseInt(key.which, 10) === 68)){ //RIGHT D
							key.which = null;
							player.move("right");
							//map1.update("right"); //TEST
						}
					}
				});
				$("body").on("keyup", function(key){ //NON-MOVEMENT KEYS
					if(ifGame === true){
						if((parseInt(key.which, 10) === 13)||(parseInt(key.which, 10) === 90)){ //ENTER Z
							key.which = null;
							console.log("INTERACTS WITH SOMETHING");
							
						}
						if((parseInt(key.which, 10) === 16)||(parseInt(key.which, 10) === 80)){ //PAUSE P SHIFT
							key.which = null;
							ifGame = false;
							ifMenu = true;
							whichMenu = "pause";
							screenSwitch();
						}
					}
				});
				break;
			case ("battle"):
				$("body").on("keyup", function(key){
					if(ifGame === true){
						if(parseInt(key.which, 10) === 13){ //ENTER TEXT 
							key.which = null;
							console.log("BATTLE WORKS ENTER");
							textInput.fakeTempText = [];
							textInput.tempText = [];
							textInput.text = [];
							
						}
						if(parseInt(key.which, 10) === 16){ //PAUSE SHIFT
							key.which = null;
							ifGame = false;
							ifMenu = true;
							whichMenu = "pause";
							screenSwitch();
							console.log(whichMenu);
						}
						if(parseInt(key.which, 10) === 20){ //KANA TOGGLE CAPS-LOCKS
							key.which = null;
							if(textInput.ifKana === true){
								textInput.ifKana = false;
							}
							else{
								textInput.ifKana = true;
							}
							
						}
						//TODO TYPE LETTERS NUMBER SPACE
						if((parseInt(key.which, 10) !== 38) &&(parseInt(key.which, 10) !== 20) && (parseInt(key.which, 10) !== 40) && (parseInt(key.which, 10) !== 37) && (parseInt(key.which, 10) !== 39) && (parseInt(key.which, 10) != 13) && (parseInt(key.which, 10) !== 16) && (parseInt(key.which, 10) !== 8) && (parseInt(key.which, 10) !== 9)){
							//LONG INTRICATE THING FOR ENGLISH OR KANA
							//ENGLISH = STORES LETTERS INTO AN ARRAY
							// KANA = STORING 3 LETTERS, IF DOESN'T MEET REQUIREMENTS, CHECKS LOWER TIER TYPE LIST, etc, STORE KANA INTO ARRAY
							//ONCE STORED IN ARRAY, ADD TO TEXTBOX
							if(key.which !== null){
								textInput.organizeInput(parseInt(key.which, 10));
							}
							key.which = null;
						}
					}
				});
				$("body").on("keydown", function(key){
					if(ifGame === true){
						if(parseInt(key.which, 10) === 38){ //UP MOVE 
							key.which = null;
							if((player.y-9)>0){
								player.y-=10;
							}
						}
						if(parseInt(key.which, 10) === 40){ //DOWN MOVE 
							key.which = null;
							if((player.y+100)<500){
								player.y+=10;
							}
						}
						if(parseInt(key.which, 10) === 37){ //LEFT MOVE 
							key.which = null;
							if((player.x-9)>0){
								player.x-=10;
							}
						}
						if(parseInt(key.which, 10) === 39){ //RIGHT MOVE 
							key.which = null;
							if((player.x+100)<800){
								player.x+=10;
							}
						}
						if(parseInt(key.which, 10) === 8){ //BACKSPACE BACKSPACE
							key.preventDefault();
							key.which = null;
							textInput.backInput();
							//TODO ERASE 
						}
						else if(parseInt(key.which, 10) === 9){	//TAB ATK NAV
							key.preventDefault();
							key.which = null;
							console.log("BATTLE NAV WORKS");
							battleBar.update();
							//TODO GO THROUGH FIELD ITEMS ARRAY
						}
						else{}
					}
				});
				break;
			case ("cutscene"):
				//NAVIGATE DIALOG U D
				//ENTER ENTER
				$("body").on("keyup", function(key){
					if(ifGame === true){
						if(isChoice === true){		//NAVIGATE BUTTONS THROUGH OPTIONS IF ABLE, CHOICE PORTIONS
							if((parseInt(key.which, 10) === 38)||(parseInt(key.which, 10) === 87)){ //DOWN S
								key.which = null;
								if(choiceBox.currentIndX > 1){
									choiceBox.currentIndX--;
								}
								else{}
							}
							if((parseInt(key.which, 10) === 40)||(parseInt(key.which, 10) === 83)){ //UP W
								key.which = null;
								if(choiceBox.currentIndX < (cutsceneChoice[cutscene.sceneNum].length - 1)){
									choiceBox.currentIndX++;
								}
								else{}
							}
							if((parseInt(key.which, 10) === 13)||(parseInt(key.which, 10) === 90)){ //ENTER Z
								key.which = null;
								choiceBox.isSelected = true;
							}
						}
						else{
							//NAVIGATE SCENES WHEN ABLE, DIALOG AND IMAGES. NON CHOICE PORTIONS
							if((parseInt(key.which, 10) === 13)||(parseInt(key.which, 10) === 90)){ //ENTER Z
								key.which = null;
								//TODO SCROLL THROUGH DIALOG
								//IF FINISHED PAGES OF SCENE SECTION, RESET PAGE GROUP TO ASSOCIATED DIALOG AND NEXT SCENE SPOT
								//ELSE GO UP PAGES
								if((cutscene.sceneProgress[cutscene.sceneNum] !== "finished") && (cutscene.sceneProgress[cutscene.sceneNum] !== "locked")){ //cutscene ended
									if(dialogueBox.pageFilled === true){
										var specialScene = cutscene.cutsceneExceptions();
										if(specialScene === false){
											if(dialogueBox.pageNum >= (dialogueBox.pages - 1)){
												dialogueBox.dialogueCompleted = true;
											}
											else{
												dialogueBox.pageDone = true;
											}
										}
										else if(specialScene === true){
											isChoice = true;
										}
										else if(specialScene === "loser"){
											whichMode = null;
											ifGame = null;
											ifMenu = true;
											whichMenu = "lose";
											cutscene.sceneNum = 0;
											cutscene.sceneSpot = 0;
											dialogueBox.dialogueCompleted = false
											dialogueBox.dialogue = 0;
											dialogueBox.dialogue = [];
											dialogueBox.text = 0;
											dialogueBox.text = [];
											dialogueBox.pageNum = 0;
											dialogueBox.rowNum = 0;
											dialogueBox.pages = 0;
											dialogueBox.rows = 0;
											dialogueBox.letterIndx = 0;
											dialogueBox.drawLetterIndx = 0;
											dialogueBox.pageFilled = false;
											dialogueBox.pageDone = false;
											dialogueBox.Row1 = [];
											dialogueBox.Row2 = [];
											dialogueBox.Row3 = [];
											dialogueBox.Row4 = [];
										}
										else{}
									}
									else{
										dialogueBox.pageFilled = true;
									}
									if(((cutscene.sceneLength[cutscene.sceneNum]) <= (cutscene.sceneSpot+1)) && (dialogueBox.dialogueCompleted === true)){
										cutscene.sceneProgress[cutscene.sceneNum] = "finished";
										whichMode = "explore";
									}
								}
							}
						}
					}
				});
				break;
			default:
				break;
		}
	}
	
//GAME OVER SCREEN	
	var gameOver = {
		update: function(){
			//TODO EXIT GAME OVER SCREEN AND START OVER
			$("body").on("keyup", function(key){
				if(parseInt(key.which, 10) === 13){
					key.which = null;
					ifGame = false;
					whichMode = null;
					ifMenu = true;
					whichMenu = "start";
					//TODO LOAD SAVED DATA INTO GAME STATS
					player.hp = player.maxHP; //TODO REMOVE THIS
					player.x = 0; //TODO REMOVE THIS
					player.y = 0; //TODO REMOVE THIS
				}
			});
		},
		draw: function(){
			//TODO REFINE LOOKS
			ct1.font = "bold 100px sans-serif";
			ct1.fillStyle = "#ffffff";
			ct1.fillText("GAME OVER",100, 300);
		}
	};
	
//HUD STUFF
	//TEXT INPUT FOR BATTLE
	var textInput = {
		ifKana: false,
		fakeTempText: [], //to hold values before converted to kana
		tempText: [], //to sort the text item
		text: [], //holds input to print
		organizeInput: function(keyCode){
			//TODO FIDDLE WITH TYPING ALG
			var tempKey = null;
			if(keyCode === 189){
				tempKey = "-";
			}
			else if(keyCode === 192){
				tempKey = "~";
			}
			else if(keyCode === 219){
				tempKey = "[";
			}
			else if(keyCode === 221){
				tempKey = "]";
			}
			else if(keyCode === 188){
				tempKey = ",";
			}
			else if(keyCode === 190){
				tempKey = ".";
			}
			else if(keyCode === 191){
				tempKey = "?";
			}
			else if(keyCode === 222){
				tempKey = "'";
			}
			else{
				tempKey = String.fromCharCode(keyCode).toLowerCase();
			}
			if(textInput.text.length < 30){
				if(textInput.ifKana === true){ //If we are switching from reading or meaning??
					switch(tempKey){
						case("a"):
							if(textInput.fakeTempText.length >= 1){ //faketemp length > 1
								if(textInput.fakeTempText.length >= 2){ //put in a consonant-y-vowel kana
									if(textInput.fakeTempText[1] === "y"){
										switch(textInput.fakeTempText[0]){
											case("k"):
												textInput.text.length-=2;
												textInput.text.push("きゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("g"):
												textInput.text.length-=2;
												textInput.text.push("ぎゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("s"):
												textInput.text.length-=2;
												textInput.text.push("しゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("j"):
												textInput.text.length-=2;
												textInput.text.push("じゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("z"):
												textInput.text.length-=2;
												textInput.text.push("じゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("t"):
												textInput.text.length-=2;
												textInput.text.push("ちゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("d"):
												textInput.text.length-=2;
												textInput.text.push("ぢゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("h"):
												textInput.text.length-=2;
												textInput.text.push("ひゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("b"):
												textInput.text.length-=2;
												textInput.text.push("びゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("p"):
												textInput.text.length-=2;
												textInput.text.push("ぴゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("m"):
												textInput.text.length-=2;
												textInput.text.push("みゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("n"):
												textInput.text.length-=2;
												textInput.text.push("にゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("r"):
												textInput.text.length-=2;
												textInput.text.push("りゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("l"):
												textInput.text.length-=2;
												textInput.text.push("りゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											default:
												break;
										}
									}
									else if(textInput.fakeTempText[1] === "j" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("ぢゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "s"){
												textInput.text.length-=2;
												textInput.text.push("しゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "c"){
												textInput.text.length-=2;
												textInput.text.push("ちゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "z"){
												textInput.text.length-=2;
												textInput.text.push("じゃ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else{ //put in a vowel kana
										//textInput.text.length--;
										textInput.text.push("あ");
										textInput.fakeTempText.length = 0;
										console.log(textInput.text.join(""));
									}
								}
								else{ //put in consonant-vowel kana or add to temp list and text list
									switch(textInput.fakeTempText[0]){
										case("k"):
											textInput.text.length--;
											textInput.text.push("か");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("g"):
											textInput.text.length--;
											textInput.text.push("が");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("s"):
											textInput.text.length--;
											textInput.text.push("さ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("j"):
											textInput.text.length--;
											textInput.text.push("じゃ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("z"):
											textInput.text.length--;
											textInput.text.push("ざ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("t"):
											textInput.text.length--;
											textInput.text.push("た");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("d"):
											textInput.text.length--;
											textInput.text.push("だ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("h"):
											textInput.text.length--;
											textInput.text.push("は");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("f"):
											textInput.text.length--;
											textInput.text.push("ふぁ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("b"):
											textInput.text.length--;
											textInput.text.push("ば");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("p"):
											textInput.text.length--;
											textInput.text.push("ぱ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("m"):
											textInput.text.length--;
											textInput.text.push("ま");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("n"):
											textInput.text.length--;
											textInput.text.push("な");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("r"):
											textInput.text.length--;
											textInput.text.push("ら");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("l"):
											textInput.text.length--;
											textInput.text.push("ら");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("w"):
											textInput.text.length--;
											textInput.text.push("わ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("y"):
											textInput.text.length--;
											textInput.text.push("や");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										default:
											//put in a vowel kana
											//textInput.text.length--;
											textInput.text.push("あ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
									}
								}
							}
							else{ //put in a vowel kana
								//textInput.text.length--;
								textInput.text.push("あ");
								textInput.fakeTempText.length = 0;
								console.log(textInput.text.join(""));
							}
							break;
						case("i"):
							if(textInput.fakeTempText.length >= 1){ //faketemp length > 1
								if(textInput.fakeTempText.length >= 2){ //put in a consonant-y-vowel kana
									if(textInput.fakeTempText[1] === "j" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("ぢ");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "z"){
												textInput.text.length-=2;
												textInput.text.push("じ");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "s"){
												textInput.text.length-=2;
												textInput.text.push("し");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "c"){
												textInput.text.length-=2;
												textInput.text.push("ち");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else{ //put in a vowel kana
										//textInput.text.length--;
										textInput.text.push("い");
										textInput.fakeTempText.length = 0;
										console.log(textInput.text.join(""));
									}
								}
								else{ //put in consonant-vowel kana or add to temp list and text list
									switch(textInput.fakeTempText[0]){
										case("k"):
											textInput.text.length--;
											textInput.text.push("き");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("g"):
											textInput.text.length--;
											textInput.text.push("ぎ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("s"):
											textInput.text.length--;
											textInput.text.push("し");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("j"):
											textInput.text.length--;
											textInput.text.push("じ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("z"):
											textInput.text.length--;
											textInput.text.push("じ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("t"):
											textInput.text.length--;
											textInput.text.push("ち");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("d"):
											textInput.text.length--;
											textInput.text.push("ぢ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("h"):
											textInput.text.length--;
											textInput.text.push("ひ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("f"):
											textInput.text.length--;
											textInput.text.push("ふぃ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("b"):
											textInput.text.length--;
											textInput.text.push("び");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("p"):
											textInput.text.length--;
											textInput.text.push("ぴ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("m"):
											textInput.text.length--;
											textInput.text.push("み");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("n"):
											textInput.text.length--;
											textInput.text.push("に");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("r"):
											textInput.text.length--;
											textInput.text.push("り");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("l"):
											textInput.text.length--;
											textInput.text.push("り");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("w"):
											textInput.text.length--;
											textInput.text.push("うぃ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										default:
											//put in a vowel kana
											//textInput.text.length--;
											textInput.text.push("い");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
									}
								}
							}
							else{ //put in a vowel kana
								//textInput.text.length--;
								textInput.text.push("い");
								textInput.fakeTempText.length = 0;
								console.log(textInput.text.join(""));
							}
							break;
						case("u"):
							if(textInput.fakeTempText.length >= 1){ //faketemp length > 1
								if(textInput.fakeTempText.length >= 2){ //put in a consonant-y-vowel kana
									if(textInput.fakeTempText[1] === "y"){
										switch(textInput.fakeTempText[0]){
											case("k"):
												textInput.text.length-=2;
												textInput.text.push("きゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("g"):
												textInput.text.length-=2;
												textInput.text.push("ぎゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("s"):
												textInput.text.length-=2;
												textInput.text.push("しゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("j"):
												textInput.text.length-=2;
												textInput.text.push("じゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("z"):
												textInput.text.length-=2;
												textInput.text.push("じゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("t"):
												textInput.text.length-=2;
												textInput.text.push("ちゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("d"):
												textInput.text.length-=2;
												textInput.text.push("ぢゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("h"):
												textInput.text.length-=2;
												textInput.text.push("ひゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("b"):
												textInput.text.length-=2;
												textInput.text.push("びゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("p"):
												textInput.text.length-=2;
												textInput.text.push("ぴゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("m"):
												textInput.text.length-=2;
												textInput.text.push("みゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("n"):
												textInput.text.length-=2;
												textInput.text.push("にゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("r"):
												textInput.text.length-=2;
												textInput.text.push("りゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("l"):
												textInput.text.length-=2;
												textInput.text.push("りゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											default:
												break;
										}
									}
									else if(textInput.fakeTempText[1] === "j" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("ぢゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "z" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("づ");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "s" && textInput.fakeTempText[0] === "t"){
												textInput.text.length-=2;
												textInput.text.push("つ");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "s" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("づ");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "z" && textInput.fakeTempText[0] === "t"){
												textInput.text.length-=2;
												textInput.text.push("つ");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "c"){
												textInput.text.length-=2;
												textInput.text.push("ぢゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "s"){
												textInput.text.length-=2;
												textInput.text.push("しゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else{ //put in a vowel kana
										//textInput.text.length--;
										textInput.text.push("う");
										textInput.fakeTempText.length = 0;
										console.log(textInput.text.join(""));
									}
								}
								else{ //put in consonant-vowel kana or add to temp list and text list
									switch(textInput.fakeTempText[0]){
										case("k"):
											textInput.text.length--;
											textInput.text.push("く");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("g"):
											textInput.text.length--;
											textInput.text.push("ぐ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("s"):
											textInput.text.length--;
											textInput.text.push("す");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("j"):
											textInput.text.length--;
											textInput.text.push("じゅ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
											break;
										case("z"):
											textInput.text.length--;
											textInput.text.push("ず");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("t"):
											textInput.text.length--;
											textInput.text.push("つ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("d"):
											textInput.text.length--;
											textInput.text.push("づ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("h"):
											textInput.text.length--;
											textInput.text.push("ふ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("f"):
											textInput.text.length--;
											textInput.text.push("ふ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("b"):
											textInput.text.length--;
											textInput.text.push("ぶ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("p"):
											textInput.text.length--;
											textInput.text.push("ぷ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("m"):
											textInput.text.length--;
											textInput.text.push("む");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("n"):
											textInput.text.length--;
											textInput.text.push("ぬ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("r"):
											textInput.text.length--;
											textInput.text.push("る");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("l"):
											textInput.text.length--;
											textInput.text.push("る");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("w"):
											textInput.text.length--;
											textInput.text.push("う");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("y"):
											textInput.text.length--;
											textInput.text.push("ゆ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										default:
											//put in a vowel kana
											//textInput.text.length--;
											textInput.text.push("う");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
									}
								}
							}
							else{ //put in a vowel kana
								//textInput.text.length--;
								textInput.text.push("う");
								textInput.fakeTempText.length = 0;
								console.log(textInput.text.join(""));
							}
							break;
						case("e"):
							if(textInput.fakeTempText.length >= 1){ //faketemp length > 1
								if(textInput.fakeTempText.length >= 2){ //put in a consonant-y-vowel kana
									if(textInput.fakeTempText[1] === "y"){
										switch(textInput.fakeTempText[0]){
											case("k"):
												textInput.text.length-=2;
												textInput.text.push("きぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("g"):
												textInput.text.length-=2;
												textInput.text.push("ぎぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("s"):
												textInput.text.length-=2;
												textInput.text.push("しぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("j"):
												textInput.text.length-=2;
												textInput.text.push("じぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("z"):
												textInput.text.length-=2;
												textInput.text.push("じぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("t"):
												textInput.text.length-=2;
												textInput.text.push("ちぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("d"):
												textInput.text.length-=2;
												textInput.text.push("ぢぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("h"):
												textInput.text.length-=2;
												textInput.text.push("ひぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("b"):
												textInput.text.length-=2;
												textInput.text.push("びぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("p"):
												textInput.text.length-=2;
												textInput.text.push("ぴぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("m"):
												textInput.text.length-=2;
												textInput.text.push("みぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("n"):
												textInput.text.length-=2;
												textInput.text.push("にぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("r"):
												textInput.text.length-=2;
												textInput.text.push("りぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("l"):
												textInput.text.length-=2;
												textInput.text.push("りぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											default:
												break;
										}
									}
									else if(textInput.fakeTempText[1] === "j" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("ぢぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "s"){
												textInput.text.length-=2;
												textInput.text.push("しぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "c"){
												textInput.text.length-=2;
												textInput.text.push("ちぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "z"){
												textInput.text.length-=2;
												textInput.text.push("じぇ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else{ //put in a vowel kana
										//textInput.text.length--;
										textInput.text.push("え");
										textInput.fakeTempText.length = 0;
										console.log(textInput.text.join(""));
									}
								}
								else{ //put in consonant-vowel kana or add to temp list and text list
									switch(textInput.fakeTempText[0]){
										case("k"):
											textInput.text.length--;
											textInput.text.push("け");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("g"):
											textInput.text.length--;
											textInput.text.push("げ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("s"):
											textInput.text.length--;
											textInput.text.push("せ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("j"):
											textInput.text.length--;
											textInput.text.push("じぇ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("z"):
											textInput.text.length--;
											textInput.text.push("ぜ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("t"):
											textInput.text.length--;
											textInput.text.push("て");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("d"):
											textInput.text.length--;
											textInput.text.push("で");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("h"):
											textInput.text.length--;
											textInput.text.push("へ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("f"):
											textInput.text.length--;
											textInput.text.push("ふぇ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("b"):
											textInput.text.length--;
											textInput.text.push("べ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("p"):
											textInput.text.length--;
											textInput.text.push("ぺ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("m"):
											textInput.text.length--;
											textInput.text.push("め");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("n"):
											textInput.text.length--;
											textInput.text.push("ね");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("r"):
											textInput.text.length--;
											textInput.text.push("れ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("l"):
											textInput.text.length--;
											textInput.text.push("れ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("w"):
											textInput.text.length--;
											textInput.text.push("うぇ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("y"):
											textInput.text.length--;
											textInput.text.push("いぇ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										default:
											//put in a vowel kana
											//textInput.text.length--;
											textInput.text.push("え");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
									}
								}
							}
							else{ //put in a vowel kana
								//textInput.text.length--;
								textInput.text.push("え");
								textInput.fakeTempText.length = 0;
								console.log(textInput.text.join(""));
							}
							break;
						case("o"):
							if(textInput.fakeTempText.length >= 1){ //faketemp length > 1
								if(textInput.fakeTempText.length >= 2){ //put in a consonant-y-vowel kana
									if(textInput.fakeTempText[1] === "y"){
										switch(textInput.fakeTempText[0]){
											case("k"):
												textInput.text.length-=2;
												textInput.text.push("きょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("g"):
												textInput.text.length-=2;
												textInput.text.push("ぎょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("s"):
												textInput.text.length-=2;
												textInput.text.push("しょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("j"):
												textInput.text.length-=2;
												textInput.text.push("じょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("z"):
												textInput.text.length-=2;
												textInput.text.push("じょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("t"):
												textInput.text.length-=2;
												textInput.text.push("ちょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("d"):
												textInput.text.length-=2;
												textInput.text.push("ぢょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("h"):
												textInput.text.length-=2;
												textInput.text.push("ひょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("b"):
												textInput.text.length-=2;
												textInput.text.push("びょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("p"):
												textInput.text.length-=2;
												textInput.text.push("ぴょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("m"):
												textInput.text.length-=2;
												textInput.text.push("みょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("n"):
												textInput.text.length-=2;
												textInput.text.push("にょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("r"):
												textInput.text.length-=2;
												textInput.text.push("りょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											case("l"):
												textInput.text.length-=2;
												textInput.text.push("りょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
												break;
											default:
												break;
										}
									}
									else if(textInput.fakeTempText[1] === "j" && textInput.fakeTempText[0] === "d"){
												textInput.text.length-=2;
												textInput.text.push("ぢょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "s"){
												textInput.text.length-=2;
												textInput.text.push("しょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "c"){
												textInput.text.length-=2;
												textInput.text.push("ちょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else if(textInput.fakeTempText[1] === "h" && textInput.fakeTempText[0] === "z"){
												textInput.text.length-=2;
												textInput.text.push("じょ");
												textInput.text.push("");
												textInput.fakeTempText.length = 0;
												console.log(textInput.text.join(""));
									}
									else{ //put in a vowel kana
										//textInput.text.length--;
										textInput.text.push("お");
										textInput.fakeTempText.length = 0;
										console.log(textInput.text.join(""));
									}
								}
								else{ //put in consonant-vowel kana or add to temp list and text list
									switch(textInput.fakeTempText[0]){
										case("k"):
											textInput.text.length--;
											textInput.text.push("こ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("g"):
											textInput.text.length--;
											textInput.text.push("ご");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("s"):
											textInput.text.length--;
											textInput.text.push("そ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("j"):
											textInput.text.length--;
											textInput.text.push("じょ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("z"):
											textInput.text.length--;
											textInput.text.push("ぞ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("t"):
											textInput.text.length--;
											textInput.text.push("と");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("d"):
											textInput.text.length--;
											textInput.text.push("ど");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("h"):
											textInput.text.length--;
											textInput.text.push("ほ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("f"):
											textInput.text.length--;
											textInput.text.push("ふぉ");
											textInput.text.push("");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("b"):
											textInput.text.length--;
											textInput.text.push("ぼ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("p"):
											textInput.text.length--;
											textInput.text.push("ぽ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("m"):
											textInput.text.length--;
											textInput.text.push("も");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("n"):
											textInput.text.length--;
											textInput.text.push("の");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("r"):
											textInput.text.length--;
											textInput.text.push("ろ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("l"):
											textInput.text.length--;
											textInput.text.push("ろ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("w"):
											textInput.text.length--;
											textInput.text.push("を");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										case("y"):
											textInput.text.length--;
											textInput.text.push("よ");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
										default:
											//put in a vowel kana
											//textInput.text.length--;
											textInput.text.push("お");
											textInput.fakeTempText.length = 0;
											console.log(textInput.text.join(""));
											break;
									}
								}
							}
							else{ //put in a vowel kana
								//textInput.text.length--;
								textInput.text.push("お");
								textInput.fakeTempText.length = 0;
								console.log(textInput.text.join(""));
							}
							break;
						case("n"):
							if((textInput.fakeTempText.length > 0) && (textInput.fakeTempText[textInput.fakeTempText.length-1] === "n")){
								textInput.text.length--;
								textInput.text.push("ん");
								textInput.fakeTempText.length = 0;
								console.log(textInput.text.join(""));
							}
							else{
								textInput.text.push(tempKey);
								textInput.fakeTempText.push(tempKey);
								console.log(textInput.text.join(""));
							}
							break;
						case("-"):
							textInput.text.push("ー");
							console.log(textInput.text.join(""));
							break;
						case("~"):
							textInput.text.push("～");
							console.log(textInput.text.join(""));
							break;
						case("["):
							textInput.text.push("「");
							console.log(textInput.text.join(""));
							break;
						case("]"):
							textInput.text.push("」");
							console.log(textInput.text.join(""));
							break;
						case(","):
							textInput.text.push("、");
							console.log(textInput.text.join(""));
							break;
						case("."):
							textInput.text.push("。");
							console.log(textInput.text.join(""));
							break;
						default:
							//if previous faketemp index is not a vowel, and faketemp index is > 0
							var isGlot = false;
							var isCons = false;
							var consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"]
							for(var i = 0; i < consonants.length; i++){
								if(tempKey === consonants[i]){
									isCons = true;
									if((textInput.fakeTempText.length === 1)&& (tempKey === textInput.fakeTempText[(textInput.fakeTempText.length-1)])){
										isGlot = true;
									}
								}
								else{}
							}
							if(isGlot === true){
								textInput.text.length--;
								textInput.text.push("っ");
								textInput.fakeTempText.length = 0;
								textInput.fakeTempText.push(tempKey);
								textInput.text.push(tempKey);
								console.log(textInput.text.join(""));
							}
							else if(isCons === true){
									if(tempKey === "y" && (textInput.fakeTempText.length === 1)){
										textInput.text.push(tempKey);
										textInput.fakeTempText.push(tempKey);
										console.log(textInput.text.join(""));
									}
									else if((tempKey === "h") && (textInput.fakeTempText.length === 1) && ((textInput.fakeTempText[textInput.fakeTempText.length-1] === "s")||(textInput.fakeTempText[textInput.fakeTempText.length-1] === "c"))){
										textInput.text.push(tempKey);
										textInput.fakeTempText.push(tempKey);
										console.log(textInput.text.join(""));
									}
									else if((tempKey === "j") && (textInput.fakeTempText.length === 1) && (textInput.fakeTempText[textInput.fakeTempText.length-1] === "d")){
										textInput.text.push(tempKey);
										textInput.fakeTempText.push(tempKey);
										console.log(textInput.text.join(""));
									}
									else if(((tempKey === "z")||(tempKey === "s")) && (textInput.fakeTempText.length === 1) && ((textInput.fakeTempText[textInput.fakeTempText.length-1] === "t")||(textInput.fakeTempText[textInput.fakeTempText.length-1] === "d"))){
										textInput.text.push(tempKey);
										textInput.fakeTempText.push(tempKey);
										console.log(textInput.text.join(""));
									}
									else{
										textInput.text.push(tempKey);
										textInput.fakeTempText.length = 0;
										textInput.fakeTempText.push(tempKey);
										console.log(textInput.text.join(""));
									}
							}
							else{
								textInput.text.push(tempKey);
								textInput.fakeTempText.length = 0;
								textInput.fakeTempText.push(tempKey);
								console.log(textInput.text.join(""));
							}
							break;
					}
				}
				else{
					textInput.fakeTempText.length = 0;
					var tempKey = null;
					if(keyCode === 189){
						tempKey = "-";
					}
					else if(keyCode === 192){
						tempKey = "~";
					}
					else if(keyCode === 222){
						tempKey = "'";
					}
					else if(keyCode === 191){
						tempKey = "?";
					}
					else if(keyCode === 188){
						tempKey = ",";
					}
					else if(keyCode === 190){
						tempKey = ".";
					}
					else{
						tempKey = String.fromCharCode(keyCode).toLowerCase();
					}
					textInput.text.push(tempKey);
					console.log(textInput.text.join(""));
				}
			}
		},
		backInput: function(){
			//TODO NULLIFY AN ARRAY INDEX
			if(textInput.text.length > 0){
				textInput.text.length--;
				if(textInput.fakeTempText.length > 0){
					textInput.fakeTempText.length--;
				}
				console.log(textInput.text.join(""));
			}
		},
		drawText: function(){
			//TODO DRAW TO INPUT AREA
			var tempRow1 = [];
			var tempRow2 = [];
			var r1X = 405;
			var r2X = 405;
			var numLatins1 = 0;
			var numKanas1 = 0
			var numLatins2 = 0;
			var numKanas2 = 0
			for(var i = 0; i < textInput.text.length; i++){
				var alphas = ["1","2","3","4","5","6","7","8","9","0"," ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
				var kana = ["ん","か","き","く","け","こ","が","ぎ","ぐ","げ","ご","さ","し","す","せ","そ","ざ","じ","ず","ぜ","ぞ","た","ち","つ","て","と","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ","な","に","ぬ","ね","の","ま","み","む","め","も","ら","り","る","れ","ろ","わ","を","きゃ","きゅ","きょ","ぎゃ","ぎゅ","ぎょ","しゃ","しゅ","しょ","じゃ","じゅ","じょ","ちゃ","ちゅ","ちょ","ぢゃ","ぢゅ","ぢょ","ひゃ","ひゅ","ひょ","びゃ","びゅ","びょ","ぴゃ","ぴゅ","ぴょ","りゃ","りゅ","りょ","みゃ","みゅ","みょ","にゃ","にゅ","にょ","は","ひ","ふ","ふ","へ","ほ","や","ゆ","よ","じゃ","じゅ","じょ","あ","い","う","え","お","っ"];
				for(var j = 0; j < alphas.length; j++){
					if(i < 15){
						if(textInput.text[i] === alphas[j]){
							numLatins1++;
						}
					}
					if((i < 30) && (i >= 15)){
						if(textInput.text[i] === alphas[j]){
							numLatins2++;
						}
					}
				}
				for(var k = 0; k < kana.length; k++){
					if(i < 15){
						if(textInput.text[i] === kana[k]){
							numKanas1++;
						}
					}
					if((i < 30) && (i >= 15)){
						if(textInput.text[i] === kana[k]){
							numKanas2++;
						}
					}
				}
				if(i < 15){
					tempRow1.push(textInput.text[i]);
					if(r1X >= 265){
						r1X = (405 - ((5 * numLatins1)+(13 * numKanas1)));
					}
					else{
						r1X = 240;
					}
				}
				if((i < 30) && (i >= 15)){
					tempRow2.push(textInput.text[i]);
					if(r2X >= 265){
						r2X = (405 - ((5 * numLatins2)+(13 * numKanas2)));
					}
					else{
						r2X = 240;
					}
				}
			}
			//draw textbox to ctx3
			ct3.beginPath();
			ct3.moveTo(236,552); //330 BY 80
			ct3.lineTo(236,552);
			ct3.arcTo(236,512,401,512,20); //TL	236/512 
			ct3.lineTo(401,512);
			ct3.arcTo(566,512,566,552,20); //TR	566/512
			ct3.lineTo(566,552);
			ct3.arcTo(566,592,401,592,20); //BR	566/592
			ct3.lineTo(401,592);
			ct3.arcTo(236,592,236,552,20); //BL	236/592
			ct3.lineTo(236,552);
			ct3.fillStyle = "#ffffff";
			ct3.fill();
			ct3.lineWidth = 3;
			ct3.strokeStyle = "#aaaaaa";
			ct3.stroke();
			//TYPE TEXT up to # chars, draw over input box & | to ctx3
			ct3.fillStyle = "#000000";
			ct3.font = "bold 1.25em sans-serif";
			if(textInput.text.length >= 30){
				ct3.fillText(tempRow1.join(""), r1X,545);
				ct3.fillText(tempRow2.join("") + "...", r2X,575);
			}
			else{
				ct3.fillText(tempRow1.join(""), r1X,545);
				ct3.fillText(tempRow2.join(""), r2X,575);
			}
		}
	}
	//DIALOG BOX
	var dialogueBox = {
		dialogue: [],	//filled with dialogue from other areas and siphoned from for letters
		text: [],	//to fill with letters
		//TODO UPDATE, DRAW => ICON, TEXT, Y OR N?
		letterIndx: 0,
		drawLetterIndx: 0,
		Row1: [],
		Row2: [],
		Row3: [],
		Row4: [],
		buttonBlinkOn: false,
		timePerLetter: 0,
		lettersPerRow: 51,
		rowsPerBox: 4,
		rows: 0,
		rowNum: 0,
		pages: 0,
		pageNum : 0,
		pageFilled: false,
		pageDone: false,
		dialogueCompleted: false, //has all the dialogue in this place been completed?
		dialogueStarted: false, //if it is type to type in dialogue
		detectPages : function(dialogical){
			dialogueBox.dialogue = dialogical;
			for(var i = 0; i < dialogueBox.dialogue.length; i++){
				if((i+1)===dialogueBox.dialogue.length){
					dialogueBox.rows = Math.ceil((i+1)/dialogueBox.lettersPerRow);
					dialogueBox.pages = Math.ceil(((i+1)/dialogueBox.lettersPerRow)/dialogueBox.rowsPerBox);
				}
			}
			dialogueBox.convertDialogue();
		},
		convertDialogue: function(){
			if(dialogueBox.pageNum < dialogueBox.pages){	//if text length
				for(var j = 0; j < 204; j++){
					if((dialogueBox.dialogue.length > dialogueBox.letterIndx) && (dialogueBox.letterIndx < (204 + (204*dialogueBox.pageNum)))){
						dialogueBox.text.push(dialogueBox.dialogue[dialogueBox.letterIndx]);
						dialogueBox.letterIndx++;
					}
					else{}
				}
			}
			else{}
			//TODO TEST IF DIALOG COMES ON AT CERTAIN TIME
		},
		update : function(){
			if((ifGame === true) && ((whichMode === "cutscene") || (isDialog === true))){
				if(dialogueBox.dialogueCompleted === true){
					dialogueBox.dialogueCompleted = false
					dialogueBox.dialogue = 0;
					dialogueBox.dialogue = [];
					dialogueBox.text = 0;
					dialogueBox.text = [];
					dialogueBox.pageNum = 0;
					dialogueBox.rowNum = 0;
					dialogueBox.pages = 0;
					dialogueBox.rows = 0;
					dialogueBox.letterIndx = 0;
					dialogueBox.drawLetterIndx = 0;
					dialogueBox.pageFilled = false;
					dialogueBox.Row1 = [];
					dialogueBox.Row2 = [];
					dialogueBox.Row3 = [];
					dialogueBox.Row4 = [];	
					if((ifGame === true) && (whichMode === "cutscene")){
						cutscene.sceneSpot++;
						dialogueBox.detectPages(cutsceneDialog[cutscene.sceneNum][cutscene.sceneSpot]);
					}
				}
				else{
					if((ifGame === true) && (whichMode === "cutscene")){
						dialogueBox.detectPages(cutsceneDialog[cutscene.sceneNum][cutscene.sceneSpot]);
					}			
				}
				if(dialogueBox.pageDone === true){
					dialogueBox.pageDone = false;
					dialogueBox.pageNum++;
					dialogueBox.text = 0;
					dialogueBox.text = [];
					dialogueBox.drawLetterIndx = 0;
					dialogueBox.pageFilled = false;
					dialogueBox.Row1 = [];
					dialogueBox.Row2 = [];
					dialogueBox.Row3 = [];
					dialogueBox.Row4 = [];	
					dialogueBox.convertDialogue();
				}
				else{
					//dialogueBox.detectPages(cutsceneDialog[cutscene.sceneNum][cutscene.sceneSpot]); //JUST ONE IS NECESSARY
				}
				if(dialogueBox.pageFilled === true){
					dialogueBox.Row1 = [];
					dialogueBox.Row2 = [];
					dialogueBox.Row3 = [];
					dialogueBox.Row4 = [];		
					if(dialogueBox.rowNum < dialogueBox.rows){
						for(var j = 0; j < 51 ;j++){
							dialogueBox.Row1.push(dialogueBox.text[(j)])
							dialogueBox.Row2.push(dialogueBox.text[(j+51)])
							dialogueBox.Row3.push(dialogueBox.text[(j+102)])
							dialogueBox.Row4.push(dialogueBox.text[(j+153)])
						}
					}
					else{
						buttonBlinkOn = false;
					}
				}
				else{
					if((dialogueBox.drawLetterIndx >= 0)&&(dialogueBox.drawLetterIndx < 51)){ //fill row 1
						dialogueBox.Row1.push(dialogueBox.text[(dialogueBox.drawLetterIndx)]);
					}
					else if((dialogueBox.drawLetterIndx >= 51)&&(dialogueBox.drawLetterIndx < 102)){ //fill row 2
						dialogueBox.Row2.push(dialogueBox.text[(dialogueBox.drawLetterIndx)]);
					}
					else if((dialogueBox.drawLetterIndx >= 102)&&(dialogueBox.drawLetterIndx < 153)){ //fill row 3
						dialogueBox.Row3.push(dialogueBox.text[(dialogueBox.drawLetterIndx)]);
					}
					else if((dialogueBox.drawLetterIndx >= 153)&&(dialogueBox.drawLetterIndx < 204)){ //fill row 4
						dialogueBox.Row4.push(dialogueBox.text[(dialogueBox.drawLetterIndx)]);
					}
					else{} //fill nothing, just incase
					dialogueBox.drawLetterIndx++;
				}
			}
		},
		draw : function(){
			//The Box
			ct3.fillStyle = "#555555";
			ct3.strokeStyle = "#aaaaaa";
			ct3.lineWidth = 3;
			ct3.fillRect(0,420,800,180);
			ct3.strokeRect(0,420,800,180);
			//TODO DRAW DIALOG ON AT CERTAIN TIMING MECHANISM
			if((ifGame === true) && ((whichMode === "cutscene") || (isDialog === true))){
				if((dialogueBox.drawLetterIndx <= dialogueBox.text.length) && (dialogueBox.pageFilled !== true)){	//When the drawn letter index is below size of text in page
					dialogueBox.pageFilled = false;
				}
				else{ //When drawn letter index is at max size of text in page
					dialogueBox.pageFilled = true;
					if(dialogueBox.buttonBlinkOn === true){
						ct3.fillStyle = "#000000";
						ct3.strokeStyle = "#ffffff";
						ct3.fillRect(775,575,10,10);
						ct3.strokeRect(775,575,10,10);
						dialogueBox.buttonBlinkOn = false;
					}
					else{
						dialogueBox.buttonBlinkOn = true;
					}
				}
				//draw the text
				ct3.font = "24px sans-serif";
				ct3.fillStyle = "#ffffff";
				ct3.fillText(dialogueBox.Row1.join(""), 25, 450);
				ct3.fillText(dialogueBox.Row2.join(""), 25, 480);
				ct3.fillText(dialogueBox.Row3.join(""), 25, 510);
				ct3.fillText(dialogueBox.Row4.join(""), 25, 540);
			}
		},
		processText : function(dialog){
			
		},
		ask : function(dialog){
			
		}
	}
	//BATTLE ITEMS BAR
	var battleBar = {
		//TODO UPDATE, DRAW => SELECTED, UNSELECTED, TIMER BARS, EMPTY, ETC, 
		fieldItems : [null, null, null, null, null],
		whichItem : 0,
		update : function(){
			if((ifGame === true)&&(whichMode === "battle")){
				if(battleBar.whichItem < 4){
					battleBar.whichItem++;
				}
				else{
					battleBar.whichItem = 0;
				}
				console.log(battleBar.whichItem + " Field Item");
			}
			else{}
		},
		draw : function(){ //TODO DRAW CORRECT ITEM IN PLACE
			if((ifGame === true)&&(whichMode === "battle")){
				ct3.fillStyle = "#000000";
				ct3.strokeStyle = "#aaaaaa";
				ct3.lineWidth = 3;
				ct3.fillRect(3,503,229,95);
				ct3.strokeRect(3,503,229,95);
				if(battleBar.whichItem === 0){ //Item Selected SLOT1
					ct3.fillStyle = "#ff0000";
					ct3.fillRect(5,505,45,45);
				}
				else{ //Item Normal SLOT1
					ct3.fillStyle = "#ff8800";
					ct3.fillRect(5,505,45,45);
				}
				if(battleBar.whichItem === 1){ //Item Selected SLOT2
					ct3.fillStyle = "#ff0000";
					ct3.fillRect(50,550,45,45);
				}
				else{ //Item Normal SLOT2
					ct3.fillStyle = "#ff8800";
					ct3.fillRect(50,550,45,45);
				}
				if(battleBar.whichItem === 2){ //Item Selected SLOT3
					ct3.fillStyle = "#ff0000";
					ct3.fillRect(95,505,45,45);
				}
				else{ //Item Normal SLOT3
					ct3.fillStyle = "#ff8800";
					ct3.fillRect(95,505,45,45);
				}
				if(battleBar.whichItem === 3){ //Item Selected SLOT4
					ct3.fillStyle = "#ff0000";
					ct3.fillRect(140,550,45,45);
				}
				else{ //Item Normal SLOT4
					ct3.fillStyle = "#ff8800";
					ct3.fillRect(140,550,45,45);
				}
				if(battleBar.whichItem === 4){ //Item Selected SLOT5
					ct3.fillStyle = "#ff0000";
					ct3.fillRect(185,505,45,45);
				}
				else{ //Item Normal SLOT5
					ct3.fillStyle = "#ff8800";
					ct3.fillRect(185,505,45,45);
				}
			}
			else{}
		},
		fillItems : function(){ //TODO FILL ARRAY WITH ITEMS
			
		}
	}
	//BATTLE KEY, FOR WHEN YOU FORGET WHAT KEYS DO WHAT DURING YOUR BATTLES
	function drawBattleKey(){
			ct3.fillStyle = "#ffffff";
			ct3.strokeStyle = "#aaaaaa";
			ct3.lineWidth = 3;
			ct3.fillRect(570,505,225,95);
			ct3.strokeRect(570,505,225,95);
			ct3.fillStyle = "#000000";
			ct3.font = "bold 12px sans-serif";
			ct3.fillText("MOVE:",626,525);
			ct3.fillText("IME TOGGLE:",591,545);
			ct3.fillText("SCROLL ITEMS:",575,565);
			ct3.fillText("PAUSE:",621,585);
			ct3.font = "12px sans-serif";
			ct3.fillText("Up, Down, Left, Right",675,525);
			ct3.fillText("Caps Lock",675,545);
			ct3.fillText("Tab",675,565);
			ct3.fillText("Shift",675,585);
	}
	
	
	//SCREEN CHANGE FUNCTION
	function screenSwitch(){ //TODO MAKE IT FANCIER LATER
		canvas1.width = canvas1.width;
		canvas2.width = canvas2.width;
		canvas3.width = canvas3.width;
		canvas4.width = canvas4.width;
	}

	
	
	//NOT READY FOR THIS LVL YET FUNCTION
	//MUTE SOUNDS FUNCTION

//PAGE START STUFF
	//API SCREEN
	function apiScreenTime(){
		//LOAD INPUT AREA, EXPLANATION, ETC.
		$("#gameBoard").hide();
		$("#apiScreen").show();
		$("#apiTextbox").focus();
		//IF PRESS ENTER, DO THINGS
		$("#apiTextbox").keypress(function(key){
			if(parseInt(key.which, 10) === 13){
				key.preventDefault();
				$("#apiTextbox").animate({}).animate({});
				yourAPIKey = $("#apiTextbox").val();
				if(yourAPIKey === ""){
					$("#apiTextbox").attr("placeholder","Forgot to Enter API key");
					$("#apiTextbox").focus();
				}
				else{
					$("#apiTextbox").blur().val("").attr("placeholder","ONE MOMENT, PLEASE~");
					//collectAPIData(yourAPIKey); //TODO Put in when testing with net
					gameBoardTime(); //TODO Take out when testing without net
				}
			}
		});
	}
	//LOADING SCREEN, call API then go to game screen
	function loadScreenTime(){
		
	}
	function collectAPIData(yourAPIKey){
		//GET WK API WITH KEY OR SAY NO KEY ENTERED, CALL COOKIES.
		var apiUrl = "http://www.wanikani.com/api/user/" + yourAPIKey + "/vocabulary/";
		$.ajax({
			async: true,
			dataType: "jsonp",
			url: apiUrl,
			success: function(data){
				//CHECK FOR FAKE KEY,
				if(data.hasOwnProperty("error")){
					alert("That API Key is invalid. Try a your other one.");
					$("#apiText").val("").focus();
				}
				//MORE AJAX CALLS and STORE VOCABS
				else{
					playerName = data.user_information.username;
					playerLvl = data.user_information.level;
					var vocabList = new Array();
					for(var i = 0; i<data.requested_information.general.length; i++){
						if(data.requested_information.general[i].stats == null || (data.requested_information.general[i].level > 10)){
						}
						else{
							var subLvlStreak = (data.requested_information.general[i].stats.meaning_current_streak + data.requested_information.general[i].stats.reading_current_streak);
							var subLvlBad = (data.requested_information.general[i].stats.meaning_incorrect + data.requested_information.general[i].stats.reading_incorrect);
							var subLevelItem = null;
							if(subLvlStreak > 0){
								subLevelItem =  Math.round((subLvlBad / subLvlStreak)*10);
							}
							else if((subLvlStreak === 0) && (subLvlBad > subLvlStreak)){
								subLevelItem = "boss";
							}
							else{
								subLevelItem = "new";
							}
							var currentVocabItem = {
								name : data.requested_information.general[i].character,
								reading : data.requested_information.general[i].kana,
								meaning : data.requested_information.general[i].meaning,
								level : data.requested_information.general[i].level,
								subLevel : subLevelItem,
								srs : data.requested_information.general[i].stats.srs,
								burned : data.requested_information.general[i].stats.burned,
							}
							vocabList.push(currentVocabItem);
						}
					}
					function sortVocabLevels(){
						var testlvl1Vocab = new Array();
						var testlvl2Vocab = new Array();
						var testlvl3Vocab = new Array();
						var testlvl4Vocab = new Array();
						var testlvl5Vocab = new Array();
						var testlvl6Vocab = new Array();
						var testlvl7Vocab = new Array();
						var testlvl8Vocab = new Array();
						var testlvl9Vocab = new Array();
						var testlvl10Vocab = new Array();
						for(var i = 0; i < vocabList.length; i++){
							switch (vocabList[i].level){
								case 1:
									testlvl1Vocab.push(vocabList[i]);
									break;
								case 2:
									testlvl2Vocab.push(vocabList[i]);
									break;
								case 3:
									testlvl3Vocab.push(vocabList[i]);
									break;
								case 4:
									testlvl4Vocab.push(vocabList[i]);
									break;
								case 5:
									testlvl5Vocab.push(vocabList[i]);
									break;
								case 6:
									testlvl6Vocab.push(vocabList[i]);
									break;
								case 7:
									testlvl7Vocab.push(vocabList[i]);
									break;
								case 8:
									testlvl8Vocab.push(vocabList[i]);
									break;
								case 9:
									testlvl9Vocab.push(vocabList[i]);
									break;
								case 10:
									testlvl10Vocab.push(vocabList[i]);
									break;
							}
						}
						function sortVocabSubLevels(tempVocabList){
							for(var x = 0; x < tempVocabList.length; x++){
								for(var y = x+1; y < tempVocabList.length; y++){
									if(tempVocabList[x].subLevel > tempVocabList[y].subLevel){
										var tempVal = tempVocabList[y];
										tempVocabList[y] = tempVocabList[x];
										tempVocabList[x] = tempVal;
									}
									else{
										tempVocabList[y] = tempVocabList[y];
										tempVocabList[x] = tempVocabList[x];
									}
								}
							}
							return tempVocabList;
						}
						lvl1Vocab = sortVocabSubLevels(testlvl1Vocab);
						lvl2Vocab = sortVocabSubLevels(testlvl2Vocab);
						lvl3Vocab = sortVocabSubLevels(testlvl3Vocab);
						lvl4Vocab = sortVocabSubLevels(testlvl4Vocab);
						lvl5Vocab = sortVocabSubLevels(testlvl5Vocab);
						lvl6Vocab = sortVocabSubLevels(testlvl6Vocab);
						lvl7Vocab = sortVocabSubLevels(testlvl7Vocab);
						lvl8Vocab = sortVocabSubLevels(testlvl8Vocab);
						lvl9Vocab = sortVocabSubLevels(testlvl9Vocab);
						lvl10Vocab = sortVocabSubLevels(lvl10Vocab);
					}
					sortVocabLevels();
					alert("Enjoy the game, and good luck!");
					$("#apiTextbox").blur();
					gameBoardTime();
				}
			},
			error:  function(data){
				//GIVE ERROR
				alert("Wanikani has a bad case of dead. Try again later.");
				$("#apiText").val("").focus();
			},
		});
	}
	//LOAD THE GAME'S BOARD, the playscreen
	function gameBoardTime(){
		//LOAD GAMEBOARD, ETC, WOO
		$("#apiScreen").hide();
		$("#gameBoard1").show().queue(function(next){
			$("#gameBoard2").show().queue(function(next){
				$("#gameBoard3").show().queue(function(next){
					$("#gameBoard4").show().queue(function(next){
						next();
					});
					next();
				});
				next();
			});
			next();
		});
		//PICK WHICH SCREEN TO DRAW, ETC.
		then = Date.now();
		setInterval(mainGameLoop, 100); //TODO ALTER THIS A BIT, FOR KICKS
	}




	//START GAME FUNCTION
	//LOAD GAME FUNCTION
	//SAVE GAME FUNCTION
//HANDLING COOKIES		TODO: WRITE IT ALL UP
	function checkCookie(){
		//API COOKIE
		//SAVE FILE COOKIE
	}
	function setCookie(){
		//API COOKIE
		//SAVE FILE COOKIE
		//REWRITE SAVE FILE COOKIE
	}
	function getCookie(){
		//API COOKIE
		//SAVE FILE COOKIE
	}




//THE GAME LOOPS, INITIALIZE, LOAD, UPDATE, DRAW.
	function mainGameLoop(){
		var now = Date.now();
		var timeRange = now - then;
		updateGame(timeRange / 1000);
		drawGame();
		then = now;
	}
	function initializeGame(){
		
	}
	function loadGame(){
		//TODO LOAD ALL IMAGES
		scene1Img.src = "imgs/cuts/cutscene1.jpg"; //SCENES START HERE
		scene2Img.src = "imgs/cuts/cutscene2.jpg";
		scene3Img.src = "imgs/cuts/cutscene3.jpg";
		backdrop1Img.src = "imgs/bgs/testbounds1.jpg"; //backgrounds start here
		tilePropsImg1.src = "imgs/bgs/props/tileslist1a.png"; //background items start here
		tilePropsImg2.src = "imgs/bgs/props/tileslist1b.png"; //background items start here
		
	}
	function updateGame(timeModifier){ //TODO REALLY SPRUCE, NOT JUST TEST
		if(ifMenu === true){
			//TODO USING MENU SCREEN
			switch(whichMenu){
				case("start"):
					startMenu.update();
					break;
				case("settings"):
					settingsMenu.update();
					break;
				case("pause"):
					pauseMenu.update();
					break;
				case("map"):
					mapMenu.update();
					break;
				case("beasts"):
					beastiary.update();
					break;
				case("quests"):
					questLog.update();
					break;
				case("transition"):
					break;
				case("lose"):
					gameOver.update();
					break;
				default: //null, when playing game
					break;
			}
		}
		else if(ifGame === true){
			//TODO UPDATE THE GAME IS PLAYING
			switch(whichMode){
				case("explore"):
					userInput("explore");
					//TODO CURRENT MAP DRAW
					dialogueBox.update();
					break;
				case("battle"):
					userInput("battle");
					player.update();
					//TODO CURRENT BATTLE DRAW
					break;
				case("cutscene"):
					userInput("cutscene");
					dialogueBox.update();
					cutscene.update();
					if(isChoice === true){
						choiceBox.update();
					}
					//TODO CURRENT CUTSCENE DRAW
					break;
				default: //null, when playing game
					break;
			}
		}
		else{}
	}
	function drawGame(){ //TODO REALLY SPRUCE, NOT JUST TEST
		if(ifMenu === true){
			//TODO USING MENU SCREEN
					canvas1.width = canvas1.width;
					canvas1b.width = canvas1b.width;
					canvas2.width = canvas1.width;
					canvas3.width = canvas1.width;
					canvas4.width = canvas1.width;
			switch(whichMenu){
				case("start"):
					startMenu.draw();
					break;
				case("settings"):
					settingsMenu.draw();
					break;
				case("pause"):
					pauseMenu.draw();
					break;
				case("map"):
					mapMenu.draw();
					break;
				case("beasts"):
					beastiary.draw();
					break;
				case("quests"):
					questLog.draw();
					break;
				/*case("transition"):
					canvas1.width = canvas1.width;
					canvas2.width = canvas1.width;
					canvas3.width = canvas1.width;
					canvas4.width = canvas1.width;
					break;*/
				case("lose"): //TODO REFINE GAME OVER SCREEN
					gameOver.draw();
					break;
				default: //null, when playing game
					break;
			}
		}
		else if(ifGame === true){
			//TODO DRAW THE GAME IS PLAYING;
					canvas1.width = canvas1.width;
					canvas1b.width = canvas1b.width;
					canvas2.width = canvas1.width;
					canvas3.width = canvas1.width;
					canvas4.width = canvas1.width;
			switch(whichMode){
				case("explore"):
					//TODO CURRENT MAP DRAW
					//EXPLORE MAP
					//EXPLORE CHARACTERS
					//EXPLORE HUD
					map1.draw(); //TEST
					player.draw();
					dialogueBox.draw();
					break;
				case("battle"):
					//TODO CURRENT BATTLE DRAW
					//BATTLE MAP
					//BATTLE CHARACTERS
					//BATTLE HUD
					textInput.drawText();
					drawBattleKey();
					battleBar.draw();
					player.draw();
					break;
				case("cutscene"):
					//TODO CURRENT CUTSCENE DRAW
					//CUTSC 'PAGE'
					//CUTSC HUD
					cutscene.draw();
					dialogueBox.draw();
					if(isChoice === true){
						choiceBox.draw();
					}
					break;
				default: //null, when playing game
					break;
			}
		}
		else{}
	}




	//IF THERE ARE NO API COOKIES, go to API screen, else LOAD
	loadGame();
	apiScreenTime();
});