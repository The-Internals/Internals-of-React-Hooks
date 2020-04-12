You write in JSX.

```jsx
<div className="my-app">
  <h1>My App</h1>
  <App />
</div>
```

JSX is transformed to create element syntax

```js
React.createElement(
  "div",
  { className: "my-app" },
  React.createElement("h1", {}, "My App"),
  React.createElement(App, {})
);
```

Create element returns react elements

```js
{
  type: 'div',
  props: {
    className: 'my-app',
    children: [{
      type: 'h1',
      props: {
        children: 'My App'
      }
    }, {
      type: App,
      props: {}
    }]
  }
}
```

A fiber node is created for each of the React Element

```js
// div fiber
{
  type: 'div',
  stateNode: HTMLElement<Div>,
  child: H1Fiber
}

// h1 fiber
{
  type: 'h1',
  stateNode: HTMLElement<h1>,
  parent: DivFiber,
  child: TextFiber,
  sibling: AppFiber
}

// App fiber
{
  type: App,
  stateNode: AppInstance, // new App
  parent: DivFiber,
}
```
