let inputdir= {x:0,y:0};
const foods=new Audio('food.mp3');
const gameover=new Audio('gameover.mp3');
const move=new Audio('move.mp3');
const music=new Audio('music.mp3');
let speed=9;
let last=0;
let score=0;
let snakeArr=[
    {x: 13, y: 15}
];
food={x:6 , y:7}

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-last)/1000 < 1/speed){
        return;
    }
    last=ctime;
    gamengine();
    
}
function iscollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
        
    }
    if(snake[0].x<=0 || snake[0].x>=18 && snake[0].y<=0 || snake[0].y>=18){
        return true;
    }
}


function gamengine(){
    //update the game
    if(iscollide(snakeArr)){
        gameover.play();
        music.pause();
        inputdir={x:0,y:0};
        alert("Game over! Press any key to continue");
        snakeArr=[{x:13,y:15}];
        //music.play();
        score=0;
        scorebox.innerHTML="Score: " +score;
    }
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("High Score", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "High Score : " + hiscoreval;
        }
        scorebox.innerHTML="Score: " +score;
        foods.play();
        snakeArr.unshift({x :snakeArr[0].x+inputdir.x, y :snakeArr[0].y+inputdir.y});
        a=2;
        b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
        
    }
    snakeArr[0].x +=inputdir.x;
    snakeArr[0].y +=inputdir.y;


    //displaying snake and food
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        selement=document.createElement('div');
        selement.style.gridRowStart = e.y;
        selement.style.gridColumnStart = e.x;
        if(index === 0){
        selement.classList.add('head');
        }
        else{
            selement.classList.add('snakebody');
        }
        board.appendChild(selement);
    });
        felement=document.createElement('div');
        felement.style.gridRowStart = food.y;
        felement.style.gridColumnStart = food.x;
        felement.classList.add('food');
        board.appendChild(felement);

}
let hiscore = localStorage.getItem("High Score");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("High Score", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "High Score : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0,y:1};
    move.play();
    switch(e.key){
    case "ArrowUp":
        inputdir.x=0;
        inputdir.y=-1;
        console.log("Arrow up");
        break;
    case "ArrowDown":
        inputdir.x=0;
        inputdir.y=1;
        console.log("Arrow down");
        break;
    case "ArrowRight":
        inputdir.x=1;
        inputdir.y=0;
        console.log("Arrow right");
        break;
    case "ArrowLeft":
        inputdir.x=-1;
        inputdir.y=0;
        console.log("Arrow left");
        break;
    default:
        break;
    }
})
