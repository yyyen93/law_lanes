
import axios from 'axios';
import {useCallback, useState} from 'react';
import Input from '../components/Input';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


const Auth =  () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [ variant, setVariant ] = useState('login');

    const toggleVariant = useCallback(()=> {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async() => {
        try{
            await signIn('credentials', {
                email,
                password,
                callbackUrl:'/profiles',
            });
        }catch(error){
            console.log(error);
        }
    }, [email,password]);

    const register = useCallback(async() => {
        try{
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login();
        }catch(error){
            console.log(error);
        }
    }, [email, name, password, login])

    return(
        // Background
        <div className="relative h-full w-full bg-[url('/img/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">  
            {/* Background overlay */}
            <div className="bg-black w-full h-full lg:bg-opacity-70">
                {/* Navigation Logo */}
                <nav className="px-12 py-5">
                    <img src="/img/law.png" alt="logo" className="h-32 mx-auto" />
                </nav>

                {/* Input containers */}
                <div>
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                { variant === 'login' ? 'Sign in' : 'Register' }
                            </h2>

                            <div className="flex flex-col gap-4">
                                {
                                    variant === 'register' && (
                                        <Input 
                                        Label="Username"
                                        onChange={( event : any ) => setName( event.target.value )}
                                        id="name"
                                        type="name"
                                        value={ name }
                                        />
                                    )
                                }

                                <Input 
                                    Label="Email"
                                    onChange={( event: any ) => setEmail( event.target.value )}
                                    id="email"
                                    type="email"
                                    value={email}
                                />

                                <Input 
                                    Label="Password"
                                    onChange={( event: any ) => setPassword( event.target.value )}
                                    id="password"
                                    type="password"
                                    value={password}
                                />
                            </div>

                            <button onClick={ variant === 'login' ? login : register } className ="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                                { variant === 'login' ? 'Login' : 'Sign up' }
                            </button>

                            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                <div 
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })} 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                                >
                                    <FcGoogle size={ 32 } />
                                </div>

                                <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                                >
                                    <FaGithub size={ 32 }/>
                                </div>
                            </div>

                            <p>
                                { variant === 'login' ? 'First time user?' : 'Already have an account?' }
                                <span 
                                onClick={ toggleVariant } 
                                className="text-white ml-1 hover:underline cursor-pointer">
                                    { variant === 'login' ? 'Create an account' : 'Login' }    
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Auth;


/** Package NPM
 * - axios
 * - react-icons
 * - next-auth
 */

/** 
 * 
 */