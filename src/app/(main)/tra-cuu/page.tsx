"use client";
import React, { Suspense, useState } from "react";
import styles from "./TraCuu.module.scss";
import ResearchResult from "@/modules/layout/main/components/research-result";
import FormResearchLibraryCard from "@/modules/layout/main/components/form-research-library-card";

const page = () => {
  const [researchResult, setResearchResult] = useState<any>();
  return (
    <Suspense>
      <div className={`${styles.wrapper} shadow-sm align-items-center pb-5  `}>
        <h3 className={`${styles.title} d-sm-block m-0`}>
          TRA CỨU THÔNG TIN ĐĂNG KÝ THẺ THƯ VIỆN
        </h3>
        <div className="p-4 d-flex flex-column h-100">
          <FormResearchLibraryCard setResearchResult={setResearchResult} />
          {researchResult &&
            researchResult.map((i: any, index: number) => {
              return <ResearchResult researchResult={i} key={index} />;
            })}
        </div>
      </div>
    </Suspense>
  );
};

export default page;
