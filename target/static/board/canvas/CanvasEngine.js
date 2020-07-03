define(["require", "exports", "board/canvas/primitives/BorderPrimitive"], function (require, exports, BorderPrimitive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CanvasEngine {
        constructor(controller) {
            this.widgetsClsMap = new Map();
            this.widgets = [];
            this.controller = controller;
        }
        registerWidget(type, widgetCls) {
            this.widgetsClsMap.set(type, widgetCls);
        }
        update() {
            //stupid implementation of diff search. with complexity: 2*N^2
            let needToUpdate = this.controller.stateChanged;
            if (needToUpdate) {
                ////////////////////////////////
                //creating new widget
                this.controller.state.widgets.forEach(widgetState => {
                    if (this.widgets.every(w => w.state !== widgetState)) { //no any widget with that state
                        const widgetCls = this.widgetsClsMap.get(widgetState.type);
                        if (widgetCls) {
                            const w = new widgetCls(widgetState);
                            this.widgets.push(w);
                        }
                        else {
                            console.warn('Try to load unregistered yet type');
                        }
                    }
                });
                ////////////////////////////////
                //removing deleted widget
                const deletingWidgets = [];
                this.widgets.forEach((w) => {
                    if (this.controller.state.widgets.every(ws => ws !== w.state)) {
                        deletingWidgets.push(w);
                    }
                });
                this.widgets = this.widgets.filter(w => !deletingWidgets.some(dw => dw === w));
                ////////////////////////////////
                //updating selection
                if (this.controller.state.selectedWidgetId !== undefined) {
                    const selectedWidget = this.widgets.find(w => w.state.id === this.controller.state.selectedWidgetId);
                    if (selectedWidget) {
                        this.selectionPrimitive = new BorderPrimitive_1.default(selectedWidget, selectedWidget.state.x, selectedWidget.state.y, 100, 100, '#0000CC');
                    }
                    else {
                        throw new Error('State & engine out of sync');
                    }
                }
                else {
                    this.selectionPrimitive = undefined;
                }
                ////////////////////////////////
                // clearing stateChanged
                this.controller.stateChanged = false;
            }
            return needToUpdate;
        }
    }
    exports.default = CanvasEngine;
});
