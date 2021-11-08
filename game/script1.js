var stress_lvl = document.querySelector('.stress_lvl');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
var flag= 0;

//console.log(stress_lvl);

startScreen.addEventListener('click', start);

let player={ speed: 9, stress_lvl: 0};

let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false }

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e)
{
    e.preventDefault();
    keys[e.key] = true;
    //console.log(e.key);
    console.log(keys);
    
}

function keyUp(e)
{
    e.preventDefault();
    keys[e.key] = false;
    //console.log(e.key);
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
  
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  }
  

function moveLines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function (item) {
      if (item.y >= 700) {
        item.y -= 750;
      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });
  }

  function flaggy()
  {
      alert('flaggy on');
      flag=0;
  }

  function moveEnemy(car) {
    for(x=0; x<3; x++)
    {
      let enemy = document.querySelectorAll(".enemy"+x);
    enemy.forEach(function (item) {
        if(isCollide(car, item))
        {
            
            //if(flag==0){
                //flag=1;
                console.log("Boom HIT!");
                player.stress_lvl +=100;
                //alert("stress_lvl: " + player.stress_lvl);
                stress_lvl.innerText = "stress_lvl: " + player.stress_lvl;
                
                item.classList.add('hide');
                

            //}


        }


      if (item.y >= 750) {
        item.classList.remove('hide');
        item.y = -300;
        item.style.left = Math.floor(Math.random()*350)+"px";

      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });

    }
    
  }

  function booster(car) {
    for(x=0; x<2; x++){
      let boost = document.querySelectorAll(".boost"+x);
    boost.forEach(function (item) {
        if(isCollide(car, item))
        {
            //console.log("Received BOOST!!");
            if(player.stress_lvl>0){
              player.stress_lvl -= 25;
            }
            //alert("stress_lvl: " + player.stress_lvl);
            stress_lvl.innerText = "stress_lvl: " + player.stress_lvl;
            item.classList.add('hide');


        }


      if (item.y >= 750) {
        item.classList.remove('hide');
        item.y = -300;
        item.style.left = Math.floor(Math.random()*350)+"px";

      }
      item.y += player.speed;
      item.style.top = item.y + "px";
    });

    }
    
  }

function endgame(){
  player.start = false;
  alert("Your stress levels have become very high!! You need to have some rest.");
  startScreen.classList.remove("hide");
}


function gamePlay(){
    //console.log('Hey I am clicked');
    //console.log('player.start = ',player.start);
    //console.log(car);
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect(); // for finding out the position of the road (boundary conditions).
    //console.log(road);

    if(player.start){
      if(player.stress_lvl>500){
        endgame();
      }
        moveLines();
        moveEnemy(car);
        booster(car);
        if(keys.ArrowUp && player.y > (road.top + 70 )) { player.y -= player.speed}
        if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 85)) { player.y += player.speed}
        if(keys.ArrowRight && player.x < (road.width - 70)) { player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        //console.log(player.stress_lvl++);

        //player.stress_lvl-= 0.25;
        stress_lvl.innerText = "Stress Level \n" + player.stress_lvl;
    }
    
}

function start(){
    //console.log('Start Prog started');
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start = true;
    player.stress_lvl= 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0; x<5; x++)
    {
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y = (x*150);
    roadLine.style.top = (x*150) + "px";
    gameArea.appendChild(roadLine);

    }
    


    let car = document.createElement('div');
    car.setAttribute('class','car');
    //car.innerText="Yo I am your car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    

    //console.log("top position"+ car.offsetTop);
    //console.log("left position"+ car.offsetLeft);

    for(x=0; x<3; x++)
    {
    //ChangeIt();
    let enemyCar= document.createElement('div');
    enemyCar.setAttribute('class','enemy'+x);
    console.log('enemy'+x);
    enemyCar.y = ((x+1)*350) * -(1);
    enemyCar.style.top = (x*150) + "px";
    enemyCar.style.left = Math.floor(Math.random()*350)+"px";
    gameArea.appendChild(enemyCar);

    }
    for(x=0; x<2; x++)
    {
    let booster= document.createElement('div');
    booster.setAttribute('class','boost'+x);
    booster.y = ((x+1)*400) * -(1);
    booster.style.top = (x*150) + "px";
    booster.style.left = Math.floor(Math.random()*350)+"px";
    gameArea.appendChild(booster);

    }


}

/*function ChangeIt() 
{
var num = Math.ceil( Math.random() * 5 );
console.log('THis is the no', num);
enemy.body.background = '3.jpg';
}*/