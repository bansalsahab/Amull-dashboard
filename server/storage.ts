import { dashboardMetrics, kpiTargets, type DashboardMetric, type InsertDashboardMetric, type KpiTarget, type InsertKpiTarget } from "@shared/schema";

export interface IStorage {
  // Dashboard metrics
  getDashboardMetrics(category?: string): Promise<DashboardMetric[]>;
  getLatestMetrics(): Promise<DashboardMetric[]>;
  insertDashboardMetric(metric: InsertDashboardMetric): Promise<DashboardMetric>;
  
  // KPI targets
  getKpiTargets(): Promise<KpiTarget[]>;
  getKpiTarget(metricName: string): Promise<KpiTarget | undefined>;
  insertKpiTarget(target: InsertKpiTarget): Promise<KpiTarget>;
}

export class MemStorage implements IStorage {
  private metrics: Map<number, DashboardMetric>;
  private targets: Map<number, KpiTarget>;
  private currentMetricId: number;
  private currentTargetId: number;

  constructor() {
    this.metrics = new Map();
    this.targets = new Map();
    this.currentMetricId = 1;
    this.currentTargetId = 1;
    
    // Initialize with some sample targets for demonstration
    this.initializeSampleTargets();
  }

  private initializeSampleTargets() {
    const sampleTargets = [
      { metricName: "orderFillRate", targetValue: 95, thresholdGood: 90, thresholdExcellent: 95 },
      { metricName: "forecastAccuracy", targetValue: 85, thresholdGood: 80, thresholdExcellent: 90 },
      { metricName: "plantUtilization", targetValue: 80, thresholdGood: 75, thresholdExcellent: 85 },
      { metricName: "onTimeDispatch", targetValue: 95, thresholdGood: 90, thresholdExcellent: 95 },
    ];

    sampleTargets.forEach(target => {
      const id = this.currentTargetId++;
      this.targets.set(id, { ...target, id });
    });
  }

  async getDashboardMetrics(category?: string): Promise<DashboardMetric[]> {
    const allMetrics = Array.from(this.metrics.values());
    if (category) {
      return allMetrics.filter(metric => metric.category === category);
    }
    return allMetrics;
  }

  async getLatestMetrics(): Promise<DashboardMetric[]> {
    const metricsByName = new Map<string, DashboardMetric>();
    
    Array.from(this.metrics.values()).forEach(metric => {
      const existing = metricsByName.get(metric.metricName);
      if (!existing || new Date(metric.timestamp) > new Date(existing.timestamp)) {
        metricsByName.set(metric.metricName, metric);
      }
    });
    
    return Array.from(metricsByName.values());
  }

  async insertDashboardMetric(insertMetric: InsertDashboardMetric): Promise<DashboardMetric> {
    const id = this.currentMetricId++;
    const metric: DashboardMetric = {
      ...insertMetric,
      id,
      timestamp: new Date(),
      metadata: insertMetric.metadata || null,
    };
    this.metrics.set(id, metric);
    return metric;
  }

  async getKpiTargets(): Promise<KpiTarget[]> {
    return Array.from(this.targets.values());
  }

  async getKpiTarget(metricName: string): Promise<KpiTarget | undefined> {
    return Array.from(this.targets.values()).find(target => target.metricName === metricName);
  }

  async insertKpiTarget(insertTarget: InsertKpiTarget): Promise<KpiTarget> {
    const id = this.currentTargetId++;
    const target: KpiTarget = {
      ...insertTarget,
      id,
      thresholdGood: insertTarget.thresholdGood || null,
      thresholdExcellent: insertTarget.thresholdExcellent || null,
    };
    this.targets.set(id, target);
    return target;
  }
}

export const storage = new MemStorage();
