import { baseStyles } from '../../styles';
import React, { ReactNode } from 'react';

const PageContainer = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <div style={baseStyles.container}>
      {title ?? <h1 style={baseStyles.pageTitle}>{title}</h1>}
      {children}
    </div>
  );
};

export default PageContainer;
