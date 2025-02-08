"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie"; // Import for authentication

interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  taskId: string;
  description: string;
  startTime: string;
  endTime: string | null;
  totalTime: number | null;
  project: {
    id: string;
    name: string;
    description: string;
    userId: string;
  };
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    userId: string;
    projectId: string;
    estimatedHours: number;
    createdAt: string;
    updatedAt: string;
  };
}

export function TimeTrackerEntries() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = Cookies.get("token"); // Get auth token
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("http://localhost:3000/time-entry", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch time entries");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          console.error("Unexpected data format:", data);
          setEntries([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Time Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : entries.length > 0 ? (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="text-lg font-semibold">{entry.project.name}</p>
                  <p className="text-sm text-gray-500">
                    {entry.startTime} - {entry.endTime ?? "Ongoing"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No time entries found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
