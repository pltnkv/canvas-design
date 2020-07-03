define(["require", "exports", "board/canvas/widgets/BaseWidget", "board/canvas/primitives/RectPrimitive"], function (require, exports, BaseWidget_1, RectPrimitive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShapeWidget extends BaseWidget_1.default {
        constructor() {
            super(...arguments);
            this.onClick = () => {
                console.log('shape clicked', this);
            };
        }
        render() {
            return [
                new RectPrimitive_1.default(this, this.state.x, this.state.y, 100, 100, '#000000'),
                new RectPrimitive_1.default(this, this.state.x + 2, this.state.y + 2, 96, 96, this.state.color, this.onClick),
            ];
        }
    }
    exports.default = ShapeWidget;
});
