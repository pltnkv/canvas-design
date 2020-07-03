import Primitive from 'board/canvas/primitives/Primitive'
import BaseWidget from 'board/canvas/widgets/BaseWidget'

export default class RectPrimitive extends Primitive {
	constructor(parentWidget:BaseWidget, public x: number, public y: number, public width: number, public height: number, public color: string, public onClick?: () => void) {
		super('rect', parentWidget, onClick)
	}
}
