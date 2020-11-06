// let respiratory = new Phaser.Scene("respiratory");

digestive.preload = p1;
digestive.create = c1;
digestive.update = u1;

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
    this.load.image('environment2', 'Assets/Digestive/digestiveBackground3.png');
    this.load.image('floor2', 'Assets/Digestive/digestiveFloor3.png');
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
    this.load.image('pipe', 'Assets/Digestive/pipe3.png');
    this.load.image('ecoli', 'Assets/Digestive/Ecoli.png');
    // this.load.image('tb', 'Assets/Respiratory/TBSprite.png');
    
    // acid particles
    this.load.image('acid1', 'Assets/Digestive/acid1.png')
    this.load.image('acid2', 'Assets/Digestive/acid2.png')
    this.load.image('acid3', 'Assets/Digestive/acid3.png')

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
   console.log(digestive)
   background = this.add.image(0, 0, 'environment2');
   background.setOrigin(0, 0);
   cursors = this.input.keyboard.createCursorKeys();
   attackButton = this.input.keyboard.addKeys("Q,P");
   nextButton = this.input.keyboard.addKeys("W");
   otherNextButton = this.input.keyboard.addKeys("E");
   redhealth = this.add.image(220, 60, 'red')
   healthbar = this.add.image(220, 60, 'statusbar')
   redhealth.setOrigin(0.45, 0.5)
   healthbar.setOrigin(0.45, 0.5)
   pipe = this.add
   //Max 415
   healthbar.displayWidth = 415


//Edge colliders
   ground = this.physics.add.staticGroup();
   floor = ground.create(959, 995, "floor2");
   gland = this.physics.add.staticGroup();
    
   //pipes
   pipe = this.physics.add.staticGroup();
   pipe1 = pipe.create(20, 200, "pipe");
   pipe2 = pipe.create(2150, 200, "pipe");
   pipe2.flipX = true;
    
   //acid
   acid = this.physics.add.group();
   this.physics.add.collider(acid, floor);
   //this.physics.add.overlap(player, acid, player_damage_acid, null this);
   myVar1 = setInterval(dropAcidRight, 12000);
   myVar2 = setInterval(dropAcidLeft, 9000);
    
   //ecoli
   ecoli = this.physics.add.group();
   this.physics.add.collider(ecoli, floor);


   // sounds
   tmusic= this.sound.add('tutorialm', {loop: true, volume: 1});
   this.sound.play("tutorialm");
   attack = this.sound.add('attack', {volume: 1})
   damage = this.sound.add('damage', {volume: 3})
   playerDamage = this.sound.add("playerDamage", {volume: 1})
   jump = this.sound.add('jump', {volume: 1})
   pickup = this.sound.add('pickup')


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
   this.physics.add.overlap(player, acid, player_damage, null, this);
   this.physics.add.overlap(player, ecoli, player_damage, null, this);
   //this.physics.add.overlap(theBoss, antibodyStorm, boss_antibody_damage, null, this);
   antibodyStorm = this.physics.add.group({immovable: true, allowGravity: false});
   


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

    
    if (player.x > 1600) {
        tmusic.stop();
        console.log('start')
        this.scene.start(transition1);

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






function player_damage_acid(player, acid)
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

function test() {
    console.log("worked")
}

function dropAcidLeft()
  {
    var i;
    for (i = 0; i < 10; i++)
        {
        
            
        var drop1 = acid.create(500, 230, "acid3");
        //drop1.setScale(0.1);
        //drop1.angle = (Phaser.Math.FloatBetween(0, 359));
        drop1.setVelocityY(0);
        drop1.setVelocityX(Phaser.Math.FloatBetween(80, 230));
        drop1.setBounce(Phaser.Math.FloatBetween(.1, .5));
        setTimeout(function(){drop1.destroy();}, 50);
        //setTimeout(function(){sl.disableBody(true, true);}, 90);
        }
      
    drop1.disableBody(true, true);
  }

function dropAcidRight()
  {
    var i;
    for (i = 0; i < 10; i++)
        {
        
            
        var drop1 = acid.create(1660, 230, "acid1");
        //drop1.setScale(0.1);
        //drop1.angle = (Phaser.Math.FloatBetween(0, 359));
        drop1.setVelocityY(0);
        drop1.setVelocityX(Phaser.Math.FloatBetween(-100, -260));
        drop1.setBounce(Phaser.Math.FloatBetween(.1, .5));
        }
  }

