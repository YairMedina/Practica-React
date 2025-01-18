import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ShowProducts = () => {
  const url = 'http://127.0.0.1:8000/api/models'
  const [products, setProducts] = useState([])
  const token = 'Bearer 4|8sradc2s5CbwkGP6553L29dTb057Yx16fXUGVyh7'
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.get(url, config)
      setProducts(response.data.data)
    } catch (error) {
      console.log(error)
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
          <button
            className='btn btn-danger'
            onClick={() => navigate('/client')}
          >
            <i class='fa-solid fa-user'></i> CLIENTS
          </button>
          &nbsp;
          <button
            className='btn btn-success'
            onClick={() => navigate('/model')}
          >
            <i class='fa-solid fa-truck-pickup'></i> MODELS
          </button>
          &nbsp;
          <button
            className='btn btn-primary'
            onClick={() => navigate('/vehicle')}
          >
            {' '}
            <i class='fa-solid fa-car'></i> VEHICLES
          </button>
          &nbsp;
        </div>
      </section>

      <div className='container2'>
        <div className='image'>
          <img src='/images/page-1_slide01.jpg' alt='Car rental' />
        </div>
        <div className='content'>
          <h1>Car Rental for the General Public</h1>
          <p>
            Need reliable and affordable mobility? We have the perfect solution
            for you! We offer a wide variety of vehicles in excellent condition
            for your needs, from short trips to long adventures. Check our rates
            and choose the ideal car.
          </p>
          <ul>
            <li>Variety of vehicles: compact cars, SUVs, and more.</li>
            <li>Competitive prices with no hidden fees.</li>
            <li>Flexible rental options: daily, weekly, or monthly.</li>
          </ul>
          <p>
            📞 Contact us: <strong>999-219-1482</strong>
          </p>
        </div>
      </div>

      <div className='wrapper'>
        <div className='text-section'>
          <h1>Car Rental for Everyone</h1>
          <p>
            Looking for reliable and affordable transportation? We have what you
            need! We offer a wide selection of cars in perfect condition, ideal
            for any occasion, whether for business trips, vacations, or just
            getting around the city. Check out our options and rent the car that
            suits you best.
          </p>
          <ul>
            <li>
              Variety of options: from small, economical cars to trucks and
              luxury cars.
            </li>
            <li>Transparent pricing: affordable rates with no surprises.</li>
            <li>
              Flexible rental terms: daily, weekly, or monthly rental, based on
              your needs.
            </li>
          </ul>
          <p>
            📞 Call us now: <strong>999-219-1482</strong>
          </p>
        </div>
        <div className='image-section'>
          <img src='\images\page-1_img01.jpg' alt='Rental car' />
        </div>
      </div>

      <div className='container2'>
        <div className='image'>
          <img src='/images/Bugatti-Chiron.jpg' alt='Bugatti Chiron' />
        </div>

        <div className='content'>
          <h1>Car Rental for All Audiences</h1>
          <p>
            Do you need a car for your next trip or to get around the city? We
            offer a wide range of vehicles for you to choose the one that best
            fits your needs! All our cars are in perfect condition, ready to
            provide you with the best driving experience.
          </p>
          <ul>
            <li>
              Wide selection of vehicles: compact cars, family cars, sports
              cars, and more.
            </li>
            <li>
              Clear and affordable pricing: no additional charges or surprises.
            </li>
            <li>
              Flexible rental: rent for as long as you need, from one day to
              several months.
            </li>
          </ul>
          <p>
            📞 Contact us today: <strong>999-219-1482</strong>
          </p>
        </div>
      </div>

      <div className='wrapper'>
        <div className='text-section'>
          <h1>Car Rental for Everyone</h1>
          <p>
            Are you looking for a car for your next trip or your daily
            activities? Look no further! We offer a car rental service with
            well-maintained vehicles at affordable prices, ideal for any
            occasion.
          </p>
          <ul>
            <li>Variety of vehicles: from compact cars to trucks and SUVs.</li>
            <li>Competitive pricing: no extra fees or hidden charges.</li>
            <li>
              Flexible rental: rental options by day, week, or month, tailored
              to your needs.
            </li>
          </ul>
          <p>
            📞 Call us now: <strong>999-219-1482</strong>
          </p>
        </div>
        <div className='image-section'>
          <img src='/images/16539089934470.jpg' alt='Rental car' />
        </div>
      </div>

      <div
        className='contact-section'
        style={{
          backgroundColor: '#343a40',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center'
        }}
      >
        <h2
          style={{ fontSize: '36px', marginBottom: '20px', color: '#f8f9fa' }}
        >
          Contact Us!
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '40px' }}>
          If you have any questions or need more information, feel free to
          contact us.
        </p>

        <div
          className='contact-info'
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          <div
            className='contact-item'
            style={{ textAlign: 'center', flex: '1' }}
          >
            <i
              className='fas fa-phone-alt'
              style={{
                fontSize: '30px',
                color: '#007bff',
                marginBottom: '10px'
              }}
            ></i>
            <h3>📞 Phone</h3>
            <p>
              <strong>999-219-1482</strong>
            </p>
          </div>

          <div
            className='contact-item'
            style={{ textAlign: 'center', flex: '1' }}
          >
            <i
              className='fas fa-envelope'
              style={{
                fontSize: '30px',
                color: '#007bff',
                marginBottom: '10px'
              }}
            ></i>
            <h3>✉️ Email</h3>
            <p>
              <strong>ymedina388@gmail.com</strong>
            </p>
          </div>

          <div
            className='contact-item'
            style={{ textAlign: 'center', flex: '1' }}
          >
            <i
              className='fas fa-map-marker-alt'
              style={{
                fontSize: '30px',
                color: '#007bff',
                marginBottom: '10px'
              }}
            ></i>
            <h3>📍 Address</h3>
            <p>
              <strong>
                6th Street # 405 for 13 and 15 Diaz Ordaz neighborhood
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowProducts
