import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    search(input: { term: "", take: 20, groupByProduct: true }) {
      items {
        productId
        productName
        slug
        description
        productAsset {
          preview
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        productVariantId
      }
    }
  }
`;

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      id
      code
      state
      lines {
        id
        quantity
        totalPriceWithTax
        featuredAsset {
          preview
        }
        productVariant {
          id
          name
        }
      }
      totalWithTax
      totalQuantity
    }
  }
`;
