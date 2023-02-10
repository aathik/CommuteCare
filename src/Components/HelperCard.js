import React, { useState, useEffect } from 'react';

function Card({ person }) {
    return (
      <div className="card">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${person.image})` }}
        />
        <div className="card-text">
          <h2>{person.name}</h2>
          <p>{person.details}</p>
        </div>
      </div>
    );
  }

const HelperCard = () => {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('people.json')
        .then((res) => res.json())
        .then((data) => setPeople(data));
    }, []);
    
  return (
    <div className='helper-card'>


    </div>
  )
}

export default HelperCard