import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ShowProducts = () => {
  const url = 'http://127.0.0.1:8000/api/clients'
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [updatedData, setUpdatedData] = useState({})
  const [newData, setNewData] = useState({
    name: '',
    phone: '',
    gender: '',
    rfc: ''
  })
  const token = 'Bearer 4|8sradc2s5CbwkGP6553L29dTb057Yx16fXUGVyh7'
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.get(url, config)
      setProducts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = product => {
    setEditingProduct(product)
    setUpdatedData(product) // Initialize the form with current product data
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
      await axios.put(`${url}/${editingProduct.id}`, updatedData, config)
      setEditingProduct(null) // Close modal
      getProducts() // Refresh the data
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
      getProducts() // Refresh the data after deleting
    } catch (error) {
      console.error('Error deleting the client:', error)
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
      setNewData({ name: '', phone: '', gender: '', rfc: '' }) // Reset form
      getProducts() // Refresh the data
    } catch (error) {
      console.error('Error adding a new client:', error)
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
            className='btn btn-success'
            onClick={() => navigate('/model')}
          >
            <i className='fa-solid fa-truck-pickup'></i> MODELS
          </button>
          &nbsp;
          <button
            className='btn btn-primary'
            onClick={() => navigate('/vehicle')}
          >
            {' '}
            <i className='fa-solid fa-car'></i> VEHICLES
          </button>
          &nbsp;
        </div>
      </section>

      <div className='container'>
        <h1 className='text-center my-4 text-uppercase fw-bold text-dark'>
          CLIENTS
        </h1>

        <div className='text-center mb-4'>
          <img
            src='images/219983.png'
            alt='Clients'
            className='img-fluid mb-3'
            style={{ maxWidth: '300px', borderRadius: '8px' }}
          />
          <p className='text-muted'>
            A Customer Module in a vehicle rental platform is a specialized
            section of the system that manages all information and interactions
            related to customers using the vehicle rental service. This module
            is crucial for providing good customer service, organizing
            reservation management, and maintaining a detailed record of
            transactions.
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
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Rfc</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.phone}</td>
                      <td>{product.gender}</td>
                      <td>{product.rfc}</td>
                      <td>
                        <button
                          className='btn btn-warning btn-sm mx-1'
                          onClick={() => handleEditClick(product)}
                          data-bs-toggle='modal'
                          data-bs-target='#editModal'
                        >
                          <i className='fa-solid fa-edit'></i> Edit
                        </button>
                        <button
                          className='btn btn-danger btn-sm mx-1'
                          onClick={() => handleDelete(product.id)}
                        >
                          <i className='fa-solid fa-trash'></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan='6'>No products available</td>
                    </tr>
                  )}
                  {/* Row for Add Client Button */}
                  <tr>
                    <td colSpan='6'>
                      <button
                        className='btn btn-success'
                        data-bs-toggle='modal'
                        data-bs-target='#addModal'
                      >
                        <i className='fa-solid fa-plus'></i> Add New Client
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
                  Edit Client
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                {editingProduct && (
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
                      <label htmlFor='gender' className='form-label'>
                        Gender
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='gender'
                        name='gender'
                        value={updatedData.gender}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='rfc' className='form-label'>
                        RFC
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='rfc'
                        name='rfc'
                        value={updatedData.rfc}
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
                  Add New Client
                </h5>
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
                    <label htmlFor='gender' className='form-label'>
                      Gender
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='gender'
                      name='gender'
                      value={newData.gender}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='rfc' className='form-label'>
                      RFC
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='rfc'
                      name='rfc'
                      value={newData.rfc}
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
                  Add Client
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProducts
