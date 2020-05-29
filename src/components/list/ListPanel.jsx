import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu } from "antd";
import { MoreOutlined, MenuOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  PanelStyled,
  CollapseStyled,
  EditableStyled,
  EditableContainer,
} from "./styled";
import ListItem from "./ListItem";

const ListPanel = ({ item, collapseOpen, selctedEpisode, ...props }) => {
  const preventCollapse = (e) => {
    e.stopPropagation();
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          props.onInsert();
        }}
      >
        Insert
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          props.onDuplicate();
        }}
      >
        Duplicate
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          props.onDisable();
        }}
      >
        {item.disabled ? "Enable" : "Disable"}
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => {
          e.domEvent.stopPropagation();
          props.onDelete();
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const [active, setActive] = useState([]);
  const onChange = (key) => setActive(key);

  useEffect(() => {
    if (collapseOpen && active[0] !== collapseOpen) {
      setActive([collapseOpen]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseOpen]);

  const text = React.useRef(null);
  const itemRef = React.useRef(item.id);

  const onBlur = () => {
    if (text.current) {
      Object.assign(item, { name: text.current });
      props.onUpdateItem(text.current, item, props.index);
    }
  };

  const onChangeName = (e) => {
    text.current = e.target.value;
  };

  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={props.index}>
      {(provided, _snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <CollapseStyled
            bordered={false}
            activeKey={active}
            onChange={onChange}
            ref={itemRef}
          >
            <PanelStyled
              key={item.id}
              // isDragging={provided.isDraggingOver}
              header={
                <div
                  className={`collapse_header `}
                  {...(item.disabled ? {} : { ...provided.dragHandleProps })}
                >
                  <EditableContainer>
                    <MenuOutlined onClick={onBlur} />

                    <EditableStyled
                      html={item.name}
                      disabled={false}
                      onClick={preventCollapse}
                      onBlur={onBlur}
                      onChange={onChangeName}
                      tagName="article"
                    ></EditableStyled>
                  </EditableContainer>
                </div>
              }
              extra={
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  onClick={preventCollapse}
                >
                  <MoreOutlined />
                </Dropdown>
              }
              showArrow={false}
              disabled={item.disabled}
              selected={String(item.id) === String(active[0])}
            >
              <Droppable droppableId={String(item.id)} type={"child"}>
                {(providedd, snapshot) => (
                  <div
                    ref={providedd.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "#dfdfdf"
                        : "#efefef",
                      padding: "5px",
                    }}
                    {...providedd.droppableProps}
                  >
                    {Array.isArray(item.items) &&
                      item.items.map((sub, index) => (
                        <ListItem
                          parentId={item.id}
                          key={index} // It should be changed after connecting api
                          item={sub}
                          index={index}
                          selctedEpisode={selctedEpisode}
                          onUpdateSubItem={(_text, _subItem) => {
                            console.log(text, _text, item);
                            props.onUpdateSubItem(
                              text,
                              _subItem,
                              index,
                              item,
                              props.index
                            );
                          }}
                          onDuplicate={() =>
                            props.onDuplicateSubItem(
                              item,
                              sub,
                              props.index,
                              index
                            )
                          }
                          onDelete={() =>
                            props.onDeleteSubItem(item, sub, props.index, index)
                          }
                          onDisable={() =>
                            props.onDisableSubItem(
                              item,
                              sub,
                              props.index,
                              index
                            )
                          }
                          onInsert={() =>
                            props.onInsertSubItem(item, sub, props.index, index)
                          }
                          onSelectEpisode={() =>
                            props.onSelectEpisode(item, sub, props.index, index)
                          }
                        />
                      ))}

                    {providedd.placeholder}
                  </div>
                )}
              </Droppable>
            </PanelStyled>
          </CollapseStyled>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

ListPanel.prototype = {
  item: PropTypes.any,
  onDuplicate: PropTypes.func,
  onInsert: PropTypes.func,
  onDisable: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListPanel;
