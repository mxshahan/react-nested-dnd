import styled from "styled-components";
import { List, Collapse } from "antd";

export const ListItemStyled = styled(List.Item)`
  border-radius: 10px;
  padding: 20px;
  background-color: ${(props) => (props.disabled ? "#ddd" : "#fff")};
  .ant-typography {
    color: ${(props) => (props.selected ? "#ff6c16" : "#000")};
  }
`;

export const PanelStyled = styled(Collapse.Panel)`
  border-bottom: 0px none !important;
  .ant-collapse-header {
    border-radius: 10px !important;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding: 0px 10px !important;
    ${(props) => {
      if (props.selected) {
        return { backgroundColor: "#6a2ae6", color: "white !important" };
      } else {
        return props.disabled
          ? { backgroundColor: "#ddd" }
          : { backgroundColor: "#fff" };
      }
    }}
  }

  .ant-collapse-header::before,
  .ant-collapse-header::after {
    display: none !important;
  }

  .collapse_header {
    padding: 20px 5px !important;
    display: block;
    width: 100%;
  }

  .collapse_disabled {
    background-color: grey !important;
  }

  .ant-collapse-content-box {
    padding: 0px;
  }
`;

export const CollapseStyled = styled(Collapse)`
  background-color: transparent;
`;
