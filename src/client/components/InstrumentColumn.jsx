import React from 'react';

const InstrumentColumn = ({instruments}) => {
  console.log("InstrumentColumn -> instruments", instruments)
  return (
    <div className="InstrumentColumn">
      <ul>{
        instruments 
        ? instruments.map((item, i) => {
            return <li className='instrument-li' key={instruments[i].name}>{instruments[i].name}</li>;
          })
        : <p>Loading...</p>
      }</ul>
    </div>
  )
}

export default InstrumentColumn;