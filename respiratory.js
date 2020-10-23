// let respiratory = new Phaser.Scene("respiratory");

respiratory.preload = p1;
respiratory.create = c1;
respiratory.update = u1;

var wave_count = 1;
var flaser_timer = 0;
var num_enemies;
var tB_health = 100;
var wave_text;
var defeated = 0;

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
    //this.load.image('tb', 'Assets/Respiratory/TBSprite.png');

// Audio
  this.load.audio("attack", "Assets/Audio/attack.mp3")
  this.load.audio("jump", "Assets/Audio/jump.mp3")
  this.load.audio("damage", "Assets/Audio/damage.mp3")

// SpriteSheets
    this.load.spritesheet('whiteBC',
        'Assets/Players/whiteBCSpriteR.png',
        { frameWidth: 110, frameHeight: 168 }
);
    this.load.spritesheet('LwhiteBC',
        'Assets/Players/LwhiteBCSR.png',
        { frameWidth: 110, frameHeight: 168 }
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
   wave_text = this.add.text(700, 240, "Tuberculosis:" + "\r\n" + " Wave " + wave_count + " of 3").setScale(4);
   boss_text = this.add.text(950, 40, "The Flu (Miniboss)").setScale(3);
   cursors = this.input.keyboard.createCursorKeys();
   attackButton = this.input.keyboard.addKeys("Q,P");
   redhealth = this.add.image(220, 60, 'red');
   healthbar = this.add.image(220, 60, 'statusbar');
   redhealth.setOrigin(0.45, 0.5);
   healthbar.setOrigin(0.45, 0.5);
   //Max 415
   healthbar.displayWidth = 415
   villainRedhealth = this.add.image(1700, 60, 'red')
   villainHealthbar = this.add.image(1700, 60, 'statusbar')
   villainHealthbar.displayWidth = 415

   //Edge colliders
   ground = this.physics.add.staticGroup();
   ground.create(959, 750, "platform");
   floor = ground.create(959, 1050, "floor").setScale(1).refreshBody();

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

   //TB Enemy
   tB = this.physics.add.group({
     delay: 200,
     key:"tb",
     repeat: 0,
     setXY:{x: 1900, y: 840, stepX: 100},
     setScale: {x: .5, y: .5},
     immovable: true,
     allowGravity: false,
     runChildUpdate: true,
   });

   this.anims.create({
     key: "crawl",
     frames: this.anims.generateFrameNumbers("tb", {start: 0, end: 1}),
     frameRate: 5,
     repeat: -1
   })

   // for(x = 0; x < 5; x++){tb_enemy = this.physics.add.sprite(1900-(10*x), 650+(10*x), "tb");}

   // tb_enemy.setBounce(0);
   // tb_enemy.setScale(.5);
   // tb_enemy.setCollideWorldBounds(true);

   // tb_enemy.body.setGravityY(1);
   this.physics.add.collider(tB, floor);
   this.physics.add.overlap(tB, player, player_damage, null, this);
   this.physics.add.overlap(tB, player, tb_damage, null, this);
   num_enemies = 1;

   // Flu MiniBoss
   flu_enemy = this.physics.add.sprite(1910, 720, "flu");
   flu_enemy.setScale(4);
   flu_enemy.setCollideWorldBounds(true);
   flu_enemy.setOrigin(0.5);
   flu_enemy.body.allowGravity = false;
   flu_enemy.body.immovable = true; //Makes it so nothing moves it
   this.physics.add.collider(flu_enemy, floor);
   this.physics.add.overlap(flu_enemy, player, flu_damage, null, this);

   moveFlu = this.tweens.add({
     targets: flu_enemy,
     x:1910,
     y: flu_enemy.y-300,
     duration: 2000,
     ease:"Linear",
     callbackScope: this,
     loop: -1,
     yoyo: true,
   });

   // Flu laser group
   this.time.addEvent({
     delay: 3000,
     callback: ()=>{
       flasers = this.physics.add.group({
         delay: 200,
         key:"flaser",
         repeat: 10,
         setXY:{x: flu_enemy.x, y: flu_enemy.y, stepX: 700},
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
                  if (flaser_timer <= 5 && wave_count < 4){
                  flaser_timer += 1;
                  }
                  this.x = flu_enemy.x;
                  this.y = Phaser.Math.Between(flu_enemy.y, 800);
                }
              };
            })
          })

           this.physics.add.overlap(flasers, player, player_damage, null, this);
     }
   })


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
  if (attackButton.Q.isDown || cursors.up.isDown){
  moveFlu.updateTo("y", player.y, true);
}
else{
  moveFlu.restart();
}

    console.log('num_enemies: ' + num_enemies + " wave " + wave_count)
  if (wave_count === 4 && num_enemies === 0){
    console.log("SCARY")

    wave_text.setText("  Wave Over:" + "\n" + "Defeat the Flu").setScale(4);
    wave_text.visible = true;
  }

if (flaser_timer > 4 && wave_count < 4){

  function spawn(enemy){
  tB.createMultiple({
    delay: 2000,
    key: 'tb',
    repeat: 0,
    setXY:{x: player.x - 300, y: 840, stepX: 100},
    setScale: {x: .5, y: .5},
    immovable: true,
    allowGravity: false,
    runChildUpdate: true,
  })
  console.log("BEGIN")
}
  if (num_enemies <= 4){
    spawn(tB.getChildren());
    num_enemies += 1;
    flaser_timer = 0;
  }
}
  // console.log(num_enemies);


  console.log(" timer: " + flaser_timer)
  // for (i = 0; i < 5; i ++){
    // setTimeout(() => console.log("First"), 6000)
  if(num_enemies < 5 && wave_count < 4){
      // wave_count -= 1;
      tB.createMultiple({
        delay: 2000,
        key: 'tb',
        repeat: 0,
        setXY:{x: 1860, y: 750, stepX: 100},
        setScale: {x: .5, y: .5},
        immovable: true,
        allowGravity: true,
        runChildUpdate: false,
      })

      tB.createMultiple({
        delay: 2000,
        key: 'tb',
        repeat: 0,
        setXY:{x: 500, y: 750, stepX: 100},
        setScale: {x: .5, y: .5},
        immovable: true,
        allowGravity: false,
        runChildUpdate: false,
      })

      // num_enemies += 1;
      // console.log('num_enemies: ' + num_enemies + " wave " + wave_count)

      // if (num_enemies == 0){
      // flaser_timer = 0;
  // }
  console.log(tB.getChildren().x);
  num_enemies += 2;
}




  if (num_enemies != 0 && wave_count < 4){
  Phaser.Actions.Call(tB.getChildren(),
  function moveEnemies(enemy){
    // console.log(enemy.x)
    if (enemy != undefined){
      if (player.x < enemy.x && player.body.velocity.x < 0) {
              // console.log("p left of e, mv left")
              // tb_enemy.body.velocity.x = 0;
              enemy.play("crawl", true);
              enemy.body.velocity.x = -100;;

          }
      if (player.x > enemy.x && player.body.velocity.x > 0) {
          // console.log("p right of e, mv right")
          // tb_enemy.body.velocity.x = 0;
          enemy.play("crawl", true);
          enemy.body.velocity.x = 100;
      }

      if (player.x < enemy.x && player.body.velocity.x === 0) {
              // console.log("p left of e, stopped")
              // tb_enemy.body.velocity.x = 0;
              enemy.play("crawl", true);
              enemy.body.velocity.x = -100;
          }

      // console.log(enemy.x)
      if (player.x > enemy.x && player.body.velocity.x === 0) {
              // console.log("p right of e, stopped")
              // tb_enemy.body.velocity.x = 0;
              enemy.play("crawl", true);
              enemy.body.velocity.x = 100;
          }

      // console.log(enemy.x)


      if (player.x < enemy.x && player.body.velocity.x > 0) {
              // console.log("p left of e, mv right")
              // tb_enemy.body.velocity.x = 0;
              enemy.play("crawl", true);
              enemy.body.velocity.x = -180;

          }
      if (player.x > enemy.x && player.body.velocity.x < 0) {
              // console.log("p right of e, mv left")
              // tb_enemy.body.velocity.x = 0;
              enemy.play("crawl", true);
              enemy.body.velocity.x = 180;
          }
      }
    })
   }
  // }

  // walking
    if (cursors.left.isDown)
    {
        player.setVelocityX(-350);

        player.anims.play('leftWalking', true);

        lookLeft = true;

        // Jumping
            if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-1600);

            if (lookLeft == true){
            player.anims.play('jumpLeft');
            this.sound.play("jump");
        }

            if (lookLeft == false) {
            player.anims.play('jumpRight');
            this.sound.play("jump");
            lookLeft = false;
        }
        }

        // attacking
        if (attackButton.Q.isDown)
        {

            if (lookLeft == true){
            player.anims.play('attackLeft');
            this.sound.play("attack")
        }

         if (!attackButton.Q.isDown) {
            player.anims.play('attackRight');
            this.sound.play("attack")
            lookLeft = false;
        }
        }
    }

    // Jumping
    if (cursors.up.isDown && player.body.touching.down)
    {

        player.setVelocityY(-1600);

        if (lookLeft == true) {
        player.anims.play('jumpLeft');
        this.sound.play("jump");
    }

        if (lookLeft == false) {
        player.anims.play('jumpRight');
        this.sound.play("jump");
        lookLeft = false;
    }
    }



    // attacking
    if (attackButton.Q.isDown)
    {
        // player.setVelocityY(0);

        if (lookLeft == true) {
        player.anims.play('attackLeft');
        this.sound.play("attack")
      }

        if (lookLeft == false) {
        player.anims.play('attackRight');
        this.sound.play("attack")
        lookLeft = false;
      }
    }
    //

    if (cursors.right.isDown)
    {
        player.setVelocityX(350);

        player.anims.play('rightWalking', true);

        lookLeft = false;
        // Jumping
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-1600);

            if (lookLeft == true){
            player.anims.play('jumpLeft');
            this.sound.play("jump");
        }

        if (!(cursors.up.isDown && player.body.touching.down)){
            player.anims.play('jumpRight');
            this.sound.play("jump");
            lookLeft = false;
        }
        }

    }

    // attacking
    if (attackButton.Q.isDown)
    {
        //player.setVelocityY(0);

        if (lookLeft == true) {
        player.anims.play('attackLeft');
        this.sound.play("attack")
      }

        if (lookLeft == false) {
        player.anims.play('attackRight');
        this.sound.play("attack")
        lookLeft = false;
      }
    }

    // turn direction
    if (!cursors.left.isDown && !cursors.right.isDown)
    {
        player.setVelocityX(0);

        if (lookLeft == true) {
        player.anims.play('turnLeft');
      }

        if (lookLeft == false) {
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

function tb_damage(player, tB){
  // var tB_children = tB.getChildren([0]);
  if (attackButton.Q.isDown){
    wave_text.visible = false;
    // villainHealthbar.x -= 0.43 * villainDamageIntensity
    // villainHealthbar.displayWidth -= villainDamageIntensity
    // villainHealth -= villainDamageIntensity
    tB_health -= 5;

    if (tB_health <= 0){
      tB.destroy();
      defeated += 1;
      num_enemies -= 1;
      tB_health = 100;
      this.sound.play("damage");
      if (defeated == 5){
        defeated = 0;
        console.log(wave_count, defeated)
        wave_count += 1;
      if (wave_count < 4){
        wave_text.visible = true;
        wave_text.setText("Tuberculosis:" + "\r\n" + " Wave " + wave_count + " of 3").setScale(4);
        }
      }
    }
  }
}

function flu_damage(player, flu_enemy){
  if (attackButton.Q.isDown && wave_count >= 4){
    wave_text.visible = false;
    villainHealthbar.x -= 0.48 * 4
    villainHealthbar.displayWidth -= 4
    villainHealth -= 4
    flu_enemy.setTint(0xff0000);
    this.sound.play("damage");
  }

  if(villainHealth <= 280 && villainHealth > 270)
  {
    villainHealth = 269;
    healthpacks.create(100, 20, "healthpack");
    healthpacks.create(100, 20, "healthpack");
    var hp = healthpacks.create(960, 20, "healthpack");
    hp.setScale(2);
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if (villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start(transition3);
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
function player_damage(player, tB)
{
  healthbar.x -= 0.43 * .3
  healthbar.displayWidth -= .3
  heroHealth -= .3
  player.setTint(0xff0000);
  this.sound.play("damage");

  if(heroHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start(gameOver);
  }

}

function spacer(){}
