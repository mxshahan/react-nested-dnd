import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import apiData from "./data.json";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListPanel from "./ListPanel";
import Content from "./Content";

const DraggableList = () => {
  const [data, setData] = useState(apiData);
  const [item, setItem] = useState(null);
  const [subItem, setSubItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [subIndex, setSubIndex] = useState(null);

  // TODO
  const onBeforeCapture = () => {
    /* ... */
  };

  // TODO
  const onBeforeDragStart = () => {
    /* ... */
  };

  // TODO
  const onDragStart = (result) => {
    /* ... */
    console.log("Dragging", result);
  };

  // TODO
  const onDragUpdate = () => {
    /* ... */
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    console.log(source, destination, type);

    if (!source || !destination) return;

    if (type === "app") {
      const sourceList = Array.from(data || []);
      const [removed] = sourceList.splice(source.index, 1);
      sourceList.splice(destination.index, 0, removed);
      setData(sourceList);
    } else {
      const sourceList = Array.from(data || []);

      const sIndex = sourceList.findIndex(
        (d) => d.id === Number(source.droppableId)
      );
      const dIndex = sourceList.findIndex(
        (d) => d.id === Number(destination.droppableId)
      );

      if (sIndex === dIndex) {
        const srcItems = Array.from(sourceList[sIndex].items || []);

        const [removed] = srcItems.splice(source.index, 1);
        srcItems.splice(destination.index, 0, removed);
        sourceList[sIndex].items = srcItems;
      } else {
        const srcItems = Array.from(sourceList[sIndex].items || []);
        const destItems = Array.from(sourceList[dIndex].items || []);

        // console.log(srcItems, destItems);
        const [removed] = srcItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        sourceList[sIndex].items = srcItems;
        sourceList[dIndex].items = destItems;
      }
      // console.log(sourceList);
      setData(sourceList);
    }
  };

  const onDuplicateItem = (item, index) => {
    const newItem = { ...item };
    const list = Array.from(data || []);
    Object.assign(newItem, { name: item.name + " Copy", id: item.id + 999 });
    list.splice(index + 1, 0, newItem);
    setData(list);
  };

  const onDeleteItem = (_item, index) => {
    const list = Array.from(data || []);
    list.splice(index, 1);
    setData(list);
  };

  const onDisableItem = (_item, index) => {
    const newItem = { ..._item };
    const list = Array.from(data || []);
    Object.assign(newItem, { disabled: newItem.disabled ? false : true });
    list.splice(index, 1, newItem);
    setData(list);
  };

  const onInsertItem = (_item, index) => {
    const newItem = { name: "Test Name", description: "Test Description" };
    const list = Array.from(data || []);
    list.splice(index + 1, 0, newItem);
    setData(list);
  };

  const onDuplicateSubItem = (_item, _sub, itemIndex, subIndex) => {
    const newItem = { ..._sub };
    const list = Array.from(data || []);
    Object.assign(newItem, { name: _sub.name + " Copy", id: _sub.id + 999 });
    list[itemIndex].items.splice(subIndex + 1, 0, newItem);
    setData(list);
  };

  const onDeleteSubItem = (_item, _sub, itemIndex, subIndex) => {
    const list = Array.from(data || []);
    list[itemIndex].items.splice(subIndex, 1);
    setData(list);
  };

  const onDisableSubItem = (_item, _sub, itemIndex, subIndex) => {
    const newItem = { ..._sub };
    const list = Array.from(data || []);
    Object.assign(newItem, { disabled: newItem.disabled ? false : true });
    list[itemIndex].items.splice(subIndex, 1, newItem);
    setData(list);
  };

  const onInsertSubItem = (_item, _sub, itemIndex, subIndex) => {
    const newItem = {
      name: "Test Name",
      description: "Test Description",
      id: data.length + 1,
    };
    const list = Array.from(data || []);
    list[itemIndex].items.splice(subIndex + 1, 0, newItem);
    setData(list);
  };

  const onSelectEpisode = (item, sub, itemIndex, subIndex) => {
    setItemIndex(itemIndex);
    setSubIndex(subIndex);
  };

  const next = () => {
    const selectedItem = data[itemIndex];
    if (selectedItem) {
      if (
        Array.isArray(selectedItem.items) &&
        selectedItem.items.length - 1 === subIndex
      ) {
        if (itemIndex < data.length - 1) {
          setItemIndex(itemIndex + 1);
          setSubIndex(0);
        }
      } else if (!selectedItem.items) {
        setItemIndex(itemIndex + 1);
        setSubIndex(0);
      } else {
        setSubIndex(subIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (itemIndex >= 0 && subIndex >= 0) {
      let selectedItem = data[itemIndex];
      let selectedSubItem;
      if (
        selectedItem &&
        Array.isArray(selectedItem.items) &&
        selectedItem.items.length > 0
      ) {
        selectedSubItem = selectedItem.items[subIndex];
        if (selectedSubItem !== -1) {
          setItem(selectedItem);
          setSubItem(selectedSubItem);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIndex, subIndex]);

  const selectedItem = item;
  return (
    <div>
      <Row>
        <Col md={4}>
          <DragDropContext
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="root" type="app">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "darkorchid"
                      : "lightblue",
                    padding: "20px 5px",
                  }}
                  {...provided.droppableProps}
                >
                  {data.map((item, index) => (
                    <ListPanel
                      key={item.id}
                      item={item}
                      index={index}
                      onDuplicate={() => onDuplicateItem(item, index)}
                      onDelete={() => onDeleteItem(item, index)}
                      onDisable={() => onDisableItem(item, index)}
                      onInsert={() => onInsertItem(item, index)}
                      onDuplicateSubItem={onDuplicateSubItem}
                      onDeleteSubItem={onDeleteSubItem}
                      onDisableSubItem={onDisableSubItem}
                      onInsertSubItem={onInsertSubItem}
                      onSelectEpisode={onSelectEpisode}
                      collapseOpen={selectedItem && selectedItem.id}
                      selctedEpisode={subItem}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
        <Col md={20}>
          <Content item={item} subItem={subItem} next={next} />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(DraggableList);
