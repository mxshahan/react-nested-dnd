import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import apiData from "./data.json";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
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
        (d) => d.item_id === source.droppableId
      );
      const dIndex = sourceList.findIndex(
        (d) => d.item_id === destination.droppableId
      );

      console.log(sIndex, dIndex);
      
      if (sIndex === -1 || dIndex === -1) return;

      if (sIndex === dIndex) {
        const srcItems = Array.from(sourceList[sIndex].episodes || []);

        const [removed] = srcItems.splice(source.index, 1);
        srcItems.splice(destination.index, 0, removed);
        sourceList[sIndex].episodes = srcItems;
      } else {
        const srcItems = Array.from(sourceList[sIndex].episodes || []);
        const destItems = Array.from(sourceList[dIndex].episodes || []);

        // console.log(srcItems, destItems);
        const [removed] = srcItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        sourceList[sIndex].episodes = srcItems;
        sourceList[dIndex].episodes = destItems;
      }
      // console.log(sourceList);
      setData(sourceList);
    }
  };

  // Fixed
  const onDuplicateItem = (item, index) => {
    const newItem = { ...item };
    const list = Array.from(data || []);

    const episodes = newItem.episodes;
    episodes.map((s) => (s.item_id = uuidv4()));

    Object.assign(newItem, {
      title: item.title + " Copy",
      item_id: uuidv4(),
    });

    list.splice(index + 1, 0, newItem);
    setData(list);
  };

  // Fixed
  const onDeleteItem = (_item, _index) => {
    const list = Array.from(data || []);
    const newList = list.filter((d) => d.item_id !== _item.item_id);

    setData(newList);
  };

  // Fixed
  const onDisableItem = (_item, index) => {
    const list = Array.from(data || []);
    const newList = [];
    list.map((d) =>
      d.item_id === _item.item_id
        ? newList.push({ ...d, disabled: _item.disabled ? false : true })
        : newList.push(d)
    );

    setData(newList);
  };

  // Fixed
  const onInsertItem = (_item, index) => {
    const newItem = {
      item_id: uuidv4(),
      title: "Test Name",
      episodes: [
        {
          title: "Test Episode",
          item_id: uuidv4(),
        },
      ],
    };
    const list = Array.from(data || []);
    list.splice(index + 1, 0, newItem);
    setData(list);
  };

  // Fixed
  const onDuplicateSubItem = (_item, _sub, itemIndex, subIndex) => {
    const newItem = { ..._sub };
    const list = Array.from(data || []);
    Object.assign(newItem, {
      title: _sub.title + " Copy",
      item_id: uuidv4(),
    });
    list[itemIndex].episodes.splice(subIndex + 1, 0, newItem);
    setData(list);
  };

  // Fixed
  const onDeleteSubItem = (_item, _sub, itemIndex, subIndex) => {
    const list = Array.from(data || []);
    const index = list.findIndex((d) => d.item_id === _item.item_id);
    const newSubList = list[index].episodes.filter(
      (s) => s.item_id !== _sub.item_id
    );
    list[index].episodes = newSubList;
    setData(list);
  };

  const onDisableSubItem = (_item, _sub, itemIndex, subIndex) => {
    const list = Array.from(data || []);
    const index = list.findIndex((d) => d.item_id === _item.item_id);
    const newSubList = [];
    list[index].episodes.map((s) =>
      s.item_id === _sub.item_id
        ? newSubList.push({ ...s, disabled: _sub.disabled ? false : true })
        : newSubList.push(s)
    );
    list[index].episodes = newSubList;
    setData(list);
  };

  const onInsertSubItem = (_item, _sub, itemIndex, subIndex) => {
    const newItem = {
      title: "Test Name",
      description: "Test Description",
      id: data.length + 1,
    };
    const list = Array.from(data || []);
    list[itemIndex].episodes.splice(subIndex + 1, 0, newItem);
    setData(list);
  };

  const onUpdateItem = (text, item, index) => {
    // const newItem = { ...item, name: text };
    const list = Array.from(data || []);
    list.splice(index, 1, item);
    setData(list);
    // console.log(text, item, index);
    // const newItem = { ...item, name: text };
    // const list = Array.from(data);
    // list[index] = newItem;
    // setData(list);
  };

  const onUpdateSubItem = (text, sub, index, item, itemIndex) => {
    // const newItem = { ...sub, name: text };
    const list = Array.from(data || []);
    list[itemIndex].episodes.splice(index, 1, sub);
    setData(list);
    // const newItem = { ...sub };
    // const list = Array.from(data || []);
    // console.log(list)
    // const subList = list[itemIndex].items;
    // const subIndex =
    //   Array.isArray(subList) && subList.findIndex((d) => d.title === sub.title);
    // Object.assign(newItem, { name: text });
    // list[itemIndex].items.splice(subIndex, 1, newItem);
    // setData(list);
  };

  const onSelectEpisode = (item, sub, itemIndex, subIndex) => {
    setItemIndex(itemIndex);
    setSubIndex(subIndex);
  };

  const next = () => {
    const selectedItem = data[itemIndex];
    if (selectedItem) {
      if (
        Array.isArray(selectedItem.episodes) &&
        selectedItem.episodes.length - 1 === subIndex
      ) {
        if (itemIndex < data.length - 1) {
          setItemIndex(itemIndex + 1);
          setSubIndex(0);
        }
      } else if (!selectedItem.episodes) {
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
        Array.isArray(selectedItem.episodes) &&
        selectedItem.episodes.length > 0
      ) {
        selectedSubItem = selectedItem.episodes[subIndex];
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
        <Col md={6}>
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
                    // backgroundColor: snapshot.isDraggingOver
                    //   ? "darkorchid"
                    //   : "lightblue",
                    padding: "20px 5px",
                  }}
                  {...provided.droppableProps}
                >
                  {data.map((item, index) => (
                    <ListPanel
                      key={item.item_id} // It should be replaced after connecting api
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
                      collapseOpen={selectedItem && selectedItem.title}
                      selctedEpisode={subItem}
                      onUpdateItem={onUpdateItem}
                      onUpdateSubItem={onUpdateSubItem}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
        <Col md={18}>
          <Content item={item} subItem={subItem} next={next} />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(DraggableList);
