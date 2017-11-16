import React, {Component} from "react";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class NavTab extends Component {
  render() {
    return (
      <div className="navTab">
      <Tabs type="card">
      <TabPane tab="男子" key="1">
      <p>Content of Tab Pane 1</p>
      <p>Content of Tab Pane 1</p>
      <p>Content of Tab Pane 1</p>
      </TabPane>
      <TabPane tab="Tab Title 2" key="2">
      <p>Content of Tab Pane 2</p>
      <p>Content of Tab Pane 2</p>
      <p>Content of Tab Pane 2</p>
      </TabPane>
      <TabPane tab="Tab Title 3" key="3">
      <p>Content of Tab Pane 3</p>
      <p>Content of Tab Pane 3</p>
      <p>Content of Tab Pane 3</p>
      </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default NavTab;
