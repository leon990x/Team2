  gameOver.preload = preloadGO
  gameOver.create = createGO
  gameOver.update = updateGO

  function preloadGO() {
      this.load.image('over_background', 'Assets/Boss/GameOverScreen.png');
      this.load.image('button', 'Assets/Respiratory/Button.png');
  }

  function createGO(){
    const self = this;
    console.log('hello!')
    background = this.add.image(960, 540, 'over_background');
    gameOver = this.add.text(780, 540, "GAME OVER!").setScale(4);
    // retryButton = this.add.image(880, 940, 'retryButton');
    // retryButton.setInteractive();
    retryText = this.add.text(750, 740, "Refresh to retry").setScale(3);
    this.input.on('gameobjectdown', () => this.scene.start(bossScene));
  }
  function updateGO(){

  }
