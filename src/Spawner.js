import Loot from './Loot.js';
import Monster from './Monster'
import Stairs from './Stairs'

const lootTable = [
    {name: 'Long Sword', color: 'silver', ascii: '/', offset: {x: 6, y:3}},
    {name: 'Health Potion', color: 'red', ascii: '!', offset: {x: 6, y:3}},
    {name: 'Gold coin', color: 'yellow', ascii: '$', offset: {x: 3, y:3}},
    {name: 'Light Armor', color: 'silver', ascii: '/', offset: {x: 6, y:3}},
    {name: 'Long Sword', color: 'lightgray', ascii: '#', offset: {x: 4, y:3}},
];

const monsterTable = [
    {name: 'Ogre', color: 'RGB(245, 220, 69)', ascii: 'O', health: 6, offset: {x: 6, y:3}},
    {name: 'Wyvern', color: 'lightgreen', ascii: 'w', health: 6, offset: {x: 6, y:3}},
    {name: 'Kobolt', color: 'red', ascii: 'k', health: 6, offset: {x: 6, y:3}},
    {name: 'Slime', color: 'blue', ascii: 'S', health: 6, offset: {x: 6, y:3}}
];

class Spawner {
    constructor(world) {
        this.world = world;
    }
    spawn(spawnCount,createEntity) {
        for (let count = 0; count < spawnCount; count++) {
            let entity= createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);            
        }
    }

    spawnLoot(spawnCount){
        this.spawn(spawnCount, ()=> {
            return new Loot(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tilesize,
                lootTable[getRandomInt(lootTable.length)]);
        });
    }

    spawnMonsters(spawnCount){
        this.spawn(spawnCount, ()=> {
            return new Monster(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tilesize,
                monsterTable[getRandomInt(monsterTable.length)]);
        });
    }
    spawnStairs() {
        let stairs = new Stairs(this.world.width - 11, this.world.height - 5, this.world.tilesize);
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() *  (Math.floor(max)));
}

export default Spawner;