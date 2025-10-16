import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // The onAuthStateChanged listener will handle setting user state
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your credentials to access the CMS.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            {...register('email')}
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="flex items-center gap-1">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="flex-grow"
                                {...register('password')}
                                aria-invalid={errors.password ? 'true' : 'false'}
                                onBlur={() => setShowPassword(false)}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                        </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}