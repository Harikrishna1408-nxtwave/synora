import {
  GitCommit,
  Mail,
  CalendarDays,
  FileText,
} from "lucide-react";

const activities = [
  {
    icon: <GitCommit className="h-5 w-5 text-indigo-600" />,
    title: "Pushed 5 commits to Synora",
    time: "2 hours ago",
  },
  {
    icon: <Mail className="h-5 w-5 text-indigo-600" />,
    title: "Replied to StartupBox assessment email",
    time: "Yesterday",
  },
  {
    icon: <CalendarDays className="h-5 w-5 text-indigo-600" />,
    title: "Project Review Meeting",
    time: "Today • 10:00 AM",
  },
  {
    icon: <FileText className="h-5 w-5 text-indigo-600" />,
    title: "Updated Synora documentation",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Recent Activity
      </h2>

      <div className="mt-8 space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start gap-4"
          >
            <div className="rounded-xl bg-indigo-100 p-3">
              {activity.icon}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}