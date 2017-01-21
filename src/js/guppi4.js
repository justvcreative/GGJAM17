var game = new Phaser.Game(1280, 720, Phaser.AUTO, "gameDiv");

var mainState = {

    preload: function() { 
        if(!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);
        }
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#6fe0d7';

        game.load.image('guppi', 'src/assets/guppi.png');  
        game.load.image('pipe', 'src/assets/pipe.png'); 

        // Load the jump sound
        game.load.audio('jump', 'src/assets/jump.wav'); 
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);

      //  this.pipes = game.add.group();
      //  this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);           

        this.guppi = game.add.sprite(100, 245, 'guppi');
        game.physics.arcade.enable(this.guppi);
        this.guppi.body.gravity.y = 1000; 

        // New anchor position
        this.guppi.anchor.setTo(-0.2, 0.5); 
 
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        game.input.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        // Add the jump sound
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.volume = 0.2;
    },

    update: function() {
        if (this.guppi.y < 0 || this.guppi.y > game.world.height)
            this.restartGame(); 

       // game.physics.arcade.overlap(this.guppi, this.pipes, this.hitPipe, null, this); 
            
        // Slowly rotate the bird downward, up to a certain point.
        if (this.guppi.angle < 20)
            this.guppi.angle += 1;  
    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.guppi.alive == false)
            return; 

        this.guppi.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.guppi).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    restartGame: function() {
        game.state.start('main');
    },


};

game.state.add('main', mainState);  
game.state.start('main'); 