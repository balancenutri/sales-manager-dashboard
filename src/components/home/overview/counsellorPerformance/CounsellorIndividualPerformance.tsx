import React from "react";
import {
  useGetCounsellorCategoryWisePerformanceQuery,
  useGetCounsellorSourceWisePerformanceQuery,
} from "@/service/dashboard/api";
import { skipToken } from "@reduxjs/toolkit/query";
import MetricCard from "../../cards/MetricCard";
import SkeletonCard from "@/components/common/SkeletonCard";

interface CounsellorIndividualPerformanceProps {
  mentorId: undefined | number;
}

const CounsellorIndividualPerformance: React.FC<
  CounsellorIndividualPerformanceProps
> = ({ mentorId }) => {
  const { data, isFetching } = useGetCounsellorCategoryWisePerformanceQuery(
    mentorId ? mentorId : skipToken
  );

  const { data: sourceData, isFetching: sourceFetching } =
    useGetCounsellorSourceWisePerformanceQuery(mentorId ? mentorId : skipToken);

  return (
    <main className="dark:bg-gray-950 p-4">
      <h5 className="w-full p-2 text-center text-lg font-semibold bg-white shadow-md mb-6   ">
        Individual Performance
      </h5>

      <section className="mb-6  ">
        {!isFetching && data?.data ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.data.map((metric: any, idx: number) => (
              <MetricCard key={idx} data={metric} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {Array(4)
              .fill(null)
              .map((_, idx: number) => (
                <SkeletonCard row={3} key={idx} />
              ))}
          </div>
        )}
      </section>

      <h5 className="w-full p-2 text-center text-lg font-medium bg-white shadow-md mb-6 ">
        Source Wise Leads
      </h5>
      <section className="mb-6  ">
        {sourceData?.data && !sourceFetching ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sourceData.data.map((metric: any, idx: number) => (
              <MetricCard key={idx} data={metric} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {Array(4)
              .fill(null)
              .map((_, idx: number) => (
                <SkeletonCard row={3} key={idx} />
              ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default CounsellorIndividualPerformance;
