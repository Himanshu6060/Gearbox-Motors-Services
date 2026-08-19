import React, { useState } from "react";
// import "./SalesNetwork.css";

const salesNetworkData = [
  {
    id: 1,
    state: "Maharashtra",
    city: "Bhiwandi",
    title: "Maharashtra Sales Network",
    contactPerson: "Sales Team",
    phone: "+91 98331 58663",
    email: "sales@industrialsalesandservice.com",
    address:
      "Padmavati Estate, Near Bhav Residency, Datt Mandir, Before Kasheli Toll Naka, Bhiwandi, Maharashtra - 421302",
  },

  {
    id: 2,
    state: "Punjab",
    city: "Ludhiana",
    title: "Punjab Sales Network",
    contactPerson: "Sales Team",
    phone: "+91 98331 58663",
    email: "sales@industrialsalesandservice.com",
    address: "Ludhiana, Punjab, India",
  },

  {
    id: 3,
    state: "Delhi",
    city: "New Delhi",
    title: "Delhi Sales Network",
    contactPerson: "Sales Team",
    phone: "+91 98331 58663",
    email: "sales@industrialsalesandservice.com",
    address: "New Delhi, India",
  },

  {
    id: 4,
    state: "Gujarat",
    city: "Ahmedabad",
    title: "Gujarat Sales Network",
    contactPerson: "Sales Team",
    phone: "+91 98331 58663",
    email: "sales@industrialsalesandservice.com",
    address: "Ahmedabad, Gujarat, India",
  },
];

function SalesNetwork() {
  const [search, setSearch] = useState("");

  const filteredNetwork = salesNetworkData.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.state.toLowerCase().includes(searchValue) ||
      item.city.toLowerCase().includes(searchValue) ||
      item.title.toLowerCase().includes(searchValue)
    );
  });

  const handleDirections = (address) => {
    if (!navigator.geolocation) {
      const destination = encodeURIComponent(address);

      window.open(
        `https://www.google.com/maps/search/?api=1&query=${destination}`,
        "_blank"
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const destination = encodeURIComponent(address);

        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;

        window.open(url, "_blank");
      },
      () => {
        const destination = encodeURIComponent(address);

        window.open(
          `https://www.google.com/maps/search/?api=1&query=${destination}`,
          "_blank"
        );
      }
    );
  };

  return (
    <section className="sales-network-section">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="sales-network-container">

        <div className="sales-network-header">

          <span className="sales-network-subtitle">
            OUR PRESENCE
          </span>

          <h1>Sales Network</h1>

          <div className="sales-network-line"></div>

          <p>
            Our sales network helps us serve customers across different
            regions with reliable industrial products, technical support,
            and professional service.
          </p>

        </div>


        {/* =====================================
            SEARCH
        ===================================== */}

        <div className="sales-network-search">

          <input
            type="text"
            placeholder="Search by state or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>


        {/* =====================================
            NETWORK GRID
        ===================================== */}

        <div className="sales-network-grid">

          {filteredNetwork.length > 0 ? (
            filteredNetwork.map((item) => (

              <div
                className="sales-network-card"
                key={item.id}
              >

                {/* Card Header */}

                <div className="sales-network-card-header">

                  <div className="sales-network-location-icon">
                    <span>⌖</span>
                  </div>

                  <div>
                    <span className="sales-network-state">
                      {item.state}
                    </span>

                    <h3>{item.title}</h3>

                    <p className="sales-network-city">
                      {item.city}
                    </p>
                  </div>

                </div>


                {/* Card Details */}

                <div className="sales-network-details">

                  <div className="sales-network-detail">

                    <span className="sales-network-detail-icon">
                      👤
                    </span>

                    <div>
                      <small>Contact Person</small>
                      <p>{item.contactPerson}</p>
                    </div>

                  </div>


                  <div className="sales-network-detail">

                    <span className="sales-network-detail-icon">
                      ☎
                    </span>

                    <div>
                      <small>Phone</small>

                      <a href={`tel:${item.phone}`}>
                        {item.phone}
                      </a>

                    </div>

                  </div>


                  <div className="sales-network-detail">

                    <span className="sales-network-detail-icon">
                      ✉
                    </span>

                    <div>
                      <small>Email</small>

                      <a href={`mailto:${item.email}`}>
                        {item.email}
                      </a>

                    </div>

                  </div>


                  <div className="sales-network-detail">

                    <span className="sales-network-detail-icon">
                      📍
                    </span>

                    <div>
                      <small>Address</small>

                      <p>{item.address}</p>
                    </div>

                  </div>

                </div>


                {/* Directions */}

                <button
                  type="button"
                  className="sales-network-direction-btn"
                  onClick={() =>
                    handleDirections(item.address)
                  }
                >
                  <span>Get Directions</span>
                  <span className="sales-network-arrow">
                    →
                  </span>
                </button>

              </div>

            ))
          ) : (

            /* =====================================
               NO RESULT
            ===================================== */

            <div className="sales-network-empty">

              <div className="sales-network-empty-icon">
                ⌕
              </div>

              <h3>No Sales Network Found</h3>

              <p>
                We couldn't find a sales location matching
                your search.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
              >
                View All Locations
              </button>

            </div>

          )}

        </div>


        {/* =====================================
            BOTTOM CTA
        ===================================== */}

        <div className="sales-network-cta">

          <div className="sales-network-cta-content">

            <span>NEED ASSISTANCE?</span>

            <h2>
              Looking for a Sales Representative?
            </h2>

            <p>
              Get in touch with our team and we will help
              you connect with the right sales representative
              for your requirement.
            </p>

          </div>

          <a
            href="tel:+919833158663"
            className="sales-network-cta-btn"
          >
            Contact Sales
            <span>→</span>
          </a>

        </div>

      </div>

    </section>
  );
}

export default SalesNetwork;