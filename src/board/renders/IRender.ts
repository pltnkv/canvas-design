import CanvasEngine from 'board/canvas/CanvasEngine'
import EventsHandler from 'board/canvas/EventsHandler'

export default interface IRender {
	linkCanvasController(eventsHandler: EventsHandler): void
	render(canvas: CanvasEngine): void
}
