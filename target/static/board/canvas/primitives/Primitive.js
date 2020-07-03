define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Primitive {
        constructor(type, parentWidget, onClick) {
            this.type = type;
            this.parentWidget = parentWidget;
            this.onClick = onClick;
        }
    }
    exports.default = Primitive;
});
