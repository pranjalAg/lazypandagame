  //the event occurred
    var config = {
        type: Phaser.AUTO,
        width: 2000,
        height: 800,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 1800 },
                debug: false
            }},
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    var platforms;
    var player;
    var playerpx;
    var cursors;
    var stones;
    var bamboos;
    var lavas1;
    var platformsm1;    
    var gameOver= false;
    var score = 0;
    var scoreText;
    var win;
    var keys;
    var lavas2;
    var platformsm3;
    var doors;
        

    var game = new Phaser.Game(config);
/*--------calling resize function----------*/   
    window.onload = function() {
    resize();
    resize();
    resize();
    resize();
    resize();
    resize();
    resize();
    window.addEventListener("resize", resize, false);
    }
/*##########################################*/   

    
/*-------loading assets--------*/ 
    function preload ()
    {           
    /*----------Loading Bar-----------*/
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(860, 370, 320, 50);
            
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
        var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            
            
        this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(870, 380, 300 * value, 30);
            });
            
            

        this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                
            });   
    /*#################################*/


        this.load.image('background', 'panda/level1/background.jpg');
        this.load.image('ground', 'panda/level1/ground.png');
        this.load.image('sun1', 'panda/level1/sun1.png');
        this.load.image('cloud', 'panda/level1/cloud.png');
        this.load.image('stone', 'panda/level1/stone.png');
        this.load.image('apple', 'panda/level1/apple.png');        
        this.load.image('pass', 'panda/level1/pass.png');      
        this.load.image('lava', 'panda/level1/lava.png');
        this.load.image('lava2', 'panda/level1/lava2.png');
        this.load.image('gameover', 'panda/level1/gameover.png');
        this.load.image('groundsm', 'panda/level1/groundsm.png');
        this.load.image('win', 'panda/level1/win.png');
        this.load.spritesheet('pandapx', 'panda/level1/pandapx.png', {frameWidth: 70, frameHeight: 100 });
        this.load.spritesheet('startBtn', 'panda/level2/startBtn.png', {frameWidth: 60, frameHeight: 60 });
        this.load.audio('jump', 'panda/level1/jump4.mp3');
        this.load.audio('collect', 'panda/level1/collect.mp3');        
        this.load.audio('gameov', 'panda/level1/gameov.mp3');
        this.load.image('doorc', 'panda/level1/doorc.png');
        this.load.image('dooro', 'panda/level1/dooro.png');
        this.load.audio('gateop', 'panda/level1/gateop.mp3');
    }
/*##############################*/   


    function create ()
    {
        this.add.image(800, 400, 'background');
        this.add.image(1400, 160, 'sun1');


/*-----adding clouds at different location-----*/    
        this.add.image(0, 80, 'cloud');
        this.add.image(200, 140, 'cloud');
        this.add.image(300, 100, 'cloud');
        this.add.image(550, 180, 'cloud');
        this.add.image(780, 120, 'cloud');
        this.add.image(900, 140, 'cloud');
        this.add.image(1150, 200, 'cloud');
        this.add.image(1660, 190, 'cloud');
        this.add.image(1600, 60, 'cloud');
        this.add.image(1950, 120, 'cloud');
/*#############################################*/    

   	
/*-------adding player-------*/    
        playerpx = this.physics.add.sprite(50, 640, 'pandapx');
        playerpx.setBounce(0.2);
        playerpx.setCollideWorldBounds(true);
/*###########################*/


/*----------Main Platforms----------*/
        platforms = this.physics.add.staticGroup();
        platforms.create(-300, 760, 'ground');
        platforms.create(1500, 760, 'ground');
/*##################################*/  

    
/*----------Small Platform 1st-----------*/  
        platformsm1 = this.physics.add.staticGroup();
        platformsm1.create(1200, 580, 'groundsm').setScale(0.3).refreshBody();
/*#######################################*/

    	    	
/*-----Small lava-----*/
    	lavas1 = this.physics.add.staticGroup();
        lavas1.create(600, 780, 'lava');
/*####################*/


/*--------Stone-------*/
    	stones = this.physics.add.staticGroup();
    	stones.create(300, 693, 'stone');
/*####################*/


/*-------Apple------*/
    	bamboos = this.physics.add.staticGroup(); 	
    	bamboos.create(300, 550, 'apple');
    	bamboos.create(600, 500, 'apple');
    	bamboos.create(1200, 640, 'apple');
    	bamboos.create(1700, 500, 'apple');
    	bamboos.create(1200, 400, 'apple');
/*#################-*/


/*---------Extras--------*/
        platformsm3 = this.physics.add.staticGroup();
        platformsm4 = this.physics.add.staticGroup();
    	lavas2 = this.physics.add.staticGroup();
    	keys = this.physics.add.staticGroup();
    	doorsc = this.physics.add.staticGroup();
    	doorso = this.physics.add.staticGroup();

        cursors = this.input.keyboard.createCursorKeys();
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '36px', fill: '#000' });
/*######################*/


/*-----------Player_Animation------------*/
    	this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pandapx', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'pandapx', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pandapx', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
/*######################################*/   

  		
        
  		
        
/*----------Adding Colliders----------*/
        this.physics.add.collider(platforms, playerpx);
        this.physics.add.collider(stones, playerpx);
        this.physics.add.collider(platformsm1, playerpx, platf3, null, this).name = 'splat1';       
        this.physics.add.collider(platformsm3, playerpx);
        this.physics.add.collider(platformsm4, playerpx);
        this.physics.add.overlap(playerpx, bamboos, collectfood, null, this);
        this.physics.add.collider(playerpx, lavas1, burn, null, this);
        this.physics.add.collider(playerpx, lavas2, burn, null, this);
        this.physics.add.overlap(platforms, lavas2, plrem, null, this);
        this.physics.add.overlap(stones, lavas2, strem, null, this);
        this.physics.add.overlap(playerpx, keys, lavacreate, null, this);        
        this.physics.add.collider(platforms, doorsc);
        this.physics.add.collider(playerpx, doorsc).name = 'doclose';
        this.physics.add.collider(platforms, doorso);
        this.physics.add.collider(playerpx, doorso, win, null, this);
/*#####################################*/        

    }

    function update ()
    {
    	if (gameOver)
    	{
        	return;
    	}
    	if (cursors.left.isDown)
        {
            playerpx.setVelocityX(-300);

            playerpx.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            playerpx.setVelocityX(300);

            playerpx.anims.play('right', true);
        }
        else
        {
            playerpx.setVelocityX(0);

            playerpx.anims.play('turn');
        }

        if (cursors.up.isDown && playerpx.body.touching.down)
        {
           	this.sound.play('jump');   
            playerpx.setVelocityY(-750);
        }
   		
    }
   
/*--------Collect_apple & Score-------*/    
    function collectfood(playerpx, apple)
    {
        apple.disableBody(true, true)
        score=score+10;
        scoreText.setText('score: ' + score);
        this.sound.play('collect');
    }
/*#####################################*/


/*----------Show small Platform 2-----------*/
    function platf3()
    {       
        platformsm4.create(1200, 580, 'groundsm').setScale(0.3).refreshBody();
        this.physics.world.colliders.remove(this.physics.world.colliders.getActive().find(function(i){
                    return i.name == 'splat1'
                    }));
        
        var platformsm2 = this.physics.add.staticGroup();
        platformsm2.create(830, 430, 'groundsm').setScale(0.3).refreshBody();
        this.physics.add.collider(platformsm2, playerpx, showkey, null, this).name = 'plat';
    }
/*###########################################*/


/*----------Drop in lava---------*/    
    function burn(playerpx, lava){
    	this.physics.pause();
    	playerpx.setTint(0xff0000);
    	playerpx.anims.play('turn', false);	
    	gameOver = true;
    	this.add.image(940, 350, 'gameover');
    	this.sound.play('gameov');

        this.startBtn = this.add.sprite(940, 500, 'startBtn').setInteractive();
        this.startBtn.on('pointerdown', replay); // Start game on click.
    }
/*##############################*/


/*--------Key appears----------*/    
    function showkey(player, groundsm)
    {
       	keys.create(580, 250, 'pass');

        platforms.create(2328, 760, 'ground');
        
        
        lavas2.create(220, 790, 'lava2').setScale(1.5).refreshBody();
        
        lavas2.create(800, 790, 'lava2').setScale(1.5).refreshBody();
    	
    	lavas2.create(1172, 790, 'lava2').setScale(1.5).refreshBody();
    	platformsm3.create(830, 430, 'groundsm').setScale(0.3).refreshBody();
    	this.physics.world.colliders.remove(this.physics.world.colliders.getActive().find(function(i){
            		return i.name == 'plat'
        			}));

        doorsc.create(1880, 600, 'doorc').setScale(1.5).refreshBody();
    }
/*################################*/


/*----------Remove Main Platform-----------*/    
    function plrem(ground, lava)
    {
    	ground.disableBody(true, true);
    }


/*--------Remove Stone--------*/
    function strem(stone, lava)
    {
        stone.disableBody(true, true);
    }


/*--------Collect Key and Open Door-------*/
	function lavacreate(player, pass)
    {	
    	pass.disableBody(true, true);

        
    	score = score+20;
    	scoreText.setText('score:' + score);
    	

    	if(score==70)
    		{
    		
    		this.sound.play('collect');
            doorso.create(1880, 600, 'dooro').setScale(1.5).refreshBody();	
            this.sound.play('gateop');
            this.physics.world.colliders.remove(this.physics.world.colliders.getActive().find(function(i){
                return i.name == 'doclose'
                }));	
            }	
    	else
    		{
    		this.physics.pause();
    		playerpx.setTint(0xff0000);
    		playerpx.anims.play('turn', false);	
    		gameOver = true;
    		this.add.image(940, 350, 'gameover');
    		msgText = this.add.text(700, 450, 'Collect all apples first', { fontSize: '36px', fill: '#000' });
    		this.sound.play('gameov');

            this.startBtn = this.add.sprite(940, 550, 'startBtn').setInteractive();

            this.startBtn.on('pointerdown', replay); // Start game on click.
    		}
    }
/*#######################################*/
    
    
/*------------Level is completed------------*/
    function win()
    {
			this.physics.pause();
    		playerpx.setTint(0x008000);
    		playerpx.anims.play('turn');
    		gameOver = true;    		
    		window.location.replace("level2.html");
    }
/*#########################################*/

    
/*--------Replay button---------*/
    function replay()
    {
        window.location.replace("level1.html");
    }
/*##############################*/


/*-------Responsive Window Function--------*/   
   function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
        }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
        }
	}
/*##########################################*/	
