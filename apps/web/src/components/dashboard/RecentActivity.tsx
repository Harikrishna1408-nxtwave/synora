import {
  GitCommit,
  Mail,
  CalendarDays,
  FileText,
} from "lucide-react";

const activities = [
  {
    icon: <GitCommit className="h-5 w-5 text-indigo-400" />,
    title: "Pushed 5 commits to Synora",
    time: "2 hours ago",
  },
  {
    icon: <Mail className="h-5 w-5 text-indigo-400" />,
    title: "Replied to StartupBox assessment email",
    time: "Yesterday",
  },
  {
    icon: <CalendarDays className="h-5 w-5 text-indigo-400" />,
    title: "Project Review Meeting",
    time: "Today • 10:00 AM",
  },
  {
    icon: <FileText className="h-5 w-5 text-indigo-400" />,
    title: "Updated Synora documentation",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl bg-slate-900/60 p-8 border border-slate-805/80 backdrop-blur-md">
      <h2 className="text-xl font-bold text-slate-200">
        Recent Activity
      </h2>

      <div className="mt-8 space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start gap-4"
          >
            <div className="rounded-xl bg-indigo-950/40 border border-indigo-900/20 p-2.5">
              {activity.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-350 leading-tight">
                {activity.title}
              </h3>

              <p className="mt-1.5 text-xs text-slate-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}