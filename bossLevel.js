
bossScene.preload = preload;
bossScene.create = create;
bossScene.update = update;

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
    this.load.image('antibodyPowerup', 'Assets/Powers/antibodyPowerup.png')

// Audio
  this.load.audio("attack", "Assets/Audio/attack.mp3")
  this.load.audio("jump", "Assets/Audio/jump.mp3")
  this.load.audio("damage", "Assets/Audio/damage.mp3")

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
   boss_text = this.add.text(1200, 40, "Coronavirus").setScale(3);

   //Edge colliders
   ground = this.physics.add.staticGroup();
   floor = ground.create(959, 1050, "floor").setScale(1).refreshBody();
   ground.create(400, 770, 'platform');
   ground.create(870, 650, 'platform');
   ground.create(1350, 770, 'platform');

   ground.create(380, 480, 'platform');
   ground.create(870, 350, 'platform');
   ground.create(1350, 480, 'platform');

   ground.create(1600, 610, 'platform');

   // sounds
   attack = this.sound.add('attack')
   damage = this.sound.add('damage')
   jump = this.sound.add('jump')

   // Boss weakpoints
   theBoss = this.physics.add.staticGroup();
    //left shoulder
   theBoss.create(700, 480, "wp6").setScale(1.5); //1
   theBoss.create(600, 570, "wp5").setScale(1.5); //1
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

    // player code
    player = this.physics.add.sprite(100, 700, "whiteBC");
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, ground);
    player.body.setGravityY(1);


   healthpacks = this.physics.add.group();
   antibodyPowerup = this.physics.add.group();

   this.physics.add.collider(antibodyPowerup, ground);
   this.physics.add.collider(healthpacks, ground);


   //Lasers


    var ct = 0;

    // //Interactions players and boss
    // this.physics.add.overlap(player, lasers, tentacle_damage, null, this);


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
          setScale: {x: 1, y: 1},
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
       repeat: 1,
       setXY:{x: 1920, y: 870, stepX: 300},
       setScale: {x: .5, y: .5},
       runChildUpdate: true,
     });

     // Phaser.Actions.SetXY(tentacles.getChildren(), 1950, 800);
     Phaser.Actions.Call(tentacles.getChildren(),

     function moveT(move){
       move.setVelocityX(-120)
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
             this.x = 1950;
           }
         };
       })
     })
     this.physics.add.collider(tentacles, floor);
     //Powerups
     antibodyStorm = this.physics.add.group({immovable: true, allowGravity: false});

     this.physics.add.overlap(theBoss, player, boss,  attack_boss, null, this);
     this.physics.add.overlap(player, antibodyPowerup, getAntibodyPowerup, null, this);
     this.physics.add.overlap(theBoss, antibodyStorm, boss, boss_antibody_damage, null, this);
     this.physics.add.overlap(theBoss, player, boss, boss_damage, null, this);
     this.physics.add.overlap(player, healthpacks, getHealth, null, this);

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
        this.scene.start(respiratory);
    }
    if (villainHealth < 1) {
        this.scene.start(win)
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
  healthbar.x -= 0.43 * 1;
  healthbar.displayWidth -= 1;
  heroHealth -= 1;
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


function attack_boss(theBoss, player, boss)
{
  if (attackButton.Q.isDown)
  {
    villainHealthbar.x += 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
    boss.setTint(0xff0000)

  if(villainHealth <= 280 && villainHealth > 270)
  {
    villainHealth = 269;
    healthpacks.create(100, 20, "healthpack");
    healthpacks.create(100, 20, "healthpack");
    var hp = healthpacks.create(100, 20, "healthpack");
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if(villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start(win);
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

  function boss_antibody_damage(theBoss, antibodyStorm, boss)
{
    villainDamageIntensity = .02
    villainHealthbar.x += 0.48 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
    boss.setTint(0xff0000)
    villainDamageIntensity = 2
    this.sound.play("attack");
  if(villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start(win);
    }
  }

  function getAntibodyPowerup(player, antibodyPowerup)
  {
    var i;
    for (i = 0; i < 500; i++)
        {
        var storm = antibodyStorm.create(Phaser.Math.FloatBetween(-500, 0), Phaser.Math.FloatBetween(350, 750), "antibody");
        storm.setScale(0.1);
        storm.angle = (Phaser.Math.FloatBetween(0, 359));
        storm.setVelocityY(0);
        storm.setVelocityX(400);
        antibodyPowerup.disableBody(true, true);
        }
  }
