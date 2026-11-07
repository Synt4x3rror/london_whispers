/**
 * Configuration file for the position of PDCs
 * In lieu of having a working PDC.rotate() function, 
 * PDCs will be placed using hardcoded values
 */

export default {
    hourMarkerConfiguration: [
        {x: 188, y: 19}, // 1 Marker
        {x: 236, y: 64}, // 2 Marker
        {x: 254, y: 126}, // 3 Marker
        {x: 239, y: 188}, // 4 Marker
        {x: 196, y: 235}, // 5 Marker
        {x: 134, y: 253}, // 6 Marker
        {x: 72, y: 239}, // 7 Marker
        {x: 25, y: 196}, // 8 Marker
        {x: 5, y: 134}, // 9 Marker
        {x: 20, y: 70}, // 10 Marker
        {x: 64, y: 25} // 11 Marker
    ],

    hourHandConfiguration: [
        // List of x, y coordinates a PDC
        // Used to represent an hour hand.
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
    ],

    minuteHandConfiguration: [
        // List of x, y coordinates a PDC
        // Used to represent a minutes hand.
        {x: 118, y: 0}, // Represents the XX:00 position
        {x: 132, y: 1}, // XX:01
        {x: 146, y: 1}, // XX:02
        {x: 159, y: 2}, // XX:03
        {x: 172, y: 8}, // XX:04
        {x: 185, y: 12}, // XX:05
        {x: 197, y: 17}, // XX:06
        {x: 209, y: 27}, // XX:07
        {x: 220, y: 35}, // XX:08
        {x: 229, y: 46}, // XX:09
        {x: 237, y: 55}, // XX:10
        {x: 245, y: 67}, // XX:11
        {x: 251, y: 80}, // XX:12
        {x: 255, y: 93}, // XX:13
        {x: 259, y: 106}, // XX:14
        {x: 261, y: 119}, // XX:15
        {x: 261, y: 133}, // XX:16
        {x: 261, y: 148}, // XX:17
        {x: 259, y: 161}, // XX:18
        {x: 255, y: 175}, // XX:19
        {x: 249, y: 187}, // XX:20
        {x: 243, y: 199}, // XX:21
        {x: 235, y: 210}, // XX:22
        {x: 226, y: 220}, // XX:23
        {x: 216, y: 230}, // XX:24
        {x: 205, y: 238}, // XX:25
        {x: 193 ,y: 245}, // XX:26
        {x: 181, y: 250}, // XX:27
        {x: 169, y: 256}, // XX:28
        {x: 155, y: 259}, // XX:29
        {x: 141, y: 261}, // XX:30
        {x: 128, y: 261}, // XX:31
        {x: 115, y: 261}, // XX:32
        {x: 101, y: 258}, // XX:33
        {x: 88, y: 254}, // XX:34
        {x: 75, y: 248}, // XX:35
        {x: 63, y: 243}, // XX:36
        {x: 51, y: 235}, // XX:37
        {x: 40, y: 227}, // XX:38
        {x: 31, y: 217}, // XX:39
        {x: 23, y: 206}, // XX:40
        {x: 16, y: 195}, // XX:41
        {x: 10, y: 182}, // XX:42
        {x: 5, y: 169}, // XX:43
        {x: 1, y: 156}, // XX:44
        {x: -1, y: 142}, // XX:45
        {x: -2, y: 129}, // XX:46
        {x: -1, y: 116}, // XX:47
        {x: 2, y: 102}, // XX:48
        {x: 6, y: 89}, // XX:49
        {x: 11, y: 76}, // XX:50
        {x: 18, y: 65}, // XX:51
        {x: 25, y: 52}, // XX:52
        {x: 34, y: 43}, // XX:53
        {x: 44, y: 32}, // XX:54
        {x: 54, y: 24}, // XX:55
        {x: 66, y: 17}, // XX:56
        {x: 78, y: 10}, // XX:57
        {x: 92, y: 6}, // XX:58
        {x: 105, y: 2} // XX:59
    ],

    secondsHandConfiguration: [
        // List of x, y coordinates a PDC
        // Used to represent a seconds hand.
        {x: 119, y: -3}, // XX:00
        {x: 133, y:-3}, // XX:01
        {x: 147, y: -3}, // XX:02
        {x: 162, y: -2}, // XX:03
        {x: 174, y: 4}, // XX:04
        {x: 187, y: 10}, // XX:05
        {x: 201, y: 14}, // XX:06
        {x: 214, y: 22}, // XX:07
        {x: 224, y: 32}, // XX:08
        {x: 232, y: 44}, // XX:09
        {x: 242, y: 54}, // XX:10
        {x: 249, y: 66}, // XX:11
        {x: 256, y: 79}, // XX:12
        {x: 260, y: 93}, // XX:13
        {x: 264, y: 107}, // XX:14
        {x: 267, y: 120}, // XX:15
        {x: 267, y: 135}, // XX:16
        {x: 266, y: 150}, // XX:17
        {x: 262, y: 162}, // XX:18
        {x: 259, y: 177}, // XX:19
        {x: 254, y: 190}, // XX:20
        {x: 246, y: 201}, // XX:21
        {x: 238, y: 214}, // XX:22
        {x: 229, y: 224}, // XX:23
        {x: 217, y: 232}, // XX:24
        {x: 206, y: 240}, // XX:25
        {x: 194, y: 249}, // XX:26
        {x: 181, y: 254}, // XX:27
        {x: 169, y: 260}, // XX:28
        {x: 155, y: 264}, // XX:29
        {x: 140, y: 265}, // XX:30
        {x: 127, y: 264}, // XX:31
        {x: 113, y: 263}, // XX:32
        {x: 99, y: 262}, // XX:33
        {x: 87, y: 255}, // XX:34
        {x: 73, y: 250}, // XX:35
        {x: 61, y: 243}, // XX:36
        {x: 51, y: 234}, // XX:37
        {x: 39, y: 226}, // XX:38
        {x: 29, y: 218}, // XX:39
        {x: 20, y: 206}, // XX:40
        {x: 12, y: 195}, // XX:41
        {x: 7, y: 182}, // XX:42
        {x: 3, y: 168}, // XX:43
        {x: 0, y: 154}, // XX:44
        {x: 0, y: 141}, // XX:45
        {x: -2, y: 127}, // XX:46
        {x: -3, y: 114}, // XX:47
        {x: -2, y: 99}, // XX:48
        {x: 2, y: 85}, // XX:49
        {x: 9, y: 73}, // XX:50
        {x: 16, y: 61}, // XX:51
        {x: 24, y: 50}, // XX:52
        {x: 33, y: 40}, // XX:53
        {x: 43, y: 30}, // XX:54
        {x: 54, y: 22}, // XX:55
        {x: 66, y: 14}, // XX:56
        {x: 78, y: 6}, // XX:57
        {x: 92, y: 3}, // XX:58
        {x: 106, y: 0}, // XX:59
    ]
    
}