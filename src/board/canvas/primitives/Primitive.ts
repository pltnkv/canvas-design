import BaseWidget from 'board/canvas/widgets/BaseWidget'

export default class Primitive {
	constructor(public type: string, public parentWidget: BaseWidget, public onClick?: () => void) {
	}
}
