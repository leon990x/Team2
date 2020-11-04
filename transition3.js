transition3.preload = pt3;
transition3.create = ct3;
transition3.update = ut3;

function pt3()
{
  this.load.image('final_background', 'Assets/Transitions/tfinal.png');
  this.load.audio("transitionf", "Assets/Transitions/502704__soundflakes__a-thing-in-a-town.mp3");
}

function ct3()
{
  background = this.add.image(960, 540, 'final_background');
  destination = this.add.text(10, 0, "Respiratory..." + "\n" +" NOT cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 200, "New Infection in:" + "\n" + "Respiratory System").setScale(3);
  start = this.add.text(1450, 500,"Click to start").setScale(3);
  clickableBoss = this.add.text(1150, 350, "   \n\n\n\n\n\n           ").setScale(3).setInteractive();

  finaltrmusic= this.sound.add('transitionf', {loop: true});
  // this.sound.play("transitionf");

  // this.input.on("pointerdown", () => finaltrmusic.stop());
  clickableBoss.on("pointerdown", () => this.scene.start(bossScene));
}

function ut3()
{

}
