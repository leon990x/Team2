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

  console.log("title!!")
}

console.log("title!!")

function pc2()
{
  background = this.add.image(960, 540, 'plot');
  startButton = this.add.image(950, 620, 'sbutton').setTint(0x85cf4b);
  startButton2 = this.add.image(950, 620, 'sbutton').setScale(.9).setTint(0Xf7eb62);
  start = this.add.text(840, 600,"Go Back").setScale(3);
  levels = this.add.text(750, 100,"Elevated Levels:", {fill: "black"}).setScale(3);
  //Character and Enemy text
  ecoli = this.add.text(400, 200,"Ecoli",{fill: "black"}).setScale(2);
  ecoli_img = this.add.image(480, 370, 'ecoli');
  ecoli_img.setScale(1.5);

  alzheimers = this.add.text(700, 200,"Alzheimers",{fill: "black"}).setScale(2);
  alzheimers_img = this.add.image(800, 370, "als");
  alzheimers_img.setScale(2);

  staph = this.add.text(100, 200,"Staph",{fill: "black"}).setScale(2);
  staph_img = this.add.image(170, 380, 'staph');
  staph_img.setScale(1.5);

  tauProtein = this.add.text(1000, 200,"Tau Protein",{fill: "black"}).setScale(2);
  tau_img = this.add.image(1090, 370, 'tau');
  tau_img.setScale(3)

  tuberculosis = this.add.text(1300, 200,"Tuberculosis",{fill: "black"}).setScale(2);
  tb_img = this.add.image(1550, 370, "tb");
  tb_img.setScale(0.5);

  theFlu = this.add.text(1700, 200,"Flu",{fill: "black"}).setScale(2);
  flu_img = this.add.image(1730, 500, 'flu');
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
