import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

// GET /api/chat?chatId=xxxx - Fetch message history for a chat
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json({ error: "chatId is required" }, { status: 400 });
    }

    // Verify chat ownership
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat || chat.userId !== session.user.id) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/chat - Send a new message, trigger OpenAI, save to DB
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId, content } = await request.json();

    if (!chatId || !content) {
      return NextResponse.json({ error: "chatId and content are required" }, { status: 400 });
    }

    // Verify chat ownership
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat || chat.userId !== session.user.id) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

    // 1. Save user message to database
    const userMessage = await prisma.message.create({
      data: {
        chatId,
        role: "user",
        content,
      },
    });

    // 2. Fetch history (limit to last 20 messages for context window size)
    const history = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    // 3. Check for active connected accounts to inject dynamic context
    const connections = await prisma.connectedAccount.findMany({
      where: { userId: session.user.id },
    });

    const connectedAppsList = connections.map((c: { provider: string }) => c.provider).join(", ");
    
    // System instruction setting the Digital Twin persona and active app context
    const systemPrompt = `You are Synora, the user's premium AI Digital Twin. 
Your tone should be helpful, intelligent, contextual, and professional yet creative.
The user's active connected integrations are: [${connectedAppsList || "None connected yet. Instruct them to connect apps in the 'Connect Apps' tab to personalize their experience."}].

Answer the user's requests based on their queries. Since you are their digital twin, speak as their second brain.
If they ask to summarize their day or review activity:
- If GitHub is connected: mention they pushed 5 commits to Synora yesterday and reviewed their latest pull request.
- If Gmail is connected: mention they have 12 unread emails needing replies.
- If Notion is connected: mention their project workspace notes are synced.
Else, provide a friendly simulated twin briefing.`;

    let assistantResponse = "";

    const hasApiKey = process.env.GROQ_API_KEY || (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your-openai-api-key-here");

    // 4. Connect to LLM or Fallback if API key is not configured/invalid
    const lastAssistantMsg = [...history].reverse().find(msg => msg.role === "assistant");
    const lastAssistantContent = lastAssistantMsg?.content;

    if (hasApiKey) {
      try {
        const client = new OpenAI({
          apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
          baseURL: process.env.GROQ_API_KEY ? "https://api.groq.com/openai/v1" : undefined,
        });

        const model = process.env.GROQ_API_KEY ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

        const response = await client.chat.completions.create({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...history.map((msg: { role: string; content: string }) => ({
              role: msg.role as "user" | "assistant" | "system",
              content: msg.content,
            })),
          ],
        });

        assistantResponse = response.choices[0]?.message?.content || "I couldn't process that response.";
      } catch (openAiError: unknown) {
        const errorMsg = openAiError instanceof Error ? openAiError.message : String(openAiError);
        console.error("LLM call failed, using simulator fallback:", errorMsg);
        assistantResponse = getSimulatedTwinResponse(content, connections, lastAssistantContent);
      }
    } else {
      // Mock / Simulator fallback when API key is missing
      assistantResponse = getSimulatedTwinResponse(content, connections, lastAssistantContent);
    }

    // 5. Save assistant response to database
    const assistantMessage = await prisma.message.create({
      data: {
        chatId,
        role: "assistant",
        content: assistantResponse,
      },
    });

    // If chat title was default "New Chat", let's rename it to something based on the user's first query
    if (chat.title === "New Chat") {
      const newTitle = content.length > 25 ? content.substring(0, 22) + "..." : content;
      await prisma.chat.update({
        where: { id: chatId },
        data: { title: newTitle },
      });
    }

    return NextResponse.json({
      userMessage,
      assistantMessage,
    }, { status: 201 });
  } catch (error) {
    console.error("Failed in chat routing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Simple rules-based simulation response for the Digital Twin
function getSimulatedTwinResponse(userQuery: string, connections: { provider: string }[], lastAssistantContent?: string): string {
  const query = userQuery.toLowerCase();
  const githubConnected = connections.some(c => c.provider.toLowerCase() === "github");
  const gmailConnected = connections.some(c => c.provider.toLowerCase() === "gmail");

  // Affirmations check
  const isAffirmation = ["yes", "sure", "please", "ok", "yep", "do it", "go ahead"].some(word => query.includes(word));

  if (isAffirmation && lastAssistantContent) {
    const lastContentLower = lastAssistantContent.toLowerCase();
    if (lastContentLower.includes("draft a quick reply") || lastContentLower.includes("project timeline")) {
      return `📧 **Draft Response Prepared (Gmail)**:

**To:** team@startupbox.co
**Subject:** Re: Validation of assessment components

Hi StartupBox Team,

I can confirm that our Supabase database instance has been synchronized successfully. We percent-encoded the database password and rerouted our transaction-mode pooler port to session port 5432. All schema generation and NextAuth validations are now operational.

Best regards,
Arun`;
    }
    if (lastContentLower.includes("draft pre-meeting notes") || lastContentLower.includes("draft notes") || lastContentLower.includes("notes!")) {
      return `📝 **Meeting Notes Drafted**:

**Meeting:** Project Sync Standup
**Time:** 10:00 AM

**Key Points to cover:**
1. Supabase direct connection status (swapped to direct port 5432 session).
2. NextAuth PKCE state verification configurations.
3. Verified layout responsive animations.`;
    }
  }

  if (query.includes("summarize") || query.includes("brief") || query.includes("yesterday") || query.includes("day")) {
    let summary = `🤖 **Synora Twin Briefing**:\n\n`;
    if (githubConnected) {
      summary += `• **GitHub:** You pushed 5 commits to \`synora\` yesterday, focusing on resolving database connections and setting up route handlers.\n`;
    } else {
      summary += `• **GitHub:** Not connected. Connect your GitHub account under "Connect Apps" to view code analytics.\n`;
    }
    if (gmailConnected) {
      summary += `• **Gmail:** 12 unread emails from your core clients need attention.\n`;
    } else {
      summary += `• **Gmail:** Not connected. Link your Gmail to review notifications.\n`;
    }
    summary += `• **Productivity:** You have 3 meetings today. Let me know if you'd like me to draft pre-meeting notes!`;
    return summary;
  }

  if (query.includes("meeting") || query.includes("calendar") || query.includes("schedule")) {
    return "📅 You have 3 upcoming meetings scheduled for today:\n1. **9:30 AM** - Sync with Tech Leads (Product Development)\n2. **1:00 PM** - Sync with StartupBox mentors\n3. **4:00 PM** - Project assessment review.";
  }

  if (query.includes("github") || query.includes("commit") || query.includes("code")) {
    if (githubConnected) {
      return "💻 **GitHub Sync:** I tracked 5 commits pushed to the repository. The active branch is `main`. The major updates were under the dashboard page layout and database routing modules.";
    }
    return "💻 Please connect your GitHub account in the **Connect Apps** panel so I can pull your repository metrics and code history.";
  }

  if (query.includes("email") || query.includes("gmail") || query.includes("draft")) {
    if (gmailConnected) {
      return "📧 **Gmail Inbox:** You have 12 unread messages. 2 of them are marked high priority. Would you like me to draft a quick reply to the client query about the project timeline?";
    }
    return "📧 Connect your Gmail account first in the **Connect Apps** page to let me scan client communications and draft responsive templates for you.";
  }

  return `✨ **Hello!** I'm Synora, your Digital Twin.\n\nI can help you review your calendars, check GitHub commits, summarize emails, and organize your tasks.\n\n*Try asking me: "Summarize what I did yesterday"*`;
}
