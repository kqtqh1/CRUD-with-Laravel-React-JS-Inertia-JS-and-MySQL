import { useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, errors } = useForm({
    email: '',
    password: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/login');
  }

  return (
    <div className="border-2 p-6 shadow-md bg-gray-100 rounded-2xl max-w-md mx-auto mt-20">
      <form onSubmit={submit} className="flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <input type="email" placeholder="Email" value={data.email} onChange={e => setData('email', e.target.value)}  className="w-full border-2 px-4 py-2 rounded-md" />
        <input type="password" placeholder="Password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full border-2 px-4 py-2 rounded-md"/>
        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        <button type="submit"  className=" px-6 py-2 bg-indigo-200 rounded-lg ">
          Login
        </button>
      </form>
    </div>

  );
}