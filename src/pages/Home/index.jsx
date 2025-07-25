import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Zap, Activity, TrendingUp, Cpu, Users, Calendar, Filter, Download } from 'lucide-react';

// --- Mock Data ---
const kpiData = [
  { title: 'Total AI Calls', value: 1200000, unit: 'calls', change: 12, trend: 'up', icon: 'Zap', color: 'primary' },
  { title: 'Avg. Accuracy', value: 98.5, unit: '%', change: 0.5, trend: 'up', icon: 'TrendingUp', color: 'success' },
  { title: 'Avg. Response Time', value: 147, unit: 'ms', change: -3, trend: 'down', icon: 'Activity', color: 'secondary' },
  { title: 'Active Models', value: 6, unit: 'models', change: 1, trend: 'up', icon: 'Cpu', color: 'accent' },
];

const usageByProduct = [
  { name: 'Wrapportal', value: 400, color: '#6366F1' },
  { name: 'Kinetic', value: 300, color: '#8B5CF6' },
  { name: 'Asureify', value: 300, color: '#EC4899' },
  { name: 'Riskguru', value: 200, color: '#F59E0B' },
];

const monthlyTrends = [
  { name: 'Jan', calls: 4000 },
  { name: 'Feb', calls: 3000 },
  { name: 'Mar', calls: 5000 },
  { name: 'Apr', calls: 4780 },
  { name: 'May', calls: 5890 },
  { name: 'Jun', calls: 4390 },
  { name: 'Jul', calls: 6490 },
];

const modelUtilization = [
    { name: 'GPT-4', usage: 45, color: '#6366F1' },
    { name: 'Claude 3', usage: 30, color: '#8B5CF6' },
    { name: 'Gemini Pro', usage: 15, color: '#EC4899' },
    { name: 'Other', usage: 10, color: '#F59E0B' },
];

import KPICard from '../executive-performance-overview-dashboard/components/KPICard';

const ChartContainer = ({ title, children }) => (
    <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-lg h-full">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                {children}
            </ResponsiveContainer>
        </div>
    </div>
);


const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filteredModelUtilization = selectedProduct ? modelUtilization.filter(model => model.product === selectedProduct) : modelUtilization;
  const filteredMonthlyTrends = monthlyTrends;
  const filteredUsageByProduct = usageByProduct;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header setSelectedProduct={setSelectedProduct} />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Dashboard Header */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">AI Analytics Dashboard</h1>
              <p className="text-slate-500">Main overview of AI usage and performance.</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Last 30 days</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData.map(item => <KPICard key={item.title} {...item} />)}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
                <ChartContainer title="Monthly AI Call Trends">
                    <LineChart data={filteredMonthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#F8FAFC' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                        <Line type="monotone" dataKey="calls" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }} />
                    </LineChart>
                </ChartContainer>
            </div>
            <div>
                <ChartContainer title="Usage by Product">
                     <PieChart>
                        <Pie data={filteredUsageByProduct} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {usageByProduct.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#F8FAFC' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                    </PieChart>
                </ChartContainer>
            </div>
          </div>

          {/* Model Utilization */}
           <div>
               <ChartContainer title="Model Utilization">
                    <BarChart data={filteredModelUtilization} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#F8FAFC' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                        <Bar dataKey="usage" fill="#8884d8" background={{ fill: '#eee' }}>
                             {modelUtilization.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                    </BarChart>
               </ChartContainer>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
