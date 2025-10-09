import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { SignIn } from '@clerk/clerk-react';

export function LoginModal({ isOpen, onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        const user = {
          id: '1',
          name: loginForm.email.split('@')[0],
          email: loginForm.email
        };
        onLogin(user);
        toast.success('Successfully logged in!');
        onClose();
        setLoginForm({ email: '', password: '' });
      } else {
        toast.error('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (signupForm.name && signupForm.email && signupForm.password) {
        if (signupForm.password !== signupForm.confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        const user = {
          id: '2',
          name: signupForm.name,
          email: signupForm.email
        };
        onLogin(user);
        toast.success('Account created successfully!');
        onClose();
        setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        toast.error('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGuestAccess = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com'
    };
    onLogin(guestUser);
    toast.success('Welcome, guest user!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to FrameCraft</DialogTitle>
        </DialogHeader>
        
      <SignIn/>
      </DialogContent>
    </Dialog>
  );
}