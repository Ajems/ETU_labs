import {mapManager} from "./mapManager.js";

class SpriteManager {
    constructor() {
        this.images = {}
        this.sprites = []
        this.imgLoaded = false
        this.jsonLoaded = false
    }

    loadAtlas(atlasMap) {
        const requests = [];

        for (const [atlasJson, atlasImg] of Object.entries(atlasMap)) {
            const request = new XMLHttpRequest();

            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    this.parseAtlas(request.responseText, atlasImg);
                }
            };

            request.open("GET", atlasJson, true);
            request.send();
            requests.push(request);
        }
        Promise.all(requests.map(req => new Promise(resolve => req.onload = resolve)))
            .then(() => {
                for (const [, atlasImg] of Object.entries(atlasMap)) {
                    this.loadImg(atlasImg);
                }
            });
    }

    loadImg(imgName) {
        const image = new Image();
        image.onload = () => {
            this.imgLoaded = true;
        };
        this.images[imgName] = image;
        image.src = imgName;
    }

    parseAtlas(atlasJSON, imageName) {
        let atlas = JSON.parse(atlasJSON)
        for (let name in atlas.frames) {
            let frame = atlas.frames[name].frame
            this.sprites.push({name: name, x: frame.x, y: frame.y, w: frame.w, h: frame.h, img: imageName})
        }
        this.jsonLoaded = true
    }

    drawSprite(ctx, obj, x, y) {
        if (!this.imgLoaded || !this.jsonLoaded) {
            setTimeout(() => { this.drawSprite(ctx, obj, x, y); }, 100);
        } else {
            let bias = 0

            while (true) {
                let spriteName = obj.getSpriteName(bias);
                if (spriteName === null) return;
                const sprite = this.getSprite(spriteName);
                if (sprite === null) {
                    bias -= 1
                    if (bias < -15) break
                    continue
                }
                if (!mapManager.isVisible(x, y, sprite.w, sprite.h)) {
                    return;
                }
                x -= mapManager.view.x;
                y -= mapManager.view.y;

                const image = this.images[sprite.img];

                if (image && image.complete) {
                    ctx.drawImage(image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
                }
                break
            }
        }
    }



    getSprite(name) {
        for (let i = 0; i < this.sprites.length; i++) {
            let s = this.sprites[i];
            if (s.name === name) {
                return s;
            }
        }
        return null;
    }
}

export const spriteManager = new SpriteManager();