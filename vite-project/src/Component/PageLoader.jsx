// import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-content">

        {/* Animated Gear */}
        <div className="loader-gear">
          ⚙
        </div>

        {/* Loading Text */}
        <div className="loader-text">
          <span>Loading</span>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>

        {/* Progress Line */}
        <div className="loader-line">
          <div className="loader-line-progress"></div>
        </div>

      </div>
    </div>
  );
}

export default PageLoader;