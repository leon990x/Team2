win.preload = preloadW
win.create = createW
win.update = updateW

function preloadW() {
    this.load.image('win_background', 'Assets/Boss/win.png');
    this.load.image('button', 'Assets/Respiratory/Button.png');
}

function createW(){
  const self = this;
  console.log('hello!')
  background = this.add.image(960, 540, 'win_background');
  gameOver = this.add.text(780, 340, "YOU WIN!").setScale(4);
  // retryButton = this.add.image(880, 940, 'retryButton');
  // retryButton.setInteractive();
  retryText = this.add.text(750, 540, "Refresh to retry").setScale(3);
  this.input.on('gameobjectdown', () => this.scene.start(bossScene));
}
function updateW(){

}
