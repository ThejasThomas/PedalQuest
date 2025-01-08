import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "../../../components/UI/index.js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/UI/tabs.jsx"
import axios from "axios"
import { axiosInstance } from "../../../api/axiosInstance.js"

export default function ProductDetail() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sideImages, setSideImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/admin/productDetails/${id}`)
        
        if (response.data.success) {
          setProduct(response.data.product)
         
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }
  const thumbnailImages = product.images.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium">Home</a>
            <a href="/shop" className="text-sm font-medium">Shop</a>
            <a href="/about" className="text-sm font-medium">About Us</a>
            <a href="/contact" className="text-sm font-medium">Contact Us</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-6">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col gap-4">
              {thumbnailImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    w-20 aspect-square relative border rounded-lg overflow-hidden
                    transition-all duration-200 hover:ring-2 hover:ring-primary/50
                    ${selectedImage === index ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Main Product Image - Right Side */}
            <div className="flex-1">
              <div className="aspect-square relative border rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold">₹{product.basePrice.toFixed(2)}</p>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <h3 className="font-medium">Quantity</h3>
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

            {/* Action Buttons */}
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

            {/* Product Description */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
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
                <h3>{product.name} Features:</h3>
                <p>{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p>No reviews yet.</p>
            </TabsContent>
          </Tabs>
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
            <p className="text-sm text-muted-foreground">
              ©2024 all Right Reserved. Terms of Use. Website.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}