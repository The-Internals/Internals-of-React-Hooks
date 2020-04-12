### constructor

```js
function MyApp() => {
  const [state, setState] = useState(() => {
    // do one time heavy computation here, which will be done on first render
  })

  const someValue = useMemo(() => {
    // do things you want to do one time which will be done on first render
  }, [])
}
```

### getDerivedStateFromProps

```js
function MyApp(props) {
  const [factor, setFactor] = useState(1);

  useMemo(() => {
    setFactor(props.value);
  }, [props.value]);
}
```

### componentDidMount

```js
function MyApp(props) {
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    // do something similar to mount
  }, []);
}
```

### componentWillUnMount

```js
function MyApp(props) {
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    return () => {
      // do something similar to mount
    };
  }, []);
}
```
