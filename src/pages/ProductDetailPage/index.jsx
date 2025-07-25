import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Zap, Activity, TrendingUp, Cpu, Users, Calendar, Filter, Download, ArrowLeft } from 'lucide-react';

// --- Mock Data ---
const productData = {
    wrapportal: {
        name: 'Wrapportal',
        description: 'AI-powered content wrapping and optimization',
        kpis: [
            { title: 'Total AI Calls', value: '2,847' },
            { title: 'Average Accuracy', value: '92.7%' },
            { title: 'Avg Response Time', value: '98ms' },
            { title: 'Success Rate', value: '96.2%' },
        ],
        accuracyTrend: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, accuracy: 85 + Math.random() * 15 })),
        responseTime: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, time: 80 + Math.random() * 40 })),
        distribution: [{ name: 'Success', value: 274, color: '#10B981' }, { name: 'Warning', value: 8, color: '#F59E0B' }, { name: 'Error', value: 3, color: '#EF4444' }],
        forecast: [
            { name: 'Predicted Accuracy', value: '93.5%', icon: TrendingUp },
            { name: 'Expected Volume', value: '3,120', icon: Zap },
            { name: 'Response Time', value: '89ms', icon: Activity },
        ],
        rawLogs: Array.from({ length: 10 }, (_, i) => ({
            timestamp: `Jun 26, 2025 16:${50 + i}:40`,
            accuracy: `${(85 + Math.random() * 15).toFixed(1)}%`,
            responseTime: `${(80 + Math.random() * 40).toFixed(0)}ms`,
            status: Math.random() > 0.05 ? 'success' : 'warning',
            aiCalls: Math.floor(Math.random() * 20) + 5,
        })),
    },
    anzenn: {
        name: 'Anzenn',
        description: 'Advanced neural network analytics',
        kpis: [
            { title: 'Total AI Calls', value: '3,421' },
            { title: 'Average Accuracy', value: '88.9%' },
            { title: 'Avg Response Time', value: '142ms' },
            { title: 'Success Rate', value: '91.8%' },
        ],
        accuracyTrend: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, accuracy: 80 + Math.random() * 20 })),
        responseTime: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, time: 120 + Math.random() * 50 })),
        distribution: [{ name: 'Success', value: 314, color: '#10B981' }, { name: 'Warning', value: 22, color: '#F59E0B' }, { name: 'Error', value: 7, color: '#EF4444' }],
        forecast: [
            { name: 'Predicted Accuracy', value: '90.2%', icon: TrendingUp },
            { name: 'Expected Volume', value: '3,785', icon: Zap },
            { name: 'Response Time', value: '135ms', icon: Activity },
        ],
        rawLogs: Array.from({ length: 10 }, (_, i) => ({
            timestamp: `Jun 26, 2025 16:${50 + i}:40`,
            accuracy: `${(80 + Math.random() * 20).toFixed(1)}%`,
            responseTime: `${(120 + Math.random() * 50).toFixed(0)}ms`,
            status: Math.random() > 0.08 ? 'success' : 'warning',
            aiCalls: Math.floor(Math.random() * 18) + 3,
        })),
    },
    prequaligy: {
        name: 'Prequaligy',
        description: 'Pre-qualification and quality assessment',
        kpis: [
            { title: 'Total AI Calls', value: '1,953' },
            { title: 'Average Accuracy', value: '85.6%' },
            { title: 'Avg Response Time', value: '178ms' },
            { title: 'Success Rate', value: '87.3%' },
        ],
        accuracyTrend: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, accuracy: 75 + Math.random() * 20 })),
        responseTime: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, time: 150 + Math.random() * 60 })),
        distribution: [{ name: 'Success', value: 170, color: '#10B981' }, { name: 'Warning', value: 19, color: '#F59E0B' }, { name: 'Error', value: 6, color: '#EF4444' }],
        forecast: [
            { name: 'Predicted Accuracy', value: '86.8%', icon: TrendingUp },
            { name: 'Expected Volume', value: '2,241', icon: Zap },
            { name: 'Response Time', value: '165ms', icon: Activity },
        ],
        rawLogs: Array.from({ length: 10 }, (_, i) => ({
            timestamp: `Jun 26, 2025 16:${50 + i}:40`,
            accuracy: `${(75 + Math.random() * 20).toFixed(1)}%`,
            responseTime: `${(150 + Math.random() * 60).toFixed(0)}ms`,
            status: Math.random() > 0.12 ? 'success' : 'warning',
            aiCalls: Math.floor(Math.random() * 12) + 2,
        })),
    },
    asuretify: {
        name: 'Asuretify',
        description: 'Assurance and verification platform',
        kpis: [
            { title: 'Total AI Calls', value: '1,692' },
            { title: 'Average Accuracy', value: '80.4%' },
            { title: 'Avg Response Time', value: '155ms' },
            { title: 'Success Rate', value: '89.4%' },
        ],
        accuracyTrend: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, accuracy: 70 + Math.random() * 25 })),
        responseTime: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, time: 100 + Math.random() * 95 })),
        distribution: [{ name: 'Success', value: 131, color: '#10B981' }, { name: 'Warning', value: 18, color: '#F59E0B' }, { name: 'Error', value: 13, color: '#EF4444' }],
        forecast: [
            { name: 'Predicted Accuracy', value: '81.0%', icon: TrendingUp },
            { name: 'Expected Volume', value: '1,984', icon: Zap },
            { name: 'Response Time', value: '141ms', icon: Activity },
        ],
        rawLogs: Array.from({ length: 10 }, (_, i) => ({
            timestamp: `Jun 26, 2025 16:${50 + i}:40`,
            accuracy: `${(70 + Math.random() * 25).toFixed(1)}%`,
            responseTime: `${(100 + Math.random() * 95).toFixed(0)}ms`,
            status: Math.random() > 0.1 ? 'success' : 'warning',
            aiCalls: Math.floor(Math.random() * 15) + 1,
        })),
    },
    riskguru: {
        name: 'Riskguru',
        description: 'Risk assessment and management',
        kpis: [
            { title: 'Total AI Calls', value: '2,156' },
            { title: 'Average Accuracy', value: '93.2%' },
            { title: 'Avg Response Time', value: '127ms' },
            { title: 'Success Rate', value: '94.7%' },
        ],
        accuracyTrend: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, accuracy: 88 + Math.random() * 12 })),
        responseTime: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, time: 100 + Math.random() * 55 })),
        distribution: [{ name: 'Success', value: 204, color: '#10B981' }, { name: 'Warning', value: 9, color: '#F59E0B' }, { name: 'Error', value: 3, color: '#EF4444' }],
        forecast: [
            { name: 'Predicted Accuracy', value: '94.1%', icon: TrendingUp },
            { name: 'Expected Volume', value: '2,498', icon: Zap },
            { name: 'Response Time', value: '119ms', icon: Activity },
        ],
        rawLogs: Array.from({ length: 10 }, (_, i) => ({
            timestamp: `Jun 26, 2025 16:${50 + i}:40`,
            accuracy: `${(88 + Math.random() * 12).toFixed(1)}%`,
            responseTime: `${(100 + Math.random() * 55).toFixed(0)}ms`,
            status: Math.random() > 0.05 ? 'success' : 'warning',
            aiCalls: Math.floor(Math.random() * 16) + 4,
        })),
    },
    kinetic: {
        name: 'Kinetic',
        description: 'Dynamic process optimization',
        kpis: [
            { title: 'Total AI Calls', value: '4,287' },
            { title: 'Average Accuracy', value: '91.6%' },
            { title: 'Avg Response Time', value: '103ms' },
            { title: 'Success Rate', value: '95.8%' },
        ],
        accuracyTrend: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, accuracy: 87 + Math.random() * 13 })),
        responseTime: Array.from({ length: 20 }, (_, i) => ({ name: `Jul ${21 + i % 5}`, time: 85 + Math.random() * 35 })),
        distribution: [{ name: 'Success', value: 411, color: '#10B981' }, { name: 'Warning', value: 15, color: '#F59E0B' }, { name: 'Error', value: 3, color: '#EF4444' }],
        forecast: [
            { name: 'Predicted Accuracy', value: '92.4%', icon: TrendingUp },
            { name: 'Expected Volume', value: '4,856', icon: Zap },
            { name: 'Response Time', value: '97ms', icon: Activity },
        ],
        rawLogs: Array.from({ length: 10 }, (_, i) => ({
            timestamp: `Jun 26, 2025 16:${50 + i}:40`,
            accuracy: `${(87 + Math.random() * 13).toFixed(1)}%`,
            responseTime: `${(85 + Math.random() * 35).toFixed(0)}ms`,
            status: Math.random() > 0.04 ? 'success' : 'warning',
            aiCalls: Math.floor(Math.random() * 25) + 8,
        })),
    }
};

const KPICard = ({ title, value }) => (
    <div className="bg-white border border-slate-200/50 rounded-2xl p-6 text-center shadow-lg">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
    </div>
);

const ChartContainer = ({ title, children }) => (
    <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-lg h-full">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                {children}
            </ResponsiveContainer>
        </div>
    </div>
);

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const data = productData[productId];
  
  // If product not found, show error state
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center h-64">
              <h1 className="text-3xl font-bold text-slate-800 mb-4">Product Not Found</h1>
              <p className="text-slate-500 mb-6">The product "{productId}" does not exist.</p>
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-slate-200">
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{data.name}</h1>
                    <p className="text-slate-500">{data.description}</p>
                </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {data.kpis.map(kpi => <KPICard key={kpi.title} {...kpi} />)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ChartContainer title="Accuracy Trend">
                <LineChart data={data.accuracyTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="accuracy" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
            </ChartContainer>
            <ChartContainer title="Response Time">
                <BarChart data={data.responseTime}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="time" fill="#F59E0B" />
                </BarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ChartContainer title="Success vs Failure Distribution">
                <PieChart>
                    <Pie data={data.distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                        {data.distribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ChartContainer>
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">7-Day Performance Forecast</h3>
                <div className="space-y-4">
                    {data.forecast.map(item => (
                        <div key={item.name} className="bg-white border border-slate-200/50 rounded-2xl p-4 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-4">
                                <item.icon className="w-6 h-6 text-slate-500" />
                                <p className="font-semibold text-slate-800">{item.name}</p>
                            </div>
                            <p className="text-xl font-bold text-slate-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Raw Data Log</h3>
            <div className="bg-white border border-slate-200/50 rounded-2xl shadow-lg">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-200/50">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-500">Timestamp</th>
                            <th className="p-4 text-sm font-semibold text-slate-500">Accuracy</th>
                            <th className="p-4 text-sm font-semibold text-slate-500">Response Time</th>
                            <th className="p-4 text-sm font-semibold text-slate-500">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-500">AI Calls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.rawLogs.map((log, i) => (
                            <tr key={i} className="border-b border-slate-200/50 last:border-0">
                                <td className="p-4 text-sm text-slate-800">{log.timestamp}</td>
                                <td className="p-4 text-sm text-slate-800">{log.accuracy}</td>
                                <td className="p-4 text-sm text-slate-800">{log.responseTime}</td>
                                <td className="p-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-slate-800">{log.aiCalls}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
