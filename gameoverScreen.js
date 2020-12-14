gameOver.preload = preloadGO
gameOver.create = createGO
gameOver.update = updateGO

bossScene = new Phaser.Scene('bossScene');

function onObjectClicked()
{
  this.scene.start(bossScene)
}

function preloadGO() {
    this.load.image('environment', 'Assets/Boss/Bossbackground.png');
    this.load.image('button', 'Assets/Respiratory/Button.png');
}

function createGO(){
  background = this.add.image(960, 540, 'environment');
  gameOver = this.add.text(0, 0, "GAME OVER!");
  var retryButton = this.add.image(480, 270, 'button');
  retryButton.setInteractive();
  retryButton = this.add.text(0, 0, "Retry");
  retryButton.input.on('gameobjectdown', this.onObjectClicked, this);
}
function updateGO(){
}
