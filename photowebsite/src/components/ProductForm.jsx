import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const ProductForm = ({ 
  productData, 
  setProductData, 
  handleSubmit, 
  editingProduct, 
  handleSizeChange, 
  handleColorChange, 
  setIsAddDialogOpen, 
  setIsEditDialogOpen, 
  resetForm ,
  images,
  setImages
}) => {
     const frameTypes = ['wooden', 'metal', 'modern', 'vintage', 'minimalist'];
  const cupTypes = ['ceramic', 'glass', 'stainless steel', 'travel'];
  const sizes = ['5x7', '8x10', '11x14', '16x20', '18x24', '24x36', '12oz', '16oz', '20oz'];
  const colors = ['Natural', 'White', 'Black', 'Silver', 'Gold', 'Brown', 'Clear', 'Blue', 'Red', 'Green'];

  return (
     <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={productData.name}
            onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={productData.price}
            onChange={(e) => setProductData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={productData.category} onValueChange={(value) => setProductData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frame">Frame</SelectItem>
              <SelectItem value="cup">Cup</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={productData.productType} onValueChange={(value) => setProductData(prev => ({ ...prev, productType: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(productData.category === 'frame' ? frameTypes : cupTypes).map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="material">Material</Label>
        <Input
          id="material"
          value={productData.material}
          onChange={(e) => setProductData(prev => ({ ...prev, material: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        
        
          
          <input type="file" id='images' accept='image/*'  multiple 
          onChange={(e)=>setImages([...images,...e.target.files])} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={productData.description}
          onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Available Sizes</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={productData.sizes?.includes(size) || false}
                onChange={(e) => handleSizeChange(size, e.target.checked)}
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Available Colors</Label>
        <div className="grid grid-cols-3 gap-2">
          {colors.map(color => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={productData.colors?.includes(color) || false}
                onChange={(e) => handleColorChange(color, e.target.checked)}
              />
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isOnSale"
          checked={productData.isOnSale || false}
          onChange={(e) => setProductData(prev => ({ ...prev, isOnSale: e.target.checked }))}
        />
        <Label htmlFor="isOnSale">On Sale</Label>
      </div>

      {productData.isOnSale && (
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Original Price ($)</Label>
          <Input
            id="originalPrice"
            type="number"
            step="0.01"
            value={productData.originalPrice || ''}
            onChange={(e) => setProductData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          resetForm();
        }}>
          Cancel
        </Button>
        <Button type="submit">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
