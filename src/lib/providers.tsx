"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { PropsWithChildren } from "react"

const queryCilent = new QueryClient()

const client = new ApolloClient({
  uri: "https://strapi.edify.club/graphql", // Replace with actual endpoint
  cache: new InMemoryCache(),
})

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryCilent}>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
          refetchInterval={1500}
        >
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
