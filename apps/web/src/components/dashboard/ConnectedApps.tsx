import {
  CheckCircle2,
  FolderGit2,
  Mail,
  Calendar,
  NotebookPen,
} from "lucide-react";

interface ConnectedAppsProps {
  connections: { provider: string }[];
}

const baseApps = [
  {
    name: "GitHub",
    key: "github",
    icon: <FolderGit2 className="h-5 w-5" />,
  },
  {
    name: "Gmail",
    key: "gmail",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    name: "Google Calendar",
    key: "google-calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    name: "Notion",
    key: "notion",
    icon: <NotebookPen className="h-5 w-5" />,
  },
];

export default function ConnectedApps({ connections }: ConnectedAppsProps) {
  const connectedKeys = connections.map((c) => c.provider.toLowerCase());

  return (
    <div className="rounded-3xl bg-slate-900/60 p-8 border border-slate-805/80 backdrop-blur-md">
      <h2 className="text-xl font-bold text-slate-200">
        Ecosystem Integrations
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {baseApps.map((app) => {
          const isConnected = connectedKeys.includes(app.key);
          return (
            <div
              key={app.name}
              className={`flex items-center justify-between rounded-2xl border p-4 transition-all hover:bg-slate-800/20 ${
                isConnected
                  ? "border-indigo-900/35 bg-indigo-950/20"
                  : "border-slate-800 bg-slate-950/20"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-2.5 border ${
                  isConnected ? "bg-indigo-950/50 text-indigo-400 border-indigo-900/25" : "bg-slate-950/50 text-slate-550 border-slate-850"
                }`}>
                  {app.icon}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-350">
                    {app.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {isConnected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>

              <CheckCircle2
                className={`h-4 w-4 ${
                  isConnected ? "text-emerald-500" : "text-slate-800"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}