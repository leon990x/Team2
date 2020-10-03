

bossScene = {
    preload: preload,
    create: create,
    update: update,
    key: "bossScene"
        }

respiratory = new Phaser.Scene('respiratory1');
gameOver = new Phaser.Scene('go');

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
    scene: [bossScene, respiratory, gameOver]
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

//For Powerups
var heroHealIntensity = 42;
function toGameover()
{
  console.log("inside Function")
  heroHealth = 415;
  game.scene.start(gameOver);
}

function preload ()
{
    this.load.image('environment', 'Assets/Boss/Bossbackground.png');
    this.load.image('floor', 'Assets/Boss/Bossfloor.png');
    this.load.image('corona', 'Assets/Boss/corona.png');
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.image('tentacle', 'Assets/Boss/tentacle.png');
    this.load.image('red', 'Assets/Boss/redHealth.png');
    this.load.image('statusbar', 'Assets/Boss/health.png');
    this.load.image('laser', 'Assets/Boss/laser.png')

    this.load.image('wp1', 'Assets/Boss/wp1.png')
    this.load.image('wp2', 'Assets/Boss/wp2.png')
    this.load.image('wp3', 'Assets/Boss/wp3.png')
    this.load.image('wp4', 'Assets/Boss/wp4.png')
    this.load.image('wp5', 'Assets/Boss/wp5.png')
    this.load.image('wp6', 'Assets/Boss/wp6.png')

    this.load.image('healthpack', 'Assets/Powers/heart.png')
    this.load.image('antibody', 'Assets/Powers/antibody.png')

// Audio
  this.load.audio("attack", ["assets/Audio/attack.mp3"])
  this.load.audio("jump", ["assets/Audio/jump.wav"])
  this.load.audio("damage", ["assets/Audio/damage.mp3"])

// SpriteSheets
    this.load.spritesheet('whiteBC',
        'Assets/Players/whiteBCSprite.png',
        { frameWidth: 55, frameHeight: 84 }
);
    this.load.spritesheet('LwhiteBC',
        'Assets/Players/LwhiteBCS.png',
        { frameWidth: 55, frameHeight: 84 }
);

}

function create ()
{
   background = this.add.image(960, 540, 'environment');
   boss = this.add.image(780, 480, "corona");
   cursors = this.input.keyboard.createCursorKeys();
   attackButton = this.input.keyboard.addKeys("Q,P");
   redhealth = this.add.image(220, 60, 'red')
   healthbar = this.add.image(220, 60, 'statusbar')
   redhealth.setOrigin(0.45, 0.5)
   healthbar.setOrigin(0.45, 0.5)
   //Max 415
   healthbar.displayWidth = 415
   villainRedhealth = this.add.image(1700, 50, 'red')
   villainHealthbar = this.add.image(1700, 50, 'statusbar')
   villainHealthbar.displayWidth = 415

   //Edge colliders
   ground = this.physics.add.staticGroup();
   floor = ground.create(960, 950, "floor").setScale(2).refreshBody();
   ground.create(400, 650, 'platform');
   ground.create(800, 550, 'platform');
   ground.create(1200, 650, 'platform');

   ground.create(400, 380, 'platform');
   ground.create(800, 200, 'platform');
   ground.create(1200, 380, 'platform');

   ground.create(1600, 510, 'platform');

   // sounds
   attack = this.sound.add('attack')
   damage = this.sound.add('damage')
   jump = this.sound.add('jump')

   // player code
   player = this.physics.add.sprite(100, 700, "whiteBC");
   player.setBounce(0.3);
   player.setCollideWorldBounds(true);
   this.physics.add.collider(player, ground);
   player.body.setGravityY(1);

   //Powerups
   healthpacks = this.physics.add.group();
   this.physics.add.collider(healthpacks, ground);
   this.physics.add.overlap(player, healthpacks, getHealth, null, this);
   antibodyStorm = this.physics.add.group({
        key: 'antibody',
        repeat: 300,
        immovable: true,
        allowGravity: false
    });
    antibodyStorm.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setScale(0.1);
        child.angle = (Phaser.Math.FloatBetween(0, 359));
        child.setVelocityY(0);
        child.setVelocityX(400);
        child.setX(Phaser.Math.FloatBetween(-500, 0));
        child.setY(Phaser.Math.FloatBetween(50, 950));
    });

   // Boss weakpoints
   theBoss = this.physics.add.staticGroup();
    //left shoulder
   theBoss.create(640, 480, "wp1");
   theBoss.create(525, 570, "wp1");
   theBoss.create(470, 750, "wp2");
    //right shoulder
   theBoss.create(970, 500, "wp4");
   theBoss.create(1050, 570, "wp5");
   theBoss.create(1090, 750, "wp5");
    //left head
    theBoss.create(570, 270, "wp2");
    theBoss.create(610, 90, "wp1");
    //right head
    theBoss.create(990, 270, "wp5");
    theBoss.create(955, 90, "wp4");

   //Lasers


    var ct = 0;

    // //Interactions players and boss
    // this.physics.add.overlap(player, lasers, tentacle_damage, null, this);
    // this.physics.add.overlap(player, theBoss, boss_damage, null, this);

   this.anims.create({
       key: "leftWalking",
       frames: this.anims.generateFrameNumbers("LwhiteBC", { start: 1, end: 8}),
       frameRate: 10,
       repeat: -1
     });

     this.anims.create({
       key: "turnLeft",
       frames: [ { key: "LwhiteBC", frame: 0 } ],
       frameRate: 20
     });

     this.anims.create({
       key: "turnRight",
       frames: [ { key: "whiteBC", frame: 0 } ],
       frameRate: 20
     });

     this.anims.create({
       key: "rightWalking",
       frames: this.anims.generateFrameNumbers("whiteBC", { start: 1, end: 8 }),
       frameRate: 10,
       repeat: -1
     });

     this.anims.create({
       key: "jumpLeft",
       frames: this.anims.generateFrameNumbers("LwhiteBC", { start: 8, end: 10 }),
       frameRate: 10,
       repeat: -1
     });

     this.anims.create({
       key: "jumpRight",
       frames: this.anims.generateFrameNumbers("whiteBC", { start: 8, end: 10 }),
       frameRate: 10,
       repeat: -1
     });

     this.anims.create({
       key: "attackRight",
       frames: this.anims.generateFrameNumbers("whiteBC", { start: 12, end: 14 }),
       frameRate: 10,
       repeat: -1
     });

     this.anims.create({
       key: "attackLeft",
       frames: this.anims.generateFrameNumbers("LwhiteBC", { start: 12, end: 14 }),
       frameRate: 10,
       repeat: -1
     });

     // boss code
     lasers = this.physics.add.group(
      {
          key: 'laser',
          repeat: 8,
          setXY: {x: 12, y: 0, stepX: 140},
          runChildUpdate: true
      }
      );

      lasers.children.iterate((child) => {
        let y = Phaser.Math.Between(-200, -2000)
        let x = Phaser.Math.Between(200, 1800)

        child.setY(y)
        child.setX(x)
        child.setMaxVelocity(500)

        child.update = function() {
          if(this.y > 900) {
            this.y=0;

          }
        }

      });

     tentacles = this.physics.add.group({
       delay: 200,
       key:"tentacle",
       repeat: 2,
       setXY:{x: 1900, y: 870, stepX: 700},
       setScale: {x: .5, y: .5},
       runChildUpdate: true,
     });

     Phaser.Actions.SetXY(tentacles.getChildren(), 1950, 600, 300);
     Phaser.Actions.Call(tentacles.getChildren(),

     function moveT(move){
       move.setVelocityX(-150)
       // reset Tentacle attack
       tentacles.children.iterate((child) =>{
         let x= Phaser.Math.Between(1910, 0);
         // let y= Phaser.Math.Between(0, -200);
         child.setX(x);
         // child.setY(y);

         child.update = function(){
           // console.log("please")
           if(this.x <= 0) {
             // console.log(this.x, "ok");
             this.x = 1900;
           }
         };
       })
     })

     // time = this.time.addEvent({ startAt: 1, delay: 500, callback: moveT(move), callbackScope: this, loop: true});
     // tentacle = tentacles.create(960, 950, "tentacle");
     this.physics.add.collider(tentacles, floor);

     // this.physics.add.collider(tentacles, player);
     //Interactions players and boss

     this.physics.add.overlap(player, theBoss, boss_damage, null, this);
     this.physics.add.overlap(player, tentacles, tentacle_damage, null, this);
     this.physics.add.overlap(player, lasers, laser_damage, null, this);
}

// function to move all spawns of tentacles
function moveTentacles(tentacles){

}

function update()
{

  // walking
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('leftWalking', true);

        lookLeft = true;

        player.clearTint();
        boss.clearTint();

        // Jumping
            if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);

            if (lookLeft == true){
            player.anims.play('jumpLeft');
            this.sound.play("jump");
            player.clearTint();
            boss.clearTint();
        }

        else{
            player.anims.play('jumpRight');
            this.sound.play("jump")
            player.clearTint();
            boss.clearTint();
            lookLeft = false;
        }
        }

        // attacking
        else if (attackButton.Q.isDown)
        {
            // player.setVelocityY(0);

            if (lookLeft == true){
            player.anims.play('attackLeft');
            this.sound.play("attack");
            player.clearTint();
            boss.clearTint();
        }

        else{
            player.anims.play('attackRight');
            this.sound.play("attack");
            lookLeft = false;
            player.clearTint();
            boss.clearTint();
        }
        }
    }

    // Jumping
    else if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);

        if (lookLeft == true){
        player.anims.play('jumpLeft');
        this.sound.play("jump");
        player.clearTint();
        boss.clearTint();
    }

    else{
        player.anims.play('jumpRight');
        this.sound.play("jump");
        player.clearTint();
        boss.clearTint();
        lookLeft = false;
    }
    }



    // attacking
    else if (attackButton.Q.isDown)
    {
        // player.setVelocityY(0);

        if (lookLeft == true){
        player.anims.play('attackLeft');
        this.sound.play("attack");
        player.clearTint();
      }

      else{
        player.anims.play('attackRight');
        this.sound.play("attack");
        player.clearTint();
        lookLeft = false;
      }
    }
    //

    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('rightWalking', true);
        player.clearTint();
        boss.clearTint();

        lookLeft = false;
        // Jumping
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);

            if (lookLeft == true){
            player.anims.play('jumpLeft');
            this.sound.play("jump");
            player.clearTint();
            boss.clearTint();
        }

        else{
            player.anims.play('jumpRight');
            this.sound.play("jump");
            player.clearTint();
            boss.clearTint();
            lookLeft = false;
        }
        }

    }

    // attacking
    else if (attackButton.Q.isDown)
    {
        player.setVelocityY(0);

        if (lookLeft == true){
        player.anims.play('attackLeft');
        this.sound.play("attack");
        player.clearTint();
      }

      else{
        player.anims.play('attackRight');
        this.sound.play("attack");
        player.clearTint();
        lookLeft = false;
      }
    }

    // turn direction
    else
    {
        player.setVelocityX(0);

        if (lookLeft == true){
        player.anims.play('turnLeft');
      }

      else{
        player.anims.play('turnRight');
        lookLeft = false;
      }
    }

    // ending game
    if (heroHealth < 1) {
        return
    }
    if (villainHealth < 1) {
        return
    }
    // Hero taking damage
    // if (heroTakingDamage) {
    //     healthbar.x -= 0.43 * heroDamageIntensity
    //     healthbar.displayWidth -= heroDamageIntensity
    //     heroHealth -= heroDamageIntensity
    //     this.sound.play("damage");
    // }
    // Villain taking damage
    if (villainTakingDamage) {
        villainHealthbar.x += 0.48 * villainDamageIntensity
        villainHealthbar.displayWidth -= villainDamageIntensity
        villainHealth -= villainDamageIntensity
  }



}

function laser_damage(player, lasers)
{
  //change all 3 damage intensities when adjusting intensity
  healthbar.x -= 0.43 * 10;
  healthbar.displayWidth -= 10;
  heroHealth -= 10;
  player.setTint(0xff0000);
  this.sound.play("damage");
  console.log("inside if player damage")

  if(heroHealth < 0)
  {
    heroHealth = 415;
    this.scene.start(gameOver);
  }
}

function tentacle_damage(player, tentacles)
{
  healthbar.x -= 0.43 * 2
  healthbar.displayWidth -= 2
  heroHealth -= 2
  player.setTint(0xff0000);
  this.sound.play("damage");


  if(heroHealth < 0)
  {
    heroHealth = 415;
    this.scene.start(gameOver);
  }
}

  //replay


function boss_damage(player, theBoss)
{
  if (attackButton.Q.isDown)
  {
    villainHealthbar.x += 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
    boss.setTint(0xff0000)

  if(villainHealth <= 280 && villainHealth > 270)
  {
    var hp = healthpacks.create(100, 20, "healthpack");
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if(villainHealth <= 280 && villainHealth > 270)
  {
    var hp = healthpacks.create(960, 20, "healthpack");
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if(villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start("bossScene");
    }
  }

}

function getHealth(player, healthpack)
{
  if(heroHealth < 415)
  {
    healthbar.x += 0.43 * 20
    healthbar.displayWidth += 20
    heroHealth += 20
    player.setTint(0x00ff00)
    healthpack.disableBody(true, true);
  }

}
