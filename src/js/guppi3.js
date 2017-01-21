var game = new Phaser.Game (1280, 720, Phaser.AUTO, 'gameDiv');
var guppi;

var mainState = {
	preload: function(){
		game.load.image('guppi','src/assets/guppi.png');
	},

	create: function(){
		//adding physics because SCIENCE
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//background color
		game.stage.backgroundColor = '#6fe0d7';

		//introduce main character
		this.guppi = game.add.sprite(0,0, 'guppi');
		game.physics.arcade.enable(this.guppi);
		this.guppi.body.gravity.y = 800;

		//set spacekey
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);
		game.input.onDown.add(this.jump, this);
	},

	update: function(){

	},



};

game.state.add('main', mainState);
game.state.start('main');