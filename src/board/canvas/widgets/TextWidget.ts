import BaseWidget from 'board/canvas/widgets/BaseWidget'
import TextPrimitive from 'board/canvas/primitives/TextPrimitive'
import Primitive from 'board/canvas/primitives/Primitive'

export interface ITextWidgetData {
	id: number
	type: 'text'
	x: number
	y: number
	color: string
	text: string
}

export default class TextWidget extends BaseWidget<ITextWidgetData> {
	render(): Primitive[] {
		return [
			new TextPrimitive(this, this.state.x, this.state.y, '#0000FF', 'TEXT'),
		]
	}
}
