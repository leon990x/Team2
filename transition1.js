transition1.preload = pt1;
transition1.create = ct1;
transition1.update = ut1;

function pt1()
{
  this.load.image('first_background', 'Assets/Transitions/trespiratory.png');
}

function ct1()
{
  background = this.add.image(960, 540, 'first_background');
  destination = this.add.text(10, 0, "Epidermis cured!").setScale(3);
  patient = this.add.text(1300, 0, "Patient: Bee Curefull").setScale(3);
  next = this.add.text(1300, 200, "Next Destination:" + "\n" + "Respiratory System").setScale(3);
  start = this.add.text(1450, 500,"Click to start").setScale(3);

  this.input.on("pointerdown", () => this.scene.start(respiratory));
}

function ut1()
{

}
