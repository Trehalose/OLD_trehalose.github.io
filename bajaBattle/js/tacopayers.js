//Our game Class
function Game(){
	//set initial game configuration
	this.config = {
		refundRate: 0.05,
		refundMinVelocity: 50,
		refundMaxVelocity: 50,
		bbInitialVelocity: 25,
		bbAcceleration: 1,
		bbFrustreleration: 1,
		bbDropDistance: 15,
		paymentVelocity: 120,
		paymentMaxFireRate: 2,
		gameWidth: 400,
		gameHeight: 300,
		fps: 24,
		debugMode: false,
		bbRanks: 5,
		bbFiles: 10,
		heroSpeed: 120,
		levelDifficultyMultiplier: 0.75,
	};	
	//all game states determined by vars below
	this.lives = 3;
	this.width = 0;
	this.height = 0;
	this.gameBounds = {left: 0, top: 0, right: 0, bottom: 0};
	this.intervalId = 0;
	this.enemyName = undefined;
	this.enemyScore = 0;
	this.heroName = undefined;
	this.heroScore = 0;
	this.level = 1;
	this.forfeit = false;
	this.currentWinner = undefined;
	this.cheatMode = false;
	//The state stack
	this.stateStack = [];
	// inputs and outputs
	this.pressedKeys = {};
	this.datCanvass = null;
	//animation
	this.frame = 0;
	//The sounds n junk
}

//To initialize the physical game by collecting canvas data
Game.prototype.initialize = function(datCanvass){
	this.datCanvass = datCanvass;	// set the game's canvas
	//set the canvas size
	this.width = datCanvass.width;
	this.height = datCanvass.height;
	//set the state of game boundaries on canvas
	this.gameBounds = {
		left: (datCanvass.width / 2 - this.config.gameWidth / 1.75 ) -25,
		right: (datCanvass.width / 2 + this.config.gameWidth / 1.75 ) +25,
		top: (datCanvass.height / 2 - this.config.gameHeight / 2 ) -50,
		bottom: datCanvass.height / 2 + this.config.gameHeight / 2 
	};
};
//Function that returns game's current state
Game.prototype.currentState = function(){
	return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;	//What the hell... ?? :? TODO: FIGURE THAT SHIT OUT
};
//Move a state to the state array
Game.prototype.moveToState = function(state){
	//check if in a state
	if(this.currentState()){
		//If current state has a leave function. if so, call that shit, if not, pop it
		if(this.currentState().leave){
			this.currentState().leave(game);
			this.stateStack.pop();
		}
	}
	//Check if there is an enter function for new state, call it  and push
	if(state.enter){
		state.enter(game);
	}
	this.stateStack.pop();
	this.stateStack.push(state);
};
//Functions for pushing and popping states, pmuch same idea
Game.prototype.pushState = function(state){
	if(state.enter){
		state.enter(game);
	}
	this.stateStack.push(state);
};
Game.prototype.popState = function(){
	if(this.currentState()){
		if(this.currentState().leave){
			this.currentState().leave(game);
		}
		this.stateStack.pop();
	}
};
//State method for starting the game's timer
Game.prototype.start = function(){
	//start with the welcome state
	this.moveToState(new WelcomeState());
	//set new game vars
	this.lives = 3;
	this.config.debugMode = false;
	//start dat game loop sucka
	var game = this;
	this.intervalId = setInterval(function(){GameLoop(game);}, 1000/this.config.fps);
};
//for when keys are pressed down and up
Game.prototype.keyDown = function(keyCode){
	this.pressedKeys[keyCode] = true;
	//delegate keypressing task to current state
	if(this.currentState() && this.currentState().keyDown){
		this.currentState().keyDown(this,keyCode);
	}
	this.pressedKeys[keyCode] = false;
};
Game.prototype.keyUp = function(keyCode){
	delete this.pressedKeys[keyCode];
	//delegate to current state as well.
	if(this.currentState() && this.currentState().keyUp){
		this.currentState().keyUp(this, keyCode);
	}
};
//stops the game, yo
Game.prototype.stop = function Stop(){
	clearInterval(this.intervalId);
};


//OUR GAME LOOP
function GameLoop(game){
	var currentState = game.currentState();
	if(currentState){
		//The dime to update/draw game
		var drawTime = 1 / game.config.fps;
		//get canvas context
		var datContext = game.datCanvass.getContext("2d");
		//update if there is a func for it, same with draw
		if(currentState.update){
			currentState.update(game,drawTime);
		}
		if(currentState.draw){	
			currentState.draw(game, drawTime, datContext);
		}
		if(game.frame >= 8){
			game.frame = 0;
		}
		else{
			game.frame++;
		}
	}
}


//THE WELCOME STATE.... WEE
function WelcomeState(){}
//
WelcomeState.prototype.enter = function(game){};
WelcomeState.prototype.update = function(game, dt){};
//welcome's draw state
WelcomeState.prototype.draw = function(game, dt, ctx){	//TODO: CHANGE WHEN ADDING GRAPHICS
	//clear the bg first
	ctx.clearRect(0,0,game.width, game.height);
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,game.width, game.height);
	//set canvas content variables and draw
	ctx.font = "50px Arial";
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";
	ctx.textBaseline = "center";
	ctx.textAlign = "center";
	ctx.fillText("THE BAJA BATTLES", game.width/2, game.height/4);
	ctx.font="20px Arial";
	ctx.fillText("The game of the game", game.width/2, game.height/3);
	ctx.font="16px Arial";
	ctx.strokeRect((game.width/2)-90, (game.height/2)-25, 170, 45);
	ctx.fillText("Press 'Z' to start, よ。", game.width/2, game.height/2);
	ctx.font="13px Arial";
	ctx.fillText("*Due to the weird amount of interest in our battle-game, I made a quick version", game.width/2, game.height*2/3);
	ctx.fillText(" that everyone else can play too! It's basically a Space Invaders rip-off.", game.width/2, (game.height*2/3)+20);
	ctx.fillText(" It is still a little glitchy, and in never-to-be-finished mode. But even so,", game.width/2, (game.height*2/3)+40);
	ctx.fillText(" enjoy the fun of shooting dolla-dolla billz and soda with tacos and more money.", game.width/2, (game.height*2/3)+60);
	ctx.fillText(" Happy holidays for all you dudes!", game.width/2, (game.height*2/3)+80);
};
//for when the user presses button to start the game.
WelcomeState.prototype.keyDown = function(game, keyCode){
	if(keyCode == 90 /*Z*/){
		//Z starts the character choice screen
		game.moveToState(new CharacterChoiceState());
	}
};

function GameOverState(){
}
GameOverState.prototype.update = function(game, dt){};
GameOverState.prototype.draw = function(game, dt, ctx){
	ctx.clearRect(0,0,game.width,game.height);//clear bg
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,game.width, game.height);
	var endImage = new Image();
	endImage.src = "img/endings.png";
	var endReason = undefined;
	if(game.forfeit === true){
		if(game.heroName == "BANE"){
			ctx.drawImage(endImage, 0,0,800,600,0,0,800,600);
		}
		else{
			ctx.drawImage(endImage, 0,600,800,600,0,0,800,600);
		}
		endReason = game.heroName + " LOST THE BAJA BATTLE BY FORFEIT!"
	}
	if(game.enemyScore >= 5){
		if(game.heroName == "BANE"){
			ctx.drawImage(endImage, 0,1800,800,600,0,0,800,600);
		}
		else{
			ctx.drawImage(endImage, 0,1200,800,600,0,0,800,600);
		}
		endReason = game.heroName + " LOST THE BAJA BATTLE!"
	}
	else if (game.heroScore >= 5){
		if(game.heroName == "BANE"){
			ctx.drawImage(endImage, 0,1200,800,600,0,0,800,600);
		}
		else{
			ctx.drawImage(endImage, 0,1800,800,600,0,0,800,600);
		}
		endReason = game.heroName + " WON THE BAJA BATTLE!";
	}
	//TODO: CHANGE TO FIT IMAGES
	ctx.font = "30px Arial";
	ctx.fillStyle = "#000000";
	ctx.textBaseline = "center";
	ctx.textAlign = "center";
	ctx.fillText(endReason, game.width/2, 40);
	ctx.font="16px Arial";
	var endInfo = game.enemyName + " " + game.enemyScore + " || " + game.heroName + " " + game.heroScore;
	ctx.fillText(endInfo, game.width/2, 80);
	ctx.font = "16px Arial";
	ctx.fillText("Press 'Z' to play again!~", game.width/2, 100);
};
GameOverState.prototype.keyDown = function(game, keyCode){
	if(keyCode == 90){
		//Z restarts for endless fun!
		//TODO: CHANGE TO MEED SCORING METHOD
		game.forfeit = false;
		game.moveToState(new CharacterChoiceState());
	}
};

//THE LEVEL INTRODUCTION STATE, shows 'level ?' msg and countdown
function LevelIntroState(level){
	this.level = level;	//TODO: SHOW SCORE RATIOS INSTEAD
	this.countdownNumber = 3;
}
LevelIntroState.prototype.draw = function(game, dt, ctx){
	//TODO, DRAW IMAGES OF SCORES & RATIOS
	//clear the bg first
	ctx.clearRect(0,0,game.width, game.height);
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,game.width, game.height);
	//set canvas content variables and draw
	var scoreImage = new Image();
	scoreImage.src = "img/scoreImage.png";
	var winMsg = "";
	if(game.currentWinner == game.heroName){	//TODO, draw in reverse
		if(game.heroName == "BANE"){
			ctx.drawImage(scoreImage, 400*game.heroScore,400,400,400, 400,200,400,400); //image of hero
			ctx.drawImage(scoreImage, (400*game.heroScore)+1600,0,400,400, 0,200,400,400); //image of enemy
			}
		else{
			ctx.drawImage(scoreImage, 400*game.heroScore,0,400,400, 400,200,400,400); //image of hero
			ctx.drawImage(scoreImage, (400*game.heroScore)+1600,400,400,400, 0,200,400,400); //image of enemy
		}
		var winMsg = "You WON this round! Keep at it!";
	}
	else if(game.currentWinner == game.enemyName){	//TODO, draw in reverse
		if(game.heroName == "BANE"){
			ctx.drawImage(scoreImage, (400*game.enemyScore)+1600,400,400,400, 400,200,400,400); //image of hero
			ctx.drawImage(scoreImage, 400*game.enemyScore,0,400,400, 0,200,400,400); //image of enemy
		}
		else{
			ctx.drawImage(scoreImage, (400*game.enemyScore)+1600,0,400,400, 400,200,400,400); //image of hero
			ctx.drawImage(scoreImage, 400*game.enemyScore,400,400,400, 0,200,400,400); //image of enemy
		}
		var winMsg = "You LOST this round. Better luck next time!";
	}
	else{
		if(game.heroName == "BANE"){	//TODO, draw in reverse
			ctx.drawImage(scoreImage, 0,400,400,400, 400,200,400,400); //image of hero
			ctx.drawImage(scoreImage, 0,0,400,400, 0,200,400,400); //image of enemy
		}
		else{
			ctx.drawImage(scoreImage, 0,0,400,400, 400,200,400,400); //image of hero
			ctx.drawImage(scoreImage, 0,400,400,400, 0,200,400,400); //image of enemy
		}
		var winMsg = "The Battles Begin!";
	}
	ctx.fillStyle = "#000000";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.font = "40px Arial";
	ctx.fillText(winMsg, game.width/2, 75);
	ctx.font = "36px Arial";
	ctx.fillText(game.enemyName + ": " + game.enemyScore + " || " + game.heroName + ": " + game.heroScore , game.width/2, 140);
	ctx.font="24px Arial";
	ctx.fillText("Start in "+this.countdownNumber, game.width/2, 175);
	return;
};
LevelIntroState.prototype.update = function(game, dt){
	if(this.countdown == undefined){
		this.countdown = 3;	//start countdown at 3
	}
	this.countdown -= dt;
	//change countdown number until after 0 is reached, then go to next level play
	if(this.countdown < 2){
		this.countdownNumber=2;
	}
	if(this.countdown < 1){
		this.countdownNumber=1;
	}
	if(this.countdown <= 0){
		game.currentWinner = undefined;
		game.moveToState(new PlayState(game.config, this.level));
	}
};


//THE GAMEPLAY STATE WOOOOOOOO
function PlayState(config, level){
	this.config = config;
	this.level = level;
	//gamestate stuff
	this.bbCurrentVelocity = 10;
	this.bbCurrentDropDistance = 0;
	this.bbsAreDropping = false;
	this.lastPaymentTime = null;
	//Game entities;
	this.hero = null;	//rina the phat and sassy hero... or steeb the poop
	this.bbs = [];	//steves free sodas or rina's money
	this.payments = [];	//rinas payments or steves free sodas
	this.refunds = [];	//steves refunds or rinas phat and sassy notes
	this.cheatCount = 0;
	this.cheatCooldown = 10;
}
PlayState.prototype.enter = function(game){
	//create our hero
	this.hero = new Hero(game.width/2, game.gameBounds.bottom);
	//set up the initial states for bbs
	this.bbCurrentVelocity = 10;
	this.bbCurrentDropDistance = 0;
	this.bbsAreDropping = false;
	//Set hero and BB speeds and parameters for the level
	var levelMultiplier = this.level * this.config.levelDifficultyMultiplier;
	this.heroSpeed = this.config.heroSpeed;
	this.bbInitialVelocity = this.config.bbInitialVelocity + (levelMultiplier * this.config.bbInitialVelocity);
	this.refundRate = this.config.refundRate + (levelMultiplier * this.config.refundRate);
	this.refundMinVelocity = this.config.refundMinVelocity + (levelMultiplier * this.config.refundMinVelocity);
	this.refundMaxVelocity = this.config.refundMaxVelocity + (levelMultiplier * this.config.refundMaxVelocity);
	//create BBs
	var ranks = this.config.bbRanks;
	var files = this.config.bbFiles;
	var bbs = [];
	for(var rank = 0; rank < ranks; rank++){
		for(var file = 0; file < files; file++){
			bbs.push(new BB((game.gameBounds.left + file * 29),(game.gameBounds.top + rank * 30),rank, file, 'Fountain'));
		}
	}
	this.bbs = bbs;
	this.bbCurrentVelocity = this.bbInitialVelocity;
	this.bbVelocity = {x: -this.bbInitialVelocity, y: 0};
	this.bbNextVelocity = null;
	this.cheatBox = new CheatBox();
};
PlayState.prototype.update = function(game, dt){
	//MOVE/UPDATE hero
	if(game.pressedKeys[37]){
		this.hero.x -= this.heroSpeed * dt;
	}
	if(game.pressedKeys[39]){
		this.hero.x += this.heroSpeed * dt;
	}
	if(game.pressedKeys[90]){
		this.Pay();
	}
	if(this.hero.x < game.gameBounds.left){	//keep hero in boundaries of game
		this.hero.x = game.gameBounds.left;
	}
	if(game.cheatMode == false){
		//Open cheat mode
		if(this.cheatCooldown >= 10){
			var cheatChance = Math.random();
			if(cheatChance>0.999999){
				game.cheatMode = true;
				this.cheatBox.visible = true;
			}
		}
		else{
			this.cheatCooldown += dt;	
		}
		if(this.hero.x > game.gameBounds.right-this.hero.width){
			this.hero.x = game.gameBounds.right-this.hero.width;
		}
	}
	else{
		this.cheatCount += dt;
		if(this.cheatCount >= 3){
			game.cheatMode = false;
			this.cheatBox.visible = false;
			this.cheatCount = 0;
			this.cheatCooldown = 0;
		}
		if(this.hero.x > game.gameBounds.right){
			this.hero.x = game.gameBounds.right;
		}
	}
	//MOVE/UPDATE REFUNDS
	for(var i = 0; i<this.refunds.length; i++){
		var refund = this.refunds[i];
		refund.y += dt * refund.velocity;
		if(refund.y > this.height){	//if offscreen, remove from game
			this.refunds.splice(i--,1);
		}
	}
	//MOVE/UPDATE PAYMENTS
	for(i=0; i<this.payments.length; i++){
		var payment = this.payments[i];
		payment.y -= dt * payment.velocity;
		if(payment.y < 0){
			this.payments.splice(i--, 1);
		}
	}
	//MOVE/UPDATE BBS
	var hitLeft = false, hitRight = false, hitBottom = false;
	for(i=0; i< this.bbs.length; i++){	//update where bb is moving
		var bb = this.bbs[i];
		var newx = bb.x + this.bbVelocity.x * dt;
		var newy = bb.y + this.bbVelocity.y * dt;
		if(hitLeft == false && newx < game.gameBounds.left){
			hitLeft = true;
		}
		else if(hitRight == false && (newx+bb.width) > game.gameBounds.right){
			hitRight = true;
		}
		else if(hitBottom == false && newy > game.gameBounds.bottom){
			hitBottom = true;
		}
		if(!hitLeft && !hitRight && !hitBottom){
			bb.x = newx;
			bb.y = newy;
		}
	}
	if(this.bbsAreDropping){	//update bb velocities
		this.bbCurrentDropDistance += this.bbVelocity.y * dt;
		if(this.bbCurrentDropDistance >= this.config.bbDropDistance){
			this.bbsAreDropping = false;
			this.bbVelocity = this.bbNextVelocity;
			this.bbCurrentDropDistance = 0;
		}
	}
	if(hitLeft){	//update for if hitting bounds
		this.bbCurrentVelocity += this.config.bbAcceleration;
		this.bbVelocity = {x: 0, y: this.bbCurrentVelocity };
		this.bbsAreDropping = true;
		this.bbNextVelocity = {x: this.bbCurrentVelocity , y:0};
	}
	if(hitRight){
		this.bbCurrentVelocity += this.config.bbAcceleration;
		this.bbVelocity = {x: 0, y: this.bbCurrentVelocity };
		this.bbsAreDropping = true;
		this.bbNextVelocity = {x: -this.bbCurrentVelocity , y:0};
	}
	if(hitBottom){
		game.lives = 0;

	}
	//Collision detection for payments and bbs
	for(i=0; i<this.bbs.length; i++){
		var bb = this.bbs[i];
		var chaCHING = false;
		for(var j = 0; j<this.payments.length; j++){
			var payment = this.payments[j];
			if(((payment.x > bb.x+2)&&(payment.x<bb.x+bb.width-2)&&(payment.y > bb.y+2)&&(payment.y<bb.y+bb.height-2)) || ((payment.x+payment.width > bb.x+2)&&(payment.x+payment.width<bb.x+bb.width-2)&&(payment.y+payment.height > bb.y+2)&&(payment.y+payment.height<bb.y+bb.height-2))){
				//remove rocket, set CHACHING so we dont process rocket again
				this.payments.splice(j--,1);
				chaCHING = true;
				break;
			}
			//check collision of payments and cheat also...
			if(game.cheatMode === true){
				if(((payment.x > this.cheatBox.x+5)&&(payment.x<this.cheatBox.x+this.cheatBox.width-5)&&(payment.y > this.cheatBox.y+5)&&(payment.y<this.cheatBox.y+this.cheatBox.height-5)) || ((payment.x+payment.width > this.cheatBox.x+5)&&(payment.x+payment.width<this.cheatBox.x+this.cheatBox.width-5)&&(payment.y+payment.height > this.cheatBox.y+5)&&(payment.y+payment.height<this.cheatBox.y+this.cheatBox.height-5))){
					this.cheatBox.destroyed = true;
					//console.log(game.cheatMode + " SOME HOW THIS GOOFED...");
				}
			}
		}
		if(chaCHING){
			this.bbs.splice(i--, 1);
			this.bbCurrentVelocity += this.config.bbFrustreleration;
			//TODO SOUND
		}
	}
	//find all front ranking bbs so they can use refunds
	var frontRankBBs = {};
	for(var i = 0; i<this.bbs.length; i++){
		var bb = this.bbs[i];
		//if no bb or bb is further back in file, it becomes front filed
		if(!frontRankBBs[bb.file] || frontRankBBs[bb.file].rank<bb.rank){
			frontRankBBs[bb.file] = bb;
		}
	}
	//give each front ranking bb a chance to give refunds
	for(var i=0; i<this.config.bbFiles; i++){
		var bb = frontRankBBs[i];
		if(!bb) continue;
		var chance = this.refundRate * dt;
		if(chance > Math.random()){
			this.refunds.push(new Refund(bb.x, bb.y + bb.height, this.refundMinVelocity + Math.random()*(this.refundMaxVelocity-this.refundMinVelocity)));
		}
	}
	//check collision of hero and refunds
	for(var i =0; i<this.refunds.length; i++){
		var refund = this.refunds[i];
		if(((refund.x > this.hero.x+2)&&(refund.x<this.hero.x+this.hero.width-2)&&(refund.y > this.hero.y+2)&&(refund.y<this.hero.y+this.hero.height-2)) || ((refund.x+refund.width > this.hero.x+2)&&(refund.x+refund.width<this.hero.x+this.hero.width-2)&&(refund.y+refund.height > this.hero.y+2)&&(refund.y+refund.height<this.hero.y+this.hero.height-2))){
			this.refunds.splice(i--,1);
			game.lives--;
			//TODO SOUNDS
		}
	}
	//check collision of hero and bbs
	for(var i=0; i<this.bbs.length; i++){
		var bb = this.bbs[i];
		if(((bb.x > this.hero.x+2)&&(bb.x<this.hero.x+this.hero.width-2)&&(bb.y > this.hero.y+2)&&(bb.y<this.hero.y+this.hero.height-2)) || ((bb.x+bb.width > this.hero.x+2)&&(bb.x+bb.width<this.hero.x+this.hero.width-2)&&(bb.y+bb.height > this.hero.y+2)&&(bb.y+bb.height<this.hero.y+this.hero.height-2))){
			game.lives = 0;
			//TODO SOUNDS
		}
	}
	//check for failure or victory in a battle
	if(game.lives <= 0){
		game.enemyScore++;
		game.lives = 3;
		//game.level += 1;	//TODO: SAME OR NO
		game.currentWinner = game.enemyName;
		game.moveToState(new LevelIntroState(game.level));
	}
	if((this.bbs.length == 0) || this.cheatBox.destroyed==true){
		game.heroScore++;
		game.lives = 3;
		game.level += 1;
		game.currentWinner = game.heroName;
		game.moveToState(new LevelIntroState(game.level));
		game.cheatMode = false;
		this.cheatCooldown = 10;
	}
	//check for failure of victory in war
	if(game.enemyScore >= 5){
		game.moveToState(new GameOverState(this.hero));
	}
	else if(game.heroScore >=5){
		game.moveToState(new GameOverState(this.hero));
	}
	else if(game.forfeit == true){
		game.moveToState(new GameOverState(this.hero));
	}
	else{}
};
//use hero's attack
PlayState.prototype.Pay = function(){
	if(this.lastPaymentTime === null || ((new Date()).valueOf() - this.lastPaymentTime) > (1000/this.config.paymentMaxFireRate)){
		this.payments.push(new Payment((this.hero.x)+this.hero.width/4, (this.hero.y)+this.hero.height/4, this.config.paymentVelocity));
		this.lastPaymentTime = (new Date()).valueOf();
		//TODO SOUNDS
	}
};
//Draw the gameplay state
PlayState.prototype.draw = function(game, dt, ctx){	//TODO: ADD IMAGES
	ctx.clearRect(0,0, game.width, game.height);	//clear bg
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,game.width, game.height);
	ctx.fillRect(game.gameBounds.left, game.gameBounds.top, game.gameBounds.right - game.gameBounds.left, game.gameBounds.bottom - game.gameBounds.top);
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,game.gameBounds.left,600);//game bound borders
	ctx.fillRect(game.gameBounds.right,0,game.gameBounds.left,600);
	//draw hero sprite and static enemy sprite
	var whichHero = 0;
	var whichEnemy = 100;
	var heroSprite = new Image();
	heroSprite.src = "img/heroAnim.png";
	var enemySprite = new Image();
	enemySprite.src = "img/enemyAnim.png";
	if(game.heroName == "BANE"){
		whichHero = 0;
		whichEnemy = 100;
	}
	else{
		whichHero = 50;
		whichEnemy = 0;
	}
	ctx.drawImage(heroSprite,(this.hero.width * game.frame), whichHero,this.hero.width,this.hero.height,this.hero.x,this.hero.y, this.hero.width, this.hero.height);
	ctx.font="16 Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText(game.enemyName, (game.gameBounds.right/2)-50,50);
	ctx.fillText("Being Lame", (game.gameBounds.right/2)+200,50);
	ctx.drawImage(enemySprite,(191 * game.frame), whichEnemy,191,100,(game.gameBounds.right/2)-25,0, 191, 100);
	var weapSprite = new Image();
	weapSprite.src = "img/weapons.png";
	//draw cheatBox
	if(this.cheatBox.visible == true){
		ctx.drawImage(weapSprite,90,0,30,60,this.cheatBox.x, this.cheatBox.y,this.cheatBox.width,this.cheatBox.height);
	}
	//draw bbs
	ctx.fillStyle="#006600";
	for(var i=0; i<this.bbs.length; i++){
		var bb = this.bbs[i];
		//ctx.fillRect(bb.x, bb.y, bb.width, bb.height);
		if(game.heroName == "BANE"){
			ctx.drawImage(weapSprite,0,30,30,30,bb.x,bb.y, bb.width, bb.height);
		}
		else{
			ctx.drawImage(weapSprite,0,0,30,30,bb.x,bb.y, bb.width, bb.height);
		}
	}
	//draw refunds
	ctx.fillStyle = "#ff5555";
	for(var i=0; i<this.refunds.length; i++){
		var refund = this.refunds[i];
		//ctx.fillRect(refund.x, refund.y, refund.width, refund.height);
		if(game.heroName == "BANE"){
			ctx.drawImage(weapSprite,60,30,30,30, refund.x, refund.y, refund.width, refund.height);
		}
		else{
			ctx.drawImage(weapSprite,60,0,30,30, refund.x, refund.y, refund.width, refund.height);
		}
	}
	//draw payments
	ctx.fillStyle = "#ff0000";
	for(var i=0; i<this.payments.length; i++){
		var payment = this.payments[i];
		//ctx.fillRect(payment.x, payment.y, payment.width, payment.height);
		if(game.heroName == "BANE"){
			ctx.drawImage(weapSprite,30,0,30,30,payment.x,payment.y, payment.width, payment.height);
		}
		else{
			ctx.drawImage(weapSprite,30,30,30,30,payment.x,payment.y, payment.width, payment.height);
		}
	}
	//draw hud data
	var textYPos = game.gameBounds.bottom + ((game.height - game.gameBounds.bottom)/2) + 14/2;
	ctx.font = "14px Arial";
	ctx.fillStyle = "#000000";
	var info = "Lives: " + game.lives;
	ctx.textAlign = "left";
	ctx.fillText(info, game.gameBounds.left+15, textYPos);
	info = game.enemyName + ": " + game.enemyScore + " || " + game.heroName +": " + game.heroScore;
	ctx.textAlign = "right";
	ctx.fillText(info, game.gameBounds.right-15, textYPos);
	ctx.textAlign = "center";
	textYPos = game.gameBounds.bottom + ((game.height - game.gameBounds.bottom)/2) + 28/1;
	ctx.fillText("'P' for Pause", game.gameBounds.left+(game.gameBounds.left*1.75), textYPos);
	textYPos = game.gameBounds.bottom + ((game.height - game.gameBounds.bottom)/2) + 56/1;
	ctx.fillText("'X' for Forfeit", game.gameBounds.left+(game.gameBounds.left*1.75), textYPos);
	//Game Bounds
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.strokeRect(0,0,game.width, game.height);
	ctx.strokeRect(game.gameBounds.left, game.gameBounds.top, game.gameBounds.right - game.gameBounds.left, game.gameBounds.bottom - game.gameBounds.top);	
	//if in debug mode, draw boundaries
	if(this.config.debugMode){
		ctx.strokeStyle = "#ff0000";
		ctx.strokeRect(0,0,game.width, game.height);
		ctx.strokeRect(game.gameBounds.left, game.gameBounds.top, game.gameBounds.right - game.gameBounds.left, game.gameBounds.bottom - game.gameBounds.top);	
	}
};
PlayState.prototype.keyDown = function(game, keyCode){
	if(keyCode == 90){	//Z fires payment
		this.Pay();
	}
	if(keyCode == 80){	//P for pause
		game.pushState(new PauseState());
	}
	if(keyCode == 88){	//X for forfeit
		game.forfeit = true;
	}
};
PlayState.prototype.keyUp = function(game, keyCode){};


//PAUSE STATE
function PauseState(){}
PauseState.prototype.keyDown = function(game, keyCode){
	if(keyCode == 80){	//P for unPause
		game.popState();
	}
};
PauseState.prototype.draw = function(game, dt, ctx){
	ctx.clearRect(0,0,game.width,game.height); //clearbg
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,game.width, game.height);
	//draw dat shit wooo
	ctx.font="14px Arial";
	ctx.fillStyle = "#000000";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillText("Paused Game", game.width/2,game.height/2);
	return;
};


//SPECIFYING GAME ENTITY PROPS
function Hero(x,y){	//our hero~
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
}

function Payment(x,y,velocity){	//our hero's weapon
	this.x = x;
	this.y = y;
	this.velocity = velocity;
	this.width = 30;
	this.height = 30;
}
function Refund(x,y,velocity){	//our enemy's secondary weapon
	this.x = x;
	this.y = y;
	this.velocity = velocity;
	this.width = 30;
	this.height = 30;
}
function BB(x,y,rank,file,type){	//our enemy's primary weapon
	this.x = x;
	this.y = y;
	this.rank = rank;
	this.file = file;
	this.type = type;
	this.width = 30;
	this.height = 30;
}
function CheatBox(){
	this.x = game.gameBounds.right+5;
	this.y = game.gameBounds.top+100
	this.width = 30;
	this.height = 60;
	this.visible = false;
	this.destroyed = false;
}


//Gamestate stuff, more
function GameState(updateProc, drawProc, keyDown, keyUp, enter, leave){
	this.updateProc = updateProc;
	this.drawProc = drawProc;
	this.keyDown = keyDown;
	this.keyUp = keyUp;
	this.enter = enter;
	this.leave = leave;
}


//CHARACTER CHOICE SCREEN STATE
function CharacterChoiceState(){
	this.choice = 0;
}
CharacterChoiceState.prototype.update = function(game, dt){};
CharacterChoiceState.prototype.draw = function(game, dt, ctx){
	ctx.clearRect(0,0,game.width,game.height); //clearbg
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,game.width, game.height);
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";
	//TODO: WRITE CHAR DESCRIPTION INFO... PERKS?
	var charImage = new Image();
	charImage.src = "img/charChoices.png";
	if(this.choice == 0){
		ctx.drawImage(charImage, 0,0,300,300,100,200,300,300);
		ctx.lineWidth = 3;
		ctx.strokeRect(100,200,300,300);
		ctx.lineWidth = 10;
		ctx.strokeRect(400,203,295,294);
		ctx.font = "350px Arial";
		ctx.fillText("?",550,475);
	}
	else{
		ctx.drawImage(charImage, 300,0,300,300,400,200,300,300);
		ctx.lineWidth = 3;
		ctx.strokeRect(400,200,300,300);
		ctx.lineWidth = 10;
		ctx.strokeRect(100,203,295,294);
		ctx.font = "350px Arial";
		ctx.fillText("?",250,475);
	}
	ctx.font = "30px Arial";
	ctx.textBaseline = "center";
	ctx.textAlign = "center";
	ctx.fillText("SELECT YOUR PLAYER", game.width/2, 80);
	ctx.font="16px Arial";
	ctx.fillText("Press Arrow Keys to Browse", game.width/2, 120);
	ctx.fillText("Press 'Z' to Start", game.width/2, 140);
	
};
CharacterChoiceState.prototype.keyDown = function(game, keyCode){
	if(keyCode == 37){	//L arrow
		this.choice = 0;
	}
	else if(keyCode == 39){	//R arrow
		this.choice = 1;
	}
	else if(keyCode == 90){
		if(this.choice == 0){
			game.heroName = "BANE";
			game.enemyName = "STEVE";
		}
		else{
			game.heroName = "STEVE";
			game.enemyName = "BANE";
		}
		game.level = 1;
		game.heroScore = 0;
		game.enemyScore = 0;
		game.lives = 3;
		game.moveToState(new LevelIntroState(game.level));
	}
};
CharacterChoiceState.prototype.keyUp = function(game, keyCode){};


//Sound Stuff
