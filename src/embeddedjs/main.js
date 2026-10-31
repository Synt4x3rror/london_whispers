import Poco from "commodetto/Poco";
import { ColorHelper, ShapeRenderHelper } from "./PebbleHelper"
import ConfigClass from "./config.js"

const render = new Poco(screen);
let colorHelperInstance = new ColorHelper(render)
let srh = new ShapeRenderHelper(render)
const config = new ConfigClass()

const blue = colorHelperInstance.getColor('blue')
const lime = colorHelperInstance.getColor('lime')
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
let secondsHand = new Poco.PebbleDrawCommandImage(3)

// Load required configuration
const hourHandConfig = config.getHourHandConfiguration()

// Draw basic wathface UI elements
initialize()

// Watch event for hour change
// watch.addEventListener('hourchange', handleHourChange)

function initialize() {
	render.begin();
	render.fillRectangle(backgroundColor, 0, 0, render.width, render.height);

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

	// Reference hour indicator - loaded using rotation and config for shits and giggles
	
	const px = 0
	const py = 0
	render.drawDCI(minuteHand.clone().rotate(0, px, py),
		hourHandConfig[0].x, hourHandConfig[0].y
	)

	// The circus begins
	// const angle = -(11) * Math.PI / 6
	// render.drawDCI(hourHand.clone().rotate(angle, px, py),
	// 	74, 56
	// )

	srh = null
	marker12 = null
	render.end();
}

function handleHourChange(event) {
	const referenceHours = event.date.getHours()
	const handHours = referenceHours >= 12 ? referenceHours -12 : referenceHours

	render.begin()
	render.drawDCI(hourHand.clone().rotate(-(handHours) * Math.PI / 6, 0, 0),
		hourHandConfig[handHours].x, hourHandConfig[handHours].y
	)

	render.end()
}
