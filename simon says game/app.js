let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let h3=document.querySelector("h3");
let btns=["yellow", "red", "purple","green"];
document.addEventListener("keypress",function(){
    if(started==false){
    console.log("game started");
    started=true;

    levelUp();
    }
});


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 300);
}
function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;

    let random=Math.floor(Math.random()*3);
    let randomColor=btns[random];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);

    //random button
    btnFlash(randomBtn);

}

function check(ind) {
    if (gameSeq[ind] === userSeq[ind]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000);
            if (level % 5 === 0) { // Example: Trigger confetti every 5 levels
                triggerConfetti();
            }
        }
    } else {
        h3.innerHTML = `Game Over! Your score is <b>${level}</b> <br>Press any key to start.`;
        reset();
    }
}
  
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    check(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0; 
} 

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}