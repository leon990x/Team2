transition0.preload = pt1;
transition0.create = ct1;
transition0.update = ut1;

function pt1()
{
  this.load.image('first_background', 'Assets/Transitions/tdigestive.png');
  this.load.audio("transitionm", "Assets/Transitions/172561__djgriffin__video-game-7.mp3");
  console.log("transition0")
}

console.log("transition0")

function ct1()
{
  background = this.add.image(960, 540, 'first_background');
  destination = this.add.text(10, 0, "Epidermis cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 60, "Next Destination:" + "\n" + "Digestive System").setScale(3);
  start = this.add.text(1300, 180,"Click on the unlocked bubble \nto start").setScale(2);
  clickableD = this.add.text(1140, 750, "      \n\n\n\n\n            ").setScale(3).setInteractive();

  trmusic= this.sound.add('transitionm', {loop: true});
  this.sound.play("transitionm");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {trmusic.stop()
    }
  });

  clickableD.on("pointerdown", () =>
    {
      this.sound.stopAll()
      this.scene.start(digestive)
    });

}

function ut1()
{

}
