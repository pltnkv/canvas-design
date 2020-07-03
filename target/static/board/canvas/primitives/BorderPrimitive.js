define(["require", "exports", "board/canvas/primitives/Primitive"], function (require, exports, Primitive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BorderPrimitive extends Primitive_1.default {
        constructor(parentWidget, x, y, width, height, color, onClick) {
            super('border', parentWidget, onClick);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.onClick = onClick;
        }
    }
    exports.default = BorderPrimitive;
});
