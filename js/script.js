(function(){
	
	let duckCommingInterval,
		bulletCount = 6,
		killedDucks = 0,
		gunSound,
		start = false,
		startButton = document.getElementById("start-button"),
		wrapper = document.getElementsByClassName('wrapper'),
		score = document.getElementById('score'),
		body = document.body,
		groundPosition = document.documentElement.clientHeight - 100,
		bulletSound ;
		
	document.getElementById("start-info").innerHTML = `You have ${bulletCount} bullets`;
	score.innerHTML = "Killed ducks  " + killedDucks;
	startButton.onclick = function(){
		document.getElementById("start").remove();
			
		createDackRight();
		createDackLeft();
	
		body.addEventListener('click', clickShot);
		
		duckCommingInterval = setInterval(function(){
			createDackRight();
			createDackLeft();
		},4000);
	}
	function clickShot(e){
		if(bulletCount > 0){//0844 sj053688 098655663
			shotDuck();
			e = e || fixEvent.call(this, window.event);
			e = e.target || e.srcElement;
			if(e.className.indexOf("duck") > -1){
				if(e.className.indexOf("duck-right") > -1){
					e.className = "duck duck-kiiled";
					e.style.backgroundImage = "url(./images/duck-killed-right.jpg)";
					killedDucks++;
					score.innerHTML = "Killed ducks  " + killedDucks;
				}
				if(e.className.indexOf("duck-left") > -1){
					e.className = "duck duck-kiiled";
					e.style.backgroundImage = "url(./images/duck-killed-left.jpg)";
					killedDucks++;
					score.innerHTML = "Killed ducks  " + killedDucks;
				}
			}
		}
		else{
			alert("Your bullets was over\nYou killed " + killedDucks + " duckes");
		}
	}
	function createDackLeft(){
		let duckDiv = createDack("left"),
			moveIter = null;
			
		 moveIter = setInterval(function(){
			if(duckDiv.getAttribute('class').indexOf('duck-kiiled') > -1){
				 duckDiv.style.top = (duckDiv.offsetTop + duckDiv.offsetWidth + 2) + "px";
		
				if(duckDiv.offsetTop > groundPosition){
					clearInterval(moveIter);
					duckDiv.remove();
				}
			 }
			else{
				duckDiv.style.left = (duckDiv.offsetLeft + 20) + "px";
				
				if(duckDiv.offsetLeft > 1200){
					clearInterval(moveIter);
					duckDiv.remove();
				}
			}
			if(bulletCount <= 0){
				clearInterval(moveIter);
				duckDiv.setAttribute("class","duck");
		    }
		},100);
	}
	function createDackRight(){
		let duckDiv = createDack("right"),
			moveIter = null;

		 moveIter = setInterval(function(){
			 if(duckDiv.getAttribute('class').indexOf('duck-kiiled') > -1){
				duckDiv.style.top = (duckDiv.offsetTop + duckDiv.offsetWidth + 2) + "px";
				
				if(duckDiv.offsetTop > groundPosition){
					clearInterval(moveIter);
					duckDiv.remove();
				}
			 }
			 else{
				duckDiv.style.right = (document.body.offsetWidth - (duckDiv.offsetLeft + duckDiv.offsetWidth) +20) + "px";
		
				if((document.body.offsetWidth - (duckDiv.offsetLeft + duckDiv.offsetWidth)) > 1200){
					clearInterval(moveIter);
					duckDiv.remove();
				}
			 }
			if(bulletCount <= 0){
				clearInterval(moveIter);
				duckDiv.setAttribute("class","duck");
		    }
		},100);		
	}
	function createDack(side){
		let duckDiv = document.createElement('div');
		
		duckDiv.setAttribute('class', "duck");
		duckDiv.style.position = 'absolute';
		duckDiv.style.margin = '5px';
		duckDiv.style.top = (Math.floor(Math.random() * document.documentElement.clientHeight - 100)) + "px";
		if(side){
			if(side.toLowerCase() === "right"){
				duckDiv.style.right = 0 + "px";
				duckDiv.className +=" duck-right";
			}
			if(side.toLowerCase() === "left"){
				duckDiv.style.left = 0 + "px";
				duckDiv.className +=" duck-left";
			}
		}
		
		body.appendChild(duckDiv);
		
		return duckDiv;
	}
	
	/* 
	* After 1s bullet is falling on the ground
	*/
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function bulletFalling(bulletSound) {
	  await sleep(500);
	  playSound(bulletSound, "./sounds/empty-bullet.mp3");
	}
	
	function shotDuck(){
		if(start){
			bulletCount -=1;
			playSound(gunSound,  "./sounds/gunshot.mp3");
			bulletFalling(bulletSound);
		}
		else{
			start = true;
		}
	}
	function playSound(sound, srcPath){
		sound = new Audio();
		sound.src = srcPath;
		sound.play();
	}
}());