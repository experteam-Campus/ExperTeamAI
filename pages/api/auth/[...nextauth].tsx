import Nextauth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import MicrosoftProvider from "next-auth/providers/azure-ad"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_KEY!,
    }),
    // ...add more providers here
    MicrosoftProvider({
        clientId: process.env.MICROSOFT_ID!,
        clientSecret: process.env.MICROSOFT_KEY!,
      }),
  ],
}
export default Nextauth(authOptions)