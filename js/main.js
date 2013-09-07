$(function(){
	canvas = $("canvas")[0];
	ctx = canvas.getContext("2d");
	
	function writeText(text,x,y,font,color,alignment){
		ctx.fillStyle = color || "#FFF";
		ctx.font = font || "32px sans-serif";
		ctx.textAlign = alignment || "left";
		ctx.fillText(text,x,y);
	}
	
	// Draw logo
	writeText("Reckless Runners",canvas.width/2,canvas.height/2-64,"bold 128px sans-serif,sans,Arial",undefined,"center");
});
