credit.preload = cp;
credit.create = cc;
credit.update = cu;

function cp()
{
  this.load.image('credits', 'Assets/Transitions/Credits.png');
  this.load.audio("credit_music", "Assets/Boss/371844__mrthenoronha__bossa-nova-game-theme-loop.mp3");
  this.load.image('sbutton', 'Assets/Boss/health.png');
  console.log("title!!")
}

console.log("title!!")

function cc()
{
  background = this.add.image(960, 540, 'credits');
  startButton = this.add.image(950, 620, 'sbutton').setTint(0x85cf4b);
  startButton2 = this.add.image(950, 620, 'sbutton').setScale(.9).setTint(0Xf7eb62);
  start = this.add.text(780, 600,"Title Screen").setScale(3);
  creditsTitle = this.add.text(850, 150,"Credits").setScale(3);
  paragraph1  = this.add.text(700, 250,"Alexia Carmona - Programmer/Artist").setScale(2);
  paragraph2  = this.add.text(700, 300,"Jake Kula - Programmer").setScale(2);
  paragraph3  = this.add.text(700, 350,"Leon Lin - Programmer").setScale(2);
  paragraph4  = this.add.text(700, 400,"Paul Toprac - Producer").setScale(2);
  paragraph5  = this.add.text(700, 450,"Gahwon Lee - Co-producer").setScale(2);
  paragraph5  = this.add.text(700, 500,"Biswajit Saha - Co-producer").setScale(2);



  //Clickable areas
  starting = this.add.text(750, 600, "              ").setScale(3).setInteractive();

  crmusic= this.sound.add('credit_music', {loop: true});
  this.sound.play("credit_music");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {crmusic.stop()
    }
  });

    starting.on("pointerdown", () =>
      {
        this.sound.stopAll()
        this.scene.start(title)
      });

}

function cu()
{

}
