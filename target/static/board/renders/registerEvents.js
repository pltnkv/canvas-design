define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // We should not know anything about canvasController or about CanvasEngine here
    // So all logic behind events processing placed in one place — EventHandler
    function registerEvents(container, primitivesMap, eventsHandler) {
        let targetPrimitive;
        let widgetStartX;
        let widgetStartY;
        let mouseDownX;
        let mouseDownY;
        let mouseMoved = false;
        container.addEventListener('mousedown', (e) => {
            mouseDownX = e.clientX;
            mouseDownY = e.clientY;
            targetPrimitive = primitivesMap.get(e.target);
            if (targetPrimitive) {
                widgetStartX = targetPrimitive.parentWidget.state.x;
                widgetStartY = targetPrimitive.parentWidget.state.y;
            }
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        function onMouseMove(e) {
            if (mouseMoved || Math.abs(e.clientX - mouseDownX) > 2 || Math.abs(e.clientY - mouseDownY) > 2) {
                mouseMoved = true;
                if (targetPrimitive) {
                    const newX = widgetStartX + e.clientX - mouseDownX;
                    const newY = widgetStartY + e.clientY - mouseDownY;
                    eventsHandler.onWidgetMove(targetPrimitive, newX, newY);
                }
            }
        }
        function onMouseUp() {
            if (!mouseMoved) {
                if (targetPrimitive) {
                    eventsHandler.onWidgetClick(targetPrimitive);
                }
                else {
                    eventsHandler.onCanvasClick();
                }
            }
            targetPrimitive = undefined;
            mouseMoved = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
    exports.default = registerEvents;
});
