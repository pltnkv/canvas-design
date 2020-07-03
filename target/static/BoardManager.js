"use strict";
/**
// BoardManager.js

//Distribute canvas-core and widgets in separated packages

import MiroCanvas from 'npm/MiroCanvas'

import MiroStickerWidget from 'npm/MiroStickerWidget'

import MiroTextWidget from 'npm/MiroTextWidget'

import MiroUSMWidget from 'npm/MiroUSMWidget'

//Ability to create several canvas instances in one app

const canvas = new MiroCanvas()

//Ability to provide custom data sources not only WS. For offline or for fast preview render

//One way data flow

const wsConnection = new WSConnection(serverName)

function saveData() {

    wsConnection.save(canvas.getData())

}

canvas.extens.onWidgetEditCompele(saveData)

canvas.extens.onWidgetMoved(saveData)

//Ability to render in different renders (canvas itself does not know anything about DOM)

const container = document.querySelector('canvas-container')

const webGLRender = new WebGLRender(container)

requestAnimationFrame(() => {

    webGLRender.render(canvas)

})

//Ability to render into SVG in NodeJS (very performant way to generate preview or export boards screenshot via REST API)

function onSvgExportClicked() {

    const svgRender = new SVGRender()

    svgRender.render(canvas)

    safeToFile(svgRender.getContent())

}

//Ability to configure canvas

canvas.registerWidget(new MiroStickerWidget())

canvas.registerWidget(new MiroTextWidget())

canvas.registerWidget(new MiroUSMWidget())

//Ability to register widget deferred to load canvas-core faster & render most popular widget in first order

import('npm/MiroWireframeWidget').then(MiroWireframeWidget => {

    canvas.registerWidget(new MiroWireframeWidget())

})

//Ability to extend default canvas behavior & subscribe into life-circle

canvas.extend.onCanvasClick = (e) => {
    //custom logic
    e.preventDefault()
}

canvas.extend.onWidgetDoubleClick = (e) => {}

canvas.extend.onUndo = (e) => {}

canvas.extend.onWidgetCreated = (e) => {}

//Ability to manipulate canvas (API)

canvas.api.viewport.set()

canvas.api.viewport.get()

canvas.api.widgets.create()

canvas.api.widgets.delete()

canvas.api.widgets.get()

canvas.api.widgets.undo()

canvas.api.widgets.redo()

//Unmount & destroy

canvas.unmount()

canvas.destroy()
*/
