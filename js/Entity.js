class Entity extends Rectangle {
    constructor(image, x, y, clickedFunc) {
        super(x, y, 0, 0);
        this.hoverImage = undefined;
        this.image = image;
        if (this.image !== undefined) {
            this.width = image.width;
            this.height = image.height;
        }
        
        this.clickedFunc = clickedFunc;

        this.hidden = false;

        this.clickable = true;

        this.canAction = false;
    }

    setHoverImage(image) {
        this.hoverImage = image;

        return this;
    }

    setImage(image) {
        this.image = image;
        if (image !== undefined) {
            this.width = image.width;
            this.height = image.height;
        }

        return this;
    }

    setClickable(bool=true) {
        this.clickable = bool;

        return this;
    }

    setHidden(bool=true) {
        this.hidden = bool;

        return this;
    }

    run() {
        if (this.isHovering()) {
            cursor(HAND);
        }
    }

    draw(g) {
        if (this.hoverImage !== undefined && this.isHovering()) {
            g.image(this.hoverImage, this.x, this.y);
        } else {
            if (this.image !== undefined)
                g.image(this.image, this.x, this.y);
        }
    }

    mouseClicked() {
        if (this.isHovering())
            this.clickedFunc();
    }

    isMouseTouching() {
        let windowX = max(0, windowWidth / 2 - graphicsWidth / 2);
        let windowY = max(0, windowHeight / 2 - graphicsHeight / 2);
        return floor((mouseX - windowX) * 256 / graphicsWidth) >= this.x && 
            floor((mouseX - windowX) * 256 / graphicsWidth) < this.x + this.width && 
            floor((mouseY - windowY) * 240 / graphicsHeight) >= this.y && 
            floor((mouseY - windowY) * 240 / graphicsHeight) < this.y + this.height ;
    }

    //Only true if the entity is also clickable
    isHovering() {
        return this.clickable && this.isMouseTouching() && this.canAction;
    }

    setCanAction() {
        this.canAction = true;
    }

    setNoAction() {
        this.canAction = false;
    }
}

class Decoration extends Entity {
    constructor(image, x, y) {
        super(image, x, y, undefined);
        this.clickable = false;
    }
}