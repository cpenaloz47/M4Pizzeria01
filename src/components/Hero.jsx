import React from 'react'
import fondoPizza from '../img/Header.jpg' 

export default function Hero({ titulo = 'Pizzería Don Cristian' }) {
  return (
    <section
      className="full-bleed hero"
      style={{
        backgroundImage: `url(${fondoPizza})`,  
      }}
    >
      <div className="hero-content container">
        <h1 className="hero-title">{titulo}</h1>
        <p className="lead mt-2">!Tenemos las mejores pizzas que podras encontrar! 🍕</p>
      </div>
    </section>
  )
}
