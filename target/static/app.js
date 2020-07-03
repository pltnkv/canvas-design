define(["require", "exports", "board/BoardManager", "board/renders/HTMLRender"], function (require, exports, BoardManager_1, HTMLRender_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // We can create several canvas instances in one app
    //render to html
    const container1 = document.querySelector('.canvas-container-1');
    const htmlRender1 = new HTMLRender_1.default(container1);
    BoardManager_1.createBoard(htmlRender1);
    ////render to SVG (was lazy to impl SVG, so used HTMLRender too)
    const container2 = document.querySelector('.canvas-container-2');
    const htmlRender2 = new HTMLRender_1.default(container2);
    BoardManager_1.createBoard(htmlRender2);
});
