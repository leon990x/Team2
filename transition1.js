transition1.preload = pt1;
transition1.create = ct1;
transition1.update = ut1;

function pt1()
{
  this.load.image('second_background', 'Assets/Transitions/tnervous.png');
  this.load.audio("transitionm", "Assets/Transitions/172561__djgriffin__video-game-7.mp3");
  console.log("transition1")
}

console.log("transition1")

function ct1()
{
  background = this.add.image(960, 540, 'second_background');
  destination = this.add.text(10, 0, "Digestive system cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 200, "Next Destination:" + "\n" + "Nervous System").setScale(3);
  start = this.add.text(1450, 500,"Click to start").setScale(3);

  trmusic= this.sound.add('transitionm', {loop: true});
  this.sound.play("transitionm");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {trmusic.stop()
    }
  });

  this.input.on("pointerdown", () =>
    {
      this.sound.stopAll()
      console.log("start digestive")
      this.scene.start(nervous)
    });

}

function ut1()
{

}
