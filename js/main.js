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
	gameStatus = "2.1";
	dimming = loadedFiles = allFiles = 0;
	images = {};
	loadingDots = canvas.width / 2;
	
	// 1st number	2nd number	Mean
	////////////////////////////////////////
	// 0			0			Main Menu
	// 1			0			In game
	// 2			0			Studio logo
	// 2			1			Game logo
	// 2			2			Loading screen
	///////////////////////////////////////
	
	// Load images
	loadImg("pawn",4);
	loadImg("smiley",0);
	
	// Run drawScreen() every 50ms (approx. 20 times per second)
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
			case "2.1":
				// Draw a studio logo
				ctx.globalAlpha = Math.max(dimming,0.01);
				writeText("Warped Matter",canvas.width/2,canvas.height/2-96,"192px 'Flavors'","#FFF","center");
				writeText("TM",canvas.width/10*7,canvas.height/2-256,"24px 'Oxygen'","#FFF","center");
				if(gameStatus == "2.0"){
					if(dimming < 1.5){
						dimming += 0.025;
					}else{
						gameStatus = "2.1";
					}
				}else{
					if(dimming >= 0){
						dimming -= 0.025;
					}else{
						gameStatus = "2.2";
					}
				}
				ctx.globalAlpha = 1;
			break;
			case "2.2":
			case "2.3":
				// Draw a game logo
				ctx.globalAlpha = Math.max(dimming,0.01);
				writeText("Production codename",canvas.width/2,canvas.height/2-192-32,"48px 'Cinzel'","#808080","center");
				writeText("Bad For Business",canvas.width/2,canvas.height/2-64,"192px 'Cinzel'","#FFF","center");
				writeText("A Story About How Real Business World Works",canvas.width/2,canvas.height/2+24,"48px 'Cinzel'","#FFF","center");
				writeText("TM",canvas.width/10*8,canvas.height/2-256,"24px 'Oxygen'","#FFF","center");
				if(dimming < 1.5){
					dimming += 0.025;
				}else{
					if(gameStatus == "2.2"){
						loadingDots = -300;
						gameStatus = "2.3";
					}
				}
				ctx.globalAlpha = 1;
				if(gameStatus == "2.3"){
					// Loading screen
					loadingDots += 190/(canvas.width/2)*Math.abs(loadingDots-canvas.width/2)+10;
					for(i=0;i<10;i++){
						writeText("·",loadingDots-(Math.max(32,32/(canvas.width/2)*Math.abs(loadingDots-canvas.width/2))*i),canvas.height/2+256+64,"bold 48px 'Oxygen'","#808080","center");
					}
					if(loadingDots > canvas.width + 300){
						loadingDots = -300;
						if(loadedFiles >= allFiles){
							gameStatus = "0.0";
						}
					}
				}
			break;
			case "0.0":
				writeText("Please select players",canvas.width/2,canvas.height-384-96,"32px sans-serif","#FFF","center");
				
				for(mainMenuPawns=0;mainMenuPawns<=4;mainMenuPawns++){
					ctx.globalAlpha=0.25;
					ctx.drawImage(images["pawn"+mainMenuPawns],canvas.width/7*(1+mainMenuPawns)+144,canvas.height-384,192,192);
					ctx.globalAlpha=1;
					ctx.drawImage(images["smiley0"],canvas.width/7*(1+mainMenuPawns)+144+96-32,canvas.height-288);
				}
			break;
		}
	}
	
	function loadImg(fileN,count){
		count = count || 0;
		for(fileC = 0; fileC <= count; fileC++){
			var img = new Image();
			var fileN2 = "" + fileN + fileC;
			images[fileN2] = img;
			img.onload = function(){
				images[fileN2] = img;
				loadedFiles++;
			}
			img.src = "img/" + fileN2 + ".png";
			allFiles++;
		}
	}
});
