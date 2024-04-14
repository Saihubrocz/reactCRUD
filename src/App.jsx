import { useEffect, useState } from 'react'
import './App.css'
import { EmployeeData } from './EmployeeData'

function App() {
  const [data, setData] = useState([])
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [age,setAge] = useState(0)
  const [id,setId] = useState(0)
  const [isupate, setIsupdate] = useState(false)

  useEffect(()=>{
    setData(EmployeeData)
  },[]);
  const handleEdit =(id) => {
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined)
    {
      setIsupdate(true)
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  }
  const handledelete =(id) => {
      if(id>0)
      {
        if (window.confirm('Are you sure want to delete this item?'))
        {
          const dt = data.filter(item =>item.id !== id);
          setData(dt)
        }
      }
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('')
    setIsupdate(false)
  }
  const handleSave = (e) =>{
    let error = '';
    if(firstName === '')
    error += 'FirstName is required';

    if(lastName === '')
    error += 'lastName is required';
    
    if(age <= 0)
    error += 'Age is required';

    if(error ==='')
    {
      e.preventDefault();
    const dt = [...data];
    const newObject = {
      id: EmployeeData.length+1,
      firstName: firstName,
      lastName: lastName,
      age:age
    }
    dt.push(newObject);
    setData(dt);
    handleClear()     
    }
    else{
      alert(error)
    }    
  }

  const handleUpdate = () => {
    const index = data.map((item)=>{
      return item.id
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName
    dt[index].lastName = lastName
    dt[index].age = age

    setData(dt);
    handleClear()

  }

  return (
    <div className="App">
      <div style={{display:'flex', justifyContent:'center',marginTop:'10px',marginBottom:'10px'}} ></div>
      <div>
        <label htmlFor="">First Name
        <input onChange={(e)=> setFirstName(e.target.value)} value={firstName}  type="text" placeholder='Enter first name' />
        </label>
      </div>
      <div>
        <label htmlFor="">Last Name
        <input onChange={(e)=> setLastName(e.target.value)} value={lastName} type="text" placeholder='Enter last name' />
        </label>
      </div>
      <div>
        <label htmlFor="">Age
        <input onChange={(e)=> setAge(e.target.value)} value={age} type="text" placeholder='Enter age' />
        </label>
      </div>
      <div>
        {
          ! isupate ?
          <button onClick={(e)=>handleSave(e)} >Save</button>
          :
          <button onClick={()=>handleUpdate()} >Update</button>
        }    
        <button onClick={()=>handleClear()} >Clear</button>&nbsp;
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index) => {
              return(
                <tr key={index} >
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)} className='btn btn-primary' >Edit</button>
                    <button onClick={() => handledelete(item.id)} className='btn btn-danger' >Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>

  )
}

export default App
