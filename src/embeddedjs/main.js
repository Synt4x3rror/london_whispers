import Poco from "commodetto/Poco";
import { ColorHelper, ShapeRenderHelper } from "./PebbleHelper"
import config from "./config.js"

const render = new Poco(screen)
let colorHelperInstance = new ColorHelper(render)
let srh = new ShapeRenderHelper(render)

// const blue = colorHelperInstance.getColor('blue')
// const lime = colorHelperInstance.getColor('lime')
// const red = colorHelperInstance.getColor([255,181,138])
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

/**Global variables for watchface settings - Must be replaced with loading from config */
localStorage.setItem('RENDER_SECONDS_HAND', 'true')
localStorage.setItem('IS_12_HOUR_DISPLAY', 'true')

let marker12 = new Poco.PebbleDrawCommandImage(6)
let hourMarker = new Poco.PebbleDrawCommandImage(5)
const hourHand = new Poco.PebbleDrawCommandImage(1)
const minuteHand = new Poco.PebbleDrawCommandImage(2)
const secondsHand = new Poco.PebbleDrawCommandImage(3)

// Draw basic wathface UI elements
// initialize()
if (JSON.parse(localStorage.getItem('RENDER_SECONDS_HAND'))) {
	watch.addEventListener('secondchange', drawWatchFace)
} else {
	watch.addEventListener('minutechange', drawWatchFace)
}

function initialize() {
	render.begin()
	render.fillRectangle(backgroundColor, 0, 0, render.width, render.height)
	
	// Initialize circle for hour hands reference
	// render.drawCircle(red, 
	// 	render.width / 2,
	// 	render.height / 2,
	// 	110,
	// 	0, 360
	// )

	// Initialize some guide lines (horizontal / vertical)
	// render.drawLine(0, render.height/2,render.width, render.height/2,blue, 2)
	// render.drawLine(render.width / 2, 0 , render.width / 2, render.height, lime, 2)

	// Render seconds reference lines
	srh.drawWatchReferenceLines(122, 'minutes', 5, 3, primaryColor, true)

	
	// render indicator for 12:00
	render.drawDCI(marker12, 
		(render.width - marker12.width) / 2,
		4
	)

	// Draw PDC indicators for hours
	srh.drawHourReferencePDCs(hourMarker, config.hourMarkerConfiguration)
	render.end()
}

function drawWatchFace(event) {

	initialize()
	const date = event.date
	const referenceHours = date.getHours()
	const watchHandHours = referenceHours < 12 ? referenceHours : referenceHours - 12 
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()

	// Render seconds hand (if necessary)
	if(JSON.parse(localStorage.getItem('RENDER_SECONDS_HAND'))) {
		drawWatchHand(seconds, 'SECONDS')
	}

	// Render minutes
	drawWatchHand(minutes, 'MINUTES')
	// Render hours
	drawWatchHand(watchHandHours, 'HOURS')

}

/**
 * @param {number} value Integer representint the digit value of the hour/minute/second watch hand to render
 * @param {'HOURS'|'MINUTES'|'SECONDS'} type String representing type of watchand to render
 */
function drawWatchHand(value, type) {
	const degreeSeparation = type === 'HOURS' ? 30 : 6
	const angle = -(value) * degreeSeparation * (Math.PI / 180)
	let x, y, pdc

	switch (type) {
		case 'HOURS':
			x = config.hourHandConfiguration[value].x
			y = config.hourHandConfiguration[value].y
			pdc = hourHand
			break
		case 'MINUTES':
			x = config.minuteHandConfiguration[value].x
			y = config.minuteHandConfiguration[value].y
			pdc = minuteHand
			break
		case 'SECONDS':
			x = config.secondsHandConfiguration[value].x
			y = config.secondsHandConfiguration[value].y
			pdc = secondsHand
			break
	}

	render.begin()
	render.drawDCI(pdc.clone().rotate(angle, 0, 0),
		x, y
	)
	render.end()
}