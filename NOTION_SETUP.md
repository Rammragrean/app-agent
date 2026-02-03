# 📋 Notion Database Setup Guide

## ✅ Required Properties

คุณต้องมี Database ด้วย properties ตามนี้:

| Property Name | Type | Options | Required |
|--------------|------|---------|----------|
| **Name** | Title | - | ✅ |
| **Status** | Select | Done, In Progress, Pending | ✅ |
| **Assignee** | Text | - | ✅ |
| **Priority** | Select | High, Medium, Low | ✅ |
| **Due Date** | Date | - | ✅ |
| **Category** | Select | Inbound, Outbound, Internal, Project | ✅ |

---

## 🔧 Important Notes

### 1. Status Property
คุณไม่มี **"Blocked"** option ก็ได้ - ระบบจะทำงานได้ปกติ  
ถ้าอยากเพิ่มทีหลัง:
1. เปิด Database
2. คลิกที่ **Status** column
3. กด **"Edit property"**
4. เพิ่ม option **"Blocked"**

### 2. Assignee Property
**คุณใช้ Text แทน People ก็ได้!** ✅

ระบบรองรับทั้ง:
- **Text** (rich_text) - พิมพ์ชื่อเองได้เลย
- **People** (@mention) - tag คนใน workspace

แนะนำ: ใช้ **Text** จะง่ายกว่า ไม่ต้องเชิญคนเข้า workspace

---

## 📝 Example Data

ตัวอย่างข้อมูลที่ใส่ใน Database:

| Name | Status | Assignee | Priority | Due Date | Category |
|------|--------|----------|----------|----------|----------|
| ตรวจรับสินค้า Container A | In Progress | Supervisor A | High | 2026-02-05 | Inbound |
| จัดส่งสินค้าไปลูกค้า XYZ | Pending | Staff 1 | High | 2026-02-04 | Outbound |
| ตรวจสอบสต็อกคลังสินค้า | Done | Supervisor B | Medium | 2026-02-03 | Internal |
| วางแผน Automation System | In Progress | Supervisor A | High | 2026-02-10 | Project |

---

## 🔑 API Setup

### Step 1: Create Integration
1. ไปที่ https://www.notion.so/my-integrations
2. กด **"New integration"**
3. ตั้งชื่อ เช่น "Transport CMD"
4. **Capabilities**: อย่างน้อยต้องมี **"Read content"**
5. กด **"Submit"**
6. Copy **Integration Token** (จะขึ้นต้นด้วย `ntn_` หรือ `secret_`)

### Step 2: Share Database
1. เปิด Database ของคุณ
2. กดที่ **"•••"** (มุมขวาบน)
3. เลือก **"Add connections"**
4. เลือก Integration ที่สร้างไว้
5. กด **"Confirm"**

### Step 3: Get Database ID
จาก URL ของ Database:
```
https://www.notion.so/workspace/DATABASE_ID?v=...
                                ^^^^^^^^^^^^
                                นี่คือ Database ID
```

หรือดูจาก **Share** → **Copy link** แล้วดู ID จาก URL

---

## 🔐 Environment Variables

ใส่ใน `.env.local`:

```env
# Notion API v2025-09-03 Compatible
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: 
- API Key อาจขึ้นต้นด้วย `ntn_` (ใหม่) หรือ `secret_` (เก่า) - ใช้ได้ทั้งคู่
- Database ID เป็น 32 ตัวอักษร (ไม่มี dash)

---

## ✅ Verification

หลังจาก setup แล้ว:

1. **Restart server**: Stop (Ctrl+C) แล้ว `npm run dev` ใหม่
2. **เปิด**: http://localhost:3000
3. **ตรวจสอบ**:
   - Yellow banner **ต้องหายไป** ✅
   - Stats แสดงจำนวนงานจาก Database จริง ✅
   - Team Performance แสดงชื่อคนจริงใน Database ✅

---

## 🐛 Troubleshooting

### Error: "Unauthorized" หรือ "object_not_found"
**Fix**: 
1. ตรวจสอบว่า **Share Database กับ Integration** แล้วหรือยัง
2. ตรวจสอบว่า **API Key ถูกต้อง**

### ไม่แสดงข้อมูล / Yellow banner ยังอยู่
**Fix**:
1. ตรวจสอบ `.env.local` ว่ามี `NOTION_API_KEY` และ `NOTION_DATABASE_ID`
2. Restart server (Ctrl+C แล้ว `npm run dev` ใหม่)
3. Hard refresh browser (Ctrl+Shift+R)

### API Error: "property not found"
**Fix**: 
- ตรวจสอบว่า Database มี properties ครบ 6 ตัวที่ระบุด้านบน
- ชื่อ property ต้องตรงกับตารางด้านบน (case-sensitive)

---

## 📚 Additional Resources

- [Notion API Reference](https://developers.notion.com/reference/intro)
- [Notion API v2025-09-03 Guide](https://developers.notion.com/guides/get-started/upgrade-guide-2025-09-03)
- [Create Integration](https://www.notion.so/my-integrations)

ถ้ายังมีปัญหา อย่าลืมว่าระบบใช้ **Mock Data** ได้เสมอ ถ้าไม่ใส่ credentials! 🚀
