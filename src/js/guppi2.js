var game = new Phaser.Game(800,600, Phaser.AUTO, "gameDiv");
var guppi;
console.log('help me');
var mainState = {
	preload: function(){
		console.log('teh hell man');
		game.load.image('guppi', '../assets/guppi.png');

	},

	create: function(){
			// adding physics because SCIENCE
	    	game.physics.startSystem(Phaser.Physics.ARCADE);

	    	//background color because COLOR!
	    	game.stage.backgroundColor = '#6FE0D7';

	    	// Introducing our main character
	    	this.guppi = game.add.sprite(100,245, 'guppi');

	    	// giving main character physics!
	    	game.physics.arcade.enable(this.guppi);

	    	// main character is subject to laws of gravity
	    	this.guppi.body.gravity.y = 1000;

	    	// setting spacebar as input for "jumping" or "swimming"
	    //	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	    //	spaceKey.onDown.add(this.jump, this);

	},

	update: function(){
		// if main character drowns then restart game
		if (this.guppi.y < 0 ) //|| this.guppi.y > 600)
			this.restartGame();
	},

	// jump or swim function
	//jump: function(){
		//vertical velocity
	//	this.guppi.body.velocity.y = -350;
	//},

	// restart the game
	restartGame: function(){
		game.state.start('main');
	}
};

// Initialize game


game.state.add('main', mainState);
game.state.start('main');