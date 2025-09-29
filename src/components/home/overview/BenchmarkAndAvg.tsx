import BenchmarkCard from "./benchmark/BenchmarkCard";

export default function BenchmarkAndAvg() {
  const data = {
    lc: {
      avg: 8566,
      benchmark: 12000,
      current: 4567,
    },
    cs: {
      avg: 8566,
      benchmark: 12000,
      current: 4567,
    },
    ls: {
      avg: 8566,
      benchmark: 12000,
      current: 4567,
    },
  };
  return (
    <div className="grid grid-cols-3 gap-6">
      <BenchmarkCard title="Lead to Consultation" data={data.lc} />
      <BenchmarkCard title="Consultation to Sales" data={data.cs} />
      <BenchmarkCard title="Lead to Sales" data={data.ls} />
    </div>
  );
}
