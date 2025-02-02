"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HabitCard } from "./habit-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function HabitsList({ habits, report }) {
  const goodHabits = habits.filter(habit => habit.type === 'good');
  const badHabits = habits.filter(habit => habit.type === 'bad');

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="good" className="space-y-4">
          <TabsList>
            <TabsTrigger value="good">Good Habits</TabsTrigger>
            <TabsTrigger value="bad">Bad Habits</TabsTrigger>
          </TabsList>
          <TabsContent value="good" className="space-y-4">
            {goodHabits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                progress={report.weeklyProgress[habit.id]}
                streak={report.streaks[habit.id]}
              />
            ))}
          </TabsContent>
          <TabsContent value="bad" className="space-y-4">
            {badHabits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                progress={report.weeklyProgress[habit.id]}
                streak={report.streaks[habit.id]}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
