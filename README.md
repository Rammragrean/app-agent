# 🚛 Transport CMD

Real-time logistics command center for transport operations management.

## 🎯 Features

- **Dashboard Overview**: Real-time task statistics and team performance
- **Category Tracking**: Inbound, Outbound, Internal, Project
- **Team Performance**: Individual member stats and completion rates
- **Performance Trends**: Monthly grade tracking visualization
- **Notion Integration**: Direct API connection (no separate database)

## 📦 Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Notion API** - Data source
- **Recharts** - Performance visualization

## 🚀 Setup Instructions

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Notion

1. Create a Notion Integration at https://www.notion.so/my-integrations
2. Copy your **Internal Integration Token**
3. Create a new Notion Database with these properties:

| Property | Type | Options |
|----------|------|---------|
| **Name** | Title | - |
| **Status** | Select | Done, In Progress, Pending, Blocked |
| **Assignee** | Person | - |
| **Priority** | Select | High, Medium, Low |
| **Due Date** | Date | - |
| **Category** | Select | **Inbound, Outbound, Internal, Project** |

4. Share your database with the integration
5. Copy the **Database ID** from the URL

### 3. Environment Variables

Create `.env.local` file:

\`\`\`env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## 📊 API Endpoints

- \`GET /api/notion?type=tasks\` - Fetch all tasks
- \`GET /api/notion?type=performance\` - Fetch team performance

## 🎨 Pages

- \`/\` - Main Dashboard
- \`/team\` - Team Performance Trends

## 📁 Project Structure

\`\`\`
transport-cmd/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard
│   │   ├── team/page.tsx         # Performance Trends
│   │   ├── api/notion/route.ts   # API Routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── StatCard.tsx
│   │   ├── TaskCard.tsx
│   │   └── TeamMemberCard.tsx
│   ├── lib/
│   │   └── notion.ts             # Notion API Client
│   └── types/
│       └── index.ts              # TypeScript Types
└── package.json
\`\`\`

## 🔧 Customization

### Add More Categories

Edit \`src/types/index.ts\`:

\`\`\`typescript
category: 'Inbound' | 'Outbound' | 'Internal' | 'Project' | 'YourNewCategory';
\`\`\`

### Modify Performance Calculation

Edit \`src/lib/notion.ts\` → \`calculatePerformance()\` function

## 📝 License

Private - Internal Use Only

## 🐛 Troubleshooting

### ❌ Problem: 404 Error or Blank Page

**Solution**:
```bash
# Delete .next folder and restart
rm -rf .next
npm run dev
```

### ❌ Problem: "This page could not be found"

**Cause**: Next.js cache issue  
**Solution**:
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### ❌ Problem: API returns 500 error

**Check**:
1. Is `.env.local` configured correctly?
2. Are Notion credentials valid?
3. Is database shared with integration?

**💡 Development Mode**: The app will automatically use mock data if Notion credentials are not configured. Look for the yellow banner on the dashboard.

### ✅ Features in Development Mode

When running without Notion credentials:
- ✅ 10 mock tasks covering all categories
- ✅ 7 team members (2 Supervisors + 5 Staff)
- ✅ Full UI functionality
- ✅ Performance calculations
- ✅ All statistics and charts

Simply add your Notion credentials to `.env.local` when ready to connect real data!
