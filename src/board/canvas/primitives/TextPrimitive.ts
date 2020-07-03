import Primitive from 'board/canvas/primitives/Primitive'
import BaseWidget from 'board/canvas/widgets/BaseWidget'

export default class TextPrimitive extends Primitive {
	constructor(parentWidget:BaseWidget, public x: number, public y: number, public color: string, public text: string, public onClick?: () => void) {
		super('text', parentWidget, onClick)
	}
}
