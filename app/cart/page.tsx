"use client";

import { useQuery } from "@apollo/client";
import { GET_ACTIVE_ORDER } from "@/graphql/queries";
import type { ActiveOrder } from "@/lib/definitions";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, ShoppingCart, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function CartPageSkeleton() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="flex items-center p-4">
                <Skeleton className="h-24 w-24 rounded-md" />
                <div className="ml-4 flex-grow">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-6 w-20" />
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-8 w-3/4" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-12 w-full" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CartPage() {
  const { data, loading, error } = useQuery<{ activeOrder?: ActiveOrder }>(
    GET_ACTIVE_ORDER
  );
  
  if (loading) return <CartPageSkeleton />;

  if (error) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Fetching Cart</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </main>
      </>
    );
  }

  const order = data?.activeOrder;

  if (!order || order.lines.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold font-headline mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping</Link>
            </Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
                {order.lines.map(line => (
                    <Card key={line.id} className="flex items-center p-4 overflow-hidden">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            <Image src={line.featuredAsset.preview} alt={line.productVariant.name} fill className="object-cover" data-ai-hint="product image" />
                        </div>
                        <div className="ml-4 flex-grow">
                            <p className="font-semibold">{line.productVariant.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {line.quantity}</p>
                        </div>
                        <p className="font-semibold text-lg">{formatPrice(line.totalPriceWithTax)}</p>
                    </Card>
                ))}
            </div>
            <div className="lg:col-span-1 sticky top-28">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.totalWithTax)}</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground text-sm mb-4">
                            <span>Taxes & Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-xl mt-4">
                            <span>Total</span>
                            <span>{formatPrice(order.totalWithTax)}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg">Proceed to Checkout</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </main>
    </>
  );
}
