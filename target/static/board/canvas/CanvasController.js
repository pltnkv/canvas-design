define(["require", "exports", "board/canvas/EventsHandler"], function (require, exports, EventsHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let idCounter = 0;
    class CanvasController {
        constructor() {
            this.eventsHandler = new EventsHandler_1.default(this);
            this.state = {
                widgets: [],
                selectedWidgetId: undefined,
            };
            this.stateChanged = false;
        }
        //////////////////////////////////////////////////////
        // API — single way to read / write canvas state   ///
        //////////////////////////////////////////////////////
        createTextWidget(data) {
            this.state.widgets.push({
                id: ++idCounter,
                type: 'text',
                x: data.x || 0,
                y: data.y || 0,
                text: data.text || 'text',
                color: data.color || '#000000',
            });
            this.stateChanged = true;
        }
        createShapeWidget(data) {
            this.state.widgets.push({
                id: ++idCounter,
                type: 'shape',
                x: data.x || 0,
                y: data.y || 0,
                color: data.color || '#000000',
            });
            this.stateChanged = true;
        }
        deleteWidget(id) {
            this.state.widgets = this.state.widgets.filter(w => w.id !== id);
            this.stateChanged = true;
        }
        moveWidget(widgetId, newX, newY) {
            const w = this.state.widgets.find(w => w.id === widgetId);
            if (w) {
                w.x = newX;
                w.y = newY;
            }
            else {
                throw new Error('Widget not found');
            }
            this.stateChanged = true;
        }
        selectWidget(widgetId) {
            console.log('selectWidget', widgetId);
            this.state.selectedWidgetId = widgetId;
            this.stateChanged = true;
        }
        unselectWidget() {
            console.log('unselectWidget');
            this.state.selectedWidgetId = undefined;
            this.stateChanged = true;
        }
        getSelectedWidgetId() {
            return this.state.selectedWidgetId;
        }
    }
    exports.default = CanvasController;
});
