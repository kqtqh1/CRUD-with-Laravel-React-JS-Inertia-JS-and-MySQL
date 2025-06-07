import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Edit({ post }) {
    const { data, setData, put, errors, processing } = useForm({
        title: post.title,
        content: post.content,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    const cancel = (e) => {
        e.preventDefault();
        router.get(`/`);
    };

    return (
        <> 
            <div className="border-2 p-6 m-10 shadow-md bg-gray-100 rounded-2xl  max-w-lg mx-auto">
            <h4 className="text-xl font-semibold mb-4">Edit Post</h4>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="title" className="font-medium mb-1">Title</label>
                <input id="title" type="text" value={data.title} onChange={e => setData('title', e.target.value)}
                   className={`border-2 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                        errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    aria-invalid={errors.title ? 'true' : 'false'}
                    aria-describedby={errors.title ? 'title-error' : undefined}/>
                {errors.title && ( <div id="title-error" className="text-red-600 mb-2 text-sm">{errors.title}</div>)}
                <label htmlFor="content" className="font-medium mt-4 mb-1">Content</label>
                 <textarea id="content" rows={6} value={data.content} onChange={e => setData('content', e.target.value)}
                    className={`w-full border-2 rounded px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                         errors.content ? 'border-red-500' : 'border-gray-300' }`}
                    aria-invalid={errors.content ? 'true' : 'false'} aria-describedby={errors.content ? 'content-error' : undefined}/>
                {errors.content && (<div id="content-error" className="text-red-600 mb-2 text-sm">{errors.content}</div>)}

                <div className="mt-6 flex space-x-4">
                  <button type="submit" disabled={processing} className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition">Update</button>
                    <button type="button" onClick={cancel} className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Cancel</button>
                </div>
            </form>
            </div>  
        </>
       
    );
}
