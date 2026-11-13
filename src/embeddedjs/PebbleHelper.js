// Define a struct of commonly used colors
const COLORMAP = new Map([
  ['black', [0, 0, 0]],
  ['white', [255, 255, 255]],
  ['red', [255, 0, 0]],
  ['green', [0, 128, 0]],
  ['blue', [0, 0, 255]],
  ['yellow', [255, 255, 0]],
  ['cyan', [0, 255, 255]],
  ['magenta', [255, 0, 255]],
  ['gray', [128, 128, 128]],
  ['silver', [192, 192, 192]],
  ['maroon', [128, 0, 0]],
  ['olive', [128, 128, 0]],
  ['lime', [0, 255, 0]],
  ['navy', [0, 0, 128]],
  ['teal', [0, 128, 128]],
  ['purple', [128, 0, 128]]
])

const HTML_REGEX = /#?([0-9]|[A-F]){3}(([0-9]|[A-F]){3})?$/ig

/**
 * Helper class to generate colors on pebble interface
 */
export class ColorHelper {
    /**
     * Constructor for ColorHelper class
     * @param {object} render Instance of Poco class
     */
    constructor(render) {
        this.render = render
    }

    /**
     * Static function to return common color names by this class
     * @returns 
     */
    static getCommonColorNames() {
        return COLORMAP.keys()
    }

    /**
     * Function that returns a Pebble color from user input
     * @param {string | Array<number>} input User input. Accepts either an array of three integers (0 - 255) to be used as rgb values. String representing shorthand html code for color (Ex.: '#FFF') or string for standard html color (Ex.: '#FF0FA0'). String input is not case sensitive. MUST include '#' character.
     * @returns {object} Object representing color to be used for pebble display
     */
    getColor(input) {
        // Validate if input is an array containing RGB Values
        if(Array.isArray(input) && input.length === 3 && 
        input.every(el => Number.isInteger(el) && el >= 0 && el <=  255)){
            // Do nothing - Input is already an array of RBG values
        } else if (typeof input === "string" && COLORMAP.has(input)) {
            // If input is the name of a common color, assign the input variable to its
            // RGB array value
            input = COLORMAP.get(input)
        } else if (typeof input === "string" && HTML_REGEX.test(input)) {
            // If input is shorthand HTML color, normalize it to 6 character HTML colorcode
            input = input.length === 4 ? `#${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}` 
            : input
            
            //  Convert to RGB array
            input = [
                parseInt(input.slice(1, 3), 16),
                parseInt(input.slice(3, 5), 16),
                parseInt(input.slice(5, 7), 16),
            ]

            if(!input.every(el => Number.isInteger(el) && el >= 0 && el <=  255)) {
                throw new Error('E1: Invalid color input. Accepts array representing RGB value, string of common color or HTML color string')
            }

        } else {
            throw new Error('E2: Invalid color input. Accepts array representing RGB value, string of common color or HTML color string')
        }

        // Return a render color
        return this.render.makeColor(input[0], input[1], input[2])
    }
}

export class ShapeRenderHelper {
    /**
     * 
     * @param {object} render Instance of Poco class
     * @param {Object} centerCoordinates Object containing corrdinates for center of the screen
     */
    constructor (render) {
        this.render = render
        this.centerX = render.width / 2
        this.centerY = render.height / 2
    }

    /**
     * Helper function to draw lines around a radius to be used as watch indicators (hour, minute, second) 
     * @param {number} radius How far from the center should a line start being drawn?
     * @param {'minutes' | 'hours'} minutesOrHours String representing choice if lines should be rendered to represent minute markers (60) or hour markers (12)
     * @param {number} lineLength Rendered line height
     * @param {number} LineWidth rendered line width
     * @param {object} color Object representing color to be used for pebble display
     * @param {boolean} skipHourIndicatorForMinutes Optional parameter used to indicate if minute indicator should be omitted at the hour marker. Has no effect when `minutesOrHours` parameter is set to 'hours'. Default value is `false` 
     */
    drawWatchReferenceLines(radius, minutesOrHours, lineLength, lineWidth, color, skipHourIndicatorForMinutes=false) {
        const radialConfig = Object.freeze({
            'minutes': {
                degreeSeparation: 6,
                count: 60
            },
            hours: {
                degreeSeparation: 30,
                count: 12
            }
        })

        for (var i = 0; i < radialConfig[minutesOrHours].count; i++) {
            // Start rendering lines at 12:00 and rotate clockwise

            if(minutesOrHours === 'minutes' && skipHourIndicatorForMinutes && i % 5 === 0) {
                // Omits the hour indicators when rendering minute lines
                continue
            }

            let angle = (i * radialConfig[minutesOrHours].degreeSeparation - 90) * Math.PI / 180

            let x1 = this.centerX + Math.cos(angle) * radius
            let y1 = this.centerY + Math.sin(angle) * radius

            let x2 = this.centerX + Math.cos(angle) * (radius - lineLength)
            let y2 = this.centerY + Math.sin(angle) * (radius - lineLength)

            // Draw the line
            this.render.begin()
            this.render.drawLine(x1, y1, x2, y2, color, lineWidth)
            this.render.end()
        }
    }

    /**
     * 
     * @param {Object} centroid Object representing x and y coordinates of centroid used to draw lines from 
     * @param {number} radius How far from the center should a line start being drawn?
     * @param {number} lineLength Rendered line length
     * @param {number} lineWidth Rendered line width
     * @param {Object} color Object representing color to be used for pebble display
     * @param {number} percentIndex Index indicating battery percentage. Values should be from 0 to 25
     */
    drawBatteryLines(centroid, radius, lineLength, lineWidth, color, percentIndex) {
        // Draw a line for every 4% battery being reported by percentIndex parameter. 
        // This function will draw a total of 25 lines to reprtesent current battery state

        for (var i = 0; i < percentIndex; i++) {
            let angle = -(Math.PI + (i * 7.2 * (Math.PI / 180)))

            let x1 = centroid.x + Math.cos(angle) * radius
            let y1 = centroid.y + Math.sin(angle) * radius

            let x2 = centroid.x + Math.cos(angle) * (radius - lineLength)
            let y2 = centroid.y + Math.sin(angle) * (radius - lineLength)
            
            this.render.begin()
            this.render.drawLine(x1, y1, x2, y2, color, lineWidth)
            this.render.end()
        }

    }

    /**
     * Helper function used to draw hour reference indicators on the watch face. Since rotating PDCs in poco is a real nightmare, I won't event TRY to make this function reusable in the future. Assumes rotation of PDC file is at (0,0) pivot.
     * @param {Object} pdc Instance of PDC drawing to be rendered 
     * @param {Object} hourMarkerConfiguration Configuration containing coordinates where to place each marker according to the corresponding hour mark.  
     */
    drawHourReferencePDCs (pdc, hourMarkerConfiguration) {
        for(var i = 1; i <= 11; i++) {
            let markerAngle = -(i) * Math.PI / 6
            this.render.begin()
            this.render.drawDCI(pdc.clone().rotate(markerAngle, 0, 0),
                hourMarkerConfiguration[i-1].x,
                hourMarkerConfiguration[i-1].y
            )
            this.render.end()
        }
    }

    /**
     * 
     * @param {*} centerX 
     * @param {*} centerY 
     * @param {*} radius 
     * @param {*} thickness 
     * @param {*} lineColor 
     * @param {*} backgroundColor 
     */
    drawCircleOutline(centerX, centerY, radius, thickness, lineColor, backgroundColor) {
        if(thickness >= radius || thickness <= 0) {
            throw new Error('Invalid Parameters - drawCircleOutline()')
        }

        this.render.begin()
        this.render.drawCircle(lineColor, 
            centerX,
            centerY,
            radius,
            0, 360
        )

        this.render.drawCircle(backgroundColor, 
            centerX,
            centerY,
            radius - thickness,
            0, 360
        )
        this.render.end()
    }
}
