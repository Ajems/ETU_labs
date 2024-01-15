import { gameManager } from "./gameManager.js";

class MapManager {
    constructor() {
        this.mapData = null;
        this.tLayer = null;
        this.xCount = 0;
        this.yCount = 0;
        this.tSize = { x: 0, y: 0 };
        this.mapSize = { x: 0, y: 0 };
        this.tilesets = [];
        this.callision = []
        this.imgLoadCount = 0;
        this.imgLoaded = false;
        this.jsonLoaded = false;
        this.view = { x: 0, y: 0, w: 480, h: 480 };
        this.w = null
        this.h = null
    }

    finish(){
        this.mapData = null;
        this.tLayer = null;
        this.xCount = 0;
        this.yCount = 0;
        this.tSize = { x: 0, y: 0 };
        this.mapSize = { x: 0, y: 0 };
        this.tilesets = [];
        this.callision = []
        this.imgLoadCount = 0;
        this.imgLoaded = false;
        this.jsonLoaded = false;
        this.view = { x: 0, y: 0, w: 480, h: 480 };
    }


    loadMap(path) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                this.parseMap(request.responseText);
            }
        };
        request.open("GET", path, true);
        request.send();
    }

    parseMap(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;
        this.mapSize.y = this.yCount * this.tSize.y;
        this.w = this.mapData.width * this.mapData.tilewidth
        this.h = this.mapData.height * this.mapData.tilewidth

        for (let i = 0; i < this.mapData.tilesets.length; i++) {
            if (this.mapData.layers[i].name === 'callision') {
                const w = this.mapData.layers[i].width;
                const h = this.mapData.layers[i].height;
                const flatArray = this.mapData.layers[i].data;
                for (let row = 0; row < h; row++) {
                    this.callision[row] = [];
                    for (let col = 0; col < w; col++) {
                        const index = row * w + col;
                        this.callision[row][col] = flatArray[index];
                    }
                }
            }
        }


        for (let i = 0; i < this.mapData.tilesets.length; i++) {
            const img = new Image();
            img.onload = () => {
                this.imgLoadCount++;
                if (this.imgLoadCount === this.mapData.tilesets.length) {
                    this.imgLoaded = true;
                }
            };
            img.src = this.mapData.tilesets[i].image;
            const t = this.mapData.tilesets[i];
            const ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / this.tSize.x),
                yCount: Math.floor(t.imageheight / this.tSize.y),
            };
            this.tilesets.push(ts);
        }
        this.jsonLoaded = true;
    }

    parseEntities() {
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(() => this.parseEntities(), 100);
        } else {
            for (let j = 0; j < this.mapData.layers.length; j++) {
                if (this.mapData.layers[j].type === 'objectgroup') {
                    let entities = this.mapData.layers[j];
                    console.log(entities)
                    for (let i = 0; i < entities.objects.length; i++) {
                        let e = entities.objects[i];
                        if (e.type === "") continue
                        try {
                            let obj = new gameManager.factory[e.type]();
                            console.log(e.name)
                            obj.name = e.name;
                            obj.pos_x = e.x;
                            obj.pos_y = e.y;
                            obj.size_x = e.width;
                            obj.size_y = e.height;
                            gameManager.entities.push(obj);
                            if (obj.name === 'Player') {
                                gameManager.initPlayer(obj);
                            }
                        } catch (ex) {
                            console.log(`Error while creating: [$${e.gid}] ${e.type}, ${ex}`);
                        }
                    }
                }
            }
        }
        console.log(gameManager.entities)
    }

    draw(ctx) {
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(() => this.draw(ctx), 100);
        } else {
            if (this.tLayer === null) {
                this.tLayer = []
                for (let id = 0; id < this.mapData.layers.length; id++) {
                    let layer = this.mapData.layers[id];
                    if (layer.type === "tilelayer") {
                        this.tLayer.push(layer);
                    }
                }
            }
            for (let l = 0; l < this.tLayer.length; l++){
                if (this.tLayer[l].name.includes('onplayer')) continue;
                for (let i = 0; i < this.tLayer[l].data.length; i++) {
                    if (this.tLayer[l].data[i] !== 0) {
                        let tile = this.getTile(this.tLayer[l].data[i]);
                        let pX = (i % this.xCount) * this.tSize.x;
                        let pY = Math.floor(i / this.xCount) * this.tSize.y;
                        if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y))
                            continue;
                        pX -= this.view.x;
                        pY -= this.view.y;
                        ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y,
                            pX, pY, this.tSize.x, this.tSize.y);
                    }
                }
            }
        }
    }

    drawOnPlayer(ctx) {
        for (let l = 0; l < this.tLayer.length; l++){
            if (!this.tLayer[l].name.includes('onplayer')) continue;
            for (let i = 0; i < this.tLayer[l].data.length; i++) {
                if (this.tLayer[l].data[i] !== 0) {
                    let tile = this.getTile(this.tLayer[l].data[i]);
                    let pX = (i % this.xCount) * this.tSize.x;
                    let pY = Math.floor(i / this.xCount) * this.tSize.y;
                    if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y))
                        continue;
                    pX -= this.view.x;
                    pY -= this.view.y;
                    ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y,
                        pX, pY, this.tSize.x, this.tSize.y);
                }
            }
        }
    }

    getTile(tileIndex) {
        const tile = {
            img: null,
            px: 0,
            py: 0,
        };
        const tileset = this.getTileset(tileIndex);
        tile.img = tileset.image;
        const id = tileIndex - tileset.firstgid;
        const x = id % tileset.xCount;
        const y = Math.floor(id / tileset.xCount);
        tile.px = x * this.tSize.x;
        tile.py = y * this.tSize.y;
        return tile;
    }

    getTileset(tileIndex) {
        for (let i = this.tilesets.length - 1; i >= 0; i--) {
            if (this.tilesets[i].firstgid <= tileIndex) {
                return this.tilesets[i];
            }
        }
        return null;
    }


    centerAt(x, y) {
        if (x < this.view.w / 2)
            this.view.x = 0;
        else if (x > this.mapSize.x - this.view.w / 2)
            this.view.x = this.mapSize.x - this.view.w;
        else
            this.view.x = x - (this.view.w / 2);

        if (y < this.view.h / 2)
            this.view.y = 0;
        else if (y > this.mapSize.y - this.view.h / 2)
            this.view.y = this.mapSize.y - this.view.h;
        else
            this.view.y = y - (this.view.h / 2);
    }

    isVisible(x, y, width, height) {
        if (x + width < this.view.x || y + height < this.view.y ||
            x > this.view.x + this.view.w || y > this.view.y + this.view.h)
            return false;
        return true;
    }

    isCollision(x, y, obj){
        const lenWidthBlock = this.w / this.callision[0].length
        const lenHeightBlock = this.h / this.callision.length

        const cordLeftX = Math.floor((x-obj.collisionWidth/2) / lenWidthBlock)
        const cordRightX = Math.floor((x+obj.collisionWidth/2) / lenWidthBlock)
        const cordTopY = Math.floor((y-obj.collisionheight/2) / lenHeightBlock)
        const cordBottomY = Math.floor((y+obj.collisionheight/2) / lenHeightBlock)


        for (let i = cordTopY; i <= cordBottomY; i++) {
            for (let j = cordLeftX; j <= cordRightX; j++) {
                if (this.callision[i] && this.callision[i][j] !== 0) {
                    return true;
                }
            }
        }
        return false
    }

    getCord(x, y, obj){
        const lenWidthBlock = this.w / this.callision[0].length
        const lenHeightBlock = this.h / this.callision.length

        const cordX = Math.floor(x / lenWidthBlock)
        const cordY = Math.floor(y / lenHeightBlock)

        return [cordX, cordY]
    }
}

export const mapManager = new MapManager();