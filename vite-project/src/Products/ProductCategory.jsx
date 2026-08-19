import { useParams, useNavigate } from "react-router-dom";
import products from "../Data/products.json";
import { useInquiry } from "../Context/InquiryContext.jsx";

function ProductCategory({ onOpenInquiry }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openInquiry } = useInquiry();
  // ==========================================
  // FIND MAIN PRODUCT CATEGORY
  // ==========================================

  const parentCategory = products.find(
    (category) => category.slug === slug
  );

  // ==========================================
  // FIND INDIVIDUAL SUB-CATEGORY PRODUCT
  // ==========================================

  let selectedProduct = null;
  let selectedParent = null;

  products.forEach((category) => {
    const found = category.subCategories?.find(
      (subCategory) => subCategory.slug === slug
    );

    if (found) {
      selectedProduct = found;
      selectedParent = category;
    }
  });

  // ==========================================
  // CASE 1: MAIN PRODUCT CATEGORY
  // ==========================================

  if (parentCategory) {
    return (
      <section className="product-category-page">

        {/* Back Button */}
        <button
          type="button"
          className="product-back-corner"
          onClick={() => navigate("/product")}
        >
          ← Back
        </button>

        <div className="product-category-container">

          {/* Header */}
          <div className="category-header">
            <span>OUR PRODUCTS</span>

            <h1>{parentCategory.name}</h1>

            <div className="category-line"></div>
          </div>

          {/* Sub Categories */}
          <div className="subcategory-grid">

            {parentCategory.subCategories?.map((product) => (
              <div
                className="subcategory-card"
                key={product.id}
              >

                {/* Image */}
                <div className="subcategory-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                {/* Content */}
                <div className="subcategory-content">

                  <h3>{product.name}</h3>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/product/${product.slug}`)
                    }
                  >
                    Read More
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // CASE 2: INDIVIDUAL PRODUCT
  // ==========================================

  if (selectedProduct && selectedParent) {

    // Related products
    const relatedProducts =
      selectedParent.subCategories?.filter(
        (product) =>
          product.id !== selectedProduct.id
      ) || [];

    return (
      <section className="product-detail-page">

        {/* Back Button */}
        <button
          type="button"
          className="product-back-corner"
          onClick={() =>
            navigate(`/product/${selectedParent.slug}`)
          }
        >
          ← Back
        </button>

        <div className="product-detail-container">

          {/* =================================
              PRODUCT DETAILS
          ================================= */}

          <div className="product-detail">

            {/* Product Content */}
            <div className="product-detail-content">

              <span className="product-detail-category">
                {selectedParent.name}
              </span>

              <h1>{selectedProduct.name}</h1>

              <div className="product-detail-line"></div>

              <p>
                {selectedProduct.description}
              </p>

              {/* =================================
                  INQUIRY BUTTON
              ================================= */}

              <button
                type="button"
                className="inquire-product-btn"
                onClick={() => openInquiry(selectedProduct.name)}
              >
                INQUIRE NOW
              </button>
            </div>

            {/* Product Image */}
            <div className="product-detail-image">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

            </div>

          </div>

          {/* =================================
              RELATED PRODUCTS
          ================================= */}

          {relatedProducts.length > 0 && (
            <div className="related-products">

              <div className="related-title">

                <span>YOU MAY ALSO LIKE</span>

                <h2>Related Products</h2>

                <div className="related-line"></div>

              </div>

              <div className="related-grid">

                {relatedProducts.map((product) => (

                  <div
                    className="related-card"
                    key={product.id}
                  >

                    {/* Image */}
                    <div className="related-image">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    </div>

                    {/* Content */}
                    <div className="related-content">

                      <h3>
                        {product.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/product/${product.slug}`
                          )
                        }
                      >
                        Read More
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>
          )}

        </div>
      </section>
    );
  }

  // ==========================================
  // CASE 3: PRODUCT NOT FOUND
  // ==========================================

  return (
    <section className="product-not-found">

      <h1>Product Not Found</h1>

      <p>
        The product you are looking for does not exist.
      </p>

      <button
        type="button"
        onClick={() => navigate("/product")}
      >
        Back to Products
      </button>

    </section>
  );
}

export default ProductCategory;
