"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_ORDER } from "@/graphql/mutations";
import type { Product } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import { GET_ACTIVE_ORDER } from "@/graphql/queries";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const [addItemToOrder, { loading }] = useMutation(ADD_ITEM_TO_ORDER, {
    refetchQueries: [{ query: GET_ACTIVE_ORDER }],
  });

  const handleAddToCart = async () => {
    const productVariantId = product.productVariantId;

    if (!productVariantId) {
      toast({
        variant: "destructive",
        title: "Product Unavailable",
        description: "This product has no variants and cannot be added to the cart.",
      });
      return;
    }

    try {
      const { data } = await addItemToOrder({
        variables: {
          productVariantId,
          quantity: 1,
        },
      });

      if (data.addItemToOrder.__typename === "Order") {
        toast({
          title: "Added to cart!",
          description: `${product.productName} has been added to your cart.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.addItemToOrder.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const price = product.priceWithTax.value ?? product.priceWithTax.min ?? 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <Image
            src={product.productAsset.preview}
            alt={product.productName}
            fill
            className="object-cover"
            data-ai-hint="product image"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline leading-tight h-12">
          {product.productName}
        </CardTitle>
        <p className="text-xl font-semibold mt-2 text-primary">
          {formatPrice(price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-accent hover:bg-accent/90"
          onClick={handleAddToCart}
          disabled={loading}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
