<?php
namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('auth')->except('index', 'search');
    }

    public function index()
    {
        $posts = Post::with('user')->latest()->get();

        return Inertia::render('Home', [
            'posts' => $posts,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
   // public function create()
   // {
   //     return inertia('Home');
 //   }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $fields['title'] = strip_tags($fields['title']);
        $fields['content'] = strip_tags($fields['content']);
        $fields['user_id'] = auth()->id();

        Post::create($fields);

        return redirect('/');
    }




    /**
     * Display the specified resource.
     */
   // public function show(Post $post)
 //   {
    //   return inertia('Show', ['post' => $post]);
   // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia("Edit", ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        if (auth()->user()->id === $post->user_id) {
            $post->update([
                'title' => $request->title,
                'content' => $request->content
            ]);
        }

        return redirect('/')->with(
            'success',
            'The post was updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
   // app/Http/Controllers/PostController.php
    public function destroy(Post $post)
    {
        if (auth()->user()->id === $post->user_id) {
            $post->delete();
        }
        return redirect('/');
    }

     public function getPost(Request $request)
    {
       $postsearch = $request->validate([
            'search' => 'required|string'
        ]);

        $search = $postsearch['search'];
        //dd($search);
        if ($search) {
            $searchpost = DB::table('posts')
            ->where('TITLE', 'LIKE', "%{$search}%")
            ->orWhere('CONTENT', 'LIKE', "%{$search}%")
            ->select('TITLE', 'CONTENT')
            ->get();
            return response($searchpost);
        }
        return response() -> json([]);
    }

    public function searchPost(Request $request){
        //$postsearch = $request->validate([
         //   'search' => 'required|string'
        //]);
        $search = $request->input('search');
        if ($search) {
            //$searchPost = DB::connection('mysql')->select("SELECT user_id, title, content FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.title LIKE '%". $search . "%' OR posts.content LIKE '%" . $search . "%'" );
           $searchPost = DB::table('posts')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->where(function($query) use ($search) {
                $query->where('posts.title', 'LIKE', "%{$search}%")
                    ->orWhere('posts.content', 'LIKE', "%{$search}%");
            })
            ->select('posts.id', 'posts.user_id','users.name', 'posts.title', 'posts.content')
            ->get();
            return response()->json($searchPost);
        }
        return response()->json([]);
    }
}
