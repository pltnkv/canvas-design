import {IShapeWidgetData} from 'board/canvas/widgets/ShapeWidget'
import {ITextWidgetData} from 'board/canvas/widgets/TextWidget'
import EventsHandler from 'board/canvas/EventsHandler'

interface IState {
	widgets: Array<IShapeWidgetData | ITextWidgetData>
	selectedWidgetId: number | undefined //For simplicity in one time one widget can be selected
}

let idCounter = 0

export default class CanvasController {

	eventsHandler = new EventsHandler(this)

	state: IState = {
		widgets: [],
		selectedWidgetId: undefined,
	}
	stateChanged = false

	//////////////////////////////////////////////////////
	// API — single way to read / write canvas state   ///
	//////////////////////////////////////////////////////

	createTextWidget(data: Partial<ITextWidgetData>) {
		this.state.widgets.push({
			id: ++idCounter,
			type: 'text',
			x: data.x || 0,
			y: data.y || 0,
			text: data.text || 'text',
			color: data.color || '#000000',
		})
		this.stateChanged = true
	}

	createShapeWidget(data: Partial<IShapeWidgetData>) {
		this.state.widgets.push({
			id: ++idCounter,
			type: 'shape',
			x: data.x || 0,
			y: data.y || 0,
			color: data.color || '#000000',
		})
		this.stateChanged = true
	}

	deleteWidget(id: number) {
		this.state.widgets = this.state.widgets.filter(w => w.id !== id)
		this.stateChanged = true
	}

	moveWidget(widgetId: number, newX: number, newY: number) {
		const w = this.state.widgets.find(w => w.id === widgetId)
		if (w) {
			w.x = newX
			w.y = newY
		} else {
			throw new Error('Widget not found')
		}
		this.stateChanged = true
	}

	selectWidget(widgetId: number) {
		console.log('selectWidget', widgetId)
		this.state.selectedWidgetId = widgetId
		this.stateChanged = true
	}

	unselectWidget() {
		console.log('unselectWidget')
		this.state.selectedWidgetId = undefined
		this.stateChanged = true
	}

	getSelectedWidgetId(): number | undefined {
		return this.state.selectedWidgetId
	}
}
