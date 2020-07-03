define(["require", "exports", "board/canvas/primitives/Primitive"], function (require, exports, Primitive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextPrimitive extends Primitive_1.default {
        constructor(parentWidget, x, y, color, text, onClick) {
            super('text', parentWidget, onClick);
            this.x = x;
            this.y = y;
            this.color = color;
            this.text = text;
            this.onClick = onClick;
        }
    }
    exports.default = TextPrimitive;
});
