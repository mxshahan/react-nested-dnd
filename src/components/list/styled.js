import styled from "styled-components";
import { List, Collapse } from "antd";
import ContentEditable from "react-contenteditable";

export const ListItemStyled = styled(List.Item)`
  border-radius: 10px;
  padding: 10px 5px;
  background-color: ${(props) => (props.disabled ? "#ddd" : "#fff")};
  border: 1px solid #efefef;
  article {
    color: ${(props) => (props.selected ? "#ff6c16" : "#000")};
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PanelStyled = styled(Collapse.Panel)`
  border-bottom: 0px none !important;
  .ant-collapse-header {
    border-radius: 10px !important;
    border: 1px solid #efefef;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding: 0px 5px !important;
    background-color: #fff;
    ${(props) => {
      if (props.isDragging) {
        return { backgroundColor: "#6a2ae6" };
      } else if (props.selected) {
        // return { backgroundColor: "#6a2ae6", color: "white !important" };
      } else if (props.disabled) {
        return { backgroundColor: "#ddd" };
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

export const EditableContainer = styled.span`
  display: flex;
  align-items: center;
`;

export const EditableStyled = styled(ContentEditable)`
  max-width: 120px;
  box-shadow: 0px none;
  width: 100%;
  padding: 0px 5px;
  margin-left: 5px;
  &:focus {
    outline: 0.5px solid #ddd;
  }
`;
