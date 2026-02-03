import { TeamMember } from '@/types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const performanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const total = member.tasksCompleted + member.tasksInProgress + member.tasksPending;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {member.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
        <div className={`px-3 py-1 rounded-full font-bold ${performanceColor(member.performance)}`}>
          {member.performance.toFixed(0)}%
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-2xl font-bold text-green-600">{member.tasksCompleted}</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">{member.tasksInProgress}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-600">{member.tasksPending}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all"
          style={{ width: `${total > 0 ? (member.tasksCompleted / total) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
}
