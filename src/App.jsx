
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PizzaGrid from './components/PizzaGrid' //Este es mi pagna HOME
import RegisterModal from './components/RegisterModal'
import LoginModal from './components/LoginModal'
import PizzaDetailModal from './components/PizzaDetailModal'
import CartModal from './components/CartModal' //CARRITO DE COMPRA


export default function App() {
 
  const [cartItems, setCartItems] = useState([])

  //pizza seleccionada para Visualizacion
  const [selectedPizza, setSelectedPizza] = useState(null)
  const handleViewDetail = (pizza) => setSelectedPizza(pizza)

  //Detalle del Carrito de Compra
  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )

  const handleAddToCart = (pizza) => {
    setCartItems((prev) => {
      const existe = prev.find((item) => item.id === pizza.id)
      if (existe) {
        return prev.map((item) =>
          item.id === pizza.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...pizza, cantidad: 1 }]
    })
  }

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    )
  }

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  // Reinicia el Home
  const handleReset = () => {
    setCartItems([])
    setSelectedPizza(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  //Detalle de Productos
  const [PIZZAS , setPizzas] = useState([
      {
        desc: "La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda. El término pizza napoletana, por su importancia histórica o regional, se emplea en algunas zonas como sinónimo de pizza tonda.",
        id: "P001",
        img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_cl.jpg?alt=media&token=6a9a33da-5c00-49d4-9080-784dcc87ec2c",
        ingredientes: ["mozzarella", "tomates", "jamón", "orégano"],
        nombre: "napolitana",
        precio: 5950,
      },
      {
        desc: "La pizza es una preparación culinaria que consiste en un pan plano, habitualmente de forma circular, elaborado con harina de trigo, levadura, agua y sal (a veces aceite de oliva) que comúnmente se cubre con salsa de tomate, queso y otros muchos ingredientes, y que se hornea a alta temperatura, tradicionalmente en un horno de leña.",
        id: "P002",
        img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fcheese-164872_640_com.jpg?alt=media&token=18b2b821-4d0d-43f2-a1c6-8c57bc388fab",
        ingredientes: ["mozzarella", "tomates", "jamón", "choricillo"],
        nombre: "española",
        precio: 7250,
      },
      {
        desc: "La pizza es una preparación culinaria que consiste en un pan plano, habitualmente de forma circular, elaborado con harina de trigo, levadura, agua y sal (a veces aceite de oliva) que comúnmente se cubre con salsa de tomate, queso y otros muchos ingredientes, y que se hornea a alta temperatura, tradicionalmente en un horno de leña.",
        id: "P003",
        img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-1239077_640_com.jpg?alt=media&token=e7cde87a-08d5-4040-ac54-90f6c31eb3e3",
        ingredientes: ["mozzarella", "tomates", "salame", "orégano"],
        nombre: "salame",
        precio: 5990,
      },
      {
        desc: "La pizza es una preparación culinaria que consiste en un pan plano, habitualmente de forma circular, elaborado con harina de trigo, levadura, agua y sal (a veces aceite de oliva) que comúnmente se cubre con salsa de tomate, queso y otros muchos ingredientes, y que se hornea a alta temperatura, tradicionalmente en un horno de leña.",
        id: "P004",
        img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-2000595_640_c.jpg?alt=media&token=61325b6e-a1e0-441e-b3b5-7335ba13e8be",
        ingredientes: ["mozzarella", "salame", "aceitunas", "champiñones"],
        nombre: "cuatro estaciones",
        precio: 9590,
      },
      {
        desc: "La pizza es una preparación culinaria que consiste en un pan plano, habitualmente de forma circular, elaborado con harina de trigo, levadura, agua y sal (a veces aceite de oliva) que comúnmente se cubre con salsa de tomate, queso y otros muchos ingredientes, y que se hornea a alta temperatura, tradicionalmente en un horno de leña.",
        id: "P005",
        img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-salame.jpg?alt=media&token=ab3d4bf8-01f2-4810-982b-bd7fb6b517b2",
        ingredientes: ["mozzarella", "tomates cherry", "bacon", "orégano"],
        nombre: "bacon",
        precio: 6450,
      },
      {
        desc: "La pizza es una preparación culinaria que consiste en un pan plano, habitualmente de forma circular, elaborado con harina de trigo, levadura, agua y sal (a veces aceite de oliva) que comúnmente se cubre con salsa de tomate, queso y otros muchos ingredientes, y que se hornea a alta temperatura, tradicionalmente en un horno de leña.",
        id: "P006",
        img: "https://firebasestorage.googleapis.com/v0/b/apis-varias-mias.appspot.com/o/pizzeria%2Fpizza-2000595_640_c.jpg?alt=media&token=61325b6e-a1e0-441e-b3b5-7335ba13e8be",
        ingredientes: ["mozzarella", "pimientos", "pollo grillé", "orégano"],
        nombre: "pollo picante",
        precio: 8500,
      },
    ])

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopNavbar total={total} onReset={handleReset} />

      <Hero titulo="¡Pizzeria Mamma Mia!" />

      <main className="flex-fill">
        <PizzaGrid pizzas={PIZZAS} onAdd={handleAddToCart} onViewDetail={handleViewDetail} />
      </main>

      <Footer />
       <LoginModal />
       <RegisterModal />
       <PizzaDetailModal  pizza={selectedPizza} onAdd={handleAddToCart}  onClose={() => setSelectedPizza(null)}  />
       <CartModal  items={cartItems} total={total} onIncrease={handleIncrease} onDecrease={handleDecrease} />
    </div>
  )
} 