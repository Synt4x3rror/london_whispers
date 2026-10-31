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
            {x:118, y:37}, // Represents the 12:00 position
            {x: 168, y: 45}, // 1:00
            {x: 206, y: 75}, // 2:00
            {x: 224, y: 119}, // 3:00
            {x: 218, y: 169}, // 4:00
            {x: 186, y: 206}, // 5:00
            {x: 141, y: 222}, // 6:00
            {x: 94, y: 217}, // 7:00
            {x: 55, y: 188}, // 8:00
            {x: 35, y: 142}, //9:00
            {x: 43, y: 95}, // 10:00
            {x: 74, y: 56} // 11:00
        ]
    }

    getMinuteHandConfiguration() {
        // List of x, y coordinates a PDC
        // Used to represent a minutes hand.
        return []
    }
    
}