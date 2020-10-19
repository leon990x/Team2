//New file to store scenes and global variables
//think of as command center

//Scenes
tutorial = new Phaser.Scene("tutorial");
transition1 = new Phaser.Scene("t1");
bossScene = new Phaser.Scene("bossScene");
transition3 = new Phaser.Scene("t3");
respiratory = new Phaser.Scene("respiratory");
gameOver = new Phaser.Scene("gameOver");
win = new Phaser.Scene("win");

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [tutorial, transition1, respiratory, transition3, bossScene, gameOver, win]
};

// game instance and global variables
var game = new Phaser.Game(config);

var player;
var ground;
var lookLeft = false;
var acceleration = 0;
var heroHealth = 415;
var villainHealth = 415;
var heroTakingDamage = false;
var villainTakingDamage = false;
var heroDamageIntensity = 2;
var villainDamageIntensity = 2;
// var wpTimer;

//For Powerups
var heroHealIntensity = 42;
