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
		action: 0,
		frame: [], //which states character has, in relation to animation frames
		tempImage: new Image(),//TODO REMOVE LATER
		//tempImage.src: "/imgs/sprites/tempWK.jpg", //doesnt work with "." in declaring object items as such
		itemList: [],
		fieldList: [],
		move: function(direction){
			//TODO if up, down, left, right, if in battle or not
			switch (direction){
				case ("up"):
					if((player.y-9)>0){
						//var collision = map1.collisionCheck();
						if(player.isCollided === false){
							player.y-=10;
						}
						else{
							player.isCollided = false;
						}
					}
					break;
				case ("down"):
					if((player.y+100)<400){
						//var collision = map1.collisionCheck();
						if(player.isCollided === false){
							player.y+=10;
						}
						else{
							player.isCollided = false;
						}
					}
					break;
				case ("right"):
					if((player.x+100)<800){
						//var collision = map1.collisionCheck();
						if(player.isCollided === false){
							player.x+=10;
						}
						else{
							player.isCollided = false;
						}
					}
					break;
				case ("left"):
					if((player.x-9)>0){
						//var collision = map1.collisionCheck();
						if(player.isCollided === false){
							player.x-=10;
						}
						else{
							player.isCollided = false;
						}
					}
					break;
				default:
					break;
			}
			
		},
		collisionCheck: function(direction){
			//TODO if up, down, left, right, if in battle or not
			switch (direction){
				case ("up"):
					for(var a = 0; a < map1.collidables.length; a++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if(){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				case ("down"):
					for(var b = 0; b < map1.collidables.length; b++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if(){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				case ("right"):
					for(var c = 0; c < map1.collidables.length; c++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if(){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				case ("left"):
					for(var d = 0; d < map1.collidables.length; d++){ //TODO SWITCH COMPARISON TO CURRENT INDEX IN MAP LIST
						if(){ //If collided from x and y coordinates of respective sides
							player.isCollided = true;
						}
					}
					break;
				default:
					break;
			}
			
		},
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
			ct1.drawImage(player.tempImage, player.x, player.y, 100, 100);
			//TODO ct1b.drawImage(player.tempImage, player.frame[player.action].x, player.frame[player.action].y, 100, 100, player.x, player.y, 100, 100);
			player.tempImage.src = "imgs/sprites/tempWK.jpg";
			//WHEN IN BATTLE, DRAW HP BAR BELOW HERO
			if(whichMode === "battle"){
				var hpBarWidth = Math.floor((player.hp/player.maxHP)*100); // adjusts HP bar based on percent pf HP player has left at the time
				ct1.lineWidth = 1;
				ct1.fillStyle = "#ff0000";
				ct1.strokeStyle = "#ffffff";
				ct1.fillRect(player.x,(player.y + 100),hpBarWidth,5);
				ct1.strokeRect(player.x,(player.y + 100),100,5);
			}
			
		},
		attack: function(){
			//TODO HPBAR choose from attack list and do proper ones
		}
	};


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
		this.tileW = 100;
		this.tileH = 100;
		this.imageXStart = 0;
		this.imageYStart = 0;
		//this.image = tilePropsImg;	FOR WHATEVER REASON, CAN'T REFERENCE .THIS IN A DRAW IMAGE CALL
		this.hasDoors = false;
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
					break;
				case ("door2"): //TESTING
					this.imageXStart = 2;
					break;
				case ("door3"): //TESTING
					this.imageXStart = 3;
					break;
				case ("door4"): //TESTING
					this.imageXStart = 4;
					break;
				case ("water"): //TESTING
					this.imageXStart = 5;
					this.passable = false;
					break;
				case ("waterLSide"): //TESTING
					this.imageXStart = 6;
					this.passable = false;
					break;
				case ("waterTSide"): //TESTING
					this.imageXStart = 7;
					this.passable = false;
					break;
				case ("waterRSide"): //TESTING
					this.imageXStart = 8;
					this.passable = false;
					break;
				case ("waterBSide"): //TESTING
					this.imageXStart = 9;
					this.passable = false;
					break;
				case ("waterLB"): //TESTING
					this.imageXStart = 10;
					this.passable = false;
					break;
				case ("waterLT"): //TESTING
					this.imageXStart = 11;
					this.passable = false;
					break;
				case ("waterRT"): //TESTING
					this.imageXStart = 12;
					this.passable = false;
					break;
				case ("waterRB"): //TESTING
					this.imageXStart = 13;
					this.passable = false;
					break;
					case ("dirt"): //TESTING
					this.imageXStart = 14;
					break;
				case ("dirtLSide"): //TESTING
					this.imageXStart = 15;
					break;
				case ("dirtTSide"): //TESTING
					this.imageXStart = 16;
					break;
				case ("dirtRSide"): //TESTING
					this.imageXStart = 17;
					break;
				case ("dirtBSide"): //TESTING
					this.imageXStart = 18;
					break;
				case ("dirtLB"): //TESTING
					this.imageXStart = 19;
					break;
				case ("dirtLT"): //TESTING
					this.imageXStart = 20;
					break;
				case ("dirtRT"): //TESTING
					this.imageXStart = 21;
					break;
				case ("dirtRB"): //TESTING
					this.imageXStart = 22;
					break;
					case ("grass"): //TESTING
					this.imageXStart = 23;
					break;
				case ("grassLSide"): //TESTING
					this.imageXStart = 24;
					break;
				case ("grassTSide"): //TESTING
					this.imageXStart = 25;
					break;
				case ("grassRSide"): //TESTING
					this.imageXStart = 26;
					break;
				case ("grassBSide"): //TESTING
					this.imageXStart = 27;
					break;
				case ("grassLB"): //TESTING
					this.imageXStart = 28;
					break;
				case ("grassLT"): //TESTING
					this.imageXStart = 29;
					break;
				case ("grassRT"): //TESTING
					this.imageXStart = 30;
					break;
				case ("grassRB"): //TESTING
					this.imageXStart = 31;
					break;
				case ("indoor1"): //TESTING
					this.imageXStart = 32;
					break;
				case ("indoor2"): //TESTING
					this.imageXStart = 33;
					break;
				case ("indoor3"): //TESTING
					this.imageXStart = 34;
					break;
				case ("indoor4"): //TESTING
					this.imageXStart = 35;
					break;
				case ("wkfloor"): //TESTING
					this.imageXStart = 36;
					break;
				case ("wkwall"): //TESTING
					this.imageXStart = 37;
					this.passable = false;
					break;
				case ("wkroof1"): //TESTING
					this.imageXStart = 38;
					this.passable = false;
					break;
				case ("wkroof2"): //TESTING
					this.imageXStart = 39;
					this.passable = false;
					break;
				case ("wkroof3"): //TESTING
					this.imageXStart = 40;
					this.passable = false;
					break;
				case ("wkroof4"): //TESTING
					this.imageXStart = 41;
					this.passable = false;
					break;
				/*case (""): //TESTING
					this.imageXStart = ;
					break;*/
				default:
					break;
			}
		}
		this.create = create
		function collisionCheck(){
			if(((((this.y <= (player.y + 110)) && (((this.x + this.tileW) >= (player.x - 10)) && (this.x <= (player.x + 110)))) || (((this.y + this.tileH) >= (player.y - 10)) && (((this.x + this.tileW) >= (player.x - 10)) && (this.x <= (player.x + 110))))) && (this.passable === false))){
				console.log("COLLIDED");
				return true;
			}
			else{
				console.log("NOT COLLIDED");
				return false;
			}
		}
		this.collisionCheck = collisionCheck;		
		function update(direction){
			//Update position and collision
			switch(direction){
				case("up"):
					this.y += 10;
					break;
				case("down"):
					this.y -= 10;
					break;
				case("left"):
					this.x += 10;
					break;
				case("right"):
					this.x -= 10;
					break;
				default:
					break;
			}
		}
		this.update = update;
		function draw(){
			//draw at x and y
			if((((this.y + this.tileH) > viewport.y) && (this.y < (viewport.y + viewport.height))) && (((this.x + this.tileW) > viewport.x) && (this.x < (viewport.x + viewport.width)))){ //Tile is in viewport, draw it~
				ct1.drawImage(tilePropsImg, (this.imageXStart*this.tileW), (this.imageYStart*this.tileH), this.tileW, this.tileH, this.x, this.y, 100, 100);
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
					this.B = (this.map[i].y + this.map[i].tileH);
					this.R = (this.map[i].x + this.map[i].tileW);
				}
				else{}
			}
		}
		this.create = create;
		function collidableRange(){
			this.collidables = null;
			this.collidables = new Array;
			for(var q = 0; q < this.map.length; q++){
				if((((this.map[q].y + this.map[q].tileH) > viewport.y) && (this.map[q].y < (viewport.y + viewport.height))) && (((this.map[q].x + this.map[q].tileW) > viewport.x) && (this.map[q].x < (viewport.x + viewport.width)))){ //Tile is in viewport, draw it~
					if(this.map[q].passable === false){
						this.collidables.push(this.map[q]);
					}
				}
			}
		}
		this.collidableRange = collidableRange;
		function collisionCheck(){
			this.isCollided = false;
			for(var l = 0; l < this.collidables.length; l++){
				console.log("FOR LOOP WORKS");
				this.tempcollided = this.collidables[l].collisionCheck();
				if(this.tempcollided === true){
					this.isCollided = true;
				}
			}
			return this.isCollided;
		}
		this.collisionCheck = collisionCheck;
		function update(direction){
			//Update position and collision
			//for each tile item in the map object, run the create function
			switch(direction){
				case("up"):
					if(this.T < viewport.y){
						this.T += 10;
						this.B += 10;
						for(var i = 0; i <this.map.length; i++){
							this.map[i].update(direction);
						}
					}
					break;
				case("down"):
					if(this.B > viewport.height){
						this.B -= 10;
						this.T -= 10;
						for(var j = 0; j <this.map.length; j++){
							this.map[j].update(direction);
						}
					}
					break;
				case("left"):
					if(this.L < viewport.x){
						this.L += 10;
						this.R += 10;
						for(var k = 0; k <this.map.length; k++){
							this.map[k].update(direction);
						}
					}
					break;
				case("right"):
					if(this.R > viewport.width){
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

	//MAPS WITH TILES
	var wkHomeOutside = [	//First and last tiles of a map list must fill top and bottom corners of map bounds, even if filled with "blank" tile
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
	//PLACE VARIABLES
	var map1 = new Place(wkHomeOutside);
	map1.create();
	
	
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
	var tilePropsImg = new Image();
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
						if((parseInt(key.which, 10) === 38)||(parseInt(key.which, 10) === 87)){ //UP W
							key.which = null;
							player.move("up");
							map1.update("up"); //TEST
						}
						if((parseInt(key.which, 10) === 40)||(parseInt(key.which, 10) === 83)){ //DOWN S
							key.which = null;
							player.move("down");
							map1.update("down"); //TEST
						}
						if((parseInt(key.which, 10) === 37)||(parseInt(key.which, 10) === 65)){ //LEFT A
							key.which = null;
							player.move("left");
							map1.update("left"); //TEST
						}
						if((parseInt(key.which, 10) === 39)||(parseInt(key.which, 10) === 68)){ //RIGHT D
							key.which = null;
							player.move("right");
							map1.update("right"); //TEST
						}
						map1.collidableRange();
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
		tilePropsImg.src = "imgs/bgs/props/tileslist1.png"; //background items start here
		
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