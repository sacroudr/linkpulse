
"use client";

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

      <button
        onClick={async () => {
          const res = await fetch("/api/links");
          const data = await res.json();
          console.log(data);
        }}
      >
        Check links
      </button>

      <button
        onClick={async () => {
          const id = "542d0c73-ea7a-4831-bbab-4aaa468998d5";
          const res = await fetch(`/api/links/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        Test delete
      </button>

      <button
        onClick={async () => {
          const id = "542d0c73-ea7a-4831-bbab-4aaa468998d5";
          const res = await fetch(`/api/links/${id}/stats`);
          const data = await res.json();
          console.log(data);
        }}
      >
        Test stats
      </button>

    </div>
  );
}