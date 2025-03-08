import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

export default function Home() {
  const { data } = useQuery(HELLO_QUERY);
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button>¡Hola, Shadcn!</Button>
      <h1 className="text-2xl font-bold">{data?.hello}</h1>
    </main>
  );
}