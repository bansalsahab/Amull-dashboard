import { pgTable, text, serial, integer, real, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const dashboardMetrics = pgTable("dashboard_metrics", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'demand-supply', 'production', 'logistics', 'market'
  metricName: text("metric_name").notNull(),
  value: real("value").notNull(),
  unit: text("unit"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: json("metadata"), // For additional metric-specific data
});

export const kpiTargets = pgTable("kpi_targets", {
  id: serial("id").primaryKey(),
  metricName: text("metric_name").notNull(),
  targetValue: real("target_value").notNull(),
  thresholdGood: real("threshold_good"),
  thresholdExcellent: real("threshold_excellent"),
});

export const insertDashboardMetricSchema = createInsertSchema(dashboardMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertKpiTargetSchema = createInsertSchema(kpiTargets).omit({
  id: true,
});

export type InsertDashboardMetric = z.infer<typeof insertDashboardMetricSchema>;
export type DashboardMetric = typeof dashboardMetrics.$inferSelect;
export type InsertKpiTarget = z.infer<typeof insertKpiTargetSchema>;
export type KpiTarget = typeof kpiTargets.$inferSelect;
