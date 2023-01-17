import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Form() {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      password: '',
      occupation: '',
      state: '',
    });
    const [occupations, setOccupations] = useState([]);
    const [states, setStates] = useState([]);
    const [errors, setErrors] = useState({}); 
   
  
    // Fetch the options for occupation and state on component mount
    React.useEffect(() => {
      fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(response => response.json())
        .then(data => {
          setOccupations(data.occupations);
          setStates(data.states);
        });
    }, []);

  const handleSubmit = event => {
    event.preventDefault();
    //Validate the form before submitting
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = "Full name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.occupation) formErrors.occupation = "Occupation is required";
    if (!formData.state) formErrors.state = "State is required";
     setErrors(formErrors);
  if (Object.keys(formErrors).length) return;
  //If form is valid, make the POST request
fetch('https://frontend-take-home.fetchrewards.com/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      occupation: formData.occupation,
      state: formData.state
    })
  })
  .then(response => {
    if (response.status === 201) {
      return response.json();
    } else {
      throw new Error('Error creating user');
    }
  })
  .then(data => {
    console.log('User created successfully!', data);
  })
     setErrors({});
    //console.error('Error creating user:', error);
    toast.success("Application submitted!", {
        position: "top-center"
    });
  
};

return (
    <form onSubmit={handleSubmit}>
    <legend>Fill your application form</legend>
    <label>
    Full Name:
    <input
    type="text"
    value={formData.fullName}
    onChange={event => setFormData({ ...formData, fullName: event.target.value })}
    />
    {errors.fullName && <div>{errors.fullName}</div>}
    </label>
    <br />
    <label>
        Email:
     <input
        type="email"
        value={formData.email}
        onChange={event => setFormData({ ...formData, email: event.target.value })}
      />
     {errors.email && <div>{errors.email}</div>}
    </label>
     <br />
     <label>
     Password:
     <input
     type="password"
     value={formData.password}
    onChange={event => setFormData({ ...formData, password: event.target.value })}
      />
    {errors.password && <div>{errors.password}</div>}
    </label>
    <br />
    <label>
    Occupation:
    <select value={formData.occupation} onChange={event => setFormData({ ...formData, occupation: event.target.value })}>
    {occupations.map(occ => (
    <option key={occ} value={occ}>
     {occ}
    </option>
    ))}
    </select>
    {errors.occupation && <div>{errors.occupation}</div>}
    </label>
    <br />
    <label>
      State:
     <select value={formData.state} onChange={event => setFormData({ ...formData, state: event.target.value })}>
     {states.map(st => (
    <option key={st.abbreviation} value={st.name}>
    {st.name}
    </option> ))}
    </select>
     {errors.state && <div>{errors.state}</div>}
    </label>
    <br />
     <button type="submit">Submit</button>
    </form>
   );
}

export default Form;
    
