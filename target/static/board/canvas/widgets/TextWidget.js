define(["require", "exports", "board/canvas/widgets/BaseWidget", "board/canvas/primitives/TextPrimitive"], function (require, exports, BaseWidget_1, TextPrimitive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextWidget extends BaseWidget_1.default {
        render() {
            return [
                new TextPrimitive_1.default(this, this.state.x, this.state.y, '#0000FF', 'TEXT'),
            ];
        }
    }
    exports.default = TextWidget;
});
