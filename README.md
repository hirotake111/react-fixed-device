# react-fixed-device

A custom device-shaped component that will play video file

- Simple usage
- Currently React TypeScript only

![demo](https://j.gifs.com/qQ6ZqG.gif)

### Installation

```bash
npm i react-fixed-device
# or
yarn add react-fixed-device

```

### Usage

```JavaScript
// import component
import Device from "react-fixed-device"

// put Device component on top of window
export const App() {
    return (
        <>
          <Device src="your.mp4" autoPlay control {...otherPorps} />
          <YourComponents/>
        </>
    )
}
```

### API

| Property   | type                                | Description                        | Default       | Example        |
| ---------- | ----------------------------------- | ---------------------------------- | ------------- | -------------- |
| src        | string                              | (Required) Path to mp4 file        | -             | ./video.mp4    |
| type       | "default" "notch" "glass"           | Type of device                     | "default"     | "glass"        |
| mode       | "portrait" "landscape"              | Portrait mode or Landscape mode    | "portrait"    | "landscape"    |
| poster     | string                              | Poster image                       | -             | "./poster.png" |
| loop       | boolean                             | Determine if video is on repeat    | false         | true           |
| autoPlay   | boolean                             | Auto play or not                   | false         | true           |
| control    | boolean                             | Determine if user can stop/play it | false         | true           |
| color      | string                              | Color of device frame              | "#fff"        | "#ababab"      |
| size       | "sm" "md" "lg"                      | Size of device                     | "md"          | "sm"           |
| position   | "bottomRight" "bottomLeft" "center" | Default position of device         | "bottomRight" | "center"       |
| draggable  | boolean                             | Determine if device is draggable   | false         | true           |
| onVideoEnd | ()=> void                           | Invoked when video stopped         | -             | -              |

- if you set type "glass", color prop will not be honored.
- if you set loop true, onVideEnd will not be performed.

### Development notes

```bash
cd node_modules/react-dom && yarn link
cd ../react-dom/ && yarn link

cd ../../example && yarn link react && yarn react-dom
```

### License

MIT
