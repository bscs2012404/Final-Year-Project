import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
} from "antd";
import {
  RiCloseFill,
} from "react-icons/ri";
import { useHistory } from 'react-router-dom';
import axios from "axios";


function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

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
      title: "School",
      dataIndex: "school",
      key: "school",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Field Of Study",
      dataIndex: "fieldOfStudy",
      key: "fieldOfStudy",
    },
    {
      title: "Graduation Year",
      dataIndex: "graduationYear",
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

  const fetchData = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      const response = await axios.get(
        `http://localhost:3001/v1/users/education`,
        config
      );
      console.log(response);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching projects:", error?.message);
    }
  };

  const addEducation = async () => {
    try {
      const authToken = await localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
      const educationData = {
        school,
        degree,
        fieldOfStudy,
        graduationYear
      };
      const response = await axios.post(
        `http://localhost:3001/v1/users/education`,
        educationData,
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
        `http://localhost:3001/v1/users/education/${id}`,
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
          Create Education
        </Button>
      </div>

      <Modal
        title="Add Education"
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
              <Form.Item label="School" name="school">
                <Input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              {" "}
              <Form.Item label="Degree" name="degree">
                <Input
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Field Of Study" name="Field Of Study">
            <Input
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Graduation Year" name="Graduation Year">
            <Input value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
          </Form.Item>

          <Row>
            <Col md={12} span={24} className="hp-pr-sm-0 hp-pr-12">
              <Button block type="primary" htmlType="submit" onClick={addEducation}>
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

export default Education;
