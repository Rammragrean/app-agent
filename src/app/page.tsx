'use client';

import { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import TaskCard from '@/components/TaskCard';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Task, TeamMember } from '@/types';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [tasksRes, perfRes] = await Promise.all([
        fetch('/api/notion?type=tasks'),
        fetch('/api/notion?type=performance'),
      ]);

      const tasksData = await tasksRes.json();
      const perfData = await perfRes.json();

      setTasks(tasksData.tasks || []);
      setTeam(perfData.performance || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading Transport CMD...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalTasks: tasks.length,
    completed: tasks.filter(t => t.status === 'Done').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    blocked: tasks.filter(t => t.status === 'Blocked').length,
  };

  const categoryStats = {
    inbound: tasks.filter(t => t.category === 'Inbound').length,
    outbound: tasks.filter(t => t.category === 'Outbound').length,
    internal: tasks.filter(t => t.category === 'Internal').length,
    project: tasks.filter(t => t.category === 'Project').length,
  };

  const completionRate = stats.totalTasks > 0 
    ? ((stats.completed / stats.totalTasks) * 100).toFixed(1) 
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        {/* Development Mode Banner */}
        {tasks.length > 0 && tasks[0].id === '1' && (
          <div className="mb-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-yellow-900">Development Mode</p>
                <p className="text-sm text-yellow-700">
                  Using mock data. Configure <code className="bg-yellow-100 px-2 py-0.5 rounded">NOTION_API_KEY</code> and <code className="bg-yellow-100 px-2 py-0.5 rounded">NOTION_DATABASE_ID</code> in <code className="bg-yellow-100 px-2 py-0.5 rounded">.env.local</code> to connect to Notion.
                </p>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🚛 Transport CMD
        </h1>
        <p className="text-gray-600">
          Real-time logistics command center • {new Date().toLocaleDateString('th-TH', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          subtitle="Active operations"
          color="blue"
          icon={<span className="text-2xl">📋</span>}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          subtitle={`${completionRate}% completion rate`}
          trend="up"
          color="green"
          icon={<span className="text-2xl">✅</span>}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          subtitle="Currently active"
          color="yellow"
          icon={<span className="text-2xl">⚡</span>}
        />
        <StatCard
          title="Blocked"
          value={stats.blocked}
          subtitle="Needs attention"
          trend={stats.blocked > 0 ? 'down' : 'neutral'}
          color="red"
          icon={<span className="text-2xl">🚨</span>}
        />
      </div>

      {/* Category Distribution */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Category Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">📥</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{categoryStats.inbound}</p>
                <p className="text-sm text-gray-600">Inbound</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">📤</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{categoryStats.outbound}</p>
                <p className="text-sm text-gray-600">Outbound</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🔄</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">{categoryStats.internal}</p>
                <p className="text-sm text-gray-600">Internal</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border-2 border-green-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🎯</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{categoryStats.project}</p>
                <p className="text-sm text-gray-600">Project</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">👥 Team Performance</h2>
          <a 
            href="/team" 
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View Trends →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map(member => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Task Grid by Status */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Task Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['In Progress', 'Pending', 'Blocked'].map(status => (
            <div key={status}>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  status === 'In Progress' ? 'bg-blue-500' :
                  status === 'Pending' ? 'bg-gray-500' :
                  'bg-red-500'
                }`} />
                {status} ({tasks.filter(t => t.status === status).length})
              </h3>
              <div className="space-y-3">
                {tasks
                  .filter(t => t.status === status)
                  .slice(0, 5)
                  .map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
