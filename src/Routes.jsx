import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Home from "pages/Home";
import HomeLandingPage from "pages/home-landing-page";
import ExecutivePerformanceOverviewDashboard from "pages/executive-performance-overview-dashboard";
import RealTimeOperationsMonitoringDashboard from "pages/real-time-operations-monitoring-dashboard";
import CrossProductComparisonDashboard from "pages/cross-product-comparison-dashboard";
import ProductPerformanceAnalyticsDashboard from "pages/product-performance-analytics-dashboard";
import CostAnalyticsDashboard from "pages/cost-analytics-dashboard";
import ProductDetailPage from "pages/ProductDetailPage";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/executive-performance-overview-dashboard" element={<ExecutivePerformanceOverviewDashboard />} />
        <Route path="/real-time-operations-monitoring-dashboard" element={<RealTimeOperationsMonitoringDashboard />} />
        <Route path="/cross-product-comparison-dashboard" element={<CrossProductComparisonDashboard />} />
        <Route path="/product-performance-analytics-dashboard" element={<ProductPerformanceAnalyticsDashboard />} />
        <Route path="/cost-analytics-dashboard" element={<CostAnalyticsDashboard />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;