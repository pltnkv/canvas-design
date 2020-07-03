import Primitive from 'board/canvas/primitives/Primitive'
import EventsHandler from 'board/canvas/EventsHandler'

// We should not know anything about canvasController or about CanvasEngine here
// So all logic behind events processing placed in one place — EventHandler
export default function registerEvents(container: HTMLElement, primitivesMap: Map<Element, Primitive>, eventsHandler: EventsHandler) {
	let targetPrimitive: Primitive | undefined
	let widgetStartX: number
	let widgetStartY: number
	let mouseDownX: number
	let mouseDownY: number
	let mouseMoved = false

	container.addEventListener('mousedown', (e) => {
		mouseDownX = e.clientX
		mouseDownY = e.clientY
		targetPrimitive = primitivesMap.get(e.target as any)
		if (targetPrimitive) {
			widgetStartX = targetPrimitive.parentWidget.state.x
			widgetStartY = targetPrimitive.parentWidget.state.y
		}

		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
	})

	function onMouseMove(e: MouseEvent) {
		if (mouseMoved || Math.abs(e.clientX - mouseDownX) > 2 || Math.abs(e.clientY - mouseDownY) > 2) {
			mouseMoved = true
			if (targetPrimitive) {
				const newX = widgetStartX + e.clientX - mouseDownX
				const newY = widgetStartY + e.clientY - mouseDownY
				eventsHandler.onWidgetMove(targetPrimitive, newX, newY)
			}
		}
	}

	function onMouseUp() {
		if (!mouseMoved) {
			if (targetPrimitive) {
				eventsHandler.onWidgetClick(targetPrimitive)
			} else {
				eventsHandler.onCanvasClick()
			}
		}

		targetPrimitive = undefined
		mouseMoved = false
		document.removeEventListener('mousemove', onMouseMove)
		document.removeEventListener('mouseup', onMouseUp)
	}
}
