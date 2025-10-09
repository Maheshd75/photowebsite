import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { products } from '../data/products';
import ProductForm from './ProductForm';
import api from '../api/axios';




export function ProductsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [images,setImages] = useState([])
  const [products,setProducts] = useState()
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    category: 'frame',
    productType: 'wooden',
    material: '',
    description: '',
    sizes: ['8x10'],
    colors: ['Natural'],
    isOnSale: false,
    originalPrice: undefined
  });

  const categories = ['all', 'frame', 'cup'];

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getProductsData = async() => {
    try {
        const {data} =await api.get('/api/products/get')
        setProducts(data.products)
    } catch (error) {
        console.log(error.message)
    }
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const formData =new FormData()
        formData.append('name',productData.name)
        formData.append('category',productData.category)
        formData.append('material',productData.material)
        formData.append('productType',productData.productType)
        formData.append('sizes',productData.sizes)
        formData.append('price',productData.price)
        images.map((image)=>{
        formData.append('images',image)
      })
       const {data} = await api.post('/api/products/add',formData)
       if(data.success){
        getProductsData()
       }
    } catch (error) {
        console.log(error.message)

        
    }
    resetForm();
    setImages([])
  };

  const resetForm = () => {
    setProductData({
      name: '',
      price: 0,
      category: 'frame',
      productType: 'wooden',
      material: '',
      description: '',
      sizes: ['8x10'],
      colors: ['Natural'],
      isOnSale: false,
      originalPrice: undefined
    });
    
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductData(product);
    setIsEditDialogOpen(true);
  };

  const handleSizeChange = (size, checked) => {
    setProductData(prev => ({
      ...prev,
      sizes: checked 
        ? [...(prev.sizes || []), size]
        : (prev.sizes || []).filter(s => s !== size)
    }));
  };

  const handleColorChange = (color, checked) => {
    setProductData(prev => ({
      ...prev,
      colors: checked 
        ? [...(prev.colors || []), color]
        : (prev.colors || []).filter(c => c !== color)
    }));
  };

  const DeleteProduct = async(id) => {
     try {
        const {data} =await api.post('/api/products/delete',{id})
        if(data.success){
            getProductsData()
        }
     } catch (error) {
        console.log(error.message)
        
     }

  }

  useEffect(()=>{
    getProductsData()
  },[])



  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={()=>resetForm()} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new product for your store
                  </DialogDescription>
                </DialogHeader>
                <ProductForm 
                  productData={productData}
                  setProductData={setProductData}
                  handleSubmit={handleSubmit}
                  editingProduct={editingProduct}
                  handleSizeChange={handleSizeChange}
                  handleColorChange={handleColorChange}
                  setIsAddDialogOpen={setIsAddDialogOpen}
                  setIsEditDialogOpen={setIsEditDialogOpen}
                  resetForm={resetForm}
                  images={images}
                  setImages={setImages}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={product.image_urls}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.material}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">${product.price}</span>
                        {product.isOnSale && product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.isOnSale ? (
                        <Badge className="bg-red-100 text-red-800">On Sale</Badge>
                      ) : (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => DeleteProduct(product._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts?.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            productData={productData}
            setProductData={setProductData}
            handleSubmit={handleSubmit}
            editingProduct={editingProduct}
            handleSizeChange={handleSizeChange}
            handleColorChange={handleColorChange}
            setIsAddDialogOpen={setIsAddDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            resetForm={resetForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}