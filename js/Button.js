 class Button extends Entity {
     constructor(image, x, y, clickedFunc, text) {
         super(image, x, y, clickedFunc);
         this.text = text;
     }

     draw(g) {
         super.draw(g);

         g.fill(210 + (this.isHovering() ? 20 : 0), 0, 0);
         g.noStroke();
         g.textFont(assetManager.fonts.lekoMajuna);
         g.textAlign(CENTER, CENTER);
         g.text(this.text, this.x, this.y - (this.isHovering() ? 1 : 0), this.width, this.height);
         g.text(this.text, this.x, this.y - (this.isHovering() ? 1 : 0), this.width, this.height);
         g.text(this.text, this.x, this.y - (this.isHovering() ? 1 : 0), this.width, this.height);
         g.text(this.text, this.x, this.y - (this.isHovering() ? 1 : 0), this.width, this.height);
         g.textAlign(LEFT, BASELINE);
     }
 }