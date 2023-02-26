import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyWord] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => setKeyWord(e.target.value);
  useEffect(() => {
    console.log('I run only once');
  }, []);
  useEffect(() => {
    /*     if (keyword !== "" && keyword.length > 5) {
          console.log('SEARCH FOR', keyword);
        } */
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'keyword & counter' changes.");
  }, [keyword, counter]);
  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
