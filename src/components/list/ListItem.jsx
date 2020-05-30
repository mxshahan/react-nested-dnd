import React from "react";
import { Dropdown, Menu } from "antd";
import { ListItemStyled, EditableStyled, EditableContainer } from "./styled";
import { MoreOutlined, MenuOutlined } from "@ant-design/icons";
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

  const text = React.useRef(null);

  const onBlur = () => {
    if (text.current) {
      Object.assign(item, { title: text.current });
      props.onUpdateSubItem(text.current, item);
    }
  };

  const onChangeName = (e) => {
    text.current = e.target.value;
  };

  return (
    <Draggable
      key={item.item_id}
      draggableId={"child-" + parentId + "-" + item.item_id}
      index={props.index}
      isDragDisabled={item.disabled}
    >
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // {...(item.disabled ? {} : { ...provided.dragHandleProps })}
          style={{
            ...provided.draggableProps.style,
            marginTop: 10,
          }}
        >
          <ListItemStyled
            disabled={item.disabled}
            onClick={props.onSelectEpisode}
            selected={selctedEpisode && selctedEpisode.id === item.title}
          >
            <EditableContainer>
              <MenuOutlined onClick={onBlur} />
              <EditableStyled
                html={item.title}
                disabled={false}
                onBlur={onBlur}
                onChange={onChangeName}
                tagName="article"
              />
            </EditableContainer>
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
