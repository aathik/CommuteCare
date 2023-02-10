import './HelperList.css'
import NavBar from './NavBar'
import data from '../Assets/Helper.json'


const HelperList = () => {


  return (
    <div>
        <NavBar />
        <div className='helper-container'>
            {data.map((person, index) => (
                <div key={index} className='helper-cards'>
                    <div className='helper-details'>
                        <h3>{person.name}</h3>
                        <p>Email: {person.email}</p>
                        <p>Gender: {person.gender}</p>
                        <p>Age: {person.age}</p>
                        <p>Availability: {person.availability}</p>
                        <p className='italics'>"{person.description}"</p>
                        
                    </div>
                </div>
        ))}
        </div>
        
    </div>
  )
}

export default HelperList