var list_of_uhh = [" " + " of Starvation", "death " + " by " + " Hairballs"];
var bagin;

//var blow;
var respawn = false;
var respawnTwo = false;
var dropDisc1 = false;
var dropDisc2 = false;

var disc1;
var disc2;
var lofis;

var dropBalls;
var dropBallsTwo;

var bones;

var hairball;
var cat;
var cat2;
var shield_engaged = true;
var shield;

var discs_col = 0;
var discs = 0;
var discStat;

var health = 100;
var healthStat;

var hunger = 100;
var hungerStat;

var score = 0;
var scoreStat;

var niceTry;

var zoomDash = 1200;
var isDashing = false;
var speed = 380;

var plat;

var StartScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "StartScene" });//yee
    },
    init: function(data) {
        this.message = data.message;
    },//where to recieve drafted info?? 
    preload: function() {
        this.load.image('disc1', 'src/assets/dvd1.png');
        this.load.image('disc2', 'src/assets/dvd2.png');
        this.load.spritesheet('catplane', 'src/assets/catplanee.png', {frameWidth: 120, frameHeight: 120});
        this.load.spritesheet('catplane2', 'src/assets/catplane2.png', {frameWidth: 120, frameHeight: 120});
        this.load.image('ground', 'src/assets/ground.png');
        this.load.image('bone', 'src/assets/bonemeal.png');
        this.load.spritesheet('hairball', 'src/assets/ballhair.png', {frameWidth: 54, frameHeight: 54} );
        this.load.image('shield', 'src/assets/shield.png');
        this.load.spritesheet('player', 'src/assets/chien.png', {frameWidth: 84, frameHeight: 68});

        this.load.image('stone_floor', 'src/assets/stones.png');
        this.load.image('place_bg', 'src/assets/place.png');

        //this.load.image('', '');

        //audio
        this.load.audio('eatBone', ['src/audio/coin-collect.mp3']);
        this.load.audio('boom', ['src/audio/loud-boom.mp3']);
        this.load.audio('oof', ['src/audio/falls_sound.mp3']);
    },
    create: function() {
        const eatSound = this.sound.add('eatBone', {volume: 1.5});
        const planeBoom = this.sound.add('boom');
        const oof = this.sound.add('oof');
        bagin = this.sound.add('startgame', {volume: 0.2});

        bagin.play();
        bagin.loop = true;

        //sounds? /\ /\
        var background = this.add.image(0, 0, 'place_bg').setOrigin(0, 0);

        plat = this.physics.add.staticGroup(); 
        plat.create(400, 511, 'stone_floor').setSize(800, 30);


    

        player = this.physics.add.sprite(100, 100, 'player').setScale(0.8).setOrigin(0,0).setScale(1.2);
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(plat, player);//nowww it works
        

        //lofis or disc 1/2
        
        lofis = this.physics.add.group();


        //bones factory zone
        
        bones = this.physics.add.group();

        this.time.addEvent({                            
            delay: 4000,
            startAt: 1000,
            callback: () => {
              var random = Phaser.Math.Between(40, 720);
              const newBone = bones.create(random, 400, 'bone');
        
              newBone.setScale(0.9).setGravityY(300).setBounce(0.3);
              this.physics.add.collider(plat, newBone);
              this.physics.add.overlap(newBone, player, function(){
                eatSound.play();
                collectBone();
                newBone.destroy();
              });
            },
            loop: true
          });
          


        //__________frame animation for________________

        this.anims.create({
            key: 'right',
            frames: [ {key: 'player', frame: 0}],
            frameRate: 10,
            // 0 would mean doesn't loop
        });

        this.anims.create({
            key: 'left',
            frames: [ {key: 'player', frame: 3}],
            frameRate: 10,
            //does hideOnComplete: true exist?
        });

        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('player', {start: 1, end: 2, first: 1}),
            frameRate: 10,
            repeat: -1
            //yoyo: true exists
        });

        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('player', {start: 4, end: 5, first: 4}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dash_right',
            frames: [ {key: 'player', frame: 6}],
            frameRate: 10,
        });

        this.anims.create({
            key: 'dash_left',
            frames: [ {key: 'player', frame: 7}],
            frameRate: 10,
        });

        this.anims.create({
            key: 'dead',
            frames: [ {key: 'player', frame: 8}],
            frameRate: 10,
        });

        //_ _   _     _ _ __   _ _   _       _         _
        this.anims.create({
            key: 'fall',
            frames: [ {key: 'hairball', frame: 0}],
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'up',
            frames: [{key: 'hairball', frame: 1}],
            frameRate: 10,
            loop:true
        })
        
        //----------------        CAT PLANES     -----------------

        this.anims.create({
            key: 'flying1',
            frames: this.anims.generateFrameNumbers('catplane', {start: 0, end: 1, start: 0}),
            frameRate: 7,
            loop: true
        })

        this.anims.create({
            key: 'flying2',
            frames: this.anims.generateFrameNumbers('catplane2', {start: 0, end: 1, start: 0}),
            frameRate: 7,
            loop: true
        })


        //_____________________________________

        player.on(
            Phaser.Animations.Events.ANIMATION_UPDATE,
            function (anim, frame, sprite, frameKey) {
                /*if (frameKey == 1 || frameKey == 2 && player.body.velocity.x == 0){ //stand right?
                    player.anims.play('right');
                } else if (frameKey == 0){
                    player.anims.play('run_right', true);
                }
                if (frameKey == 4 || frameKey == 5 && player.body.velocity.x == 0){// stand left?
                    player.anims.play('left');
                } else if (frameKey == 3){
                    player.anims.play('run_left', true);
                }*/
            }
        );//doesn't work as intended yet




        //+++_________________________________________________

        shield = this.physics.add.sprite(player.body.position.x, player.body.position.y, 'shield').setOrigin(0,0);
        



        cat = this.physics.add.sprite(880, 100, 'catplane').setScale(1.2).setSize(115, 55).setOffset(0, 20);
        

        this.tweens.add({
            targets: cat,
            x: -80,
            flipX: true,
            yoyo: true,
            duration: 5000,
            repeat: -1
        })

        //stunt double
        cat2 = this.physics.add.sprite(-80, 150, 'catplane2').setScale(1.2).setSize(115, 55).setOffset(0, 20);
        cat2.flipX = true;

        this.tweens.add({
            targets: cat2,
            x: 880,
            flipX: true,
            yoyo: true,
            duration: 7000,
            repeat: -1
        })
        
        //catPlane.disableBody(true, true);
        
        //undo to here be
        
    
        var randSec = Phaser.Math.Between(2000, 4000);
        dropBalls = this.time.addEvent({
            delay: randSec,
            loop: true,
            callback: () => {
                
                var newHairball = this.physics.add.sprite(cat.body.position.x, cat.body.position.y, 'hairball').setGravityY(500).setBounce(0.8).setScale(1.3).setCircle(22, 2, -1).setOrigin(0,0);
                
                
                
                this.time.addEvent({
                    delay: 1500,
                    callback:() => {
                        this.physics.add.overlap(newHairball, cat, function(){
                            //FIGURE IT OUT
                            dropDisc1 = true;
                            score += 100;
                            scoreStat.setText('Score: ' + score);
                            console.log('clear to attack');
                            planeBoom.play();
                            newHairball.destroy();
                            dropBalls.paused = true;
                            cat.disableBody(true, true);
                            //planeRespawn.call.bind(this);
                            respawn = true;
                            
                        });
                    }  
                })

                //
                this.physics.add.collider(plat, newHairball);
                this.physics.add.overlap(player, newHairball, function(){
                    oof.play();
                    health -= 15;
                    healthStat.setText('Health: ' + health);
                    newHairball.destroy();
                    
                }); 
                this.physics.add.overlap(newHairball, shield, function(){
                    newHairball.setVelocityY(-550);
                });
                
                
                
                
                
                this.time.addEvent({
                    delay: 13000,
                    callback:() => {newHairball.destroy();}
                })

                
            }
            
        });
        ///\ WHOLE COPY OF THAT/\/\/\
        //CAT 2
        dropBallsTwo = this.time.addEvent({
            delay: randSec,
            loop: true,
            callback: () => {
                
                var newHairball = this.physics.add.sprite(cat2.body.position.x, cat2.body.position.y, 'hairball').setGravityY(500).setBounce(0.8).setScale(1.3).setCircle(22, 2, -1).setOrigin(0,0);
                
                
                
                this.time.addEvent({
                    delay: 1500,
                    callback:() => {
                        this.physics.add.overlap(newHairball, cat2, function(){
                            dropDisc2 = true;
                            score += 150;
                            scoreStat.setText('Score: ' + score);
                            planeBoom.play();
                            newHairball.destroy();
                            dropBallsTwo.paused = true;
                            cat2.disableBody(true, true);
                            respawnTwo = true;
                            
                        });
                    }  
                })

                //
                this.physics.add.collider(plat, newHairball);
                this.physics.add.overlap(player, newHairball, function(){
                    oof.play();
                    health -= 15;
                    healthStat.setText('Health: ' + health);
                    newHairball.destroy();
                    
                }); 
                this.physics.add.overlap(newHairball, shield, function(){
                    newHairball.setVelocityY(-550);
                });
                
                
                
                
                
                this.time.addEvent({
                    delay: 13000,
                    callback:() => {newHairball.destroy();}
                })

                
            }
            
        });
        
        //disc1 = this.physics.add.sprite(200, 200, 'disc1').setOrigin(0,0).setCircle(26);
        //disc1.flipX = false;
        //disc2 = this.physics.add.sprite(400, 200, 'disc2').setOrigin(0,0).setCircle(26);

        


        this.time.addEvent({
            delay: 1500,//set to other time later
            loop: true,
            callback: () => {
                hunger -= 5;
                hungerStat.setText('Hunger: ' + hunger);
            }
            
        });

     
        niceTry = this.add.text(15, 275, 'The catacombs are not available', { fontSize: '48px', fill: '#fcf9fc', fontFamily: 'pixel'});
        niceTry.visible = false;

        scoreStat = this.add.text(12, -1, 'score: 0', { fontSize: '28px', fill: '#333333', fontFamily: 'pixel'});
        hungerStat = this.add.text(170, 0, 'Hunger: 100', { fontSize: '28px', fill: '#333333', fontFamily: 'pixel'});
        healthStat = this.add.text(340, 0, 'Health: 100', { fontSize: '28px', fill: '#333333', fontFamily: 'pixel'});
        discStat = this.add.text(600, 3, 'Lofi: 0', { fontSize: '28px', fill: '#fcf9fc', fontFamily: 'pixel'});

        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        

    },  //      -          END OF CREATE FUNCT      -
    
    update: function() {
        
        isDashing = false;
        
        //player physics
        //might need to make the physics myself next time
    
        if (cursors.left.isDown){
            player.setVelocityX(-speed);
            player.anims.play('run_left', true);
            
        } else if (cursors.right.isDown){
            player.setVelocityX(speed);
            player.anims.play('run_right', true);
            
        } else {
            player.setVelocityX(0);
            player.anims.play('left');
        }





        /* dash? (to the right)*/
        if (spacebar.isDown && cursors.right.isDown && !isDashing){
            isDashing = true;
            player.anims.play('dash_right');
            dashToRight.call(this);
            this.time.addEvent({
                delay: 2000,
                loop: false,
                callback: () => {
                    isDashing = false;
                }
                
            });
        }
            //dash (to the left (criss cross))
        if (spacebar.isDown && cursors.left.isDown && !isDashing){
            isDashing = true;
            player.anims.play('dash_left');
            dashToLeft.call(this);
            this.time.addEvent({
                delay: 2000,
                loop: false,
                callback: () => {
                    isDashing = false;
                }
                
            });
        }

        //___________________

        
        if (health < 35){
            healthStat.setTint(0xff0000);
        } else {
            healthStat.clearTint();
        }
        
        if (health <= 0){
            bagin.stop();
            this.scene.start('sndScene', {deathCall: list_of_uhh[1]});
            //this.scene.stop('StartScene').launch('sndScene'); works but wont be able to pass data
        }
        if (hunger <= 0){
            bagin.stop();
            this.scene.start('sndScene', {deathCall: list_of_uhh[0]});
        }

        if (health > 100){ //don't surpass the limit
            health = 100;
            healthStat.setText('Health: ' + health);

        }

        if (hunger > 100){
            hunger = 100;
            hungerStat.setText('Hunger: ' + hunger);
        }
        
            //   SHIELD POWERUP
        if (shield_engaged){
            shield.enableBody(true, true);
            shield.setPosition(player.body.position.x + 15, player.body.position.y - 15);
        } else{
            shield.disableBody(true, true);
        }
        //finally
        
        
        if (cursors.down.isDown){
            niceTry.visible = true;
            //player.disableBody(true, true);
            this.time.addEvent({
                delay: 1500,
                loop: false,
                callback: () => {
                    niceTry.visible = false;
                }
            });
        }

        
        if (cursors.up.isDown){
            bagin.stop(); //(see if this works later if can add)
        }

        if (respawn){
            respawn = false;
            this.time.addEvent({
                delay: 3000,
                loop: false,
                callback: () => {
                    cat.enableBody(true, true);
                    cat.setPosition(880, 100);
                    cat.visible = true;
                    dropBalls.paused = false;
                    
                }
            });
        }        ///\ copy of that?

        if (respawnTwo){
            respawnTwo = false;
            this.time.addEvent({
                delay: 2500,
                loop: false,
                callback: () => {
                    cat2.enableBody(true, true);
                    cat2.setPosition(-80, 150);
                    cat2.visible = true;
                    dropBallsTwo.paused = false;
                    console.log('TWO CATS');
                    
                }
            });
        }   
        
        
        if (dropDisc1){
            dropDisc1 = false;
            console.log('shall drop?');
            //lofi1 = this.physics.add.sprite(cat.body.position.x, cat.body.position.y, 'disc1').setGravityY(400).setOrigin(0,0).setCircle(26);;
            disc1 = lofis.create(cat.body.position.x, cat.body.position.y, 'disc1').setGravityY(400).setOrigin(0,0).setCircle(26);
            this.physics.add.overlap(player, disc1, function(){
                discs += 1;
                discs_col += 1;
                discStat.setText('Lofi: ' + discs);
                disc1.destroy();
            });
        }                //   /\ STUNT DOUBLE THAT

        if (dropDisc2){
            dropDisc2 = false;
            console.log('shall drop?');
            disc2 = lofis.create(cat2.body.position.x, cat2.body.position.y, 'disc2').setGravityY(400).setOrigin(0,0).setCircle(26);
            this.physics.add.overlap(player, disc2, function(){
                discs += 1;
                discs_col += 1;
                discStat.setText('Lofi: ' + discs);
                disc2.destroy();
            });
        }  



        cat.anims.play('flying1', true); //and this
        cat.anims.play('flying2', true);
    
    } //          -            END OF UPDATE FUNCT           -



}); //                       END OF JS SCRIPT






function planeRespawn(){//doesn't work
    this.time.addEvent({
        delay: 3000,
        loop: false,
        callback: () => {
            cat.enableBody(true, true);
            dropBalls.paused = false;
            console.log('um?');
        }
    });
}

function collectBone(){
    
    hunger += 5;
    hungerStat.setText('Hunger: ' + hunger);
}


function dashToRight(){
    player.setVelocityX(zoomDash);
    this.time.addEvent({
        delay: 150,
        loop: false,
        callback: () => {
            player.setVelocityX(100);
            player.anims.play('right');
            
        }
    });
}

function dashToLeft(){
    player.setVelocityX(-zoomDash);
    this.time.addEvent({
        delay: 150,
        loop: false,
        callback: () => {
            player.setVelocityX(-100);
            
            player.anims.play('left');
        }
    });
}

/*ALL THIS FOR THISSSS

this.releasingBalls = this.time.addEvent(*etc* ):
// Later:
this.releasingBalls.paused = true;


*/
