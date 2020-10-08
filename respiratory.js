// let respiratory = new Phaser.Scene("respiratory");

respiratory.preload = p1;
respiratory.create = c1;
respiratory.update = u1;

var wave_count = 3;
var num_enemies;

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
   floor = ground.create(959, 1050, "floor").setScale(1).refreshBody();

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
<<<<<<< HEAD
   //TB Enemy
   tB = this.physics.add.group({
     delay: 200,
     key:"tb",
     repeat: 3,
     setXY:{x: 1900, y: 930, stepX: 100},
     setScale: {x: .5, y: .5},
     immovable: true,
     allowGravity: false,
     runChildUpdate: true,
   });

   num_enemies = 4;
   // for(x = 0; x < 5; x++){tb_enemy = this.physics.add.sprite(1900-(10*x), 650+(10*x), "tb");}

   // tb_enemy.setBounce(0);
   // tb_enemy.setScale(.5);
   // tb_enemy.setCollideWorldBounds(true);
   this.physics.add.collider(tB, floor);
   // tb_enemy.body.setGravityY(1);
   this.physics.add.overlap(tB, player, player_damage, null, this);
   this.physics.add.overlap(tB, player, tb_damage, null, this);


      if (player.x < enemy.x && player.body.velocity.x > 0) {
              console.log("p left of e, mv right")
              // tb_              tb_enemy.body.velocity.x = -70;
>>>>>>> 040dfebacf30cdc61c9115e89d7c05281ad88c69

          }
      if (player.x > enemy.x && player.body.velocity.x < 0) {
              console.log("p right of e, mv left")
              // tb_enemy.body.velocity.x = 0;
<<<<<<< HEAD
              enemy.body.velocity.x = 70;
          }
      }
    })
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

function tb_damage(player, tB){
  // var tB_children = tB.getChildren([0]);
  if (attackButton.Q.isDown){
    villainHealthbar.x -= 0.43 * villainDamageIntensity
    villainHealthbar.displayWidth -= villainDamageIntensity
    villainHealth -= villainDamageIntensity
    tB.destroy();
    num_enemies -= 1;
    this.sound.play("damage");
    if (num_enemies === 0){
    wave_count-= 1
    }
  }
}

function flu_damage(player, tB){
  if (attackButton.Q.isDown){
    villainHealthbar.x -= 0.48 * 4
    villainHealthbar.displayWidth -= 4
    villainHealth -= 4
    this.sound.play("damage");
  }

  if (villainHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.scene.start(bossScene);
  }
}

function player_damage(player, tB)
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
