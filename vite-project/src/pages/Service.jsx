import { useEffect, useRef, useState } from "react";


const MAX_FILES = 5;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

function Service() {
  const fileInputRef = useRef(null);

  const initialForm = {
    customerName: "",
    contactNo: "",
    contactPersonName: "",
    operationalDuration: "",
    siteAddress: "",
    installationDate: "",
    customerType: "",
    productDescription: "",
    complaint: "",
    email: "",
    alternativeEmail: "",
    serialNo: "",
    state: "",
    pinCode: "",
    quantity: "",
    subject: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const [files, setFiles] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // ==========================================
  // AUTO HIDE SUCCESS MESSAGE AFTER 5 SECONDS
  // ==========================================

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // ==========================================
  // HANDLE FILES
  // ==========================================

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setErrorMessage("");

    if (selectedFiles.length === 0) {
      return;
    }

    // Maximum 5 files
    if (selectedFiles.length + files.length > MAX_FILES) {
      setErrorMessage(
        `You can attach a maximum of ${MAX_FILES} files.`
      );

      e.target.value = "";
      return;
    }

    // Check each file size
    const oversizedFile = selectedFiles.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setErrorMessage(
        `"${oversizedFile.name}" exceeds the 20 MB file size limit.`
      );

      e.target.value = "";
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);

    e.target.value = "";
  };

  // ==========================================
  // REMOVE FILE
  // ==========================================

  const removeFile = (index) => {
    setFiles((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index)
    );

    setErrorMessage("");
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const handleReset = () => {
    setFormData(initialForm);

    setFiles([]);

    setErrorMessage("");

    setSuccessMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

const handleSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);
  setSuccessMessage("");
  setErrorMessage("");

  try {
    const formDataToSend = new FormData();

    // ==========================================
    // FORM DATA
    // ==========================================

    formDataToSend.append(
      "customerName",
      formData.customerName.trim()
    );

    formDataToSend.append(
      "contactNo",
      formData.contactNo.trim()
    );

    formDataToSend.append(
      "contactPersonName",
      formData.contactPersonName.trim()
    );

    formDataToSend.append(
      "operationalDuration",
      formData.operationalDuration.trim()
    );

    formDataToSend.append(
      "siteAddress",
      formData.siteAddress.trim()
    );

    formDataToSend.append(
      "installationDate",
      formData.installationDate
    );

    formDataToSend.append(
      "customerType",
      formData.customerType
    );

    formDataToSend.append(
      "productDescription",
      formData.productDescription.trim()
    );

    formDataToSend.append(
      "complaint",
      formData.complaint.trim()
    );

    formDataToSend.append(
      "email",
      formData.email.trim()
    );

    formDataToSend.append(
      "alternativeEmail",
      formData.alternativeEmail.trim()
    );

    formDataToSend.append(
      "serialNo",
      formData.serialNo.trim()
    );

    formDataToSend.append(
      "state",
      formData.state.trim()
    );

    formDataToSend.append(
      "pinCode",
      formData.pinCode.trim()
    );

    formDataToSend.append(
      "quantity",
      formData.quantity
    );

    formDataToSend.append(
      "subject",
      formData.subject.trim()
    );


    // ==========================================
    // ATTACH FILES
    // ==========================================

    files.forEach((file) => {
      formDataToSend.append("files", file);
    });


    // ==========================================
    // API REQUEST
    // ==========================================

    const response = await fetch(
      "http://localhost:5000/api/service/complaint",
      {
        method: "POST",

        body: formDataToSend,
      }
    );


    // ==========================================
    // RESPONSE
    // ==========================================

    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to submit complaint."
      );
    }


    // ==========================================
    // SUCCESS
    // ==========================================

    setSuccessMessage(
      data.message ||
        "Your complaint has been submitted successfully!"
    );


    // ==========================================
    // CLEAR FORM
    // ==========================================

    setFormData(initialForm);

    setFiles([]);


    // Clear file input

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }


  } catch (error) {

    console.error(
      "Complaint submission error:",
      error
    );

    setErrorMessage(
      error.message ||
        "Something went wrong. Please try again."
    );

  } finally {

    setIsSubmitting(false);

  }
};

  return (
    <main className="service-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <section className="service-header">

        <span className="service-subtitle">
          CUSTOMER SUPPORT
        </span>

        <h1>Complaint Form</h1>

        <div className="service-header-line"></div>

        <p>
          Please provide the required details below.
          Our support team will review your complaint
          and contact you shortly.
        </p>

      </section>


      {/* ==========================================
          COMPLAINT FORM
      ========================================== */}

      <section className="complaint-section">

        <div className="complaint-container">

          {/* FORM TITLE */}

          <div className="complaint-title">

            <span>GET SUPPORT</span>

            <h2>Submit Your Complaint</h2>

            <p>
              Fill in the details accurately so our team
              can assist you efficiently.
            </p>

          </div>


          {/* SUCCESS MESSAGE */}

          {successMessage && (
            <div className="complaint-success">
              <span className="success-icon">✓</span>

              <span>{successMessage}</span>
            </div>
          )}


          {/* ERROR MESSAGE */}

          {errorMessage && (
            <div className="complaint-error">
              <span>!</span>

              <span>{errorMessage}</span>
            </div>
          )}


          <form
            className="complaint-form"
            onSubmit={handleSubmit}
          >

            {/* ======================================
                CUSTOMER INFORMATION
            ====================================== */}

            <div className="form-section-title">
              <span>01</span>
              Customer Information
            </div>


            <div className="complaint-grid">

              {/* Customer Name */}

              <div className="complaint-field">

                <label htmlFor="customerName">
                  Customer Name <span>*</span>
                </label>

                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                />

              </div>


              {/* Contact No */}

              <div className="complaint-field">

                <label htmlFor="contactNo">
                  Contact No <span>*</span>
                </label>

                <input
                  id="contactNo"
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />

              </div>


              {/* Contact Person */}

              <div className="complaint-field">

                <label htmlFor="contactPersonName">
                  Contact Person Name <span>*</span>
                </label>

                <input
                  id="contactPersonName"
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  placeholder="Enter contact person name"
                  required
                />

              </div>


              {/* Operational Duration */}

              <div className="complaint-field">

                <label htmlFor="operationalDuration">
                  Operational Duration
                </label>

                <input
                  id="operationalDuration"
                  type="text"
                  name="operationalDuration"
                  value={formData.operationalDuration}
                  onChange={handleChange}
                  placeholder="e.g. 2 years / 5000 hours"
                />

              </div>


              {/* Site Address */}

              <div className="complaint-field full-width">

                <label htmlFor="siteAddress">
                  Site Address <span>*</span>
                </label>

                <textarea
                  id="siteAddress"
                  name="siteAddress"
                  value={formData.siteAddress}
                  onChange={handleChange}
                  placeholder="Enter complete site address"
                  rows="3"
                  required
                />

              </div>


              {/* Installation Date */}

              <div className="complaint-field">

                <label htmlFor="installationDate">
                  Date of Installation
                </label>

                <input
                  id="installationDate"
                  type="date"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleChange}
                />

              </div>


              {/* Customer Type */}

              <div className="complaint-field">

                <label htmlFor="customerType">
                  OEM / Dealer / End User <span>*</span>
                </label>

                <select
                  id="customerType"
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select type
                  </option>

                  <option value="OEM">
                    OEM
                  </option>

                  <option value="Dealer">
                    Dealer
                  </option>

                  <option value="End User">
                    End User
                  </option>

                </select>

              </div>

            </div>


            {/* ======================================
                PRODUCT INFORMATION
            ====================================== */}

            <div className="form-section-title">
              <span>02</span>
              Product Information
            </div>


            <div className="complaint-grid">

              {/* Product Description */}

              <div className="complaint-field full-width">

                <label htmlFor="productDescription">
                  Product Description <span>*</span>
                </label>

                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Describe the product"
                  rows="4"
                  required
                />

              </div>


              {/* Serial No */}

              <div className="complaint-field">

                <label htmlFor="serialNo">
                  Serial No <span>*</span>
                </label>

                <input
                  id="serialNo"
                  type="text"
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleChange}
                  placeholder="Enter serial number"
                  required
                />

              </div>


              {/* Quantity */}

              <div className="complaint-field">

                <label htmlFor="quantity">
                  Quantity <span>*</span>
                </label>

                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  min="1"
                  required
                />

              </div>


              {/* Complaint */}

              <div className="complaint-field full-width">

                <label htmlFor="complaint">
                  Complaint <span>*</span>
                </label>

                <textarea
                  id="complaint"
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  placeholder="Please describe your complaint in detail"
                  rows="5"
                  required
                />

              </div>

            </div>


            {/* ======================================
                CONTACT INFORMATION
            ====================================== */}

            <div className="form-section-title">
              <span>03</span>
              Contact & Location
            </div>


            <div className="complaint-grid">

              {/* Email */}

              <div className="complaint-field">

                <label htmlFor="email">
                  Email <span>*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />

              </div>


              {/* Alternative Email */}

              <div className="complaint-field">

                <label htmlFor="alternativeEmail">
                  Alternative Email
                </label>

                <input
                  id="alternativeEmail"
                  type="email"
                  name="alternativeEmail"
                  value={formData.alternativeEmail}
                  onChange={handleChange}
                  placeholder="Enter alternative email"
                />

              </div>


              {/* State */}

              <div className="complaint-field">

                <label htmlFor="state">
                  State <span>*</span>
                </label>

                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                />

              </div>


              {/* Pin Code */}

              <div className="complaint-field">

                <label htmlFor="pinCode">
                  Pin Code <span>*</span>
                </label>

                <input
                  id="pinCode"
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="Enter pin code"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />

              </div>


              {/* Subject */}

              <div className="complaint-field full-width">

                <label htmlFor="subject">
                  Subject <span>*</span>
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter complaint subject"
                  required
                />

              </div>

            </div>


            {/* ======================================
                ATTACH FILES
            ====================================== */}

            <div className="form-section-title">
              <span>04</span>
              Attach Documents
            </div>


            <div className="complaint-field">

              <label htmlFor="complaint-files">
                Attach Files
              </label>

              <div className="file-upload-box">

                <input
                  ref={fileInputRef}
                  id="complaint-files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />

                <div className="file-upload-content">

                  <span className="file-upload-icon">
                    +
                  </span>

                  <strong>
                    Click to attach files
                  </strong>

                  <small>
                    Maximum 5 files • Maximum 20 MB per file
                  </small>

                </div>

              </div>


              {/* FILE LIST */}

              {files.length > 0 && (
                <div className="selected-files">

                  {files.map((file, index) => (

                    <div
                      className="selected-file"
                      key={`${file.name}-${index}`}
                    >

                      <div className="selected-file-info">

                        <span className="file-icon">
                          📎
                        </span>

                        <div>

                          <strong>
                            {file.name}
                          </strong>

                          <small>
                            {(file.size / (1024 * 1024)).toFixed(2)}
                            {" "}
                            MB
                          </small>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        aria-label={`Remove ${file.name}`}
                      >
                        ×
                      </button>

                    </div>

                  ))}

                </div>
              )}

            </div>


            {/* ======================================
                BUTTONS
            ====================================== */}

            <div className="complaint-actions">

              {/* RESET */}

              <button
                type="button"
                className="complaint-reset"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset
              </button>


              {/* SUBMIT */}

              <button
                type="submit"
                className="complaint-submit"
                disabled={isSubmitting}
              >

                {isSubmitting ? (
                  <>
                    <span className="complaint-loader"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Complaint"
                )}

              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Service;