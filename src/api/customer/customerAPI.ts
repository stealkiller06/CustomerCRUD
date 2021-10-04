import axiosInstance from "../axiosInstance";
import { Customer } from "./types/customerType";

export async function addCustomer(customer: Customer) {
  const response = await axiosInstance.post<Customer>("/customers", customer);
  return response.data;
}

export async function updateCustomer(customer: Customer) {
  const response = await axiosInstance.patch<Customer>(
    `/customers/${customer._id}`,
    customer
  );
  return response.data;
}

export async function deleteCustomer(id: string) {
  const response = await axiosInstance.delete<void>(`/customers/${id}`);
  return response.data;
}

export async function getCustomers() {
  const response = await axiosInstance.get<Customer[]>("/customers");
  return response.data;
}
