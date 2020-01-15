# electroscope
> painless reload for electron main process

Let the electroscope check the modules according to the entry file you give, and if necessary, refresh the main process and do not touch the renderer! Also, may the stdio be with you.

# Installation
```
npm install --dev electroscope

yarn add --dev electroscope
```

Of course you can use electroscope as global module.

# Usage
 #### 1) Replace the existing calls to  `electroscope`  in scripts.

```diff
/* package.json */

"scripts": {
-   "start": "electron main.js",
+   "start": "electroscope main.js"
}
```


#### 2) Require module in entry file of electron

```js
const foo = require('bar')
...

if(process.env.NODE_ENV === 'development') {
	require('electroscope')
}
```



# Why this module?

I've tried all the other electron-reload stuffs, but there are a few things they all missed. First, the app.relaunch method doesn't work as we expected, at least it wasn't what we imagined in our minds. app.relaunch caused us to lose control of stdio, and we had to do little hacking to partially solve it. I do not like it :/ Secondly, why changes in my rendering process cause an update to main process? Maybe I want to use HMR? Booom! The only change is that it updates both my main process and my renderer process. Okay, it might be a good idea to split the renderer and main files into different folders or use a regex pattern, but I'm too lazy to do that.

# License

MIT © [kubilay salih](https://kubilay.io)