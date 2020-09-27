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
var player;

function preload ()
{
    this.load.image('environment', 'Assets/Boss/Bossbackground.png');
    this.load.image('floor', 'Assets/Boss/Bossfloor.png');
    this.load.image('corona', 'Assets/Boss/corona.png');
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.spritesheet('whiteBC',
        'Assets/Players/whiteBC.png',
        { frameWidth: 55, frameHeight: 84 }
);

}

function create ()
{
   this.add.image(0, 0, 'environment')
   cursors = this.input.keyboard.createCursorKeys();
   player = this.physics.add.sprite(100, 450, "whiteBC");
   playerCreation();
}

function playerCreation(){
    //Edge colliders
    // this.playerCollider = this.player.setCollideWorldBounds(true);
    // this.physics.add.collider(player, this.platforms);
  this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("whiteBC", { start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [ { key: "whiteBC", frame: 0 } ],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("whiteBC", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
  }

function update()
{
    if (cursors.left.isDown)
    {
        this.player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

}
