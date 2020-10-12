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
    this.load.image('environment1', 'Assets/Tutorial/tutorialBackgroundResize.png');
    this.load.image('floor1', 'Assets/Tutorial/GRS11.png');
    this.load.image('platform', 'Assets/Boss/platform.png');
    this.load.image('red', 'Assets/Boss/redHealth.png');
    this.load.image('statusbar', 'Assets/Boss/health.png');
    this.load.image('healthpack', 'Assets/Boss/heart.png');
    this.load.image('staph', 'Assets/Enemy/Staph.png')
    this.load.image('antibodyPowerup', 'Assets/Powers/antibodyPowerup.png')
    this.load.image('antibody', 'Assets/Powers/antibody.png')
    this.load.image('sebaceousGland', 'Assets/Tutorial/sebaceousGland.png')
    // this.load.image('tb', 'Assets/Respiratory/TBSprite.png');

// Audio
  this.load.audio("attack", ["assets/Audio/attack.mp3"])
  this.load.audio("jump", ["assets/Audio/jump.wav"])
  this.load.audio("damage", ["assets/Audio/damage.mp3"])

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
   attack = this.sound.add('attack')
   damage = this.sound.add('damage')
   jump = this.sound.add('jump')

   // prompt
   this.promptl1 = this.add.text(520, 50, "did it work?", {font: "40px Arial", fill: "black"})
   this.promptl2 = this.add.text(820, 130, "", {font: "40px Arial", fill: "black"})

   // player code
   player = this.physics.add.sprite(100, 700, "whiteBC");
   player.setBounce(0.3);
   player.setCollideWorldBounds(true);
   this.physics.add.collider(player, floor);
   player.body.setGravityY(1);

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
   this.physics.add.overlap(staph_still, player, staph_still_damage, null, this);

   //Staph move
   staph_move = this.physics.add.group();
   this.physics.add.collider(staph_move, ground);
   this.physics.add.overlap(staph_move, player, player_damage, null, this);
   this.physics.add.overlap(staph_move, player, staph_move_damage, null, this);
   this.physics.add.overlap(staph_move, antibodyStorm, staph_antibody_damage, null, this);






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
            this.scene.start(transition1);

        }
    }



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


function staph_still_damage(player, staph_still){
  if (attackButton.Q.isDown){
    staph_still_health -= 1
    this.sound.play("damage");
  }

  if (staph_still_health <= 0) {
      staph_still.disableBody(true, true);
  }
}

function staph_move_damage(player, staph_move){
  if (attackButton.Q.isDown){
    staph_move.health -= 1
    this.sound.play("damage");

  }

  if (staph_move.health <= 0) {
      staph_move.disableBody(true, true);
      num_staph -= 1;
      console.log("num_staph:     " + num_staph);
  }
}

function staph_antibody_damage(staph_move, antibodyStorm){
    console.log(staph_move.health)
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
    this.scene.start(transition1);
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