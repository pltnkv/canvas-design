import BaseWidget from 'board/canvas/widgets/BaseWidget'
import RectPrimitive from 'board/canvas/primitives/RectPrimitive'
import Primitive from 'board/canvas/primitives/Primitive'

export interface IShapeWidgetData {
	id: number
	type: 'shape'
	x: number
	y: number
	color: string
}

export default class ShapeWidget extends BaseWidget<IShapeWidgetData> {
	render(): Primitive[] {
		return [
			new RectPrimitive(this, this.state.x, this.state.y, 100, 100, '#000000'), //like a border
			new RectPrimitive(this, this.state.x + 2, this.state.y + 2, 96, 96, this.state.color, this.onClick),
		]
	}

	onClick = () => {
		console.log('shape clicked', this)
	}
}
