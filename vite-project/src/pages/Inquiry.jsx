import { useEffect, useState } from "react";
import products from "src/data/products.json";

function Inquiry({
  isOpen,
  onClose,
  selectedProduct = "",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    product: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // API URL
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Get all sub-category products
  const subProducts = products.flatMap(
    (category) => category.subCategories || []
  );

  // Set selected product when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        product: selectedProduct || "",
      }));

      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [isOpen, selectedProduct]);

  // Escape key + body scroll
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, loading]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages while typing
    if (successMessage) {
      setSuccessMessage("");
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // Submit inquiry
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submission
    if (loading) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Abort request if server takes too long
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 15000); // 15 seconds

    try {
      const response = await fetch(
        `${API_URL}/api/inquiry`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            mobile: formData.mobile.trim(),
            product: formData.product,
            message: formData.message.trim(),
          }),

          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      // Safely parse response
      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit inquiry."
        );
      }

      // Success
      setSuccessMessage(
        data.message ||
          "Your inquiry has been submitted successfully!"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        product: "",
        message: "",
      });

      // Close popup after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      clearTimeout(timeout);

      console.error(
        "Inquiry submission error:",
        error
      );

      if (error.name === "AbortError") {
        setErrorMessage(
          "The server is taking too long to respond. Please try again."
        );
      } else {
        setErrorMessage(
          error.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="inquiry-overlay"
      onClick={!loading ? onClose : undefined}
    >
      <div
        className="inquiry-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="inquiry-close"
          onClick={onClose}
          type="button"
          aria-label="Close inquiry form"
          disabled={loading}
        >
          ×
        </button>

        {/* Header */}
        <div className="inquiry-header">
          <span>GET IN TOUCH</span>

          <h2>Send Your Inquiry</h2>

          <p>
            Tell us about your requirement and our
            team will contact you shortly.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="inquiry-success">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="inquiry-error">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form
          className="inquiry-form"
          onSubmit={handleSubmit}
        >
          {/* Name + Email */}
          <div className="inquiry-row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-name">
                Your Name<span>*</span>
              </label>

              <input
                id="inquiry-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={loading}
              />
            </div>

            <div className="inquiry-field">
              <label htmlFor="inquiry-email">
                Your Email<span>*</span>
              </label>

              <input
                id="inquiry-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Mobile + Product */}
          <div className="inquiry-row">
            <div className="inquiry-field">
              <label htmlFor="inquiry-mobile">
                Mobile No.<span>*</span>
              </label>

              <input
                id="inquiry-mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                inputMode="numeric"
                required
                disabled={loading}
              />
            </div>

            <div className="inquiry-field">
              <label htmlFor="inquiry-product">
                Which Product is Inquiry?<span>*</span>
              </label>

              <select
                id="inquiry-product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">
                  Select a product
                </option>

                {subProducts.map((product) => (
                  <option
                    key={product.id}
                    value={product.name}
                  >
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="inquiry-field">
            <label htmlFor="inquiry-message">
              Message
            </label>

            <textarea
              id="inquiry-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              rows="5"
              disabled={loading}
            />
          </div>

          {/* Send */}
          <button
            type="submit"
            className="inquiry-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inquiry-spinner"></span>
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inquiry;
