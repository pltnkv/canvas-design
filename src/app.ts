import {createBoard} from 'board/BoardManager'
import HTMLRender from 'board/renders/HTMLRender'

// We can create several canvas instances in one app

//render to html
const container1 = document.querySelector('.canvas-container-1') as HTMLDivElement
const htmlRender1 = new HTMLRender(container1)
createBoard(htmlRender1)

////render to SVG (was lazy to impl SVG, so used HTMLRender too)
const container2 = document.querySelector('.canvas-container-2') as HTMLDivElement
const htmlRender2 = new HTMLRender(container2)
createBoard(htmlRender2)
