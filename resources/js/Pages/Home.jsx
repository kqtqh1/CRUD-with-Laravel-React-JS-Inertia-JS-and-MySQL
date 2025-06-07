import { useState } from 'react';
import axios from 'axios';
import { router, useForm } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import Welcome from './Auth/Welcome';

function Home({ posts, auth}) {
    if (!auth?.user) {
        return<Welcome />;;
    }
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const { data, setData, post, errors, processing } = useForm({
        search: "",
        title: "",
        content: "",
    });

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    function editPost(id){
        //e.preventDefault();
        router.get(`/posts/${id}/edit`);
    }
    function deletePost(id){
        if (!confirm('Delete this post?')) return;
        router.delete(`/posts/${id}`, {
            preserveScroll: true,    
            onSuccess: () => {
                setSearchResults(prev => prev.filter(p => p.id !== id));
            },
            onError: () => alert('Something went wrong – try again.'),
        });
    }

    function create(e) {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => {
                window.location.reload();
            }
        });
    }

    function submit(e) {
        e.preventDefault();
        axios.post('/search', {
            search: data.search
        })
        .then(response => {
            setSearchResults(response.data);
            setShowResults(true);
        })
        .catch(error => {
            console.error('Search error:', error);
        });
    }
   // console.log(deletePost);
    return (
        <>
            <div className="bg-gray-200">
                <div className="flex justify-between  ">
                    <h3 className="text-2xl font-extrabold m-10 drop-shadow-lg">
                    Welcome to EchoPost, {auth.user?.name}!
                    </h3>
                    <button onClick={handleLogout} className="py-2 px-4 m-10 text-gray-200 bg-gray-700 rounded-lg">Logout</button>
                </div>
                <div className=' p-4 m-10 bg-gray-400 rounded-2xl shadow-2xl'>
                    <h5>Create New Post</h5>
                    <form onSubmit={create} className="flex flex-col">
                        <input className='border-2 rounded m-2 px-4 py-2' id="title" value={data.title} placeholder='Title' onChange={e => setData('title', e.target.value)}
                        />
                        {errors.title && <div>{errors.title}</div>}
                        <textarea  class="flex h-32 mx-2 px-4 py-2 border-2 rounded  overflow-auto"
                            id="content" rows="10" value={data.content} placeholder='Content'  onChange={e => setData('content', e.target.value)}
                        />
                        {errors.content && <div>{errors.content}</div>}
                        <button className="w-32 p-2 bg-gray-200 mt-4 rounded-lg mx-auto block" type="submit" disabled={processing}>
                        Create Post </button>
                    </form>
                </div>
                    <div className=" justify-items-center">
                        <form onSubmit={submit}>
                            <input
                                className='border-2 m-2 px-4 py-1 rounded'
                                id="search"
                                type="text"
                                placeholder="search post"
                                value={data.search}
                                onChange={e => setData('search', e.target.value)}
                            />
                            {errors.search && <div className="text-red-500">{errors.search}</div>}
                            <button  type="submit"
                                disabled={processing} className="py-2 px-4 ml-2 shadow-lg text-gray-200 bg-gray-500 rounded-lg">
                                Search
                            </button>
                        </form>
                    </div>

                    {showResults && (
                    <div class=" m-14 p-4 bg-gray-300 relative overflow-x-auto shadow-md sm:rounded-lg">
                            <h2 className="font-bold mb-4">Search Results</h2>
                            {searchResults.length > 0 ? (
                                <div class="relative overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead class="text-xs text-white uppercase bg-gray-500 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">Name</th>
                                            <th scope="col" class="px-6 py-3">Title</th>
                                            <th scope="col" class="px-6 py-3">Content</th>
                                            <th scope="col" class="px-6 py-3"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchResults.map((post, index) => (
                                            <tr key={index} className="text-black bg-gray-200  border-gray-200 hover:bg-gray-400">
                                                <td class="px-6 py-4">{post.name}</td>
                                                <td class="px-6 py-4">{post.title}</td>
                                                <td class="px-6 py-4">{post.content}</td>
                                                 <td class="px-2 py-4" >
                                                   
                                                    <div >
                                                    <button className="p-2 ml-2 bg-indigo-300 rounded-lg" type="button" onClick={() => editPost(post.id)} >Edit</button>
                                                    <button className="p-2 ml-2 bg-red-300 rounded-lg" type="button" onClick={() => deletePost(post.id)}>Delete</button>
                                               </div>
                                                 
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>

                            ) : (
                                <p>No results found for "{data.search}"</p>
                            )}
                        </div>
                    )}
                    <h2 className="text-xl font-bold m-10 text-gray-200">All Posts</h2>
                    <div className="mx-16 grid grid-cols-2 gap-x-16 gap-y-6">
                        {posts.map((post) => (
                            <div key={[post.id]} className=" p-4 mb-4 rounded bg-gray-400 shadow-lg ">
                                <div className="text-sm text-slate-900">
                                  <span className="text-lg font-bold m-2">{post.user?.name}</span>

                                    <span>Posted on: </span>
                                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="font-bold m-2 ">{post.title}</p>
                                <p className=" m-2 ">{post.content}</p>
                                <button className="p-2 ml-2 bg-gray-300 rounded-lg" type="button" onClick={() => editPost(post.id)} >Edit</button>
                                <button className="p-2 ml-2 bg-red-300 rounded-lg" type="button" onClick={() => deletePost(post.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
            </div>

        </>
    );
}
Home.layout = page => <Layout>{page}</Layout>;

export default Home;
