plot.preload = pp;
plot.create = pc;
plot.update = pu;

function pp()
{
  this.load.image('plot', 'Assets/Transitions/plot.png');
  this.load.audio("titlem", "Assets/Audio/412344__michorvath__rivalry-8-bit-music-loop.mp3");
  this.load.image('sbutton', 'Assets/Boss/health.png');
  console.log("title!!")
}

console.log("title!!")

function pc()
{
  background = this.add.image(960, 540, 'plot');
  startButton = this.add.image(950, 620, 'sbutton').setTint(0x85cf4b);
  startButton2 = this.add.image(950, 620, 'sbutton').setScale(.9).setTint(0Xf7eb62);
  start = this.add.text(840, 600,"Continue").setScale(3);
  paragraph1  = this.add.text(100, 300,"The patient, Bee Careful has been infected by some of the worst bacteria and viruses.").setScale(2);
  paragraph2  = this.add.text(100, 350,"As their white blood cell, you must travel to the infected areas and cure the patient").setScale(2);
  paragraph3  = this.add.text(100, 400,"of such terrible diseases. Be careful as you might come across some very strong apponents.").setScale(2);
  paragraph4  = this.add.text(100, 450,"Powerup and look out for enemies that are not darkened, that means they can be attacked.").setScale(2);
  paragraph5  = this.add.text(100, 500,"Remember, be too patient and you will lose the patient.").setScale(2);



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
        this.scene.start(tutorial)
      });

}

function pu()
{

}
