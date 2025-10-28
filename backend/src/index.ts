import { Elysia } from "elysia";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const PORT = process.env.PORT || 27801;
const HOST = process.env.HOST || "0.0.0.0";

// Get latest meeting data
async function getMeetingData() {
  const { data: meetingDataList, error: listError } = await supabase
    .from("MeetingData")
    .select("*")
    .order("updatedAt", { ascending: false })
    .limit(1);

  if (listError || !meetingDataList || meetingDataList.length === 0) {
    console.log("No meeting data found");
    return null;
  }

  const meetingData = meetingDataList[0];
  const meetingId = meetingData.id;

  // Fetch related data in parallel
  const [
    projectsResult,
    projectDetailsResult,
    issuesResult,
    codeReviewsResult,
  ] = await Promise.all([
    supabase.from("Project").select("*").eq("meetingDataId", meetingId),
    supabase.from("ProjectDetail").select("*").eq("meetingDataId", meetingId),
    supabase.from("IssueDetail").select("*").eq("meetingDataId", meetingId),
    supabase.from("CodeReview").select("*").eq("meetingDataId", meetingId),
  ]);

  const projects = projectsResult.data || [];
  const projectDetails = projectDetailsResult.data || [];
  const issuesDetails = issuesResult.data || [];
  const codeReviews = codeReviewsResult.data || [];

  // Transform to match frontend format
  const projectsByStatus = projects.reduce(
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
    projects: projectsByStatus,
    projectDetails: projectDetails.map((detail) => ({
      ลำดับ: detail.orderNum,
      ระบบงาน: detail.systemName,
      ผู้รับผิดชอบ: detail.responsible,
      PM: detail.pm,
      ปัญหาที่พบ: JSON.parse(detail.problems),
      วิธีแก้ปัญหา: JSON.parse(detail.solutions),
      หมายเหตุ: JSON.parse(detail.notes),
    })),
    issuesDetails: issuesDetails.map((issue) => ({
      project: issue.project,
      description: issue.description,
      priority: issue.priority,
    })),
    codeReview: codeReviews.map((review) => ({
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
  const { data: oldDataList } = await supabase
    .from("MeetingData")
    .select("id")
    .order("updatedAt", { ascending: false })
    .limit(1);

  if (oldDataList && oldDataList.length > 0) {
    const oldId = oldDataList[0].id;

    // Delete related records
    await Promise.all([
      supabase.from("Project").delete().eq("meetingDataId", oldId),
      supabase.from("ProjectDetail").delete().eq("meetingDataId", oldId),
      supabase.from("IssueDetail").delete().eq("meetingDataId", oldId),
      supabase.from("CodeReview").delete().eq("meetingDataId", oldId),
    ]);

    // Delete main record
    await supabase.from("MeetingData").delete().eq("id", oldId);
  }

  // Create new meeting data
  const now = new Date().toISOString();
  const { data: meetingData, error } = await supabase
    .from("MeetingData")
    .insert({
      title: data.meetingInfo.title,
      date: data.meetingInfo.date,
      total: data.projectStats.total,
      inProgress: data.projectStats.inProgress,
      completed: data.projectStats.completed,
      issues: data.projectStats.issues,
      codeReviewer: data.codeReviewer,
      updatedAt: now,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating meeting data:", error);
    throw error;
  }

  const meetingId = meetingData.id;

  // Insert projects
  const allProjects = [
    ...(data.projects.inProgress || []).map((name: string) => ({
      name,
      status: "inProgress",
      meetingDataId: meetingId,
      updatedAt: now,
    })),
    ...(data.projects.completed || []).map((name: string) => ({
      name,
      status: "completed",
      meetingDataId: meetingId,
      updatedAt: now,
    })),
    ...(data.projects.issues || []).map((name: string) => ({
      name,
      status: "issues",
      meetingDataId: meetingId,
      updatedAt: now,
    })),
  ];

  if (allProjects.length > 0) {
    await supabase.from("Project").insert(allProjects);
  }

  // Insert project details
  const projectDetails = (data.projectDetails || []).map((detail: any) => ({
    orderNum: parseInt(detail.ลำดับ) || 0,
    systemName: detail.ระบบงาน,
    responsible: detail.ผู้รับผิดชอบ,
    pm: detail.PM,
    problems: JSON.stringify(detail.ปัญหาที่พบ || []),
    solutions: JSON.stringify(detail.วิธีแก้ปัญหา || []),
    notes: JSON.stringify(detail.หมายเหตุ || []),
    meetingDataId: meetingId,
    updatedAt: now,
  }));

  if (projectDetails.length > 0) {
    await supabase.from("ProjectDetail").insert(projectDetails);
  }

  // Insert issues
  const issuesDetails = (data.issuesDetails || []).map((issue: any) => ({
    project: issue.project,
    description: issue.description,
    priority: issue.priority,
    meetingDataId: meetingId,
    updatedAt: now,
  }));

  if (issuesDetails.length > 0) {
    await supabase.from("IssueDetail").insert(issuesDetails);
  }

  // Insert code reviews
  const codeReviews = (data.codeReview || []).map((review: any) => ({
    project: review.project,
    description: review.description,
    priority: review.priority,
    meetingDataId: meetingId,
    updatedAt: now,
  }));

  if (codeReviews.length > 0) {
    await supabase.from("CodeReview").insert(codeReviews);
  }

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
  .get("/api/meeting", async ({ set }) => {
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
  .post("/api/meeting", async ({ body, set }) => {
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
