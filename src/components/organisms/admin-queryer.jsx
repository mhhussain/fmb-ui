import { useState } from "react";

const AdminQuery = (props) => {
  const { queryName, req } = props;
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState({});

  const handleInput = (e) => setInput(e.target.value);
  const handleOutput = (e) => setOutput(e.target.value);

  const handleReq = async () => {
    req(input).then((d) => {
      setOutput(JSON.stringify(d, null, 4))
    });
  }

  return (
    <div className="output">
      <p>{queryName}</p>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleReq}>{queryName}</button>
      <textarea rows="5" cols="50" value={output} onChange={handleOutput} />
    </div>
  );
};

export default AdminQuery;