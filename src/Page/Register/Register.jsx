
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../AuthProvider/AuthProvider';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTE
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const axiosPublic =useAxiosPublic()
    const {register,handleUpdateProfile}=useContext(AuthContext)
    const navigate =useNavigate()
    const handleRegister = async (e) => {

        e.preventDefault();
    
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;
        const imagee = form.image;
        const numericCharacterPattern = /[0-9]/;
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one capital letter');
            return
        }
        else if (!/[^a-zA-Z0-9]/.test(password)){
            toast.error('Password must contain at least one Special letter');
            return
        
        } else if (!numericCharacterPattern.test(password)) {
          toast.error('Password must contain at least one numeric character');
          return;
        }
        if(imagee.files.length>0){
            const imageFile = imagee.files[0]
            const formData =new FormData()
            formData.append("image", imageFile)
           
            const response = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            })
            if(response.ok){
                const imageData = await response.json();
                const imageUrl = imageData.data.url;
              
                const image =   imageUrl 
                register(email,password)
                .then(res =>{
                  
                handleUpdateProfile(name,image)
                .then(()=>{
                    const userInfo ={
                        name,
                        email,
                        password,
                        image,
                        role:'user'
                        
                    }
                    console.log(userInfo)
                    axiosPublic.post('/users',userInfo)
                    .then(res=>{
                     if(res.data.insertedId){
                       
                        toast.success('User Create Successfully')
                   
                         navigate('/');
                     }
                    })
                    
                  
                   
                })
            })
            .catch(error =>{
                console.log(error.message)
                toast.error(error.message)}
            )
            }
           

                
         
        }
    
       
    }


    return (
        <div className=" flex  justify-center mt-36">

            <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                <h4 className="block font-sans text-4xl font-bold leading-snug tracking-normal text-white antialiased">
                    Sign Up
                </h4>
                <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-white antialiased">
                    Enter your details to register.
                </p>
                <form onSubmit={handleRegister} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="relative h-11 form-control w-full mb-4 min-w-[200px]">
                        <input
                            name="name"
                            required
                            className="peer   h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                        />
                        <label className="before:content[' '] text-white after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Name
                        </label>
                    </div>
                    
                    <div className="relative h-11 form-control w-full mb-4 min-w-[200px]">
                    <input required name="image" type="file" className="file-input text-white file-input-bordered file-input-md w-full " />
                    </div>
                    
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative form-control h-11 w-full min-w-[200px]">
                            <input
                                name="email"
                                required
                                className="peer h-full text-white w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=""
                            />
                            <label className="before:content[' '] text-white after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Email
                            </label>
                        </div>
                        <div className="relative form-control  h-11 w-full min-w-[200px]">
                            <input
                            required
                                name="password"
                                type="password"
                                className="peer text-white h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                            />
                            <label className="before:content[' '] text-white after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Password
                            </label>
                        </div>
                    </div>
                   
                    <button
                        className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type='submit'
                        data-ripple-light="true"
                    >
                        Register
                    </button>
                    <SocialLogin></SocialLogin>
                    <p className="mt-4 text-white block text-center font-sans text-base font-normal leading-relaxed antialiased">
                        Already have an account? 
                        <Link to='/login'
                            className="font-medium text-pink-500 transition-colors hover:text-blue-700"
                            
                        >
                           Sign Up
                        </Link>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default Register;