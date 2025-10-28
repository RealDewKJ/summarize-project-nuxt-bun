import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 27801;
const HOST = process.env.HOST || "0.0.0.0";

// Get latest meeting data
async function getMeetingData() {
  const meetingData = await prisma.meetingData.findFirst({
    orderBy: { updatedAt: "desc" },
    include: {
      projects: true,
      projectDetails: true,
      issuesDetails: true,
      codeReviews: true,
    },
  });

  if (!meetingData) {
    return null;
  }

  // Transform to match frontend format
  const projects = meetingData.projects.reduce(
    (acc, project) => {
      if (!acc[project.status]) acc[project.status] = [];
      acc[project.status].push(project.name);
      return acc;
    },
    { inProgress: [], completed: [], issues: [] } as Record<string, string[]>
  );

  return {
    meetingInfo: {
      title: meetingData.title,
      date: meetingData.date,
    },
    projectStats: {
      total: meetingData.total,
      inProgress: meetingData.inProgress,
      completed: meetingData.completed,
      issues: meetingData.issues,
    },
    projects,
    projectDetails: meetingData.projectDetails.map((detail) => ({
      ลำดับ: detail.orderNum,
      ระบบงาน: detail.systemName,
      ผู้รับผิดชอบ: detail.responsible,
      PM: detail.pm,
      ปัญหาที่พบ: JSON.parse(detail.problems),
      วิธีแก้ปัญหา: JSON.parse(detail.solutions),
      หมายเหตุ: JSON.parse(detail.notes),
    })),
    issuesDetails: meetingData.issuesDetails.map((issue) => ({
      project: issue.project,
      description: issue.description,
      priority: issue.priority,
    })),
    codeReview: meetingData.codeReviews.map((review) => ({
      project: review.project,
      description: review.description,
      priority: review.priority,
    })),
    codeReviewer: meetingData.codeReviewer,
  };
}

// Save/Update meeting data
async function saveMeetingData(data: any) {
  // Delete old data (keeping only latest)
  const oldData = await prisma.meetingData.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (oldData) {
    await prisma.meetingData.delete({ where: { id: oldData.id } });
  }

  // Create new meeting data
  const meetingData = await prisma.meetingData.create({
    data: {
      title: data.meetingInfo.title,
      date: data.meetingInfo.date,
      total: data.projectStats.total,
      inProgress: data.projectStats.inProgress,
      completed: data.projectStats.completed,
      issues: data.projectStats.issues,
      codeReviewer: data.codeReviewer,
      projects: {
        create: [
          ...(data.projects.inProgress || []).map((name: string) => ({
            name,
            status: "inProgress",
          })),
          ...(data.projects.completed || []).map((name: string) => ({
            name,
            status: "completed",
          })),
          ...(data.projects.issues || []).map((name: string) => ({
            name,
            status: "issues",
          })),
        ],
      },
      projectDetails: {
        create: (data.projectDetails || []).map((detail: any) => ({
          orderNum: parseInt(detail.ลำดับ) || 0,
          systemName: detail.ระบบงาน,
          responsible: detail.ผู้รับผิดชอบ,
          pm: detail.PM,
          problems: JSON.stringify(detail.ปัญหาที่พบ || []),
          solutions: JSON.stringify(detail.วิธีแก้ปัญหา || []),
          notes: JSON.stringify(detail.หมายเหตุ || []),
        })),
      },
      issuesDetails: {
        create: (data.issuesDetails || []).map((issue: any) => ({
          project: issue.project,
          description: issue.description,
          priority: issue.priority,
        })),
      },
      codeReviews: {
        create: (data.codeReview || []).map((review: any) => ({
          project: review.project,
          description: review.description,
          priority: review.priority,
        })),
      },
    },
  });

  return meetingData;
}

// Create Elysia app
const app = new Elysia()
  .onError(({ error, set }) => {
    console.error("Server error:", error);
    set.status = 500;
    return { error: "Internal server error" };
  })
  .onRequest(({ set }) => {
    // CORS headers
    set.headers["Access-Control-Allow-Origin"] = "*";
    set.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type";
  })
  .onAfterHandle(({ set }) => {
    // Ensure CORS headers are set
    set.headers["Access-Control-Allow-Origin"] = "*";
    set.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type";
  })
  .options("*", ({ set }) => {
    set.status = 200;
    return "";
  })
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .get("/api/meeting", async ({ set }: { set: any }) => {
    try {
      const data = await getMeetingData();
      if (!data) {
        set.status = 404;
        return { error: "No meeting data found" };
      }
      return data;
    } catch (error) {
      console.error("Error fetching meeting data:", error);
      set.status = 500;
      return { error: "Failed to fetch meeting data" };
    }
  })
  .post("/api/meeting", async ({ body, set }: { body: any; set: any }) => {
    try {
      await saveMeetingData(body);
      return { success: true, message: "Meeting data saved successfully" };
    } catch (error) {
      console.error("Error saving meeting data:", error);
      set.status = 500;
      return { error: "Failed to save meeting data" };
    }
  })
  .listen({ port: PORT, hostname: HOST });

console.log(`🚀 Backend server running on http://${HOST}:${PORT}`);
console.log(`📊 API endpoints:`);
console.log(`   GET  http://${HOST}:${PORT}/api/meeting`);
console.log(`   POST http://${HOST}:${PORT}/api/meeting`);
console.log(`   GET  http://${HOST}:${PORT}/health`);
