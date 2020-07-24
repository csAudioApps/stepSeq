import React from 'react';
import * as reducerConstants from '../reducer/reducerConstants'

const InstrumentColumn = ({instruments, dispatch, localUserId}) => {
  // console.log("InstrumentColumn -> instruments", instruments)
  return (
    <div className="InstrumentColumn">
      <ul>{
        instruments 
        ? instruments.map((item, i) => {
            return ( 
              <div>
                {/* <li className='instrument-li' key={instruments[i].name}>{instruments[i].name}</li> */}
                <button className='instrument-btn' 
                  key={instruments[i].name} 
                  onClick={() => dispatch({
                    type: reducerConstants.SET_SELECTED_INSTRUMENT,
                    payload: { localUserId: localUserId, instrumentSelected: i }
                  })}
                >
                  {instruments[i].name}
                </button>
              </div>  
            )
          })
        : <p>Loading...</p>
      }</ul>
    </div>
  ) 
}

export default InstrumentColumn;