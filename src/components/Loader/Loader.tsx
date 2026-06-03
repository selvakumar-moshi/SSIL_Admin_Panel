/*
 * Copyright (c) 2024 Payhuddle. All rights reserved.
 *
 * This software and associated documentation files are the intellectual
 * property of Payhuddle. Use of this software is governed by the terms
 * of the applicable license agreement.
 *
 * No part of this software may be reproduced, distributed, or transmitted
 * in any form or by any means without the prior written permission of Payhuddle.
 */
import React from "react";
import { Spin } from "antd";

export interface LoaderProps {
  tip?: string;
  size?: "small" | "default" | "large";
  spinning?: boolean;
  fullScreen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({
  tip = "Loading",
  size = "large",
  spinning = true,
  fullScreen = false,
  className = "",
  children,
}) => {
  if (fullScreen) {
    return (
      <div className={`loader-fullscreen ${className}`}>
        <Spin tip={tip} size={size} spinning={spinning} />
      </div>
    );
  }

  if (children) {
    return (
      <Spin tip={tip} size={size} spinning={spinning} className={`loader ${className}`}>
        {children}
      </Spin>
    );
  }

  return <Spin tip={tip} size={size} spinning={spinning} className={`loader ${className}`} />;
};

export default Loader;