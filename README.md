# react-fixed-device

A custom device-shaped component that will play video file

![demo](img/rfd_demo.gif)

All you need is to specify mp4 file😄

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
| src        | string                              | (Required) Path to mp4 file        | -             | "./video.mp4"  |
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

### License

MIT
