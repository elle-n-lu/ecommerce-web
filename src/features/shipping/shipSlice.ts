
export type shippingAddress={ streetAddress: string;
  city: string;
  state: string;
  postCode: string;
};
export interface shipping {
  shipping: {
    firstName: string;
    lastName: string;
    contact: string;
    shippingAddress: shippingAddress    
  };
}


