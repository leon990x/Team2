plot2.preload = pp2;
plot2.create = pc2;
plot2.update = pu2;

function pp2()
{
  this.load.image('plot', 'Assets/Transitions/plot.png');
  this.load.audio("titlem", "Assets/Audio/412344__michorvath__rivalry-8-bit-music-loop.mp3");
  this.load.image('sbutton', 'Assets/Boss/health.png');
  this.load.image('ecoli', 'Assets/Digestive/ecoliSprite1.png');
  this.load.image('staph', 'Assets/Enemy/staph.png');
  this.load.image('als', 'Assets/Enemy/als.png');
  this.load.image('tau', 'Assets/Enemy/tau.png');
  this.load.image('flu', 'Assets/Enemy/Flu.png');
  this.load.image('tb', 'Assets/Respiratory/TBSprite.png');
  this.load.image('salmonella', 'Assets/Enemy/Salmonella.png');

}


function pc2()
{
  background = this.add.image(960, 540, 'plot');
  startButton = this.add.image(950, 620, 'sbutton').setTint(0x85cf4b);
  startButton2 = this.add.image(950, 620, 'sbutton').setScale(.9).setTint(0Xf7eb62);
  start = this.add.text(840, 600,"Go Back").setScale(3);
  levels = this.add.text(750, 100,"Elevated Levels:", {fill: "black"}).setScale(3);

  //Character and Enemy text
  sal = this.add.text(300, 200,"Salmonella",{fill: "black"}).setScale(2);
  sal_img = this.add.image(390, 370, 'salmonella');
  sal_img.setScale(1.5);

  ecoli = this.add.text(600, 200,"Ecoli",{fill: "black"}).setScale(2);
  ecoli_img = this.add.image(650, 370, 'ecoli');
  ecoli_img.setScale(1.5);

  alzheimers = this.add.text(800, 200,"Alzheimers",{fill: "black"}).setScale(2);
  alzheimers_img = this.add.image(900, 370, "als");
  alzheimers_img.setScale(2);

  staph = this.add.text(80, 200,"Staph",{fill: "black"}).setScale(2);
  staph_img = this.add.image(150, 380, 'staph');
  staph_img.setScale(1.5);

  tauProtein = this.add.text(1100, 200,"Tau Protein",{fill: "black"}).setScale(2);
  tau_img = this.add.image(1190, 370, 'tau');
  tau_img.setScale(3)

  tuberculosis = this.add.text(1400, 200,"Tuberculosis",{fill: "black"}).setScale(2);
  tb_img = this.add.image(1650, 370, "tb");
  tb_img.setScale(0.5);

  theFlu = this.add.text(1750, 200,"Flu",{fill: "black"}).setScale(2);
  flu_img = this.add.image(1780, 500, 'flu');
  flu_img.setScale(5)



  //Clickable areas
  starting = this.add.text(580, 600, "                    ").setScale(3).setInteractive();

  trmusic= this.sound.add('titlem', {loop: true});
  this.sound.play("titlem");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {trmusic.stop()
    }
  });

    starting.on("pointerdown", () =>
      {
        this.sound.stopAll()
        this.scene.start(plot)
      });

}

function pu2()
{

}
