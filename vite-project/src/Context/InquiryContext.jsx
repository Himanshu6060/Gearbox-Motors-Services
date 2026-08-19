import { createContext, useContext, useState } from "react";
import Inquiry from "../pages/Inquiry.jsx";

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openInquiry = (productName = "") => {
    setSelectedProduct(productName);
    setInquiryOpen(true);
  };

  const closeInquiry = () => {
    setInquiryOpen(false);
    setSelectedProduct("");
  };

  return (
    <InquiryContext.Provider
      value={{
        openInquiry,
        closeInquiry,
      }}
    >
      {children}

      <Inquiry
        isOpen={inquiryOpen}
        onClose={closeInquiry}
        selectedProduct={selectedProduct}
      />
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  return useContext(InquiryContext);
};
