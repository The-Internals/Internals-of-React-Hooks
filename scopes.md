### Basic scope example

```js
function ageTeller(name) {
  return function (age) {
    return `The age of ${name} is ${age}.`;
  };
}

const sudhanshu = ageTeller("Sudhanshu");

sudhanshu(29); // The age of Sudhanshu is 29.

sudhanshu(30); // The age of Sudhanshu is 30.
```

### React functional component

#### Scope example

```js
function MyComponent(props) {
  const [value, setValue] = useState("initial");

  useEffect(() => {
    document.title = value;
  });

  return <div>Something</div>;
}
```

#### Callback example

```js ❌
function MyComponent(props) {
  const [value, setValue] = useState("initial");

  const onClick = useCallback(() => {
    setValue(value + "--");
  }, []);

  return <MyOtherComponent onClick={onClick} />;
}
```

```js ✅
function MyComponent(props) {
  const [value, setValue] = useState("initial");

  const onClick = useCallback(() => {
    setValue(value + "--");
  }, [value]);

  return <MyOtherComponent onClick={onClick} />;
}
```

```js ✅
function MyComponent(props) {
  const [value, setValue] = useState("initial");

  const onClick = useCallback(() => {
    setValue((value) => {
      return value + "--";
    });
  }, []);

  return <MyOtherComponent onClick={onClick} />;
}
```

#### Fetch example

```js ❌
function MyComponent(props) {
  const [factor, setFactor] = useState(1);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    fetch('chart data').then((list) => {
      const factoredList = list.map((list) => list * factor);
      setChartData(factoredList);
    })
  }, []);


  return (
    <>
      <input type="number" value={factor} onChange={(e) => setFactor(Number(e.target.value))} />
      <Chart data={chartData} />
    <>
  )
}
```

```js ✅
function MyComponent(props) {
  const [factor, setFactor] = useState(1);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    fetch('chart data').then((list) => {
      setChartData(list);
    })
  }, []);


  const chartData = apiData.map((item) => item * factor);

  //OR

  const chartData = useMemo(() => {
    return apiData.map((item) => item * factor)
  }, [apiData, factor])

  return (
    <>
      <input type="number" value={factor} onChange={(e) => setFactor(Number(e.target.value))} />
      <Chart data={chartData} />
    <>
  )
}
```

#### setInterval example

```js ❌
import React, { useState, useEffect, useRef } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, delay);
  });

  return (
    <>
      <input
        type="number"
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
      />
      <h1>{count}</h1>;
    </>
  );
}
```

Correct approach
[https://overreacted.io/making-setinterval-declarative-with-react-hooks/](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
