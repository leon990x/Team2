title.preload = tp;
title.create = tc;
title.update = tu;

function tp()
{
  this.load.image('titleSRC', 'Assets/Transitions/titleScreen.png');
  this.load.audio("titlem", "Assets/Audio/412344__michorvath__rivalry-8-bit-music-loop.mp3");
  this.load.image('sbutton', 'Assets/Boss/health.png');
  console.log("title!!")
}

console.log("title!!")

function tc()
{
  background = this.add.image(960, 540, 'titleSRC');
  startButton = this.add.image(700, 620, 'sbutton').setTint(0x85cf4b);
  startButton2 = this.add.image(700, 620, 'sbutton').setScale(.9).setTint(0Xf7eb62);
  creditButton = this.add.image(1300, 620, 'sbutton').setTint(0x85cf4b);
  creditButton2 = this.add.image(1300, 620, 'sbutton').setScale(.9).setTint(0Xf7eb62);;
  start = this.add.text(630, 600,"Start").setScale(3);
  credits = this.add.text(1200, 600,"Credits").setScale(3);

  //Character and Enemy text
  whiteCell = this.add.text(400, 1000,"White Blood Cell",{fill: "black"}).setScale(2);
  ecoli = this.add.text(1010, 1000,"Ecoli",{fill: "black"}).setScale(2);
  alzheimers = this.add.text(1150, 1000,"Alzheimers",{fill: "black"}).setScale(2);
  staph = this.add.text(1340, 970,"Staph",{fill: "black"}).setScale(2);
  tauProtein = this.add.text(1640, 830,"Tau Protein",{fill: "black"}).setScale(2);
  tuberculosis = this.add.text(1450, 1000,"Tuberculosis",{fill: "black"}).setScale(2);
  theFlu = this.add.text(1810, 700,"Flu",{fill: "black"}).setScale(2);

  //Clickable areas
  credits = this.add.text(1110, 600, "             ").setScale(3).setInteractive();
  starting = this.add.text(500, 600, "  \n\n\n\n\n              ").setScale(3).setInteractive();

  trmusic= this.sound.add('titlem', {loop: true});
  this.sound.play("titlem");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {trmusic.stop()
    }
  });

  credits.on("pointerdown", () =>
    {
      this.sound.stopAll()
      this.scene.start(respiratory)
    });

    starting.on("pointerdown", () =>
      {
        this.sound.stopAll()
        this.scene.start(plot)
      });

}

function tu()
{

}
