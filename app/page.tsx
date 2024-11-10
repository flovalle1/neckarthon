"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from 'next/image';
import { useEffect, useMemo, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { countMeinungen, Meinung } from "./actions/countMeinungen";
import { fetchUsers } from "./actions/fetchUser";

export interface User {
  name: string;
  number: string;
}
const testUsers: User[] = [
  { name: "Alice", number: "123" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Home() {
  const [usersCount, setUsersCount] = useState<number>(0)
  const [users, setUsers] = useState<User[]>(testUsers)
  const [selectedTab, setSelectedTab] = useState<string>('nutzer')
  const [chartData, setChartData] = useState<Meinung[]>([])

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])


  useEffect(() => {
    const interval = setInterval(() => {
      const fetchAndSetUsers = async () => {
        const resp = await fetchUsers()
        setUsers(resp.users)
        setUsersCount(resp.userCount)
      }
      fetchAndSetUsers();
      const countAndSetMeinungen = async () => {
        const resp = await countMeinungen()
        setChartData(resp.meinungen)
      }
      countAndSetMeinungen();
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid justify-items-center min-h-screen p-8 pb-10 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="nutzer">Nutzerübersicht</TabsTrigger>
          <TabsTrigger value="meinungsbild">Meinungsbild</TabsTrigger>
        </TabsList>
      </Tabs>


      {selectedTab === 'nutzer' && (<><Card className="h-32">
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
        /></>)}


      {selectedTab === 'meinungsbild' && (
        <div className="grid justify-items-center min-h-screen p-8 pb-10 gap-1 sm:p-20 font-[family-name:var(--font-geist-sans)]">

          <Card className="flex flex-col h-96">
            <CardHeader className="items-center pb-0">
              <CardTitle>Ergebnisse Umfrage</CardTitle>
              <CardDescription>Neckarthon WhatsApp Meinungsbild</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Teilnehmer
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
