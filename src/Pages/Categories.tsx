import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

function Categories() {
  const categories = productsData.categories;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Browse by <span className="text-gradient">Category</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our extensive collection of gaming hardware and PC components. Find exactly what you need to build your perfect setup.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryProducts = productsData.products.filter(p => p.category === category.id);
            return (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="card card-hover group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-5xl mb-2">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-gray-400">{category.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">
                      {categoryProducts.length} products
                    </span>
                    <span className="text-purple-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;