import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, errors } = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

    function submit(e) {
      e.preventDefault();
      post('/register');
    }
    function login(e) {
      e.preventDefault();
      post('/login');
    }
  

    return (
      <div className="border-2 p-6 shadow-md bg-gray-100 rounded-2xl max-w-md mx-auto mt-20">
        <form onSubmit={submit} className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-center">Register</h2>
            <input className="w-full border-2 px-4 py-2 rounded-md"type="text" placeholder="Name" value={data.name} onChange={e => setData('name', e.target.value)} />
            <input  className="w-full border-2 px-4 py-2 rounded-md" type="email" placeholder="Email" value={data.email} onChange={e => setData('email', e.target.value)} />
            <input  className="w-full border-2 px-4 py-2 rounded-md" type="password" placeholder="Password" value={data.password} onChange={e => setData('password', e.target.value)} />
            <input  className="w-full border-2 px-4 py-2 rounded-md" type="password" placeholder="Confirm Password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
            {errors.email && <div>{errors.email}</div>}
            <div className='flex  justify-center ' >
              <button className="py-2 px-6 m-2 bg-indigo-200 rounded-lg" type="submit">Register</button>
            </div>
          </form>
          <div className="flex  justify-center  mt-4" >
              <p className='mt-2'>Already have an account?</p>
              <button className="py-2 px-6 ml-4 bg-indigo-100 rounded-lg"
                onClick={() => window.location.href = "/login"}
              >
                Login
              </button>

          </div>
                
      </div>
    
    );
}