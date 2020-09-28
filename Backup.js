bossScene = {
    preload: preload,
    create: create,
    update: update
        }

var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [bossScene]
};

var game = new Phaser.Game(config);

var player;
var ground;


function preload ()
{
    this.load.image('environment', 'Assets/Boss/Bossbackground.png');
    this.load.image('floor', 'Assets/Boss/Bossfloor.png');
    this.load.image('corona', 'Assets/Boss/corona.png');
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.image('red', 'Assets/Boss/redHealth.png');
    this.load.image('statusbar', 'Assets/Boss/health.png');
    this.load.image('laser', 'Assets/Boss/laser.png')
    this.load.spritesheet('whiteBC',
        'Assets/Players/whiteBC.png',
        { frameWidth: 55, frameHeight: 84 }
);

}

function create ()
{

    background = this.add.image(960, 540, 'environment');
    boss = this.add.image(780, 480, "corona");
    cursors = this.input.keyboard.createCursorKeys();
    redhealth = this.add.image(220, 60, 'red')
    healthbar = this.add.image(220, 60, 'statusbar')
    redhealth.setOrigin(0.45, 0.5)
    healthbar.setOrigin(0.45, 0.5)
    //Max 415
    healthbar.displayWidth = 415


    //Edge colliders
    ground = this.physics.add.staticGroup();
    floors = this.physics.add.staticGroup();
    floors.create(960, 950, "floor").setScale(2).refreshBody();
    ground.create(400, 650, 'platform');
    ground.create(800, 550, 'platform');
    ground.create(1200, 650, 'platform');

    // player code
    player = this.physics.add.sprite(100, 700, "whiteBC");
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, floors);
    this.physics.add.collider(player, ground);
    player.body.setGravityY(-200);

    //Lasers
    for(var i = 1; i < 10; i++)
    {
        
        lasers = this.physics.add.group(
            {
                key: 'laser',
                repeat: 16,
                setXY: {x: 12, y: 0, stepX: 100}
            }
        );
        setTimeout(function timer() {
            console.log("hello world");
          }, i * 3000);

        
        
    }

   


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
