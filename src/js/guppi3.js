var game = new Phaser.Game (1280, 720, Phaser.AUTO, 'gameDiv');
var guppi;
var platforms;


var mainState = {
	preload: function(){
		game.load.image('guppi','src/assets/guppi.png');
		game.load.image('ground', 'src/assets/pipe.png');
	},

	create: function(){
		//adding physics because SCIENCE
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//background color
		game.stage.backgroundColor = '#6fe0d7';

		// create platforms
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height -64, 'ground');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

		//introduce main character
		//game.physics.arcade.enable(guppi);
		//guppi.body.bounce.y = 0.2;
		//guppi.body.gravity.y = 300;
		//guppi.body.collideWorldBounds = true;
		this.guppi = game.add.sprite(0,0, 'guppi');
		game.physics.arcade.enable(this.guppi);
		this.guppi.body.gravity.y = 800;
		this.guppi.body.collideWorldBounds = true;

		//set spacekey
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //spaceKey.onDown.jump();
        //game.input.onDown.jump();
        if(spaceKey.onDown) {
        	this.guppi.body.velocity.y = -350;
        }
	},

	update: function(){
		var hitPlatform = game.physics.arcade.collide(guppi, platforms);
	},



};

game.state.add('main', mainState);
game.state.start('main');