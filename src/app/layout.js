'use client'
import { useEffect } from "react";
import "./globals.css"
import { Provider} from "react-redux";
import store from "@/reduxtoolkit/store/store";

export default function RootLayout({ children }) {
  

  useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await fetch("/api/UserAuth/refreshtoken", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Refresh failed:", data.message);
        // Optionally: dispatch logout here
      } else {
        console.log("Token refreshed.");
        // Optionally: update Redux access token if you store it
      }
    } catch (err) {
      console.error("Refresh error:", err.message);
    }
  }, 10 * 60 * 1000); // every 10 minutes

  return () => clearInterval(interval);
}, []);


  // Render the app's children wrapped inside basic HTML structure
  return (
    <html lang="en">
      <body>
       <Provider store={store}>
         {children}
       </Provider>
      </body>
    </html>
  );
}


/* 'use client':
Marks this file as a client component in Next.js (so hooks like useEffect can be used).

useEffect with empty dependency []:
Runs once on component mount to set up the token refresh interval.

setInterval():
Every 10 minutes, it sends a POST request to your backend at /api/UserAuth/refresh to get a new access token.

credentials: 'include':
Ensures cookies (like your refresh token) are sent along with the request, needed for token validation on the server.

clearInterval():
Prevents memory leaks by clearing the interval when the component unmounts.

HTML wrapper:
Your children components (your app's con


  Why do this?
This is a common pattern for apps using JWT access & refresh tokens.

Automatically refreshing tokens keeps users logged in smoothly without forcing them to re-login frequently.

Running this in your root layout ensures the refresh logic is active on every page.
 */
