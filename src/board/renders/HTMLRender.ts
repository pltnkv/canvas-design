import IRender from 'board/renders/IRender'
import CanvasEngine from 'board/canvas/CanvasEngine'
import TextPrimitive from 'board/canvas/primitives/TextPrimitive'
import RectPrimitive from 'board/canvas/primitives/RectPrimitive'
import registerEventsForHTMLRender from 'board/renders/registerEvents'
import Primitive from 'board/canvas/primitives/Primitive'
import BorderPrimitive from 'board/canvas/primitives/BorderPrimitive'
import EventsHandler from 'board/canvas/EventsHandler'

const primitiveDrawers: {[x: string]: (container: HTMLDivElement, primitive: any, primitivesMap: Map<Element, Primitive>) => void} = {
	'rect': (container: HTMLDivElement, primitive: RectPrimitive, primitivesMap) => {
		const div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.top = primitive.y + 'px'
		div.style.left = primitive.x + 'px'
		div.style.width = primitive.width + 'px'
		div.style.height = primitive.height + 'px'
		div.style.backgroundColor = primitive.color
		div.dataset.id = primitive.color

		primitivesMap.set(div, primitive)
		container.appendChild(div)
	},
	'text': (container: HTMLDivElement, primitive: TextPrimitive, primitivesMap) => {
		const div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.top = primitive.y + 'px'
		div.style.left = primitive.x + 'px'
		div.style.color = primitive.color
		div.innerText = primitive.text

		primitivesMap.set(div, primitive)
		container.appendChild(div)
	},
	'border': (container: HTMLDivElement, primitive: BorderPrimitive, primitivesMap) => {
		const div = document.createElement('div')
		div.style.position = 'absolute'
		div.style.top = primitive.y - 2 + 'px'
		div.style.left = primitive.x - 2 + 'px'
		div.style.width = primitive.width + 2 + 'px'
		div.style.height = primitive.height + 2 + 'px'
		div.style.border = `2px solid ${primitive.color}`

		primitivesMap.set(div, primitive)
		container.appendChild(div)
	},
}

export default class HTMLRender implements IRender {
	primitivesMap = new Map<Element, Primitive>()
	container: HTMLDivElement

	constructor(container: HTMLDivElement) {
		this.container = container
	}

	linkCanvasController(eventsHandler: EventsHandler) {
		registerEventsForHTMLRender(this.container, this.primitivesMap, eventsHandler)
	}

	render(canvas: CanvasEngine): void {
		//stupid implementation of rerender
		this.container.innerHTML = ''
		this.primitivesMap.clear()

		//draw widgets
		canvas.widgets.forEach(w => {
			w.render().forEach(p => {
				const drawer = primitiveDrawers[p.type]
				if (drawer) {
					drawer(this.container, p, this.primitivesMap)
				} else {
					throw new Error('Primitive drawer not implemented')
				}
			})
		})

		//draw selection
		if (canvas.selectionPrimitive) {
			const drawer = primitiveDrawers[canvas.selectionPrimitive.type]
			if (drawer) {
				drawer(this.container, canvas.selectionPrimitive, this.primitivesMap)
			}
		}
	}

}
