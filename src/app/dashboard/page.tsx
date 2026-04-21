// import { auth, signOut } from "../../../lib/auth";

// export default async function DashboardPage() {
//   const session = await auth();

//   return (
//     <div className="p-8">
//       <p className="text-sm text-gray-600">
//         Signed in as {session?.user?.email}
//       </p>
//       <form
//         action={async () => {
//           "use server";
//           await signOut({ redirectTo: "/login" });
//         }}
//       >
//         <button type="submit" className="mt-4 text-sm underline">
//           Sign out
//         </button>

//         {/* // Add this button to app/dashboard/page.tsx temporarily */}
//         <button
//         onClick={async () => {
//             const res = await fetch("/api/links", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ originalUrl: "https://google.com" }),
//             });
//             const data = await res.json();
//             console.log(data);
//         }}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-sm"
//         >
//         Test create link
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { signOut } from "next-auth/react"; // switch to next-auth/react for client

export default function DashboardPage() {
  return (
    <div className="p-8">
      <button
        onClick={async () => {
          const res = await fetch("/api/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalUrl: "https://google.com" }),
          });
          const data = await res.json();
          console.log(data);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
      >
        Test create link
      </button>

      <button
        onClick={async () => {
          const res = await fetch("/api/links");
          const data = await res.json();
          console.log(data);
        }}
        className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded text-sm"
      >
        Test get links
      </button>
    </div>
  );
}