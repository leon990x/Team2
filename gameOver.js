// FIX ME: SCENE IS BEING UNDEFINED
gameOver.preload = preloadGO
gameOver.create = createGO
gameOver.update = updateGO

  function preloadGO() {
      this.load.image('environment', 'Assets/Boss/Bossbackground.png');
      this.load.image('button', 'Assets/Respiratory/Button.png');
  }

  function createGO(){
    console.log('hello!')
    background = this.add.image(960, 540, 'environment');
    gameOver = this.add.text(0, 0, "GAME OVER!");
    restartbutton = this.add.image(480, 270, 'button');
    retryButton = this.add.text(0, 0, "Retry");
    retryButton.input.on('pointerDown', () => this.scene.start('bossScene'));
  }
  function updateGO(){

  }
