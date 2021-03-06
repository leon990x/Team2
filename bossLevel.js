bossScene.preload = preload;
bossScene.create = create;
bossScene.update = update;

function toGameover()
{
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
    this.load.image('manabar', 'Assets/Players/manabar.png');
    this.load.image('laser', 'Assets/Boss/laser.png');
    this.load.image('ball', 'Assets/Boss/ronaBall.png');

    // particles
    this.load.image('spark', 'Assets/Particles/particlesm.png');

    this.load.image('wp1', 'Assets/Boss/wp1.png')
    this.load.image('wp2', 'Assets/Boss/wp2.png')
    this.load.image('wp3', 'Assets/Boss/wp3.png')
    this.load.image('wp4', 'Assets/Boss/wp4.png')
    this.load.image('wp5', 'Assets/Boss/wp5.png')
    this.load.image('wp6', 'Assets/Boss/wp6.png')

    this.load.image('healthpack', 'Assets/Powers/heart.png')
    this.load.image('antibody', 'Assets/Powers/antibody.png')
    this.load.image('antibodyPowerup', 'Assets/Powers/antibodyPowerup.png')

    this.load.image('slash', 'Assets/Players/slash.png');
    this.load.image('fireball', 'Assets/Players/fireball.png');
    this.load.image('pow', 'Assets/Players/damage.png');

// Audio
  this.load.audio("bossm", "Assets/Audio/434856__emceeciscokid__retro-last-level-video-game-loop.mp3")
  this.load.audio("attack", "Assets/Powers/263011__dermotte__sword-02.mp3")
  this.load.audio("jump", "Assets/Audio/jump.mp3")
  this.load.audio("damage", "Assets/Audio/damage.mp3")
  this.load.audio("playerDamage", "Assets/Audio/458867__raclure__damage-sound-effect.mp3")
  this.load.audio("pickup", "Assets/Powers/478647__phenala__coin-pickup.mp3")

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
   boss = this.add.image(880, 480, "corona");
   boss.setScale(1.11);
   // Boss weakpoints
   theBoss = this.physics.add.staticGroup();
    //left shoulder
   theBoss.create(690, 490, "wp6").setScale(1.5); //1
   theBoss.create(600, 580, "wp5").setScale(1.5); //1
   theBoss.create(531, 850, "wp5").setScale(1.5); //2
    //right shoulder
   theBoss.create(1130, 500, "wp3").setScale(1.5); //4
   theBoss.create(1180, 570, "wp2").setScale(1.5); //5
   theBoss.create(1230, 850, "wp2").setScale(1.5); //5
    //left head
    theBoss.create(660, 270, "wp5").setScale(1.5); //2
    theBoss.create(670, 90, "wp6").setScale(1.5); //1
    //right head
    theBoss.create(1110, 270, "wp2").setScale(1.5); //5
    theBoss.create(1109, 90, "wp3").setScale(1.5); //4

    // used to cover the boss's weakpoints
   invisibleBoss = this.physics.add.group({
     key: "corona",
     setXY: {x: 880, y: 480},
     setScale: {x: 1.11, y: 1.11},
     allowGravity: false,
     immovable: true,
     visible: false
   });

   // Particles
   const spark = this.add.particles('spark');
   var emit = spark.createEmitter({
     x: 960,
     y: 460,
     speed: 900,
     lifespan: 1000,
     blendMode: 'ADD',
     tint: 0x50C878,
     frequency: -1,
     scale:{ start: 1, end: 0 },
     on: false,
   });

   cursors = this.input.keyboard.createCursorKeys();
   attackButton = this.input.keyboard.addKeys("Q");
   attackButton2 = this.input.keyboard.addKeys("W");
   redhealth = this.add.image(220, 60, 'red')
   healthbar = this.add.image(220, 60, 'statusbar')

   red = this.add.image(140, 120, 'red').setScale(0.5);
   manabar = this.add.image(140, 120, 'manabar').setScale(0.5);

   redhealth.setOrigin(0.45, 0.5)
   healthbar.setOrigin(0.45, 0.5)
   //Max 415
   healthbar.displayWidth = 415
   villainRedhealth = this.add.image(1700, 50, 'red')
   villainHealthbar = this.add.image(1700, 50, 'statusbar')
   villainHealthbar.displayWidth = 415
   boss_text = this.add.text(1170, 40, "Coronavirus").setScale(3);

   //Edge colliders
   ground = this.physics.add.staticGroup();
   floor = ground.create(959, 1050, "floor").setScale(1).refreshBody();
   ground.create(400, 750, 'platform');
   ground.create(870, 640, 'platform');
   ground.create(1350, 750, 'platform');

   ground.create(380, 440, 'platform');
   ground.create(870, 320, 'platform');
   ground.create(1350, 440, 'platform');


   // sounds
   bmusic= this.sound.add('bossm', {loop: true, volume: .5});
   bmusic.play({volume: vm});
   attack = this.sound.add('attack', {volume: 0.5})
   damage = this.sound.add('damage', {volume: 3})
   playerDamage = this.sound.add("playerDamage", {volume: 1})
   jump = this.sound.add('jump', {volume: 0.5})
   pickup = this.sound.add('pickup')


    // player code
    player = this.physics.add.sprite(100, 700, "whiteBC");
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);
    player.body.setGravityY(1600);

    // slash
    slash = this.physics.add.group({immovable: true, allowGravity: false});

    //fireball
    ball = this.physics.add.group({immovable:true, allowGravity: false});


   healthpacks = this.physics.add.group();
   antibodyPowerup = this.physics.add.group();

   this.physics.add.collider(antibodyPowerup, ground);
   this.physics.add.collider(healthpacks, ground);


   //Lasers


    var ct = 0;



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

     //boss code

     lasers = this.physics.add.group(
      {
          key: 'laser',
          repeat: 10,
          setXY: {x: 12, y: 0, stepX: 200},
          setScale: {x: 1, y: 1},
          setGravityY: -10,
          runChildUpdate: true
      }
      );

      this.time.addEvent({
        delay: 4000,
        callback: ()=>{
          Phaser.Actions.SetXY(lasers.getChildren(), 1950, 600, 300);
          Phaser.Actions.Call(lasers.getChildren(),

          function moveT(move){
            move.setVelocityY(200);
            lasers.children.iterate((child) =>{
              let x= Phaser.Math.Between(1910, 0);
              let y= -2000;
              child.setX(x);
              child.setY(y);

              child.update = function(){
                if(this.x <= 0 || this.y >= 1080) {
                  this.x = Phaser.Math.Between(1910, 0);
                  this.y = -10000;

                }
              };
            })
          })
        },
        loop: true
      })

     ronaBall = this.physics.add.group({
       delay: 200,
       key:"ball",
       repeat: 0,
       setXY:{x: 1920, y: Phaser.Math.Between(300, 600)},
       setScale: {x: 1, y: 1},
       allowGravity: false,
       runChildUpdate: true,
     });



     tentacles = this.physics.add.group({
       delay: 3000,
       key:"tentacle",
       repeat: 3,
       setXY:{x: 1920, y: 870, stepX: 300},
       setScale: {x: .5, y: .5},
       runChildUpdate: true,
     });


     this.time.addEvent({
       delay: 4000,
       callback: ()=>{
       Phaser.Actions.SetXY(tentacles.getChildren(), 1950, 800);
       Phaser.Actions.Call(tentacles.getChildren(),

       function moveT(move){
         move.setVelocityX(-220)
         // reset Tentacle attack
         tentacles.children.iterate((child) =>{

           let x= Phaser.Math.Between(1910, 0);
           child.setX(x);

           child.update = function(){
             Phaser.Actions.SetScale(invisibleBoss.getChildren(), 1.11, 1.11);
             if (this.x < 960)
             {
               spark.emitParticleAt(child.x, child.y, 1);
               Phaser.Actions.SetScale(invisibleBoss.getChildren(), 1.35, 1.35);
               villainshield = true;
               theBoss.children.iterate((child) => {
                   child.setVisible(true);

               });
             }
             if (this.x > 960)
             {
               theBoss.children.iterate((child) => {
                   spark.emitParticleAt(child.x, child.y, 1);
                   child.setVisible(false);
               });
               Phaser.Actions.SetScale(invisibleBoss.getChildren(), 1.11, 1.11);
               villainshield = false;
             }
             if(this.x <= 0) {
               this.x = 1950;

             }
           };
         })
       })
     }

   })


     Phaser.Actions.Call(ronaBall.getChildren(),

     function moveTS(move){
       move.setVelocityX(-800);
       // reset Tentacle attack
       ronaBall.children.iterate((child) =>{
         let x= Phaser.Math.Between(1910, 0);
         child.setX(x);

         child.update = function(){
           if (this.x <= 1870)
           {
             this.setVelocityX(-1050);
           }
           if(this.x <= 0) {
             this.x = 1950;
             this.y = Phaser.Math.Between(300, 600);

             this.setVelocityX(-50);

           }
         };
       })
     })

     this.physics.add.collider(tentacles, floor);
     //Powerups
     antibodyStorm = this.physics.add.group({immovable: true, allowGravity: false});

     this.physics.add.overlap(theBoss, slash,  attack_boss, null, this);
     this.physics.add.overlap(theBoss, ball, ball_boss, null, this);
     this.physics.add.overlap(player, antibodyPowerup, getAntibodyPowerup, null, this);
     this.physics.add.overlap(theBoss, antibodyStorm, boss_antibody_damage, null, this);
     this.physics.add.overlap(theBoss, player, boss_damage, null, this);
     this.physics.add.overlap(player, healthpacks, getHealth, null, this);

     this.physics.add.overlap(player, tentacles, tentacle_damage, null, this);
     this.physics.add.overlap(player, lasers, laser_damage, null, this);


     this.physics.add.overlap(player, ronaBall, tentacle_ss_damage, null, this);

     // damage image to attach to player
     hit = this.add.image(player.x, player.y, "pow");
     hit.visible = false;
}


function update()
{
  // hide pow asset if player is not attacking
  if(healthbar.displayWidth < 415/2 && healthbar.displayWidth > 100)
  {
    healthbar.setTintFill(0xffff00);
  }

  if(healthbar.displayWidth <= 100)
  {
    healthbar.setTintFill(0xff9900);
  }

  if(healthbar.displayWidth >= 415/2)
  {
    healthbar.clearTint();
  }


  setTimeout(

    function()
    {
      if(heroMana < 415 && manabar.displayWidth < 415)
      {
      manabar.x += 0.48 * 0.2;
      manabar.displayWidth +=  0.2;
      heroMana += 0.2;
      }
    }, 5000);

  if(attackButton.Q.isUp){
    hit.visible = false;
  }


  // walking

    if (cursors.left.isDown)
    {
        player.setVelocityX(-350);

        player.anims.play('leftWalking', true);

        hit.setX(player.x - 100).setY(player.y);

        lookLeft = true;

        // Jumping
            if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-1000);

            if (lookLeft == true){
                hit.setX(player.x - 100).setY(player.y);
                player.anims.play('jumpLeft');
                jump.play({volume: vfx});
        }

            if (lookLeft == false) {
                hit.setX(player.x + 100).setY(player.y);
                player.anims.play('jumpRight');
                jump.play({volume: vfx});
                lookLeft = false;
        }
        }

    }

    // Jumping
    if (cursors.up.isDown && player.body.touching.down)
    {

        player.setVelocityY(-1000);

        if (lookLeft == true) {
        hit.setX(player.x - 100).setY(player.y);
        player.anims.play('jumpLeft');
        jump.play({volume: vfx});
    }

        if (lookLeft == false) {
        hit.setX(player.x + 100).setY(player.y);
        player.anims.play('jumpRight');
        jump.play({volume: vfx});
        lookLeft = false;
    }
    }

    if (cursors.right.isDown)
    {
        player.setVelocityX(350);

        hit.setX(player.x + 100).setY(player.y);

        player.anims.play('rightWalking', true);

        lookLeft = false;
        // Jumping
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-1000);

            if (lookLeft == true){
            hit.setX(player.x - 100).setY(player.y);
            player.anims.play('jumpLeft');
            jump.play({volume: vfx});
        }

        if (!(cursors.up.isDown && player.body.touching.down)){
            hit.setX(player.x + 100).setY(player.y);
            player.anims.play('jumpRight');
            jump.play({volume: vfx});
            lookLeft = false;
        }
        }

    }

    // attacking
    if (!attackButton.Q.isDown) {
        qLifted = true;
    }


    if (attackButton.Q.isDown && qLifted && !attackButton2.W.isDown)
    {
        qLifted = false;

        if (lookLeft == true) {
            hit.setX(player.x - 100).setY(player.y);
            player.anims.play('attackLeft', true);
            attack.play({volume: vfx});

            var sl = slash.create((player.x - 45), player.y, "slash")
            sl.flipX = true;
            sl.setVelocityX(-500);
            setTimeout(function(){sl.disableBody(true, true);}, 90);
      }

        if (lookLeft == false) {
            hit.setX(player.x + 100).setY(player.y);
            player.anims.play('attackRight', true);
            attack.play({volume: vfx});
            lookLeft = false;

            var sl = slash.create((player.x + 45), player.y, "slash")
            sl.setVelocityX(500);
            setTimeout(function(){sl.disableBody(true, true);}, 90);
      }
    }

    // Ranged attacking
    if (!attackButton2.W.isDown) {
        wLifted = true;
    }


    if (attackButton2.W.isDown && wLifted && !attackButton.Q.isDown && manabar.displayWidth >= 83/2)
    {
        wLifted = false;



        if (lookLeft == true && heroMana > 0) {
            hit.setX(player.x - 500).setY(player.y);
            player.anims.play('attackLeft');
            attack.play({volume: vfx});

            manabar.x -= 0.48 * (83/2);
            manabar.displayWidth -= 83/2;
            heroMana -= 83/2;

            var fireball = ball.create((player.x), player.y, "fireball").setScale(1.2);
            fireball.flipX = true;
            fireball.setVelocityX(-650);
            setTimeout(function(){fireball.disableBody(true, true);}, 1500);
      }

        if (lookLeft == false && heroMana > 83) {
            hit.setX(player.x + 500).setY(player.y);
            player.anims.play('attackRight');
            attack.play({volume: vfx});
            lookLeft = false;

            manabar.x -= 0.48 * (83/2);
            manabar.displayWidth -= 83/2;
            heroMana -= 83/2;

            var fireball = ball.create((player.x), player.y, "fireball").setScale(1.2);
            fireball.setVelocityX(650);
            setTimeout(function(){fireball.disableBody(true, true);}, 1500);
      }
    }


    // turn direction
    if (!cursors.left.isDown && !cursors.right.isDown)
    {
        player.setVelocityX(0);

        if (lookLeft == true) {
        hit.setX(player.x - 100).setY(player.y);
        player.anims.play('turnLeft');
      }

        if (lookLeft == false) {
        hit.setX(player.x + 100).setY(player.y);
        player.anims.play('turnRight');
        lookLeft = false;
      }
    }

    // ending game
    if (heroHealth < 1) {
        this.sound.stopAll();
        this.scene.start(gameOver);
    }
    if (villainHealth < 1) {
        this.sound.stopAll();
        this.scene.start(win)
    }

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
  healthbar.x -= 0.43 * 0.4;
  healthbar.displayWidth -= 0.4;
  heroHealth -= 0.4;
  player.setTint(0xff0000);
  playerDamage.play({volume: vfx});

  if(heroHealth < 0)
  {
    heroHealth = 415;
    this.sound.stopAll();
    this.scene.start(gameOver);
  }
}



function tentacle_damage(player, tentacles)
{
  healthbar.x -= 0.43 * 2
  healthbar.displayWidth -= 2
  heroHealth -= 2
  player.setTint(0xff0000);
  tentacles.setTint(0x656565);
  playerDamage.play({volume: vfx});


  if(heroHealth < 0)
  {
    heroHealth = 415;
    this.sound.stopAll();
    this.scene.start(gameOver);
  }
}

function tentacle_ss_damage(player, ronaBall)
{
  healthbar.x -= 0.43 * 4
  healthbar.displayWidth -= 4
  heroHealth -= 4
  player.setTint(0xff0000);
  ronaBall.setTint(0x656565);
  if (villainHealth < 415)
  {
    villainHealthbar.x -= 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth += villainDamageIntensity
    villainHealth += villainDamageIntensity
  }
  playerDamage.play({volume: vfx});


  if(heroHealth < 0)
  {
    heroHealth = 415;
    this.sound.stopAll();
    this.scene.start(gameOver);
  }
}



function attack_boss(theBoss, slash)
{
  if (attackButton.Q.isDown && villainshield === true)
  {
    hit.visible = true;
    villainHealthbar.x += 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
  }

  if (attackButton2.W.isDown && villainshield === true)
  {
    hit.visible = true;
    villainHealthbar.x += 0.48 * .2
    villainHealthbar.displayWidth -= .2
    villainHealth -= .2
  }

  if(villainHealth <= 280 && villainHealth > 270)
  {
    villainHealth = 269;
    healthpacks.create(100, 20, "healthpack").setScale(1);
    healthpacks.create(100, 20, "healthpack").setScale(1);
    var hp = healthpacks.create(100, 20, "healthpack");
    hp.setScale(1);
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if(villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.sound.stopAll();
    this.scene.start(win);
    }
}

function ball_boss(theBoss, ball)
{
  hit.visible = true;
  villainHealthbar.x += 0.48 * villainDamageIntensity
  villainHealthbar.displayWidth -= villainDamageIntensity
  villainHealth -= villainDamageIntensity
}


function getHealth(player, healthpack)
{
  if(heroHealth < 415)
  {
    pickup.play({volume: vfx});
    healthbar.x += 0.43 * 20
    healthbar.displayWidth += 20
    heroHealth += 20
    player.setTint(0x00ff00)
    healthpack.disableBody(true, true);
  }

}

function boss_damage(theBoss, player, storm){
  if(villainHealth <= 180 && villainHealth > 178)
    {
      villainHealth = 176;
      var ap = antibodyPowerup.create(960, 20, "antibodyPowerup").setScale(0.25);
      ap.setBounce(0.5);
      ap.setCollideWorldBounds(true);
      ap.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  function boss_antibody_damage(theBoss, antibodyStorm)
{
    villainDamageIntensity = .02
    villainHealthbar.x += 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
    villainDamageIntensity = 2
    attack.play({volume: vfx});
  if(villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.sound.stopAll();
    this.scene.start(win);
    }
  }

  function getAntibodyPowerup(player, antibodyPowerup)
  {
    pickup.play({volume: vfx});
    var i;
    for (i = 0; i < 100; i++)
        {
        radius = Phaser.Math.FloatBetween(0, 200)
        theta = Phaser.Math.FloatBetween(0, 6.28)
        deltaX = radius * (Math.cos(theta))
        deltaY = radius * (Math.sin(theta))

        var storm = antibodyStorm.create((-200 + deltaX), (750 + deltaY), "antibody");
        storm.setScale(0.1);
        storm.angle = (Phaser.Math.FloatBetween(0, 359));
        storm.setVelocityY(0);
        storm.setVelocityX(400);
        antibodyPowerup.disableBody(true, true);
        }
  }
