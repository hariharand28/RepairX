import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],
  user: null,
  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, { ...item, quantity: 1 }] })),
  
  // This is the missing function fixing your error:
  removeFromCart: (id) => set((state) => ({ 
    cart: state.cart.filter(item => item.id !== id) 
  })),
  
  clearCart: () => set({ cart: [] })
}));

export default useStore;