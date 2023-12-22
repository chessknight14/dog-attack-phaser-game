class Hairball extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, texture)
    {
        super(scene, x, y);

        //var x = cat.body.position.x;
        //var y = cat.body.position.y;

        scene.physics.world.enable(this);
        scene.add.existing(this);

        //this.setScale(0.9);

        //  physics properties
        //this.setCollideWorldBounds(true);
        //this.setVelocityX(-200);
        

        this.destroyTimer = 5000;
        console.log('Working');
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

    hit ()
    {
        //  Do something when the ball is collected
        
        health -= 15;
        healthStat.setText('Health: ' + health);
        //hairball.destroy();
        
        this.remove();
    }

    remove ()
    {
        Phaser.Utils.Array.Remove(this.scene.hairballs, this);

        this.destroy();
    }
}

class GameScene extends Phaser.Scene
{
    constructor (){

        super('GameScene');
    }

    

    create ()
    {
        console.log('I am create method');
        this.cat = this.add.image(400, 300, 'enemy'); 

        //var cat = this.physics.add.sprite(220, 200, 'enemy');

        this.plat = this.physics.add.staticGroup(); 
        this.plat.create(400, 650, 'ground').setScale(2).refreshBody();
        
        
        

        
        this.hairballs = [];

        this.time.addEvent({
            delay: 2000,
            startAt: 2000,
            callback: () => this.releaseBall(),
            loop: true
        });
        this.tweens.add({
            targets: this.cat,
            x: 5,
            flipX: true,
            yoyo: true,
            duration: 5000,
            repeat: -1
        })


        //this.physics.add.overlap(player, this.hairballs, this.hitsPlayer, null, this);
    }

    releaseBall ()
    {
        if (!this.cat.active)
        {
            return;
        }

        let hairball = new Hairball(this, this.cat.x, this.cat.y, 'hairball');

        this.hairballs.push(hairball);
        hairball.setGravityY(500);
        this.physics.add.collider(this.plat, this.hairball);
    }

    hitsPlayer (player, hairball)
    {
        hairball.hit();
    }
}
// replace with your own cat physics sprite
//  As a ball is created, it's added to this array (you could use a Group as well if you need, but this is quick)