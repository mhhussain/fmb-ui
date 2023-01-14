import { useState } from 'react';

export default function Tasbeeh() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
      <button className="btn btn-primary" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
