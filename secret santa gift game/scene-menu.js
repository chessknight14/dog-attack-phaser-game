var MenuScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "MenuScene" });//what the scene is called
    },
    init: function() {},
    preload: function() {
        this.load.image('gameCover', 'src/assets/cover.png');
        this.load.image('playbutton', 'src/assets/lol.png');

        //audio
        this.load.audio('startgame', ['src/audio/future-8bit.mp3']);
        this.load.audio('gameOver', ['src/audio/monody_lofi.mp3']);
    },
    create: function() {
        
        var begin = this.add.image(0, 0, 'gameCover').setOrigin(0, 0);
        
    
        const button = this.add.sprite(530, 350, 'playbutton').setScale(1.4).setInteractive();
       
        
        button.on('pointerup', (pointer) => {
            //this.scene.start('StartScene');
            this.scene.stop('MenuScene').launch('StartScene');
        });

        button.on('pointerdown', function (pointer){
            button.setAlpha(0.5);
        });


        
        
            

        
        console.log("Don't give up");
    },
    update: function() {}
});



/*           nOOoOOoO

class Ball extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setScale(0.9);

        //  physics properties
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(-200);

        this.destroyTimer = 2500;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.destroyTimer -= delta;

        if (this.destroyTimer <= 0)
        {
            this.remove();
        }
    }

    collect ()
    {
        //  Do something when the ball is collected
        this.remove();
    }

    remove ()
    {
        Phaser.Utils.Array.Remove(this.scene.balls, this);

        this.destroy();
    }
}

class Game extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    create ()
    {
        this.cat = this.add.image(400, 300, 'cat'); // replace with your own cat physics sprite

        //  As a ball is created, it's added to this array (you could use a Group as well if you need, but this is quick)
        this.balls = [];

        this.time.addEvent({
            delay: 1500,
            startAt: 1500,
            callback: () => this.releaseBall(),
            loop: true
        });

        this.physics.add.overlap(this.cat, this.balls, this.collectBall, null, this);
    }

    releaseBall ()
    {
        if (!this.cat.active)
        {
            return;
        }

        let ball = new Ball(this, this.cat.x + 15, this.cat.y + 40, 'ball');

        this.balls.push(ball);
    }

    collectBall (cat, ball)
    {
        ball.collect();
    }
}*/