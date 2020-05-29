import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PanelStyled, CollapseStyled } from "./styled";
import ListItem from "./ListItem";

const ListPanel = ({ item, collapseOpen, selctedEpisode, ...props }) => {
  const onClickDropdown = (e) => {
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
          >
            <PanelStyled
              key={item.id}
              header={
                <span
                  className={`collapse_header `}
                  {...(item.disabled ? {} : { ...provided.dragHandleProps })}
                >
                  {item.name}
                </span>
              }
              extra={
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  onClick={onClickDropdown}
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
                      padding: 10,
                    }}
                    {...providedd.droppableProps}
                  >
                    {Array.isArray(item.items) &&
                      item.items.map((sub, index) => (
                        <ListItem
                          parentId={item.id}
                          key={sub.id}
                          item={sub}
                          index={index}
                          selctedEpisode={selctedEpisode}
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

export default React.memo(ListPanel);
