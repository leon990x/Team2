credit.preload = cp;
credit.create = cc;
credit.update = cu;

function cp()
{
  this.load.image('credits', 'Assets/Transitions/Credits.png');
  this.load.audio("credit_music", "Assets/Boss/371844__mrthenoronha__bossa-nova-game-theme-loop.mp3");
  this.load.image('sbutton', 'Assets/Boss/health.png');
}


function cc()
{
  background = this.add.image(960, 540, 'credits');
  startButton = this.add.image(950, 900, 'sbutton').setTint(0x85cf4b);
  startButton2 = this.add.image(950, 900, 'sbutton').setScale(.9).setTint(0Xf7eb62);
  start = this.add.text(780, 880,"Title Screen").setScale(3);
  creditsTitle = this.add.text(250, 150,"Credits").setScale(3);
  paragraph1  = this.add.text(200, 250,"Programmer/Artist").setScale(2);
  paragraph1_5  = this.add.text(230, 300,"Alexia Carmona").setScale(2);
  paragraph2  = this.add.text(130, 400,"Programmer/Poweup Artists").setScale(2);
  paragraph2_5  = this.add.text(100, 450,"Jake Kula     Hui Chuan Lin").setScale(2);
  paragraph3  = this.add.text(260, 550,"Producer").setScale(2);
  paragraph4  = this.add.text(230, 600,"Paul Toprac").setScale(2);
  paragraph5  = this.add.text(180, 700,"Assistant Producer").setScale(2);
  paragraph5  = this.add.text(100, 750,"Gahwon Lee    Biswajit Saha").setScale(2);

  //Music credits
  paragraph5_5  = this.add.text(1200, 150,"Music/Sounds").setScale(3);
  paragraph6  = this.add.text(1000, 250,"Rivalry 8-Bit Music Loop - Michorvath").setScale(2);
  paragraph7  = this.add.text(1000, 320,"Bossa Nova Game Theme Loop - Mrthenoronha").setScale(2);
  paragraph8  = this.add.text(1000, 390,"8-Bit Bossfight - Volvion").setScale(2);
  paragraph9  = this.add.text(1000, 460,"Video Game 7 - Djgriffin").setScale(2);
  paragraph10  = this.add.text(1000, 530,"Clinthammermusic Gamerstep Bass Triplets").setScale(2);
  paragraph10_5  = this.add.text(1000, 580,"- Clinthammer").setScale(2);
  paragraph11  = this.add.text(1000, 650,"Zetauri_DarkThrillerLoop_J8 - Zetauri").setScale(2);
  paragraph12  = this.add.text(1000, 720,"A Thing In A Town - Soundflakes").setScale(2);
  paragraph13  = this.add.text(1000, 790,"Retro Last Level Video Game Loop - Emceeciscokid").setScale(2);

  //Clickable areas
  starting = this.add.text(750, 880, "                ").setScale(3).setInteractive();

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
