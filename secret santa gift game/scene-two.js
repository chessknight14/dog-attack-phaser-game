//var printed;


var sndScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "sndScene" });
    },
    init: function(data) {
        //this.testing = data.testingStats;
        //console.log('data', data);
        this.deathCall = data.deathCall;
    },
    preload: function() {
        this.load.image('game_over', 'src/assets/overgame.png');

        
    },
    create: function() {
        var endGame = this.add.image(0, 0, 'game_over').setOrigin(0, 0);
        const over = this.sound.add('gameOver');
        //delsay then play sound
        this.time.addEvent({
            delay: 500,
            loop: false,
            callback: () => {over.play()}
        });

        


        // "you died" MeChanIcs

       
        
        var printed = this.add.text(260, 320, 'score: ' + score,
            { fontSize: '60px', fill: '#474747', fontFamily: 'pixel'});

        var total = this.add.text(210, 420, 'Lofi ' + ' discs ' + ' collected: ' + discs_col,
            { fontSize: '30px', fill: '#474747', fontFamily: 'pixel'});

        //death message

        var final_mes = this.add.text(230, 210, this.deathCall,
            { fontSize: '40px', fill: '#806d01', fontFamily: 'pixel'});


        player = this.physics.add.sprite(100, 100, 'player').setScale(1.8);
        player.body.setGravityY(900);
        player.setCollideWorldBounds(true);
        
        


    },
    update: function() {
        player.anims.play('dash_right');
        if (player.body.velocity.y == 0){
            player.anims.play('dead');
        }
    }
});


/*              (just in case if you make another scene)
var sndScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "sndScene" });
    },
    init: function() {},
    preload: function() {
        this.load.image('platforms', 'src/assets/ground.png');
    },
    create: function() {
        var write = this.add.text(100, 70, "place holder", 
            {fontSize: 40, color: "#000000", fontFamily: 'pixel'});
    },
    update: function() {}
});
*/