// Initialize Phaser, and create a 400x500px game
var game = new Phaser.Game(400, 500, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update, render: render });


// This function will be executed once at the beginning of the game 
function preload() {
	// set stage
	game.stage.backgroundColor = '#71c5cf';

	// load our assets, AKA spritesheet: name, file, width, height, count
	game.load.spritesheet('flyingbird', 'assets/images/bluebird.png', 256 / 4, 256 / 4, 16);
	game.load.image('pipe', 'assets/images/pipe.png');
	game.load.spritesheet('explosion', 'assets/images/explosion.png', 320 / 5, 320 / 5, 25);

	// load sound
	game.load.audio('jump', 'assets/sounds/jump.wav');
	game.load.audio('explode', 'assets/sounds/flashbang.wav');

}

// This function is called after the preload function
function create() {
	// Set the physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// put the bird on the stage: x,y,name, sprite #
	game.bird = game.add.sprite(100, 100, 'flyingbird', 4);
	game.bird.animations.add('fly', [4, 5, 6, 7], 20, true);
	game.bird.animations.play('fly');

	// enable physics on the bird
	game.physics.arcade.enable(game.bird);
	game.bird.body.gravity.y = 1000; //px/s^2 (pixels per second squared)
	game.bird.checkWorldBounds = true;
	game.bird.outOfBoundsKill = true;

	// make the hit box smaller: width, height, x, y
	game.bird.body.setSize(60, 40, 0, 15);

	// add click events for spacebar and mouse/finger
	var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spacebar.onDown.add(jump);
	game.input.onDown.add(jump);

	// add some pipes
	game.pipes = game.add.group();
	game.pipes.enableBody = true;
	game.pipes.createMultiple(20, 'pipe');

	// add pipe automatically every 1.5 seconds
	game.pipeTimer = game.time.events.loop(1500, addRowOfPipes, this);

	// keep track of score
	game.score = 0;
	game.scoreLabel = game.add.text(20, 20, game.score, { font: "30px Arial", fill: "#ffffff" });

	// add audio
	game.jumpSounds = game.add.audio('jump');

	game.playing = true;
}

// This function is called 60 times per second    
// It contains the game's logic
function update() {

	if (!game.bird.alive && game.playing) {
		gameOver();
	}
	else {
		// check to see if bird is touching the pipe
		game.physics.arcade.overlap(game.bird, game.pipes, hitPipe, null, this);
	}

}

// this is called after the "update" function
// in this case, it's used for strictly for debugging
function render() {
	//game.debug.spriteInfo(game.bird, 10, 10);
	//game.debug.body(game.bird);

}

// make the bird go up
function jump() {
	if (!game.bird.alive) {
		game.state.restart();
		return;
	}

	game.bird.body.velocity.y = -350; // px/s

	// make noise
	game.jumpSounds.play();
}

// create row of pipes
function addRowOfPipes() {
	// pick a random hole between 1-6
	var hole = Math.floor(Math.random() * 5 + 1);

	// add a brick for every spot except the hole
	for (var i = 0; i < 8; i++) {
		if (i !== hole && i !== hole + 1) {
			// 
			addOnePipe(400, i * 60 + 10);
		}
	}

	// add to score
	game.scoreLabel.text = game.score;
	game.score += 1;
}

function addOnePipe(x, y) {
	// get an unused pipe from the group
	var pipe = game.pipes.getFirstDead();

	// put it on the stage
	pipe.reset(x, y);

	//move the pipe
	pipe.body.velocity.x = -200; //px/s

	// kill pipe when it goes off stage
	pipe.checkWorldBounds = true;
	pipe.outOfBoundsKill = true;
}

//
function hitPipe() {
	// add explosion
	var explosion = game.add.sprite(game.bird.body.x, game.bird.body.y, 'explosion');
	explosion.animations.add('kaboom');
	explosion.animations.play('kaboom');

	var explodeSound = game.add.audio('explode');
	explodeSound.play();

	game.bird.kill();

	gameOver();
}


function gameOver() {
	// stop the creation of new pipes
	game.time.events.remove(game.pipeTimer);

	// loop through all pipes on stage
	game.pipes.forEachAlive(function (pipe) {
		pipe.body.velocity.x = 0;
	});

	//game over message
	game.add.text(game.world.centerX, game.world.centerY, 'Game Over', { font: "50px Arial", fill: "#ffffff", align: "center" }).anchor.set(0.5);

	game.playing = false;

}