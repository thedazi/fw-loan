import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CustomerRow = {
  id: number;
  "First Name": string | null;
  "Last Name": string | null;
  "Email": string | null;
  "Company": string | null;
  "Country": string | null;
};

export default function Index() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/customers");
      const allCustomers = await response.json();
      setCustomers(allCustomers);
    })();
  }, []);

  return (
    <main id="content">
      <h1>Customer list</h1>
      <p>Click a customer to view details.</p>
      {customers.map((customer) => {
        return (
          <Link
            to={`/${customer.id}`}
            key={customer.id}
            className="dinosaur"
          >
            {customer["First Name"]} {customer["Last Name"]}
            {" — "}
            {customer.Email ?? "no email"}
            {" — "}
            {customer.Company ?? "no company"}
            {" — "}
            {customer.Country ?? "no country"}
          </Link>
        );
      })}
    </main>
  );
}
