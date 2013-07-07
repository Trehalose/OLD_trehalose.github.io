$(document).ready(function(){
	//DECLARE VARIABLES
	var apiKey;
	var playerName;
	var kanjiList= new Array();
	var readingList= new Array();
	var meaningList= new Array();
	var levelList= new Array();
	function RAINDROP(name, reading, meaning){
		this.name = name;
		this.reading = reading;
		this.meaning = meaning;
		this.isEaten = false;
		this.isGrounded = false;
	}



	//Start Screen
	function startScreen(){   
		$("#apiText").focus(); 		//Focus on textbox
		$("#apiButton").click(function(){		//if press enter button
			//TODO	Edit button animation properties
			$("#apiButton").animate({'background-color':'red', 'border-color':'#990000', 'margin-top':'5px'}, 25).animate({'background-color':'#990000', 'border-color':'#330000', 'margin-top':'0px'}, 50);
			apiKey = $("#apiText").val(); 		//define apiKey value
			setCookie("Wanikani API Key", apiKey , 1);
			if(apiKey === ""){
				$("#apiText").attr("placeholder", "Forgot to enter API key.");
			}
			else{
				$("#apiText").blur().val("ONE MOMENT, PLEASE~");
				collectAPIData("http://www.wanikani.com/api/user/" + apiKey + "/kanji/");
			}
		});
		$("#apiText").keypress(function(key){
			if(parseInt(key.which,10)===13){
				key.preventDefault();
				
				//TODO	Edit button animation properties
				$("#apiButton").animate({'background-color':'red', 'border-color':'#990000', 'margin-top':'5px'}, 25).animate({'background-color':'#990000', 'border-color':'#330000', 'margin-top':'0px'}, 50);
				apiKey = $("#apiText").val(); //records input
				setCookie("Wanikani API Key", apiKey , 1);
				if(apiKey === ""){
					$("#apiText").attr("placeholder", "Forgot to enter API key.");
				}
				else{
					$("#apiText").blur().val("ONE MOMENT, PLEASE~");
					collectAPIData("http://www.wanikani.com/api/user/" + apiKey + "/vocabulary/");
				}
			}
		});	
	}

	//function to collect API. if success, start game or scold invalid key, if not, explain why
	function collectAPIData(URL){
		$.ajax({
			'type': "GET",
			'url': URL,
			'dataType': 'jsonp',
			'success': function(data){
				if(data.hasOwnProperty("error")){ 	//API key is not legitimate
					//Scold player for being a liar
					alert("Looks like you forgot your good API key \n in your other pant's pocket. \n Go get that so we can go picinic with Wanikani.");
					$("#apiText").val("").focus();
				}
				else{ 	//API key is legitimate
					playerName = data.user_information.username;	//set Player Name to username
					console.log(data.user_information.username);
					console.log(data.requested_information.general);
					console.log(data.requested_information.general.length);
					for(var i = 0; i<data.requested_information.length; i++){
						if(data.requested_information[i].stats != null){
							//fill kanji, meaning, levels
							kanjiList.push(data.requested_information.general[i].character);
							meaningList.push(data.requested_information.general[i].meaning);
							levelList.push(data.requested_information.general[i].level);
							//fill reading based on most important reading
							if(data.requested_information.general[i].important_reading == "onyomi"){
								readingList.push(data.requested_information.general[i].onyomi);
							}
							else if(data.requested_information.general[i].important_reading == "kunyomi"){
								readingList.push(data.requested_information.general[i].kunyomi);
							}
							else{}
						}
						else{}
					}
					$("#apiForm").val("Welcome to the PICINIC.");
					if(autoPlayOrBeingGay == false){
						//BE GAY
						alert("Your API key works! \n Lets go have lunch with Wanikani!");
					}
					else{
						console.log("API WAS GOT!!");	
					}
					//TODO     PLAY GAME FUNCTION
				}
			},
			'error': function(){
				var answer = Math.floor(Math.random()*4);
				switch (answer) {
					case 0:
						alert("The server is out to lunch.");
						break;
					case 1:
						alert("Everyone at Tofugu quit \n and burnt down the server.");
						break;
					case 2:
						alert("I'm holding the server hostage \n for a 1 million dong ransom.");
						break;
					case 3:
						alert("The server wanted me to tell you that \n it wants to see other people...");
						break;
					default:
						break;
				}
			}
		});
	}


	//TODO COLLECT COOKIES		CALLED WHEN SUBMITTING API, to save api key
	function setCookie(cookieName, cookieValue, expirationDays){
		//console.log(cookieName + cookieValue + expirationDays);
		var expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + expirationDays);
		//console.log(expirationDate);
		var cValue=escape(cookieValue) + ((expirationDays==null) ? "" : "; expires="+expirationDate.toUTCString());
		var theNewCookie= cookieName + "=" + cValue;
		document.cookie = theNewCookie
		console.log(document.cookie);
		console.log("Cookie is SET");
	}
	//TODO CHECK FOR COOKIES	CALLED WHEN OPENING PAGE, to find saved api key
	function checkCookie(){
		var apiKey = getCookie("Wanikani API Key");
		if((apiKey != null) && (apiKey  != "")){
			return apiKey;
		}
		else{
			return false;	
		}
		console.log("Cookie is CHECK");
	}
	//TODO USE COOKIES		CALLED WHEN COOKIES FOUND, to auto submit api key
	function getCookie(cookieName){
		console.log("Cookie is GET");
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





	var autoPlayOrBeingGay = checkCookie();
	function preGameCheck(){
		if(autoPlayOrBeingGay == false){
			//BE GAY
			console.log("Being Gay");
			startScreen();
		}
		else{
			//AUTO PLAY
			console.log("AUTO PLAY!!!")
			collectAPIData("http://www.wanikani.com/api/user/" + autoPlayOrBeingGay + "/kanji/");
		}
	}



	preGameCheck();
	//startScreen();	//TODO  Edit button animation properties
	// collectAPIData("http://www.wanikani.com/api/user/f9351955e81ea8a6e991dfdbdbb1e342/kanji/");		//TODO SET GAMEPLAY METHOD
});