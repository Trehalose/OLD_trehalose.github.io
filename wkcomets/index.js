$(document).ready(function(){
//My adorable, global variables. So cute, so precious, so flexible.
        var userKey = null;                     //COLLECT AT START
  var score = 0;				//Make it better. Beat my high score of 9*infinity.
	var playerHP = 4;			//Don't lose this.
	var playerAlive = true;			//This either.
	var hit= 2;				//This is just saying whether one hits, misses, or nothing happens. Default: nothing happens
	var playerName = "John De'Fault";	//CHANGE TO API USER
	var vocabList = new Array(); 		//ABSORB FROM API
	var meaningList = new Array(); 		//ABSORB FROM API
	var readingList = new Array(); 		//ABSORB FROM API
	var enemy = null;
	var input = null;
	//ENEMY OBJECT, most badly-made falling comet ever. ALL HE WANTED WAS FRIENDSHIP. DAMN YOU, WAKABABBYYYY
	function ENEMY(name, reading, meaning){
		this.HP = 2;
		this.isAlive = true;
		this.isHurt = false;
		this.name = name;
		this.reading = reading;
		this.meaning = meaning;
		this.checkHealth = function(){
			//Check if hurt, if so, change the class to Reading in html
			if(this.HP<2){
				this.isHurt = true;
				if(this.HP<1){ //Check if alive
					this.isAlive = false;
				}
				else{}
			}
			else{}
		}
	}
	
//VARIABLES THAT DO STUFF FOR THE GAME LOOP
	//Shoot Wakababby's ray of hope or whatever it is that you want to call it. YOU THINK I CARE?! IM A GROWN MAN, DAMNIT, I DONT GIVE SHITS ABOUT WHAT I CALL "SHITS". Bitches don't know.
	function shootRay(){
		if(enemy.HP != 0){
			//DO: change ray class to READING RAYnbow
			$("#ray").removeClass("meaningRay").addClass("readingRay");
			$("#ray").delay(450).fadeIn(150).delay(150).fadeOut(200);
			var soundfx1 = $("#atkSound")[0];
			soundfx1.play();
		}
		else{
			//DO: change ray class to MEANING RAY
			$("#ray").removeClass("readingRay").addClass("meaningRay");
			$("#ray").delay(450).fadeIn(150).delay(150).fadeOut(200);
			var soundfx2 = $("#killSound")[0];
			soundfx2.play();
		}
	}
	//destroy enemy if no more hp, explode animation :D
	function destroyEnemy(){
		if(!enemy.isAlive){
			$("#enemy").effect("explode", 200).delay(0).queue(function(next){
				$("#enemy").removeClass("dyingEnemy").addClass("readingEnemy").find("p").text("");
				enemy = null;
				generateEnemy();
				next();
			});
		}
		else{}
	}
	//generate new enemy if none is there, reading is class
	function generateEnemy(){
		if(enemy === null){
			//TODO: Randomly choose from vocabulary items in API
			var itemInd = Math.floor(Math.random()*vocabList.length);
			var meaning = meaningList[itemInd].toLowerCase().split(", ");
			var reading = readingList[itemInd].split(", ");
			enemy = new ENEMY(vocabList[itemInd], reading, meaning);
			//enemy = new ENEMY("鰐蟹", "わにかに", "wanikani");//FILLERS
			switchEnemyState();
			$(".readingEnemy").animate({'margin-right':'-25px', 'margin-top':'-25px'}, 0).animate({'margin-right':'75px', 'margin-top':'25px'}, 200).show().find("p").text(enemy.name);
			$("#enemy").css('width', '200px');
			$("#enemy").css('height', $("#enemy").css('width'));
		}
		else{}
	}
	//switch enemy classes: if hurt, dying or not, not hurt and just spawned or not.
	function switchEnemyState(){
		if(enemy.isHurt){
			if(enemy.isAlive){
				$("#enemy").delay(500).effect("explode", 500);
				$("#enemy").delay(0).queue(function(next){
					$("#enemy").removeClass("readingEnemy").addClass("meaningEnemy");
					$(".meaningEnemy").animate({'margin-right':'-25px', 'margin-top':'-25px'}, 0).animate({'margin-right':'200px', 'margin-top':'50px'}, 200).show();
					next();
				});
				$("#alertInput").removeClass("readingAlert").addClass("meaningAlert").text("MEANING");
			}
			else{
				$("#enemy").delay(500).effect("explode", 200);
				$("#enemy").delay(0).queue(function(next){
					$("#enemy").removeClass("meaningEnemy").addClass("dyingEnemy");
					next();
				});
				destroyEnemy();
				$("#announcements").find("p").text("SUCCESS!!").css("color","#ccff33");
				$("#announcements").show(500).delay(500).hide(500);
			}
		}
		else{
			$("#alertInput").removeClass("meaningAlert").addClass("readingAlert").text("READING");
		}
	}
	//See if Wakababby hit the enemy when you guessed the stuff right
	function checkWakaHit(){
		if(!enemy.isHurt){
			input = readingInputAlter(input);
			var j = enemy.reading.indexOf(input);
			if((enemy.reading != undefined) && (input === enemy.reading[j])){
				hit = 1; //to change WK graphic
				enemy.HP--; // hurt enemy
				enemy.checkHealth(); //establish that enemy is hurt
				switchEnemyState();
				score++; //Adds to score because you hit
				$("#theScore").text(score); //Displays Score
			}
			else{
				hit = 0; //to change WK graphic
				playerHP--;
			}
		}
		else{
			var i = enemy.meaning.indexOf(input.toLowerCase());
			if((enemy.meaning[i] != undefined)&&(input.toLowerCase() === enemy.meaning[i].toLowerCase())){
				hit = 1; //to change WK graphic
				enemy.HP--; // hurt enemy
				enemy.checkHealth(); //establish that enemy is hurt
				switchEnemyState();
				score++; //Adds to score because you hit
				$("#theScore").text(score); //Displays Score
			}
			else{
				hit = 0; //to change WK graphic
				playerHP--;
			}
		}
	}
	//Check the players HP status and update the health bar.
	function checkPlayerStatus(){
		if(playerHP<=3){
			if($("#HP4").hasClass("hpY")){
				$("#HP4").removeClass("hpY").addClass("hpN").find("p").text("O");
				$("#announcements").find("p").text("OUCH!!").css("color","#ff6600");
				$("#textbox").blur();
				$("#announcements").show(500).delay(500).hide(500);
				$("#textbox").delay(1500).queue(function(next){
					$("#textbox").focus();
					next();
				});
			}
			else{}
			if(playerHP<=2){
				if($("#HP3").hasClass("hpY")){
					$("#HP3").removeClass("hpY").addClass("hpN").find("p").text("O");
					$("#announcements").find("p").text("TROUBLE??").css("color","#ff3300");
					$("#textbox").blur();
					$("#announcements").show(500).delay(500).hide(500);
					$("#textbox").delay(1500).queue(function(next){
						$("#textbox").focus();
						next();
					});
				}
				else{}
				if(playerHP<=1){
					if($("#HP2").hasClass("hpY")){
						$("#HP2").removeClass("hpY").addClass("hpN").find("p").text("O");
						$("#announcements").find("p").text("BUMMER!!").css("color","#ff3300");
						$("#textbox").blur();
						$("#announcements").show(500).delay(150).effect("shake", {direction:"up"}).delay(150).hide(500);
						$("#textbox").delay(1500).queue(function(next){
							$("#textbox").focus();
							next();
						});
					}
					else{}
						if(playerHP<=0){
							if($("#HP1").hasClass("hpY")){
								$("#HP1").removeClass("hpY").addClass("hpN").find("p").text("O");
								$("#announcements").find("p").text("FAILURE!!").css("color","#ff0000");
								$("#textbox").blur();
								var soundfx3 = $("#dieSound")[0];
								soundfx3.play();
								$("#announcements").show(500).delay(150).effect("shake").delay(200).hide(500);
								$("#textbox").delay(1500).queue(function(next){
									$("#textbox").focus();
									playerAlive = false;
									console.log("GAME OVER, LOSER. LOSERRRRR~ LOOOOOOOOOSSSSEEEEEEEEERRRRRRRRRRR!!!!!!!!!"); //Keeping this, just as a friendly reminder for those who look.
									checkLoseGame();
									next();
								});
							}
							else{}
						}
				}
			}
		}
		else{
			if($("#HP1").hasClass("hpN")){
				$("#HP1").removeClass("hpN").addClass("hpY").find("p").text("");
				$("#HP2").removeClass("hpN").addClass("hpY").find("p").text("");
				$("#HP3").removeClass("hpN").addClass("hpY").find("p").text("");
				$("#HP4").removeClass("hpN").addClass("hpY").find("p").text("");
			}
		}
	}
	//Shows Wakababby attacking or missing
	function switchWakaState(){
		if(hit===1){
			//attacking
			shootRay();
			$("#wakababby").removeClass("idle").addClass("attacking");
			$("#wakababby").delay(1000).queue(function(next){
				$("#wakababby").removeClass("attacking").addClass("idle");
				next();
			});
		}
		else if(hit===0){
			//missing
			$("#wakababby").removeClass("idle").addClass("miss");
			var soundfx4 = $("#missSound")[0];
			soundfx4.play();
			$("#wakababby").delay(1000).queue(function(next){
				$("#wakababby").removeClass("miss").addClass("idle");
				next();
			});
		}
		else{
			//idle
			if($("#wakababby").hasClass("idle")){
				//do nothing because state is at default
			}
			else{
				$("#wakababby").addClass("idle"); //go back to default state
			}
		}
	}
	//Reset inputval
	function clearStates(){
		hit = 2;
		input = null;
		$("#textbox").attr("placeholder", "Your Answer.");
	}
	//lose game
	function checkLoseGame(){
		if(!playerAlive){
			gameOverScreen();
		}
		else if(playerAlive){
		}
	}
	//I just lost The Game.
	function gameOverScreen(){
		var mean = enemy.meaning;
		var read = enemy.reading;
		enemy.HP = 0;
		enemy.isAlive = false;
		destroyEnemy();
		$("#board").hide();
		$("#gameOverAnnounce").append( playerName +", ");
		var endingInsult = Math.floor(Math.random()*5);
		switch (endingInsult){
			case 0:
				$("#gameOverAnnounce").append("you just couldn't handle it...");
				break;
			case 1:
				$("#gameOverAnnounce").append("you failed the great Wanikani...");
				break;
			case 2:
				$("#gameOverAnnounce").append("there were families in that city, yknow. Not anymore...");
				break;
			case 3:
				$("#gameOverAnnounce").append("you let everyone down...");
				break;
			case 4:
				$("#gameOverAnnounce").append("people died because of you...");
				break;
			default:
				break;
		}
		$("#finalScore").append(" " + "<strong><span style='font-size : 3em'>" + score + "</span></strong>");
		if(score === 1){
			$("#finalScore").append(" round at least~");
		}
		else if (score <= 0){
			$("#finalScore").append(" rounds. JEEZ... Try a little.");
		}
		else{
			$("#finalScore").append(" rounds though~");
		}
		$("#gameOver").find("h3").append("<br><br> The word you were looking for was " + "<strong><span style='font-size:1.5em ; color: orange; '>" + read + "</span></strong>.<br>");
		$("#gameOver").find("h3").append("It means " + "<strong><span style='font-size:1.5em ; color: orange; '>" + mean + "</span></strong>.<br><br>");
		$("#gameOver").show();

		$("#replayButton").click(function(){
			$("#replayButton").animate({'background-color':'red', 'border-color':'orange', 'margin-top':'5px'}, 25).animate({'background-color':'#332222', 'border-color':'yellow', 'margin-top':'0px'}, 50);
			playGame();
		});
	}

	//When Clicking Enter on the Button div
	$("#enterAnswer").click(function(){
			$("#enterAnswer").animate({'background-color':'red', 'border-color':'#990000', 'margin-top':'5px'}, 25).animate({'background-color':'#990000', 'border-color':'#330000', 'margin-top':'0px'}, 50);
			input = $("#textbox").val(); //records input
			if(input === ""){
				$("#textbox").attr("placeholder", "Forgot to enter stuff.");
			}
			else{
				$("#textbox").val(""); //clears textbox
				checkWakaHit();
				checkPlayerStatus();
				switchWakaState();
				clearStates();
			}
	});
	//When pressing Enter/Return key in textbox
	$("#textbox").keydown(function(key){
			if(parseInt(key.which,10)===13){
				key.preventDefault(); //prevents page from reloading when pressing enter during textbox focus
				$("#enterAnswer").animate({'background-color':'red', 'border-color':'#990000', 'margin-top':'5px'}, 25).animate({'background-color':'#990000', 'border-color':'#330000', 'margin-top':'0px'}, 50);
				input = $("#textbox").val(); //records input
				if(input === ""){
					$("#textbox").attr("placeholder", "Forgot to enter stuff.");
				}
				else{
					$("#textbox").val(""); //clears textbox
					/*$("#wakababby").delay(1000).queue(function(next){
						next();
					});*/
					checkWakaHit();
					checkPlayerStatus();
					switchWakaState();
					clearStates();
				}
			}
	});
	//The start-screen where one enters their API Key and gets an idea of how to play THE GAME.
	function howToPlay(){
		 //Displays page with API input, etc.
		$("#apiEnter").click(function(){
			$("#apiEnter").animate({'background-color':'red', 'border-color':'#990000', 'margin-top':'5px'}, 25).animate({'background-color':'#990000', 'border-color':'#330000', 'margin-top':'0px'}, 50);
			userKey = $("#apiSlot").val(); //records input
			if(userKey === ""){
				$("#apiSlot").attr("placeholder", "Forgot to enter API key.");
			}
			else{
				$("#apiSlot").blur();
				$("#apiSlot").val("ONE MOMENT, PLEASE~");
				collectAPIData("http://www.wanikani.com/api/user/" + userKey + "/vocabulary/");
			}
		});
		//When pressing Enter/Return key in textbox
		$("#apiSlot").keydown(function(key){
			if(parseInt(key.which,10)===13){
				key.preventDefault(); //prevents page from reloading when pressing enter during textbox focus
				$("#apiEnter").animate({'background-color':'red', 'border-color':'#990000', 'margin-top':'5px'}, 25).animate({'background-color':'#990000', 'border-color':'#330000', 'margin-top':'0px'}, 50);
				userKey = $("#apiSlot").val(); //records input
				if(userKey === ""){
					$("#apiSlot").attr("placeholder", "Forgot to enter API key.");
				}
				else{
					$("#apiSlot").blur();
					$("#apiSlot").val("ONE MOMENT, PLEASE~");
					collectAPIData("http://www.wanikani.com/api/user/" + userKey + "/vocabulary/");
				}
			}
		});	
	}
	//Calls the API. I had the bitchest of a time with this portion, it turns out that JSONP is solution to all of Life's problems.
	function collectAPIData(wkapiURL){
                 $.ajax({
			'type': "GET",
        		'url': wkapiURL,
        		'dataType': 'jsonp',
        		'success': function (data) {
				if(data.hasOwnProperty("error")){ //if you use a fake API key, you'll be warned.
					alert("API Key invalid, \n or you pissed the King off and he cut you off. \n Refresh the page and try again, loser!");
					$("#apiSlot").val("").focus();
				}
				else{
					playerName = data.user_information.username;
					for(var i = 0; i<data.requested_information.general.length; i++){
						if(data.requested_information.general[i].stats != null){
						    	vocabList.push(data.requested_information.general[i].character);
                        	        		meaningList.push(data.requested_information.general[i].meaning);
	                	        	        readingList.push(data.requested_information.general[i].kana);
						}
						else{}
					}
					$("#apiSlot").val("Welcome to THE GAME.");
					if(autoPlay === false){
						setCookie("WaniComets API Key", userKey , 7);
						alert("Sweet. The API key works. You the boss-man!");
					}
					else{
						$("#loading").remove();	
					}
					playGame();
				}
        		},
			'error': function(){
				alert("API Key invalid, or server is down or something. \n idk man. I'm a farce of a programmer.");
			}
    		});
	}
	//If user types in romaji, it converts that input into kana so the reading can be compared. It functions as my ghetto IME.
	function readingInputAlter(tempInput){
		kana = ["ん","か","き","く","け","こ","が","ぎ","ぐ","げ","ご","さ","し","せ","そ","ざ","じ","じ","ぜ","ぞ","た","ち","つ","つ","て","と","だ","ぢ","ぢ","づ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ","な","に","ぬ","ね","の","ま","み","む","め","も","ら","り","る","れ","ろ","ら","り","る","れ","ろ","わ","を","きゃ","きゅ","きょ","ぎゃ","ぎゅ","ぎょ","しゃ","しゅ","しょ","しゃ","しゅ","しょ","しゃ","しゅ","しょ","じゃ","じゅ","じょ","じゃ","じゅ","じょ","ちゃ","ちゅ","ちょ","ちゃ","ちゅ","ちょ","ちゃ","ちゅ","ちょ","ぢゃ","ぢゅ","ぢょ","ぢゃ","ぢゅ","ぢょ","ぢゃ","ぢゅ","ぢょ","ひゃ","ひゅ","ひょ","びゃ","びゅ","びょ","ぴゃ","ぴゅ","ぴょ","りゃ","りゅ","りょ","りゃ","りゅ","りょ","みゃ","みゅ","みょ","にゃ","にゅ","にょ","は","ひ","ふ","ふ","へ","ほ","じ","ち","や","ゆ","よ","じゃ","じゅ","じょ","す","し","ず","あ","い","う","え","お","っ","っ","っ","っ","っ","っ","っ","っ","っ","っ","ん","っ","っ","っ","っ","っ","っ","っ","っ","っ","っ","ー"];
		romaji = ["nn","ka","ki","ku","ke","ko","ga","gi","gu","ge","go","sa","shi","se","so","za","zi","zhi","ze","zo","ta","chi","tu","tsu","te","to","da","di","dji","du","dzu","de","do","ba","bi","bu","be","bo","pa","pi","pu","pe","po","na","ni","nu","ne","no","ma","mi","mu","me","mo","ra","ri","ru","re","ro","la","li","le","lu","lo","wa","wo","kya","kyu","kyo","gya","gyu","gyo","sya","syu","syo","sia","siu","sio","sha","shu","sho","zya","zyu","zyo","zha","zhu","zho","tya","tyu","tyo","tia","tiu","tio","cha","chu","cho","dya","dyu","dyo","dia","diu","dio","dja","dju","djo","hya","hyu","hyo","bya","byu","byo","pya","pyu","pyo","rya","ryu","ryo","lya","lyu","lyo","mya","myu","myo","nya","nyu","nyo","ha","hi","hu","fu","he","ho","ji","ti","ya","yu","yo","ja","ju","jo","su","si","zu","a","i","u","e","o","b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z","-"];
			var sRegExInput;
			var str; 
			var n;
				for(var i = 0; i < (romaji.length); i++){
						sRegExInput = new RegExp(romaji[i], 'gi');
						str=tempInput; 
						n=str.replace(sRegExInput, kana[i]);
						tempInput = n;
					
				}
				return tempInput;
	}
	//This function clears any excess information(for replaying) and sets up the board for play
	function playGame(){
		$("#startArea").hide();
		$("#gameOver").hide();
		$("#gameOverAnnounce").text("").append("<span style='font-size : 3em'>GAME OVER!!</span><br>");
		$("#finalScore").text("You Lasted for");
		$("#gameOver").find("h3").text("");
		$("#board").show();
		score = 0;
		$("#theScore").text(score);
		playerHP = 4;
		playerAlive = true;
		hit= 2;
		input = null;
		checkPlayerStatus();
		generateEnemy();
		$("#textbox").focus();
	}

	//SET, CHECK, AND GET COOKIES
	function setCookie(cookieName, cookieValue, expirationDays){ //Sets a cookie on your system so that I can hack into your webcam and watch you fap to boku no pico
		var expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + expirationDays);
		var cValue=escape(cookieValue) + ((expirationDays==null) ? "" : "; expires="+expirationDate.toUTCString());
		var theNewCookie= cookieName + "=" + cValue;
		document.cookie = theNewCookie;
		console.log(document.cookie);
	}
	function checkCookie(){ //Checks for cookies when opening the page
		var userKey = getCookie("WaniComets API Key");
		if((userKey != null) && (userKey  != "")){
			return userKey;
		}
		else{
			return false;	
		}
	}
	function getCookie(cookieName){
		var cookieValue = document.cookie;
		var cookieStart = cookieValue.indexOf(" " + cookieName + "=");
		if(cookieStart == -1){
			cookieStart = cookieValue.indexOf(cookieName + "=");
		}
		if(cookieStart == -1){
			cookieValue = null;
		}
		else{
			cookieStart = cookieValue.indexOf("=", cookieStart) + 1;
			var cookieEnd = cookieValue.indexOf(";", cookieStart);
			if(cookieEnd == -1){
				cookieEnd = cookieValue.length;
			}
			cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
		}
		return cookieValue;
	}
	//Check if You have a cookie or a disappointment, if cookie, autoplay, else fill in your api stuff
	function pregameCheck(){
		if(autoPlay === false){
			howToPlay();
		}
		else{
			$("#startArea").hide();
			$("body").append("<div id='loading'><BR><p>Loading~</p><BR><BR><p>Blame Wanikani's inefficient get-ability</p></div>");
			collectAPIData("http://www.wanikani.com/api/user/" + autoPlay + "/vocabulary/");
		}
	}

	var autoPlay = checkCookie();
	console.log(autoPlay);
	pregameCheck();
});
