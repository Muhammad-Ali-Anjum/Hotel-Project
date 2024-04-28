import React from "react";
import BoxSystemProps from "./Box";
import "./SaleBox.css"; // Import the CSS file

function SaleBox() {
  const sales = [
    { id: { value: 1, name: "Room", sale: 400 } },
    { id: { value: 2, name: "Booking", sale: 5500 } },
    { id: { value: 3, name: "User", sale: 44500 } },
    { id: { value: 5, name: "available", sale: 30 } }
  ];
  return (
    <>
      <div className="sales-container">
        {sales.map((sale) => (
          <div key={sale.id.value} className="sale-item">
            <BoxSystemProps sale={sale.id.sale} name={sale.id.name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default SaleBox;
