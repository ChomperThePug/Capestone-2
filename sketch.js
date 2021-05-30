var BgImg;
var Player, PlayerI;
var InvisibleGround;
var Pokeball, PokeballI;
var Pikachu, PikachuI;
var Charizard, CharizardI;
var Mewto, MewtoI;
var score = 0;
var Cooldown = 0;
var col = 1;
var gameState = 0;


function preload() {
    BgImg = loadImage("Assets/Background.png");
    PlayerI = loadImage("Assets/Mario.png");
    PokeballI = loadImage("Assets/Pokeball.png");
    PikachuI = loadImage("Assets/Pikachu.png");
    CharizardI = loadImage("Assets/Charizard.png");
    MewtoI = loadImage("Assets/Mewto.png");
}

function setup() {
    createCanvas(1000, 600);
    //Ground
    InvisibleGround = createSprite(width / 2, 533, width, 30);
    InvisibleGround.visible = false;
    //Player
    Player = createSprite(100, 480, 20, 20);
    Player.addImage(PlayerI);
    Player.scale = 0.05
}

function draw() {
    background(BgImg);
    //Score
    textAlign(CENTER);
    fill("Black");
    textSize(25);
    text("Score: " + score, width/2, 30);
    //Collision
    Player.collide(InvisibleGround);
    //Throwing
    Cooldown--;
    //Gravity
    Player.velocityY += 0.6;
    //Others
    if (gameState === 0) {
    createPikachu();
    createMewto();
    createCharizard();
    drawSprites();
    Throw();
    }else{
        textSize(30);
        fill("white");
        text("Game Over", width/2, 90);
    }
    console.log(frameCount);
    if (frameCount > 101) {
        if (Pokeball.isTouching(Pikachu)) {
            Pikachu.destroy();
            score += 10 ;
        }
        if (Pokeball.isTouching(Charizard)) {
            Charizard.destroy();
            score += 30 ;
        }
        if (Pokeball.isTouching(Mewto)) {
            Mewto.destroy();
            score += 50 ;
        }

        if (Player.isTouching(Pikachu)) {
            Player.destroy();
            gameState = 1;
        }
        if (Player.isTouching(Charizard)) {
            Player.destroy();
            gameState = 1;
        }
        if (Player.isTouching(Mewto)) {
            Player.destroy();
            gameState = 1;
        }
    }
}

function keyPressed() {
    if (keyCode == UP_ARROW && Player.y == 480.225) {
        Player.velocityY = -10;
    }
    if (keyCode == DOWN_ARROW) {
      col = 0;
    }
}
function Throw() {

    if (keyDown("SPACE") && Cooldown <= 0) {
        Pokeball = createSprite(Player.x, Player.y, 20, 20);
        Pokeball.addImage(PokeballI);
        Pokeball.scale = 0.5;
        Pokeball.lifetime = 75
        Pokeball.velocityX = map(mouseX, 0, 1000, -5, 50);
        Pokeball.velocityY = map(mouseY, 0, 600, -50, 25 );
        if (col === 0) {
        Cooldown = 0
        }else{
        Cooldown = 30
        }
        Pokeball.debug = true;
        Pokeball.setCollider("circle", 0, 0, 20);
    }
}
function createPikachu(){
    if (frameCount % Math.round(100 - score/100) === 0) {
        Pikachu = createSprite(1100,480.225, 20, 20);
        Pikachu.addImage(PikachuI);
        Pikachu.scale = 0.1 ;
        Pikachu.velocityX = -10;
    }
}

function createCharizard(){
    if (frameCount % Math.round(100 - score/100) === 0) {
        Charizard = createSprite(1100,440, 20, 20);
        Charizard.addImage(CharizardI);
        Charizard.scale = 0.2 ;
        Charizard.velocityX = -15;
    }
}

function createMewto(){
    if (frameCount % Math.round(100 - score/100) === 0) {
        Mewto = createSprite(1100,440, 20, 20);
        Mewto.addImage(MewtoI);
        Mewto.scale = 0.1 ;
        Mewto.velocityX = -20;
    }
}