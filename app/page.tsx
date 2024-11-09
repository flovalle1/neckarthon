"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface User {
  name: string;
  number: string;
}
const testUsers: User[] = [
  { name: "Alice", number: "123" },
  { name: "Bob", number: "456" },
  { name: "Charlie", number: "789" },
];

export default function Home() {
  const [usersCount, setUsersCount] = useState<number>(0)
  const [users, setUsers] = useState<User[]>(testUsers)


  useEffect(() => {
    const eventSource = new EventSource('/api/realtime');

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log('Received an event:', data);
      setUsersCount(data.after.one)
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Registrierte Nutzer
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usersCount}</div>
          <p className="text-xs text-muted-foreground">
            Bei WhatsApp registriert
          </p>
          <Button>Testbutton</Button>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {users.map((user) => {
          return (
            <div className="space-y-1" key={user.name}>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/02.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
