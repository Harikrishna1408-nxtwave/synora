const Hero = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-indigo-600 font-semibold">
          🚀 AI Digital Twin
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900">
          Your Digital Twin
          <br />
          <span className="text-indigo-600">
            for Everyday Decisions
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-600">
          Synora connects Gmail, Calendar, GitHub, Notion,
          Slack, Google Drive and more to understand your work,
          remember your commitments, and help you make better
          decisions every day.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700">
            Get Started
          </button>

          <button className="rounded-xl border border-gray-300 px-8 py-4 font-semibold hover:bg-gray-100">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;