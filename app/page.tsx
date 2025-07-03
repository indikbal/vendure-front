import { getClient } from "@/lib/apollo-client";
import { GET_PRODUCTS } from "@/graphql/queries";
import type { Product } from "@/lib/definitions";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const revalidate = 5; // Revalidate the data every 5 seconds

export default async function Home() {
  let products: Product[] = [];
  let error: Error | undefined;
  let rawData: any;

  try {
    const { data } = await getClient().query({
      query: GET_PRODUCTS,
      context: {
        fetchOptions: {
          next: { revalidate: 5 },
        },
      },
    });
    rawData = data;
    products = data?.search?.items || [];
  } catch (e: any) {
    error = e;
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight mb-8">
          Welcome to Vendurefront
        </h1>
        {error ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Fetching Products</AlertTitle>
            <AlertDescription>
              An error occurred while fetching products from the Vendure API.
              This could be a network issue, an invalid API configuration, or a
              problem with the GraphQL query.
              <pre className="mt-2 text-xs bg-gray-800 text-white p-2 rounded">
                {error.message}
              </pre>
            </AlertDescription>
          </Alert>
        ) : products.length === 0 ? (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>No Products Found</AlertTitle>
            <AlertDescription>
              <p>
                Your store is connected, but the API isn't returning any
                products. This usually means products aren't available in the
                current channel or are disabled.
              </p>
              <p className="font-bold mt-4">
                Things to check in your Vendure admin:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Are your products marked as "Enabled"?</li>
                <li>Are they assigned to the current sales channel?</li>
                <li>
                  Try running the "Re-index search index" job from the
                  "System" &gt; "Jobs" menu.
                </li>
              </ul>
              <details className="mt-4 text-xs cursor-pointer">
                <summary>Raw API Response (for debugging)</summary>
                <pre className="mt-2 bg-gray-800 text-white p-2 rounded">
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              </details>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
