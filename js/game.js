// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var fin = false;
var level = 1;
var velmonster = 1;
var fintab = false;
var fintab2 = false;
var fintab3 = false;
var nextLevel = true;
var acabar = true;
var winGame = false;
var monsterkill = 0;
var bestscore = 0;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

//stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

//monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function (){
	monsterReady = true;
};
monsterImage.src = "images/monster.png";


// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var princessesCaught = 0;

var stone1 = {
	x : 160,
	y : 160
};

var stone2 = {
	x : 32,
	y : 96
};

var stone3 = {
	x : 256,
	y : 384
};

var stone4 = {
	x : 448,
	y : 320
};

var stone5 = {
	x : 416,
	y : 96
};

var monster1 = {
	x: 160,
	y: 224
}

var monster2 = {
	x: 346,
	y: 256
}

var monster3 = {
	x: 346,
	y: 64
}
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 64));
	console.log("princess.x = " + princess.x);
	if(princess.x>450){princess.x = 450;}
	princess.y = 32 + (Math.random() * (canvas.height - 64));
	console.log("princess.y = " + princess.y);
	if(princess.y>416){princess.y = 416;}
	if((((princess.x>stone1.x-32)&&(princess.x<stone1.x+32)) &&
		 ((princess.y>stone1.y-32) && (princess.y<stone1.y+32)))){
		princess.x = stone1.x;
		princess.y = stone1.y-32;
		console.log("entra a prin1");

	}
	if((((princess.x>stone2.x-32)&&(princess.x<stone2.x+32)) &&
		 ((princess.y>stone2.y-32) && (princess.y<stone2.y+32)))){
		princess.x = stone2.x+32;
		princess.y = stone2.y;
		console.log("entra a prin2");

	}
	if((((princess.x>stone3.x-32)&&(princess.x<stone3.x+32)) &&
		 ((princess.y>stone3.y-32) && (princess.y<stone3.y+32)))){
		princess.x = stone3.x-32;
		princess.y = stone3.y;
		console.log("entra a prin3");
	}
	if((((princess.x>stone4.x-32)&&(princess.x<stone4.x+32)) &&
		 ((princess.y>stone4.y-32) && (princess.y<stone4.y+32)))){
		princess.x = stone4.x;
		princess.y = stone4.y+32;
		console.log("entra a prin4");
	}
	if((((princess.x>stone5.x-32)&&(princess.x<stone5.x+32)) &&
		 ((princess.y>stone5.y-32) && (princess.y<stone5.y+32)))){
		princess.x = stone5.x+32;
		princess.y = stone5.y;
		console.log("entra a prin5");
	}
};


//
var moveMonster = function(monstruos){
	if(level >= 1){
		if(!fintab){
			monster1.y = monster1.y + 0.2*velmonster;
			if(monster1.y >= 416){
				fintab = true;
			}
		}else{
			monster1.y = monster1.y - 0.2*velmonster;
			if(monster1.y <= 192){
				fintab = false;
			}
		}
		if(level >= 2){
			if(!fintab2){
				monster2.y = monster2.y + 0.4*velmonster;
				if(monster2.y >= 416){
					fintab2 = true;
				}
			}else{
				monster2.y = monster2.y - 0.4*velmonster;
				if(monster2.y <= 32){
					fintab2 = false;
				}
			}
			if(level >= 3){
			if(!fintab3){
				monster3.x = monster3.x + 0.4*velmonster;
				if(monster3.x >= 448){
					fintab3 = true;
				}
			}else{
				monster3.x = monster3.x - 0.4*velmonster;
				if(monster3.x <= 32){
					fintab3 = false;
				}
			}
		}
		}	
	}
}
// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		if(hero.y <= 32){hero.y = 32;}
		//para no tocar la piedra1 por abajo
		if((stone1.x - 32 < hero.x) && (hero.x < stone1.x + 32) && 
			(hero.y < stone1.y + 32) && (hero.y > stone1.y)){
			hero.y = stone1.y + 32;
		}
		//para no tocar la piedra2 por abajo
		if((stone2.x - 32 < hero.x) && (hero.x < stone2.x + 32) && 
			(hero.y < stone2.y + 32) && (hero.y > stone2.y)){
			hero.y = stone2.y + 32;
		}
		//para no tocar la piedra3 por abajo
		if((stone3.x - 32 < hero.x) && (hero.x < stone3.x + 32) && 
			(hero.y < stone3.y + 32) && (hero.y > stone3.y)){
			hero.y = stone3.y + 32;
		}
		//para no tocar la piedra4 por abajo
		if((stone4.x - 32 < hero.x) && (hero.x < stone4.x + 32) && 
			(hero.y < stone4.y + 32) && (hero.y > stone4.y)){
			hero.y = stone4.y + 32;
		}
		//para no tocar la piedra5 por abajo
		if((stone5.x - 32 < hero.x) && (hero.x < stone5.x + 32) && 
			(hero.y < stone5.y + 32) && (hero.y > stone5.y)){
			hero.y = stone5.y + 32;
		}

	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		if(hero.y >= 416){hero.y = 416;}
		//para no tocar la piedra1 por arriba
		if((stone1.x - 32 < hero.x) && (hero.x < stone1.x + 32) &&
			(hero.y > stone1.y - 32)&&(hero.y < stone1.y + 32)){
			hero.y = stone1.y - 32;
		}
		//para no tocar la piedra2 por arriba
		if((stone2.x - 32 < hero.x) && (hero.x < stone2.x + 32) &&
			(hero.y > stone2.y - 32)&&(hero.y < stone2.y + 32)){
			hero.y = stone2.y - 32;
		}
		//para no tocar la piedra3 por arriba
		if((stone3.x - 32 < hero.x) && (hero.x < stone3.x + 32) &&
			(hero.y > stone3.y - 32)&&(hero.y < stone3.y + 32)){
			hero.y = stone3.y - 32;
		}
		//para no tocar la piedra4 por arriba
		if((stone4.x - 32 < hero.x) && (hero.x < stone4.x + 32) &&
			(hero.y > stone4.y - 32)&&(hero.y < stone4.y + 32)){
			hero.y = stone4.y - 32;
		}
		//para no tocar la piedra5 por arriba
		if((stone5.x - 32 < hero.x) && (hero.x < stone5.x + 32) &&
			(hero.y > stone5.y - 32)&&(hero.y < stone5.y + 32)){
			hero.y = stone5.y - 32;
		}
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if(hero.x <= 32){hero.x = 32;}
		//para no tocar la piedra1 por la derecha
		if((stone1.x + 32 > hero.x) && (hero.x > stone1.x) &&
			(hero.y > stone1.y - 32) && (hero.y < stone1.y + 32)){
			hero.x = stone1.x + 32;
		}
		//para no tocar la piedra2 por la derecha
		if((stone2.x + 32 > hero.x) && (hero.x > stone2.x) &&
			(hero.y > stone2.y - 32) && (hero.y < stone2.y + 32)){
			hero.x = stone2.x + 32;
		}
		//para no tocar la piedra3 por la derecha
		if((stone3.x + 32 > hero.x) && (hero.x > stone3.x) &&
			(hero.y > stone3.y - 32) && (hero.y < stone3.y + 32)){
			hero.x = stone3.x + 32;
		}
		//para no tocar la piedra4 por la derecha
		if((stone4.x + 32 > hero.x) && (hero.x > stone4.x) &&
			(hero.y > stone4.y - 32) && (hero.y < stone4.y + 32)){
			hero.x = stone4.x + 32;
		}
		//para no tocar la piedra5 por la derecha
		if((stone5.x + 32 > hero.x) && (hero.x > stone5.x) &&
			(hero.y > stone5.y - 32) && (hero.y < stone5.y + 32)){
			hero.x = stone5.x + 32;
		}
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if(hero.x >= 448){hero.x = 448;}

		//para no tocar la piedra1 por la izquierda
		if((stone1.x > hero.x) && (hero.x > stone1.x - 32) &&
			(hero.y > stone1.y - 32) && (hero.y < stone1.y + 32)){
			hero.x = stone1.x - 32;
		}
		//para no tocar la piedra2 por la izquierda
		if((stone2.x > hero.x) && (hero.x > stone2.x - 32) &&
			(hero.y > stone2.y - 32) && (hero.y < stone2.y + 32)){
			hero.x = stone2.x - 32;
		}
		//para no tocar la piedra3 por la izquierda
		if((stone3.x > hero.x) && (hero.x > stone3.x - 32) &&
			(hero.y > stone3.y - 32) && (hero.y < stone3.y + 32)){
			hero.x = stone3.x - 32;
		}
		//para no tocar la piedra4 por la izquierda
		if((stone4.x > hero.x) && (hero.x > stone4.x - 32) &&
			(hero.y > stone4.y - 32) && (hero.y < stone4.y + 32)){
			hero.x = stone4.x - 32;
		}
		//para no tocar la piedra5 por la izquierda
		if((stone5.x > hero.x) && (hero.x > stone5.x - 32) &&
			(hero.y > stone5.y - 32) && (hero.y < stone5.y + 32)){
			hero.x = stone5.x - 32;
		}
	}

	// Are they touching?
	//princess
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		if(princessesCaught==10){
			nextLevel = true;
			level = 2;
			velmonster++;
			monster1.x = 160;
			monster1.y = 224;
		}else if(princessesCaught ==20){
			nextLevel = true;
			velmonster++
			monster1.x = 160;
			monster1.y = 224;
			monster2.x = 346;
			monster2.y = 256;
			level = 3;
		}else if(princessesCaught == 30 && !winGame){
			winGame = true;
			fin = true;
		}
		reset();
	}

	//monster1
	if(level>=1){
		if (
			hero.x <= (monster1.x + 20)
			&& monster1.x <= (hero.x + 20)
			&& hero.y <= (monster1.y + 20)
			&& monster1.y <= (hero.y + 32)
		) {
			monsterkill = 1;
			if(acabar){
				fin = true;
				acabar = false;
			}
		} 
		//monster2
		if(level>=2){
			if (
				hero.x <= (monster2.x + 20)
				&& monster2.x <= (hero.x + 20)
				&& hero.y <= (monster2.y + 20)
				&& monster2.y <= (hero.y + 32)
			) {
				monsterkill = 2;
				if(acabar){
					fin = true;
					acabar = false;
				}		
			}
			//monster2
			if(level>=3){
				if (
					hero.x <= (monster3.x + 20)
					&& monster3.x <= (hero.x + 20)
					&& hero.y <= (monster3.y + 20)
					&& monster3.y <= (hero.y + 32)
				) {
					monsterkill = 3;
					if(acabar){
						fin = true;
						acabar = false;
					}
				}
			}
		}
	}
		
};

// Draw everything
var render = function () {
	if(!fin){
		if(nextLevel == true){
			if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "50px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("LEVEL:" + level,120,150);
			ctx.fillStyle = "black";
			ctx.font = "24px Helvetica";
			ctx.fillText("Are you ready?", 120, 250);
			setTimeout(function(){ 
				nextLevel = false;
			}, 3000);
		}else{
			if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}
			if (heroReady) {
				ctx.drawImage(heroImage, hero.x, hero.y);
			}

			if (princessReady) {
				ctx.drawImage(princessImage, princess.x, princess.y);
			}

			if (stoneReady) {
				ctx.drawImage(stoneImage, stone1.x, stone1.y );
			}
			
			if (stoneReady) {
				ctx.drawImage(stoneImage, stone2.x, stone2.y );
			}

			if (stoneReady) {
				ctx.drawImage(stoneImage, stone3.x, stone3.y );
			}

			if (stoneReady) {
				ctx.drawImage(stoneImage, stone4.x, stone4.y );
			}

			if (stoneReady) {
				ctx.drawImage(stoneImage, stone5.x, stone5.y );
			}

			if (monsterReady){
				ctx.drawImage(monsterImage, monster1.x, monster1.y);
			}

			if(level >= 2){
				if (monsterReady){
					ctx.drawImage(monsterImage, monster2.x, monster2.y);
				}
			}
			if(level >= 3){
				if (monsterReady){
					ctx.drawImage(monsterImage, monster3.x, monster3.y);
				}
			}

			// Score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
			ctx.fillText("LEVEL: " + level, 400, 416);
		}
	}else{
		// game over
		if(!winGame){
			if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}
			if(bestscore < princessesCaught){
				bestscore = princessesCaught;
			}
			hero.x = canvas.width / 2;
			hero.y = canvas.height / 2;
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "50px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("GAME OVER",120,150);
			ctx.fillStyle = "black";
			ctx.font = "24px Helvetica";
			ctx.fillText("Princesses caught: " + princessesCaught, 120, 250);
			ctx.fillText("LEVEL: " + level, 120, 280);
			ctx.fillText("Monster " + monsterkill + " kill you", 120, 310);
			ctx.fillText("BEST SCORE: " + bestscore, 120, 340);
			ctx.fillText("Press space to play again", 120, 400);
			if(32 in keysDown){
				princessesCaught = 0;
				nextLevel = true;
				fin = false;
				level = 1;
				velmonster = 1;
				fintab = false;
				fintab2 = false;
				fintab3 = false;
				acabar = true;
			}
		}else{
			if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}
			if(bestscore < princessesCaught){
				bestscore = princessesCaught;
			}
			hero.x = canvas.width / 2;
			hero.y = canvas.height / 2;
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "40px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("YOU ARE",160,90);
			ctx.fillText("THE WINNER!",150,130);
			ctx.fillStyle = "black";
			ctx.font = "24px Helvetica";
			ctx.fillText("Princesses caught: " + princessesCaught, 120, 250);
			ctx.fillText("LEVEL: " + level, 120, 280);
			ctx.fillText("BEST SCORE: " + bestscore, 120, 340);
			ctx.fillText("Press space to play again", 120, 400);
			if(32 in keysDown){
				princessesCaught = 0;
				nextLevel = true;
				fin = false;
				level = 1;
				velmonster = 1;
				fintab = false;
				fintab2 = false;
				fintab3 = false;
				acabar = true;
				winGame = false;
			}
		}
	}
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	moveMonster();
	render();
	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
var startGame = function (){
	if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
	}
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "50px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("CAUGHT",100,120);
	ctx.font = "35px Helvetica";
	ctx.fillText("THE PRINCESS",100,180);
	ctx.fillStyle = "black";
	ctx.font = "24px Helvetica";
	ctx.fillText("Press intro to play game!", 120, 250);
	if(13 in keysDown){
		setInterval(main, 1); // Execute as fast as possible
	}else{
		setTimeout(function(){ 
				startGame(); 
		}, 300);
	}
}
setTimeout(function(){ 
				startGame(); 
}, 300);