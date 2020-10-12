transition3.preload = pt3;
transition3.create = ct3;
transition3.update = ut3;

function pt3()
{
  this.load.image('final_background', 'Assets/Transitions/tfinal.png');
}

function ct3()
{
  background = this.add.image(960, 540, 'final_background');
  destination = this.add.text(10, 0, "Respiratory..." + "\n" +" NOT cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 200, "New Infection in:" + "\n" + "Respiratory System").setScale(3);
  start = this.add.text(1450, 500,"Click to start").setScale(3);

  this.input.on("pointerdown", () => this.scene.start(bossScene));
}

function ut3()
{

}
