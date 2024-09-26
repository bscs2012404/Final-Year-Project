import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Upload,
  message,
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import {
  RiUploadCloud2Line,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiCloseFill,
} from "react-icons/ri";
import axiosInterceptor from "../../../../services/axiosInterceptor";

import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";


function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [Data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please Authenticate.");
      history.push("/pages/authentication/login");
    }
  }, [history]);
  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "graduationYear",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const onChangeStartDate = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(date);
  };
  const onChangeEndtDate = (date, dateString) => {
    console.log(date, dateString);
    setEndDate(date);
  };
  const fetchData = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      const response = await axios.get(
        `http://localhost:3001/v1/users/experience`,
        config
      );
      console.log(response);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching projects:", error?.message);
    }
  };

  const addExperience = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
      const experienceData = {
        company,
        position,
        startDate,
        endDate,
      };
      const response = await axios.post(
        `http://localhost:3001/v1/users/experience`,
        experienceData,
        config
      );
      console.log(response);
      fetchData();
      message.success("Successfully Added")

      handleCancel();
    } catch (error) {
      console.error("Error fetching projects:", error?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      await axios.delete(
        `http://localhost:3001/v1/users/experience/${id}`,
        config
      );
      message.success("Successfully deleted")
      fetchData();
    } catch (error) {
      console.error("Error deleting education:", error?.message);
    }
  };
  const user = useSelector((state) => state.auth?.user);
  console.log(user);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button type="primary" onClick={showModal}>
          Add Experience
        </Button>
      </div>

      <Modal
        title="Add Experience"
        width={800}
        centered
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <RiCloseFill className="remix-icon text-color-black-100" size={24} />
        }
      >
        <Form layout="vertical" name="basic">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="Company" name="company">
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="position" name="position">
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker onChange={onChangeStartDate}  direction="vertical" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="End Date" name="endDate">
            <DatePicker onChange={onChangeEndtDate}  direction="vertical" style={{ width: '100%' }} />
          </Form.Item>

          <Row>
            <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
              <Button
                block
                type="primary"
                htmlType="submit"
                onClick={addExperience}
              >
                Add
              </Button>
            </Col>

            <Col md={12} span={24} className="hp-mt-sm-12 hp-pl-sm-0 hp-pl-12">
              <Button block onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={Data} />
    </div>
  );
}

export default Experience;
