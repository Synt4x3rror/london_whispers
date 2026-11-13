import Poco from "commodetto/Poco"
import Battery from "embedded:sensor/Battery"

import { ColorHelper, ShapeRenderHelper } from "./PebbleHelper"
import config from "./config.js"

const render = new Poco(screen)
let colorHelperInstance = new ColorHelper(render)
let srh = new ShapeRenderHelper(render)

// const blue = colorHelperInstance.getColor('blue')
// const lime = colorHelperInstance.getColor('lime')
const red = colorHelperInstance.getColor('red')
const backgroundColor = colorHelperInstance.getColor('#fff')
const primaryColor = colorHelperInstance.getColor('black')
colorHelperInstance = null

/**
 * Index of PDC foiles loaded on package.json:
 * 		(1) - Hour Hand
 * 		(2) - Minute Hand
 * 		(3) - Second Hand
 * 		(4) - Hour Marker
 * 		(5) - 12:00 Indicator
 */

/**Global variables for watchface settings - Must be replaced with loading from config */
localStorage.setItem('RENDER_SECONDS_HAND', 'true')

let marker12 = new Poco.PebbleDrawCommandImage(5)
let hourMarker = new Poco.PebbleDrawCommandImage(4)
const hourHand = new Poco.PebbleDrawCommandImage(1)
const minuteHand = new Poco.PebbleDrawCommandImage(2)
const secondsHand = new Poco.PebbleDrawCommandImage(3)

// Font to be used for rendering text
const font = new render.Font("Gothic-Bold", 14)

// Instance of Battery
let batteryStatus = {
	percentage: 100,
	charging: false,
	plugged: false
}

const battery = new Battery({
	onSample() {
		const sample = this.sample()
		batteryStatus.percentage = sample?.percent
		batteryStatus.charging = sample?.charging
		batteryStatus.plugged = sample?.plugged
	}
})

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
	render.end()

	// Initialize circle for hour hands reference
	// render.drawCircle(red, 
	// 	render.width / 2,
	// 	render.height / 2,
	// 	110,
	// 	0, 360
	// )

	// Render seconds reference lines
	srh.drawWatchReferenceLines(122, 'minutes', 5, 3, primaryColor, true)
	
	// render indicator for 12:00
	render.begin()
	render.drawDCI(marker12, 
		(render.width - marker12.width) / 2,
		4
	)
	render.end()

	// Draw PDC indicators for hours
	srh.drawHourReferencePDCs(hourMarker, config.hourMarkerConfiguration)

	// // Draw "Circle Outline" for digital display
	// srh.drawCircleOutline(render.width / 2, 186,
	// 	43, 1, primaryColor, backgroundColor)

	// Draw "Circle Outline" for day interface
	srh.drawCircleOutline(render.width /4, render.height / 2,
		32, 1, primaryColor, backgroundColor)

	// // Draw "Circle Outline" for month interface
	// srh.drawCircleOutline(render.width * (3/4), render.height / 2,
	// 	32, 1, primaryColor, backgroundColor)

	// Initialize some guide lines (horizontal / vertical)
	// render.drawLine(0, render.height/2,render.width, render.height/2,blue, 2)
	// render.drawLine(render.width / 2, 0 , render.width / 2, render.height, lime, 2)

	// Render reference lines at 1/4 and 3/4 positions
	// render.drawLine(render.width / 4, 0, render.width / 4, render.height, red, 2)
	// render.drawLine(3* render.width / 4, 0, 3 * render.width / 4, render.height, red, 2)

}

function drawWatchFace(event) {

	initialize()
	const date = event.date
	const referenceHours = date.getHours()
	const watchHandHours = referenceHours < 12 ? referenceHours : referenceHours - 12 
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()

	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	// Render seconds hand (if necessary)
	if(JSON.parse(localStorage.getItem('RENDER_SECONDS_HAND'))) {
		drawWatchHand(seconds, 'SECONDS')
	}

	// Render minutes
	drawWatchHand(minutes, 'MINUTES')
	// Render hours
	drawWatchHand(watchHandHours, 'HOURS')

	// Render Current date
	renderDate(month, day)

	const batteryIndex = Math.floor(batteryStatus.percentage / 4)
		
	// Draw battery percentage indicator
	srh.drawBatteryLines({x: render.width / 4, y: render.height / 2},
		29, 3, 1, batteryIndex < 6 ? red : primaryColor, batteryIndex
	)

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

function renderDate(month, day) {
	render.begin()
	render.drawText(`${month}.${day}`, font, primaryColor, 50, 110)
	render.end()
}