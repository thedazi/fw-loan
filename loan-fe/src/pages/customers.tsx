import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type CustomerDetail = {
  id: number;
  "First Name": string | null;
  "Last Name": string | null;
  "Email": string | null;
  "Company": string | null;
  "Country": string | null;
  "City": string | null;
  "Phone 1": string | null;
  "Phone 2": string | null;
  "Subscription Date": string | null;
  "Website": string | null;
  message: string | null;
  created_at: string | null;
};

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/customers/${id}`);
      const data = await resp.json();

      if (!resp.ok) {
        setError(data?.error ?? "Failed to load customer.");
        return;
      }

      setCustomer(data);
    })();
  }, [id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">🠠 Back to customers</Link>
      </div>
    );
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {customer["First Name"]} {customer["Last Name"]}
      </h1>
      <p>{customer.Email}</p>
      <p>{customer.Company}</p>
      <p>
        {customer.City}, {customer.Country}
      </p>
      <p>{customer["Phone 1"]}</p>
      <p>{customer["Phone 2"]}</p>
      <p>{customer["Subscription Date"]}</p>
      <p>{customer.Website}</p>
      <p>{customer.message}</p>
      <p>{customer.created_at}</p>
      <Link to="/">🠠 Back to customers</Link>
    </div>
  );
}
