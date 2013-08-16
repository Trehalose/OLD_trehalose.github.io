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
		//OTHER VARS
	var whichMenu = null;
	var isPaused = false;
	var isDialog = false;
	var isCutscene = false;
	var currentPlace = null;
	var storyProgress = 0;
	var questsComplete = new Array();
	var lvlsUnlocked = 0;


		//PLAYER
	var player = {	//TODO IMAGE, FILL IN FUNCTIONS, ETC
		name: playerName,
		lvl: playerLvl,
		hp: 0,
		isAlive : true,
		isSmitten: false,
		isStunned: false,
		isHurt: false,
		isAttacking: false,
		speed: 0,
		x: 0,
		y: 0,
		hasItems: new Array(),
		attackList: new Array(),
		move: function(){
			//if up, down, left, right, if in battle or not
		},
		update: function(){
			//collect movement stuff: move, attack, hit, etc.
		},
		draw: function(){
			//move on screen
		}
	};
	//SCREEN OBJ
		//MENU OBJ
			//START OBJ
				//BG
				//LOGO
				//NEW GAME
				//LOAD GAME
				//ABOUT GAME
				//NAVIGATE, UPDATE, DRAW
			//PAUSE OBJ
				//BG
				//CONTINUE
				//SAVE
				//ITEMS ON THE SIDE
				//MAP
				//MAIN MENU||BACK
				//NAVIGATE, UPDATE, DRAW
			//ABOUT OBJ
				//BG
				//CONTENT
				//BACK
				//NAVIGATE, UPDATE, DRAW
			//MAP OBJ
				//THE MAP ITSELF
				//THE LOCATION CHOICES, LOCKED AND UNLOCKED
				//YOU SURE YOU WANNA GO HERE?
				//BACK
				//NAVIGATE, UPDATE, DRAW
			//ITEMS MENU OBJ
				//BG
				//BACK
				//BATTLE 5 ITEMS LIST
				//SORT ITEMS
					//SELECT//DESELECT
				//SELECTED ITEMS
					//ABOUT
					//SELECT||USE||SELL //DESELECT
					//THROW AWAY
					//NEVERMIND
				//NAVIGATE, UPDATE, DRAW
			//SUB-ITEMS MENU OBJ
				//QUEST LOG OBJ
					//BG
					//PAGE ITEMS
					//NEXT||LAST PAGE
					//BACK
				//BEASTIARY OBJ
					//BG
					//PAGE ITEMS
					//NEXT||LAST PAGE
					//BACK
				//NAVIGATE, UPDATE, DRAW
		//PLACE OBJ
			//BG
			//WHICH PLACE IS IT?
			//THE ITEMS IN THE AREA, THE SCENERY
			//EXITS
			//THE NPCs IN THE AREA
			//THE PLAYER IN THE AREA
			//MOVEMENT OF THAT STUFF
			//NAVIGATE, UPDATE, DRAW
			//NOT READY FOR THIS LVL AREA YET
		//CUTSCENE
			//NAVIGATION THROUGH SCENE
			//IMAGE AREA
			//DIALOG AREA
			//NAVIGATE, UPDATE, DRAW
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
	var theCutscenes = new Array();	//CUTSCENE LIST
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
	//CREATE LIST: CUTSCENES
	//CREATE LIST: BATTLES
	//CREATE LIST: GAME ITEMS
	//CREATE LIST: PLACES
	//CREATE LIST: NPCS
	//CREATE LIST: BGM
	//CREATE LIST: FRENEMY
	//CREATE LIST: ENEMY
	//CREATE LIST: CURRENT ENEMY
	//SCREEN CHANGE FUNCTION
	//PAUSE THINGS FUNCTION
	//UNPAUSE THINGS FUNCTION
	//ANIMATION FUNCTION
	//COLLISION DETECTION FUNCTION
	//MONSTER SPAWN FUNCTION
	//INPUT FUNCTION
		//MOVEMENT INPUT
		//TYPING INPUT
		//MENU NAVIGATION INPUT
	//NOT READY FOR THIS LVL YET FUNCTION
	//START GAME FUNCTION
	//LOAD GAME FUNCTION
	//SAVE GAME FUNCTION
	//COOKIES FOR API AND THAT SHIT

//THE GAME LOOPS, INITIALIZE, LOAD, UPDATE, DRAW.
	function initializeGame(){
		
	}
	function loadGame(){
		//LOAD IMAGES
		function imageLoader(){
			
		}
	}
	function updateGame(){
		
	}
	function drawGame(){
		
	}


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
					collectAPIData(yourAPIKey);
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
		$("body").click(function(){
			$("#gameBoard").focus();
		});
		//PICK WHICH SCREEN TO DRAW, ETC.
	}


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


	//IF THERE ARE NO API COOKIES, go to API screen, else LOAD
	apiScreenTime();
});