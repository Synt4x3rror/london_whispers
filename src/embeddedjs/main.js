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

initialize()

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
	const hourHandConfig = config.getHourHandConfiguration()
	const px = hourHand.width / 2
	const py = hourHand.height / 2
	render.drawDCI(hourHand.clone().rotate(0, px, py),
		hourHandConfig[0][0], hourHandConfig[0][1]
	)


	srh = null
	marker12 = null
	render.end();
}

function handleSecondChange() {
	return
	
}
