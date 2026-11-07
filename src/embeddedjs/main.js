import Poco from "commodetto/Poco";
import { ColorHelper, ShapeRenderHelper } from "./PebbleHelper"
import config from "./config.js"

const render = new Poco(screen);
let colorHelperInstance = new ColorHelper(render)
let srh = new ShapeRenderHelper(render)

const blue = colorHelperInstance.getColor('blue')
const lime = colorHelperInstance.getColor('lime')
const red = colorHelperInstance.getColor([255,181,138])
const backgroundColor = colorHelperInstance.getColor('#fff')
const primaryColor = colorHelperInstance.getColor('black')
/**
 * Index of PDC foiles loaded on package.json:
 * 		(1) - Hour Hand
 * 		(2) - Minute Hand
 * 		(3) - Second Hand
 * 		(4) - Date Hand
 * 		(5) - Hour Marker
 * 		(6) - 12:00 Indicator
 */

let marker12 = new Poco.PebbleDrawCommandImage(6)
let hourMarker = new Poco.PebbleDrawCommandImage(5)
const hourHand = new Poco.PebbleDrawCommandImage(1)
const minuteHand = new Poco.PebbleDrawCommandImage(2)
const secondsHand = new Poco.PebbleDrawCommandImage(3)

// Draw basic wathface UI elements
// initialize()

// Watch event for hour change
watch.addEventListener('secondchange', drawOnSecondChange)

function initialize() {
	render.begin();
	render.fillRectangle(backgroundColor, 0, 0, render.width, render.height)
	
	// Initialize circle for hour hands reference
	render.drawCircle(red, 
		render.width / 2,
		render.height / 2,
		124,
		0, 360
	)

	// Initialize some guide lines (horizontal / vertical)
	render.drawLine(0, render.height/2,render.width, render.height/2,blue, 2)
	render.drawLine(render.width / 2, 0 , render.width / 2, render.height, lime, 2)

	// Render seconds reference lines
	srh.drawWatchReferenceLines(122, 'minutes', 5, 3, primaryColor, true)

	
	// render indicator for 12:00
	render.drawDCI(marker12, 
		(render.width - marker12.width) / 2,
		6
	)

	// Draw PDC indicators for hours
	srh.drawHourReferencePDCs(hourMarker, config.hourMarkerConfiguration)

	// Reference hour indicator - loaded using rotation and config for shits and giggles
	// const px = 0
	// const py = 0
	// const count = 6
	// const angle = -(count) * 6 * (Math.PI / 180)

	// // render.drawDCI(minuteHand.clone().rotate(angle, px, py),
	// // 	config.minuteHandConfiguration[count].x, config.minuteHandConfiguration[count].y
	// // )

	// // The circus begins
	// render.drawDCI(secondsHand.clone().rotate(angle, px, py),
	// 	config.secondsHandConfiguration[count].x, config.secondsHandConfiguration[count].y
	// )

	render.end();
}

function drawOnSecondChange(event) {
	initialize()
	const date = event.date
	const referenceHours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()

	// Render seconds hand
	render.begin()
	const angle = -(seconds) * 6 * (Math.PI / 180)
	render.drawDCI(secondsHand.clone().rotate(angle, 0, 0),
		config.secondsHandConfiguration[seconds].x, config.secondsHandConfiguration[seconds].y
	)

	render.end()

}

function drawOnMinuteChange(event) {
	initialize()
	const date = event.date
	const referenceHours = date.getHours()
	const minutes = date.getMinutes()

	// Rendering minutes hand that's reactive to minute change event
	render.begin()
	const angle = -(minutes) * 6 * (Math.PI / 180)
	render.drawDCI(minuteHand.clone().rotate(angle, 0, 0),
		config.minuteHandConfiguration[minutes].x, config.minuteHandConfiguration[minutes].y
	)

	render.end()
}
