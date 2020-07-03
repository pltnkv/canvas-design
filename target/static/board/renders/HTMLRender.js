define(["require", "exports", "board/renders/registerEvents"], function (require, exports, registerEvents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const primitiveDrawers = {
        'rect': (container, primitive, primitivesMap) => {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = primitive.y + 'px';
            div.style.left = primitive.x + 'px';
            div.style.width = primitive.width + 'px';
            div.style.height = primitive.height + 'px';
            div.style.backgroundColor = primitive.color;
            div.dataset.id = primitive.color;
            primitivesMap.set(div, primitive);
            container.appendChild(div);
        },
        'text': (container, primitive, primitivesMap) => {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = primitive.y + 'px';
            div.style.left = primitive.x + 'px';
            div.style.color = primitive.color;
            div.innerText = primitive.text;
            primitivesMap.set(div, primitive);
            container.appendChild(div);
        },
        'border': (container, primitive, primitivesMap) => {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = primitive.y - 2 + 'px';
            div.style.left = primitive.x - 2 + 'px';
            div.style.width = primitive.width + 2 + 'px';
            div.style.height = primitive.height + 2 + 'px';
            div.style.border = `2px solid ${primitive.color}`;
            primitivesMap.set(div, primitive);
            container.appendChild(div);
        },
    };
    class HTMLRender {
        constructor(container) {
            this.primitivesMap = new Map();
            this.container = container;
        }
        linkCanvasController(eventsHandler) {
            registerEvents_1.default(this.container, this.primitivesMap, eventsHandler);
        }
        render(canvas) {
            //stupid implementation of rerender
            this.container.innerHTML = '';
            this.primitivesMap.clear();
            //draw widgets
            canvas.widgets.forEach(w => {
                w.render().forEach(p => {
                    const drawer = primitiveDrawers[p.type];
                    if (drawer) {
                        drawer(this.container, p, this.primitivesMap);
                    }
                    else {
                        throw new Error('Primitive drawer not implemented');
                    }
                });
            });
            //draw selection
            if (canvas.selectionPrimitive) {
                const drawer = primitiveDrawers[canvas.selectionPrimitive.type];
                if (drawer) {
                    drawer(this.container, canvas.selectionPrimitive, this.primitivesMap);
                }
            }
        }
    }
    exports.default = HTMLRender;
});
