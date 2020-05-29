import React from "react";
import { Layout, Result, Button } from "antd";

const Content = ({ item, subItem, next }) => {
  return item ? (
    <Layout style={{ margin: 20 }}>
      <Result
        status="info"
        title={<div>Course selected {item.name}</div>}
        subTitle={<div>Episode Selcted: {subItem.name}</div>}
        extra={[
          <Button type="primary" key="console" onClick={next}>
            Next
          </Button>,
        ]}
      />
    </Layout>
  ) : (
    <Layout style={{ margin: 20 }}>
      <Result status="500" title="No Item Selected" />
    </Layout>
  );
};

export default Content;
