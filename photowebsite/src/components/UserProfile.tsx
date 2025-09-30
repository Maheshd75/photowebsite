import { useState } from 'react';
import { ArrowLeft, Edit, Save, X, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserProfile extends User {
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  bio?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

interface UserProfileProps {
  user: User;
  onBack: () => void;
  onUserUpdate: (user: User) => void;
}

export function UserProfile({ user, onBack, onUserUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Extended user profile with mock data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ...user,
    phone: user.id === 'guest' ? '' : '+1 (555) 123-4567',
    address: user.id === 'guest' ? '' : '123 Main Street',
    city: user.id === 'guest' ? '' : 'New York',
    country: user.id === 'guest' ? '' : 'United States',
    zipCode: user.id === 'guest' ? '' : '10001',
    bio: user.id === 'guest' ? '' : 'Photography enthusiast and home decor lover.',
    joinDate: user.id === 'guest' ? new Date().toISOString().split('T')[0] : '2023-06-15',
    totalOrders: user.id === 'guest' ? 0 : 12,
    totalSpent: user.id === 'guest' ? 0 : 847.50
  });

  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone || '',
    address: userProfile.address || '',
    city: userProfile.city || '',
    country: userProfile.country || '',
    zipCode: userProfile.zipCode || '',
    bio: userProfile.bio || ''
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedProfile = {
        ...userProfile,
        ...editForm
      };
      
      setUserProfile(updatedProfile);
      onUserUpdate({ id: user.id, name: editForm.name, email: editForm.email });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditForm({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone || '',
      address: userProfile.address || '',
      city: userProfile.city || '',
      country: userProfile.country || '',
      zipCode: userProfile.zipCode || '',
      bio: userProfile.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
            </div>
            
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{userProfile.name}</CardTitle>
                <CardDescription>{userProfile.email}</CardDescription>
                {userProfile.id === 'guest' && (
                  <Badge variant="secondary" className="mt-2">Guest Account</Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
                </div>
                
                {userProfile.id !== 'guest' && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Orders</span>
                        <span className="font-medium">{userProfile.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Spent</span>
                        <span className="font-medium">${userProfile.totalSpent.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{userProfile.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{userProfile.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{userProfile.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself"
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50 min-h-[80px]">
                      <span className="text-gray-700">{userProfile.bio || 'No bio provided'}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Manage your shipping and billing address</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editForm.address}
                      onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your street address"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-gray-50">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{userProfile.address || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={editForm.city}
                        onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">
                        <span>{userProfile.city || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    {isEditing ? (
                      <Input
                        id="zipCode"
                        value={editForm.zipCode}
                        onChange={(e) => setEditForm(prev => ({ ...prev, zipCode: e.target.value }))}
                        placeholder="ZIP Code"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">
                        <span>{userProfile.zipCode || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    {isEditing ? (
                      <Input
                        id="country"
                        value={editForm.country}
                        onChange={(e) => setEditForm(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="Country"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">
                        <span>{userProfile.country || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}