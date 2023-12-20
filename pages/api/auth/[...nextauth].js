// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function formatTimestampToISO(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toISOString().replace(/\.\d+/, ""); // Remove milliseconds
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "rememberMe", type: "checkbox" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // Return object containing user information
        // Return null to indicate authentication failure
        const user = {
          name: process.env.NEXTAUTH_NAME,
          email: process.env.NEXTAUTH_EMAIL,
          password: process.env.NEXTAUTH_PASSWORD,
          rememberMe: credentials.rememberMe === "true" ? true : false,
        };

        const isValid =
          credentials.email === user.email &&
          credentials.password === user.password;

        return ((await isValid) && user) || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        // User details are only available at initial sign-in
        token.rememberMe = user.rememberMe;
      }

      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const maxDays = 30;
      const oneDayInSeconds = 60 * 60 * 24;
      const expirationTime = token.rememberMe
        ? now + oneDayInSeconds * maxDays // 30 days from now
        : now + oneDayInSeconds; // 1 day from now

      // Set the token expiration time to a fixed duration (e.g., 10 days)
      token.exp = expirationTime;

      return token;
    },

    async session({ session, token }) {
      const now = Math.floor(Date.now() / 1000);
      session.isValid = token.exp > now;

      if (session.isValid) {
        session.expires = formatTimestampToISO(token.exp);
        return session;
      } else {
        // Session is expired
        throw new Error("Session expired");
      }
    },
  },
  session: {
    strategy: "jwt",
  },
});
