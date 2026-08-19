import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import products from "src/data/products.json";


const ProductSection = () => {
  const navigate = useNavigate();

  return (
    <section className="home-product-section">
      <div className="home-product-container">

        {/* ================================
            SECTION TITLE
        ================================= */}
        <div className="home-product-title">
          <span>WHAT WE'RE OFFERING</span>
          <h2>Our Products</h2>
          <div className="home-product-title-line"></div>
        </div>

        {/* ================================
            PRODUCTS
        ================================= */}
        <div className="home-product-grid">

          {products.map((product) => (
            <div
              className="home-product-card"
              key={product.id}
            >

              {/* IMAGE */}
              <div className="home-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = "/images/dummy.jpg";
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="home-product-info">

                <h3>{product.name}</h3>

                <button
                  type="button"
                  className="home-product-arrow"
                  aria-label={`View ${product.name}`}
                  onClick={() =>
                    navigate(`/product/${product.slug}`)
                  }
                >
                  <FaArrowRight />
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ProductSection;
