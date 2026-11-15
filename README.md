# London Whispers

A Pebble Alloy watchface — Uses PDC files to draw elements on the screen. Watchface rendering is done commpletely using Poco render. Currently watchface is black and white, but in the future I'll modify the PDC files so it can be rendered in other color schemes.

## Customization
Due to memory constraints, I could not get integration with pebble clay, however you can choose if this wactface should render the seconds hand by modifying the RENDER_SECONDS_HAND variable to true.

```bash
localStorage.setItem('RENDER_SECONDS_HAND', 'true')
```

## Building & running
```sh
pebble build                          # build for all targetPlatforms
pebble install --emulator emery       # install on the emery emulator
pebble install --phone <ip>           # install to a paired phone
```

## Target platforms

Watcface has been developed exclusively ro run for **gabbro** (Pebble Round 2). Other platforms are currently not supported.


## Documentation

Full SDK docs and tutorials: <https://developer.repebble.com>
