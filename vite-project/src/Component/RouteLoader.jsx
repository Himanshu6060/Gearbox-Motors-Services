import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader.jsx";

function RouteLoader() {
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Allow the new route/page to render first
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) {
    return null;
  }

  return <PageLoader />;
}

export default RouteLoader;