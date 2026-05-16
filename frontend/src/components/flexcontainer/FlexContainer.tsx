import type { ReactNode } from "react";
import "./flexContainer.css";

export enum FlexWrap {
  NO_FLEX = "nowrap",
  WRAP_FLEX = "wrap",
  REVERSE_FLEX = "wrap-reverse", // List starts from the end
}

export enum ROW_CROSS_AXIS_ALIGNMENT {
  TOP = "start",
  CENTER = "center",
  LOW = "end",
  NONE = "unset",
}

export enum ROW_MAIN_AXIS_ALIGNMENT {
  LEFT = "flex-start",
  CENTER = "center",
  RIGHT = "flex-end",
  NONE = "unset",
}

export enum COLUMN_CROSS_AXIS_ALIGNMENT {
  LEFT = "start",
  CENTER = "center",
  RIGHT = "end",
  NONE = "unset",
}

export enum COLUMN_MAIN_AXIS_ALIGNMENT {
  TOP = "flex-start",
  CENTER = "center",
  BOTTOM = "flex-end",
  NONE = "unset",
}

type flexContainerProps = {
  key?: string;
  backgroundColor_?: string;
  flexWrap_?: FlexWrap;
  children: ReactNode;
  classNames_?: string;
  paddingLeft_?: number;
  paddingRight_?: number;
  paddingTop_?: number;
  paddingBottom_?: number;
  // style?: React.CSSProperties; // Optional inline styles
};

type flexRowContainerProps = flexContainerProps & {
  columnGap_?: number;
  mainAxisAlignment?: ROW_MAIN_AXIS_ALIGNMENT;
  crossAxisAlignment?: ROW_CROSS_AXIS_ALIGNMENT;
  takeFullWidth?: boolean; // take full width of parent container
};
type flexColumnContainerProps = flexContainerProps & {
  rowGap_?: number;
  mainAxisAlignment?: COLUMN_MAIN_AXIS_ALIGNMENT;
  crossAxisAlignment?: COLUMN_CROSS_AXIS_ALIGNMENT;
  takeFullHeight?: boolean; // take full height of parent container
};

export function FlexRowContainer({
  backgroundColor_ = "transparent",
  flexWrap_ = FlexWrap.NO_FLEX,
  columnGap_ = 10,
  children,
  paddingLeft_ = 0,
  paddingRight_ = 0,
  paddingBottom_ = 0,
  paddingTop_ = 0,
  classNames_ = "",
  takeFullWidth = false,
  mainAxisAlignment = ROW_MAIN_AXIS_ALIGNMENT.NONE,
  crossAxisAlignment = ROW_CROSS_AXIS_ALIGNMENT.NONE,
}: flexRowContainerProps) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor_,
        display: "flex",
        flexWrap: flexWrap_,
        flexDirection: "row",
        paddingLeft: `${paddingLeft_}px`,
        paddingRight: `${paddingRight_}px`,
        paddingTop: `${paddingTop_}px`,
        paddingBottom: `${paddingBottom_}px`,
        columnGap: `${columnGap_}px`,
        alignItems: crossAxisAlignment,
        alignContent: crossAxisAlignment,
        justifyItems: mainAxisAlignment,
        justifyContent: mainAxisAlignment,
      }}
      className={`${takeFullWidth ? "w-full" : ""} ${classNames_.trim()}`}
    >
      {children}
    </div>
  );
}

export function FlexColumnContainer({
  backgroundColor_ = "transparent",
  flexWrap_ = FlexWrap.NO_FLEX,
  rowGap_ = 10,
  children,
  paddingLeft_ = 0,
  paddingRight_ = 0,
  paddingBottom_ = 0,
  paddingTop_ = 0,
  classNames_ = "",
  takeFullHeight = false,
  mainAxisAlignment = COLUMN_MAIN_AXIS_ALIGNMENT.NONE,
  crossAxisAlignment = COLUMN_CROSS_AXIS_ALIGNMENT.NONE,
}: flexColumnContainerProps) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor_,
        display: "flex",
        flexWrap: flexWrap_,
        paddingLeft: `${paddingLeft_}px`,
        paddingRight: `${paddingRight_}px`,
        paddingTop: `${paddingTop_}px`,
        paddingBottom: `${paddingBottom_}px`,
        flexDirection: "column",
        rowGap: `${rowGap_}px`,
        alignItems: crossAxisAlignment,
        alignContent: crossAxisAlignment,
        justifyItems: mainAxisAlignment,
        justifyContent: mainAxisAlignment,
      }}
      className={`${takeFullHeight ? "h-full" : ""}  ${classNames_.trim()}`}
    >
      {children}
    </div>
  );
}