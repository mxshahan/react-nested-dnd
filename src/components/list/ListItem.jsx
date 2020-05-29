import React from "react";
import { Typography, Dropdown, Menu } from "antd";
import { ListItemStyled } from "./styled";
import { MoreOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";


const ListItem = ({ item, parentId, selctedEpisode = {}, ...props }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={props.onInsert}>
        Insert
      </Menu.Item>
      <Menu.Item key="1" onClick={props.onDuplicate}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="2" onClick={props.onDisable}>
        {item.disabled ? "Enable" : "Disable"}
      </Menu.Item>
      <Menu.Item key="3" onClick={props.onDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Draggable
      key={item.id}
      draggableId={"child-" + parentId + "-" + item.id}
      index={props.index}
    >
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(item.disabled ? {} : { ...provided.dragHandleProps })}
          style={{
            ...provided.draggableProps.style,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <ListItemStyled
            disabled={item.disabled}
            onClick={props.onSelectEpisode}
            selected={selctedEpisode && selctedEpisode.id === item.id}
          >
            <Typography>{item.name}</Typography>
            <Dropdown overlay={menu} trigger={["click"]}>
              <MoreOutlined />
            </Dropdown>
          </ListItemStyled>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

ListItem.prototype = {
  item: PropTypes.any,
  onDuplicate: PropTypes.func,
  onInsert: PropTypes.func,
  onDisable: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListItem;
