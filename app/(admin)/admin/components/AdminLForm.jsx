import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLoginWithEmailPassword } from '@/store/auth';
import { toast } from 'react-toastify';
import { goIdle } from '@/store/app';

function AdminLForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const router = useRouter();

    const {errorMessage, status} = useSelector((state) => state.auth)
    const {status: appStatus, message} = useSelector((state) => state.app);

    const isAuthenticating = useMemo( () => status === 'checking', [status])

  
  const errorMsgHandle = {
     'Firebase: Error (auth/missing-email).' : 'Email no se encuentra',
     'Firebase: Error (auth/invalid-login-credentials).' : 'Credenciales invalidas'
  }

  const onSubmit = ({email, password}) => {
    dispatch(startLoginWithEmailPassword({email, password}));
    setTimeout(() => {
      dispatch( goIdle() )
    }, 3000);
  };

  useLayoutEffect(() => {
    (status == 'authenticated') && router.push('/admin/dashboard')
    dispatch( goIdle() )
  }, [])
  

  useEffect(() => {

    if(appStatus == 'success'){
        setTimeout(() => {
            router.push('/admin/dashboard/')
        }, 5000);
        toast.success("Autenticado con exito", {
            position: toast.POSITION.TOP_CENTER
          });
        
    }   

    if(appStatus == 'error'){
      errorMessage &&
      toast.error(errorMsgHandle[errorMessage] || errorMessage, {
          position: toast.POSITION.TOP_LEFT
      });
    }
    
  }, [appStatus])

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center mt-4'>

        <input 
            type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
            className='rounded-lg bg-slate-100 p-4 w-full outline-none border-b-2 border-green-600' 
            style={{width: '125%'}}/>
        {errors.email?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese el correo</p>}

        <input 
            type="password" placeholder="Password" {...register("password", {required: true, maxLength: 24})}
            className='mt-4 rounded-lg bg-slate-100 p-4 w-full outline-none border-b-2 border-green-600' 
            style={{width: '125%'}}/>
        {errors.password?.type === 'required' && <p className='text-red-600 font-medium mt-2'>Ingrese la contraseña</p>}
        <button 
          type='submit' 
          className='mt-8 w-full p-4 bg-green-500 rounded-xl text-white font-bold text-xl disabled:bg-slate-500'
          >
            Entrar
        </button>

    </form>//disabled={ isAuthenticating }
  )
}

export default AdminLForm