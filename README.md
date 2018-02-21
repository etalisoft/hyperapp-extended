# <img height=24 src=https://cdn.rawgit.com/JorgeBucaran/f53d2c00bafcf36e84ffd862f0dc2950/raw/882f20c970ff7d61aa04d44b92fc3530fa758bc0/Hyperapp.svg> Hyperapp

[Hyperapp](https://github.com/hyperapp/hyperapp) is a JavaScript library for building web applications.

## What's different

`hyperapp-extended` is `hyperapp`, but with a few additions.

### Actions
Actions have an additional parameter.

```js
// hyperapp
const actions = {
  example: value => (state, actions) => { /* state changes */ },
};

// hyperapp-extended
const actions = {
  example: value => (state, actions, current) => { /* state changes */ },
}
```

### Components
Components have an additional parameter.

```js
// hyperapp
const Component = (attributes, children) => <div />;

// hyperapp-extended
const Component = (attributes, children, current) => <div />;
```

### What is 'current'?

`current` is an object with two methods:

* `getState()` - returns the current app's global state
* `getActions()` - returns the current app's global actions
