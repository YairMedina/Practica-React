import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ShowVehicles = () => {
  const url = 'http://127.0.0.1:8000/api/vehicles'
  const [vehicles, setVehicles] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [updatedData, setUpdatedData] = useState({})
  const [newData, setNewData] = useState({
    name: '',
    plate: '',
    phone: '',
    model: ''
  })
  const token = 'Bearer 4|8sradc2s5CbwkGP6553L29dTb057Yx16fXUGVyh7'
  const navigate = useNavigate()

  useEffect(() => {
    getVehicles()
  }, [])

  const getVehicles = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.get(url, config)
      setVehicles(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = vehicle => {
    setEditingVehicle(vehicle)
    setUpdatedData(vehicle)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setUpdatedData({ ...updatedData, [name]: value })
  }

  const handleSaveChanges = async () => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }
      await axios.put(`${url}/${editingVehicle.id}`, updatedData, config)
      setEditingVehicle(null)
      getVehicles()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async id => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }
      await axios.delete(`${url}/${id}`, config)
      getVehicles()
    } catch (error) {
      console.error('Error deleting vehicle:', error)
    }
  }

  const handleAddChange = e => {
    const { name, value } = e.target
    setNewData({ ...newData, [name]: value })
  }

  const handleAddNew = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
      await axios.post(url, newData, config)
      setNewData({ name: '', plate: '', phone: '', model: '' })
      getVehicles()
    } catch (error) {
      console.error('Error adding new vehicle:', error)
    }
  }

  return (
    <div
      className='App'
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        paddingBottom: '50px'
      }}
    >
      <section
        className='header-container'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2 className='main-title'>Premium Car Rental</h2>
        <div>
          <button className='btn btn-warning' onClick={() => navigate('/')}>
            <i className='fa-solid fa-house'></i>
          </button>
          &nbsp;
          <button
            className='btn btn-danger'
            onClick={() => navigate('/client')}
          >
            <i className='fa-solid fa-user'></i> CLIENTS
          </button>
          &nbsp;
          <button
            className='btn btn-success'
            onClick={() => navigate('/model')}
          >
            <i className='fa-solid fa-truck-pickup'></i> MODELS
          </button>
          &nbsp;
        </div>
      </section>

      <div className='container'>
        <h1 className='text-center my-4 text-uppercase fw-bold text-dark'>
          VEHICLES
        </h1>

        <div className='text-center mb-4'>
          <img
            src='/images/carros-de-lujo-mustang-gt.jpg'
            alt='Vehicles'
            className='img-fluid mb-3'
            style={{ maxWidth: '500px', borderRadius: '8px' }}
          />
          <p className='text-muted'>
            Our vehicle rental service allows you to rent cars for your
            transportation needs, whether for a trip, a special occasion, or
            everyday use. We offer a variety of vehicles, from compact cars to
            SUVs and luxury vehicles.
          </p>
        </div>

        {/* Rest of your content */}
        <div className='row mt-4'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover text-center'>
                <thead className='table-dark'>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Plate</th>
                    <th>Phone</th>
                    <th>Model</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, i) => (
                    <tr key={vehicle.id}>
                      <td>{i + 1}</td>
                      <td>{vehicle.name}</td>
                      <td>{vehicle.plate}</td>
                      <td>{vehicle.phone}</td>
                      <td>{vehicle.model}</td>
                      <td>
                        <button
                          className='btn btn-warning btn-sm mx-1'
                          onClick={() => handleEditClick(vehicle)}
                          data-bs-toggle='modal'
                          data-bs-target='#editModal'
                        >
                          <i className='fa-solid fa-edit'></i> Edit
                        </button>
                        <button
                          className='btn btn-danger btn-sm mx-1'
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <i className='fa-solid fa-trash'></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {vehicles.length === 0 && (
                    <tr>
                      <td colSpan='6'>No vehicles available</td>
                    </tr>
                  )}
                  {/* Row to add new vehicle */}
                  <tr>
                    <td colSpan='6'>
                      <button
                        className='btn btn-success'
                        data-bs-toggle='modal'
                        data-bs-target='#addModal'
                      >
                        <i className='fa-solid fa-plus'></i> Add New Vehicle
                      </button>
                      &nbsp;
                      <button
                        className='btn btn-info'
                        onClick={() => window.location.reload()}
                      >
                        <i className='fa-solid fa-rotate'></i> Refresh
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <div
          className='modal fade'
          id='editModal'
          tabIndex='-1'
          aria-labelledby='editModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='editModalLabel'>
                  Edit Vehicle
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                {editingVehicle && (
                  <form>
                    <div className='mb-3'>
                      <label htmlFor='name' className='form-label'>
                        Name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={updatedData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='plate' className='form-label'>
                        Plate
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='plate'
                        name='plate'
                        value={updatedData.plate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='phone' className='form-label'>
                        Phone
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='phone'
                        name='phone'
                        value={updatedData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='model' className='form-label'>
                        Model
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='model'
                        name='model'
                        value={updatedData.model}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                )}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={handleSaveChanges}
                  data-bs-dismiss='modal'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Modal */}
        <div
          className='modal fade'
          id='addModal'
          tabIndex='-1'
          aria-labelledby='addModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='addModalLabel'>
                  Add New Vehicle
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form>
                  <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                      Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      name='name'
                      value={newData.name}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='plate' className='form-label'>
                      Plate
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='plate'
                      name='plate'
                      value={newData.plate}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='phone' className='form-label'>
                      Phone
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='phone'
                      name='phone'
                      value={newData.phone}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='model' className='form-label'>
                      Model
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='model'
                      name='model'
                      value={newData.model}
                      onChange={handleAddChange}
                    />
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={handleAddNew}
                  data-bs-dismiss='modal'
                >
                  Add Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowVehicles
