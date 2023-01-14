import { useState } from 'react';

function Calendar() {
  const [count, setCount] = useState(0);

  return (
    <div className="Calendar">
      <h1>Calendar</h1>
      <div className="card"></div>
    </div>
  );
}

export default Calendar;
