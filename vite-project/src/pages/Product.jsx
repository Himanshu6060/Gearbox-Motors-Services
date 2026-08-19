import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../Data/products.jsx";


function Product() {
  const navigate = useNavigate();

  // Flatten all sub categories
  const allSubCategories = products.flatMap((category) =>
    category.subCategories.map((subCategory) => ({
      ...subCategory,
      parentCategory: category.name,
      parentSlug: category.slug,
    }))
  );

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    allSubCategories.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = allSubCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleReadMore = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <section className="products-page">

      <div className="products-container">

        <div className="products-grid">

          {currentProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >

              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="product-card-content">

                <h3>{product.name}</h3>

                <button
                  className="product-read-btn"
                  onClick={() => handleReadMore(product)}
                >
                  Read more
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Pagination */}

        {totalPages > 1 && (
          <div className="product-pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              ←
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              →
            </button>

          </div>
        )}

      </div>

    </section>
  );
}

export default Product;
