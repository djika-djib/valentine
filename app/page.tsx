import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-rose-700">
            💝 HeartLink Valentine 2026
          </div>
          <Link 
            href="/create"
            className="bg-white text-rose-600 px-6 py-2 rounded-full font-semibold hover:bg-rose-50 transition"
          >
            Create Page
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-rose-800 mb-6">
          Create Magic
          <span className="block text-rose-600">This Valentine's</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          Build a beautiful, personalized love page for your special someone. 
          Share memories, write love letters, and create a digital keepsake.
        </p>

        <div className="space-x-4">
          <Link
            href="/create"
            className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition inline-block"
          >
            Start Creating → 
          </Link>
          {/* <button className="bg-white text-rose-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition">
            See Example
          </button> */}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl">
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy to Create</h3>
            <p className="text-gray-600">Fill in your love story step by step</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Private & Secure</h3>
            <p className="text-gray-600">Password protected for your eyes only</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-3xl mb-4">💝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Forever Keepsake</h3>
            <p className="text-gray-600">A digital memory that lasts forever</p>
          </div>
        </div>
        <br />
        <p className="text-gray-500">
            Built with ❤️ by NexInit.merndev(DjikaTech)
          </p>
      </div>
    </div>
  );
}






// #VAL2026db #VAL2026dbDjika #VAL2026dbDjika