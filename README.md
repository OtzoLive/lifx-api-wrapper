
# lifx-api-wrapper

Node.js Lifx HTTP API Wrapper



## Features

- Promise based REST API calls
- Easy access to API responses
- Supports most LIFX HTTP API endpoints (more to be added)


## Installation

Install lifx-api-wrapper with npm:

```bash
  npm install lifx-api-wrapper
```

To run this project, you will need a LIFX HTTP API key.
Get your key here: https://api.developer.lifx.com/docs/authentication


## Usage

#### Getting started

```javascript
import Lifx from '../lifx-api-wrapper.js';

//create instance with our Lifx Token
var lifx = new Lifx(LIFX_KEY);

//Now lifx will always use your key
```


#### Getting a list of all lights

Most functions require a `selector` to determine which lights to control. To stay consistent and avoid the package breaking, the wrapper uses [standard LIFX selectors](https://api.developer.lifx.com/docs/selectors) laid out in their documentation.
```javascript
var lights = await lifx.ListLights('all')
console.log(lights.data);

//OR

lifx.ListLights('all')
    //grab returned data
    .then(data => {
        //handle data
        console.log(data)
    })
    .catch(err => 
        //handle errors
        console.log(err)
    );
```

#### Not using a parameter in a function

If you don't need a certain parameter, fill the spot with `undefined`. Note: `selector` and `power` are required if they are part of the function. 

```javascript
lifx.SetState('group_id:6a2e3...', 'on', undefined, 6.0, undefined, true)
```
You do not have to list `undefined` in every unused parameter.

```javascript
lifx.SetState('group_id:6a2e3...', 'on')
```


## API Reference

#### Get all items

### `lifx.ListLights()`

| Parameter | Type     | Example | Description              |
| :-------- | :------- |:------- |:------------------------ |
| `selector` | `string` | 'all' | **Required**            |

Returns all available lights and their unique selectors. It's recommended to use their unique ID's instead of names like "Living Room" since the ID's will never change.

Example response:
```json
[
  {
    id: "d07...949",
    uuid: "029...609d",
    label: "Office Light",
    connected: true,
    power: "off",
    color: {
      hue: 0,
      saturation: 0,
      kelvin: 2000,
    },
    brightness: 0.3,
    group: {
      id: "e1ad...537",
      name: "Office",
    },
    location: {
      id: "fd599...08350",
      name: "Home",
    },
    product: {
      name: "LIFX Mini Day and Dusk",
      identifier: "lifx_mini_day_and_dusk2",
      company: "LIFX",
      vendor_id: 1,
      product_id: 60,
      capabilities: {
        has_color: false,
        has_variable_color_temp: true,
        has_ir: false,
        has_hev: false,
        has_chain: false,
        has_matrix: false,
        has_multizone: false,
        min_kelvin: 1500,
        max_kelvin: 4000,
      },
    },
    last_seen: "2022-06-19T02:50:56Z",
    seconds_since_seen: 0,
  },
  other lights here...
]
```

### `lifx.SetState()`

| Parameter | Type     | Example | Description              |
| :-------- | :------- |:------- |:------------------------ |
| `selector` | `string` | 'group_id:6a2e3b...' | **Required**            |
| `power` | `string` | 'on' | **Required**            |
| `color` | `string` |  |            |
| `brightness` | `double` | 0.1 |            |
| `duration` | `double` | 1.0 | Defaults to 1.0            |
| `infared` | `double` | '0.5' |            |
| `fast` | `boolean` | false | Defaults to false           |

### `lifx.TogglePower()`

| Parameter | Type     | Example | Description              |
| :-------- | :------- |:------- |:------------------------ |
| `selector` | `string` | 'id:3a9b0x...' | **Required**            |

Turn off lights if any of them are on, or turn them on if they are all off.

### `lifx.ListScenes()`

Lists all scenes associated with the API Key provided.

Example response:
```json
[
  {
    uuid: "1b3a...s3451",
    name: "Night Time",
    account: {
      uuid: "435dza...5182z",
    },
    states: [
      {
        selector: "id:d07...ee46",
        power: "on",
        brightness: 0.1297,
        color: {
          hue: 350.6141,
          saturation: 1,
          kelvin: 3500,
        },
      },
    ],
    created_at: 1639715780,
    updated_at: 1652936342,
  },
  other scenes here...
]
```
 ### `lifx.ActivateScene()`

| Parameter | Type     | Example | Description              |
| :-------- | :------- |:------- |:------------------------ |
| `selector` | `string` | 'scene_id:6a2e3b...' | **Required** |
| `duration` | `double` | 1.0 | Defaults to 1.0            |
| `ignore` | `array` |   |   **This has not been tested**       |
| `overrides` | `array` |   |   **This has not been tested**       |
| `fast` | `boolean` | false | Defaults to false           |






## Examples

#### Turn on a group of lights over 10 seconds with fast mode enabled

```javascript
lifx.SetState('group_id:6a2e3...', 'on', undefined, 10.0, undefined, true)

//OR

//Note: no response is given in fast mode
lifx.SetState('group_id:6a2e3...', 'on', undefined, 10.0, undefined, true)
    .catch(err => 
        //handle errors
    );
```

#### Toggle all lights off/on

```javascript
lifx.TogglePower('group_id:6a2e3...', 'on')

//OR

lifx.TogglePower('group_id:6a2e3...', 'on')
    //grab returned data
    .then(data => {
        //handle data
    })
    .catch(err => 
        //handle errors
    );
```

#### Activate a scene that was previously set-up in the LIFX app

```javascript
lifx.ActivateScene('scene_id:1c4d3c7...338fa9', 1.0)

//OR

lifx.ActivateScene('scene_id:1c4d3c7...338fa9', 1.0)
    //grab returned data
    .then(data => {
        //handle data
    })
    .catch(err => 
        //handle errors
    );
```




## Future Goals

- Add remaining API Endpoints

- Add additional error handling to improve usability

- Implement automated tests / checks using jest
## Related

Inspired by other related projects:

[ywadi/lifx](https://github.com/ywadi/lifx)

[thanoskrg/lifxjs](https://github.com/thanoskrg/lifxjs)


## 📖 Feedback

I wrote this wrapper to use in my personal project to control my apartments smart devices through a custom Telegram Bot. LIFX lights had several nodejs libraries available, but few were up to date.

My goal was to not only to reduce outside dependencies in my own projects, but also make the API easier to use for others.

Writing this wrapper introduced me to javascript prototypes, classes, publishing NPM packages, and exporting/importing ES modules. Now to update my Telegram Bot to support this module...

Any and all feedback is appreciated.

### 🔗 Links
[![telegram](https://img.shields.io/badge/Telegram-%40OtzoLive-blue?style=flat-square&logo=telegram)](https://t.me/OtzoLive/) 
[![twitter](https://img.shields.io/badge/Twitter-%40OtzoLive-blue??style=flat-square&logo=twitter)](https://twitter.com/OtzoLive/)

