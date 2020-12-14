transition3.preload = pt3;
transition3.create = ct3;
transition3.update = ut3;

function pt3()
{
  this.load.image('final_background', 'Assets/Transitions/tfinal1.png');
  this.load.audio("transitionf", "Assets/Transitions/502704__soundflakes__a-thing-in-a-town.mp3");
}

function ct3()
{
  background = this.add.image(960, 540, 'final_background');
  destination = this.add.text(10, 0, "Respiratory..." + "\n" +" NOT cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 60, "Final Destination:" + "\n" + "Respiratory System").setScale(3);
  start = this.add.text(1300, 180,"Click on the unlocked bubble \nto start").setScale(2);
  clickableBoss = this.add.text(1150, 350, "   \n\n\n\n\n\n           ").setScale(3).setInteractive();

  finaltrmusic= this.sound.add('transitionf', {loop: true, volume: 5});
  this.sound.play("transitionf");

  this.time.addEvent({
    delay: 300,
    callback: ()=> {finaltrmusic.stop()
    }
  });

  clickableBoss.on("pointerdown", () =>
  {
  this.sound.stopAll();
  this.scene.start(bossScene);
});
}

function ut3()
{

}
