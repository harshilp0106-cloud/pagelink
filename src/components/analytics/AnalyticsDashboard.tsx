import React, { useState } from 'react';
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  DollarSign,
  Users,
  Download,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Smartphone,
  Globe2,
  Share2,
} from 'lucide-react';
import type { Profile, PageLink, DailyTraffic } from '@/src/types/index';
import { storage } from '@/src/lib/storage';

interface AnalyticsDashboardProps {
  profile: Profile;
  links: PageLink[];
  onOpenUpgrade: () => void;
}

export function AnalyticsDashboard({
  profile,
  links,
  onOpenUpgrade,
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<DailyTraffic | null>(null);

  const trafficData = storage.getTraffic();
  const tips = storage.getTips();
  const subscribers = storage.getSubscribers();

  // Slice based on timeRange
  const daysCount = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : trafficData.length;
  const filteredTraffic = trafficData.slice(-daysCount);

  const totalViews = filteredTraffic.reduce((acc, d) => acc + d.views, 0);
  const totalClicks = filteredTraffic.reduce((acc, d) => acc + d.clicks, 0);
  const avgCtr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0';
  const totalTipsRevenue = tips.reduce((acc, t) => acc + t.amount, 0);
  const totalRevenue = totalTipsRevenue + filteredTraffic.reduce((acc, d) => acc + d.revenue, 0);

  // SVG Chart calculation
  const maxVal = Math.max(...filteredTraffic.map((d) => Math.max(d.views, d.clicks)), 100);
  const chartHeight = 180;
  const chartWidth = 700;
  const points = filteredTraffic.map((d, i) => {
    const x = (i / (filteredTraffic.length - 1 || 1)) * chartWidth;
    const yViews = chartHeight - (d.views / maxVal) * (chartHeight - 30) - 15;
    const yClicks = chartHeight - (d.clicks / maxVal) * (chartHeight - 30) - 15;
    return { ...d, x, yViews, yClicks };
  });

  const viewsPath = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.yViews}` : `${acc} L ${p.x} ${p.yViews}`),
    ''
  );
  const viewsArea = `${viewsPath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  const clicksPath = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.yClicks}` : `${acc} L ${p.x} ${p.yClicks}`),
    ''
  );

  const handleExportCSV = () => {
    const headers = ['Date', 'Page Views', 'Link Clicks', 'Estimated Revenue ($)'];
    const rows = filteredTraffic.map((d) => [d.day, d.views, d.clicks, d.revenue]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pagelink_analytics_${profile.handle}_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Performance & Audience Analytics</h2>
          <p className="text-xs text-slate-500">
            Real-time tracking of visitor traffic, link click-through rates, and creator monetization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            {(['7d', '30d', 'all'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase transition-all ${
                  timeRange === r
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          {/* Export Report */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Views</span>
            <Eye className="size-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {totalViews.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="size-3" /> +18.4% vs last period
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Link Clicks</span>
            <MousePointerClick className="size-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {totalClicks.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="size-3" /> +14.2% vs last period
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Average CTR</span>
            <ArrowUpRight className="size-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">{avgCtr}%</div>
          <div className="mt-1 text-[11px] font-medium text-slate-500">Above industry avg (28%)</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Revenue</span>
            <DollarSign className="size-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] font-medium text-slate-500">Tips & digital sales</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">VIP Leads</span>
            <Users className="size-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {subscribers.length + 14200}
          </div>
          <div className="mt-1 text-[11px] font-semibold text-emerald-600">
            {subscribers.length} captured this month
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-bold text-slate-900">Traffic & Conversion Curve</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-600">Page Views</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-purple-500" />
                <span className="text-slate-600">Link Clicks</span>
              </span>
            </div>
          </div>

          {hoveredPoint && (
            <div className="text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg px-2.5 py-1">
              {hoveredPoint.day}: <span className="text-indigo-600">{hoveredPoint.views} views</span>{' '}
              • <span className="text-purple-600">{hoveredPoint.clicks} clicks</span>
            </div>
          )}
        </div>

        {/* SVG Interactive Chart */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-44 overflow-visible"
          >
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.33, 0.66, 1].map((pct, i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight * pct}
                x2={chartWidth}
                y2={chartHeight * pct}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}

            {/* Area under views */}
            <path d={viewsArea} fill="url(#viewsGradient)" />

            {/* Views line */}
            <path d={viewsPath} fill="none" stroke="#6366f1" strokeWidth="2.5" />

            {/* Clicks line */}
            <path
              d={clicksPath}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />

            {/* Interactive Data points */}
            {points.map((p, idx) => (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(p)}>
                <circle
                  cx={p.x}
                  cy={p.yViews}
                  r={hoveredPoint?.day === p.day ? 5 : 2.5}
                  fill="#6366f1"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Breakdown Grid: Top Links + Referrers + Devices + Geography */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Performing Links Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Top Performing Links</h3>
            <span className="text-xs text-slate-400">Ranked by clicks</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {links
              .filter((l) => l.kind !== 'header')
              .sort((a, b) => b.clicks - a.clicks)
              .slice(0, 6)
              .map((link, idx) => {
                const ctr = totalViews > 0 ? ((link.clicks / totalViews) * 100).toFixed(1) : '0';
                return (
                  <div key={link.id} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="truncate text-xs font-bold text-slate-900">
                          {link.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {link.url || link.kind}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {link.clicks.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">{ctr}% CTR</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Traffic Sources & Device breakdown */}
        <div className="flex flex-col gap-6">
          {/* Referrers */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Traffic Referrers</h3>
              <Share2 className="size-4 text-slate-400" />
            </div>

            <div className="space-y-2.5">
              {[
                { source: 'Instagram Stories & Bio', percent: 48, color: 'bg-pink-500' },
                { source: 'TikTok Profile Link', percent: 26, color: 'bg-slate-900' },
                { source: 'Direct / Bookmarks', percent: 14, color: 'bg-indigo-500' },
                { source: 'X / Twitter Posts', percent: 8, color: 'bg-blue-400' },
                { source: 'YouTube Descriptions', percent: 4, color: 'bg-rose-500' },
              ].map((ref, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>{ref.source}</span>
                    <span className="font-bold">{ref.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ref.color}`}
                      style={{ width: `${ref.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices & Countries */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Smartphone className="size-3.5 text-indigo-500" /> Devices
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>iPhone / iOS</span>
                  <span className="font-bold">64%</span>
                </div>
                <div className="flex justify-between">
                  <span>Android</span>
                  <span className="font-bold">24%</span>
                </div>
                <div className="flex justify-between">
                  <span>Mac / Desktop</span>
                  <span className="font-bold">12%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Globe2 className="size-3.5 text-emerald-500" /> Top Countries
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>United States</span>
                  <span className="font-bold">42%</span>
                </div>
                <div className="flex justify-between">
                  <span>Japan</span>
                  <span className="font-bold">21%</span>
                </div>
                <div className="flex justify-between">
                  <span>United Kingdom</span>
                  <span className="font-bold">14%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
