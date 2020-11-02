// let respiratory = new Phaser.Scene("respiratory");

tutorial.preload = p1;
tutorial.create = c1;
tutorial.update = u1;

// var player;
// var ground;
// var lookLeft = false;
// var acceleration = 0;
// var heroHealth = 415;
// var villainHealth = 415;
// var heroTakingDamage = false;
// var villainTakingDamage = false;
// var heroDamageIntensity = 2;
// var villainDamageIntensity = 2;
//
// //For Powerups
// var heroHealIntensity = 42;
var progression = 0;
var path = "none";
var staph_still_health = 100;
var num_staph = 0;

function p1()
{
    this.load.image('environment1', 'Assets/Tutorial/tutbackground.png');
    this.load.image('floor1', 'Assets/Tutorial/tutfloor.png');
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.image('red', 'Assets/Boss/redHealth.png');
    this.load.image('statusbar', 'Assets/Boss/health.png');
    this.load.image('healthpack', 'Assets/Boss/heart.png');
    this.load.image('staph', 'Assets/Enemy/staph.png');
    this.load.image('antibodyPowerup', 'Assets/Powers/antibodyPowerup.png');
    this.load.image('antibody', 'Assets/Powers/antibody.png');
    this.load.image('sebaceousGland', 'Assets/Tutorial/sebGland.png');
    this.load.image('slash', 'Assets/Players/slash.png');
    this.load.image('pow', 'Assets/Players/damage.png');
    // this.load.image('tb', 'Assets/Respiratory/TBSprite.png');

// Audio
  this.load.audio("attack", "Assets/Powers/263011__dermotte__sword-02.mp3")
  this.load.audio("jump", "Assets/Audio/jump.mp3")
  this.load.audio("damage", "Assets/Audio/damage.mp3")
  this.load.audio("playerDamage", "Assets/Audio/458867__raclure__damage-sound-effect.mp3")
  this.load.audio("tutorialm", "Assets/Tutorial/265308__volvion__8-bit-bossfight.mp3")
  this.load.audio("pickup", "Assets/Powers/478647__phenala__coin-pickup.mp3")

// SpriteSheets
    this.load.spritesheet('whiteBC',
        'Assets/Players/whiteBCSpriteR.png',
        { frameWidth: 110, frameHeight: 168 }
);
    this.load.spritesheet('LwhiteBC',
        'Assets/Players/LwhiteBCSR.png',
        { frameWidth: 110, frameHeight: 168 }
);


}

function c1()
{
   background = this.add.image(0, 0, 'environment1');
   background.setOrigin(0, 0);
   cursors = this.input.keyboard.createCursorKeys();
   attackButton = this.input.keyboard.addKeys("Q,P");
   nextButton = this.input.keyboard.addKeys("W");
   otherNextButton = this.input.keyboard.addKeys("E");
   redhealth = this.add.image(220, 60, 'red')
   healthbar = this.add.image(220, 60, 'statusbar')
   redhealth.setOrigin(0.45, 0.5)
   healthbar.setOrigin(0.45, 0.5)
   //Max 415
   healthbar.displayWidth = 415


   //Edge colliders
   ground = this.physics.add.staticGroup();
   floor = ground.create(960, 940, "floor1");
   gland = this.physics.add.staticGroup();


   // sounds
   tmusic= this.sound.add('tutorialm', {loop: true, volume: 1});
   this.sound.play("tutorialm");
   attack = this.sound.add('attack', {volume: 1})
   damage = this.sound.add('damage', {volume: 3})
   playerDamage = this.sound.add("playerDamage", {volume: 1})
   jump = this.sound.add('jump', {volume: 1})
   pickup = this.sound.add('pickup')

   // prompt
   this.promptl1 = this.add.text(520, 50, "did it work?", {font: "40px Arial", fill: "black"})
   this.promptl2 = this.add.text(820, 130, "", {font: "40px Arial", fill: "black"})

   // player code
   player = this.physics.add.sprite(100, 700, "whiteBC");
   player.setBounce(0.3);
   player.setCollideWorldBounds(true);
   this.physics.add.collider(player, floor);
   player.body.setGravityY(2400);

   // slash
   slash = this.physics.add.group({immovable: true, allowGravity: false});

   //Powerups
   healthpacks = this.physics.add.group();
   antibodyPowerup = this.physics.add.group();

   this.physics.add.collider(antibodyPowerup, ground);
   this.physics.add.collider(healthpacks, ground);
   this.physics.add.overlap(player, healthpacks, getHealth, null, this);
   this.physics.add.overlap(player, antibodyPowerup, getAntibodyPowerup, null, this);
   //this.physics.add.overlap(theBoss, antibodyStorm, boss_antibody_damage, null, this);
   antibodyStorm = this.physics.add.group({immovable: true, allowGravity: false});


   //Staph still
   staph_still = this.physics.add.group();
   this.physics.add.collider(staph_still, ground);
   this.physics.add.overlap(staph_still, player, player_damage, null, this);
   this.physics.add.overlap(staph_still, slash, staph_still_damage, null, this);

   //Staph move
   staph_move = this.physics.add.group();
   this.physics.add.collider(staph_move, ground);
   this.physics.add.overlap(staph_move, player, player_damage, null, this);
   this.physics.add.overlap(staph_move, slash, staph_move_damage, null, this);
   this.physics.add.overlap(staph_move, antibodyStorm, staph_antibody_damage, null, this);

   // damage image to attach to player
   hit = this.add.image(player.x, player.y, "pow");
   hit.visible = false;




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
       frameRate: 5,
       repeat: -1
     });

     this.anims.create({
       key: "attackLeft",
       frames: this.anims.generateFrameNumbers("LwhiteBC", { start: 12, end: 14 }),
       frameRate: 5,
       repeat: -1
     });


}


function u1()
{
  // hide pow asset if player is not attacking
  if(attackButton.Q.isUp){
    hit.visible = false;
  }

    if (progression == 0) {
        this.promptl1.setText("Welcome to Fightosis! Press the W key to continue.");

        if (nextButton.W.isDown) {
            progression += 1;
        }

    }

    if (progression == 1) {
        this.promptl1.setText("Use the left and right arrow keys to explore your environment");
        this.promptl1.x = 500
        this.promptl2.setText("Press the E key to continue.");
        this.promptl2.x = 500

        if (otherNextButton.E.isDown) {
            progression += 1;
        }
    }

    if (progression == 2) {
        this.promptl1.setText("Press the up arrow to jump.");
        this.promptl2.setText("");

        if (cursors.up.isDown) {
            progression += 1;
        }
    }

    if (progression == 3) {
        this.promptl1.setText("Press the Q key to attack.");


        if (attackButton.Q.isDown) {
            progression += 1;
            num_staph = 1
            var wave1 = staph_still.create(1100, 500, "staph");
        }
    }

    if (progression == 4) {
        this.promptl1.setText("Your patient has a staph infection!");
        this.promptl2.setText("Attack the staph to cure the patient.");
        this.promptl2.x = 500


        if (staph_still_health <= 0) {
            progression += 1;
            for (i = 0; i < 5; i++)
            {
            var hp = healthpacks.create(Phaser.Math.Between(100, 200), 0, "healthpack");
            hp.setBounce(0.5);
            hp.setCollideWorldBounds(true);
            hp.setVelocity(0, 20);
            }
        }
    }

    if (progression == 5) {
        this.promptl1.setText("You're damaged.");
        this.promptl2.setText("Pick up healthpacks to heal.");


        if (player.x < 175) {
            progression += 1;
            num_staph = 6
            this.sound.play("pickup");
            var ap = antibodyPowerup.create(250, 20, "antibodyPowerup").setScale(0.25);
            ap.setBounce(0.5);
            ap.setCollideWorldBounds(true);
            ap.setVelocity(0, 20);
            var i;
            for (i = 0; i < 7; i++)
                {
                var wave2 = staph_move.create(1500 + (100 * i), 500, "staph");
                wave2.setVelocityX(-40);
                wave2.health = 50;
                }

        }
    }

    if (progression == 6) {
        this.promptl1.setText("A huge wave of enemies is approaching!");
        this.promptl2.setText("Collect the antibody powerup to unleash an antibody storm");

        if (num_staph == 0) {
            progression += 1;
            sebaceousGland = gland.create(1750, 850, "sebaceousGland");


        }
    }

    if (progression == 7) {
        this.promptl1.setText("Nice job!");
        this.promptl2.setText("Go to the sebaceous gland and continue healing the patient.");

        if (player.x > 1600) {
            this.promptl1.setText("Done");
            tmusic.stop();
<<<<<<< HEAD
            this.scene.start(transition0);
=======
            this.scene.start(nervous);
>>>>>>> 8c2b7442bc335d2ba8263c23ceb5dcce54914ada

        }
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
                player.setVelocityY(-1600);

            if (lookLeft == true){
                hit.setX(player.x - 100).setY(player.y);
                player.anims.play('jumpLeft');
                this.sound.play("jump");
        }

            if (lookLeft == false) {
                hit.setX(player.x + 100).setY(player.y);
                player.anims.play('jumpRight');
                this.sound.play("jump");
                lookLeft = false;
        }
        }

    }

    // Jumping
    if (cursors.up.isDown && player.body.touching.down)
    {

        player.setVelocityY(-1600);

        if (lookLeft == true) {
        hit.setX(player.x - 100).setY(player.y);
        player.anims.play('jumpLeft');
        this.sound.play("jump");
    }

        if (lookLeft == false) {
        hit.setX(player.x + 100).setY(player.y);
        player.anims.play('jumpRight');
        this.sound.play("jump");
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
            player.setVelocityY(-1600);

            if (lookLeft == true){
            hit.setX(player.x - 100).setY(player.y);
            player.anims.play('jumpLeft');
            this.sound.play("jump");
        }

        if (!(cursors.up.isDown && player.body.touching.down)){
            hit.setX(player.x + 100).setY(player.y);
            player.anims.play('jumpRight');
            this.sound.play("jump");
            lookLeft = false;
        }
        }

    }

    // attacking
    if (!attackButton.Q.isDown) {
        qLifted = true;
    }


    if (attackButton.Q.isDown && qLifted)
    {
        qLifted = false;

        if (lookLeft == true) {
            hit.setX(player.x - 100).setY(player.y);
            player.anims.play('attackLeft', true);
            this.sound.play("attack")

            var sl = slash.create((player.x - 45), player.y, "slash")
            sl.flipX = true;
            sl.setVelocityX(-500);
            setTimeout(function(){sl.disableBody(true, true);}, 90);
      }

        if (lookLeft == false) {
            hit.setX(player.x + 100).setY(player.y);
            player.anims.play('attackRight', true);
            this.sound.play("attack")
            lookLeft = false;

            var sl = slash.create((player.x + 45), player.y, "slash")
            sl.setVelocityX(500);
            setTimeout(function(){sl.disableBody(true, true);}, 90);
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
        return
    }

    // Hero taking damage
    if (heroTakingDamage) {
        this.sound.play("playerDamage");
        healthbar.x -= 0.43 * heroDamageIntensity
        healthbar.displayWidth -= heroDamageIntensity
        heroHealth -= heroDamageIntensity
    }
}


function staph_still_damage(staph_still, slash){

    staph_still_health -= 1;
    hit.visible = true;
    this.sound.play("damage");
    console.log(staph_still_health);


  if (staph_still_health <= 0) {

      staph_still.disableBody(true, true);
  }
}

function staph_move_damage(staph_move, slash){
    hit.visible = true;

    staph_move.health -= 1


  if (staph_move.health <= 0) {
      staph_move.disableBody(true, true);
      num_staph -= 1;
      console.log("num_staph:     " + num_staph);
  }
}

function staph_antibody_damage(staph_move, antibodyStorm){

    staph_move.health -= 1;
    this.sound.play("damage");

    if (staph_move.health <= 0) {
        staph_move.disableBody(true, true);
        num_staph -= 1;
        console.log("num_staph:     " + num_staph);
    }
}



  if (villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    tmusic.stop();
<<<<<<< HEAD
    this.scene.start(transition0);
=======
    this.scene.start(nervous);
>>>>>>> 8c2b7442bc335d2ba8263c23ceb5dcce54914ada
  }


function player_damage(player, tb_enemy)
{
  console.log("hey!")
  hitTimer += 1;
  healthbar.x -= 0.43 * .5
  healthbar.displayWidth -= .5
  heroHealth -= .5
  console.log("hit!" + hitTimer)
  if (hitTimer % 10 === 0){
    console.log("hit!" + hitTimer)
    this.sound.play("playerDamage");
  }

  if(heroHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    tmusic.stop();
    this.scene.start(gameOver);
  }

}


function getAntibodyPowerup(player, antibodyPowerup)
  {
    this.sound.play("pickup");
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