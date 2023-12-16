import { create } from 'zustand';
import { Customer } from '../types/customer';

type CustomerState = {
    selectedCustomer: Customer | null;
    setSelectedCustomer: (Customer: Customer | null) => void;
}

// Create a store using Zustand
export const useCustomerStore = create<CustomerState>((set) => ({
    selectedCustomer: null,
    setSelectedCustomer: (Customer) => set(() => ({ selectedCustomer: Customer })),
}));

// Usage in components remains the same
// const { selectedCompany, setSelectedCompany, ... } = useCompanyStore();