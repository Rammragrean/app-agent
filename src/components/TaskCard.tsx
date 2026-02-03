import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusColors: any = {
    'Done': 'bg-green-100 text-green-800 border-green-300',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
    'Pending': 'bg-gray-100 text-gray-800 border-gray-300',
    'Blocked': 'bg-red-100 text-red-800 border-red-300',
  };

  const priorityBadge: any = {
    'High': 'bg-red-500',
    'Medium': 'bg-yellow-500',
    'Low': 'bg-green-500',
  };

  const categoryIcons: any = {
    'Inbound': '📥',
    'Outbound': '📤',
    'Internal': '🔄',
    'Project': '🎯',
  };

  const categoryColors: any = {
    'Inbound': 'text-blue-600 bg-blue-50',
    'Outbound': 'text-purple-600 bg-purple-50',
    'Internal': 'text-orange-600 bg-orange-50',
    'Project': 'text-green-600 bg-green-50',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-8 rounded ${priorityBadge[task.priority]}`} />
          <div>
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
              {categoryIcons[task.category]} {task.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">{task.assignee}</span>
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              {new Date(task.dueDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
