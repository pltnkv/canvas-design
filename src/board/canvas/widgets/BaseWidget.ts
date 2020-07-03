import Primitive from 'board/canvas/primitives/Primitive'
import IBaseWidgetData from 'board/canvas/widgets/IBaseWidgetData'

export default class BaseWidget<T = IBaseWidgetData> {
	readonly state: T

	constructor(state: T) {
		this.state = state
	}

	render(): Primitive[] {
		throw new Error('Should override BaseWidget::render()')
	}
}
