export type Product = {
  productId: string;
  productName: string;
  slug: string;
  description: string;
  productAsset: {
    preview: string;
  };
  priceWithTax: {
    __typename: "SinglePrice" | "PriceRange";
    value?: number;
    min?: number;
    max?: number;
  };
  productVariantId: string;
};

export type OrderLine = {
  id: string;
  quantity: number;
  totalPriceWithTax: number;
  featuredAsset: {
    preview: string;
  };
  productVariant: {
    id: string;
    name: string;
  };
};

export type ActiveOrder = {
  id: string;
  code: string;
  state: string;
  lines: OrderLine[];
  totalWithTax: number;
  totalQuantity: number;
};
