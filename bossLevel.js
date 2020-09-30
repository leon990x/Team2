bossScene = {
    preload: preload,
    create: create,
    update: update,
    key: "bossScene"
        }

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
    scene: [bossScene]
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
var heroDamageIntensity = 6;
var villainDamageIntensity = 2;

//For Powerups
var heroHealIntensity = 42;

var fibonacci_series = function (n)
{
  if (n===1)
  {
    return [0, 1];
  }
  else
  {
    var s = fibonacci_series(n - 1);
    s.push(s[s.length - 1] + s[s.length - 2]);
    return s;
  }
};

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

    this.load.image('healthpack', 'Assets/Boss/heart.png')

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
   villainRedhealth = this.add.image(1700, 60, 'red')
   villainHealthbar = this.add.image(1700, 60, 'statusbar')
   villainHealthbar.displayWidth = 415

   //Edge colliders
   ground = this.physics.add.staticGroup();
   ground.create(960, 950, "floor").setScale(2).refreshBody();
   ground.create(400, 650, 'platform');
   ground.create(800, 550, 'platform');
   ground.create(1200, 650, 'platform');

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
   this.physics.add.collider(player, healthpacks, getHealth, null, this);

   // Boss weakpoints
   theBoss = this.physics.add.staticGroup();
   theBoss.create(640, 480, "wp1");
   theBoss.create(525, 570, "wp1");
   theBoss.create(470, 750, "wp2");

   //Lasers
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

    var ct = 0;



    function resetter()
    {
      while(true)
      {
        ct = ct + 1
        if(ct === 10){return true}
        if(ct === 20){lasers.runChildUpdate = false}
        if(ct === 30){ct = 0}
      }
    }

    //Interactions players and boss
    this.physics.add.overlap(player, lasers, player_damage, null, this);
    this.physics.add.overlap(player, theBoss, boss_damage, null, this);

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
     tentacles = this.physics.add.group({
       key:"tentacle",
       repeat: 2,
       setXY:{x: 600, y: 470, stepX: 500}
     });
     time = this.time.addEvent({ startAt: 1, delay: 500, callback: moveTentacles(tentacles), callbackScope: this, loop: true});
     // tentacle = tentacles.create(960, 950, "tentacle");
     this.physics.add.collider(tentacles, ground);
     // this.physics.add.collider(tentacles, player);
     // this.physics.add.overlap(player, tentacles, this.damage, null, this);
   // tentacles.x += acceleration;
   // ground.create(400, 650, '');
   // ground.create(800, 550, 'platform');
   // ground.create(1200, 650, 'platform');
}

// function to move all spawns of tentacles
function moveTentacles(tentacles){
  Phaser.Actions.SetXY(tentacles.getChildren(), 1920, 500, 200);
  Phaser.Actions.Call(tentacles.getChildren(),

function(move){
  move.setVelocityX(-300)
  // reset Tentacle attack
  tentacles.children.iterate((child) =>{
    let x= Phaser.Math.Between(1920, 0);
    // let y= Phaser.Math.Between(0, -200);
    child.setX(x);
    // child.setY(y);

    child.update = function(){
      console.log("please")
    if(this.x == 0 && y==0) {
      this.x = 1900;
    }
  };
})
})

}

function update()
{

  // walking
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('leftWalking', true);

        lookLeft = true;

        // Jumping
            if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);

            if (lookLeft == true){
            player.anims.play('jumpLeft');
            this.sound.play("jump");
        }

        else{
            player.anims.play('jumpRight');
            this.sound.play("jump");
            lookLeft = false;
        }
        }

        // attacking
        else if (attackButton.Q.isDown)
        {
            // player.setVelocityY(0);

            if (lookLeft == true){
            player.anims.play('attackLeft');
            this.sound.play("attack")
        }

        else{
            player.anims.play('attackRight');
            this.sound.play("attack")
            lookLeft = false;
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
    }

    else{
        player.anims.play('jumpRight');
        this.sound.play("jump");
        lookLeft = false;
    }
    }



    // attacking
    else if (attackButton.Q.isDown)
    {
        // player.setVelocityY(0);

        if (lookLeft == true){
        player.anims.play('attackLeft');
        this.sound.play("attack")
      }

      else{
        player.anims.play('attackRight');
        this.sound.play("attack")
        lookLeft = false;
      }
    }
    //

    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('rightWalking', true);

        lookLeft = false;
        // Jumping
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);

            if (lookLeft == true){
            player.anims.play('jumpLeft');
            this.sound.play("jump");
        }

        else{
            player.anims.play('jumpRight');
            this.sound.play("jump");
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
        this.sound.play("attack")
      }

      else{
        player.anims.play('attackRight');
        this.sound.play("attack")
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
    if (heroTakingDamage) {
        healthbar.x -= 0.43 * heroDamageIntensity
        healthbar.displayWidth -= heroDamageIntensity
        heroHealth -= heroDamageIntensity
        this.damage.play();
    }
    // Villain taking damage
    if (villainTakingDamage) {
        villainHealthbar.x += 0.48 * villainDamageIntensity
        villainHealthbar.displayWidth -= villainDamageIntensity
        villainHealth -= villainDamageIntensity
  }



}

function player_damage(player, lasers)
{
  healthbar.x -= 0.43 * heroDamageIntensity
  healthbar.displayWidth -= heroDamageIntensity
  heroHealth -= heroDamageIntensity
  // var hp = healthpacks.create(100, 20, "healthpack");
  this.sound.play("damage");

  if(heroHealth === 0)
  {
    bossScene.scene.restart()
  }

  //replay
}

function boss_damage(player, theBoss)
{
  if (attackButton.Q.isDown)
  {
    villainHealthbar.x += 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity

    if(villainHealth === 390)
    {
      var hp = healthpacks.create(100, 20, "healthpack");
      hp.setBounce(0.5);
      hp.setCollideWorldBounds(true);
      hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

}

function getHealth(player, healthpack)
{
  healthbar.x += 0.43 * heroHealIntensity
  healthbar.displayWidth += heroHealIntensity
  heroHealth += heroHealIntensity
}