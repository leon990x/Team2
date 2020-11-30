//New file to store scenes and global variables
//think of as command center

//Scenes
title = new Phaser.Scene("title");
credit = new Phaser.Scene("credit");
plot = new Phaser.Scene("plot");
plot2 = new Phaser.Scene("plot2");
tutorial = new Phaser.Scene("tutorial");
transition0 = new Phaser.Scene("transition0");
digestive = new Phaser.Scene("digestive")
transition1 = new Phaser.Scene("transition1");
nervous = new Phaser.Scene("nervous");
transition2 = new Phaser.Scene("transition2");
transition1 = new Phaser.Scene("t1");
nervous = new Phaser.Scene("nerve");
bossScene = new Phaser.Scene("bossScene");
transition3 = new Phaser.Scene("t3");
respiratory = new Phaser.Scene("respiratory");
transition3 = new Phaser.Scene("transition3");
bossScene = new Phaser.Scene("bossScene");

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
            debug: false
        }
    },
    scene: [title, credit, plot, plot2, tutorial, transition0, digestive, transition1, nervous, transition2, respiratory, transition3, bossScene, gameOver, win]
     // scene: respiratory

};

// game instance and global variables
var game = new Phaser.Game(config);

var player;
var ground;
var lookLeft = false;
var acceleration = 0;
var heroHealth = 415;
var heroMana = 415;
var villainHealth = 415;
var heroTakingDamage = false;
var villainTakingDamage = false;
var heroDamageIntensity = 2;
var villainDamageIntensity = 2;
var villainshield = false;
var hit;
var hitTimer = 0;

//For Powerups
var heroHealIntensity = 42;

//Volume Mixer
var vfx = 0.4; // controls sound effects
var vm = 0.3; // controls music
