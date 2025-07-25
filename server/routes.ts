import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { promises as fs } from "fs";
import path from "path";
import express from "express";
import { insertDashboardMetricSchema, insertKpiTargetSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve static data files
  app.use('/data', express.static(path.join(process.cwd(), 'data')));
  
  // Get all dashboard metrics or by category
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const category = req.query.category as string;
      const metrics = await storage.getDashboardMetrics(category);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  });

  // Get latest metrics (one per metric name)
  app.get("/api/dashboard/metrics/latest", async (req, res) => {
    try {
      const metrics = await storage.getLatestMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest metrics" });
    }
  });

  // Add new dashboard metric
  app.post("/api/dashboard/metrics", async (req, res) => {
    try {
      const validatedData = insertDashboardMetricSchema.parse(req.body);
      const metric = await storage.insertDashboardMetric(validatedData);
      res.status(201).json(metric);
    } catch (error) {
      res.status(400).json({ error: "Invalid metric data" });
    }
  });

  // Serve KPI data from JSON file
  app.get("/api/kpis", async (req, res) => {
    try {
      const section = req.query.section as string | undefined;
      const kpiFilePath = path.join(process.cwd(), "data", "kpis.json");
      const raw = await fs.readFile(kpiFilePath, "utf-8");
      let kpis = JSON.parse(raw);
      if (section) {
        kpis = kpis.filter((k: any) => k.section === section);
      }
      res.json(kpis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch KPI data" });
    }
  });

  // Get all KPI targets
  app.get("/api/dashboard/targets", async (req, res) => {
    try {
      const targets = await storage.getKpiTargets();
      res.json(targets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch KPI targets" });
    }
  });

  // Get specific KPI target
  app.get("/api/dashboard/targets/:metricName", async (req, res) => {
    try {
      const target = await storage.getKpiTarget(req.params.metricName);
      if (!target) {
        return res.status(404).json({ error: "Target not found" });
      }
      res.json(target);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch KPI target" });
    }
  });

  // Add new KPI target
  app.post("/api/dashboard/targets", async (req, res) => {
    try {
      const validatedData = insertKpiTargetSchema.parse(req.body);
      const target = await storage.insertKpiTarget(validatedData);
      res.status(201).json(target);
    } catch (error) {
      res.status(400).json({ error: "Invalid target data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
