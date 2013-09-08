$(function(){
	canvas = $("canvas")[0];
	ctx = canvas.getContext("2d");
	
	function writeText(text,x,y,font,color,alignment){
		ctx.fillStyle = color || "#FFF";
		ctx.font = font || "32px sans-serif,Arial";
		ctx.textAlign = alignment || "left";
		ctx.fillText(text,x,y);
	}
	
	// Variables
	gameStatus = "2.0";
	
	// 1st number	2nd number	Mean
	////////////////////////////////////////
	// 0			0			Main Menu
	// 1			0			In game
	// 2			0			Studio logo
	// 2			1			Game logo
	// 2			2			Loading screen
	///////////////////////////////////////
	
	// Run drawScreen() every 50ms (20 times per second)
	setInterval(function(){
		drawScreen();
	},50);
	
	function drawScreen(){
		// Clear the screen
		ctx.beginPath();
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
		
		switch(gameStatus){
			case "2.0":
				// Draw a studio logo
				writeText("Warped Matter",canvas.width/2,canvas.height/2-64,"192px 'Flavors'","#FFF","center");
				writeText("TM",canvas.width/10*7,canvas.height/2-256,"24px 'Oxygen'","#FFF","center");
				console.log("jjj");
			break;
			case "2.1":
				// Draw a game logo
				writeText("Bad For Business",canvas.width/2,canvas.height/2-64,"192px 'Flavors'","#FFF","center");
				writeText("TM",canvas.width/10*7,canvas.height/2-256,"24px 'Oxygen'","#FFF","center");
			break;
			case "2.2":
				// Loading screen
				writeText("Loading",canvas.width/2,canvas.height/2-16,"32px 'Oxygen'","#FFF","center");
			break;
		}
	}
	
	setTimeout(function(){
		gameStatus = "2.1";
		setTimeout(function(){
			gameStatus = "2.2";
		},3000);
	},3000);
});
