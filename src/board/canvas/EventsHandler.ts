import CanvasController from 'board/canvas/CanvasController'
import Primitive from 'board/canvas/primitives/Primitive'

export default class EventsHandler {
	constructor(public controller:CanvasController) {}

	onWidgetMove(targetPrimitive:Primitive, newX:number, newY:number){
		this.controller.moveWidget(targetPrimitive.parentWidget.state.id, newX, newY)
	}

	onWidgetClick(targetPrimitive:Primitive) {
		if (this.controller.getSelectedWidgetId() === targetPrimitive.parentWidget.state.id && targetPrimitive.onClick) {
			//fire click event on target primitive (only if widget selected)
			targetPrimitive.onClick()
		} else {
			this.controller.selectWidget(targetPrimitive.parentWidget.state.id)
		}
	}

	onCanvasClick() {
		this.controller.unselectWidget()
	}
}
