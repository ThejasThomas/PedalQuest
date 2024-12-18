import { useState } from "react"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "../../components/UI/index.js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/UI/tabs.jsx"
import relatedproductImg1 from '../../assets/images/Logo.png'

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = [
    "/assets/images/1.jacket.png?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400"
  ]

  const relatedProducts = [
    {
      name: "Sports Helmet Model Racing",
      price: "₹2,770.00",
      image: "/assets/images/1.jacket.png?height=100&width=100"
    },
    {
      name: "Axor Hunter Solid Helmet",
      price: "₹3,770.00",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "LS2 MUKT7 Full Eco Rear",
      price: "₹4,770.00",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      name: "Basic Race motorcycle jacket",
      price: "₹5,770.00",
      image: "/placeholder.svg?height=100&width=100"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img 
            src={relatedproductImg1}
            alt="Logo" 
            width={120} 
            height={40}
          />
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium">Home</a>
            <a href="#" className="text-sm font-medium">Shop</a>
            <a href="#" className="text-sm font-medium">About Us</a>
            <a href="#" className="text-sm font-medium">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative border rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt="Product image"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative border rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Axor Hunter Solid Helmet</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(126 reviews)</span>
            </div>
            <p className="text-2xl font-bold">₹3,770.00</p>

            {/* Color Selection */}
            <div className="space-y-2">
              <h3 className="font-medium">Color</h3>
              <div className="flex gap-2">
                {["black", "white", "gray"].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border bg-${color}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <h3 className="font-medium">QTY</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">DETAILS</TabsTrigger>
              <TabsTrigger value="reviews">REVIEWS</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div className="prose max-w-none">
                <h3>Axor Hunter Solid Helmet / Motocross Helmet Features:</h3>
                <p>
                  If you are a Motocross, a Moto Country or an Endure racer and you do thrill riding you need serious
                  equipment etc. the FAST EVO MX637 delivers! The Fast Evo MX637 was developed for professional off
                  road use in collaboration with our ESE riders from the Cross, Enduro and Supermotard Championship
                  Series.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p>Customer reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Button variant="outline">SHOW MORE</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square relative mb-2 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover group-hover:scale-105 transition-transform"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted mt-24">
        <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Store Tracking</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Blog</li>
              <li>Careers</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Getting Started</li>
              <li>Resources</li>
            </ul>
          </div>
          <div>
            <img 
              src="/placeholder.svg?height=40&width=120" 
              alt="Logo" 
              width={120} 
              height={40}
              className="mb-4"
            />
            <p className="text-sm text-muted-foreground">
              ©2023 all Right Reserved. Terms of Use. Website.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
