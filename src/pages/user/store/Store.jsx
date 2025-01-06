import  Header  from '../components/header'
import  ProductGrid  from '../components/product-grid'
import  Footer  from '../components/footer'

export default function Store() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ProductGrid />
      <Footer />
    </div>
  )
}

