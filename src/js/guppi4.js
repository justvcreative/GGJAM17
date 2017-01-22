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

        game.load.image('background', 'src/assets/background.png');
        game.load.image('guppi', 'src/assets/guppi.png');  
        game.load.image('ground', 'src/assets/pipe.png'); 
        game.load.image('burger', 'src/assets/Burger.png');
        // Load the jump sound
        game.load.audio('jump', 'src/assets/jump.wav');

        // making a snake
        game.load.image('snake', 'src/assets/snake.png'); 
    },

    create: function() { 
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background image
        game.add.tileSprite(0,0,1280,720, 'background');

        //trying to define guppi with no luck
        var guppi = this.guppi;

        this.guppi = game.add.sprite(100, 245,'guppi');
        game.physics.arcade.enable(this.guppi);

        this.guppi.body.gravity.y = 500; 
        this.guppi.collideWorldBounds = true;
        this.guppi.body.velocity.x = 0;
        this.guppi.scale.setTo(0.5);


        // New anchor position
        this.guppi.anchor.setTo(-0.2, 0.5); 
 
        // set keyboard inputs
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        game.input.onDown.add(this.jump, this);
        cursors = game.input.keyboard.createCursorKeys();


        // score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        // Add the jump sound
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.volume = 0.2;

        // Forming a ground or platforms

        platforms = game.add.group();
        platforms.enableBody = true;


        var ground = platforms.create(0, game.world.height -64, 'ground');
        ground.scale.setTo(30,10);

        ground.body.immovable = true;

        // making food
        burgers = game.add.group();
        burgers.enableBody = true;

        for (var bv = 0; bv < 10; bv++ ){
            var burger = burgers.create(bv * 100, Math.random(), 'burger');
            burger.body.gravity.y = 9;
            burger.body.bounce.y = 0.7 + Math.random() * 0.2;
            burger.scale.setTo(Math.random());
             if (burger.angle < 20){
                 burger.angle += 1;  
                 }
        }
       
        // making a wave
        var count = 0;
        var length = 918 / 20;
        var points = [];

        for (var i = 0; i < 30; i++){
            points.push(new Phaser.Point(i * length, 0));
        }
        let rope = game.add.rope(50, this.game.world.centerY, 'snake', null, points);
        rope.scale.set(0.5);

        rope.updateAnimation = function() {
        count += 0.1;

        for (var i = 0; i < this.points.length; i++)
        {
            this.points[i].y = Math.sin(i * 0.5 + count) * 60;
        }

        // making lots of waves
        snakes = game.add.group();
        snakes.enableBody = true;
        // how big is yo wave
        snakes.scale.setTo();
    };



    },
    render: function() {
        
    },

    update: function() {
       game.physics.arcade.collide(this.guppi, this.snake, collisionHandler, null, this); 
            
        // Slowly rotate the bird downward, up to a certain point.
        if (this.guppi.angle < 20)
            this.guppi.angle += 1;  

        // collide with ground or platforms
        var hitPlatforms = game.physics.arcade.collide(this.guppi, platforms);

        //collide with waves
        // var hitWaves = game.physics.arcade.collide(this.guppi, waves);

        //burger collisions
        game.physics.arcade.collide(burgers, platforms);
        game.physics.arcade.overlap(this.guppi, burgers, collectBurgers, null, this);

        //cursors as keyboard
        if (cursors.left.isDown){
            this.guppi.body.velocity.x = -150;
        }
        else if (cursors.right.isDown){ 
            this.guppi.body.velocity.x = 150;
        }
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

function collisionHandler(guppi, wave){
    guppi.kill();
}

function collectBurgers (guppi, burger) {
    burger.kill();
}

game.state.add('main', mainState);  
game.state.start('main'); 