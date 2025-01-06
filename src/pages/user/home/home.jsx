import React from 'react';
import Header from '../../../components/user/Header';
import Footer from '../../../components/user/Footer';
import product1 from '../../../assets/images/img1.png';
import product2 from '../../../assets/images/img2.png';
import product3 from '../../../assets/images/img3.png';
import product4 from '../../../assets/images/1.boot.png';
import product5 from '../../../assets/images/1.jacket.png';
import product6 from '../../../assets/images/1.glove.png';
import product7 from '../../../assets/images/1.bag.png';
import logo1 from '../../../assets/images/INOXTO.png';
import logo2 from '../../../assets/images/CAIRBULL.png';
import logo3 from '../../../assets/images/ROCKBROS.png';
import logo4 from '../../../assets/images/WINDBREAKER.jpg';

const HomePage = () => {
  
  const products = [
    {
      id: 1,
      name: "LZS SMART Fast Flex Pro Helmet",
      price: "₹1299.00",
      image: product1
    },
    {
      id: 2,
      name: "Aero Master Safety Helmet",
      price: "₹999.00",
      image: product2
    },
    {
      id: 3,
      name: "Scale Racer Motorcycle Jacket",
      price: "₹2799.00",
      image: product3
    },
    {
      id: 4,
      name: "Scale Racer motorcycle Jacket",
      price: "₹2799.00",
      image: product4
    },
    {
      id: 5,
      name: "Xtreme Rider's High Boots",
      price: "₹1599.00",
      image: product5
    },
    {
      id: 6,
      name: "Scale Racer motorcycle Jacket",
      price: "₹2799.00",
      image: product6
    },
    {
      id: 7,
      name: "Scale Racer motorcycle Jacket",
      price: "₹2799.00",
      image: product7
    }
  ];

  return (
    <>
      <Header />
      <div className="font-sans text-gray-800 leading-relaxed">
        <main className="p-8">
          <section className="text-center mb-12">
            <h2 className="text-2xl mb-4">FEATURED PRODUCTS</h2>
            <p className="mb-8">
              Check out these newly arrived products and amazing high quality gear at the best average rates!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
              {products.map(product => (
                <div key={product.id} className="border border-gray-300 p-4 text-center">
                  <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
                  <h3 className="text-lg mb-2">{product.name}</h3>
                  <p className="font-bold mb-4">{product.price}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Buy</button>
                </div>
              ))}
            </div>
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
              Discover more →
            </button>
          </section>

          <section className="flex justify-around items-center flex-wrap">
            <img src={logo1} alt="Brand logo" className="max-w-[100px] h-auto m-4" />
            <img src={logo2} alt="Brand logo" className="max-w-[100px] h-auto m-4" />
            <img src={logo3} alt="Brand logo" className="max-w-[100px] h-auto m-4" />
            <img src={logo4} alt="Brand logo" className="max-w-[100px] h-auto m-4" />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
