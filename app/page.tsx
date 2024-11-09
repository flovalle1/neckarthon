"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from 'next/image';
import { useEffect, useState } from "react";

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
import { fetchUsers } from "./actions/fetchUser";

export interface User {
  name: string;
  number: string;
}
const testUsers: User[] = [
  { name: "Alice", number: "123" },
];

export default function Home() {
  const [usersCount, setUsersCount] = useState<number>(0)
  const [users, setUsers] = useState<User[]>(testUsers)


  useEffect(() => {
    console.log("runs")
    const fetchAndSetUsers = async () => {
      const resp = await fetchUsers()
      setUsers(resp.users)
      setUsersCount(resp.userCount)
    }
    fetchAndSetUsers();
    const eventSource = new EventSource('/api/realtime');
    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log('Received an event:', data);
      setUsersCount((prev) => prev + 1)
      setUsers((prev) => [...prev, data.created]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="grid justify-items-center min-h-screen p-8 pb-10 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Nutzerübersicht</TabsTrigger>
          <TabsTrigger value="analytics">Meinungsbild</TabsTrigger>
          <TabsTrigger value="reports">Ideenfindung</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="h-32">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Registrierte Nutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usersCount}</div>
          <p className="text-xs text-muted-foreground">Bei WhatsApp registriert</p>
        </CardContent>
      </Card>
      <div className="space-y-3 h-96 overflow-y-scroll">
        {users.map((user) => {
          return (
            <div className="space-y-1" key={user.name}>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/02.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 mr-8 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Image
        src="/qr-code-neckar.png"
        alt="Fixed Image"
        width={300}
        height={300}
        className="fixed top-1/2 transform -translate-y-1/2"
        style={{ right: '180px' }}
      />
    </div>
  );
}
