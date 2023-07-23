// LoggerHOC.js
import React, { useEffect } from 'react';

interface IProps {
 message: string;
 componentName: string;
 children: any;
}

const LoggerHOC = (props: IProps) => {
 useEffect(() => {
  console.log(`${props.message} ${props.componentName}`);
 }, []);

 return <>{props.children}</>;
};

export default LoggerHOC;
