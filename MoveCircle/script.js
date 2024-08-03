var canvas=document.getElementById("RedCan");
const ctx=canvas.getContext('2d');//canvas has to be 2d

//Resize the canvas to fill the window
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//colouring red
ctx.fillStyle='red';
 //top left-coordinates=0,0-starting point
ctx.fillRect(0, 0, canvas.width,canvas.height); 

//drawing circle
ctx.beginPath();
ctx.arc(canvas.width/2,canvas.height/2,50,0,Math.PI*2);
ctx.stroke();
