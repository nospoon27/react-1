import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

export const withSuspense = (Component, FallbackComponent = <Preloader />) => {
  return (props) => {
    return (
      <Suspense fallback={FallbackComponent}>
        <Component {...props} />
      </Suspense>
    );
  };
};
