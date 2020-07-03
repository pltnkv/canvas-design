define(["require", "exports", "board/canvas/CanvasEngine", "board/canvas/CanvasController", "board/canvas/widgets/ShapeWidget", "board/canvas/widgets/TextWidget"], function (require, exports, CanvasEngine_1, CanvasController_1, ShapeWidget_1, TextWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBoard = void 0;
    function createBoard(render) {
        // Create state and state-controller
        // Store in this controller can be connected with WS connection
        const canvasController = new CanvasController_1.default();
        // It does know ConnectionType or RenderType. It just converts state to primitives
        const canvasEngine = new CanvasEngine_1.default(canvasController);
        // Ability to render in different renders
        // canvasEngine & canvasController itself do not know anything about DOM — important to make able render into SVG on NodeJs
        render.linkCanvasController(canvasController.eventsHandler);
        //Widgets implementation not included in core
        canvasEngine.registerWidget('shape', ShapeWidget_1.default);
        //Ability to register widget deferred to load canvas-core faster & render most popular widget in first order
        setTimeout(() => {
            canvasEngine.registerWidget('text', TextWidget_1.default);
            canvasController.stateChanged = true;
        }, 1000);
        //0) Do some operations
        canvasController.createShapeWidget({ x: 10, y: 10, color: '#FF0000' });
        canvasController.createTextWidget({ x: 10, y: 120, color: '#333333', text: 'Label 1' });
        canvasController.createShapeWidget({ x: 200, y: 10, color: '#00FF00' });
        canvasController.createTextWidget({ x: 200, y: 120, color: '#333333', text: 'Label 2' });
        //update loop
        function update() {
            //1) recalculate state
            const needToRerender = canvasEngine.update();
            //2) render updated state
            if (needToRerender) {
                render.render(canvasEngine);
            }
            requestAnimationFrame(update);
        }
        update();
    }
    exports.createBoard = createBoard;
});
