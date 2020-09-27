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
    this.load.image('environment', 'Assets/Boss/Bossbackground.png');
    this.load.image('floor', 'Assets/Bossfloor.png');
    this.load.image('corona', 'Assets/Boss/corona.png'); 
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.spritesheet('player', 
        'Assets/Players/whiteBC.png',
        { frameWidth: 55, frameHeight: 84 }
);

}

function create ()
{
   this.add.image(0, 0, 'environment') 
}

cursors = this.input.keyboard.createCursorKeys();
function update()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

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