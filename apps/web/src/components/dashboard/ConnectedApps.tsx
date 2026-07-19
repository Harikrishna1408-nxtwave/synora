import {
  CheckCircle2,
  FolderGit2,
  Mail,
  Calendar,
  NotebookPen,
} from "lucide-react";

const apps = [
  {
    name: "GitHub",
    icon: <FolderGit2 className="h-6 w-6" />,
    status: "Connected",
  },
  {
    name: "Gmail",
    icon: <Mail className="h-6 w-6" />,
    status: "Connected",
  },
  {
    name: "Google Calendar",
    icon: <Calendar className="h-6 w-6" />,
    status: "Pending",
  },
  {
    name: "Notion",
    icon: <NotebookPen className="h-6 w-6" />,
    status: "Pending",
  },
];

export default function ConnectedApps() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Connected Apps
      </h2>

      <div className="mt-6 space-y-4">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-indigo-300"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                {app.icon}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {app.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {app.status}
                </p>
              </div>
            </div>

            <CheckCircle2
              className={`h-6 w-6 ${
                app.status === "Connected"
                  ? "text-green-500"
                  : "text-gray-300"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}