win.preload = preloadW
win.create = createW
win.update = updateW

function preloadW() {
    this.load.image('win_background', 'Assets/Boss/win.png');
    this.load.image('button', 'Assets/Respiratory/Button.png');
    this.load.audio("win_music", "Assets/Boss/371844__mrthenoronha__bossa-nova-game-theme-loop.mp3");
}

function createW(){
  const self = this;
  console.log('hello!')
  background = this.add.image(960, 540, 'win_background');
  gameOver = this.add.text(780, 340, "YOU WIN!").setScale(4);
  // retryButton = this.add.image(880, 940, 'retryButton');
  // retryButton.setInteractive();
  retryText = this.add.text(750, 540, "Refresh to retry").setScale(3);

  winmusic= this.sound.add('win_music', {loop: true});
  // this.sound.play("win_music");

  // this.input.on("pointerdown", () => winmusic.stop());
  this.input.on('gameobjectdown', () => this.scene.start(bossScene));
}
function updateW(){

}
