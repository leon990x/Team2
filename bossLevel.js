bossScene = {
    preload: preload,
    create: create,
    update: update
        }

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [bossScene]
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'Assets/Boss/Bossbackground.png');
    this.load.image('ground', 'assets/Bossfloor.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
);
}