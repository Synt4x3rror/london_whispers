/**
 * Configuration file for the position of PDCs
 * In lieu of having a working PDC.rotate() function, 
 * PDCs will be placed using hardcoded values
 */

export default class Config{
    constructor (renderWidth, renderHeight) {
        this.renderWidth = renderWidth
        this.renderHeight = renderHeight
    }


    getHourHandConfiguration() {
        // List of x, y coordinates a PDC
        // Used to represent an hour hand.
        return [
            [118, 37] // Represents 12:00 Position
        ]
    }
    
}