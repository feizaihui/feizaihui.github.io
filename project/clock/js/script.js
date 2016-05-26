var WINDOW_width = 1024;
var WINDOW_height = 500;
var RADIUS = 8;
var MARGIN_top = 50;
var MARGIN_left = 50;

//const endTime = new Date(2016,4,23,22,23,13);
var curTime = 0;

var balls = [];
const colors = ["red","green","blue","yellow","orange","pink"];

window.onload = function(){
	WINDOW_width = document.body.clientWidth;
	WINDOW_height = document.body.clientHeight*0.9;
	MARGIN_top = WINDOW_height*0.1;
	MARGIN_left = WINDOW_width*0.1;
	

	var canvas = document.getElementById('canvas');
	canvas.width = WINDOW_width;
	canvas.height = WINDOW_height;

	var context = canvas.getContext("2d");
	
	curTime = getCurSecond();
	setInterval(
		function() {
			rander(context);
			update();
			console.log(balls.length)
		},
		100
	);
			
			
}

function update(){
	var nextTime = getCurSecond();

	var nextHour = parseInt(nextTime/3600);
	var nextMinute = parseInt((nextTime-nextHour*3600)/60);
	var nextSecond = parseInt(nextTime%60); 

	var showingHour = parseInt(curTime/3600);
	var showingMinute = parseInt((curTime-showingHour*3600)/60);
	var showingSecond = parseInt(curTime%60);

	if( showingSecond != nextSecond){
		if(parseInt(showingHour/10) != parseInt(nextHour/10)){
			addBalls(MARGIN_left,MARGIN_top, parseInt(showingHour/10));
		}
		if(parseInt(showingHour%10) != parseInt(nextHour%10)){
			addBalls(MARGIN_left +(RADIUS + 1) *15 ,MARGIN_top, parseInt(showingHour%10));
		}
		if(parseInt(showingMinute/10) != parseInt(nextMinute/10)){
			addBalls(MARGIN_left +(RADIUS + 1) * 37 ,MARGIN_top, parseInt(showingMinute/10));
		}
		if(parseInt(showingMinute%10) != parseInt(nextMinute%10)){
			addBalls(MARGIN_left +(RADIUS + 1) * 51 ,MARGIN_top, parseInt(showingMinute%10));
		}
		if(parseInt(showingSecond/10) != parseInt(nextSecond/10)){
			addBalls(MARGIN_left +(RADIUS + 1) * 73 ,MARGIN_top, parseInt(showingSecond/10));
		}
		if(parseInt(showingSecond%10) != parseInt(nextSecond%10)){
			addBalls(MARGIN_left +(RADIUS + 1) * 88 ,MARGIN_top, parseInt(showingSecond%10));
		}
		curTime = nextTime;
	}

	updateBalls();
}

function updateBalls(){
	for(var i = 0; i < balls.length; i++){
		balls[i].x +=balls[i].vx;
		balls[i].y +=balls[i].vy;
		balls[i].vy +=balls[i].g*2;

		if(balls[i].y >= WINDOW_height-RADIUS){
			balls[i].y = WINDOW_height - RADIUS;
			balls[i].vy = -balls[i].vy*0.5;
		}
	}

	var cnt = 0;
	for(var i = 0; i<balls.length; i++){
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_width){
			balls[cnt++] = balls[i];
		
		}
		
	}
	while(balls.length > Math.min(cnt,300)){
			balls.pop();
		}	

	
}

function addBalls(x,y,num){
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j<digit[num][i].length; j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+2*j*(RADIUS + 1) + (RADIUS + 1),
					y:y+2*i*(RADIUS + 1) + (RADIUS + 1),
					g:1.5+Math.random(),
					vx:Math.pow(-1, Math.ceil(Math.random()*1000)) * 10,
					vy:-10,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function getCurSecond(){
	var newTime = new Date();
	/*var ret = endTime.getTime() - newTime.getTime();*/
	var ret = newTime.getHours() * 3600 + newTime.getMinutes()*60 + newTime.getSeconds();
	//ret = Math.round(ret/1000);


	return ret ;
}

function rander(cxt){

	cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);

	var hour = parseInt(curTime/3600);
	var minute = parseInt((curTime-hour*3600)/60);
	var second = parseInt(curTime%60);

	randerDigit(MARGIN_left,MARGIN_top, parseInt(hour/10), cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 15 ,MARGIN_top, parseInt(hour%10), cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 29 ,MARGIN_top, 10, cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 37 ,MARGIN_top, parseInt(minute/10), cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 51 ,MARGIN_top, parseInt(minute%10), cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 65 ,MARGIN_top, 10, cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 73 ,MARGIN_top, parseInt(second/10), cxt);
	randerDigit(MARGIN_left +(RADIUS + 1) * 88 ,MARGIN_top, parseInt(second%10), cxt);

	for(var i = 0; i<balls.length; i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();

		cxt.fill();
	}

}

function randerDigit(x,y,num,cxt){
	cxt.fillStyle = "#ccc";



	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j<digit[num][i].length; j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+2*j*(RADIUS + 1) + (RADIUS + 1),y+2*i*(RADIUS + 1) + (RADIUS + 1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
