transition1.preload = pt1;
transition1.create = ct1;
transition1.update = ut1;

function pt1()
{
  this.load.image('second_background', 'Assets/Transitions/tnervous1.png');
  this.load.audio("transitionm", "Assets/Transitions/172561__djgriffin__video-game-7.mp3");
}


function ct1()
{
  background = this.add.image(960, 540, 'second_background');
  destination = this.add.text(10, 0, "Digestive system \ncured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 60, "Next Destination:" + "\n" + "Nervous System").setScale(3);
  start = this.add.text(1300, 180,"Click on the unlocked bubble \nto start").setScale(2);
  clickableN = this.add.text(465, 0, "    \n\n\n\n\n\n           ").setScale(3).setInteractive();

  tr1music= this.sound.add('transitionm', {loop: true});
  this.sound.play("transitionm");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {trmusic.stop()
    }
  });

  clickableN.on("pointerdown", () =>
    {
      this.sound.stopAll();
      this.scene.start(nervous);
    });

}

function ut1()
{

}
