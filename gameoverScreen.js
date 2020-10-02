class gameOverScene extends Phaser.Scene{
  constructor(){
    super("gameOverScene")
  }

  preload() {
      this.load.image('environment', 'Assets/Boss/Bossbackground.png');
      this.load.image('button', 'Assets/Respiratory/button.png');
  }

  create(){
    background = this.add.image(960, 540, 'environment');
    restartbutton = this.add.image(480, 270, 'button');
    restartbutton.input.on('pointerDown', () => this.scene.start('bossScene'))
  }
}
