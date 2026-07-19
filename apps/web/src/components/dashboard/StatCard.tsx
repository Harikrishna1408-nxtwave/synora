import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

export default function StatCard({
  icon,
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-indigo-100 p-3">
          {icon}
        </div>

        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold">
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}