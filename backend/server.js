import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// ==========================================
// CHECK ENVIRONMENT VARIABLES
// ==========================================

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS loaded:",
  Boolean(process.env.EMAIL_PASS)
);

console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);


// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",

    methods: ["GET", "POST"],

    allowedHeaders: ["Content-Type"],
  })
);


// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ==========================================
// MULTER FILE UPLOAD CONFIGURATION
// ==========================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    files: 5,
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Industrial Sales & Service Backend is running",
  });
});


// ==========================================
// TEST API
// ==========================================

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working successfully",
  });
});


// ==========================================
// CREATE MAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ==========================================
// VERIFY SMTP CONNECTION
// ==========================================

transporter.verify((error, success) => {
  if (error) {
    console.error(
      "❌ SMTP connection failed:"
    );

    console.error(error.message);
  } else {
    console.log(
      "✅ SMTP server is ready to send emails"
    );
  }
});


// ==========================================
// INQUIRY API
// ==========================================

app.post("/api/inquiry", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      product,
      message,
    } = req.body;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !name ||
      !email ||
      !mobile ||
      !product
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields.",
      });
    }


    // ==========================================
    // EMAIL
    // ==========================================

    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: process.env.ADMIN_EMAIL,

      replyTo: email,

      subject:
        `New Product Inquiry - ${product}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: auto;
            padding: 20px;
            border: 1px solid #eeeeee;
            border-radius: 10px;
          "
        >

          <h2
            style="
              color: #f01818;
              margin-bottom: 20px;
            "
          >
            New Product Inquiry
          </h2>

          <hr />

          <p>
            <strong>Customer Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Mobile:</strong>
            ${mobile}
          </p>

          <p>
            <strong>Product:</strong>
            ${product}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div
            style="
              background: #f8f8f8;
              padding: 15px;
              border-radius: 6px;
            "
          >
            ${
              message ||
              "No message provided"
            }
          </div>

          <hr />

          <p
            style="
              color: #777777;
              font-size: 13px;
            "
          >
            This inquiry was submitted from
            the Industrial Sales & Services
            website.
          </p>

        </div>
      `,
    };


    // ==========================================
    // SEND EMAIL
    // ==========================================

    await transporter.sendMail(mailOptions);


    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      message:
        "Inquiry submitted successfully.",
    });

  } catch (error) {

    console.error(
      "❌ Inquiry Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to submit inquiry.",
    });
  }
});





// contact form 

// ==========================================
// CONTACT FORM API
// ==========================================

app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      company,
      phone,
      email,
      requirement,
      message,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !phone || !email || !requirement) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // ==========================================
    // EMAIL TRANSPORTER
    // ==========================================

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ==========================================
    // EMAIL
    // ==========================================

    const mailOptions = {
      from: process.env.EMAIL_USER,

      // Your receiving/admin email
      to: process.env.ADMIN_EMAIL,

      // If customer replies to email
      replyTo: email,

      subject: `New Contact Enquiry - ${requirement}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: auto;
            border: 1px solid #ddd;
            border-radius: 10px;
            overflow: hidden;
          "
        >

          <div
            style="
              background: #f01818;
              color: white;
              padding: 20px;
            "
          >
            <h2 style="margin: 0;">
              New Contact Enquiry
            </h2>
          </div>

          <div style="padding: 25px;">

            <p>
              <strong>Customer Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Company:</strong>
              ${company || "Not provided"}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Requirement:</strong>
              ${requirement}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div
              style="
                background: #f7f7f7;
                padding: 15px;
                border-radius: 6px;
                margin-bottom: 20px;
              "
            >
              ${message || "No message provided"}
            </div>

            <hr />

            <p
              style="
                color: #777;
                font-size: 13px;
              "
            >
              This contact enquiry was submitted from
              the Industrial Sales & Services website.
            </p>

          </div>

        </div>
      `,
    };

    // ==========================================
    // SEND EMAIL
    // ==========================================

    await transporter.sendMail(mailOptions);

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Contact enquiry submitted successfully.",
    });

  } catch (error) {

    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit contact enquiry.",
    });
  }
});

// end contact form 



// Service Form 

// ==========================================
// SERVICE / COMPLAINT FORM API
// ==========================================

app.post(
  "/api/service/complaint",
  upload.array("files", 5),

  async (req, res) => {
    try {

      // ==========================================
      // GET FORM DATA
      // ==========================================

      const {
        customerName,
        contactNo,
        contactPersonName,
        operationalDuration,
        siteAddress,
        installationDate,
        customerType,
        productDescription,
        complaint,
        email,
        alternativeEmail,
        serialNo,
        state,
        pinCode,
        quantity,
        subject,
      } = req.body;


      // ==========================================
      // VALIDATION
      // ==========================================

      if (
        !customerName ||
        !contactNo ||
        !contactPersonName ||
        !siteAddress ||
        !customerType ||
        !productDescription ||
        !complaint ||
        !email ||
        !serialNo ||
        !state ||
        !pinCode ||
        !quantity ||
        !subject
      ) {
        return res.status(400).json({
          success: false,
          message: "Please fill all required fields.",
        });
      }


      // ==========================================
      // EMAIL VALIDATION
      // ==========================================

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address.",
        });
      }


      // ==========================================
      // FILE ATTACHMENTS
      // ==========================================

      const attachments =
        (req.files || []).map((file) => ({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        }));


      // ==========================================
      // SERVICE COMPLAINT EMAIL
      // ==========================================

      const mailOptions = {

        from: process.env.EMAIL_USER,

        // Admin/company email
        to: process.env.ADMIN_EMAIL,

        // Reply directly to customer
        replyTo: email,

        subject:
          `Service Complaint - ${subject}`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 750px;
              margin: auto;
              border: 1px solid #ddd;
              border-radius: 10px;
              overflow: hidden;
            "
          >

            <!-- HEADER -->

            <div
              style="
                background: #f01818;
                color: white;
                padding: 20px;
              "
            >

              <h2 style="margin: 0;">
                New Service Complaint
              </h2>

              <p style="margin: 8px 0 0;">
                Industrial Sales & Services
              </p>

            </div>


            <!-- BODY -->

            <div style="padding: 25px;">


              <!-- CUSTOMER INFORMATION -->

              <h3
                style="
                  color: #f01818;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                "
              >
                Customer Information
              </h3>


              <p>
                <strong>Customer Name:</strong>
                ${customerName}
              </p>

              <p>
                <strong>Contact No:</strong>
                ${contactNo}
              </p>

              <p>
                <strong>Contact Person:</strong>
                ${contactPersonName}
              </p>

              <p>
                <strong>Operational Duration:</strong>
                ${
                  operationalDuration ||
                  "Not provided"
                }
              </p>

              <p>
                <strong>Customer Type:</strong>
                ${customerType}
              </p>

              <p>
                <strong>Site Address:</strong>
                ${siteAddress}
              </p>

              <p>
                <strong>Installation Date:</strong>
                ${
                  installationDate ||
                  "Not provided"
                }
              </p>


              <!-- PRODUCT INFORMATION -->

              <h3
                style="
                  color: #f01818;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                  margin-top: 30px;
                "
              >
                Product Information
              </h3>


              <p>
                <strong>Product Description:</strong>
              </p>

              <div
                style="
                  background: #f7f7f7;
                  padding: 15px;
                  border-radius: 6px;
                "
              >
                ${productDescription}
              </div>


              <p>
                <strong>Serial No:</strong>
                ${serialNo}
              </p>

              <p>
                <strong>Quantity:</strong>
                ${quantity}
              </p>


              <!-- COMPLAINT -->

              <h3
                style="
                  color: #f01818;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                  margin-top: 30px;
                "
              >
                Complaint Details
              </h3>


              <p>
                <strong>Subject:</strong>
                ${subject}
              </p>


              <p>
                <strong>Complaint:</strong>
              </p>

              <div
                style="
                  background: #f7f7f7;
                  padding: 15px;
                  border-radius: 6px;
                  white-space: pre-line;
                "
              >
                ${complaint}
              </div>


              <!-- CONTACT INFORMATION -->

              <h3
                style="
                  color: #f01818;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                  margin-top: 30px;
                "
              >
                Contact & Location
              </h3>


              <p>
                <strong>Email:</strong>
                ${email}
              </p>

              <p>
                <strong>Alternative Email:</strong>
                ${
                  alternativeEmail ||
                  "Not provided"
                }
              </p>

              <p>
                <strong>State:</strong>
                ${state}
              </p>

              <p>
                <strong>Pin Code:</strong>
                ${pinCode}
              </p>


              <!-- ATTACHMENTS -->

              <h3
                style="
                  color: #f01818;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 8px;
                  margin-top: 30px;
                "
              >
                Attachments
              </h3>


              <p>
                ${
                  attachments.length > 0
                    ? `${attachments.length} file(s) attached to this email.`
                    : "No files attached."
                }
              </p>


              <hr
                style="
                  margin-top: 30px;
                "
              />


              <p
                style="
                  color: #777;
                  font-size: 13px;
                "
              >
                This complaint was submitted through
                the Industrial Sales & Services website.
              </p>

            </div>

          </div>
        `,

        // Attach uploaded files
        attachments,
      };


      // ==========================================
      // SEND EMAIL TO ADMIN
      // ==========================================

      await transporter.sendMail(mailOptions);


      // ==========================================
      // CUSTOMER CONFIRMATION EMAIL
      // ==========================================

      try {

        await transporter.sendMail({

          from: process.env.EMAIL_USER,

          to: email,

          subject:
            "Complaint Received - Industrial Sales & Services",

          html: `
            <div
              style="
                font-family: Arial, sans-serif;
                max-width: 650px;
                margin: auto;
                padding: 25px;
                border: 1px solid #ddd;
                border-radius: 10px;
              "
            >

              <h2
                style="
                  color: #f01818;
                "
              >
                Complaint Received Successfully
              </h2>

              <p>
                Dear ${customerName},
              </p>

              <p>
                Thank you for contacting
                Industrial Sales & Services.
              </p>

              <p>
                We have successfully received
                your service complaint.
              </p>

              <p>
                Our support team will review
                your complaint and contact you
                shortly.
              </p>


              <div
                style="
                  background: #f7f7f7;
                  padding: 15px;
                  border-radius: 6px;
                  margin: 20px 0;
                "
              >

                <p>
                  <strong>Complaint Subject:</strong>
                  ${subject}
                </p>

                <p>
                  <strong>Serial No:</strong>
                  ${serialNo}
                </p>

                <p>
                  <strong>Contact No:</strong>
                  ${contactNo}
                </p>

              </div>


              <p>
                Regards,<br />
                <strong>
                  Industrial Sales & Services
                </strong>
              </p>

            </div>
          `,
        });

      } catch (customerEmailError) {

        console.error(
          "⚠️ Customer confirmation email failed:",
          customerEmailError.message
        );

      }


      // ==========================================
      // SUCCESS RESPONSE
      // ==========================================

      return res.status(200).json({

        success: true,

        message:
          "Your complaint has been submitted successfully.",

      });

    } catch (error) {

      console.error(
        "❌ Service Complaint Error:",
        error
      );


      // ==========================================
      // MULTER ERRORS
      // ==========================================

      if (
        error.code === "LIMIT_FILE_SIZE"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Each file must be 20 MB or smaller.",

        });

      }


      if (
        error.code === "LIMIT_FILE_COUNT"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "You can attach a maximum of 5 files.",

        });

      }


      // ==========================================
      // GENERAL ERROR
      // ==========================================

      return res.status(500).json({

        success: false,

        message:
          "Failed to submit complaint. Please try again later.",

      });

    }
  }
);

// end service form 

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🚀 Backend server running on port ${PORT}`
  );
});