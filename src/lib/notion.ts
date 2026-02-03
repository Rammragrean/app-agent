import { Client } from '@notionhq/client';

// Development mode check
const isDevelopment = process.env.NODE_ENV === 'development';
const hasNotionCreds = !!(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);

const notion = hasNotionCreds ? new Client({
  auth: process.env.NOTION_API_KEY,
}) : null;

export const getDatabaseId = () => process.env.NOTION_DATABASE_ID!;

// Mock data for development
const MOCK_TASKS = [
  {
    id: '1',
    title: 'ตรวจรับสินค้า Container A',
    status: 'In Progress',
    assignee: 'Supervisor A',
    priority: 'High',
    dueDate: '2026-02-05',
    category: 'Inbound',
  },
  {
    id: '2',
    title: 'จัดส่งสินค้าไปลูกค้า XYZ',
    status: 'Pending',
    assignee: 'Staff 1',
    priority: 'High',
    dueDate: '2026-02-04',
    category: 'Outbound',
  },
  {
    id: '3',
    title: 'ตรวจสอบสต็อกคลังสินค้า',
    status: 'Done',
    assignee: 'Supervisor B',
    priority: 'Medium',
    dueDate: '2026-02-03',
    category: 'Internal',
  },
  {
    id: '4',
    title: 'วางแผน Automation System',
    status: 'In Progress',
    assignee: 'Supervisor A',
    priority: 'High',
    dueDate: '2026-02-10',
    category: 'Project',
  },
  {
    id: '5',
    title: 'รับสินค้า Import จากท่าเรือ',
    status: 'In Progress',
    assignee: 'Staff 2',
    priority: 'High',
    dueDate: '2026-02-04',
    category: 'Inbound',
  },
  {
    id: '6',
    title: 'จัดเตรียมเอกสาร Export',
    status: 'Pending',
    assignee: 'Staff 3',
    priority: 'Medium',
    dueDate: '2026-02-06',
    category: 'Outbound',
  },
  {
    id: '7',
    title: 'อัพเดทระบบ Tracking',
    status: 'Blocked',
    assignee: 'Staff 4',
    priority: 'High',
    dueDate: '2026-02-05',
    category: 'Project',
  },
  {
    id: '8',
    title: 'ประชุม Safety Meeting',
    status: 'Done',
    assignee: 'Supervisor B',
    priority: 'Low',
    dueDate: '2026-02-02',
    category: 'Internal',
  },
  {
    id: '9',
    title: 'จัดส่ง Express Shipment',
    status: 'In Progress',
    assignee: 'Staff 5',
    priority: 'High',
    dueDate: '2026-02-03',
    category: 'Outbound',
  },
  {
    id: '10',
    title: 'รับสินค้า Local Supplier',
    status: 'Pending',
    assignee: 'Staff 1',
    priority: 'Medium',
    dueDate: '2026-02-07',
    category: 'Inbound',
  },
];

export async function queryDatabase(databaseId: string, filter?: any) {
  if (!hasNotionCreds && isDevelopment) {
    console.log('⚠️ Development Mode: Using mock data (Notion credentials not configured)');
    return MOCK_TASKS;
  }

  if (!notion) {
    throw new Error('Notion client not initialized. Check NOTION_API_KEY.');
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
    });
    return response.results;
  } catch (error) {
    console.error('Notion query error:', error);
    throw error;
  }
}

export async function getTasksFromNotion() {
  // Use mock data in development if no credentials
  if (!hasNotionCreds && isDevelopment) {
    console.log('📊 Returning mock tasks (10 items)');
    return MOCK_TASKS;
  }

  const databaseId = getDatabaseId();
  const pages = await queryDatabase(databaseId);

  return pages.map((page: any) => ({
    id: page.id,
    title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled',
    status: page.properties.Status?.select?.name || 'Pending',
    assignee: page.properties.Assignee?.people?.[0]?.name || 'Unassigned',
    priority: page.properties.Priority?.select?.name || 'Medium',
    dueDate: page.properties['Due Date']?.date?.start || null,
    category: page.properties.Category?.select?.name || 'Internal',
  }));
}

export async function getTeamPerformance() {
  const tasks = await getTasksFromNotion();
  
  const memberStats: { [key: string]: any } = {};

  tasks.forEach((task: any) => {
    const assignee = task.assignee;
    if (!memberStats[assignee]) {
      memberStats[assignee] = {
        name: assignee,
        tasksCompleted: 0,
        tasksInProgress: 0,
        tasksPending: 0,
        tasksBlocked: 0,
      };
    }

    switch (task.status) {
      case 'Done':
        memberStats[assignee].tasksCompleted++;
        break;
      case 'In Progress':
        memberStats[assignee].tasksInProgress++;
        break;
      case 'Blocked':
        memberStats[assignee].tasksBlocked++;
        break;
      default:
        memberStats[assignee].tasksPending++;
    }
  });

  return Object.values(memberStats).map((member: any) => ({
    ...member,
    performance: calculatePerformance(member),
  }));
}

function calculatePerformance(stats: any) {
  const total = stats.tasksCompleted + stats.tasksInProgress + stats.tasksPending + stats.tasksBlocked;
  if (total === 0) return 0;
  
  const score = (
    (stats.tasksCompleted * 100) +
    (stats.tasksInProgress * 50) +
    (stats.tasksPending * 20) -
    (stats.tasksBlocked * 30)
  ) / total;
  
  return Math.max(0, Math.min(100, score));
}

export { notion };
