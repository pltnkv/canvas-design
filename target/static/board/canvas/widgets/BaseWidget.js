define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseWidget {
        constructor(state) {
            this.state = state;
        }
        render() {
            throw new Error('Should override BaseWidget::render()');
        }
    }
    exports.default = BaseWidget;
});
