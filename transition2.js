transition2.preload = pt1;
transition2.create = ct1;
transition2.update = ut1;

function pt1()
{
  this.load.image('third_background', 'Assets/Transitions/trespiratory1.png');
  this.load.audio("transitionm", "Assets/Transitions/172561__djgriffin__video-game-7.mp3");
}


function ct1()
{
  background = this.add.image(960, 540, 'third_background');
  destination = this.add.text(10, 0, "Nervous cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 60, "Next Destination:" + "\n" + "Respiratory System").setScale(3);
  start = this.add.text(1300, 180,"Click on the unlocked bubble \nto start").setScale(2);
  clickableR = this.add.text(1150, 350, "  \n\n\n\n\n          ").setScale(3).setInteractive();

  trmusic= this.sound.add('transitionm', {loop: true});
  this.sound.play("transitionm");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {trmusic.stop()
    }
  });

  clickableR.on("pointerdown", () =>
    {
      this.sound.stopAll()
      this.scene.start(respiratory)
    });

}

function ut1()
{

}
