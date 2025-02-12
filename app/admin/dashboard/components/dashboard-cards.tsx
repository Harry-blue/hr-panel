"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

interface StatsData {
  current: number;
  change: number;
}

interface DashboardCardsProps {
  stats: {
    totalInterviews: StatsData;
    completedInterviews: StatsData;
    pendingInterviews: StatsData;
    totalCandidates: StatsData;
  };
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  const cards = [
    {
      title: "Total Interviews",
      value: stats.totalInterviews.current,
      change: stats.totalInterviews.change,
      icon: Calendar,
    },
    {
      title: "Completed",
      value: stats.completedInterviews.current,
      change: stats.completedInterviews.change,
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: stats.pendingInterviews.current,
      change: stats.pendingInterviews.change,
      icon: Clock,
    },
    {
      title: "Total Candidates",
      value: stats.totalCandidates.current,
      change: stats.totalCandidates.change,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.change >= 0 ? "+" : ""}
                {card.change.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
