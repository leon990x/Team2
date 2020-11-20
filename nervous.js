// let respiratory = new Phaser.Scene("respiratory");

nervous.preload = p2;
nervous.create = c2;
nervous.update = u2;

// global variables
var awave_count = 1;
var preon_timer = 0;
var anum_enemies;
var als_health = 100;
var awave_text;
var adefeated_text;
var adefeated = 0;
var tau_text;
var villainHealth = 207.5;
var villainHealth2 = 207.5;

var builder;
//heroHealth = 415;

function p2(){
  this.load.image('environment3', 'Assets/Nervous/nervousBackground.png');
  this.load.image('floor3', 'Assets/Nervous/nervousFloor.png');
  this.load.image('platform2', 'Assets/Nervous/platform2.png');
  this.load.image('red', 'Assets/Boss/redHealth.png');
  this.load.image('statusbar', 'Assets/Boss/health.png');
  this.load.image('healthpack', 'Assets/Boss/heart.png');
  this.load.image('flu', 'Assets/Enemy/Flu.png');
  this.load.image('flaser', 'Assets/Enemy/flu_laser.png');
  this.load.image('slash', 'Assets/Players/slash.png');

  this.load.image('antibody', 'Assets/Powers/antibody.png')
  this.load.image('antibodyPowerup', 'Assets/Powers/antibodyPowerup.png')
  this.load.image('pow', 'Assets/Players/damage.png');

  // particles
  this.load.image('spark', 'Assets/Particles/particlesm.png');

  // Audio
    this.load.audio('nervem', "Assets/Audio/179511__clinthammer__clinthammermusic-gamerstep-bass-triplets.mp3")
    this.load.audio("attack", "Assets/Powers/263011__dermotte__sword-02.mp3")
    this.load.audio("jump", "Assets/Audio/jump.mp3")
    this.load.audio("damage", "Assets/Audio/damage.mp3")
    this.load.audio("playerDamage", "Assets/Audio/458867__raclure__damage-sound-effect.mp3")
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
      // Enemy Sprites
      this.load.image('tau', 'Assets/Enemy/tau.png')
      this.load.image('Ltau', 'Assets/Enemy/Ltau.png')
      this.load.image('preon', 'Assets/Enemy/prion.png')
      this.load.image('als', 'Assets/Enemy/als.png')

      this.load.spritesheet('alsSprite',
          'Assets/Enemy/alSprite.png',
          { frameWidth: 92, frameHeight: 86 }
  );

}

function c2(){
  background = this.add.image(960, 540, 'environment3');
  tau_text = this.add.text(1130, 40, "Tau Proteins").setScale(3);
  awave_text = this.add.text(700, 240, "Alzheimers:" + "\r\n" + " Wave " + awave_count + " of 3").setScale(4);
  adefeated_text = this.add.text(1470, 130, "Enemies left in wave:" + 5 - defeated).setScale(3);
  cursors = this.input.keyboard.createCursorKeys();
  attackButton = this.input.keyboard.addKeys("Q,P");
  redhealth = this.add.image(220, 60, 'red');
  healthbar = this.add.image(220, 60, 'statusbar');
  redhealth.setOrigin(0.45, 0.5);
  healthbar.setOrigin(0.45, 0.5);

  //Health: Max 415
  healthbar.displayWidth = 415
  villainRedhealth = this.add.image(1700, 60, 'red')
  villainHealthbar = this.add.image(1700, 60, 'statusbar')
  villainHealthbar.displayWidth = 415

  //Edge colliders
  ground = this.physics.add.staticGroup();
  ground.create(960, 750, "platform2").setScale(1.5).refreshBody();


  floor = ground.create(959, 1050, "floor3").setScale(1).refreshBody();

  // sounds
  nmusic= this.sound.add('nervem', {loop: true, volume: 3});
  nmusic.play();
  attack = this.sound.add('attack', {volume: 0.5})
  damage = this.sound.add('damage', {volume: 3})
  playerDamage = this.sound.add("playerDamage", {volume: 1})
  jump = this.sound.add('jump', {volume: 0.5})
  pickup = this.sound.add('pickup')

  // Particles
  const spark = this.add.particles('spark');
  var emit = spark.createEmitter({
    // quantity: 20,
    // cycle: false,
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

  // player code
  player = this.physics.add.sprite(100, 700, "whiteBC");
  player.setBounce(0.3);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, ground);
  player.body.setGravityY(2400);

  // slash
  slash = this.physics.add.group({immovable: true, allowGravity: false});

  antibodyStorm = this.physics.add.group({immovable: true, allowGravity: false});
  antibodyPowerup = this.physics.add.group();

  antibodyPowerup = this.physics.add.group();

  this.physics.add.collider(antibodyPowerup, ground);
  this.physics.add.overlap(player, antibodyPowerup, getAntibodyPowerup, null, this);

  //Powerups
  healthpacks = this.physics.add.group();
  this.physics.add.collider(healthpacks, ground);
  this.physics.add.overlap(player, healthpacks, getHealth, null, this);

  //Als Enemy
  als = this.physics.add.group({
    delay: 200,
    key:"als",
    repeat: 0,
    setXY:{x: 1900, y: 930, stepX: 800},
    setScale: {x: 1, y: 1},
    immovable: true,
    allowGravity: false,
    runChildUpdate: true,
    setCollideWorldBounds: true
  });

  this.physics.add.collider(als, als);
  this.physics.add.collider(als, floor);
  this.physics.add.overlap(als, player, checkAnims, null, this);
  this.physics.add.overlap(als, slash, als_damage, null, this);
  this.physics.add.overlap(als, antibodyStorm, als_damage, null, this);
  anum_enemies = 1;

  this.anims.create({
    key:"walkingR",
    frames: this.anims.generateFrameNumbers("alsSprite", {start: 0, end: 7}),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key:"attackR",
    frames: this.anims.generateFrameNumbers("alsSprite", {start: 6, end: 18}),
    frameRate: 10,
    repeat: -1
  })


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
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "attackLeft",
      frames: this.anims.generateFrameNumbers("LwhiteBC", { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1
    });

    // Tau Protein
    tau_enemy = this.physics.add.sprite(1910, 420, "Ltau");
    tau_enemy.setScale(3);
    tau_enemy.setCollideWorldBounds(true);
    tau_enemy.setOrigin(0.5);
    tau_enemy.body.allowGravity = false;
    tau_enemy.body.immovable = true; //Makes it so nothing moves it
    this.physics.add.collider(tau_enemy, floor);
    this.physics.add.overlap(slash, tau_enemy, tau_damage1, null, this);
    // flu_enemy.setTint(0X00000);

    moveTau = this.tweens.add({
      targets: tau_enemy,
      x:tau_enemy.x - 1900,
      y: 420,
      duration: 10000,
      ease:"Linear",
      callbackScope: this,
      loop: -1,
      yoyo: true,
    });

    tau_enemy2 = this.physics.add.sprite(0, 420, "tau");
    tau_enemy2.setScale(3);
    tau_enemy2.setCollideWorldBounds(true);
    tau_enemy2.setOrigin(0.5);
    tau_enemy2.body.allowGravity = false;
    tau_enemy2.body.immovable = true; //Makes it so nothing moves it
    this.physics.add.collider(tau_enemy2, floor);
    this.physics.add.overlap(slash, tau_enemy2, tau_damage2, null, this);

    moveTau2 = this.tweens.add({
      targets: tau_enemy2,
      x:tau_enemy2.x + 1900,
      y: 420,
      duration: 10000,
      ease:"Linear",
      callbackScope: this,
      loop: -1,
      yoyo: true,
    });

    // preonBombs
        bombs = this.physics.add.group({
          delay: 2000,
          key:"preon",
          repeat: 1,
          setXY:{x: tau_enemy.x, y: tau_enemy.y, stepX: 70},
          setScale: {x: .4, y: .4},
          allowGravity: true,
          setBounceX: 0.8,
          setBounceY: 0.8,
          runChildUpdate: true,
        });
        this.physics.add.overlap(player, bombs, playerBomb_damage, null, this);
        this.physics.add.collider(bombs.getChildren(), ground)

        Phaser.Actions.Call(bombs.getChildren(),

        function boundset(child){
          child.setCollideWorldBounds(true);
        });


        preon_timer += 1;
}

function u2(){
  // console.log("preon" + preon_timer + " awave_count" + awave_count)
  // console.log("anum_enemies " + anum_enemies)
  // hide pow asset if player is not attacking
  console.log("health", heroHealth);
  console.log("Wave count: ", awave_count);
  if(heroHealth < 0)
  {
    console.log("DONEsS")
    heroHealth = 415;
    villainHealth = 415;
    nmusic.stop();
    this.scene.start(gameOver);
  }

  //death of Taus controls
  if(villainHealth2 < 0 && villainHealth >= 0)
  {
    tau_enemy2.destroy();
  }
  if(villainHealth < 0 && villainHealth2 >= 0)
  {
    tau_enemy.destroy();
  }

  if(attackButton.Q.isUp){
    hit.visible = false;
  }

  if(Math.ceil(tau_enemy.x) === Math.ceil(player.x -10) || Math.ceil(tau_enemy.x) === Math.ceil(player.x + 10) || Math.ceil(tau_enemy.x) === Math.ceil(player.x)){
    var bomb = bombs.create(tau_enemy.x, tau_enemy.y, 'preon').setScale(.4);
    // bombs.create(tau_enemy.x, tau_enemy.y, 'preon').setScale(.4);

    bomb.setVelocityX(Phaser.Math.Between(-70, 70));
    bomb.setBounce(0.9);////////////////
    if (preon_timer <= 3 && awave_count < 4){
      // console.log("hey")
      preon_timer += 1;
  }
  }

  if(Math.ceil(tau_enemy2.x) === Math.ceil(player.x -10) || Math.ceil(tau_enemy2.x) === Math.ceil(player.x + 10) || Math.ceil(tau_enemy2.x) === Math.ceil(player.x)){
     var bomb = bombs.create(tau_enemy2.x, tau_enemy2.y, 'preon').setScale(.4);
     //bombs.create(tau_enemy2.x, tau_enemy2.y, 'preon').setScale(.4);
     bomb.setVelocityX(Phaser.Math.Between(-50, 50));
     bomb.setBounce(0.9);////////////////
    if (preon_timer <= 3 && awave_count < 4){
      // console.log("hey")
      preon_timer += 1;
  }
  }

  if (awave_count === 4 && anum_enemies === 0){
    // console.log("SCARY
    adefeated_text.visible = false;
    awave_text.setText("Wave Over: " + "\n"+ "Defeat the Tau proteins").setScale(4);
    awave_text.visible = true;
    if(builder != false)
    {
    ground.create(1400, 550, "platform2").setScale(1.5).refreshBody();
    ground.create(500, 550, "platform2").setScale(1.5).refreshBody();
    builder = false;
    }
  }

if (preon_timer > 4 && awave_count < 4 && anum_enemies < 5){
  function spawn(enemy){
  als.createMultiple({
    delay: 2000,
    key: 'als',
    repeat: 0,
    setXY:{x: -600, y: 930, stepX: 100},
    setScale: {x: 1, y: 1},
    immovable: true,
    allowGravity: false,
    runChildUpdate: true,
  })
  // console.log("BEGIN")
}
  if (anum_enemies <= 3){
    spawn(als.getChildren());
    anum_enemies += 1;
    preon_timer = 0;
  }
}

  if(anum_enemies < 4 && awave_count < 4){

      var stupefy = Phaser.Math.Between(0, 10);
      // wave_count -= 1;
      if(stupefy > 5)
      {
      als.createMultiple({
        delay: 2000,
        key: 'als',
        repeat: 1,
        setXY:{x: Phaser.Math.Between(2200, 2400), y: 930, stepX: 10},
        setScale: {x: 1, y: 1},
        immovable: true,
        allowGravity: false,
        runChildUpdate: false,
      })
      }

      else if(stupefy <= 5)
      {
      als.createMultiple({
        delay: 2000,
        key: 'als',
        repeat: 1,
        setXY:{x: Phaser.Math.Between(-600, -500), y: 930, stepX: 10},
        setScale: {x: 1, y: 1},
        immovable: true,
        allowGravity: false,
        runChildUpdate: false,
      })
      }

  anum_enemies += 2;
}

// Enemy follow player code
  if (anum_enemies != 0 && awave_count <= 4){
  Phaser.Actions.Call(als.getChildren(),
  function moveEnemies(enemy){
    // console.log(enemy.x)
    if (enemy != undefined){
      if(Math.ceil(enemy.x) === Math.ceil(player.x -10) || Math.ceil(enemy.x) === Math.ceil(player.x + 10) || Math.ceil(enemy.x) === Math.ceil(player.x)){
        enemy.play("attackR", true);
      }
      if (player.x < enemy.x && player.body.velocity.x < 0) {
              enemy.body.velocity.x = -1 * Phaser.Math.Between(150, 186);
              enemy.play("walkingR", true);
          }
      if (player.x > enemy.x && player.body.velocity.x > 0) {
          enemy.play("walkingR", true);
          enemy.body.velocity.x = Phaser.Math.Between(150, 186);
      }

      if (player.x < enemy.x && player.body.velocity.x === 0) {
              enemy.play("walkingR", true);
              enemy.body.velocity.x = -1 * Phaser.Math.Between(150, 186);
          }

      // console.log(enemy.x)
      if (player.x > enemy.x && player.body.velocity.x === 0) {
              enemy.play("walkingR", true);
              enemy.body.velocity.x = Phaser.Math.Between(150, 186);
          }

      // console.log(enemy.x)


      if (player.x < enemy.x && player.body.velocity.x > 0) {
              enemy.play("walkingR", true);
              enemy.body.velocity.x = -1 * Phaser.Math.Between(150, 186);

          }
      if (player.x > enemy.x && player.body.velocity.x < 0) {
              enemy.play("walkingR", true);
              enemy.body.velocity.x = Phaser.Math.Between(150, 500);
          }

      //fail safes
      if (wave_count == 4)
      {
        if (enemy.x > 1920 || enemy.x < 0)
        {
          defeated_text.visible = false;
          adefeated_text.visible = false;
          awave_text.setText("Wave Over: " + "\n"+ "Defeat the Tau proteins").setScale(4);
          awave_text.visible = true;
          wave_text.visible = true;
        }
      }


      }
    })
   }

  // walking

    if (cursors.left.isDown)
    {
        player.setVelocityX(-350);
        player.setTint(0xffffff);

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
        player.setTint(0xffffff);

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

}
function playerBomb_damage(player, bombs)
{
  // Particles
  const spark = this.add.particles('spark');
  var emit = spark.createEmitter({
    // quantity: 20,
    // cycle: false,
    x: 400,
    y: 460,
    speed: 200,
    lifespan: 500,
    blendMode: 'ADD',
    maxParticles: 50,
    tint: 0xFACA0F,
    frequency: -1,
    scale:{ start: 1, end: 0 },
    on: false,
  });

  console.log("stop!")
  console.log(heroHealth)
  healthbar.x -= 0.43 * 2
  healthbar.displayWidth -= 2
  heroHealth -= 2
  player.setTint(0xff0000);
  // bombs.kill();
  console.log(bombs.x)
  bombs.destroy(bombs,true);
  spark.emitParticleAt(bombs.x, bombs.y, 50);
  // bombs.disableBody(true, true);
  this.sound.play("playerDamage");
  // Phaser.Actions.Call(this.bombs.getChildren(), function(child){bombs.kill();});



  if(heroHealth < 0)
  {
    console.log("DONEsS")
    heroHealth = 415;
    villainHealth = 415;
    nmusic.stop();
    this.scene.start(gameOver);
  }

}

function tau_damage1(slash, tau_enemy1){

  console.log("villain health: ", villainHealth);

  if (awave_count >= 4){
    hit.visible = true;
    villainHealthbar.x -= 0.48 * 4
    villainHealthbar.displayWidth -= 4
    villainHealth -= 6
    this.sound.play("damage");
  }

  if(villainHealth <= 110 && villainHealth > 105)
  {
    healthpacks.create(100, 20, "healthpack");
    healthpacks.create(100, 20, "healthpack");
    var hp = healthpacks.create(960, 20, "healthpack");
    hp.setScale(2);
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if (villainHealth < 0 && villainHealth2 < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.sound.stopAll();
    this.scene.start(transition2);
  }
}

function tau_damage2(slash, tau_enemy2){

  console.log("villain health2: ", villainHealth2);

  if (awave_count >= 4){
    hit.visible = true;
    villainHealthbar.x -= 0.48 * 4
    villainHealthbar.displayWidth -= 4
    villainHealth2 -= 6
    this.sound.play("damage");
  }

  if(villainHealth2 <= 110 && villainHealth2 > 105)
  {
    healthpacks.create(100, 20, "healthpack");
    healthpacks.create(100, 20, "healthpack");
    var hp = healthpacks.create(960, 20, "healthpack");
    hp.setScale(2);
    hp.setBounce(0.5);
    hp.setCollideWorldBounds(true);
    hp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  if (villainHealth < 0 && villainHealth2 < 0)
  {
    heroHealth = 415;
    villainHealth2 = 415;
    this.sound.stopAll();
    this.scene.start(transition2);
  }
}

  if(heroHealth < 0)
  {
    heroHealth = 415;
    villainHealth = 415;
    this.sound.stopAll();
    this.scene.start(gameOver);
  }




function checkAnims(player, enemy)
  {
    console.log("Help!!")
    healthbar.x -= 0.43 * 1
    healthbar.displayWidth -= 1
    heroHealth -= 1
    player.setTint(0xff0000);
    this.sound.play("playerDamage")
  }


function als_damage(als, slash){
    hit.visible = true;
  // var tB_children = tB.getChildren([0]);

    awave_text.visible = false;
    // villainHealthbar.x -= 0.43 * villainDamageIntensity
    // villainHealthbar.displayWidth -= villainDamageIntensity
    // villainHealth -= villainDamageIntensity
    als_health -= 10;
    // console.log(als_health);

    if (als_health < 70 && als_health > 40)
    {
      als.setTint(0x999999);
    }

    if (als_health < 40 && als_health > 0)
    {
      als.setTint(0x404040);
    }

    if (als_health <= 0){
      //drop healthpacks
      ln = Phaser.Math.Between(1, 70);
      rn = Phaser.Math.Between(1, 6);
      if(rn === 2)
      {
        var hp = healthpacks.create(als.x, als.y, "healthpack");
      }

      if(ln === 30)
      {
        var ap = antibodyPowerup.create(960, 20, "antibodyPowerup").setScale(0.25);
      }
      als.destroy();
      adefeated += 1;

      adefeated_text.visible = true;
      adefeated_text.setText("Enemies left in wave:" + String(5 - adefeated)).setScale(2);


      anum_enemies -= 1;
      als_health = 100;
      this.sound.play("damage");
      if (adefeated == 5){
        adefeated = 0;
        adefeated_text.visible = false;
        // console.log(awave_count, adefeated)
        awave_count += 1;
      if (awave_count < 4){
        awave_text.visible = true;
        awave_text.setText("Tuberculosis:" + "\r\n" + " Wave " + awave_count + " of 3").setScale(4);
        }
      }
    }
}
