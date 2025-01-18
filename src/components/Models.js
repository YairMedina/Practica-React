import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShowProducts = () => {
  const url = 'http://127.0.0.1:8000/api/models';
  const [products, setProducts] = useState([]);
  const token = 'Bearer 4|8sradc2s5CbwkGP6553L29dTb057Yx16fXUGVyh7';
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(url, config);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='App'
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        paddingBottom: '50px',
      }}
    >
      <section
        className="header-container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h2 className="main-title">Premium Car Rental</h2>
        <div>
          <button className="btn btn-warning" onClick={() => navigate('/')}>
            <i className="fa-solid fa-house"></i>
          </button>&nbsp;
          <button className="btn btn-danger" onClick={() => navigate('/client')}>
            <i className="fa-solid fa-user"></i> CLIENTS
          </button>&nbsp;
          <button className="btn btn-primary" onClick={() => navigate('/vehicle')}>
            <i className="fa-solid fa-car"></i> VEHICLES
          </button>&nbsp;
        </div>
      </section>

      <div className="container">
        <h1 className="text-center my-4 text-uppercase fw-bold text-dark">
          MODELS
        </h1>

        <div className="text-center mb-4">
          <img
            src="images/NAZ_b384701a55fb4e0f83ad86d5ae0978c0.jpg"
            alt="Models"
            className="img-fluid mb-3"
            style={{ maxWidth: "600px", borderRadius: "8px" }}
          />
          <p className="text-muted">
            A Vehicle Models Module is a specific section within a vehicle rental management system that handles all the information related to the different vehicle models available for rental. This module facilitates the organization, visualization, and management of the vehicles offered on the platform.
          </p>
        </div>
        {/* Rest of your content */}
        <div className="row mt-4">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className='table table-bordered table-hover text-center'>
                <thead className='table-dark'>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.color}</td>
                      <td>{product.year}</td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan='5'>No products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;

