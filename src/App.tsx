import React, { useState, useEffect, ChangeEvent } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./App.css";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { validateHeaderValue } from "http";
import TextArea from "antd/lib/input/TextArea";

interface DataType {
  id?: Number;
  title?: string;
  body?: string;
}

function App() {
  const [value, setValue] = useState<DataType[]>([]);
  const [item, setItem] = useState<any>();
  console.log("🚀 ~ file: App.tsx ~ line 18 ~ App ~ item", item);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [editId, setEditId] = useState<Number>();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setValue(json));
  }, []);

  const handleEdit = (id: Number) => {
    setEditModalVisible(true);
    let toEdit = value.find((item) => item.id === id);
    let rem = value.filter((item) => item.id !== editId);
    setValue(rem);
    setItem(toEdit);
    setEditId(id);
  };

  const handleSave = () => {
    setValue([...value, item]);
    setConfirmModalVisible(false);
  };

  const handleDelete = (id: Number) => {
    let rem = value.filter((item) => item.id !== id);
    setValue(rem);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.name === "title") {
      setItem({
        ...item,
        id: item.id,
        userId: item.userId,
        title: e.target.value,
        body: item.body,
      });
    } else if (e.target.name === "body") {
      setItem({
        ...item,
        id: item.id,
        userId: item.userId,
        title: item.title,
        body: e.target.value,
      });
    }
    console.log("🚀 ~ file: App.tsx ~ line 77 ~ handleChange ~ e", e.target);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (data: any) => {
        return <li>{data}</li>;
      },
    },
    {
      title: "Description",
      dataIndex: "body",
      key: "body",
      render: (data: any) => {
        return <li>{data}</li>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (data: any) => {
        return (
          <>
            <EditOutlined onClick={() => handleEdit(data.id)} />
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => handleDelete(data.id)}
              onCancel={() => setConfirmModalVisible(false)}
            >
              <DeleteOutlined onClick={() => setConfirmModalVisible(true)} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // console.log(value);

  return (
    <div className="App">
      <Table
        columns={columns}
        dataSource={value}
        rowKey={(data: any) => {
          return data.id;
        }}
      />
      <Modal
        title="Edit"
        visible={editModalVisible}
        destroyOnClose
        okText="Edit"
        onOk={() => handleSave()}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form>
          <Form.Item label="Title" name="title" initialValue={item?.title}>
            <Input
              type="text"
              placeholder="Enter Title"
              onChange={(e) => handleChange(e)}
              // value={item?.title}
              name="title"
            />
          </Form.Item>
          <Form.Item label="Description" name="body" initialValue={item?.body}>
            <TextArea
              name="body"
              placeholder="Enter Description"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
