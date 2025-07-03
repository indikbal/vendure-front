import { gql } from "@apollo/client";

export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(
      productVariantId: $productVariantId
      quantity: $quantity
    ) {
      __typename
      ... on Order {
        id
        totalQuantity
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
