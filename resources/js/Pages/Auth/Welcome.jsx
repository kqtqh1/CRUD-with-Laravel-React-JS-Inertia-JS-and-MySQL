export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        EchoPost
      </h1>
      <p className="mb-6 text-lg font-medium max-w-md">
        An app built to explore post creation and management through CRUD.
      </p>
      <div>
        <button
          onClick={() => window.location.href = "/login"}
          className="mx-3 px-8 py-3 bg-white text-cyan-600 font-semibold rounded-2xl shadow-md hover:bg-cyan-100 transition"
        >
          Login
        </button>
        <button
          onClick={() => window.location.href = "/register"}
          className="mx-3 px-8 py-3 bg-cyan-600 text-white font-semibold rounded-2xl shadow-md hover:bg-cyan-700 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
