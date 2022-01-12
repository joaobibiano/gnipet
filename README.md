# Gnipet - Your tool to compose emails

Stop lost time writing always the same text.

## Installation

This repository contains two main folders. `App` and `Extension`

The `App` folder contains a React App that renders and manages all information from templates.

`Extension` folder contains basically plain javascript with a manifest to upload to chrome store and renders `App` within an Iframe using [InboxSDK](https://inboxsdk.github.io/inboxsdk-docs/) to manage Gmail interface.

### Running with deployed `App`

You don't need to run locally. You can use the published version on `https://gnipet.vercel.app`

### Running locally

#### Requirements
- NodeJS
- NPM or Yarn

> From `App` Folder
1. Install the dependencies


```bash
yarn install
```

or

```bash
npm install
```

2. Starts the development process

```bash
yarn dev
```
or 
```bash
npm run dev
```

Updates the APP_URL inside extensions `extension/main.js:2` to `http://localhost:4001`

## Install the extension in your browser

From [Google Support](https://support.google.com/chrome/a/answer/2714278?hl=en)

```
1. Go to chrome://extensions/.

2. At the top right, turn on Developer mode.

3. Click Load unpacked.

```
From now the extension is enabled and you can enjoy it!

## Contributing

Feel free to open a PR to improve the project

### Running the tests

There are a great effort to keep a good coverage. Keep it up!

<img width="961" alt="Screenshot 2022-01-12 at 23 08 22" src="https://user-images.githubusercontent.com/29175815/149237385-218441f3-5360-4d5e-b7a1-143501ab9a3b.png">

## Demo

https://user-images.githubusercontent.com/29175815/149237188-e522d95b-7308-416d-87d8-84a1b1dd836d.mov






## License
[MIT](https://choosealicense.com/licenses/mit/)
