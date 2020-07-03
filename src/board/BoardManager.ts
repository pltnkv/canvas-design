//Distribute canvas-core and widgets in separated packages
import CanvasEngine from 'board/canvas/CanvasEngine'
import CanvasController from 'board/canvas/CanvasController'
import ShapeWidget from 'board/canvas/widgets/ShapeWidget'
import TextWidget from 'board/canvas/widgets/TextWidget'
import IRender from 'board/renders/IRender'

export function createBoard(render: IRender) {
	// Create state and state-controller
	// Store in this controller can be connected with WS connection
	const canvasController = new CanvasController()

	// It does know ConnectionType or RenderType. It just converts state to primitives
	const canvasEngine = new CanvasEngine(canvasController)

	// Ability to render in different renders
	// canvasEngine & canvasController itself do not know anything about DOM — important to make able render into SVG on NodeJs
	render.linkCanvasController(canvasController.eventsHandler)

	//Widgets implementation not included in core
	canvasEngine.registerWidget('shape', ShapeWidget)

	//Ability to register widget deferred to load canvas-core faster & render most popular widget in first order
	setTimeout(() => {
		canvasEngine.registerWidget('text', TextWidget)
		canvasController.stateChanged = true
	}, 1000)

	//0) Do some operations
	canvasController.createShapeWidget({x: 10, y: 10, color: '#FF0000'})
	canvasController.createTextWidget({x: 10, y: 120, color: '#333333', text: 'Label 1'})

	canvasController.createShapeWidget({x: 200, y: 10, color: '#00FF00'})
	canvasController.createTextWidget({x: 200, y: 120, color: '#333333', text: 'Label 2'})

	//update loop
	function update() {
		//1) recalculate state
		const needToRerender = canvasEngine.update()
		//2) render updated state
		if (needToRerender) {
			render.render(canvasEngine)
		}

		requestAnimationFrame(update)
	}

	update()
}
