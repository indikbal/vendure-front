"use client";

import { useQuery } from "@apollo/client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { GET_ACTIVE_ORDER } from "@/graphql/queries";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { ActiveOrder } from "@/lib/definitions";

export function CartIcon() {
  const { data, loading } = useQuery<{ activeOrder: ActiveOrder }>(
    GET_ACTIVE_ORDER
  );
  const itemCount = data?.activeOrder?.totalQuantity ?? 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label="Open cart"
      asChild
    >
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && !loading && (
          <Badge
            variant="default"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground p-0"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
