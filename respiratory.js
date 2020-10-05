// let respiratory = new Phaser.Scene("respiratory");

respiratory.preload = p1
respiratory.create = c1
respiratory.update = u1

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
function p1()
{
    this.load.image('environment', 'Assets/Boss/Bossbackground.png');
    this.load.image('floor', 'Assets/Boss/Bossfloor.png');
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.image('red', 'Assets/Boss/redHealth.png');
    this.load.image('statusbar', 'Assets/Boss/health.png');
    this.load.image('healthpack', 'Assets/Boss/heart.png');
    this.load.image('flu', 'Assets/Enemy/Flu.png');
    this.load.image('flaser', 'Assets/Enemy/flu_laser.png');
    // this.load.image('tb', 'Assets/Respiratory/TBSprite.png');

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
  // Enemy SpriteSheets
  this.load.spritesheet('tb',
    'Assets/Respiratory/TBSprite.png',
    { frameWidth: 188, frameHeight: 204 }
);

}

function c1()
{
   background = this.add.image(960, 540, 'environment');
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
   floor = ground.create(960, 950, "floor").setScale(2).refreshBody();

   // sounds
   attack = this.sound.add('attack')
   damage = this.sound.add('damage')
   jump = this.sound.add('jump')

   // player code
   player = this.physics.add.sprite(100, 700, "whiteBC");
   player.setBounce(0.3);
   player.setCollideWorldBounds(true);
   this.physics.add.collider(player, floor);
   player.body.setGravityY(1);

   //TB Enemy
   tb_enemy = this.physics.add.sprite(1900, 650, "tb");
   tb_enemy.setBounce(0);
   tb_enemy.setScale(.5);
   tb_enemy.setCollideWorldBounds(true);
   this.physics.add.collider(tb_enemy, floor);
   tb_enemy.body.setGravityY(1);
   this.physics.add.overlap(tb_enemy, player, player_damage, null, this);
   this.physics.add.overlap(tb_enemy, player, tb_damage, null, this);

   // Flu MiniBoss
   flu_enemy = this.physics.add.sprite(1910, 650, "flu");
   flu_enemy.setScale(4);
   flu_enemy.setCollideWorldBounds(true);
   flu_enemy.setOrigin(0.5);
   flu_enemy.body.allowGravity = false;
   flu_enemy.body.immovable = true; //Makes it so nothing moves it
   this.physics.add.collider(flu_enemy, floor);
   this.physics.add.overlap(flu_enemy, player, flu_damage, null, this);

   this.tweens.add({
     targets: flu_enemy,
     x:1910,
     y: flu_enemy.y-40,
     duration: 2000,
     ease:"Linear",
     callbackScope: this,
     loop: -1,
     yoyo: true,
   });

   // Flu laser group
   flasers = this.physics.add.group({
     delay: 200,
     key:"flaser",
     repeat: 10,
     setXY:{x: 1900, y: 870, stepX: 700},
     setScale: {x: .5, y: .5},
     immovable: true,
     allowGravity: false,
     runChildUpdate: true,
   });

   Phaser.Actions.SetXY(flasers.getChildren(), 1950, 600, 300);
   Phaser.Actions.Call(flasers.getChildren(),

   function moveT(move){
     move.setVelocityX(-250)
     // reset Tentacle attack
     flasers.children.iterate((child) =>{
       let x= Phaser.Math.Between(1910, 0);
       let y= Phaser.Math.Between(flu_enemy.y, 800);
       child.setX(x);
       child.setY(y);

       child.update = function(){
         // console.log("please")
         if(this.x <= 0 || this.y >= 1080) {
           // console.log(this.x, "ok");
           this.x = flu_enemy.x;
           this.y = Phaser.Math.Between(flu_enemy.y, 800);
         }
       };
     })
   })

    this.physics.add.overlap(flasers, player, player_damage, null, this);

   //Powerups
   healthpacks = this.physics.add.group();
   this.physics.add.collider(healthpacks, ground);
   this.physics.add.overlap(player, healthpacks, getHealth, null, this);


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
}

function u1()
{
    if (tb_enemy != undefined){
      if (player.x < tb_enemy.x && player.body.velocity.x < 0) {
              console.log("p left of e, mv left")
              // tb_enemy.body.velocity.x = 0;
              tb_enemy.body.velocity.x = -150;

          }
      // if (player.x > tb_enemy.x && player.body.velocity.x > 0) {
      //         console.log("p right of e, mv right")
      //         // tb_enemy.body.velocity.x = 0;
      //         tb_enemy.body.velocity.x *= -1;
      //     }

////////////////////////////////////////////////////////////////////
      if (player.x < tb_enemy.x && player.body.velocity.x === 0) {
              console.log("p left of e, stopped")
              // tb_enemy.body.velocity.x = 0;
              tb_enemy.body.velocity.x = -100;
          }

      console.log(tb_enemy.x)

      // if (player.x >= tb_enemy.x && player.body.velocity.x === 0) {
      //         console.log("p right of e, stopped")
      //         tb_enemy.body.velocity.x *= -1;
      //         }
//////////////////////////////////////////////////////////////////
      if(tb_enemy.x < 480)
      {
        tb_enemy.body.velocity.x = 100;
      }



      if (player.x < tb_enemy.x && player.body.velocity.x > 0) {
              console.log("p left of e, mv right")
              // tb_enemy.body.velocity.x = 0;
              tb_enemy.body.velocity.x = -150;

          }
      if (player.x > tb_enemy.x && player.body.velocity.x < 0) {
              console.log("p right of e, mv left")
              // tb_enemy.body.velocity.x = 0;
              tb_enemy.body.velocity.x = 150;
          }
      }

      //     console.log("p stopped")
      //     if (player.x < tb_enemy.x){tb_enemy.body.velocity.x = -150;}
      //     if (player.x === tb_enemy.x){tb_enemy.body.velocity.x = 0;}
      //     if (player.x > tb_enemy.x){tb_enemy.body.velocity.x = 150;}
      //     if (player.x === tb_enemy.x){tb_enemy.body.velocity.x = 0;}
      //     }
      // if (player.x === tb_enemy.x && player.body.velocity.x === 0) {
      //         tb_enemy.body.velocity.x = 0;
      //     }


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

    // Hero taking damage
    if (heroTakingDamage) {
        healthbar.x -= 0.43 * heroDamageIntensity
        healthbar.displayWidth -= heroDamageIntensity
        heroHealth -= heroDamageIntensity
        this.sound.play("damage");
    }
}

function tb_damage(player, tb_enemy){
  if (attackButton.Q.isDown){
    villainHealthbar.x -= 0.43 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
    this.sound.play("damage");
  }
}

function flu_damage(player, tb_enemy){
  if (attackButton.Q.isDown){
    villainHealthbar.x -= 0.43 * 4
    villainHealthbar.displayWidth -= 4
    villainHealth -= 4
    this.sound.play("damage");
  }

  if (villainHealth < 0)
  {
    this.scene.start("bossScene");
  }
}

function player_damage(player, tb_enemy)
{
  healthbar.x -= 0.43 * .5
  healthbar.displayWidth -= .5
  heroHealth -= .5
  this.sound.play("damage");

  if(heroHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start(gameOver);
  }

}
