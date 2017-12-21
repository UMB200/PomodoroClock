$(document).ready(function(){
	var sessionAddedTime = parseInt($("#sessionLbl").html());
	var breakAddedTime = parseInt($("#breakLbl").html());
	var speedOfTheSession = 1000;
	
	$("#resetBtn").hide();
	$("#myProgress").hide();
	$("#startBtn").click(function(){
		var intervalCounter = setInterval(timerCounter, speedOfTheSession);
		sessionAddedTime *= 60;
		breakAddedTime *= 60;
		var maxValueSession =  sessionAddedTime;
		var maxValueBreak = breakAddedTime;
		//start session timersessionAddedTime
		function timerCounter(){
			//Hide unnecessary items
			$("#resetBtn, #startBtn, #breakLbl, #subtructTimeBreakBtn, #addTimeBreakBtn, #breakPart, #addTimeSessionBtn, #sessionPart,  #subtructTimeSessionBtn").hide();
			$("#elapsedTimer, #myProgress").show();
			$("#elapsedTimer").html("Current session time:");
			sessionAddedTime -= 1;
			//call function to show progress;
			progressBar(sessionAddedTime, maxValueSession);
			//start break function once session is finished
			if(sessionAddedTime === 0 ){
				clearInterval(intervalCounter);
				var breakStart = setInterval(breakCounter, speedOfTheSession);
				$("#sessionLbl").hide();
			}
			if(sessionAddedTime %60 >= 10){
				$("#sessionLbl").html(Math.floor(sessionAddedTime/60)+":" + sessionAddedTime%60);
			}
			else{
				$("#sessionLbl").html(Math.floor(sessionAddedTime/60)+":" + "0" + sessionAddedTime%60);
			}
			//initiate break session
			function breakCounter(){
				$("#elapsedTimer").html("Current break time: ");
				$("#breakLbl").show();
				progressBar(breakAddedTime, maxValueBreak);
				document.getElementById("pomodor").style.backgroundColor =  "red";
				
				$("#elapsedTimer").show();
				breakAddedTime -=1;
				
				if(breakAddedTime%60 >=10){
					
					$("#breakLbl").html(Math.floor(breakAddedTime/60) + ":" + breakAddedTime%60);
				}
				else{
					$("#breakLbl").html(Math.floor(breakAddedTime/60) + ":" + "0"+ breakAddedTime%60);
				}
				if(breakAddedTime === 0){
					clearInterval(breakStart);
					$("#resetBtn").show();
					//Show all  items
					$(".numberSpan, #subtructTimeBreakBtn, #addTimeBreakBtn, #breakPart, #addTimeSessionBtn, #sessionPart,  #subtructTimeSessionBtn").show();
					$("#elapsedTimer, #myProgress").hide();
					//$(".numberSpan").html(6);
					//$("#breakLbl").html(6);
				}	
			}
		}
		//Update progress bar progress
		function progressBar(timeLeft, maxValue){
			var barProgress = document.getElementById("myProgress");
			//Dynamically change max value of progress bar
			barProgress.max = maxValue;
			//Dynamically update progress bar
			barProgress.value = timeLeft;
			timeLeft--;
			var finishBar = setTimeout(timeLeft, speedOfTheSession);
			if(timeLeft === 0){
				barProgress.value =100;
				clearTimeout(finishBar);
			}
		}
	});
	//reset Button puts all back to default values
	$("#resetBtn").click(function(){
		sessionAddedTime = 25;
		breakAddedTime = 25;
		$("#sessionLbl").html(sessionAddedTime);
		$("#breakLbl").html(breakAddedTime);
		$("#timerDiv, #startBtn").show();
		$("#resetBtn, #elapsedTimer").hide();
		document.getElementById("pomodor").style.backgroundColor =  "#AEAF93";
	});
	// subtructs time from Break session
	$("#subtructTimeBreakBtn").click(function(){
		if (breakAddedTime > 1) {
			breakAddedTime -= 1;
			$("#breakLbl").html(breakAddedTime);
		}
	});
	// adds time to Break session
	$("#addTimeBreakBtn").click(function(){
		breakAddedTime +=1;
		$("#breakLbl").html(breakAddedTime);
	});

	// subtructs time from Work  session
	$("#subtructTimeSessionBtn").click(function(){
		if (sessionAddedTime > 1) {
			sessionAddedTime -= 1;
			$("#sessionLbl").html(sessionAddedTime);
		}
	});
	// adds time to Work session
	$("#addTimeSessionBtn").click(function(){
		sessionAddedTime +=1;
		$("#sessionLbl").html(sessionAddedTime);
	});
});